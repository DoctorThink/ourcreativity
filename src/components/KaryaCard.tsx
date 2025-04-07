import React, { useState, useEffect } from 'react'; // Re-added useState, useEffect
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaCardProps {
  karya: KaryaType;
  onClick?: () => void;
}

const KaryaCard = ({ karya, onClick }: KaryaCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false); // Re-added imageLoaded state
  const [imageAspectRatio, setImageAspectRatio] = useState(1); // Re-added imageAspectRatio state

  const categoryIcons: Record<string, string> = {
    'design': '/lovable-uploads/design.png',
    'video': '/lovable-uploads/video.png',
    'writing': '/lovable-uploads/karyatulis.png',
    'meme': '/lovable-uploads/meme.png',
  };

  // Re-added useEffect for image loading and aspect ratio calculation
  useEffect(() => {
    const img = new Image();
    img.src = karya.image_url;
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
      setImageLoaded(true);
    };
    // Add error handling or default aspect ratio if needed
    img.onerror = () => {
      setImageAspectRatio(1); // Default to 1:1 or another ratio on error
      setImageLoaded(true); // Still mark as loaded to remove skeleton/placeholder
    };
  }, [karya.image_url]);

  return (
    <Card
      onClick={onClick}
      className="group relative w-full overflow-hidden bg-secondary-dark border border-grayMid/30 rounded-3xl transition-all duration-300 cursor-pointer hover:border-grayMid/60 hover:shadow-lg"
    >
      {/* Image container - Reverted to using paddingBottom for aspect ratio */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          // Calculate paddingBottom based on aspect ratio to reserve space
          // Added fallback for aspect ratio 0 or NaN
          paddingBottom: `${(1 / (imageAspectRatio || 1)) * 100}%`,
          // Optional: Add min/max height constraints if desired
          // minHeight: '150px',
          // maxHeight: '500px',
          // Add a background color for loading state
          backgroundColor: 'rgba(255, 255, 255, 0.05)' // Example placeholder color
        }}
      >
        {/* Image - Absolutely positioned to fill the container */}
        <img
          src={karya.image_url}
          alt={karya.title}
          // Apply transition for smooth appearance
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0' // Fade in when loaded
          }`}
          loading="lazy"
          // Consider adding onError handler for the image tag itself if needed
          // onError={(e) => e.currentTarget.style.display = 'none'} // Example: hide broken image
        />
        {/* Optional: Skeleton/Placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse"></div>
        )}
      </div>

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex justify-between items-end gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold truncate">{karya.title}</h3>
            <p className="text-foreground/80 text-xs truncate">{karya.creator_name}</p>
          </div>
          <div className="flex items-center gap-1 text-foreground/70 flex-shrink-0">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{karya.likes_count || 0}</span>
          </div>
        </div>
      </div>

      {/* Category Icon */}
      <div 
        className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"
        aria-label={`Category: ${karya.category}`}
      >
        <img
          src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
          alt={karya.category}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
      </div>
    </Card>
  );
};

export default KaryaCard;
