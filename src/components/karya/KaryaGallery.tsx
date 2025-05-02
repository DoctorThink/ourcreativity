
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CategorySelector } from "./CategorySelector";
import { MasonryGrid } from "./MasonryGrid";

// Mock data for demonstration
const mockKarya = [
  {
    id: 1,
    title: "Digital Art Exploration",
    description: "A creative experiment with digital brushes and textures",
    imageUrl: "/placeholder.svg",
    category: "design",
    createdAt: "2023-04-15",
    creator: "Andi Susanto"
  },
  {
    id: 2,
    title: "Motion Graphics Demo",
    description: "Animation showcase using After Effects",
    imageUrl: "/placeholder.svg",
    category: "video",
    createdAt: "2023-05-22",
    creator: "Dina Pratiwi"
  },
  {
    id: 3,
    title: "UI Design Collection",
    description: "Mobile app interface concepts",
    imageUrl: "/placeholder.svg",
    category: "design",
    createdAt: "2023-03-10",
    creator: "Rama Wijaya"
  },
  {
    id: 4,
    title: "Meme of the Week",
    description: "Humor content about creativity",
    imageUrl: "/placeholder.svg",
    category: "meme",
    createdAt: "2023-06-05",
    creator: "Satria Budi"
  },
  {
    id: 5,
    title: "Essay on Modern Art",
    description: "Thoughts on contemporary art movements",
    imageUrl: "/placeholder.svg",
    category: "karyatulis",
    createdAt: "2023-05-18",
    creator: "Nina Amelia"
  },
  {
    id: 6,
    title: "Indie Game Concept",
    description: "Early development of a 2D platformer",
    imageUrl: "/placeholder.svg",
    category: "game",
    createdAt: "2023-04-30",
    creator: "Budi Santoso"
  }
];

export const KaryaGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const filteredKarya = selectedCategory === "all" 
    ? mockKarya 
    : mockKarya.filter(item => item.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CategorySelector 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="mt-8">
        <MasonryGrid items={filteredKarya} />
      </div>
    </motion.div>
  );
};
