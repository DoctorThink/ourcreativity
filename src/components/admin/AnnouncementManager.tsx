
import React, { useState, useEffect } from 'react';
import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementPublishStatus,
  toggleAnnouncementImportantStatus
} from '@/services/announcementService';
import { Announcement, AnnouncementFormData } from '@/models/Announcement';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Loader2, Pencil, Trash, Eye, EyeOff, Star, StarOff, Plus, Calendar, Link, AlertCircle } from "lucide-react";
import { format } from 'date-fns';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AnnouncementFormProps {
  announcement?: Announcement;
  onSubmit: (formData: AnnouncementFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  announcement,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const [title, setTitle] = useState(announcement?.title || '');
  const [content, setContent] = useState(announcement?.content || '');
  const [category, setCategory] = useState(announcement?.category || 'update');
  const [published, setPublished] = useState(announcement?.published !== false);
  const [important, setImportant] = useState(announcement?.important || false);
  const [imageUrl, setImageUrl] = useState(announcement?.image_url || '');
  const [linkUrl, setLinkUrl] = useState(announcement?.link_url || '');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Form validation
    if (!title.trim()) {
      setFormError("Judul pengumuman tidak boleh kosong");
      return;
    }
    
    if (!content.trim()) {
      setFormError("Konten pengumuman tidak boleh kosong");
      return;
    }

    // Validate URLs if provided
    if (imageUrl && !isValidUrl(imageUrl)) {
      setFormError("URL gambar tidak valid");
      return;
    }
    
    if (linkUrl && !isValidUrl(linkUrl)) {
      setFormError("URL tautan tidak valid");
      return;
    }

    const formData: AnnouncementFormData = {
      title: title.trim(),
      content: content.trim(),
      category,
      published,
      important,
      image_url: imageUrl.trim() || undefined,
      link_url: linkUrl.trim() || undefined,
    };

    await onSubmit(formData);
  };
  
  // Simple URL validation
  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Pengumuman</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul pengumuman"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Konten</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan detail pengumuman"
            rows={8}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="event">Acara</SelectItem>
                <SelectItem value="recruitment">Rekrutmen</SelectItem>
                <SelectItem value="update">Update</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL Gambar (opsional)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkUrl">URL Tautan (opsional)</Label>
            <Input
              id="linkUrl"
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="published" 
              checked={published} 
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published" className="cursor-pointer">
              {published ? "Publikasikan" : "Simpan sebagai draft"}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="important" 
              checked={important} 
              onCheckedChange={setImportant}
            />
            <Label htmlFor="important" className="cursor-pointer">
              {important ? "Tandai sebagai penting" : "Pengumuman biasa"}
            </Label>
          </div>
        </div>
      </div>
      
      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : announcement ? "Perbarui" : "Simpan"}
        </Button>
      </DialogFooter>
    </form>
  );
};

const AnnouncementManager: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchAnnouncements('all');
      console.log("Loaded announcements:", data);
      setAnnouncements(data);
    } catch (err: any) {
      console.error('Error loading announcements:', err);
      setError('Gagal memuat data pengumuman');
      toast.error('Gagal memuat data pengumuman');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleRetry = () => {
    loadAnnouncements();
  };

  const handleCreateUpdate = async () => {
    setSelectedAnnouncement(null);
    setIsDialogOpen(true);
  };

  const handleEditUpdate = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAnnouncement) return;
    
    setIsSubmitting(true);
    try {
      const success = await deleteAnnouncement(selectedAnnouncement.id);
      if (success) {
        await loadAnnouncements();
        setIsDeleteDialogOpen(false);
        setSelectedAnnouncement(null);
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      // Error is handled by the service function
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (announcement: Announcement) => {
    try {
      console.log("Toggling publish status for:", announcement.id, "Current status:", announcement.published);
      const updated = await toggleAnnouncementPublishStatus(announcement.id, announcement.published);
      if (updated) {
        await loadAnnouncements();
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
      // Error is handled by the service function
    }
  };

  const handleToggleImportant = async (announcement: Announcement) => {
    try {
      const updated = await toggleAnnouncementImportantStatus(announcement.id, announcement.important);
      if (updated) {
        await loadAnnouncements();
      }
    } catch (error) {
      console.error('Error toggling important status:', error);
      // Error is handled by the service function
    }
  };

  const handleSubmitForm = async (formData: AnnouncementFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedAnnouncement) {
        const updated = await updateAnnouncement(selectedAnnouncement.id, formData);
        if (updated) {
          await loadAnnouncements();
          setIsDialogOpen(false);
          setSelectedAnnouncement(null);
        }
      } else {
        const created = await createAnnouncement(formData);
        if (created) {
          await loadAnnouncements();
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
      // Error is handled by the service function
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (activeTab === 'all') return true;
    if (activeTab === 'published') return announcement.published;
    if (activeTab === 'draft') return !announcement.published;
    if (activeTab === 'important') return announcement.important;
    return true;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'event': return 'Acara';
      case 'recruitment': return 'Rekrutmen';
      case 'update': return 'Update';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'event': return 'bg-coral/20 text-coral';
      case 'recruitment': return 'bg-turquoise/20 text-turquoise';
      case 'update': return 'bg-amethyst/20 text-amethyst';
      default: return 'bg-foreground/20 text-foreground';
    }
  };

  // Format date safely
  const getDisplayDate = (announcement: Announcement) => {
    try {
      if (announcement.date) {
        return format(new Date(announcement.date), "dd MMM yyyy");
      }
      return format(new Date(announcement.created_at), "dd MMM yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Tanggal tidak valid";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-semibold">Pengumuman</h2>
        <Button onClick={handleCreateUpdate}>
          <Plus className="mr-2 h-4 w-4" />
          Buat Pengumuman Baru
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              Coba Lagi
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 overflow-x-auto flex w-full sm:w-auto">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="published">Dipublikasi</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="important">Penting</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Belum ada pengumuman</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 gap-4">
                {filteredAnnouncements.map((announcement) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                          <div className="space-y-1">
                            <CardTitle>{announcement.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {getDisplayDate(announcement)}
                            </CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getCategoryColor(announcement.category)}>
                              {getCategoryLabel(announcement.category)}
                            </Badge>
                            {announcement.important && (
                              <Badge variant="destructive">Penting</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {announcement.content}
                        </p>
                        {announcement.link_url && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                            <Link className="h-3 w-3" />
                            <span className="truncate">{announcement.link_url}</span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-2 flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          {announcement.published ? 'Dipublikasikan' : 'Draft'}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleTogglePublish(announcement)}
                            title={announcement.published ? "Sembunyikan" : "Publikasikan"}
                          >
                            {announcement.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleToggleImportant(announcement)}
                            title={announcement.important ? "Hapus tanda penting" : "Tandai penting"}
                          >
                            {announcement.important ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleEditUpdate(announcement)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleDeleteClick(announcement)}
                            title="Hapus"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedAnnouncement ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}
            </DialogTitle>
            <DialogDescription>
              {selectedAnnouncement 
                ? 'Ubah detail pengumuman yang ada' 
                : 'Isi formulir untuk membuat pengumuman baru'}
            </DialogDescription>
          </DialogHeader>
          <AnnouncementForm
            announcement={selectedAnnouncement || undefined}
            onSubmit={handleSubmitForm}
            onCancel={() => setIsDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Pengumuman</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengumuman ini? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementManager;
