
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
import { ChevronDown, ExternalLink, X } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaDetailDialogProps {
  karya: KaryaType;
  isOpen: boolean;
  onClose: () => void;
}

const KaryaDetailDialog = ({ karya, isOpen, onClose }: KaryaDetailDialogProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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

  const isVideo = (url: string) => url?.match(/\.(mp4|webm|ogg)$/i);
  const isText = karya.category === 'writing' && karya.description;
  
  // Use the media_urls array if it exists and has items, otherwise fallback to image_url
  const mediaUrls = karya.media_urls?.length ? karya.media_urls : [karya.image_url];

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden rounded-3xl bg-secondary/90 border-border/40 max-h-[90vh] backdrop-blur-xl shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-foreground/70 hover:text-foreground bg-background/40 hover:bg-background/60 backdrop-blur-md border border-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Content preview with support for media carousel */}
        <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
          {isText ? (
            <div className="w-full h-full overflow-auto p-8 bg-secondary/60 flex items-center justify-center">
              <div className="max-w-3xl prose prose-invert">
                <p className="text-foreground/90 whitespace-pre-wrap">
                  {karya.description}
                </p>
              </div>
            </div>
          ) : mediaUrls.length > 1 ? (
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {mediaUrls.map((url, index) => (
                  <CarouselItem key={index} className="h-full flex items-center justify-center">
                    {isVideo(url) ? (
                      <video 
                        src={url} 
                        controls
                        className="w-full h-full object-contain max-h-[70vh]"
                      />
                    ) : (
                      <img 
                        src={url}
                        alt={`${karya.title} - slide ${index + 1}`}
                        className="w-full h-full object-contain max-h-[70vh]"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 z-10" />
              <CarouselNext className="absolute right-4 z-10" />
            </Carousel>
          ) : (
            <>
              {isVideo(mediaUrls[0]) ? (
                <video 
                  src={mediaUrls[0]} 
                  controls
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              ) : (
                <img 
                  src={mediaUrls[0]}
                  alt={karya.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              )}
            </>
          )}
        </div>
        
        <div className="p-8 overflow-y-auto bg-gradient-to-b from-secondary/90 to-background/90">
          <DialogHeader className="pb-4 border-b border-border/20">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">{karya.title}</DialogTitle>
                <DialogDescription className="text-foreground/70 mt-1">
                  by {karya.creator_name}
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2 bg-secondary/60 backdrop-blur-sm py-1.5 px-3 rounded-full border border-border/30">
                <div className="bg-white/90 p-1.5 rounded-full">
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
          
          {!isText && karya.description && (
            <div className="py-6">
              <div 
                className={`relative overflow-hidden transition-all duration-300 ${
                  isDescriptionExpanded ? 'max-h-[800px]' : 'max-h-[100px]'
                }`}
              >
                <p className="text-foreground/90 leading-relaxed text-readable whitespace-pre-wrap">
                  {karya.description}
                </p>
                {!isDescriptionExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/90 to-transparent pointer-events-none"></div>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleDescription}
                className="mt-2 text-foreground/60 hover:text-foreground hover:bg-foreground/5 gap-1"
              >
                {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`} 
                />
              </Button>
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
          
          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-4">
            {karya.link_url && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-b from-lavender to-purpleLight text-white" 
                  size="sm"
                  onClick={() => window.open(karya.link_url, '_blank')}
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
