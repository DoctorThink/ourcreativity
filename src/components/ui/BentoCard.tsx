import React, { ReactNode } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define more specific props to avoid type conflicts
interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  glassEffect?: boolean;
  glowColor?: string;
  interactive?: boolean;
  hoverScale?: number;
  motionProps?: MotionProps;
  style?: React.CSSProperties;
  onClick?: () => void; // Add onClick handler to props
}

const BentoCard = ({
  children,
  className,
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  glassEffect = true,
  glowColor,
  interactive = true,
  hoverScale = 1.03,
  motionProps,
  style,
  onClick, // Add onClick to destructured props
  ...props
}: BentoCardProps) => {
  // Define animation configurations separately from the JSX
  const hoverAnimation = interactive ? {
    scale: hoverScale,
    boxShadow: glowColor ? `0 0 25px ${glowColor}` : "0 10px 25px rgba(0, 0, 0, 0.2)"
  } : {};
  
  const tapAnimation = interactive ? { scale: 0.98 } : {};

  // Separate motion props
  const motionConfig: MotionProps = {
    whileHover: hoverAnimation,
    whileTap: tapAnimation,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
    ...(motionProps || {})
  };

  // Handle the onClick function for interactive cards
  const handleClick = () => {
    if (interactive && onClick) {
      onClick();
    }
  };

  // Merge the custom style with our calculated styles
  const mergedStyles: React.CSSProperties = { 
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    ...(glowColor ? { '--card-glow-color': glowColor } as React.CSSProperties : {}),
    ...style
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
      style={mergedStyles}
      onClick={handleClick} // Add onClick handler
      {...motionConfig}
    >
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-3xl shadow-inner-subtle pointer-events-none" />
      
      {/* Enhanced shimmer on hover for interactive cards */}
      {interactive && (
        <div className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer" />
      )}

      {children}
    </motion.div>
  );
};

export default BentoCard;
