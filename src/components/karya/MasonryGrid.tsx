
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
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
    480: 1
  };

  const handleItemClick = (item: KaryaType) => {
    if (onKaryaClick) {
      onKaryaClick(item);
    }
  };

  return (
    <div className="w-full">
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
              transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.05 }}
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
      
      <style jsx>{`
        .masonry-grid {
          display: flex;
          margin-left: -24px;
          width: auto;
        }
        
        .masonry-grid-column {
          padding-left: 24px;
          background-clip: padding-box;
        }
        
        .masonry-item {
          margin-bottom: 24px;
          break-inside: avoid;
        }
        
        @media (max-width: 640px) {
          .masonry-grid {
            margin-left: -16px;
          }
          
          .masonry-grid-column {
            padding-left: 16px;
          }
          
          .masonry-item {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
};
