import React from 'react';
import { motion } from 'framer-motion';
import { Database } from '@/integrations/supabase/types';
import KaryaCard from '@/components/KaryaCard';
import { Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface SpotlightSectionProps {
  spotlightItems: KaryaType[];
  activeCategory: string;
  categories: { value: string; label: string; icon: string }[];
  onKaryaClick: (karya: KaryaType) => void;
}

const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  spotlightItems,
  activeCategory,
  categories,
  onKaryaClick
}) => {
  if (spotlightItems.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif tracking-tight text-foreground flex items-center gap-2">
          <span className="bg-lavender/20 p-1.5 rounded-full">
            <Sparkles className="h-5 w-5 text-lavender" />
          </span>
          {activeCategory === 'all' 
            ? 'Karya Spotlight' 
            : `Spotlight ${categories.find(c => c.value === activeCategory)?.label}`}
        </h2>
        <div className="flex items-center gap-2 text-sm text-foreground/60 bg-secondary/40 px-3 py-1 rounded-full backdrop-blur-sm">
          <span>Featured works</span>
        </div>
      </div>
      <div className="relative">
        <Carousel opts={{ loop: true, align: 'center' }}>
          <CarouselContent>
            {spotlightItems.map((item, index) => (
              <CarouselItem key={item.id} className="px-1 md:px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="spotlight-item scale-105 transform-gpu"
                  style={{
                    // @ts-ignore: Allow CSS variable for custom glow color
                    ['--tile-glow-color' as any]: item.category === 'design'
                      ? 'rgba(152, 245, 225, 0.2)'
                      : item.category === 'video'
                      ? 'rgba(155, 109, 255, 0.2)'
                      : item.category === 'meme'
                      ? 'rgba(254, 198, 161, 0.2)'
                      : 'rgba(255, 209, 220, 0.2)'
                  }}
                >
                  <KaryaCard karya={item} onClick={() => onKaryaClick(item)} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="right-2 md:right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </motion.div>
  );
};

export default SpotlightSection;
