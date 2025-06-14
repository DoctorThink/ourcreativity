
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

  // Container variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  // Item variants for individual animation
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4 my-masonry-grid"
        columnClassName="pl-4 bg-transparent my-masonry-grid_column"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="mb-6"
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <KaryaCard 
              karya={item} 
              onClick={() => handleItemClick(item)} 
            />
          </motion.div>
        ))}
      </Masonry>
    </motion.div>
  );
};
