import React, { useState } from 'react';
import { Database } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface Props {
  karya: KaryaType;
  onClick?: () => void;
  width?: number;
  height?: number;
}

const KaryaCard: React.FC<Props> = ({ karya, onClick, width, height }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const categoryIcons: Record<string, string> = {
    'design': '/lovable-uploads/design.png',
    'video': '/lovable-uploads/video.png',
    'writing': '/lovable-uploads/karyatulis.png',
    'meme': '/lovable-uploads/meme.png',
  };

  const isVideo = (url: string) => url?.match(/\.(mp4|webm|ogg)$/i);
  const isText = karya.category === 'writing' && karya.description;

  const mediaUrls = karya.media_urls?.length ? karya.media_urls : [karya.image_url];

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  // Calculate aspect ratio
  let aspectRatio = 4 / 3; // Default aspect ratio
  if (karya.media_width && karya.media_height) {
    aspectRatio = karya.media_width / karya.media_height;
  }

  const cardWidth = width || 'auto';
  const cardHeight = height || (width ? width / aspectRatio : 'auto');

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${karya.is_spotlight ? 'spotlight-card' : ''}`}
      style={{ width: cardWidth }}
    >
      <Card
        onClick={onClick}
        className={`group relative w-full overflow-hidden bg-secondary/80 backdrop-blur-md border border-border/40 rounded-3xl transition-all duration-300 cursor-pointer hover:border-border/60 hover:shadow-xl ${
          karya.is_spotlight ? 'ring-2 ring-lavender/50 shadow-lg shadow-lavender/20' : ''
        }`}
        style={{ height: cardHeight }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-t-2xl">
          {isText ? (
            <div className="h-full p-6 flex items-center justify-center bg-gradient-to-br from-secondary to-background/80 overflow-hidden">
              <p className="text-foreground/80 text-sm line-clamp-6 text-center font-serif">
                {karya.description}
              </p>
            </div>
          ) : mediaUrls.length > 1 ? (
            <Carousel
              className="w-full h-full"
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
            >
              <CarouselContent>
                {mediaUrls.map((url, index) => (
                  <CarouselItem key={index} className="h-full">
                    {isVideo(url) ? (
                      <video
                        src={url}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
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
            <>
              {isVideo(mediaUrls[0]) ? (
                <video
                  src={mediaUrls[0]}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
              ) : (
                <img
                  src={mediaUrls[0]}
                  alt={karya.title}
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
              )}
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 w-full p-4">
              <h3 className="text-white font-bold text-lg truncate">{karya.title}</h3>
              <p className="text-white/80 text-sm truncate">by {karya.creator_name}</p>
            </div>
          </div>
        </div>

        <div
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full scale-100 transition-all duration-300 shadow-md"
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
