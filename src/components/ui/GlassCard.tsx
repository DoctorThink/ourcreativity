
import React, { ReactNode, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  interactive?: boolean;
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

const GlassCard = ({
  children,
  className,
  onClick,
  onMouseMove,
  interactive = false,
  glowColor = 'rgba(155, 109, 255, 0.3)',
  size = 'md',
  style,
  ...motionProps
}: GlassCardProps & MotionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'p-4 rounded-2xl',
    md: 'p-6 rounded-3xl',
    lg: 'p-8 rounded-[2rem]'
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden border border-white/20 backdrop-blur-xl',
        'bg-gradient-to-br from-white/10 via-white/5 to-transparent',
        'shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500',
        interactive && 'cursor-pointer',
        sizeClasses[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={onMouseMove}
      onClick={onClick}
      style={{
        boxShadow: isHovered && interactive 
          ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${glowColor}` 
          : undefined,
        ...style
      }}
      {...motionProps}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] opacity-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`,
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Liquid shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          opacity: isHovered ? [0, 0.5, 0] : 0,
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating particles inside card */}
      {isHovered && interactive && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/60"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Bottom rim light */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  );
};

export default GlassCard;
