import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GlassCard = ({
  children,
  className,
  onClick,
  interactive = false,
  glowColor = 'rgba(155, 109, 255, 0.3)',
  size = 'md'
}: GlassCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'p-4 rounded-2xl',
    md: 'p-6 rounded-3xl',
    lg: 'p-8 rounded-[2rem]'
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        'shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500',
        'glass-morphism-deep', // Use new class for deeper glass effect
        interactive && 'cursor-pointer',
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: isHovered && interactive ? 'var(--glass-border-color-hover)' : 'var(--glass-border-color)',
        boxShadow: isHovered && interactive 
          ? `0 12px 35px rgba(0,0,0,0.4), 0 0 25px ${glowColor}` 
          : '0 8px 32px rgba(0,0,0,0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={interactive ? {
        scale: 1.02,
        y: -5,
      } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] opacity-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`,
        }}
        animate={{
          opacity: isHovered && interactive ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
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
