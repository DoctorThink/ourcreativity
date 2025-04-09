
import React from 'react';
import { motion } from 'framer-motion';
import { Database } from '@/integrations/supabase/types';
import KaryaCard from '@/components/KaryaCard';
import { Sparkles } from 'lucide-react';

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

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        delay: i * 0.1 
      }
    })
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotlightItems.map((item, index) => (
          <motion.div 
            key={item.id}
            custom={index}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            className="spotlight-item scale-105 transform-gpu"
            style={{
              '--tile-glow-color': item.category === 'design' 
                ? 'rgba(152, 245, 225, 0.2)' 
                : item.category === 'video' 
                ? 'rgba(155, 109, 255, 0.2)' 
                : item.category === 'meme' 
                ? 'rgba(254, 198, 161, 0.2)' 
                : 'rgba(255, 209, 220, 0.2)'
            } as React.CSSProperties}
          >
            <KaryaCard 
              karya={item} 
              onClick={() => onKaryaClick(item)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SpotlightSection;
