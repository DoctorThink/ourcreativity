
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
    { id: "writing", name: "Karya Tulis", icon: "/lovable-uploads/karyatulis.png" },
    { id: "meme", name: "Meme", icon: "/lovable-uploads/meme.png" }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "px-4 py-2 rounded-full flex items-center space-x-2 transition-all font-sans",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
              : "bg-secondary hover:bg-secondary/80 backdrop-blur-md border border-border/20"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.icon && (
            <div className={cn(
              "rounded-full p-1 mr-1.5",
              selectedCategory === category.id 
                ? "bg-primary-foreground/20" 
                : "bg-white/90"
            )}>
              <img src={category.icon} alt={category.name} className="w-4 h-4" />
            </div>
          )}
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};
