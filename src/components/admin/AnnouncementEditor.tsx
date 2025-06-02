import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Eye, EyeOff, Star, StarOff, Trash2 } from "lucide-react";
import { Announcement } from "@/models/Announcement";
import {
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  toggleAnnouncementImportantStatus,
  toggleAnnouncementPublishStatus,
  fetchAnnouncements
} from "@/services/adminAnnouncementService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AnnouncementEditorProps {
  onClose: () => void;
  onAnnouncementCreated?: (announcement: Announcement) => void;
}

export const AnnouncementEditor: React.FC<AnnouncementEditorProps> = ({ onClose, onAnnouncementCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("update");
  const [published, setPublished] = useState(true);
  const [important, setImportant] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [linkUrl, setLinkUrl] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAnnouncement = async () => {
    setIsLoading(true);
    try {
      const newAnnouncement = await createAnnouncement({
        title,
        content,
        category,
        published,
        important,
        image_url: imageUrl,
        link_url: linkUrl
      });

      toast.success("Pengumuman berhasil dibuat!");
      onAnnouncementCreated?.(newAnnouncement);
      onClose();
    } catch (error: any) {
      console.error("Error creating announcement:", error);
      toast.error(`Gagal membuat pengumuman: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Buat Pengumuman
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Buat Pengumuman Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Judul
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right">
              Konten
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 min-h-[150px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Kategori
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="recruitment">Rekrutmen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              URL Gambar
            </Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl || ""}
              onChange={(e) => setImageUrl(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="linkUrl" className="text-right">
              URL Link
            </Label>
            <Input
              id="linkUrl"
              type="url"
              value={linkUrl || ""}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="published" className="text-right">
              Dipublikasikan
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch id="published" checked={published} onCheckedChange={setPublished} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="important" className="text-right">
              Penting
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch id="important" checked={important} onCheckedChange={setImportant} />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose} className="mr-2">
            Batal
          </Button>
          <Button onClick={handleCreateAnnouncement} disabled={isLoading}>
            {isLoading ? "Membuat..." : "Buat Pengumuman"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
