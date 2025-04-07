
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

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      scale: 1.02, 
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      className="h-full"
    >
      <Card 
        onClick={onClick}
        className="overflow-hidden h-full flex flex-col bg-secondary border-border/40 rounded-3xl transition-all duration-300 cursor-pointer"
      >
        <div className="aspect-square w-full overflow-hidden">
          <img 
            src={karya.image_url} 
            alt={karya.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold line-clamp-1">{karya.title}</h3>
              <p className="text-muted-foreground text-sm">{karya.creator_name}</p>
            </div>
            <div className="bg-black/10 backdrop-blur-md p-1.5 rounded-full">
              <img 
                src={categoryIcons[karya.category] || '/lovable-uploads/design.png'} 
                alt={karya.category}
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3 flex-grow">
          {karya.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {karya.description}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-muted-foreground">
              {new Date(karya.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <Button variant="ghost" size="sm" className="gap-1 text-rose-400 hover:text-rose-500 hover:bg-rose-500/10">
              <Heart className="h-4 w-4" />
              <span>{karya.likes_count || 0}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default KaryaCard;
