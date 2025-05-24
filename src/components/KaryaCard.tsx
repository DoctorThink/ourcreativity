
import React, { useState, useEffect, useRef } from 'react';
import { Database } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ExternalLink, Play, Tag } from 'lucide-react';
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

// Helper function to generate transformed image URLs with Supabase
const getTransformedUrl = (
  baseUrl: string | null | undefined, 
  options: { 
    width?: number, 
    height?: number, 
    quality?: number, 
    resizeMode?: 'cover' | 'contain' | 'fill' 
  } = {}
): string => {
  if (!baseUrl) return '/placeholder.svg'; // Fallback placeholder

  try {
    const url = new URL(baseUrl);

    // Default values for card previews
    const targetWidth = options.width || 400;
    const targetQuality = options.quality || 60;
    const targetResizeMode = options.resizeMode || 'cover';

    url.searchParams.set('width', targetWidth.toString());
    url.searchParams.set('quality', targetQuality.toString());
    url.searchParams.set('resize', targetResizeMode);

    if (options.height) {
      url.searchParams.set('height', options.height.toString());
    }
    // No need to set format for auto WebP by Supabase.
    // Supabase's `renderMethod=transform` is the default.
    
    return url.toString();
  } catch (e) {
    console.error("Error creating transformed URL:", e);
    return baseUrl; // Return original if URL parsing/transformation fails
  }
};

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
  // Default to 4:3 if dimensions aren't available
  const aspectRatio = karya.media_width && karya.media_height 
    ? `${karya.media_width} / ${karya.media_height}`
    : '4 / 3';

  const handleImageLoad = () => {
    setImageLoaded(true);
    // Optional: remove placeholder background if needed
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
      
      // Setting a poster and preloading metadata helps prevent flickering
      if (videoRef.current) {
        videoRef.current.poster = "#1C1C1E"; // Dark background as poster
      }
    }
  }, [hasVideo]);

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
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${karya.is_spotlight ? 'spotlight-card' : ''}`}
    >
      <Card
        onClick={onClick}
        className={`group relative w-full overflow-hidden bg-secondary/80 backdrop-blur-md border border-white/10 rounded-3xl transition-all duration-300 cursor-pointer hover:border-white/20 hover:shadow-xl ${
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
              <div className="flex flex-col items-center gap-2">
                <img 
                  src="/lovable-uploads/karyatulis.png" 
                  alt="Karya Tulis" 
                  className="w-12 h-12 mb-2 opacity-70" 
                />
                <p className="text-foreground/80 text-sm line-clamp-6 text-center font-serif leading-relaxed">
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
                          poster="#1C1C1E" // Dark background as poster
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full border border-white/10">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <picture>
                        {/* Use progressively loading images with much lower resolution for cards */}
                        <source srcSet={getTransformedUrl(url, { width: 400, quality: 60, resizeMode: 'cover' })} type="image/webp" />
                        <source srcSet={getTransformedUrl(url, { width: 400, quality: 60, resizeMode: 'cover' })} type="image/jpeg" />
                        <img
                          ref={imageRef}
                          src={getTransformedUrl(url, { width: 300, quality: 50, resizeMode: 'cover' })}
                          alt={`${karya.title} - slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          onLoad={handleImageLoad}
                          loading="lazy"
                          width={karya.media_width || 400}
                          height={karya.media_height || 300}
                          style={{ backgroundImage: 'url(/placeholder.svg)', backgroundSize: 'cover' }}
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
            // Single media display
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
                    poster="#1C1C1E" // Dark background color as poster
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full border border-white/10">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <picture>
                  {/* Use much lower resolution for card previews */}
                  <source srcSet={getTransformedUrl(mediaUrls[0], { width: 400, quality: 60, resizeMode: 'cover' })} type="image/webp" />
                  <source srcSet={getTransformedUrl(mediaUrls[0], { width: 400, quality: 60, resizeMode: 'cover' })} type="image/jpeg" />
                  <img
                    ref={imageRef}
                    src={getTransformedUrl(mediaUrls[0], { width: 300, quality: 50, resizeMode: 'cover' })}
                    alt={karya.title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    loading="lazy"
                    width={karya.media_width || 400}
                    height={karya.media_height || 300}
                    style={{ backgroundImage: 'url(/placeholder.svg)', backgroundSize: 'cover' }}
                  />
                </picture>
              )}
              {!imageLoaded && !hasVideo && (
                <div className="absolute inset-0 bg-secondary animate-pulse"></div>
              )}
            </>
          )}
        </div>

        {/* Content overlay with gradient background for better readability */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-5 text-foreground opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t ${
            hasVideo ? 'from-black/95 to-transparent' : 'from-background/95 to-transparent'
          }`}
        >
          <div className="flex justify-between items-end gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold truncate tracking-tight">{karya.title}</h3>
              <p className="text-foreground/80 text-xs sm:text-sm truncate mt-1">{karya.creator_name}</p>
              
              {/* Tags display on hover */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 max-w-full overflow-hidden">
                  {tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-white/80"
                    >
                      #{tag}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-white/80">
                      +{tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
            {karya.link_url && (
              <motion.a 
                href={karya.link_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1.5 text-foreground/70 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 hover:bg-black/50 transition-colors border border-white/10"
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
