
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import { getTransformedUrl } from '@/lib/karyaUtils';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface FeaturedWorkProps {
  item: KaryaType;
  onViewClick: () => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ item, onViewClick }) => {
  const backgroundImageUrl = getTransformedUrl(item.image_url, { width: 1280, quality: 50, format: 'webp' });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden mb-16 border border-white/10"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-500 ease-in-out scale-105"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center text-white p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-amethyst mb-2">Karya Unggulan</h2>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-2 line-clamp-2">{item.title}</h1>
          <p className="text-lg text-white/80 font-sans mb-6">oleh {item.creator_name}</p>
          <Button
            onClick={onViewClick}
            size="lg"
            className="group font-bold text-lg bg-gradient-to-r from-amethyst via-turquoise to-coral text-white transition-all duration-300 ease-in-out bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-full shadow-lg hover:shadow-amethyst/40"
          >
            Lihat Karya
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
