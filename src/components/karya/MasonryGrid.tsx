
import React from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { Card } from "../ui/card";
import KaryaCard from "../KaryaCard";
import { Database } from "@/integrations/supabase/types";

type KaryaType = Database['public']['Tables']['karya']['Row'];

type MasonryGridProps = {
  items: KaryaType[];
  onKaryaClick?: (karya: KaryaType) => void;
  loading?: boolean;
};

export const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  items, 
  onKaryaClick,
  loading = false 
}) => {
  // Responsive breakpoint columns configuration
  const breakpointColumnsObj = {
    default: 4,
    1536: 3,
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
      className="flex w-auto -ml-4 my-masonry-grid"
      columnClassName="pl-4 bg-transparent my-masonry-grid_column"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <KaryaCard 
            karya={item} 
            onClick={() => handleItemClick(item)} 
          />
        </motion.div>
      ))}
    </Masonry>
  );
};
