import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, ExternalLink, X, Tag, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaDetailDialogProps {
  karyaList: KaryaType[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const KaryaDetailDialog = ({ karyaList, initialIndex, isOpen, onClose }: KaryaDetailDialogProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  if (!karyaList || karyaList.length === 0) {
    return null;
  }

  const karya = karyaList[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % karyaList.length);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + karyaList.length) % karyaList.length);
  };

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
  const isDocument = (url: string | null | undefined): boolean => !!url && /\.(pdf|docx?|txt)$/i.test(url);
  const isText = karya.category === 'writing' && karya.content_url;
  
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
    if (karya.description) {
      const hashtags = karya.description.match(/#[\w\u0080-\uFFFF]+/g);
      if (hashtags && hashtags.length > 0) {
        return hashtags.map(tag => tag.slice(1));
      }
    }
    return [];
  };
  
  const tags = extractTags();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden border-border/30 backdrop-blur-xl shadow-xl transition-all duration-300 max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] rounded-none">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Content preview with enhanced media display */}
          <div className="relative w-full bg-black/50 flex-grow" 
               style={{ height: isText ? 'auto' : '100vh' }}>
            {isText ? (
              isDocument(karya.content_url) ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-secondary backdrop-blur-md p-8 text-center">
                    <img 
                      src="/lovable-uploads/karyatulis.png" 
                      alt="Karya Tulis" 
                      className="w-24 h-24 mx-auto mb-6 opacity-80" 
                    />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground font-sans">{karya.title}</h2>
                    <p className="text-base text-foreground/70 font-medium mb-8">Oleh {karya.creator_name}</p>
                    <Button 
                      onClick={() => window.open(karya.content_url!, '_blank')}
                      className="gap-2 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-mint to-sage text-white border border-white/10 font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Lihat Dokumen
                    </Button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col bg-secondary backdrop-blur-md">
                  <div className="flex-shrink-0 p-8 text-center border-b border-border/20">
                    <img 
                      src="/lovable-uploads/karyatulis.png" 
                      alt="Karya Tulis" 
                      className="w-16 h-16 mx-auto mb-4 opacity-80" 
                    />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground font-sans">{karya.title}</h2>
                    <p className="text-sm text-foreground/70 font-medium">Oleh {karya.creator_name}</p>
                  </div>
                  
                  {/* Scrollable Text Content */}
                  <div className="flex-1 min-h-0 p-6 md:p-8">
                    <ScrollArea className="h-full w-full max-h-[calc(100vh-220px)]">
                      <div className="max-w-4xl mx-auto">
                        {/* FIX: Wrap ReactMarkdown in a div to apply prose styles */}
                        <div className="prose prose-lg prose-invert max-w-none text-foreground/90 font-sans leading-relaxed">
                          <ReactMarkdown
                            components={{
                              a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-mint hover:text-sage" />
                            }}
                          >
                            {karya.content_url || ''}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )
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
                          poster="#1C1C1E"
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
                    poster="#1C1C1E"
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
            
            {/* Navigation Buttons */}
            {!isText && karyaList.length > 1 && (
              <>
                <Button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm hover:bg-black/50 border border-white/10 rounded-full w-12 h-12 p-0"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm hover:bg-black/50 border border-white/10 rounded-full w-12 h-12 p-0"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            {/* Floating control buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {!isText && (
                <button
                  onClick={toggleInfoPanel}
                  className="rounded-full p-2.5 text-white hover:text-white/90 bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                >
                  {showInfoPanel ? <ChevronDown className="h-5 w-5" /> : <ChevronDown className="h-5 w-5 rotate-180" />}
                  <span className="sr-only">{showInfoPanel ? 'Hide info' : 'Show info'}</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-full p-2.5 text-white hover:text-white/90 bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
          
          {/* Info panel - only show for non-text items or when showInfoPanel is true */}
          <AnimatePresence>
            {(!isText && showInfoPanel) && (
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gradient-to-b from-secondary/95 to-background/95 backdrop-blur-md absolute bottom-0 left-0 right-0 z-10 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto rounded-t-3xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]"
              >
                {/* Header with title and category info */}
                <div className="flex justify-between items-start p-4 sm:p-6 border-b border-border/20">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">{karya.title}</h2>
                    <p className="text-foreground/70 mt-1 font-medium text-sm sm:text-base">
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
                
                {/* Tags section */}
                {tags.length > 0 && (
                  <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-border/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-foreground/60" />
                      <span className="text-sm font-medium text-foreground/80">Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          className="bg-foreground/10 hover:bg-foreground/15 text-foreground/90 border-none font-medium"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Expandable description section with proper scrolling */}
                {karya.description && (
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-foreground/80">Description</span>
                    </div>
                    <div className={`transition-all duration-300 ${
                      isDescriptionExpanded ? 'max-h-none' : 'max-h-[120px]'
                    } overflow-hidden relative`}>
                      <ScrollArea className={`${
                        isDescriptionExpanded ? 'h-auto max-h-[40vh]' : 'h-[120px]'
                      }`}>
                        <p className="text-foreground/90 leading-relaxed font-sans text-sm sm:text-base whitespace-pre-wrap break-words pr-4">
                          {karya.description}
                        </p>
                      </ScrollArea>
                      {!isDescriptionExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-secondary/95 to-transparent pointer-events-none"></div>
                      )}
                    </div>
                    {karya.description.length > 200 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={toggleDescription}
                        className="mt-3 text-foreground/60 hover:text-foreground hover:bg-foreground/5 gap-1 rounded-full font-medium"
                      >
                        {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`} 
                        />
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Date and action buttons */}
                <div className="p-4 sm:p-6 pt-4 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-xs text-foreground/60 mb-4 sm:mb-0 font-medium">
                    Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                      <Button
                        size="sm"
                        className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-secondary text-foreground hover:bg-secondary/80 border border-white/10 font-medium"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Suka ({karya.likes_count || 0})</span>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                      <Button
                        size="sm"
                        className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-secondary text-foreground hover:bg-secondary/80 border border-white/10 font-medium"
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Bagikan</span>
                      </Button>
                    </motion.div>
                    {karya.content_url && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                        <Button 
                          onClick={() => window.open(karya.content_url, '_blank')}
                          className="gap-2 w-full rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-mint to-sage text-white border border-white/10 font-medium" 
                          size="sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Link Konten</span>
                        </Button>
                      </motion.div>
                    )}
                    {karya.link_url && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                        <Button 
                          onClick={() => window.open(karya.link_url, '_blank')}
                          className="gap-2 w-full rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-lavender to-purpleLight text-white border border-white/10 font-medium" 
                          size="sm"
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
