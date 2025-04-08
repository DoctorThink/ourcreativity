
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaCardProps {
  karya: KaryaType;
  onClick?: () => void;
}

const KaryaCard = ({ karya, onClick }: KaryaCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  const categoryIcons: Record<string, string> = {
    'design': '/lovable-uploads/design.png',
    'video': '/lovable-uploads/video.png',
    'writing': '/lovable-uploads/karyatulis.png',
    'meme': '/lovable-uploads/meme.png',
  };

  useEffect(() => {
    const img = new Image();
    img.src = karya.image_url;
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
      setImageLoaded(true);
    };
    img.onerror = () => {
      setImageAspectRatio(1);
      setImageLoaded(true);
    };
  }, [karya.image_url]);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        onClick={onClick}
        className="group relative w-full overflow-hidden bg-secondary border border-border/40 rounded-3xl transition-all duration-300 cursor-pointer hover:border-border/60 hover:shadow-xl"
      >
        {/* Image container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            paddingBottom: `${(1 / (imageAspectRatio || 1)) * 100}%`,
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <img
            src={karya.image_url}
            alt={karya.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse"></div>
          )}
        </div>

        {/* Modernized overlay with improved aesthetics */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
          aria-hidden="true"
        />
        
        {/* Content overlay with better typography */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-foreground opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex justify-between items-end gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold truncate tracking-tight">{karya.title}</h3>
              <p className="text-foreground/80 text-xs sm:text-sm truncate mt-1">{karya.creator_name}</p>
            </div>
            <div className="flex items-center gap-1.5 text-foreground/70 flex-shrink-0 bg-background/50 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Heart className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{karya.likes_count || 0}</span>
            </div>
          </div>
        </div>

        {/* Category Icon - Modernized with glassy effect */}
        <div 
          className="absolute top-3 right-3 bg-background/60 backdrop-blur-md p-2 rounded-full opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 border border-white/10 shadow-lg"
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
