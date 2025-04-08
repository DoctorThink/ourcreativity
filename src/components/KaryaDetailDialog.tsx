
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
import { Heart, Share2, ExternalLink, X } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';

type KaryaType = Database['public']['Tables']['karya']['Row'];

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
      <DialogContent className="p-0 overflow-hidden rounded-3xl bg-secondary border-border/40 max-h-[90vh] backdrop-blur-lg shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-foreground/70 hover:text-foreground bg-background/40 hover:bg-background/60 backdrop-blur-md border border-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Image with modernized container */}
        <div className="relative w-full aspect-[16/9] bg-black/70">
          <img 
            src={karya.image_url}
            alt={karya.title}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="p-8 overflow-y-auto">
          <DialogHeader className="pb-4 border-b border-border/20">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">{karya.title}</DialogTitle>
                <DialogDescription className="text-foreground/70 mt-1">
                  by {karya.creator_name}
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2 bg-secondary/60 backdrop-blur-sm py-1.5 px-3 rounded-full border border-border/30">
                <img 
                  src={categoryIcons[karya.category] || '/lovable-uploads/design.png'} 
                  alt={karya.category}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm text-foreground/80 font-medium">
                  {categoryNames[karya.category] || 'Karya'}
                </span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="py-6">
            {karya.description ? (
              <p className="text-foreground/90 leading-relaxed text-readable">
                {karya.description}
              </p>
            ) : (
              <p className="text-foreground/60 italic text-readable">
                Tidak ada deskripsi untuk karya ini.
              </p>
            )}
          </div>
          
          <div className="mt-2 mb-8">
            <p className="text-xs text-foreground/60">
              Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 flex-1 sm:flex-initial rounded-full backdrop-blur-sm border-border/40 bg-gradient-to-b from-secondary/80 to-background/80 hover:bg-foreground/5"
              >
                <Heart className="h-4 w-4" />
                <span>{karya.likes_count || 0} Suka</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 flex-1 sm:flex-initial rounded-full backdrop-blur-sm border-border/40 bg-gradient-to-b from-secondary/80 to-background/80 hover:bg-foreground/5"
              >
                <Share2 className="h-4 w-4" />
                <span>Bagikan</span>
              </Button>
            </div>
            
            {karya.content_url && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-b from-amethyst to-purpleDark text-white" 
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Lihat Karya Lengkap</span>
                </Button>
              </motion.div>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialog;
