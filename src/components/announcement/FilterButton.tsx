
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
  color?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ 
  active, 
  onClick, 
  children,
  icon: Icon,
  color
}) => (
  <motion.button 
    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 transition-all ${
      active ? 'bg-gradient-to-r from-foreground to-foreground/90 text-background' : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.2 }}
  >
    {Icon && (
      <span className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center ${active ? '' : color}`}>
        <Icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${active ? 'text-background' : 'text-background'}`} />
      </span>
    )}
    {children}
  </motion.button>
);
