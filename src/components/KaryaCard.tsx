
import React, { useState, useEffect, useRef } from 'react';
import { Database } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ExternalLink, Play } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaCardProps {
  karya: KaryaType;
  onClick?: () => void;
}

const KaryaCard = ({ karya, onClick }: KaryaCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const categoryIcons: Record<string, string> = {
    'design': '/lovable-uploads/design.png',
    'video': '/lovable-uploads/video.png',
    'writing': '/lovable-uploads/karyatulis.png',
    'meme': '/lovable-uploads/meme.png',
  };

  // Determine content type
  const isVideo = (url: string) => url?.match(/\.(mp4|webm|ogg)$/i);
  const isText = karya.category === 'writing' && karya.description;
  
  // Use the media_urls array if it exists and has items, otherwise fallback to image_url
  const mediaUrls = karya.media_urls?.length ? karya.media_urls : [karya.image_url];

  // Calculate aspect ratio based on media dimensions if available
  // Default to 4:3 if dimensions aren't available
  const aspectRatio = karya.media_width && karya.media_height 
    ? `${karya.media_width} / ${karya.media_height}`
    : '4 / 3';

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  // Determine if this is a video card for special handling
  const hasVideo = mediaUrls.some(url => isVideo(url));

  // Pre-load video metadata to avoid layout shifts
  useEffect(() => {
    if (hasVideo && videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        setImageLoaded(true);
      });
    }
  }, [hasVideo]);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${karya.is_spotlight ? 'spotlight-card' : ''}`}
    >
      <Card
        onClick={onClick}
        className={`group relative w-full overflow-hidden bg-secondary/80 border border-border/40 rounded-3xl transition-all duration-300 cursor-pointer hover:border-border/60 hover:shadow-xl ${
          karya.is_spotlight ? 'ring-2 ring-lavender/50 shadow-lg shadow-lavender/20' : ''
        }`}
      >
        {/* Content Preview Container with aspect-ratio */}
        <div 
          className="relative w-full overflow-hidden rounded-t-2xl"
          style={{ aspectRatio }}
        >
          {isText ? (
            <div className="h-full w-full p-6 flex items-center justify-center bg-gradient-to-br from-secondary to-background/80 overflow-hidden">
              <p className="text-foreground/80 text-sm line-clamp-6 text-center font-serif">
                {karya.description}
              </p>
            </div>
          ) : mediaUrls.length > 1 ? (
            // Carousel for multiple media
            <Carousel 
              className="w-full h-full"
              onMouseDown={stopPropagation} 
              onClick={stopPropagation}
            >
              <CarouselContent className="h-full">
                {mediaUrls.map((url, index) => (
                  <CarouselItem key={index} className="h-full">
                    {isVideo(url) ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          src={url}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          playsInline
                          muted
                          poster="#1C1C1E" // Dark background as poster
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/30 p-3 rounded-full">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={url}
                        alt={`${karya.title} - slide ${index + 1}`}
                        className="w-full h-full object-cover"
                        onLoad={handleImageLoad}
                        loading="lazy"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious 
                className="absolute left-2 z-10" 
                onClick={stopPropagation}
              />
              <CarouselNext 
                className="absolute right-2 z-10" 
                onClick={stopPropagation}
              />
            </Carousel>
          ) : (
            // Single media display
            <>
              {isVideo(mediaUrls[0]) ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={mediaUrls[0]}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    muted
                    poster="#1C1C1E" // Dark background color as poster
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 p-3 rounded-full">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={mediaUrls[0]}
                  alt={karya.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
              )}
              {!imageLoaded && !hasVideo && (
                <div className="absolute inset-0 bg-secondary animate-pulse"></div>
              )}
            </>
          )}
        </div>

        {/* Content overlay with gradient background for better readability */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-5 text-foreground opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-background/95 to-transparent"
        >
          <div className="flex justify-between items-end gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold truncate tracking-tight">{karya.title}</h3>
              <p className="text-foreground/80 text-xs sm:text-sm truncate mt-1">{karya.creator_name}</p>
            </div>
            {karya.link_url && (
              <motion.a 
                href={karya.link_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1.5 text-foreground/70 bg-background/50 backdrop-blur-sm rounded-full px-2.5 py-1 hover:bg-background/70 transition-colors"
                aria-label="Visit related link"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Category Icon - Improved with gradient background */}
        <div 
          className="absolute top-3 right-3 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-md p-2 rounded-full scale-100 transition-all duration-300 shadow-md"
          aria-label={`Category: ${karya.category}`}
        >
          <img
            src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
            alt={karya.category}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default KaryaCard;
