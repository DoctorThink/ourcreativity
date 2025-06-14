
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
    rotateX: 2,
    rotateY: 2,
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
    ...(style || {})
  };

  return (
    <motion.div
      className={cn(
        colSpan,
        rowSpan,
        "group relative overflow-hidden border border-white/10",
        "rounded-3xl backdrop-blur-xl transition-all duration-500",
        glassEffect ? "bg-gradient-to-br from-white/10 via-white/5 to-white/2" : "bg-secondary",
        interactive ? "cursor-pointer" : "",
        className
      )}
      style={mergedStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...motionConfig}
    >
      {/* Enhanced glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/8 to-transparent opacity-80" />
      
      {/* Dynamic border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(45deg, ${glowColor}, transparent, ${glowColor})`,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%', '0% 0%'] : '0% 0%',
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />
      <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-background/80 via-background/60 to-secondary/40 backdrop-blur-xl" />
      
      {/* Liquid shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          opacity: isHovered ? [0, 0.8, 0] : 0,
        }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating particles on hover */}
      {isHovered && interactive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/70"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                filter: 'blur(0.5px)',
              }}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [20, -30],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 2.5,
                delay: Math.random() * 0.8,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [0.8, 2],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />
      
      {/* Glass reflection highlights */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-60" />
      
      {/* Content container */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default BentoCard;
