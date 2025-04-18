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

// Helper function to calculate luminance
const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return rs * 0.2126 + gs * 0.7152 + bs * 0.0722;
};

// Helper function to get dominant color and determine if it's light or dark
const getDominantColorFromImage = (imgElement: HTMLImageElement): boolean => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return false;

  canvas.width = 1;
  canvas.height = 1;
  context.drawImage(imgElement, 0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5; // true if light, false if dark
};

// Helper function to generate transformed image URLs (adjust based on actual Supabase transformation syntax)
const getTransformedUrl = (baseUrl: string | null | undefined, options: { format?: 'webp' | 'avif' | 'jpeg', width?: number, quality?: number } = {}): string => {
  if (!baseUrl) return '/placeholder.svg'; // Fallback placeholder
  try {
    const url = new URL(baseUrl);
    // Example transformation params - replace with actual Supabase params
    if (options.format) url.searchParams.set('format', options.format);
    if (options.width) url.searchParams.set('resize', `width:${options.width}`); // Example syntax
    if (options.quality) url.searchParams.set('quality', options.quality.toString()); // Example syntax
    return url.toString();
  } catch (e) {
    console.error("Error creating URL:", e);
    return baseUrl; // Return original if URL parsing fails
  }
};

const KaryaCard = ({ karya, onClick }: KaryaCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const categoryIcons: Record<string, string> = {
    'design': '/lovable-uploads/design.png',
    'video': '/lovable-uploads/video.png',
    'writing': '/lovable-uploads/karyatulis.png',
    'meme': '/lovable-uploads/meme.png',
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
       setIsLightBackground(getDominantColorFromImage(imageRef.current));
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
                        {/* Add AVIF source if desired and supported */}
                        {/* <source srcSet={getTransformedUrl(url, { format: 'avif', width: 800 })} type="image/avif" /> */}
                        <source srcSet={getTransformedUrl(url, { format: 'webp', width: 1200 })} type="image/webp" media="(min-width: 1024px)" />
                        <source srcSet={getTransformedUrl(url, { format: 'webp', width: 800 })} type="image/webp" media="(min-width: 640px)" />
                        <source srcSet={getTransformedUrl(url, { format: 'webp', width: 400 })} type="image/webp" />
                        {/* Fallback JPG/PNG source */}
                        <source srcSet={getTransformedUrl(url, { format: 'jpeg', width: 1200 })} type="image/jpeg" media="(min-width: 1024px)" />
                        <source srcSet={getTransformedUrl(url, { format: 'jpeg', width: 800 })} type="image/jpeg" media="(min-width: 640px)" />
                        {/* Fallback img tag */}
                        <img
                          ref={imageRef}
                          src={getTransformedUrl(url, { format: 'jpeg', width: 400 })} // Smallest jpeg as fallback src
                          alt={`${karya.title} - slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          onLoad={handleImageLoad}
                          loading="lazy"
                          width={karya.media_width || 400} // Provide default width
                          height={karya.media_height || 300} // Provide default height
                          style={{ backgroundImage: 'url(/placeholder.svg)', backgroundSize: 'cover' }} // Placeholder background
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
                    {/* Add AVIF source if desired and supported */}
                    {/* <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'avif', width: 800 })} type="image/avif" /> */}
                    <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'webp', width: 1200 })} type="image/webp" media="(min-width: 1024px)" />
                    <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'webp', width: 800 })} type="image/webp" media="(min-width: 640px)" />
                    <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'webp', width: 400 })} type="image/webp" />
                    {/* Fallback JPG/PNG source */}
                    <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'jpeg', width: 1200 })} type="image/jpeg" media="(min-width: 1024px)" />
                    <source srcSet={getTransformedUrl(mediaUrls[0], { format: 'jpeg', width: 800 })} type="image/jpeg" media="(min-width: 640px)" />
                    {/* Fallback img tag */}
                    <img
                      ref={imageRef}
                      src={getTransformedUrl(mediaUrls[0], { format: 'jpeg', width: 400 })} // Smallest jpeg as fallback src
                      alt={karya.title}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={handleImageLoad}
                      loading="lazy"
                      width={karya.media_width || 400} // Provide default width
                      height={karya.media_height || 300} // Provide default height
                      style={{ backgroundImage: 'url(/placeholder.svg)', backgroundSize: 'cover' }} // Placeholder background
                    />
                  </picture>
              )}
              {!imageLoaded && !hasVideo && (
                <div className="absolute inset-0 bg-secondary animate-pulse"></div>
              )}
            </>
          )}
        </div>

        {/* Content overlay with adaptive text color */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-5 opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t ${
            hasVideo ? 'from-black/95 to-transparent' : 
            isLightBackground ? 'from-black/80 to-transparent' : 'from-white/90 to-transparent'
          }`}
        >
          <div className="flex justify-between items-end gap-3">
            <div className="flex-1 min-w-0">
              <h3 className={`text-base sm:text-lg font-semibold truncate tracking-tight ${
                isLightBackground ? 'text-white' : 'text-black'
              }`}>{karya.title}</h3>
              <p className={`text-xs sm:text-sm truncate mt-1 ${
                isLightBackground ? 'text-white/80' : 'text-black/80'
              }`}>{karya.creator_name}</p>
            </div>
            {karya.link_url && (
              <motion.a 
                href={karya.link_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center gap-1.5 ${
                  isLightBackground ? 'text-white/70 hover:text-white bg-black/30' : 'text-black/70 hover:text-black bg-white/30'
                } backdrop-blur-sm rounded-full px-2.5 py-1 transition-colors border border-current`}
                aria-label="Visit related link"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Category Icon - with adaptive background */}
        <div 
          className={`absolute top-3 right-3 ${
            isLightBackground ? 'bg-black/20' : 'bg-white/95'
          } backdrop-blur-md p-2 rounded-full scale-100 transition-all duration-300 shadow-md`}
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
