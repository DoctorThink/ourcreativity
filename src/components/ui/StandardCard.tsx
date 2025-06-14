
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StandardCardProps {
  children: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
}

export const StandardCard: React.FC<StandardCardProps> = ({
  children,
  interactive = false,
  onClick,
  className,
  glowColor
}) => {
  const Component = interactive ? motion.div : "div";
  
  const motionProps = interactive ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } : {};

  return (
    <Component
      onClick={onClick}
      className={cn(
        "bg-secondary/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6",
        "transition-all duration-300 shadow-sm",
        interactive && "cursor-pointer hover:border-white/20 hover:bg-secondary/80 hover:shadow-md",
        interactive && "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      style={{ 
        "--tile-glow-color": glowColor 
      } as React.CSSProperties}
      {...motionProps}
    >
      {children}
    </Component>
  );
};
