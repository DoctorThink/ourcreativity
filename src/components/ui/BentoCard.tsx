
import React, { ReactNode } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// Define more specific props to avoid type conflicts
interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  children: ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  icon?: LucideIcon;
  iconColor?: string;
  glassEffect?: boolean;
  glowColor?: string;
  interactive?: boolean;
  hoverScale?: number;
  motionProps?: MotionProps;
}

const BentoCard = ({
  children,
  className,
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  icon: Icon,
  iconColor = "text-foreground",
  glassEffect = true,
  glowColor,
  interactive = true,
  hoverScale = 1.03,
  motionProps,
  ...props
}: BentoCardProps) => {
  const hoverAnimation = interactive ? {
    scale: hoverScale,
    boxShadow: glowColor ? `0 0 25px ${glowColor}` : "0 10px 25px rgba(0, 0, 0, 0.2)"
  } : {};
  
  const tapAnimation = interactive ? { scale: 0.98 } : {};

  // Separate HTML attributes and motion props to avoid conflicts
  const motionConfig: MotionProps = {
    whileHover: hoverAnimation,
    whileTap: tapAnimation,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
    ...(motionProps || {})
  };

  return (
    <motion.div
      className={cn(
        colSpan,
        rowSpan,
        "rounded-3xl overflow-hidden relative border border-white/10",
        glassEffect ? "backdrop-blur-lg bg-secondary/80" : "bg-secondary",
        interactive ? "cursor-pointer" : "",
        className
      )}
      {...motionConfig}
      style={{ 
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        ...(glowColor ? { '--card-glow-color': glowColor } as React.CSSProperties : {}),
        ...props.style
      }}
      {...props}
    >
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-3xl shadow-inner-subtle pointer-events-none" />
      
      {/* Enhanced shimmer on hover for interactive cards */}
      {interactive && (
        <div className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer" />
      )}

      {Icon && (
        <div className="absolute top-4 left-4">
          <div className={cn("p-2 rounded-full", iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      )}

      {children}
    </motion.div>
  );
};

export default BentoCard;
