import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';

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

  // Preload image to get its dimensions
  useEffect(() => {
    const img = new Image();
    img.src = karya.image_url;
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
      setImageLoaded(true);
    };
  }, [karya.image_url]);

  return (
    <Card 
      onClick={onClick}
      className="group relative flex flex-col bg-secondary-dark border border-grayMid/30 rounded-3xl transition-all duration-300 cursor-pointer hover:border-grayMid/60 hover:shadow-lg"
    >
      {/* Image container with padding-bottom trick for aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: `${(1 / imageAspectRatio) * 100}%` }}>
        <img
          src={karya.image_url}
          alt={karya.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{karya.title}</h3>
            <p className="text-foreground/80 text-xs">{karya.creator_name}</p>
          </div>
          <div className="flex items-center gap-1 text-foreground/70">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{karya.likes_count || 0}</span>
          </div>
        </div>
      </div>

      {/* Category Icon */}
      <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
        <img
          src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
          alt={karya.category}
          className="w-6 h-6 object-contain"
        />
      </div>
    </Card>
  );
};

export default KaryaCard;
