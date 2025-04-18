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
import ColorThief from 'color-thief-browser';

// Helper: Calculate luminance and contrast
function getLuminance([r, g, b]: number[]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function getContrast(rgb1: number[], rgb2: number[]) {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}
function getContrastingTextColor(rgb: number[]) {
  const white = [255, 255, 255];
  const black = [0, 0, 0];
  const contrastWhite = getContrast(rgb, white);
  const contrastBlack = getContrast(rgb, black);
  // WCAG AA: 4.5:1 for normal text
  return contrastWhite >= contrastBlack ? (contrastWhite >= 4.5 ? '#fff' : '#000') : (contrastBlack >= 4.5 ? '#000' : '#fff');
}

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaCardProps {
  karya: KaryaType;
  onClick?: () => void;
}

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [textColor, setTextColor] = useState<string>('#fff');
  const [textShadow, setTextShadow] = useState<string>('0 2px 8px rgba(0,0,0,0.7)');

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

  // Color analysis for text contrast
  useEffect(() => {
    // Only analyze if not text-only
    if (isText) return;
    const img = imageRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      ColorThief.getColor(img)
        .then((rgb: number[]) => {
          const color = getContrastingTextColor(rgb);
          setTextColor(color);
          setTextShadow(color === '#fff' ? '0 2px 8px rgba(0,0,0,0.7)' : '0 2px 8px rgba(255,255,255,0.7)');
        })
        .catch(() => {
          setTextColor('#fff');
          setTextShadow('0 2px 8px rgba(0,0,0,0.7)');
        });
    }
  }, [imageLoaded, isText, mediaUrls]);

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

        {/* Content overlay with gradient background for better readability */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-5 text-foreground opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t ${
            hasVideo ? 'from-black/95 to-transparent' : 'from-background/95 to-transparent'
          }`}
          style={{ color: textColor, textShadow }}
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
