
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import KaryaCard from "../../KaryaCard";
import { Database } from "@/integrations/supabase/types";

type KaryaType = Database['public']['Tables']['karya']['Row'];

type MasonryGridProps = {
  items: KaryaType[];
  onKaryaClick?: (karya: KaryaType) => void;
};

export const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  items, 
  onKaryaClick,
}) => {
  const breakpointColumnsObj = {
    default: 5,      // 5 columns on wide desktop
    1280: 4,         // 4 columns on desktop and large laptops
    1024: 3,         // 3 columns on large tablets/small laptops
    768: 2,          // 2 columns on tablets
    640: 2,          // 2 columns on large phones
    480: 1           // 1 column on small phones
  };

  const handleItemClick = (item: KaryaType) => {
    if (onKaryaClick) {
      onKaryaClick(item);
    }
  };

  return (
    <div className="masonry-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="masonry-item"
            >
              <KaryaCard 
                karya={item} 
                onClick={() => handleItemClick(item)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Masonry>
    </div>
  );
};
