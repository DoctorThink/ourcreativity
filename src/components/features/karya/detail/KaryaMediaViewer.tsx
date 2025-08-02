// src/components/karya/detail/KaryaMediaViewer.tsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';
import { X, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaMediaViewerProps {
  karya: KaryaType;
  onClose: () => void;
  showInfoPanel: boolean;
  toggleInfoPanel: () => void;
  isTextWork: boolean; // --- CHANGE #1: Accepting the new prop ---
}

const isVideo = (url: string) => url?.match(/\.(mp4|webm|ogg)$/i);
const isDocument = (url: string | null | undefined): boolean => !!url && /\.(pdf|docx?|txt)$/i.test(url);

export const KaryaMediaViewer = ({ karya, onClose, showInfoPanel, toggleInfoPanel, isTextWork }: KaryaMediaViewerProps) => {
  const mediaUrls = karya.media_urls?.length ? karya.media_urls : [karya.image_url];

  const renderTextContent = () => {
    if (isDocument(karya.content_url)) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-secondary backdrop-blur-md p-6 md:p-8 text-center overflow-hidden">
          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
            <img 
              src="/lovable-uploads/karyatulis.png" 
              alt="Karya Tulis" 
              className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 opacity-80 flex-shrink-0" 
            />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-foreground font-sans text-center leading-tight">
              {karya.title}
            </h2>
            <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 md:mb-8">
              Oleh {karya.creator_name}
            </p>
            <Button 
              onClick={() => window.open(karya.content_url!, '_blank')}
              className="gap-2 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-mint to-sage text-white border border-white/10 font-medium flex-shrink-0"
            >
              <ExternalLink className="h-4 w-4" />
              Lihat Dokumen
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-full flex flex-col bg-secondary backdrop-blur-md overflow-hidden">
        <div className="flex-shrink-0 p-6 md:p-8 text-center border-b border-border/20">
          <div className="max-w-2xl mx-auto">
            <img 
              src="/lovable-uploads/karyatulis.png" 
              alt="Karya Tulis" 
              className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 opacity-80" 
            />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-foreground font-sans leading-tight">
              {karya.title}
            </h2>
            <p className="text-sm text-foreground/70 font-medium mb-3 md:mb-4">
              Oleh {karya.creator_name}
            </p>

            {karya.content_url && (
              <Button 
                onClick={() => window.open(karya.content_url, '_blank')}
                className="gap-2 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-mint to-sage text-white border border-white/10 font-medium" 
                size="sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Link Konten</span>
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex-1 min-h-0 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-6 md:p-8">
              <div className="max-w-4xl mx-auto prose prose-sm md:prose-lg prose-invert max-w-none text-foreground/90 font-sans leading-relaxed">
                <ReactMarkdown
                  components={{
                    a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-mint hover:text-sage break-words" />,
                    p: ({node, ...props}) => <p {...props} className="break-words" />,
                    div: ({node, ...props}) => <div {...props} className="break-words" />
                  }}
                >
                  {karya.description || 'Tidak ada deskripsi.'}
                </ReactMarkdown>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  };

  const renderMediaContent = () => {
    if (mediaUrls.length > 1) {
      return (
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
        </Carousel>
      );
    }

    const singleMediaUrl = mediaUrls[0];
    return (
      <>
        {isVideo(singleMediaUrl) ? (
          <video 
            src={singleMediaUrl} 
            controls
            className="w-full h-full object-contain max-h-full"
            playsInline
            preload="metadata"
            poster="#1C1C1E"
          />
        ) : (
          <img 
            src={singleMediaUrl}
            alt={karya.title}
            className="w-full h-full object-contain max-h-full"
          />
        )}
      </>
    );
  };

  return (
    <div className={cn("relative bg-gradient-to-br from-black/90 to-black/95 flex-grow h-full w-full overflow-hidden", isTextWork && "md:h-auto")}>
      {isTextWork ? renderTextContent() : renderMediaContent()}
      
      {/* Floating control buttons - repositioned for better accessibility */}
      <div className="absolute top-6 right-6 z-10 flex gap-3">
        {/* Show/Hide info panel button for visual media only */}
        {!isTextWork && (
          <button
            onClick={toggleInfoPanel}
            className="rounded-xl p-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 transition-all duration-200 hover:scale-105 shadow-lg group"
          >
            <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", !showInfoPanel && "rotate-180")} />
            <span className="sr-only">{showInfoPanel ? 'Hide info' : 'Show info'}</span>
            
            {/* Tooltip */}
            <div className="absolute -bottom-10 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {showInfoPanel ? 'Hide Details' : 'Show Details'}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
