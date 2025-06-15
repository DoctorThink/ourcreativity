
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTitleRow } from "./IconTitleRow";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: "coral" | "turquoise" | "softPink" | "mint" | "orangeLight" | "amethyst";
  description: string;
  memberCount: number;
  memberAvatars: string[];
}

interface CategoryShowcaseProps {
  categories: Category[];
  className?: string;
}

const colorClasses = {
  coral: "from-coral/20 to-coral/5 border-coral/50 text-coral",
  turquoise: "from-turquoise/20 to-turquoise/5 border-turquoise/50 text-turquoise",
  softPink: "from-softPink/20 to-softPink/5 border-softPink/50 text-softPink",
  mint: "from-mint/20 to-mint/5 border-mint/50 text-mint",
  orangeLight: "from-orangeLight/20 to-orangeLight/5 border-orangeLight/50 text-orangeLight",
  amethyst: "from-amethyst/20 to-amethyst/5 border-amethyst/50 text-amethyst",
};

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ 
  categories, 
  className 
}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <motion.div 
      className={cn("grid md:grid-cols-2 gap-8", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Left Column - Category Tabs */}
      <div className="space-y-3">
        <h3 className="text-xl font-serif font-bold text-foreground mb-6">
          Kategori Kreatif
        </h3>
        {categories.map((category, index) => {
          const isActive = activeCategory.id === category.id;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "w-full p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden",
                "bg-secondary/50 backdrop-blur-sm",
                isActive 
                  ? `bg-gradient-to-r ${colorClasses[category.color]} border-2` 
                  : "border-neutral-700/60 hover:border-neutral-600"
              )}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <IconTitleRow
                icon={category.icon}
                iconColor={isActive ? category.color : "neutral"}
                title={category.name}
                titleClassName={isActive ? `text-${category.color}` : "text-foreground"}
                gap="md"
              />
              
              {/* Aurora gradient overlay for active state */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-amethyst/10 via-turquoise/10 to-coral/10 rounded-2xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Right Column - Dynamic Content Panel */}
      <div className="bg-secondary/50 backdrop-blur-sm border border-neutral-700/60 rounded-2xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Category Header */}
            <div>
              <h4 className="text-2xl font-serif font-bold text-foreground mb-2">
                {activeCategory.name}
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            {/* Member Count */}
            <div className="flex items-center gap-4">
              <motion.span 
                className={cn("text-4xl font-bold", `text-${activeCategory.color}`)}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {activeCategory.memberCount}
              </motion.span>
              <span className="text-foreground/60 font-medium">Anggota Aktif</span>
            </div>

            {/* Member Avatars Preview */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                Anggota Unggulan
              </h5>
              <div className="flex gap-2">
                {activeCategory.memberAvatars.map((avatar, index) => (
                  <motion.div
                    key={index}
                    className="w-12 h-12 rounded-full bg-neutral-700 border border-neutral-600 flex items-center justify-center text-white/80 font-semibold"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {avatar}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
