
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Trash2, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type KaryaType = Database['public']['Tables']['karya']['Row'];

const KaryaModeration = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedKarya, setSelectedKarya] = useState<KaryaType | null>(null);
  const [viewMode, setViewMode] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [dialogOpen, setDialogOpen] = useState(false);

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
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      return { id, status };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['karya'] });
      toast({
        title: `Karya ${data.status === 'approved' ? 'disetujui' : data.status === 'rejected' ? 'ditolak' : 'dikembalikan ke pending'}`,
        description: `Karya telah berhasil ${data.status === 'approved' ? 'disetujui' : data.status === 'rejected' ? 'ditolak' : 'dikembalikan ke pending'}`,
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-serif">Moderasi Karya</h2>
      
      <Tabs defaultValue="pending" value={viewMode} onValueChange={(value) => setViewMode(value as 'pending' | 'approved' | 'rejected')}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Menunggu ({isLoading ? '...' : karya?.length || 0})</TabsTrigger>
          <TabsTrigger value="approved">Disetujui</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>
        
        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            {isLoading ? (
              <p>Memuat data...</p>
            ) : karya && karya.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {karya.map((item) => (
                  <Card key={item.id} className="overflow-hidden rounded-md">
                    <div className="aspect-square w-full overflow-hidden">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>
                        Oleh: {item.creator_name} | 
                        Kategori: {item.category} | 
                        {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.description || "Tanpa deskripsi"}
                      </p>
                      {item.content_url && (
                        <p className="text-sm mt-2">
                          <a href={item.content_url} target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                            Lihat konten lengkap
                          </a>
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {viewMode === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleApprove(item.id)}
                            className="text-emerald hover:text-emerald hover:border-emerald flex items-center gap-1"
                          >
                            <Check size={16} /> Setujui
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReject(item.id)}
                            className="text-coral hover:text-coral hover:border-coral flex items-center gap-1"
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
                          className="text-amethyst hover:text-amethyst hover:border-amethyst flex items-center gap-1"
                        >
                          <Clock size={16} /> Kembalikan ke pending
                        </Button>
                      )}
                      {viewMode === 'rejected' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReturnToPending(item.id)}
                          className="text-amethyst hover:text-amethyst hover:border-amethyst flex items-center gap-1"
                        >
                          <Clock size={16} /> Kembalikan ke pending
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openDeleteDialog(item)}
                        className="text-rose-500 hover:text-rose-500 hover:border-rose-500 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-muted-foreground">
                Tidak ada karya dengan status {
                  status === 'pending' ? 'menunggu' : 
                  status === 'approved' ? 'disetujui' : 'ditolak'
                }
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus Karya</DialogTitle>
            <DialogDescription>
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
    </div>
  );
};

export default KaryaModeration;
