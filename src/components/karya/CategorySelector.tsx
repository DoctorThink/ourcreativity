
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
  { id: "all", name: "Semua", icon: Grid3X3, color: "rgba(152, 245, 225, 0.3)" },
  { id: "design", name: "Design", icon: Palette, color: "rgba(64, 224, 208, 0.3)" },
  { id: "video", name: "Video", icon: Video, color: "rgba(255, 127, 80, 0.3)" },
  { id: "writing", name: "Karya Tulis", icon: FileText, color: "rgba(155, 109, 255, 0.3)" },
  { id: "meme", name: "Meme", icon: Smile, color: "rgba(255, 209, 220, 0.3)" }
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
          <SelectTrigger className="w-full glass-morphism-shallow rounded-2xl text-foreground hover:glass-morphism transition-colors shadow-md">
            <SelectValue>
              <div className="flex items-center gap-3">
                {(() => {
                  const category = categories.find(cat => cat.id === selectedCategory);
                  const Icon = category?.icon || Grid3X3;
                  return (
                    <>
                      <div className="bg-white/90 p-1.5 rounded-full">
                        <Icon className="w-4 h-4 text-gray-700" />
                      </div>
                      <span>{category?.name || 'Pilih Kategori'}</span>
                    </>
                  );
                })()}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="glass-morphism-deep rounded-2xl shadow-lg overflow-hidden">
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
                      <div className="bg-white/90 p-1.5 rounded-full">
                        <Icon className="w-4 h-4 text-gray-700" />
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
            <LiquidButton
              key={category.id}
              variant={isActive ? "primary" : "secondary"}
              onClick={() => onSelectCategory(category.id)}
              className="flex flex-col items-center gap-3 p-6 h-auto min-h-[120px] rounded-2xl"
              glowColor={isActive ? category.color : undefined}
            >
              <div className={`p-4 rounded-full transition-all duration-300 ${
                isActive ? 'bg-white/20 shadow-lg' : 'bg-white/10'
              }`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{category.name}</span>
            </LiquidButton>
          );
        })}
      </div>
    </div>
  );
};
