
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Trash2, Clock, Eye, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

type KaryaType = Database['public']['Tables']['karya']['Row'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const KaryaModeration = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [viewMode, setViewMode] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  // Query to fetch karya based on current viewMode
  const { data: karya, isLoading } = useQuery({
    queryKey: ['karya', viewMode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('karya')
        .select('*')
        .eq('status', viewMode)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as KaryaType[];
    },
  });

  // Mutation to update karya status
  const updateKaryaStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('karya')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      return { id, status };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['karya'] });
      
      const statusText = data.status === 'approved' ? 'disetujui' : 
                        data.status === 'rejected' ? 'ditolak' : 
                        'dikembalikan ke pending';
      
      toast({
        title: `Karya ${statusText}`,
        description: `Karya telah berhasil ${statusText}`,
        variant: data.status === 'approved' ? 'default' : 
                data.status === 'rejected' ? 'destructive' : 'default',
      });
    },
    onError: (error) => {
      toast({
        title: 'Gagal mengubah status',
        description: error instanceof Error ? error.message : 'Terjadi kesalahan',
        variant: 'destructive',
      });
    },
  });

  // Mutation to delete karya
  const deleteKarya = useMutation({
    mutationFn: async (id: string) => {
      // First try to delete the image from storage
      try {
        // Extract filename from the URL
        const imageUrl = selectedKarya?.image_url || '';
        const urlParts = imageUrl.split('/');
        const filePathWithBucket = urlParts[urlParts.length - 1];
        const filePath = filePathWithBucket.startsWith('karya-images/') 
          ? filePathWithBucket.substring('karya-images/'.length) 
          : filePathWithBucket;
        
        if (filePath) {
          await supabase.storage
            .from('karya-images')
            .remove([filePath]);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        // Continue with record deletion even if image deletion fails
      }

      // Then delete the record
      const { error } = await supabase
        .from('karya')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['karya'] });
      setDialogOpen(false);
      toast({
        title: 'Karya dihapus',
        description: 'Karya telah berhasil dihapus dari sistem',
      });
    },
    onError: (error) => {
      toast({
        title: 'Gagal menghapus karya',
        description: error instanceof Error ? error.message : 'Terjadi kesalahan',
        variant: 'destructive',
      });
    },
  });

  const handleApprove = (id: string) => {
    updateKaryaStatus.mutate({ id, status: 'approved' });
  };

  const handleReject = (id: string) => {
    updateKaryaStatus.mutate({ id, status: 'rejected' });
  };

  const handleReturnToPending = (id: string) => {
    updateKaryaStatus.mutate({ id, status: 'pending' });
  };

  const handleDelete = () => {
    if (selectedKarya) {
      deleteKarya.mutate(selectedKarya.id);
    }
  };

  const openDeleteDialog = (karya: KaryaType) => {
    setSelectedKarya(karya);
    setDialogOpen(true);
  };
  
  const openPreviewDialog = (karya: KaryaType) => {
    setSelectedKarya(karya);
    setPreviewDialogOpen(true);
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'design':
        return "from-amethyst/20 to-purpleLight/20 text-amethyst border-amethyst/30";
      case 'video':
        return "from-blueLight/20 to-turquoise/20 text-blueLight border-blueLight/30";
      case 'meme':
        return "from-amber/20 to-orangeLight/20 text-amber border-amber/30";
      case 'karyatulis':
        return "from-coral/20 to-peach/20 text-coral border-coral/30";
      default:
        return "from-grayMid/20 to-grayLight/20 text-grayMid border-grayMid/30";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'design': return "Desain Grafis";
      case 'video': return "Video";
      case 'meme': return "Meme";
      case 'karyatulis': return "Karya Tulis";
      default: return category;
    }
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <Card key={`skeleton-${index}`} className="overflow-hidden bg-foreground/5 border border-foreground/10">
        <div className="aspect-square w-full overflow-hidden bg-foreground/10">
          <Skeleton className="w-full h-full" />
        </div>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="pb-2">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </CardFooter>
      </Card>
    ));
  };

  return (
    <div>
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 font-serif bg-gradient-to-r from-amethyst via-blueLight to-emerald bg-clip-text text-transparent"
      >
        Moderasi Karya
      </motion.h2>
      
      <Tabs defaultValue="pending" value={viewMode} onValueChange={(value) => setViewMode(value as 'pending' | 'approved' | 'rejected')}>
        <TabsList className="mb-6 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl overflow-hidden">
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber/10 data-[state=active]:to-amber/5"
          >
            Menunggu {isLoading ? '...' : karya?.length ? `(${karya.length})` : '(0)'}
          </TabsTrigger>
          <TabsTrigger 
            value="approved" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald/10 data-[state=active]:to-emerald/5"
          >
            Disetujui
          </TabsTrigger>
          <TabsTrigger 
            value="rejected" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-coral/10 data-[state=active]:to-coral/5"
          >
            Ditolak
          </TabsTrigger>
        </TabsList>
        
        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            {isLoading ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {renderSkeletons()}
              </motion.div>
            ) : karya && karya.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {karya.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Card className="overflow-hidden group hover:border-foreground/20 transition-all duration-300 bg-foreground/5 backdrop-blur-md border border-foreground/10">
                      <div 
                        className="aspect-square w-full overflow-hidden cursor-pointer relative"
                        onClick={() => openPreviewDialog(item)}
                      >
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="bg-foreground/10 backdrop-blur-md">
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                          <Badge variant="outline" className={`bg-gradient-to-r ${getCategoryColor(item.category)}`}>
                            {getCategoryLabel(item.category)}
                          </Badge>
                        </div>
                        <CardDescription>
                          Oleh: {item.creator_name} | {new Date(item.created_at).toLocaleDateString('id-ID')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-foreground/70 line-clamp-3">
                          {item.description || "Tanpa deskripsi"}
                        </p>
                        {item.content_url && (
                          <p className="text-sm mt-2">
                            <a 
                              href={item.content_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-amethyst hover:text-amethyst/80 hover:underline inline-flex items-center"
                            >
                              Lihat konten lengkap
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </p>
                        )}
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-2 justify-between">
                        {viewMode === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleApprove(item.id)}
                              className="bg-emerald/10 border-emerald/30 text-emerald hover:bg-emerald/20 flex items-center gap-1"
                            >
                              <Check size={16} /> Setujui
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleReject(item.id)}
                              className="bg-coral/10 border-coral/30 text-coral hover:bg-coral/20 flex items-center gap-1"
                            >
                              <X size={16} /> Tolak
                            </Button>
                          </>
                        )}
                        {viewMode === 'approved' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReturnToPending(item.id)}
                            className="bg-amber/10 border-amber/30 text-amber hover:bg-amber/20 flex items-center gap-1"
                          >
                            <Clock size={16} /> Kembalikan ke pending
                          </Button>
                        )}
                        {viewMode === 'rejected' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReturnToPending(item.id)}
                            className="bg-amber/10 border-amber/30 text-amber hover:bg-amber/20 flex items-center gap-1"
                          >
                            <Clock size={16} /> Kembalikan ke pending
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openDeleteDialog(item)}
                          className="bg-rose-500/10 border-rose-500/30 text-rose-500 hover:bg-rose-500/20 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Hapus
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto w-full max-w-md p-6 rounded-2xl bg-foreground/5 backdrop-blur-md border border-foreground/10">
                  <div className="flex flex-col items-center p-4">
                    {viewMode === 'pending' ? (
                      <Clock className="h-12 w-12 text-amber mb-4" />
                    ) : viewMode === 'approved' ? (
                      <Check className="h-12 w-12 text-emerald mb-4" />
                    ) : (
                      <X className="h-12 w-12 text-coral mb-4" />
                    )}
                    <p className="text-lg font-medium">
                      Tidak ada karya dengan status {
                        viewMode === 'pending' ? 'menunggu' : 
                        viewMode === 'approved' ? 'disetujui' : 'ditolak'
                      }
                    </p>
                    <p className="text-sm text-foreground/60 mt-1">
                      {viewMode === 'pending' 
                        ? 'Semua karya telah dimoderasi' 
                        : viewMode === 'approved' 
                        ? 'Belum ada karya yang disetujui'
                        : 'Belum ada karya yang ditolak'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-foreground/5 backdrop-blur-xl border border-foreground/10">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus Karya</DialogTitle>
            <DialogDescription className="text-foreground/70">
              Apakah Anda yakin ingin menghapus karya "{selectedKarya?.title}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteKarya.isPending}
            >
              {deleteKarya.isPending ? 'Menghapus...' : 'Hapus Permanen'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl bg-foreground/5 backdrop-blur-xl border border-foreground/10">
          <DialogHeader>
            <DialogTitle>{selectedKarya?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <img 
                src={selectedKarya?.image_url} 
                alt={selectedKarya?.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground/70">Pembuat</h4>
                <p className="text-foreground">{selectedKarya?.creator_name}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground/70">Kategori</h4>
                <Badge variant="outline" className={`bg-gradient-to-r ${selectedKarya?.category ? getCategoryColor(selectedKarya.category) : ''}`}>
                  {selectedKarya?.category ? getCategoryLabel(selectedKarya.category) : ''}
                </Badge>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground/70">Tanggal Dibuat</h4>
                <p className="text-foreground">
                  {selectedKarya?.created_at ? new Date(selectedKarya.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : ''}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground/70">Status</h4>
                <Badge 
                  variant="outline" 
                  className={`
                    ${selectedKarya?.status === 'approved' 
                      ? 'bg-emerald/10 text-emerald border-emerald/30' 
                      : selectedKarya?.status === 'rejected'
                      ? 'bg-coral/10 text-coral border-coral/30'
                      : 'bg-amber/10 text-amber border-amber/30'}
                  `}
                >
                  {selectedKarya?.status === 'approved' 
                    ? 'Disetujui' 
                    : selectedKarya?.status === 'rejected' 
                    ? 'Ditolak' 
                    : 'Menunggu'}
                </Badge>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground/70">Deskripsi</h4>
                <p className="text-foreground/90 whitespace-pre-wrap">{selectedKarya?.description || "Tanpa deskripsi"}</p>
              </div>
              
              {selectedKarya?.content_url && (
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-amethyst/10 border-amethyst/30 text-amethyst hover:bg-amethyst/20"
                    asChild
                  >
                    <a href={selectedKarya.content_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Lihat konten lengkap
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>Tutup</Button>
            {selectedKarya?.status === 'pending' && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (selectedKarya) {
                      handleApprove(selectedKarya.id);
                      setPreviewDialogOpen(false);
                    }
                  }}
                  className="bg-emerald/10 border-emerald/30 text-emerald hover:bg-emerald/20"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Setujui
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (selectedKarya) {
                      handleReject(selectedKarya.id);
                      setPreviewDialogOpen(false);
                    }
                  }}
                  className="bg-coral/10 border-coral/30 text-coral hover:bg-coral/20"
                >
                  <X className="mr-2 h-4 w-4" />
                  Tolak
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KaryaModeration;
