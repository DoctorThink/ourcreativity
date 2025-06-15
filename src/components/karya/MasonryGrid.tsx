
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import KaryaCard from "../KaryaCard";
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
    default: 4,
    1536: 4,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1
  };

  const handleItemClick = (item: KaryaType) => {
    if (onKaryaClick) {
      onKaryaClick(item);
    }
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
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
            className="mb-6"
          >
            <KaryaCard 
              karya={item} 
              onClick={() => handleItemClick(item)} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Masonry>
  );
};
