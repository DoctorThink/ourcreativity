
import React, { useState, useEffect } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaCardProps {
  karya: KaryaType;
  onClick?: () => void;
  onLikeUpdate?: (id: string, newCount: number) => void;
}

const KaryaCard = ({ karya, onClick, onLikeUpdate }: KaryaCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [isLiking, setIsLiking] = useState(false);
  const [likesCount, setLikesCount] = useState(karya.likes_count || 0);
  const { toast } = useToast();

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

  // Update local likes count when props change
  useEffect(() => {
    setLikesCount(karya.likes_count || 0);
  }, [karya.likes_count]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the card detail
    
    if (isLiking) return;
    
    setIsLiking(true);
    const newCount = likesCount + 1;
    
    try {
      const { error } = await supabase
        .from('karya')
        .update({ likes_count: newCount })
        .eq('id', karya.id);
      
      if (error) throw error;
      
      setLikesCount(newCount);
      if (onLikeUpdate) onLikeUpdate(karya.id, newCount);
      
      toast({
        title: "Terima kasih!",
        description: "Anda telah menyukai karya ini",
      });
    } catch (error) {
      console.error('Error liking karya:', error);
      toast({
        title: "Gagal menyukai",
        description: "Terjadi kesalahan saat menyukai karya",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the card detail
    
    // Create share data
    const shareData = {
      title: `${karya.title} - OUR CREATIVITY`,
      text: `Karya oleh ${karya.creator_name} - OUR CREATIVITY`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Berhasil dibagikan!",
          description: "Karya telah dibagikan",
        });
      } else {
        // Fallback for browsers that don't support share API
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link disalin!",
          description: "Link karya telah disalin ke clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        variant: "destructive",
        title: "Gagal membagikan",
        description: "Terjadi kesalahan saat membagikan karya",
      });
    }
  };

  const isVideo = karya.category === 'video' && karya.content_url?.match(/\.(mp4|webm|ogg)$/i);
  const isText = karya.category === 'writing' && karya.description;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        onClick={onClick}
        className="group relative w-full overflow-hidden bg-secondary border border-border/40 rounded-3xl transition-all duration-300 cursor-pointer hover:border-border/60 hover:shadow-xl"
      >
        {/* Content Preview Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            paddingBottom: isText ? '100%' : `${(1 / (imageAspectRatio || 1)) * 100}%`,
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          }}
        >
          {isVideo ? (
            <video
              src={karya.content_url}
              className="absolute inset-0 w-full h-full object-cover"
              preload="metadata"
            />
          ) : isText ? (
            <div className="absolute inset-0 p-4 flex items-center justify-center bg-gradient-to-br from-secondary to-background overflow-hidden">
              <p className="text-foreground/80 text-sm line-clamp-6 text-center font-serif">
                {karya.description}
              </p>
            </div>
          ) : (
            <>
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
            </>
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
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="flex items-center gap-1 text-foreground/70 bg-background/50 backdrop-blur-sm rounded-full px-2.5 py-1 hover:bg-background/70 transition-colors"
                aria-label="Bagikan karya"
              >
                <Share2 className="h-3.5 w-3.5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className="flex items-center gap-1.5 text-foreground/70 bg-background/50 backdrop-blur-sm rounded-full px-2.5 py-1 hover:bg-background/70 transition-colors"
                aria-label={`Suka karya ini (${likesCount})`}
              >
                <Heart className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{likesCount}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Category Icon - Improved with white background */}
        <div 
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full opacity-90 scale-100 transition-all duration-300 border border-white/20 shadow-lg"
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
