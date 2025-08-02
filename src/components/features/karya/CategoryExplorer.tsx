
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CategoryExplorerProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const categories = [
    {
      id: "design",
      name: "Design",
      icon: "/lovable-uploads/design.png",
      color: "from-turquoise/40 to-turquoise/10",
      borderColor: "turquoise",
    },
    {
      id: "video",
      name: "Video",
      icon: "/lovable-uploads/video.png",
      color: "from-coral/40 to-coral/10",
      borderColor: "coral",
    },
    {
      id: "writing",
      name: "Karya Tulis",
      icon: "/lovable-uploads/karyatulis.png",
      color: "from-amber/40 to-amber/10",
      borderColor: "amber",
    },
    {
      id: "meme",
      name: "Meme",
      icon: "/lovable-uploads/meme.png",
      color: "from-purpleLight/40 to-purpleLight/10",
      borderColor: "purpleLight",
    },
    {
      id: "game",
      name: "Game",
      icon: "/lovable-uploads/game.png",
      color: "from-emerald/40 to-emerald/10",
      borderColor: "emerald",
    },
  ];

  // Variants for container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for item animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // 3D hover effect handler
  const handleHover = (categoryId: string) => {
    setHoveredCategory(categoryId);
  };

  const handleHoverEnd = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="px-4 py-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-6xl mx-auto"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => handleHover(category.id)}
            onHoverEnd={handleHoverEnd}
            onClick={() => onSelectCategory(category.id)}
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
            className={`relative cursor-pointer group`}
          >
            <motion.div
              animate={{
                rotateX: hoveredCategory === category.id ? (isMobile ? 0 : -10) : 0,
                rotateY: hoveredCategory === category.id ? (isMobile ? 0 : 15) : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8,
              }}
              className={`relative z-10 h-40 sm:h-48 rounded-3xl overflow-hidden bg-gradient-to-br ${category.color} flex flex-col items-center justify-center gap-4 p-4 text-center backdrop-blur-sm group-hover:border-${category.borderColor} transition-all duration-300 ${
                selectedCategory === category.id
                  ? `border-2 border-${category.borderColor} shadow-lg shadow-${category.borderColor}/20`
                  : "border border-white/10"
              }`}
            >
              {/* 3D floating element */}
              <div className="relative">
                <motion.div
                  animate={{
                    y: hoveredCategory === category.id ? -8 : 0,
                    rotate: hoveredCategory === category.id ? -5 : 0,
                  }}
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 10 },
                    rotate: { duration: 0.2 },
                  }}
                  className="relative z-10"
                >
                  <img 
                    src={category.icon}
                    alt={category.name}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
                
                {/* Shadow effect */}
                <motion.div
                  animate={{
                    scale: hoveredCategory === category.id ? 0.6 : 0.8,
                    opacity: hoveredCategory === category.id ? 0.5 : 0.2,
                  }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/50 rounded-full blur-md"
                />
              </div>
              
              <motion.h3 
                animate={{
                  y: hoveredCategory === category.id ? 2 : 0,
                }}
                className="font-medium text-lg"
              >
                {category.name}
              </motion.h3>
              
              {/* Selection indicator */}
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="selectedCategoryIndicator"
                  className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-${category.borderColor}`}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
            
            {/* Glow effect on hover */}
            <motion.div
              animate={{
                opacity: hoveredCategory === category.id || selectedCategory === category.id ? 0.7 : 0,
                scale: hoveredCategory === category.id || selectedCategory === category.id ? 1.1 : 1,
              }}
              className={`absolute inset-0 -z-10 rounded-3xl bg-${category.borderColor}/20 blur-xl`}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryExplorer;
