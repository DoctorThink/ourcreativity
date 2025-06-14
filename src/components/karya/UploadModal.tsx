
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Upload, FileText, Image, Video, Smile, Bold, Italic, 
  Quote, Link, List, Eye, Edit3, Camera, Play
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
    maxSize: 5 * 1024 * 1024,
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
    acceptedTypes: '', 
    maxSize: 0,
    description: 'Tulis cerita, puisi, dan artikel'
  },
];

const writingTemplates = [
  { id: 'blank', name: 'Mulai dari Kosong', content: '' },
  { 
    id: 'story', 
    name: 'Template Cerita Pendek', 
    content: `# Judul Cerita

## Bab 1

Tulis cerita kamu di sini...

---

**Karakter Utama:**
- 

**Setting:**
- 

**Plot:**
- ` 
  },
  { 
    id: 'poem', 
    name: 'Template Puisi', 
    content: `# Judul Puisi

Bait pertama...

Bait kedua...

Bait ketiga...

---
~ Penulis` 
  },
  { 
    id: 'review', 
    name: 'Template Review', 
    content: `# Review: [Nama Produk/Film/Buku]

## Yang Saya Review
Jelaskan apa yang kamu review...

## Yang Bagus
- 
- 
- 

## Yang Kurang
- 
- 

## Kesimpulan
Rating: ⭐⭐⭐⭐⭐

Rekomendasi saya:` 
  }
];

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectedCategory = categories.find(cat => cat.value === formData.category);
  const isWrittenWork = formData.category === 'writing';

  // Auto-save draft functionality
  useEffect(() => {
    if (isOpen) {
      const savedDraft = localStorage.getItem('karya-draft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.title || draft.description || draft.content) {
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
      if (formData.title || formData.description || formData.content) {
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

  const insertMarkdown = (syntax: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || 'teks tebal'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'teks miring'}*`;
        break;
      case 'quote':
        newText = `> ${selectedText || 'kutipan'}`;
        break;
      case 'link':
        newText = `[${selectedText || 'teks link'}](url)`;
        break;
      case 'list':
        newText = `- ${selectedText || 'item list'}`;
        break;
    }
    
    const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end);
    setFormData({ ...formData, content: newContent });
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
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
    setUploadProgress(0);
    
    try {
      let filePath = undefined;
      
      if (!isWrittenWork && file) {
        filePath = await uploadFile();
      }

      await saveToDatabase(filePath);

      toast({
        title: "Karya berhasil diunggah!",
        description: "Karya kamu sedang dalam review dan akan segera dipublikasikan.",
      });

      // Clear draft and reset form
      localStorage.removeItem('karya-draft');
      setFormData({ title: '', category: '', description: '', content: '' });
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

  const renderMarkdownPreview = () => {
    // Simple markdown to HTML conversion
    return formData.content
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-black/90 border border-white/30 text-white rounded-3xl shadow-2xl p-4 md:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl md:text-3xl font-serif text-white text-center">
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

        <div className="space-y-6 mt-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium">
              Judul Karya
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/10 border-white/30 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50"
              placeholder="Berikan judul yang menarik untuk karya kamu"
            />
            {formData.title && (
              <p className="text-xs text-green-400">
                {formData.title.length <= 50 ? 'Judul yang bagus!' : 
                 formData.title.length <= 100 ? 'Pertimbangkan judul yang lebih pendek' : 
                 'Terlalu panjang'}
              </p>
            )}
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white font-medium">
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <category.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{category.label}</div>
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

          {/* Conditional Input Section */}
          {formData.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isWrittenWork ? (
                <div className="space-y-4">
                  {/* Template Selection */}
                  <div className="space-y-2">
                    <Label className="text-white font-medium">Template</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {writingTemplates.map((template) => (
                        <Button
                          key={template.id}
                          type="button"
                          variant={selectedTemplate === template.id ? "default" : "outline"}
                          onClick={() => {
                            setSelectedTemplate(template.id);
                            setFormData({ ...formData, content: template.content });
                          }}
                          className={`rounded-xl p-3 text-sm ${
                            selectedTemplate === template.id 
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                              : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'
                          }`}
                        >
                          {template.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Markdown Editor with Toolbar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content" className="text-white font-medium">
                        Konten Karya Tulis
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                        className="border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                      >
                        {showPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {showPreview ? 'Edit' : 'Preview'}
                      </Button>
                    </div>

                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap gap-1 p-2 bg-white/5 border border-white/20 rounded-xl">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('bold')}
                        className="text-white hover:bg-white/20 rounded-lg p-2"
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('italic')}
                        className="text-white hover:bg-white/20 rounded-lg p-2"
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('quote')}
                        className="text-white hover:bg-white/20 rounded-lg p-2"
                      >
                        <Quote className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('link')}
                        className="text-white hover:bg-white/20 rounded-lg p-2"
                      >
                        <Link className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('list')}
                        className="text-white hover:bg-white/20 rounded-lg p-2"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Editor/Preview */}
                    <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                      {!showPreview || window.innerWidth < 1024 ? (
                        <Textarea
                          ref={textareaRef}
                          id="content"
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          className="min-h-[250px] bg-white/10 border-white/30 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none"
                          placeholder="Tulis karya kamu di sini... Gunakan Markdown untuk formatting!"
                        />
                      ) : null}
                      
                      {showPreview && (
                        <div className="min-h-[250px] p-4 bg-white/5 border border-white/20 rounded-xl overflow-y-auto">
                          <div 
                            className="text-white prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: renderMarkdownPreview() }}
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-400">
                      Tips: Gunakan **bold**, *italic*, # heading, {'>'}quote, dan - list untuk formatting
                    </p>
                    {errors.content && (
                      <p className="text-red-400 text-sm">{errors.content}</p>
                    )}
                  </div>
                </div>
              ) : (
                // File Upload Section
                <div className="space-y-4">
                  <Label className="text-white font-medium">
                    Upload File
                  </Label>
                  
                  {file ? (
                    <div className="space-y-4">
                      {/* File Preview */}
                      <div className="flex items-center gap-4 p-4 bg-white/10 border border-white/30 rounded-xl">
                        {previewUrl && (
                          <div className="flex-shrink-0">
                            {file.type.startsWith('image/') ? (
                              <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-16 h-16 object-cover rounded-lg border-2 border-white/30"
                              />
                            ) : (
                              <video 
                                src={previewUrl} 
                                className="w-16 h-16 object-cover rounded-lg border-2 border-white/30"
                                muted
                              />
                            )}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {selectedCategory && <selectedCategory.icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
                            <div className="min-w-0">
                              <p className="text-white font-medium truncate">{file.name}</p>
                              <p className="text-gray-400 text-sm">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          
                          {uploading && uploadProgress > 0 && (
                            <div className="mt-2">
                              <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>Mengupload...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                              </div>
                              <div className="w-full bg-white/20 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
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
                          className="border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg flex-shrink-0"
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
                        className={`cursor-pointer transition-all duration-300 ${
                          dragActive 
                            ? 'border-cyan-400/70 bg-cyan-400/10 scale-105' 
                            : 'border-white/30 hover:border-cyan-400/50 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl bg-white/5">
                          <div className="p-3 rounded-full bg-white/10 mb-3">
                            <Upload className="w-8 h-8 text-cyan-400" />
                          </div>
                          <p className="text-white font-medium mb-2">Drag & Drop file di sini</p>
                          <p className="text-gray-400 text-sm mb-3">atau klik untuk pilih file</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {selectedCategory?.value === 'video' ? (
                              <>
                                <Play className="w-4 h-4" />
                                <span>MP4, MOV, WEBM • Max 5MB</span>
                              </>
                            ) : (
                              <>
                                <Camera className="w-4 h-4" />
                                <span>JPG, PNG, GIF, WEBP • Max 5MB</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
              className="h-20 bg-white/10 border-white/30 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none"
              placeholder="Ceritakan sedikit tentang karya kamu (opsional)"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
              className="flex-1 border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-xl h-12"
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={uploading}
              className="flex-1 bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] hover:from-[#9B6DFF] hover:via-[#40E0D0] hover:to-[#FF7F50] text-black hover:text-white rounded-xl h-12 font-semibold shadow-lg"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
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
