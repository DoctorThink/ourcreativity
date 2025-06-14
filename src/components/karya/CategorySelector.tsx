
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Video, FileText, Smile, Grid3X3 } from "lucide-react";
import LiquidButton from "@/components/ui/LiquidButton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const categories = [
  { id: "all", name: "Semua", icon: Grid3X3, glowColor: "rgba(80, 200, 120, 0.4)" },
  { id: "design", name: "Design", icon: Palette, glowColor: "rgba(30, 144, 255, 0.4)" },
  { id: "video", name: "Video", icon: Video, glowColor: "rgba(255, 127, 80, 0.4)" },
  { id: "writing", name: "Karya Tulis", icon: FileText, glowColor: "rgba(155, 109, 255, 0.4)" },
  { id: "meme", name: "Meme", icon: Smile, glowColor: "rgba(255, 209, 220, 0.4)" }
];

export const CategorySelector: React.FC<CategoryProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="px-4">
        <Select value={selectedCategory} onValueChange={onSelectCategory}>
          <SelectTrigger className="w-full glass-morphism-shallow border border-white/10 rounded-2xl text-foreground hover:glass-morphism transition-all shadow-md">
            <SelectValue>
              <div className="flex items-center gap-3">
                {(() => {
                  const category = categories.find(cat => cat.id === selectedCategory);
                  const Icon = category?.icon || Grid3X3;
                  return (
                    <>
                      <div className="glass-morphism p-1.5 rounded-full">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span>{category?.name || 'Pilih Kategori'}</span>
                    </>
                  );
                })()}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="glass-morphism-deep border-white/10 rounded-2xl shadow-lg overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="py-1"
            >
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="text-foreground hover:bg-foreground/10 focus:bg-foreground/10 rounded-xl my-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="glass-morphism p-1.5 rounded-full">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </motion.div>
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-5 gap-4 max-w-5xl w-full">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <LiquidButton
                variant={isActive ? "primary" : "secondary"}
                onClick={() => onSelectCategory(category.id)}
                className={`
                  w-full flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300
                  ${isActive ? 'liquid-glow' : 'glass-morphism-shallow hover:glass-morphism'}
                `}
                glowColor={isActive ? category.glowColor : undefined}
              >
                <motion.div
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'glass-morphism-accent shadow-lg' 
                      : 'glass-morphism-shallow'
                  }`}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/80'}`} />
                </motion.div>
                
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/80'
                }`}>
                  {category.name}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      boxShadow: `0 0 8px ${category.glowColor}`
                    }}
                  />
                )}
              </LiquidButton>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
