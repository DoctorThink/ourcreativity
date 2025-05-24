
import React from "react"; // Removed useState as it's not used directly for props
import { motion } from "framer-motion";
import { Filter, Search, ArrowLeft, TrendingUp, CalendarClock } from "lucide-react"; // Added icons for sort buttons
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Slider is removed
import { Badge } from "@/components/ui/badge";

// Assuming SortByType is defined in KaryaKami.tsx and passed down if specific values are needed
// For now, using string as per instructions for this component's preparation.
type SortByType = 'created_at_desc' | 'likes_count_desc';

interface AdvancedFiltersProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  onSearchTermChange: (term: string) => void;
  searchTerm: string;
  onSortByChange: (sortOption: SortByType) => void;
  sortBy: SortByType;
  onSelectedTagsChange: (tags: string[]) => void;
  selectedTags: string[];
  uniqueTags: string[];
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onSelectCategory,
  selectedCategory,
  onSearchTermChange,
  searchTerm,
  onSortByChange,
  sortBy,
  onSelectedTagsChange,
  selectedTags,
  uniqueTags,
}) => {
  // Internal state for search query (if needed for debouncing or local changes before prop update)
  // For now, directly using prop 'searchTerm' and 'onSearchTermChange' for controlled input
  // const [searchQuery, setSearchQuery] = useState(searchTerm);
  // const [recencyValue, setRecencyValue] = useState([50]); // REMOVED
  // const [popularityValue, setPopularityValue] = useState([50]); // REMOVED
  // const [activeTags, setActiveTags] = useState<string[]>(selectedTags); // Use prop for selected tags

  const categories = [
    { id: "all", name: "Semua" },
    { id: "design", name: "Desain", icon: "/lovable-uploads/design.png" },
    { id: "video", name: "Video", icon: "/lovable-uploads/video.png" },
    { id: "writing", name: "Karya Tulis", icon: "/lovable-uploads/karyatulis.png" },
    { id: "meme", name: "Meme", icon: "/lovable-uploads/meme.png" },
    { id: "game", name: "Game", icon: "/lovable-uploads/game.png" },
  ];
  
  // Use uniqueTags from props instead of static popularTags
  // const popularTags = uniqueTags; 
  
  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onSelectedTagsChange(newSelectedTags);
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
            value={searchTerm} // Controlled input
            onChange={(e) => onSearchTermChange(e.target.value)} // Update via prop
            className="pl-10 py-6 bg-background/40 border-white/10 focus-visible:ring-amethyst"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={18} />
          {searchTerm && ( // Use searchTerm from props
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSearchTermChange("")} // Update via prop
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
      
      {/* Sort Controls */}
      <motion.div variants={itemVariants} className="mb-6">
        <h4 className="text-sm text-foreground/70 mb-3">Sort By</h4>
        <div className="flex flex-wrap gap-3">
          <Button
            variant={sortBy === 'created_at_desc' ? "default" : "outline"}
            onClick={() => onSortByChange('created_at_desc')}
            className={`flex items-center gap-2 transition-all duration-200 ${
              sortBy === 'created_at_desc' 
                ? 'bg-amethyst text-background hover:bg-amethyst/90' 
                : 'bg-background/40 hover:bg-background/60 border-white/10'
            }`}
          >
            <CalendarClock size={16} />
            Newest
          </Button>
          <Button
            variant={sortBy === 'likes_count_desc' ? "default" : "outline"}
            onClick={() => onSortByChange('likes_count_desc')}
            className={`flex items-center gap-2 transition-all duration-200 ${
              sortBy === 'likes_count_desc' 
                ? 'bg-amethyst text-background hover:bg-amethyst/90' 
                : 'bg-background/40 hover:bg-background/60 border-white/10'
            }`}
          >
            <TrendingUp size={16} />
            Most Popular
          </Button>
        </div>
      </motion.div>
      
      {/* Available Tags with animation */}
      <motion.div variants={itemVariants} className="mb-6">
        <h4 className="text-sm text-foreground/70 mb-3">Filter by Tags</h4>
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map((tag) => ( // Use uniqueTags from props
            <Badge
              key={tag}
              variant="secondary"
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer px-3 py-1.5 ${
                selectedTags.includes(tag) // Use selectedTags from props
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
            onSelectedTagsChange([]);
            onSelectCategory("all");
            onSortByChange('created_at_desc'); // Reset sort order to default
          }}
        >
          Reset Filters
        </Button>
        {/* "Apply Filters" button can be removed or kept as per future requirements. 
            Currently, filters apply reactively.
        <Button 
          className="bg-gradient-to-r from-amethyst to-turquoise hover:opacity-90 transition-opacity duration-300"
        >
          Apply Filters
        </Button> 
        */}
      </motion.div>
    </motion.div>
  );
};

export default AdvancedFilters;
