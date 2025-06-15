
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, FileUp } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Category, SubmissionType, getInputTypeDetails } from '@/lib/karyaCategories';
import FileUpload from './upload/FileUpload';
import MarkdownEditor from './upload/MarkdownEditor';
import SubmissionTypeSelector from './upload/SubmissionTypeSelector';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  category: Category;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSuccess, category }) => {
  const [formData, setFormData] = useState({
    title: '',
    creator_name: '',
    description: '',
    content: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [writingOption, setWritingOption] = useState<'editor' | 'upload'>('editor');
  const [submissionType, setSubmissionType] = useState<SubmissionType>(category.recommendedInput);
  
  const { toast } = useToast();
  
  const inputTypeDetails = getInputTypeDetails(submissionType);
  
  const resetState = () => {
    setFile(null);
    setPreviewUrl(null);
    setErrors({});
    setFormData(prev => ({ ...prev, content: '' }));
    setWritingOption('editor');
    setUploadProgress(0);
    setUploading(false);
  };

  useEffect(() => {
    if (category) {
      setSubmissionType(category.recommendedInput);
      resetState();
    }
  }, [category]);
  
  useEffect(() => {
    if (isOpen) {
      // Draft saving logic can be re-introduced here if needed
    }
  }, [isOpen, toast]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Judul tidak boleh kosong';
    if (formData.title.length > 100) newErrors.title = 'Judul terlalu panjang (maksimal 100 karakter)';
    if (!formData.creator_name.trim()) newErrors.creator_name = 'Nama kreator tidak boleh kosong';
    
    if (submissionType === 'text') {
      if (writingOption === 'editor' && !formData.content.trim()) {
        newErrors.content = 'Konten karya tulis tidak boleh kosong';
      }
      if (writingOption === 'upload' && !file) {
        newErrors.file = 'Dokumen harus diunggah';
      }
    } else if (!file) {
      newErrors.file = `File ${submissionType} harus dipilih`;
    }

    if (file) {
      const details = getInputTypeDetails(writingOption === 'upload' ? 'text' : submissionType);
      if (file.size > details.maxSize) {
        newErrors.file = `Ukuran file melebihi batas (Max: ${details.maxSizeLabel})`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile === null) {
        setFile(null);
        setPreviewUrl(null);
        if (errors.file) setErrors(prev => ({...prev, file: ''}));
        return;
    }

    const details = getInputTypeDetails(writingOption === 'upload' ? 'text' : submissionType);
    if (selectedFile.size > details.maxSize) {
      setErrors({ ...errors, file: `Ukuran file melebihi ${details.maxSizeLabel}` });
      return;
    }
    
    setFile(selectedFile);
    if (errors.file) setErrors({ ...errors, file: '' });
    
    if (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const uploadFileToStorage = async () => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    let bucketName = 'karya-images';
    if (submissionType === 'video') bucketName = 'karya-videos';
    else if (submissionType === 'text' && writingOption === 'upload') bucketName = 'karya-documents';

    const progressInterval = setInterval(() => setUploadProgress(prev => Math.min(prev + Math.random() * 10, 90)), 200);
    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file);
    clearInterval(progressInterval);
    setUploadProgress(100);

    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return publicUrl;
  };

  const saveToDatabase = async (fileUrl?: string | null) => {
    const karyaData: any = {
      title: formData.title,
      category: category.value,
      creator_name: formData.creator_name,
      description: formData.description || null,
      status: 'pending',
      submission_type: submissionType,
    };

    switch (submissionType) {
      case 'image':
      case 'video':
        karyaData.image_url = fileUrl || '';
        break;
      case 'text':
        karyaData.image_url = '/lovable-uploads/karyatulis.png';
        if (writingOption === 'editor') {
          karyaData.content_url = formData.content;
        } else {
          karyaData.content_url = fileUrl || '';
        }
        break;
    }
    
    const { error } = await supabase.from('karya').insert([karyaData]);
    if (error) throw error;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setUploading(true);
    setUploadProgress(0);
    
    try {
      let fileUrl = null;
      const needsFileUpload = (submissionType !== 'text') || (writingOption === 'upload');
      if (needsFileUpload && file) {
        fileUrl = await uploadFileToStorage();
      }
      await saveToDatabase(fileUrl);

      toast({
        title: "Karya berhasil diunggah!",
        description: "Karya kamu sedang dalam review dan akan segera dipublikasikan.",
      });

      setFormData({ title: '', creator_name: '', description: '', content: '' });
      resetState();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload gagal",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmissionTypeChange = (type: SubmissionType) => {
    setSubmissionType(type);
    resetState();
  };
  
  const renderContent = () => {
    if (submissionType === 'text') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white font-medium text-sm">Metode Penulisan</Label>
            <div className="grid grid-cols-2 gap-2">
               <Button type="button" variant={writingOption === 'editor' ? "default" : "outline"} onClick={() => setWritingOption('editor')} className={`rounded-xl p-2 h-auto text-sm flex items-center justify-center gap-2 ${writingOption === 'editor' ? 'bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] text-black' : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'}`}> <Type className="w-4 h-4" /> Tulis Langsung </Button>
               <Button type="button" variant={writingOption === 'upload' ? "default" : "outline"} onClick={() => setWritingOption('upload')} className={`rounded-xl p-2 h-auto text-sm flex items-center justify-center gap-2 ${writingOption === 'upload' ? 'bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] text-black' : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'}`}><FileUp className="w-4 h-4" /> Unggah Dokumen</Button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {writingOption === 'editor' ? (
              <MarkdownEditor content={formData.content} onContentChange={(c) => setFormData(p => ({ ...p, content: c }))} error={errors.content}/>
            ) : (
              <FileUpload submissionType="document" onFileChange={handleFileChange} file={file} previewUrl={previewUrl} uploading={uploading} uploadProgress={uploadProgress} error={errors.file} />
            )}
          </AnimatePresence>
        </div>
      );
    }
    return <FileUpload submissionType={submissionType} onFileChange={handleFileChange} file={file} previewUrl={previewUrl} uploading={uploading} uploadProgress={uploadProgress} error={errors.file} />
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !uploading && onClose()}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-black/90 border border-white/30 text-white rounded-3xl shadow-2xl p-4 md:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl md:text-2xl font-serif text-white text-center">
            Unggah Karya: {category.label}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4 text-white hover:bg-white/20 rounded-full" disabled={uploading}>
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium text-sm">Judul Karya</Label>
            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-white/10 border-white/30 text-white placeholder-gray-400 rounded-xl" placeholder="Berikan judul yang menarik"/>
            {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="creator_name" className="text-white font-medium text-sm">Nama Kreator</Label>
            <Input id="creator_name" value={formData.creator_name} onChange={(e) => setFormData({ ...formData, creator_name: e.target.value })} className="bg-white/10 border-white/30 text-white placeholder-gray-400 rounded-xl" placeholder="Masukkan nama kamu atau nama pena"/>
            {errors.creator_name && <p className="text-red-400 text-sm">{errors.creator_name}</p>}
          </div>
          
          <div className="p-4 border border-white/20 rounded-2xl bg-white/5 space-y-4">
            <div className="flex items-center gap-2">
               <div className="px-3 py-1 text-xs font-semibold text-black bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] rounded-full">Disarankan</div>
               <p className="text-sm text-white">Untuk kategori {category.label}, disarankan mengunggah <strong>{inputTypeDetails.label}</strong>.</p>
            </div>
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>
          
          <SubmissionTypeSelector currentType={submissionType} onTypeChange={handleSubmissionTypeChange} />

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium text-sm">Deskripsi Singkat (Opsional)</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="h-16 bg-white/10 border-white/30 text-white placeholder-gray-400 rounded-xl resize-none text-sm" placeholder="Ceritakan sedikit tentang karya kamu"/>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={uploading} className="flex-1 border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-xl h-10 text-sm">Batal</Button>
            <Button type="button" onClick={handleSubmit} disabled={uploading} className="flex-1 bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] hover:from-[#9B6DFF] hover:via-[#40E0D0] hover:to-[#FF7F50] text-black hover:text-white rounded-xl h-10 font-semibold shadow-lg text-sm">
              {uploading ? <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />Mengunggah...</> : 'Kirim Karya'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
