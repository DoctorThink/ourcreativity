import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, ExternalLink, X, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [showInfoPanel, setShowInfoPanel] = useState(true);

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


  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden border-border/30 backdrop-blur-xl shadow-xl transition-all duration-300 max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] rounded-none">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Content preview with enhanced media display - takes full height in fullscreen mode */}
          <div className="relative w-full bg-black/50 flex-grow" 
               style={{ height: isText ? 'auto' : '100vh' }}>
            {isText ? (
              <div className="w-full h-full overflow-auto p-8 bg-gradient-to-b from-secondary/90 to-secondary/70 backdrop-blur-md flex items-center justify-center">
                <div className="max-w-3xl prose prose-invert">
                  <p className="text-foreground/90 whitespace-pre-wrap text-readable leading-relaxed">
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
                          className="w-full h-full object-contain max-h-full"
                          playsInline
                          preload="metadata"
                          poster="#1C1C1E" // Dark background as poster
                        />
                      ) : (
                        <img 
                          src={url}
                          alt={`${karya.title} - slide ${index + 1}`}
                          className="w-full h-full object-contain max-h-full"
                        />
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50 border border-white/10">
                  <ChevronLeft className="h-4 w-4" />
                </CarouselPrevious>
                <CarouselNext className="absolute right-4 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50 border border-white/10">
                  <ChevronRight className="h-4 w-4" />
                </CarouselNext>
              </Carousel>
            ) : (
              <>
                {isVideo(mediaUrls[0]) ? (
                  <video 
                    src={mediaUrls[0]} 
                    controls
                    className="w-full h-full object-contain max-h-full"
                    playsInline
                    preload="metadata"
                    poster="#1C1C1E" // Dark background color as poster
                  />
                ) : (
                  <img 
                    src={mediaUrls[0]}
                    alt={karya.title}
                    className="w-full h-full object-contain max-h-full"
                  />
                )}
              </>
            )}
            
            {/* Floating control buttons with glossy effect */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {/* Info panel toggle button - always shown now */}
                <button
                  onClick={toggleInfoPanel}
                  className="rounded-full p-2.5 text-white hover:text-white/90 bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                >
                  {showInfoPanel ? <ChevronDown className="h-5 w-5" /> : <ChevronDown className="h-5 w-5 rotate-180" />}
                  <span className="sr-only">{showInfoPanel ? 'Hide info' : 'Show info'}</span>
                </button>
              {/* Close button - always shown now */}
                <button
                  onClick={onClose}
                  className="rounded-full p-2.5 text-white hover:text-white/90 bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
            </div>
          </div>
          
          {/* Info panel with title, description, and actions - conditionally shown in fullscreen */}
          <AnimatePresence>
            {showInfoPanel && (
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gradient-to-b from-secondary/95 to-background/95 backdrop-blur-md absolute bottom-0 left-0 right-0 z-10 max-h-[50vh] overflow-y-auto rounded-t-3xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]"
              >
                {/* Header with title and category info */}
                <div className="flex justify-between items-start p-6 border-b border-border/20">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{karya.title}</h2>
                    <p className="text-foreground/70 mt-1">
                      by {karya.creator_name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm py-1.5 px-3 rounded-full border border-white/10 shadow-md">
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
                
                {/* Expandable description section */}
                {!isText && karya.description && (
                  <div className="p-6">
                    <div 
                      className={`relative overflow-hidden transition-all duration-300 ${
                        isDescriptionExpanded ? 'max-h-[800px]' : 'max-h-[100px]'
                      }`}
                    >
                      <p className="text-foreground/90 leading-relaxed text-readable whitespace-pre-wrap">
                        {karya.description}
                      </p>
                      {!isDescriptionExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/95 to-transparent pointer-events-none"></div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleDescription}
                      className="mt-2 text-foreground/60 hover:text-foreground hover:bg-foreground/5 gap-1 rounded-full"
                    >
                      {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`} 
                      />
                    </Button>
                  </div>
                )}
                
                {/* Date and action buttons */}
                <div className="p-6 pt-0 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-xs text-foreground/60 mb-4 sm:mb-0">
                    Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    {karya.content_url && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-mint to-sage text-white border border-white/10" 
                          size="sm"
                          onClick={() => window.open(karya.content_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Link Konten</span>
                        </Button>
                      </motion.div>
                    )}
                    {karya.link_url && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-lavender to-purpleLight text-white border border-white/10" 
                          size="sm"
                          onClick={() => window.open(karya.link_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Lihat Karya Lengkap</span>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KaryaDetailDialog;
