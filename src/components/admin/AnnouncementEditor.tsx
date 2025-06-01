import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Calendar, Bell, Upload, Link2, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Announcement, AnnouncementFormData } from "@/models/Announcement";
import { 
  createAnnouncement, 
  deleteAnnouncement, 
  fetchAnnouncements, 
  toggleAnnouncementImportantStatus, 
  toggleAnnouncementPublishStatus, 
  updateAnnouncement 
} from "@/services/announcementService";
import { Skeleton } from "../ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const INITIAL_FORM_DATA: AnnouncementFormData = {
  title: "",
  content: "",
  category: "event",
  published: true,
  important: false,
  image_url: "",
  link_url: ""
};

const AnnouncementEditor = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [formData, setFormData] = useState<AnnouncementFormData>(INITIAL_FORM_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAnnouncements('all', false);
      setAnnouncements(data);
    } catch (error) {
      toast({
        title: "Error loading announcements",
        description: "Failed to load announcements. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentAnnouncementId(null);
    setIsEditing(false);
  };

  const handleCreateOrUpdate = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing information",
        description: "Please fill out the title and content fields",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && currentAnnouncementId) {
        // Update existing announcement
        const updated = await updateAnnouncement(currentAnnouncementId, formData);
        setAnnouncements(announcements.map(a => 
          a.id === currentAnnouncementId ? updated : a
        ));
      } else {
        // Create new announcement
        const newAnnouncement = await createAnnouncement(formData);
        setAnnouncements([newAnnouncement, ...announcements]);
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast({
        title: "Error",
        description: "Failed to save announcement. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      published: announcement.published,
      important: announcement.important,
      image_url: announcement.image_url || "",
      link_url: announcement.link_url || ""
    });
    setCurrentAnnouncementId(announcement.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteAnnouncement(id);
      if (success) {
        setAnnouncements(announcements.filter(a => a.id !== id));
        
        // If the deleted announcement was being edited, reset the form
        if (currentAnnouncementId === id) {
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await toggleAnnouncementPublishStatus(id, currentStatus);
      setAnnouncements(announcements.map(a => 
        a.id === id ? updated : a
      ));
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const handleToggleImportant = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await toggleAnnouncementImportantStatus(id, currentStatus);
      setAnnouncements(announcements.map(a => 
        a.id === id ? updated : a
      ));
    } catch (error) {
      console.error("Error toggling important status:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'event':
        return <Calendar className="h-4 w-4 text-coral" />;
      case 'recruitment':
        return <Bell className="h-4 w-4 text-turquoise" />;
      case 'update':
        return <Bell className="h-4 w-4 text-amethyst" />;
      default:
        return <Bell className="h-4 w-4 text-foreground" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'event':
        return 'Acara';
      case 'recruitment':
        return 'Rekrutmen';
      case 'update':
        return 'Update';
      default:
        return category;
    }
  };

  const getCategoryClasses = (category: string) => {
    switch (category) {
      case 'event':
        return 'bg-coral/20 text-coral';
      case 'recruitment':
        return 'bg-turquoise/20 text-turquoise';
      case 'update':
        return 'bg-amethyst/20 text-amethyst';
      default:
        return 'bg-foreground/20 text-foreground';
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
      <CardHeader>
        <CardTitle>Kelola Pengumuman</CardTitle>
        <CardDescription>Tambah, edit, dan hapus pengumuman komunitas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          {/* Form */}
          <div className="w-full lg:w-1/2">
            <Card className="bg-foreground/5 border-foreground/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {isEditing ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Judul pengumuman"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger className="w-full bg-foreground/5 border-foreground/10">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event">Acara</SelectItem>
                        <SelectItem value="recruitment">Rekrutmen</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Konten</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Isi pengumuman"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="min-h-[120px] bg-foreground/5 border-foreground/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL Gambar (Opsional)</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link_url">URL Link (Opsional)</Label>
                    <Input
                      id="link_url"
                      name="link_url"
                      placeholder="https://example.com/more-info"
                      value={formData.link_url}
                      onChange={handleInputChange}
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleSwitchChange('published', checked)}
                      />
                      <Label htmlFor="published">Publikasikan</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="important"
                        checked={formData.important}
                        onCheckedChange={(checked) => handleSwitchChange('important', checked)}
                      />
                      <Label htmlFor="important">Penting</Label>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-2 pt-2 border-t border-foreground/10">
                    <Button
                      onClick={handleCreateOrUpdate}
                      className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                      disabled={isSaving}
                    >
                      {isSaving ? 
                        "Menyimpan..." : 
                        isEditing ? "Update" : "Buat Pengumuman"
                      }
                    </Button>
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={resetForm}
                        className="bg-foreground/5 border-foreground/10"
                        disabled={isSaving}
                      >
                        Batal
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* List of announcements */}
          <div className="w-full lg:w-1/2">
            <Card className="bg-foreground/5 border-foreground/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Daftar Pengumuman</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={resetForm}
                    disabled={isLoading || isSaving}
                    className="bg-foreground/5 border-foreground/10"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Baru
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-2">
                  {isLoading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-foreground/5 rounded-md p-3 border border-foreground/10">
                          <div className="flex items-start justify-between">
                            <div className="space-y-3">
                              <Skeleton className="h-5 w-40" />
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-12 w-full" />
                            </div>
                            <Skeleton className="h-8 w-24" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : announcements.length === 0 ? (
                    <div className="text-center py-8 text-foreground/50">
                      Belum ada pengumuman. Buat pengumuman pertamamu.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {announcements.map((announcement) => (
                        <div 
                          key={announcement.id}
                          className={`bg-foreground/5 rounded-md p-3 border ${announcement.published ? 'border-foreground/10' : 'border-foreground/5 bg-foreground/10'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${getCategoryClasses(announcement.category)}`}>
                                  {getCategoryIcon(announcement.category)}
                                  {getCategoryName(announcement.category)}
                                </span>
                                {announcement.important && (
                                  <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    Penting
                                  </span>
                                )}
                              </div>
                              <h3 className={`font-medium ${announcement.published ? '' : 'text-foreground/40'}`}>
                                {announcement.title}
                              </h3>
                              <div className="flex items-center text-xs text-foreground/50">
                                <Calendar className="h-3 w-3 mr-1" />
                                {format(new Date(announcement.created_at), "dd MMM yyyy")}
                              </div>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleTogglePublish(announcement.id, announcement.published)}
                                title={announcement.published ? "Sembunyikan" : "Publikasikan"}
                              >
                                <Switch
                                  checked={announcement.published}
                                  className="pointer-events-none"
                                />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEdit(announcement)}
                                title="Edit"
                              >
                                Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-secondary/90 backdrop-blur-xl border border-white/10">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Hapus Pengumuman</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Apakah kamu yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-foreground/5 border-foreground/10 hover:bg-foreground/10">Batal</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDelete(announcement.id)}
                                      className="bg-red-500 text-white hover:bg-red-600"
                                    >
                                      Hapus
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          
                          <p className={`text-sm mt-2 line-clamp-2 ${announcement.published ? 'text-foreground/70' : 'text-foreground/40'}`}>
                            {announcement.content}
                          </p>
                          
                          <div className="mt-2 flex flex-wrap gap-2">
                            {announcement.image_url && (
                              <div className="text-xs flex items-center gap-1 text-foreground/50">
                                <Upload size={12} />
                                <span className="truncate max-w-[100px]">Image</span>
                              </div>
                            )}
                            
                            {announcement.link_url && (
                              <div className="text-xs flex items-center gap-1 text-foreground/50">
                                <Link2 size={12} />
                                <span className="truncate max-w-[100px]">{announcement.link_url}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t border-foreground/10 pt-2 px-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-foreground/5 border-foreground/10"
                  onClick={loadAnnouncements}
                  disabled={isLoading}
                >
                  {isLoading ? "Memuat..." : "Muat Ulang"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementEditor;
