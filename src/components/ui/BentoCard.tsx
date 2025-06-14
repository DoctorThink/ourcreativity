
import React, { ReactNode, useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
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
  glowColor = 'rgba(155, 109, 255, 0.3)',
  interactive = true,
  hoverScale = 1.02,
  motionProps,
  style,
  onClick,
  ...props
}: BentoCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };
  
  const liquidMotionProps: MotionProps = {
    whileHover: interactive ? {
      scale: hoverScale,
      y: -8,
      rotateX: 3,
      rotateY: 3,
    } : {},
    whileTap: interactive ? { scale: 0.98 } : {},
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    },
    ...motionProps
  };

  return (
    <GlassCard
      className={cn(
        colSpan,
        rowSpan,
        "relative overflow-hidden",
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        ...style
      }}
      interactive={interactive}
      glowColor={glowColor}
      size="lg"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      {...liquidMotionProps}
    >
      {/* Liquid parallax background effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor} 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Morphing content container with parallax */}
      <motion.div
        className="relative z-10 h-full"
        style={{
          transform: interactive 
            ? `translate3d(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px, 0)`
            : 'none'
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15
        }}
      >
        {children}
      </motion.div>
      
      {/* Liquid morphing border effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(45deg, ${glowColor}, transparent, ${glowColor})`,
            backgroundSize: '200% 200%',
            backgroundClip: 'border-box',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            opacity: 0.6,
          }}
        />
      )}
    </GlassCard>
  );
};

export default BentoCard;
