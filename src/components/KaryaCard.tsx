
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaCardProps {
  karya: KaryaType;
  onClick?: () => void;
}

const KaryaCard = ({ karya, onClick }: KaryaCardProps) => {
  const categoryIcons: Record<string, string> = {
    'design': '/lovable-uploads/design.png',
    'video': '/lovable-uploads/video.png',
    'writing': '/lovable-uploads/karyatulis.png',
    'meme': '/lovable-uploads/meme.png',
  };

  // Removed motion variants, hover effect handled by CSS group-hover now
  return (
    // Removed motion.div wrapper
      <Card 
        onClick={onClick}
        // Added group class for hover effects on children
        className="group overflow-hidden relative h-full flex flex-col bg-secondary-dark border border-grayMid/30 rounded-3xl transition-all duration-300 cursor-pointer hover:border-grayMid/60"
      >
        {/* Image container */}
        {/* Image container with fixed aspect ratio */}
        <div className="w-full overflow-hidden aspect-square">
          <img
            src={karya.image_url}
            alt={karya.title}
            className="w-full h-full object-cover transition-transform duration-500 block" // Fill container, cover maintains aspect ratio
            loading="lazy"
          />
        </div>
        {/* Overlay revealed on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Content container - initially hidden, revealed on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none"> {/* Added invisible / group-hover:visible */}
          <div className="flex justify-between items-end">
            {/* Title and Creator */}
            <div>
              <h3 className="text-lg font-semibold line-clamp-1">{karya.title}</h3>
              <p className="text-foreground/80 text-xs">{karya.creator_name}</p>
            </div>
            {/* Likes - Monochrome */}
            <div className="flex items-center gap-1 text-foreground/70">
               <Heart className="h-4 w-4" />
               <span className="text-xs">{karya.likes_count || 0}</span>
            </div>
          </div>
        </div>

        {/* Category Icon - Larger and positioned top-right */}
        {/* Increased padding and icon size */}
        {/* Reverted padding, changed background to matte white, removed blur/border */}
        <div className="absolute top-3 right-3 bg-white p-1.5 rounded-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"> {/* Reduced padding to p-1.5 */}
          <img
            src={categoryIcons[karya.category] || '/lovable-uploads/design.png'}
            alt={karya.category}
            className="w-10 h-10 object-contain" /* Kept increased image size */
          />
        </div>
        
        {/* Removed CardHeader, CardContent, CardFooter as content is now overlaid */}
      </Card>
    // Removed closing motion.div - Line removed
  );
};

export default KaryaCard;
