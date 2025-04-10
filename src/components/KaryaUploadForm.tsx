import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { Plus, Upload, Loader2, Check, ChevronDown, Video, Image, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MDXEditor } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

type KaryaInsert = Database['public']['Tables']['karya']['Insert'];

const formSchema = z.object({
  title: z.string().min(3, 'Judul harus minimal 3 karakter'),
  creator_name: z.string().min(2, 'Nama creator harus minimal 2 karakter'),
  category: z.enum(['design', 'video', 'writing', 'meme'], {
    required_error: 'Pilih kategori',
  }),
  description: z.string().optional(),
  content_url: z.string().url('URL konten tidak valid').optional().or(z.literal('')),
  media_file: z.instanceof(File, { message: 'File wajib diupload' }).optional(),
  media_type: z.enum(['image', 'video', 'text', 'pdf', 'docx'], {
    required_error: 'Pilih tipe media',
  }),
  image_url: z.string().optional(),
});

export function KaryaUploadForm() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'text' | 'pdf' | 'docx'>('image');
  const [isUploading, setIsUploading] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      creator_name: '',
      category: undefined,
      description: '',
      content_url: '',
      media_type: 'image',
      image_url: '',
    },
  });

  // Handle image/video file change
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'pdf' | 'docx') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    let allowedTypes: string[];
    let maxSize: number;
    
    if (type === 'image') {
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      maxSize = 1 * 1024 * 1024; // 1MB
    } else if (type === 'video') {
      allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      maxSize = 50 * 1024 * 1024; // 50MB
    } else if (type === 'pdf') {
      allowedTypes = ['application/pdf'];
      maxSize = 10 * 1024 * 1024; // 10MB
    } else {
      allowedTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      maxSize = 10 * 1024 * 1024; // 10MB
    }

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Format tidak didukung',
        description: type === 'image' 
          ? 'Gunakan format gambar: JPG, PNG, WebP, atau GIF'
          : type === 'video'
          ? 'Gunakan format video: MP4, WebM, atau OGG'
          : type === 'pdf'
          ? 'Gunakan format PDF'
          : 'Gunakan format DOCX',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast({
        title: 'Ukuran terlalu besar',
        description: type === 'image'
          ? 'Ukuran maksimal gambar adalah 1MB'
          : type === 'video'
          ? 'Ukuran maksimal video adalah 50MB'
          : 'Ukuran maksimal file adalah 10MB',
        variant: 'destructive',
      });
      return;
    }

    setMediaFile(file);
    setMediaType(type);
    form.setValue('media_file', file);
    form.setValue('media_type', type);
    
    // Create preview
    if (type === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setMediaPreview(result);
      };
      reader.readAsDataURL(file);
    } else if (type === 'video') {
      const videoUrl = URL.createObjectURL(file);
      setMediaPreview(videoUrl);
    }
  };

  // Set to text mode
  const handleTextMode = () => {
    setMediaType('text');
    setMediaFile(null);
    setMediaPreview(null);
    form.setValue('media_type', 'text');
    form.setValue('media_file', undefined);
  };

  const resetForm = () => {
    form.reset();
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType('image');
    setMarkdownContent('');
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // For text entries, we don't need a media file
    if (mediaType !== 'text' && !mediaFile) {
      toast({
        title: mediaType === 'image' ? 'Gambar diperlukan' : 'Video diperlukan',
        description: `Silakan upload ${mediaType === 'image' ? 'gambar' : 'video'} untuk karya Anda`,
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = '';
      
      // If we have a media file (image or video), upload it
      if (mediaFile) {
        // Create a unique filename
        const fileExt = mediaFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `karya/${fileName}`;

        // Upload media to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('karya-images')
          .upload(filePath, mediaFile);
        
        if (uploadError) {
          console.error('Error uploading to storage:', uploadError);
          toast({
            title: 'Gagal mengunggah file',
            description: uploadError.message,
            variant: 'destructive',
          });
          setIsUploading(false);
          return;
        }
        
        // Get the public URL for the uploaded media
        imageUrl = `https://nmjakogetnzrfluicvdh.supabase.co/storage/v1/object/public/karya-images/${filePath}`;
      }

      // Insert record into Supabase with status set to 'pending'
      const karyaData: any = {
        title: values.title,
        creator_name: values.creator_name,
        category: values.category,
        description: values.description || null,
        content_url: values.content_url || null,
        status: 'pending', // Set the status to pending for admin review
      };
      
      // Set appropriate URLs based on media type
      if (mediaType === 'image') {
        karyaData.image_url = imageUrl;
      } else if (mediaType === 'video') {
        karyaData.image_url = imageUrl; // Video file url becomes the image url for preview
      } else if (mediaType === 'text') {
        // For text entries, we set a placeholder image and the content is in the description
        karyaData.image_url = '/lovable-uploads/karyatulis.png'; // Default image for text entries
      }

      const { data, error } = await supabase.from('karya').insert(karyaData);

      if (error) {
        console.error('Error uploading karya:', error);
        toast({
          title: 'Gagal menyimpan karya',
          description: error.message,
          variant: 'destructive',
        });
        setIsUploading(false);
        return;
      }

      toast({
        title: 'Karya berhasil diunggah!',
        description: 'Karya Anda sedang menunggu persetujuan admin',
      });

      // Close dialog and reset form
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error uploading karya:', error);
      toast({
        title: 'Gagal mengunggah',
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengunggah karya',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="gap-2 bg-gradient-to-b from-grayMid to-grayDark text-white rounded-full shadow-md border border-grayLight/20 backdrop-blur-sm hover:shadow-lg transition-all hover:from-grayMid/90 hover:to-grayDark/90 hover:scale-[1.03]" 
          size="lg"
        >
          <Plus className="h-5 w-5" /> Unggah Karya
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background-dark border-grayMid/30">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-serif text-foreground-dark">Unggah Karya Baru</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Karya yang diunggah akan dimoderasi oleh admin sebelum ditampilkan
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="image" className="mt-4" onValueChange={(value) => {
          if (value === 'image') setMediaType('image');
          else if (value === 'video') setMediaType('video');
          else if (value === 'text') handleTextMode();
          else if (value === 'pdf') setMediaType('pdf');
          else if (value === 'docx') setMediaType('docx');
        }}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Gambar</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Tulis</span>
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </TabsTrigger>
            <TabsTrigger value="docx" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>DOCX</span>
            </TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
              <TabsContent value="image" className="mt-0">
                {/* Image Upload Area */}
                <div className="space-y-2">
                  <FormLabel className="block text-foreground-dark">Gambar Karya</FormLabel>
                  <div className="flex flex-col items-center justify-center gap-4">
                    {mediaPreview && mediaType === 'image' ? (
                      <div className="relative w-full aspect-square max-w-[300px] mx-auto overflow-hidden rounded-xl border border-grayMid/30">
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-grayDark/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                          <Check className="h-3 w-3 text-white" /> Terpilih
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute bottom-2 right-2 opacity-90"
                          onClick={() => {
                            setMediaFile(null);
                            setMediaPreview(null);
                            form.setValue('media_file', undefined);
                          }}
                        >
                          Hapus
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-square max-w-[300px] rounded-xl border-2 border-dashed border-grayMid/40 hover:border-grayMid/70 bg-secondary-dark/50 cursor-pointer transition-all duration-300 hover:bg-secondary-dark/80 group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="bg-grayDark/50 p-3 rounded-full mb-3 group-hover:bg-grayDark/70 transition-colors">
                            <Upload className="w-8 h-8 text-grayLight group-hover:text-white transition-colors" />
                          </div>
                          <p className="mb-2 text-base text-foreground-dark font-medium">Klik untuk unggah gambar</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, WEBP, GIF (Max 1MB)</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/webp, image/gif"
                          onChange={(e) => handleMediaChange(e, 'image')}
                        />
                      </label>
                    )}
                    {!mediaFile && mediaType === 'image' && (
                      <p className="text-xs text-center text-destructive font-medium">Gambar wajib diupload</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="mt-0">
                {/* Video Upload Area */}
                <div className="space-y-2">
                  <FormLabel className="block text-foreground-dark">Video Karya</FormLabel>
                  <div className="flex flex-col items-center justify-center gap-4">
                    {mediaPreview && mediaType === 'video' ? (
                      <div className="relative w-full aspect-video max-w-[400px] mx-auto overflow-hidden rounded-xl border border-grayMid/30 bg-black">
                        <video
                          src={mediaPreview}
                          className="w-full h-full object-contain"
                          controls
                        />
                        <div className="absolute top-2 right-2 bg-grayDark/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                          <Check className="h-3 w-3 text-white" /> Terpilih
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute bottom-2 right-2 opacity-90"
                          onClick={() => {
                            setMediaFile(null);
                            setMediaPreview(null);
                            form.setValue('media_file', undefined);
                          }}
                        >
                          Hapus
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-video max-w-[400px] rounded-xl border-2 border-dashed border-grayMid/40 hover:border-grayMid/70 bg-secondary-dark/50 cursor-pointer transition-all duration-300 hover:bg-secondary-dark/80 group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="bg-grayDark/50 p-3 rounded-full mb-3 group-hover:bg-grayDark/70 transition-colors">
                            <Video className="w-8 h-8 text-grayLight group-hover:text-white transition-colors" />
                          </div>
                          <p className="mb-2 text-base text-foreground-dark font-medium">Klik untuk unggah video</p>
                          <p className="text-xs text-muted-foreground">MP4, WebM, OGG (Max 50MB)</p>
                        </div>
                        <input
                          ref={videoInputRef}
                          type="file"
                          className="hidden"
                          accept="video/mp4, video/webm, video/ogg"
                          onChange={(e) => handleMediaChange(e, 'video')}
                        />
                      </label>
                    )}
                    {!mediaFile && mediaType === 'video' && (
                      <p className="text-xs text-center text-destructive font-medium">Video wajib diupload</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="mt-0">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground-dark">Konten Tulisan</FormLabel>
                      <FormControl>
                        <div className="min-h-[400px] rounded-xl border border-grayMid/30 overflow-hidden">
                          <MDXEditor
                            markdown={markdownContent}
                            onChange={(content) => {
                              setMarkdownContent(content);
                              field.onChange(content);
                            }}
                            className="prose prose-invert max-w-none p-4 bg-secondary-dark/70"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="pdf" className="mt-0">
                <FormField
                  control={form.control}
                  name="media_file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground-dark">File PDF</FormLabel>
                      <FormControl>
                        <label className="flex flex-col items-center justify-center w-full aspect-[4/3] rounded-xl border-2 border-dashed border-grayMid/40 hover:border-grayMid/70 bg-secondary-dark/50 cursor-pointer transition-all duration-300 hover:bg-secondary-dark/80 group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="bg-grayDark/50 p-3 rounded-full mb-3 group-hover:bg-grayDark/70 transition-colors">
                              <FileText className="w-8 h-8 text-grayLight group-hover:text-white transition-colors" />
                            </div>
                            <p className="mb-2 text-base text-foreground-dark font-medium">Klik untuk unggah PDF</p>
                            <p className="text-xs text-muted-foreground">PDF (Max 10MB)</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="application/pdf"
                            onChange={(e) => handleMediaChange(e, 'pdf')}
                          />
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="docx" className="mt-0">
                <FormField
                  control={form.control}
                  name="media_file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground-dark">File DOCX</FormLabel>
                      <FormControl>
                        <label className="flex flex-col items-center justify-center w-full aspect-[4/3] rounded-xl border-2 border-dashed border-grayMid/40 hover:border-grayMid/70 bg-secondary-dark/50 cursor-pointer transition-all duration-300 hover:bg-secondary-dark/80 group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="bg-grayDark/50 p-3 rounded-full mb-3 group-hover:bg-grayDark/70 transition-colors">
                              <FileText className="w-8 h-8 text-grayLight group-hover:text-white transition-colors" />
                            </div>
                            <p className="mb-2 text-base text-foreground-dark font-medium">Klik untuk unggah DOCX</p>
                            <p className="text-xs text-muted-foreground">DOCX (Max 10MB)</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => handleMediaChange(e, 'docx')}
                          />
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Common Form Fields for All Media Types */}
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground-dark">Judul Karya</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Masukkan judul karya" 
                        {...field} 
                        className="bg-secondary-dark/70 border-grayMid/30 focus:border-grayLight/80 text-foreground-dark placeholder:text-grayMid/70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Creator Name */}
              <FormField
                control={form.control}
                name="creator_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground-dark">Nama Creator</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nama Anda" 
                        {...field} 
                        className="bg-secondary-dark/70 border-grayMid/30 focus:border-grayLight/80 text-foreground-dark placeholder:text-grayMid/70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground-dark">Kategori</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger 
                          className="bg-secondary-dark/70 border-grayMid/30 text-foreground-dark focus:ring-grayLight/50 focus:border-grayLight/80 h-12 rounded-xl"
                        >
                          <SelectValue placeholder="Pilih kategori karya" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent 
                        className="bg-secondary-dark border-grayMid/30 text-foreground-dark rounded-xl backdrop-blur-lg"
                        position="popper"
                        sideOffset={5}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="py-1"
                        >
                          <SelectItem value="design" className="focus:bg-grayMid/20 focus:text-foreground-dark hover:bg-grayMid/10 py-2">
                            <div className="flex items-center gap-2">
                              <div className="bg-white/80 p-1 rounded-full">
                                <img src="/lovable-uploads/design.png" alt="" className="w-4 h-4 object-contain" />
                              </div>
                              <span>Design</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="video" className="focus:bg-grayMid/20 focus:text-foreground-dark hover:bg-grayMid/10 py-2">
                            <div className="flex items-center gap-2">
                              <div className="bg-white/80 p-1 rounded-full">
                                <img src="/lovable-uploads/video.png" alt="" className="w-4 h-4 object-contain" />
                              </div>
                              <span>Video</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="writing" className="focus:bg-grayMid/20 focus:text-foreground-dark hover:bg-grayMid/10 py-2">
                            <div className="flex items-center gap-2">
                              <div className="bg-white/80 p-1 rounded-full">
                                <img src="/lovable-uploads/karyatulis.png" alt="" className="w-4 h-4 object-contain" />
                              </div>
                              <span>Karya Tulis</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="meme" className="focus:bg-grayMid/20 focus:text-foreground-dark hover:bg-grayMid/10 py-2">
                            <div className="flex items-center gap-2">
                              <div className="bg-white/80 p-1 rounded-full">
                                <img src="/lovable-uploads/meme.png" alt="" className="w-4 h-4 object-contain" />
                              </div>
                              <span>Meme</span>
                            </div>
                          </SelectItem>
                        </motion.div>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description - Only show for image and video */}
              {mediaType !== 'text' && (
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground-dark">Deskripsi (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Jelaskan tentang karya Anda" 
                          {...field} 
                          className="resize-none bg-secondary-dark/70 border-grayMid/30 focus:border-grayLight/80 text-foreground-dark placeholder:text-grayMid/70 rounded-xl min-h-[100px]"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Content URL - Show for all media types */}
              <FormField
                control={form.control}
                name="content_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground-dark">Link Konten (Opsional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://..." 
                        {...field} 
                        value={field.value || ''}
                        className="bg-secondary-dark/70 border-grayMid/30 focus:border-grayLight/80 text-foreground-dark placeholder:text-grayMid/70 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-2">
                <DialogClose asChild>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="border-grayMid/30 hover:bg-grayDark/30 text-foreground-dark rounded-xl"
                  >
                    Batal
                  </Button>
                </DialogClose>
                <Button 
                  type="submit" 
                  disabled={isUploading}
                  className="bg-gradient-to-b from-grayMid to-grayDark hover:from-grayMid/90 hover:to-grayDark/90 text-white border border-grayLight/10 shadow-md hover:shadow-lg transition-all rounded-xl"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengunggah...
                    </>
                  ) : (
                    'Unggah Karya'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
