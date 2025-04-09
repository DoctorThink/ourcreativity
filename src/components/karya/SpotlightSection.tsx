
import React from 'react';
import { motion } from 'framer-motion';
import { Database } from '@/integrations/supabase/types';
import KaryaCard from '@/components/KaryaCard';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif tracking-tight text-foreground">
          {activeCategory === 'all' ? 'Karya Spotlight' : `Spotlight ${categories.find(c => c.value === activeCategory)?.label}`}
        </h2>
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <span>Featured works</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotlightItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
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
