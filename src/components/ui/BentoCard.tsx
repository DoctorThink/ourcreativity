import React, { ReactNode, useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  onClick?: () => void;
}

const BentoCard = ({
  children,
  className,
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  glassEffect = true,
  glowColor = 'rgba(155, 109, 255, 0.3)',
  interactive = true,
  hoverScale = 1.015,
  motionProps,
  style,
  onClick,
  ...props
}: BentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverAnimation = interactive ? {
    scale: hoverScale,
    y: -6,
  } : {};
  
  const tapAnimation = interactive ? { scale: 0.98 } : {};

  const motionConfig: MotionProps = {
    whileHover: hoverAnimation,
    whileTap: tapAnimation,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
    ...(motionProps || {})
  };

  const handleClick = () => {
    if (interactive && onClick) {
      onClick();
    }
  };

  const mergedStyles: React.CSSProperties = { 
    transformStyle: 'preserve-3d',
    borderColor: isHovered && interactive ? 'var(--glass-border-color-hover)' : 'var(--glass-border-color)',
    '--glow-color': glowColor,
    ...(style || {})
  };

  return (
    <motion.div
      className={cn(
        colSpan,
        rowSpan,
        "group relative overflow-hidden",
        "rounded-3xl transition-all duration-500",
        glassEffect ? "glass-morphism border" : "bg-secondary border",
        interactive ? "cursor-pointer" : "",
        className
      )}
      style={mergedStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...motionConfig}
    >
      {/* Subtle border glow on hover */}
      <motion.div
        className="absolute -inset-px rounded-3xl border-2 border-transparent"
        style={{
          borderColor: 'var(--glow-color)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && interactive ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glass reflection highlights */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
      
      {/* Content container */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default BentoCard;
