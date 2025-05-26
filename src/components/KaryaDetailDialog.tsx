
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, ExternalLink, X, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';

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
    'game': '/lovable-uploads/game.png',
  };
  
  const categoryNames: Record<string, string> = {
    'design': 'Design',
    'video': 'Video',
    'writing': 'Karya Tulis',
    'meme': 'Meme',
    'game': 'Game',
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
  
  // Extract tags from description only
  const extractTags = (): string[] => {
    // Only look for hashtags in the description
    if (karya.description) {
      // Look for hashtags in the description
      const hashtags = karya.description.match(/#[\w\u0080-\uFFFF]+/g);
      if (hashtags && hashtags.length > 0) {
        return hashtags.map(tag => tag.slice(1)); // Remove # symbol
      }
    }
    return [];
  };
  
  const tags = extractTags();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden border-border/30 backdrop-blur-xl shadow-xl transition-all duration-300 max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] rounded-none">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Content preview with enhanced media display - takes full height in fullscreen mode */}
          <div className="relative w-full bg-black/50 flex-grow" 
               style={{ height: isText ? 'auto' : '100vh' }}>
            {isText ? (
              <div className="w-full h-full overflow-auto p-6 sm:p-8 md:p-12 bg-gradient-to-b from-secondary/90 to-secondary/70 backdrop-blur-md flex items-center justify-center">
                {/* Applied prose-lg for better readability of long text, and prose-serif for consistent font. */}
                <div className="max-w-3xl w-full prose prose-lg prose-serif prose-invert">
                  <div className="mb-8 text-center">
                    <img 
                      src={categoryIcons['writing']} 
                      alt="Karya Tulis" 
                      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-80" 
                    />
                    {/* Title uses serif font from prose-serif, ensure it's distinct */}
                    <h1 className="text-3xl sm:text-4xl font-bold !font-sans tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">{karya.title}</h1>
                    <p className="text-base text-slate-400">
                      Oleh {karya.creator_name}
                    </p>
                  </div>
                  {/* Prose classes will style this <p> for font, size, line height, color etc. */}
                  <p className="whitespace-pre-wrap text-slate-300 leading-relaxed sm:leading-loose">
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
                className="bg-gradient-to-b from-secondary/90 via-background/90 to-background/95 backdrop-blur-lg absolute bottom-0 left-0 right-0 z-10 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto rounded-t-3xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.25)]"
              >
                {/* Header with title and category info */}
                <div className="flex flex-col sm:flex-row justify-between items-start p-5 sm:p-6 border-b border-white/10">
                  <div className="flex-1 mb-3 sm:mb-0">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{karya.title}</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Oleh {karya.creator_name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm py-1.5 px-3 rounded-full border border-white/15 shadow-md self-start sm:self-center">
                    <div className="bg-white/20 p-1 rounded-full">
                      <img 
                        src={categoryIcons[karya.category] || categoryIcons['design']} 
                        alt={karya.category}
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      {categoryNames[karya.category] || 'Karya'}
                    </span>
                  </div>
                </div>
                
                {/* Tags section */}
                {tags.length > 0 && (
                  <div className="px-5 sm:px-6 pt-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs sm:text-sm font-medium text-slate-300">Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 text-xs px-2.5 py-1"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Expandable description section - styles adjusted for better readability */}
                {!isText && karya.description && (
                  <div className="p-5 sm:p-6 text-sm">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-xs sm:text-sm font-medium text-slate-300">Deskripsi</span>
                    </div>
                    <div 
                      className={`relative overflow-hidden transition-all ease-in-out duration-500 ${
                        isDescriptionExpanded ? 'max-h-[600px] sm:max-h-[400px]' : 'max-h-[80px] sm:max-h-[60px]' // Adjusted max-h for typical screen heights
                      }`}
                    >
                      {/* Using prose here for better text formatting of user-generated content */}
                      <div className="prose prose-sm prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed">
                        <p className="whitespace-pre-wrap">{karya.description}</p>
                      </div>
                      {!isDescriptionExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background/90 via-background/80 to-transparent pointer-events-none"></div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleDescription}
                      className="mt-2.5 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 gap-1 rounded-full px-3 py-1.5 text-xs"
                    >
                      {isDescriptionExpanded ? 'Lebih Sedikit' : 'Selengkapnya'}
                      <ChevronDown 
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isDescriptionExpanded ? 'rotate-180' : ''}`} 
                      />
                    </Button>
                  </div>
                )}
                
                {/* Date and action buttons - styles adjusted */}
                <div className="p-5 sm:p-6 pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <p className="text-[11px] sm:text-xs text-slate-500 order-last sm:order-first">
                    Dibuat: {new Date(karya.created_at).toLocaleDateString('id-ID', {
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
