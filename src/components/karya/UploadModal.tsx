import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Upload, FileText, Image, Video, Smile, Bold, Italic, 
  Quote, Link, List, Eye, Edit3, Camera, Play, User
} from 'lucide-react';
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
  { 
    value: 'design', 
    label: 'Graphic Design', 
    icon: Image, 
    acceptedTypes: 'image/*', 
    maxSize: 5 * 1024 * 1024,
    description: 'Unggah karya desain grafis Anda'
  },
  { 
    value: 'video', 
    label: 'Video Editing', 
    icon: Video, 
    acceptedTypes: 'video/*', 
    maxSize: 50 * 1024 * 1024, // Increased size for video
    description: 'Bagikan proyek video editing Anda'
  },
  { 
    value: 'meme', 
    label: 'Meme', 
    icon: Smile, 
    acceptedTypes: 'image/*', 
    maxSize: 5 * 1024 * 1024,
    description: 'Buat dan bagikan meme'
  },
  { 
    value: 'writing', 
    label: 'Karya Tulis', 
    icon: FileText, 
    acceptedTypes: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain', 
    maxSize: 10 * 1024 * 1024, // 10MB for documents
    description: 'Unggah dokumen (PDF, Word, Teks)'
  },
];

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    creator_name: '', // Added creator_name
    category: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  // Auto-save draft functionality
  useEffect(() => {
    if (isOpen) {
      const savedDraft = localStorage.getItem('karya-draft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.title || draft.description || draft.creator_name) {
          toast({
            title: "Draft tersimpan ditemukan",
            description: "Apakah kamu ingin melanjutkan draft yang tersimpan?",
            action: (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setFormData(draft);
                  toast({ title: "Draft dipulihkan!" });
                }}
              >
                Pulihkan
              </Button>
            ),
          });
        }
      }
    }
  }, [isOpen, toast]);

  // Save draft every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title || formData.description || formData.creator_name) {
        localStorage.setItem('karya-draft', JSON.stringify(formData));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [formData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul tidak boleh kosong';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Judul terlalu panjang (maksimal 100 karakter)';
    }

    if (!formData.creator_name.trim()) {
      newErrors.creator_name = 'Nama kreator tidak boleh kosong';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori harus dipilih';
    }

    if (!file) {
      newErrors.file = 'File harus dipilih';
    }

    if (file && selectedCategory) {
      if (file.size > selectedCategory.maxSize) {
        newErrors.file = `Ukuran file melebihi batas (${selectedCategory.maxSize / 1024 / 1024}MB)`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedCategory && selectedFile.size > selectedCategory.maxSize) {
      setErrors({ ...errors, file: `Ukuran file melebihi batas (${selectedCategory.maxSize / 1024 / 1024}MB)` });
      return;
    }
    
    setFile(selectedFile);
    setErrors({ ...errors, file: '' });
    
    // Generate preview
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else if (selectedFile.type.startsWith('video/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file || !selectedCategory) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const bucketName = formData.category === 'video' ? 'karya-videos' : 'karya-images';

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    clearInterval(progressInterval);
    setUploadProgress(100);

    if (error) throw error;

    // Return the full public URL
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return publicUrl;
  };

  const saveToDatabase = async (fileUrl: string) => {
    const karyaData: any = {
      title: formData.title,
      category: formData.category,
      creator_name: formData.creator_name,
      description: formData.description || null,
      status: 'pending'
    };

    if (formData.category === 'writing') {
      karyaData.content_url = fileUrl; // Document URL
      karyaData.image_url = '/lovable-uploads/karyatulis.png'; // Default thumbnail
    } else {
      karyaData.image_url = fileUrl; // Media URL
      karyaData.content_url = null;
    }
    
    console.log('Saving karya data:', karyaData);

    const { data, error } = await supabase
      .from('karya')
      .insert([karyaData]);

    if (error) throw error;
    return data;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setUploading(true);
    setUploadProgress(0);
    
    try {
      const fileUrl = await uploadFile();
      if (!fileUrl) {
        toast({
          title: "File upload gagal",
          description: "Tidak dapat mengunggah file, silakan coba lagi.",
          variant: "destructive",
        });
        setUploading(false);
        return;
      }

      await saveToDatabase(fileUrl);

      toast({
        title: "Karya berhasil diunggah!",
        description: "Karya kamu sedang dalam review dan akan segera dipublikasikan.",
      });

      // Clear draft and reset form
      localStorage.removeItem('karya-draft');
      setFormData({ title: '', creator_name: '', category: '', description: '' });
      setFile(null);
      setPreviewUrl(null);
      setErrors({});
      setUploadProgress(0);
      
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
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-black/90 border border-white/30 text-white rounded-3xl shadow-2xl p-4 md:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl md:text-2xl font-serif text-white text-center">
            Unggah Karya Baru
          </DialogTitle>
          <p className="text-gray-300 text-sm text-center">
            Bagikan kreativitas kamu dengan komunitas Our Creativity
          </p>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white hover:bg-white/20 rounded-full"
              disabled={uploading}
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium text-sm">
              Judul Karya
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/10 border-white/30 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50"
              placeholder="Berikan judul yang menarik untuk karya kamu"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
            )}
          </div>
          
          {/* Creator Name Input */}
          <div className="space-y-2">
            <Label htmlFor="creator_name" className="text-white font-medium text-sm">
              Nama Kreator
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="creator_name"
                value={formData.creator_name}
                onChange={(e) => setFormData({ ...formData, creator_name: e.target.value })}
                className="bg-white/10 border-white/30 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50 pl-9"
                placeholder="Masukkan nama Anda atau tim"
              />
            </div>
            {errors.creator_name && (
              <p className="text-red-400 text-sm">{errors.creator_name}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white font-medium text-sm">
              Kategori
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                setFormData({ ...formData, category: value });
                setFile(null);
                setPreviewUrl(null);
                setErrors({ ...errors, category: '', file: '' });
              }}
            >
              <SelectTrigger className="bg-white/10 border-white/30 backdrop-blur-lg text-white rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50">
                <SelectValue placeholder="Pilih kategori karya" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900/95 border-white/30 text-white rounded-xl backdrop-blur-xl">
                {categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-white hover:bg-white/20 focus:bg-white/20 rounded-lg m-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] flex items-center justify-center">
                        <category.icon className="w-3 h-3 text-black" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{category.label}</div>
                        <div className="text-xs text-gray-400">{category.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-400 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Conditional Input Section - Simplified for file upload */}
          {formData.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="space-y-4">
                <Label className="text-white font-medium text-sm">
                  Upload File
                </Label>
                
                {file ? (
                  <div className="space-y-4">
                    {/* File Preview */}
                    <div className="flex items-center gap-4 p-3 bg-white/10 border border-white/30 rounded-xl">
                      {previewUrl && file.type.startsWith('image/') ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-12 h-12 object-cover rounded-lg border-2 border-white/30"
                        />
                      ) : (
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg border-2 border-white/30 bg-white/5 flex items-center justify-center">
                          {selectedCategory && <selectedCategory.icon className="w-6 h-6 text-cyan-400" />}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="min-w-0">
                            <p className="text-white font-medium truncate text-sm">{file.name}</p>
                            <p className="text-gray-400 text-xs">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        
                        {uploading && uploadProgress > 0 && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Mengupload...</span>
                              <span>{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1">
                              <div 
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                          setUploadProgress(0);
                        }}
                        className="border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg flex-shrink-0 text-xs"
                        disabled={uploading}
                      >
                        Ganti
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={selectedCategory?.acceptedTypes}
                      className="hidden"
                      onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDrag={handleDrag}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`cursor-pointer transition-all duration-300 p-4 ${
                        dragActive 
                          ? 'border-cyan-400/70 bg-cyan-400/10 scale-105' 
                          : 'border-white/30 hover:border-cyan-400/50 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl bg-white/5">
                        <div className="p-2 rounded-full bg-white/10 mb-2">
                          <Upload className="w-6 h-6 text-cyan-400" />
                        </div>
                        <p className="text-white font-medium mb-1 text-sm">Drag & Drop file di sini</p>
                        <p className="text-gray-400 text-xs mb-2">atau klik untuk pilih file</p>
                        <p className="text-xs text-gray-500">
                          {selectedCategory?.description} • Max {(selectedCategory?.maxSize || 0) / 1024 / 1024}MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {errors.file && (
                  <p className="text-red-400 text-sm">{errors.file}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium text-sm">
              Deskripsi Singkat (Opsional)
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-24 bg-white/10 border-white/30 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none text-sm"
              placeholder="Ceritakan sedikit tentang karya kamu"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
              className="flex-1 border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-xl h-10 text-sm"
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={uploading}
              className="flex-1 bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] hover:from-[#9B6DFF] hover:via-[#40E0D0] hover:to-[#FF7F50] text-black hover:text-white rounded-xl h-10 font-semibold shadow-lg text-sm"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Mengunggah...
                </>
              ) : (
                'Kirim Karya'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
