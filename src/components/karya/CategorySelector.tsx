
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Video, FileText, Smile, Grid3X3 } from "lucide-react";
import { CategoryButton } from "../ui/CategoryButton";
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
  { id: "all", name: "Semua", icon: Grid3X3, color: "mint" as const },
  { id: "design", name: "Design", icon: Palette, color: "turquoise" as const },
  { id: "video", name: "Video", icon: Video, color: "coral" as const },
  { id: "writing", name: "Karya Tulis", icon: FileText, color: "amethyst" as const },
  { id: "meme", name: "Meme", icon: Smile, color: "softPink" as const }
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
          <SelectTrigger className="w-full bg-secondary/80 border border-white/10 backdrop-blur-md rounded-2xl text-foreground hover:bg-secondary/90 transition-colors shadow-md">
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
          <SelectContent className="bg-secondary/90 border-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
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
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            icon={category.icon}
            text={category.name}
            color={category.color}
            isActive={selectedCategory === category.id}
            onClick={() => onSelectCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};
