
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter, Sparkles, TrendingUp } from 'lucide-react';

const categories = [
  { value: 'all', label: 'Semua' },
  { value: 'design', label: 'Design' },
  { value: 'video', label: 'Video' },
  { value: 'writing', label: 'Karya Tulis' },
  { value: 'meme', label: 'Meme' },
];

const sortOptions = [
  { value: 'recency', label: 'Terbaru', icon: Sparkles },
  { value: 'popularity', label: 'Terpopuler', icon: TrendingUp },
];

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  sortBy,
  onSortChange
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="sticky top-20 md:top-24 z-30 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-secondary/50 backdrop-blur-lg border border-white/10 rounded-2xl p-3 md:p-2 shadow-lg">
        <div className="w-full md:w-auto flex-grow overflow-x-auto">
          <div className="inline-flex items-center gap-2 p-1">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => onSelectCategory(category.value)}
                className={cn(
                  "relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm whitespace-nowrap",
                  "hover:text-foreground focus:outline-none focus:ring-2 focus:ring-amethyst/50"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCategory === category.value && (
                  <motion.div
                    layoutId="active-category-pill"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className={cn(
                  "relative z-10 transition-colors duration-200",
                  selectedCategory === category.value ? "text-foreground font-semibold" : "text-foreground/70"
                )}>
                  {category.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10 rounded-lg">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent className="bg-secondary/90 border-border/40 backdrop-blur-md rounded-xl shadow-lg">
              {sortOptions.map(option => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value} className="text-foreground hover:bg-foreground/10 focus:bg-foreground/10 rounded-lg my-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-foreground/70" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

