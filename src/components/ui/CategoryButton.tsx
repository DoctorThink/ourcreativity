
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { IconDisplay } from "./IconDisplay";
import { cn } from "@/lib/utils";

interface CategoryButtonProps {
  icon: LucideIcon;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  color?: "amethyst" | "turquoise" | "coral" | "mint" | "amber" | "emerald" | "softPink";
  className?: string;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  icon,
  text,
  isActive = false,
  onClick,
  color = "amethyst",
  className
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300",
        "bg-secondary/60 backdrop-blur-sm border-white/10 hover:border-white/20 hover:bg-secondary/80",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-background",
        isActive && "ring-2 ring-white/30 bg-secondary/90",
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <IconDisplay icon={icon} color={color} size="lg" />
      <span className="font-medium text-sm text-foreground/90 text-center leading-tight">
        {text}
      </span>
    </motion.button>
  );
};
