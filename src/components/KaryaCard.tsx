import React, { useState, useEffect, useRef } from 'react';
import { Database } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ExternalLink, Play, Eye } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTransformedUrl } from '@/lib/karyaUtils';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaCardProps {
  karya: KaryaType;
  onClick?: () => void;
}

const KaryaCard = ({ karya, onClick }: KaryaCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

  // Use the media_urls array if it exists and has items, otherwise fallback to image_url
  const mediaUrls = karya.media_urls?.length ? karya.media_urls : [karya.image_url];

  // Determine content type
  const isVideo = (url: string) => url?.match(/\.(mp4|webm|ogg)$/i);
  const isText = karya.category === 'writing' && karya.description && !mediaUrls.some(url => url && !isVideo(url));
  
  // Check if this card has any videos
  const hasVideo = mediaUrls.some(url => isVideo(url));

  // Calculate aspect ratio based on media dimensions if available
  const aspectRatio = karya.media_width && karya.media_height 
    ? `${karya.media_width} / ${karya.media_height}`
    : '4 / 3';

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (imageRef.current) {
       imageRef.current.style.backgroundImage = 'none';
    }
  };

  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  // Pre-load video metadata to avoid layout shifts
  useEffect(() => {
    if (hasVideo && videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        setImageLoaded(true);
      });
      
      if (videoRef.current) {
        videoRef.current.poster = "#1C1C1E";
      }
    }
  }, [hasVideo]);

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
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${karya.is_spotlight ? 'spotlight-card' : ''}`}
    >
      <Card
        onClick={onClick}
        className={`group relative w-full overflow-hidden bg-secondary/80 backdrop-blur-md border border-white/10 rounded-3xl transition-all duration-300 cursor-pointer hover:border-amethyst/50 hover:shadow-2xl hover:shadow-amethyst/20`}
      >
        {/* Content Preview Container with aspect-ratio */}
        <div 
          className="relative w-full overflow-hidden rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          style={{ aspectRatio }}
        >
          {isText ? (
            <div className="h-full w-full p-6 flex items-center justify-center bg-gradient-to-br from-secondary to-background/80 overflow-hidden">
              <div className="flex flex-col items-center gap-3 text-center">
                <img 
                  src="/lovable-uploads/karyatulis.png" 
                  alt="Karya Tulis" 
                  className="w-12 h-12 mb-2 opacity-70" 
                />
                <h3 className="text-lg font-bold text-foreground font-sans mb-2 line-clamp-2">{karya.title}</h3>
                <p className="text-foreground/80 text-sm line-clamp-4 leading-relaxed font-sans">
                  {karya.description ? karya.description.substring(0, 120) + "..." : "Artikel Tulisan"}
                </p>
              </div>
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
                      <div className="relative w-full h-full bg-black">
                        <video
                          ref={videoRef}
                          src={url}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          playsInline
                          muted
                          loop
                          poster="#1C1C1E"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full border border-white/10">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <picture>
                        <source srcSet={getTransformedUrl(url, { format: 'webp', width: 400, quality: 60 })} type="image/webp" />
                        <source srcSet={getTransformedUrl(url, { format: 'jpeg', width: 400, quality: 60 })} type="image/jpeg" />
                        <img
                          src={getTransformedUrl(url, { format: 'jpeg', width: 300, quality: 50 })}
                          alt={`${karya.title} - slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={karya.media_width || 400}
                          height={karya.media_height || 300}
                        />
                      </picture>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious 
                className="absolute left-2 z-10 bg-black/30 backdrop-blur-sm border border-white/10" 
                onClick={stopPropagation}
              />
              <CarouselNext 
                className="absolute right-2 z-10 bg-black/30 backdrop-blur-sm border border-white/10" 
                onClick={stopPropagation}
              />
            </Carousel>
          ) : (
            <>
              {isVideo(mediaUrls[0]) ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={videoRef}
                    src={mediaUrls[0]}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    muted
                    loop
                    poster="#1C1C1E"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full border border-white/10">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <picture>
                  <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'webp', width: 400, quality: 60 })} type="image/webp" />
                  <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'jpeg', width: 400, quality: 60 })} type="image/jpeg" />
                  <img
                    src={getTransformedUrl(mediaUrls[0], { format: 'jpeg', width: 300, quality: 50 })}
                    alt={karya.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={karya.media_width || 400}
                    height={karya.media_height || 300}
                  />
                </picture>
              )}
            </>
          )}
        </div>

        {/* Content overlay with better typography */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 text-foreground opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t ${
            hasVideo ? 'from-black/95 to-transparent' : 'from-background/95 to-transparent'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-sm p-2 rounded-full">
              <img
                src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
                alt={karya.category}
                className="w-5 h-5 object-contain"
              />
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full text-white/90">
              {karya.view_count != null && karya.view_count > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-medium">{karya.view_count}</span>
                </div>
              )}
              {karya.link_url && karya.link_url.trim() && (
                <a 
                  href={karya.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stopPropagation}
                  className="flex items-center"
                  aria-label="Visit related link"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
          
          <div className="p-4 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent">
            <motion.h3 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-lg font-bold truncate tracking-tight font-sans text-white">
              {karya.title}
            </motion.h3>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-white/80 text-sm truncate mt-1 font-medium">
              {karya.creator_name}
            </motion.p>
          </div>
        </div>

        {/* Category Icon */}
        <div 
          className="absolute top-3 right-3 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-md p-2 rounded-full scale-100 transition-all duration-300 shadow-md"
          aria-label={`Category: ${karya.category}`}
        >
          <img
            src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
            alt={karya.category}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default KaryaCard;
