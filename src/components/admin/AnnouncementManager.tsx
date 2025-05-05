
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
import { Loader2, Pencil, Trash, Eye, EyeOff, Star, StarOff, Plus, Calendar, Link } from "lucide-react";
import { format } from 'date-fns';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Judul dan konten harus diisi");
      return;
    }

    const formData: AnnouncementFormData = {
      title,
      content,
      category,
      published,
      important,
      image_url: imageUrl || undefined,
      link_url: linkUrl || undefined,
    };

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Pengumuman</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul pengumuman"
            required
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
            required
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

  const loadAnnouncements = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAnnouncements('all', false);
      console.log("Loaded announcements:", data);
      setAnnouncements(data);
    } catch (error) {
      console.error('Error loading announcements:', error);
      toast.error('Gagal memuat data pengumuman');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

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
      await deleteAnnouncement(selectedAnnouncement.id);
      toast.success('Pengumuman berhasil dihapus');
      await loadAnnouncements();
      setIsDeleteDialogOpen(false);
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Gagal menghapus pengumuman');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (announcement: Announcement) => {
    try {
      console.log("Toggling publish status for:", announcement.id, "Current status:", announcement.published);
      await toggleAnnouncementPublishStatus(announcement.id, announcement.published);
      await loadAnnouncements();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      toast.error('Gagal mengubah status publikasi');
    }
  };

  const handleToggleImportant = async (announcement: Announcement) => {
    try {
      await toggleAnnouncementImportantStatus(announcement.id, announcement.important);
      await loadAnnouncements();
    } catch (error) {
      console.error('Error toggling important status:', error);
      toast.error('Gagal mengubah status penting');
    }
  };

  const handleSubmitForm = async (formData: AnnouncementFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedAnnouncement) {
        await updateAnnouncement(selectedAnnouncement.id, formData);
        toast.success('Pengumuman berhasil diperbarui');
      } else {
        await createAnnouncement(formData);
        toast.success('Pengumuman berhasil dibuat');
      }
      
      await loadAnnouncements();
      setIsDialogOpen(false);
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast.error('Gagal menyimpan pengumuman');
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-semibold">Pengumuman</h2>
        <Button onClick={handleCreateUpdate}>
          <Plus className="mr-2 h-4 w-4" />
          Buat Pengumuman Baru
        </Button>
      </div>
      
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
                              {announcement.date ? 
                                format(new Date(announcement.date), "dd MMM yyyy") :
                                format(new Date(announcement.created_at), "dd MMM yyyy")}
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
