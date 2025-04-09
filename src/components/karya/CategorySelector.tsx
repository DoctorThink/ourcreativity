
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

export interface CategoryOption {
  value: string;
  label: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: CategoryOption[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  setActiveCategory
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-10">
      {isMobile ? (
        <div className="px-4">
          <Select 
            value={activeCategory} 
            onValueChange={setActiveCategory}
          >
            <SelectTrigger className="w-full bg-secondary/80 border border-border/40 backdrop-blur-md rounded-2xl text-foreground hover:bg-secondary/90 transition-colors shadow-md">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <div className="bg-white/90 p-1 rounded-full">
                    <img 
                      src={categories.find(cat => cat.value === activeCategory)?.icon || categories[0].icon} 
                      alt="" 
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  <span>{categories.find(cat => cat.value === activeCategory)?.label || 'Pilih Kategori'}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent 
              className="bg-secondary/90 border-border/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
              position="popper"
              sideOffset={5}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="py-1"
              >
                {categories.map(category => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-foreground hover:bg-foreground/10 focus:bg-foreground/10 rounded-xl my-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-white/90 p-1 rounded-full">
                        <img src={category.icon} alt="" className="w-4 h-4 object-contain" />
                      </div>
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </motion.div>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="inline-flex bg-secondary/70 border border-border/40 backdrop-blur-md rounded-2xl p-1.5 shadow-lg">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "relative px-5 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm",
                  "hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-1 focus:ring-offset-transparent"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {activeCategory === category.value && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-lg"
                    />
                  )}
                </AnimatePresence>
                
                <span className={cn(
                  "relative z-10 transition-colors duration-200 flex items-center gap-2",
                  activeCategory === category.value 
                    ? "text-foreground font-semibold"
                    : "text-foreground/60 hover:text-foreground/80"
                )}>
                  <div className="bg-white/90 p-1 rounded-full">
                    <img src={category.icon} alt="" className="w-4 h-4 object-contain" />
                  </div>
                  {category.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
