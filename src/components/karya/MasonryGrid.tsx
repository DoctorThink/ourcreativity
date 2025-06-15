
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
    default: 4,    // 4 columns on large desktop (1920px+)
    1536: 4,       // 4 columns on 2xl screens
    1280: 3,       // 3 columns on xl screens (1280px-1535px)
    1024: 3,       // 3 columns on lg screens (1024px-1279px)
    768: 2,        // 2 columns on md screens (768px-1023px)
    640: 2,        // 2 columns on sm screens (640px-767px)
    480: 1         // 1 column on xs screens (below 640px)
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
      
      {/* CSS Grid Fallback */}
      <style jsx>{`
        .masonry-container {
          width: 100%;
        }
        
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
          width: 100%;
        }
        
        /* Fallback CSS Grid for better reliability */
        @supports not (display: flex) {
          .masonry-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            margin-left: 0;
          }
          
          .masonry-grid-column {
            padding-left: 0;
          }
          
          @media (max-width: 1535px) {
            .masonry-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          @media (max-width: 1023px) {
            .masonry-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 639px) {
            .masonry-grid {
              grid-template-columns: 1fr;
            }
          }
        }
      `}</style>
    </div>
  );
};
