
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { Plus, Upload, Loader2, Check, ChevronDown } from 'lucide-react';
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

type KaryaInsert = Database['public']['Tables']['karya']['Insert'];

const formSchema = z.object({
  title: z.string().min(3, 'Judul harus minimal 3 karakter'),
  creator_name: z.string().min(2, 'Nama creator harus minimal 2 karakter'),
  category: z.enum(['design', 'video', 'writing', 'meme'], {
    required_error: 'Pilih kategori',
  }),
  description: z.string().optional(),
  content_url: z.string().url('URL konten tidak valid').optional().or(z.literal('')),
  image_url: z.string().optional(), // Make this optional as we'll validate the imageFile separately
});

export function KaryaUploadForm() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      creator_name: '',
      category: undefined,
      description: '',
      content_url: '',
      image_url: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange called', e.target.files);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Format tidak didukung',
        description: 'Gunakan format gambar: JPG, PNG, WebP, atau GIF',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Ukuran terlalu besar',
        description: 'Ukuran maksimal gambar adalah 5MB',
        variant: 'destructive',
      });
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      
      // Important: Set the image_url field value to ensure form validation passes
      form.setValue('image_url', result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    form.reset();
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('onSubmit called', values);
    if (!imageFile) {
      toast({
        title: 'Gambar diperlukan',
        description: 'Silakan upload gambar untuk karya Anda',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a unique filename
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `karya/${fileName}`;

      // Upload image to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('karya-images')
        .upload(filePath, imageFile);
      
      if (uploadError) {
        console.error('Error uploading to storage:', uploadError);
        // If storage bucket doesn't exist or permission issue, fallback to using the data URL
        const imageUrl = imagePreview;
        
        // Step 2: Insert record into Supabase with status set to 'pending'
        const { data, error } = await supabase.from('karya').insert({
          title: values.title,
          creator_name: values.creator_name,
          category: values.category,
          description: values.description || null,
          content_url: values.content_url || null,
          image_url: imageUrl,
          status: 'pending', // Set the status to pending for admin review
        });

        if (error) throw error;

        toast({
          title: 'Karya berhasil diunggah!',
          description: 'Karya Anda sedang menunggu persetujuan admin',
        });

        // Close dialog and reset form
        setIsOpen(false);
        resetForm();
        return;
      }
      
      // Get the public URL for the uploaded image
      const imageUrl = `https://nmjakogetnzrfluicvdh.supabase.co/storage/v1/object/public/karya-images/${filePath}`;

      // Step 2: Insert record into Supabase with status set to 'pending'
      const { data, error } = await supabase.from('karya').insert({
        title: values.title,
        creator_name: values.creator_name,
        category: values.category,
        description: values.description || null,
        content_url: values.content_url || null,
        image_url: imageUrl,
        status: 'pending', // Set the status to pending for admin review
      });

      if (error) throw error;

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel className="block text-foreground-dark">Gambar Karya</FormLabel>
              <div className="flex flex-col items-center justify-center gap-4">
                {imagePreview ? (
                  <div className="relative w-full aspect-square max-w-[300px] mx-auto overflow-hidden rounded-xl border border-amethyst/30 shadow-glow-sm" style={{["--tile-glow-color" as string]: "rgba(155, 109, 255, 0.15)"}}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-grayDark/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <Check className="h-3 w-3 text-emerald" /> Terpilih
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute bottom-2 right-2 opacity-90"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        form.setValue('image_url', '');
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-square max-w-[300px] rounded-xl border-2 border-dashed border-grayMid/40 hover:border-primary/50 bg-secondary-dark/50 cursor-pointer transition-all duration-300 hover:bg-secondary-dark/80 hover:shadow-glow-sm group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="bg-grayDark/50 p-3 rounded-full mb-3 group-hover:bg-amethyst/20 transition-colors">
                        <Upload className="w-8 h-8 text-grayLight group-hover:text-amethyst transition-colors" />
                      </div>
                      <p className="mb-2 text-base text-foreground-dark font-medium">Klik untuk unggah gambar</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, WEBP, GIF (Max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/webp, image/gif"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <input 
                type="hidden" 
                {...form.register('image_url')}
                value={imagePreview || ''}
              />
              {form.formState.errors.image_url && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.image_url.message}</p>
              )}
              {!imagePreview && !form.formState.errors.image_url && (
                <p className="text-xs text-center text-amethyst">Gambar wajib diupload</p>
              )}
            </div>

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
                      className="bg-secondary-dark/70 border-grayMid/30 focus:border-amethyst/50 text-foreground-dark placeholder:text-grayMid/70"
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
                      className="bg-secondary-dark/70 border-grayMid/30 focus:border-amethyst/50 text-foreground-dark placeholder:text-grayMid/70"
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
                      <SelectTrigger className="bg-secondary-dark/70 border-grayMid/30 text-foreground-dark focus:ring-amethyst/30 focus:border-amethyst/50">
                        <SelectValue placeholder="Pilih kategori karya" />
                        <ChevronDown className="text-grayMid/70" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-secondary-dark border-grayMid/30 text-foreground-dark">
                      <SelectItem value="design" className="focus:bg-amethyst/20 focus:text-foreground-dark">Design</SelectItem>
                      <SelectItem value="video" className="focus:bg-amethyst/20 focus:text-foreground-dark">Video</SelectItem>
                      <SelectItem value="writing" className="focus:bg-amethyst/20 focus:text-foreground-dark">Karya Tulis</SelectItem>
                      <SelectItem value="meme" className="focus:bg-amethyst/20 focus:text-foreground-dark">Meme</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
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
                      className="resize-none bg-secondary-dark/70 border-grayMid/30 focus:border-amethyst/50 text-foreground-dark placeholder:text-grayMid/70"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content URL */}
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
                      className="bg-secondary-dark/70 border-grayMid/30 focus:border-amethyst/50 text-foreground-dark placeholder:text-grayMid/70"
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
                  className="border-grayMid/30 hover:bg-grayDark/30 text-foreground-dark"
                >
                  Batal
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={isUploading}
                className="bg-gradient-to-b from-grayMid to-grayDark hover:from-grayMid/90 hover:to-grayDark/90 text-white border border-grayLight/10 shadow-md hover:shadow-lg transition-all"
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
      </DialogContent>
    </Dialog>
  );
}
