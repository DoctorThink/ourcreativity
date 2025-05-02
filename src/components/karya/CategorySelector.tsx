
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type CategoryProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export const CategorySelector: React.FC<CategoryProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const categories = [
    { id: "all", name: "All" },
    { id: "design", name: "Design", icon: "/lovable-uploads/design.png" },
    { id: "video", name: "Video", icon: "/lovable-uploads/video.png" },
    { id: "meme", name: "Meme", icon: "/lovable-uploads/meme.png" },
    { id: "karyatulis", name: "Tulisan", icon: "/lovable-uploads/karyatulis.png" },
    { id: "game", name: "Game", icon: "/lovable-uploads/game.png" }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "px-4 py-2 rounded-full flex items-center space-x-2 transition-all",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.icon && (
            <img src={category.icon} alt={category.name} className="w-5 h-5" />
          )}
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};
