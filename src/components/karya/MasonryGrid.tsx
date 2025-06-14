
import React from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
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

  // Container animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Individual item animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  // Flowing reveal animation for grid items
  const flowingVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: index * 0.08, // Stagger delay based on index
        duration: 0.5
      }
    })
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
            custom={index}
            variants={flowingVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.02,
              y: -8,
              rotateX: 2,
              rotateY: 2,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            className="mb-6 relative"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Liquid glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, var(--color-glow-primary) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Floating particles effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-0"
              whileHover={{ opacity: 1 }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    filter: 'blur(0.5px)',
                  }}
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [10, -20],
                    x: [0, Math.random() * 20 - 10],
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
            
            <KaryaCard 
              karya={item} 
              onClick={() => handleItemClick(item)} 
            />
          </motion.div>
        ))}
      </Masonry>
      
      {/* Loading state with staggered skeleton animation */}
      {loading && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-morphism-shallow rounded-3xl p-6 h-64"
            >
              <motion.div
                className="w-full h-32 glass-morphism rounded-2xl mb-4"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              />
              <motion.div
                className="w-3/4 h-4 glass-morphism rounded-lg mb-2"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (index * 0.1) + 0.2
                }}
              />
              <motion.div
                className="w-1/2 h-4 glass-morphism rounded-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (index * 0.1) + 0.4
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
