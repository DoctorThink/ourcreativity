
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface AdvancedFiltersProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recencyValue, setRecencyValue] = useState([50]);
  const [popularityValue, setPopularityValue] = useState([50]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  
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
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 bg-background/40 border-white/10 focus-visible:ring-amethyst"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={18} />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
            >
              <ArrowLeft size={18} />
            </motion.button>
          )}
        </div>
      </motion.div>
      
      {/* Categories with animated selection */}
      <motion.div variants={itemVariants} className="mb-6">
        <h4 className="text-sm text-foreground/70 mb-3">Categories</h4>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <motion.div variants={itemVariants}>
          <h4 className="text-sm text-foreground/70 mb-3">Recency</h4>
          <div className="px-2">
            <Slider
              defaultValue={recencyValue}
              max={100}
              step={1}
              onValueChange={setRecencyValue}
            />
            <div className="flex justify-between mt-2 text-xs text-foreground/60">
              <span>Oldest</span>
              <span className="text-amethyst font-medium">{recencyValue}%</span>
              <span>Newest</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h4 className="text-sm text-foreground/70 mb-3">Popularity</h4>
          <div className="px-2">
            <Slider
              defaultValue={popularityValue}
              max={100}
              step={1}
              onValueChange={setPopularityValue}
            />
            <div className="flex justify-between mt-2 text-xs text-foreground/60">
              <span>Any</span>
              <span className="text-amethyst font-medium">{popularityValue}%</span>
              <span>Most Popular</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Popular tags with animation */}
      <motion.div variants={itemVariants} className="mb-6">
        <h4 className="text-sm text-foreground/70 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer px-3 py-1.5 ${
                activeTags.includes(tag)
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
            setSearchQuery("");
            setRecencyValue([50]);
            setPopularityValue([50]);
            setActiveTags([]);
            onSelectCategory("all");
          }}
        >
          Reset
        </Button>
        <Button 
          className="bg-gradient-to-r from-amethyst to-turquoise hover:opacity-90 transition-opacity duration-300"
        >
          Apply Filters
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedFilters;
