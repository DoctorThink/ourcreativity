
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Share2, ExternalLink } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { motion, AnimatePresence } from 'framer-motion';

type KaryaType = Tables<'karya'>;

interface KaryaDetailDialogProps {
  karya: KaryaType;
  isOpen: boolean;
  onClose: () => void;
}

const KaryaDetailDialog = ({ karya, isOpen, onClose }: KaryaDetailDialogProps) => {
  const categoryIcons: Record<string, string> = {
    'design': '/lovable-uploads/design.png',
    'video': '/lovable-uploads/video.png',
    'writing': '/lovable-uploads/karyatulis.png',
    'meme': '/lovable-uploads/meme.png',
  };
  
  const categoryNames: Record<string, string> = {
    'design': 'Design',
    'video': 'Video',
    'writing': 'Karya Tulis',
    'meme': 'Meme',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-3xl bg-secondary border-border/40">
        <div className="relative w-full aspect-[16/9] bg-black">
          <img 
            src={karya.image_url}
            alt={karya.title}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="p-6">
          <DialogHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle className="text-2xl font-bold">{karya.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  by {karya.creator_name}
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-black/10 backdrop-blur-md p-2 rounded-full">
                  <img 
                    src={categoryIcons[karya.category] || '/lovable-uploads/design.png'} 
                    alt={karya.category}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {categoryNames[karya.category] || 'Karya'}
                </span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="py-4">
            {karya.description ? (
              <p className="text-foreground/90 leading-relaxed">
                {karya.description}
              </p>
            ) : (
              <p className="text-muted-foreground italic">
                Tidak ada deskripsi untuk karya ini.
              </p>
            )}
          </div>
          
          <div className="mt-2 mb-6">
            <p className="text-xs text-muted-foreground">
              Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <DialogFooter className="flex sm:flex-row justify-between gap-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                <span>{karya.likes_count || 0} Suka</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                <span>Bagikan</span>
              </Button>
            </div>
            
            {karya.content_url && (
              <Button className="gap-2" size="sm">
                <ExternalLink className="h-4 w-4" />
                <span>Lihat Karya Lengkap</span>
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialog;
