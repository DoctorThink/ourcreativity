
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdvancedFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  sortBy: string; // 'recency' | 'popularity'
  onSortByChange: (sort: string) => void;
  selectedTags: string[];
  onSelectedTagsChange: (tags: string[]) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchTermChange,
  sortBy,
  onSortByChange,
  selectedTags,
  onSelectedTagsChange,
}) => {
  const categories = [
    { id: "all", name: "Semua" },
    { id: "design", name: "Desain", icon: "/lovable-uploads/design.png" },
    { id: "video", name: "Video", icon: "/lovable-uploads/video.png" },
    { id: "writing", name: "Karya Tulis", icon: "/lovable-uploads/karyatulis.png" },
    { id: "meme", name: "Meme", icon: "/lovable-uploads/meme.png" },
    { id: "game", name: "Game", icon: "/lovable-uploads/game.png" },
  ];
  
  const popularTags = [
    "kreatif", "inovasi", "desain", "digital", "seni", 
    "fotografi", "ilustrasi", "animasi", "inspirasi", "modern",
    "tradisional", "budaya", "teknologi"
  ];
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onSelectedTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onSelectedTagsChange([...selectedTags, tag]);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      y: -20,
      transition: { duration: 0.3, when: "afterChildren" }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-6xl mx-auto mb-6 bg-secondary/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <Filter className="text-amethyst w-6 h-6" />
        <h3 className="text-xl font-medium">Advanced Filters</h3>
      </motion.div>
      
      {/* Search input with animation */}
      <motion.div 
        variants={itemVariants}
        className="mb-6"
      >
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by title, creator, or description..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-10 py-6 bg-background/40 border-white/10 focus-visible:ring-amethyst"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={18} />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSearchTermChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
            >
              <ArrowLeft size={18} />
            </motion.button>
          )}
        </div>
      </motion.div>
      
      {/* Categories with animated selection */}
      <motion.div variants={itemVariants} className="mb-6">
        <h4 className="text-sm text-foreground/70 mb-3 font-sans">Categories</h4>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? "bg-amethyst text-background"
                  : "bg-background/40 hover:bg-background/60"
              } flex items-center gap-2 transition-colors duration-300`}
            >
              {category.icon && (
                <img src={category.icon} alt={category.name} className="w-4 h-4" />
              )}
              <span>{category.name}</span>
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="categoryHighlight"
                  className="absolute inset-0 bg-gradient-to-r from-amethyst to-turquoise rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Sliders with animated feedback */}
      {/* Sort By Buttons */}
      <motion.div variants={itemVariants} className="mb-6">
        <h4 className="text-sm text-foreground/70 mb-3 font-sans">Sort By</h4>
        <div className="flex flex-wrap gap-3">
          <Button
            variant={sortBy === "recency" ? "default" : "outline"}
            onClick={() => onSortByChange("recency")}
            className={sortBy === "recency" ? "bg-amethyst text-background" : "border-white/10 hover:bg-background/60"}
          >
            Recency (Newest First)
          </Button>
          <Button
            variant={sortBy === "popularity" ? "default" : "outline"}
            onClick={() => onSortByChange("popularity")}
            className={sortBy === "popularity" ? "bg-amethyst text-background" : "border-white/10 hover:bg-background/60"}
          >
            Popularity
          </Button>
        </div>
      </motion.div>
      
      {/* Popular tags with animation */}
      <motion.div variants={itemVariants} className="mb-6">
        <h4 className="text-sm text-foreground/70 mb-3 font-sans">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer px-3 py-1.5 ${
                selectedTags.includes(tag)
                  ? "bg-amethyst/20 hover:bg-amethyst/30 border-amethyst/50"
                  : "bg-background/40 hover:bg-background/60 border-white/10"
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                #{tag}
              </motion.span>
            </Badge>
          ))}
        </div>
      </motion.div>
      
      {/* Action buttons with animation */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-end gap-3"
      >
        <Button
          variant="outline"
          className="border-white/10 hover:bg-background/60 hover:text-foreground"
          onClick={() => {
            onSearchTermChange("");
            onSortByChange("recency"); // Default sort
            onSelectedTagsChange([]);
            onSelectCategory("all");
          }}
        >
          Reset
        </Button>
        <Button 
          className="bg-gradient-to-r from-amethyst to-turquoise hover:opacity-90 transition-opacity duration-300"
          // This button doesn't need a specific onClick if filters apply live
        >
          Apply Filters 
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedFilters;
