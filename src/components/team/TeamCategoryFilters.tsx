
import React from "react";
import { motion } from "framer-motion";
import { Video, Palette, Smile, FileText } from "lucide-react";
import { CategoryButton } from "@/components/ui/CategoryButton";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// Team Categories
const categories = [
  {
    id: "video",
    name: "Video Editing",
    icon: Video,
    color: "coral" as const
  },
  {
    id: "design",
    name: "Graphic Design",
    icon: Palette,
    color: "turquoise" as const
  },
  {
    id: "meme",
    name: "Meme",
    icon: Smile,
    color: "softPink" as const
  },
  {
    id: "karyatulis",
    name: "Karya Tulis",
    icon: FileText,
    color: "mint" as const
  },
];

interface TeamCategoryFiltersProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const TeamCategoryFilters: React.FC<TeamCategoryFiltersProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          icon={category.icon}
          text={category.name}
          color={category.color}
          isActive={activeCategory === category.id}
          onClick={() => onCategoryChange(activeCategory === category.id ? null : category.id)}
        />
      ))}
    </motion.div>
  );
};
