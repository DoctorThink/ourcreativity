
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, FileText, Image, Video, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const categories = [
  { value: 'design', label: 'Image', icon: Image, acceptedTypes: 'image/*', maxSize: 5 * 1024 * 1024 },
  { value: 'video', label: 'Video', icon: Video, acceptedTypes: 'video/*', maxSize: 5 * 1024 * 1024 },
  { value: 'meme', label: 'Meme', icon: Smile, acceptedTypes: 'image/*', maxSize: 5 * 1024 * 1024 },
  { value: 'writing', label: 'Karya Tulis', icon: FileText, acceptedTypes: '', maxSize: 0 },
];

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    content: '', // For written work
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const selectedCategory = categories.find(cat => cat.value === formData.category);
  const isWrittenWork = formData.category === 'writing';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul tidak boleh kosong';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori harus dipilih';
    }

    if (!isWrittenWork && !file) {
      newErrors.file = 'File harus dipilih';
    }

    if (isWrittenWork && !formData.content.trim()) {
      newErrors.content = 'Konten karya tulis tidak boleh kosong';
    }

    if (file && selectedCategory) {
      if (file.size > selectedCategory.maxSize) {
        newErrors.file = 'Ukuran file melebihi 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedCategory && selectedFile.size > selectedCategory.maxSize) {
      setErrors({ ...errors, file: 'Ukuran file melebihi 5MB' });
      return;
    }
    setFile(selectedFile);
    setErrors({ ...errors, file: '' });
  };

  const uploadFile = async () => {
    if (!file || !selectedCategory) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const bucketName = formData.category === 'video' ? 'karya-videos' : 'karya-images';

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  };

  const saveToDatabase = async (filePath?: string) => {
    const { data, error } = await supabase
      .from('karya')
      .insert({
        title: formData.title,
        description: formData.description || null,
        category: formData.category,
        creator_name: 'Anonymous',
        image_url: filePath || '',
        content_url: isWrittenWork ? formData.content : (filePath || ''),
        status: 'pending'
      });

    if (error) throw error;
    return data;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setUploading(true);
    try {
      let filePath = undefined;
      
      if (!isWrittenWork && file) {
        filePath = await uploadFile();
      }

      await saveToDatabase(filePath);

      toast({
        title: "Karya berhasil diunggah! 🎉",
        description: "Karya kamu sedang dalam review dan akan segera dipublikasikan.",
      });

      // Reset form
      setFormData({ title: '', category: '', description: '', content: '' });
      setFile(null);
      setErrors({});
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload gagal",
        description: "Terjadi kesalahan saat mengunggah karya. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setFormData({ title: '', category: '', description: '', content: '' });
      setFile(null);
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-black/80 border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white">
            Unggah Karya Baru
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white hover:bg-white/10"
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium">
              Judul Karya *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/5 border-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50"
              placeholder="Berikan judul yang menarik untuk karya kamu"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white font-medium">
              Kategori *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                setFormData({ ...formData, category: value });
                setFile(null); // Reset file when category changes
                setErrors({ ...errors, category: '', file: '' });
              }}
            >
              <SelectTrigger className="bg-white/5 border-white/20 backdrop-blur-lg text-white rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50">
                <SelectValue placeholder="Pilih kategori karya" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20 text-white">
                {categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-400 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Conditional Input Section */}
          {formData.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isWrittenWork ? (
                // Written Work - Markdown Text Area
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-white font-medium">
                    Konten Karya Tulis * 
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="min-h-[200px] bg-white/5 border-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none"
                    placeholder="Tulis karya kamu di sini... Mendukung format Markdown untuk styling text."
                  />
                  <p className="text-xs text-gray-400">
                    Mendukung format Markdown untuk styling text (bold, italic, heading, dll.)
                  </p>
                  {errors.content && (
                    <p className="text-red-400 text-sm">{errors.content}</p>
                  )}
                </div>
              ) : (
                // File Upload for Images/Videos/Memes
                <div className="space-y-2">
                  <Label className="text-white font-medium">
                    Upload File *
                  </Label>
                  {file ? (
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        {selectedCategory && <selectedCategory.icon className="w-5 h-5 text-cyan-400" />}
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-gray-400 text-sm">
                            {Math.round(file.size / 1024)}KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFile(null)}
                        className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                      >
                        Ganti
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept={selectedCategory?.acceptedTypes}
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                      />
                      <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-white font-medium">Klik untuk pilih file</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Atau drag & drop file di sini
                        </p>
                      </div>
                    </label>
                  )}
                  <p className="text-xs text-gray-400">
                    Maksimum 5MB. File yang didukung: {selectedCategory?.value === 'video' ? 'MP4, MOV, WEBM' : 'JPG, PNG, GIF, WEBP'}
                  </p>
                  {errors.file && (
                    <p className="text-red-400 text-sm">{errors.file}</p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">
              Deskripsi Singkat
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-20 bg-white/5 border-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none"
              placeholder="Ceritakan sedikit tentang karya kamu (opsional)"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
              className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={uploading}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Mengunggah...
                </>
              ) : (
                'Kirim'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
