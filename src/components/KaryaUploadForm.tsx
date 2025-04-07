
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { Plus, Upload, Loader2 } from 'lucide-react';
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
  image_url: z.string().min(1, 'Gambar wajib diupload'),
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
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    form.reset();
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

      // Step 1: Upload image to Supabase storage if you have it set up
      // If not, you can use a direct URL in values.image_url
      // For now, we'll simulate by creating a data URL
      
      // In a real implementation with Supabase Storage, you'd do:
      // const { data: uploadData, error: uploadError } = await supabase.storage
      //   .from('karya-images')
      //   .upload(filePath, imageFile);
      
      // if (uploadError) throw uploadError;
      // const imageUrl = `https://nmjakogetnzrfluicvdh.supabase.co/storage/v1/object/public/karya-images/${filePath}`;
      
      // For this example, we'll use the original URL field (assuming direct link to image)
      const imageUrl = values.image_url || 'https://via.placeholder.com/400x400?text=No+Image';

      // Step 2: Insert record into Supabase
      const { data, error } = await supabase.from('karya').insert({
        title: values.title,
        creator_name: values.creator_name,
        category: values.category,
        description: values.description || null,
        content_url: values.content_url || null,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast({
        title: 'Karya berhasil diunggah!',
        description: 'Karya Anda telah ditambahkan ke galeri',
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
          className="gap-2 bg-[#9B6DFF] hover:bg-[#8A5AEE] text-white rounded-full" 
          size="lg"
        >
          <Plus className="h-5 w-5" /> Unggah Karya
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-serif">Unggah Karya Baru</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel className="block">Gambar Karya</FormLabel>
              <div className="flex flex-col items-center justify-center gap-4">
                {imagePreview ? (
                  <div className="relative w-full aspect-square max-w-[300px] mx-auto overflow-hidden rounded-xl border border-border">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute bottom-2 right-2 opacity-90"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-square max-w-[300px] rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">Klik untuk unggah gambar</p>
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
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Karya</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul karya" {...field} />
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
                  <FormLabel>Nama Creator</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Anda" {...field} />
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
                  <FormLabel>Kategori</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori karya" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="writing">Karya Tulis</SelectItem>
                      <SelectItem value="meme">Meme</SelectItem>
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
                  <FormLabel>Deskripsi (Opsional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Jelaskan tentang karya Anda" 
                      {...field} 
                      className="resize-none"
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
                  <FormLabel>Link Konten (Opsional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://..." 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline">Batal</Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={isUploading}
                className="bg-[#9B6DFF] hover:bg-[#8A5AEE]"
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
