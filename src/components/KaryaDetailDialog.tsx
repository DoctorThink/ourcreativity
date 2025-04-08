
import React, { useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaDetailDialogProps {
  karya: KaryaType;
  isOpen: boolean;
  onClose: () => void;
  onLikeUpdate?: (id: string, newCount: number) => void;
}

const KaryaDetailDialog = ({ karya, isOpen, onClose, onLikeUpdate }: KaryaDetailDialogProps) => {
  const [isLiking, setIsLiking] = useState(false);
  const [likesCount, setLikesCount] = useState(karya.likes_count || 0);
  const { toast } = useToast();
  
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

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    const newCount = likesCount + 1;
    
    try {
      const { error } = await supabase
        .from('karya')
        .update({ likes_count: newCount })
        .eq('id', karya.id);
      
      if (error) throw error;
      
      setLikesCount(newCount);
      if (onLikeUpdate) onLikeUpdate(karya.id, newCount);
      
      toast({
        title: "Terima kasih!",
        description: "Anda telah menyukai karya ini",
      });
    } catch (error) {
      console.error('Error liking karya:', error);
      toast({
        title: "Gagal menyukai",
        description: "Terjadi kesalahan saat menyukai karya",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    // Create share data
    const shareData = {
      title: `${karya.title} - OUR CREATIVITY`,
      text: `Karya oleh ${karya.creator_name} - OUR CREATIVITY`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Berhasil dibagikan!",
          description: "Karya telah dibagikan",
        });
      } else {
        // Fallback for browsers that don't support share API
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link disalin!",
          description: "Link karya telah disalin ke clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        variant: "destructive",
        title: "Gagal membagikan",
        description: "Terjadi kesalahan saat membagikan karya",
      });
    }
  };

  const isVideo = karya.category === 'video' && karya.content_url?.match(/\.(mp4|webm|ogg)$/i);
  const isText = karya.category === 'writing' && karya.description;

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

        {/* Content preview with support for video and text */}
        <div className="relative w-full aspect-[16/9] bg-black/70">
          {isVideo ? (
            <video 
              src={karya.content_url} 
              controls
              className="w-full h-full object-contain"
            />
          ) : isText ? (
            <div className="w-full h-full overflow-auto p-8 bg-secondary/60 flex items-center justify-center">
              <div className="max-w-3xl prose prose-invert">
                <p className="text-foreground/90 whitespace-pre-wrap">
                  {karya.description}
                </p>
              </div>
            </div>
          ) : (
            <img 
              src={karya.image_url}
              alt={karya.title}
              className="w-full h-full object-contain"
            />
          )}
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
                <div className="bg-white/80 p-1 rounded-full">
                  <img 
                    src={categoryIcons[karya.category] || '/lovable-uploads/design.png'} 
                    alt={karya.category}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <span className="text-sm text-foreground/80 font-medium">
                  {categoryNames[karya.category] || 'Karya'}
                </span>
              </div>
            </div>
          </DialogHeader>
          
          {!isText && (
            <div className="py-6">
              {karya.description ? (
                <p className="text-foreground/90 leading-relaxed text-readable whitespace-pre-wrap">
                  {karya.description}
                </p>
              ) : (
                <p className="text-foreground/60 italic text-readable">
                  Tidak ada deskripsi untuk karya ini.
                </p>
              )}
            </div>
          )}
          
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
                onClick={handleLike}
                disabled={isLiking}
              >
                <Heart className="h-4 w-4" />
                <span>{likesCount} Suka</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 flex-1 sm:flex-initial rounded-full backdrop-blur-sm border-border/40 bg-gradient-to-b from-secondary/80 to-background/80 hover:bg-foreground/5"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span>Bagikan</span>
              </Button>
            </div>
            
            {karya.content_url && !isVideo && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-b from-amethyst to-purpleDark text-white" 
                  size="sm"
                  onClick={() => window.open(karya.content_url, '_blank')}
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
