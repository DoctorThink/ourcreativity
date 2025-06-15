
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Megaphone, Grid3X3 } from "lucide-react";

interface GlowarFilterBarProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  isSticky?: boolean;
}

const filters = [
  { id: "all", label: "Semua", icon: Grid3X3 },
  { id: "event", label: "Acara", icon: Calendar },
  { id: "recruitment", label: "Rekrutmen", icon: Users },
  { id: "update", label: "Update", icon: Megaphone },
];

export const GlowarFilterBar: React.FC<GlowarFilterBarProps> = ({
  currentFilter,
  onFilterChange,
  isSticky = false
}) => {
  return (
    <motion.div 
      className={`
        ${isSticky ? 'fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-4xl px-4' : 'relative'}
        transition-all duration-300
      `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glassmorphic Container */}
      <div className="backdrop-blur-xl bg-secondary/80 border border-white/20 rounded-full p-2 shadow-lg mx-auto max-w-fit">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = currentFilter === filter.id;
            
            return (
              <motion.button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-amethyst to-turquoise text-white shadow-lg shadow-amethyst/30' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/10'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-amethyst to-turquoise rounded-full opacity-20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
