
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidButtonProps {
  variant?: 'primary' | 'secondary';
  glowColor?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LiquidButton: React.FC<LiquidButtonProps> = ({
  variant = 'primary',
  glowColor,
  onClick,
  children,
  className,
  disabled = false,
  size = 'md'
}) => {
  const baseClasses = cn(
    "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
    "glass-morphism glass-reflection shimmer-effect",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
    {
      // Size variants
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
      
      // Variant styles
      'text-white': variant === 'primary',
      'text-white/80': variant === 'secondary',
      
      // Disabled state
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    },
    className
  );

  const glowStyle = glowColor ? { '--color-glow-primary': glowColor } as React.CSSProperties : {};

  return (
    <motion.button
      className={baseClasses}
      style={glowStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { 
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
      }}
      whileTap={disabled ? {} : { 
        scale: 0.98,
        rotateX: 0,
        rotateY: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Ripple effect overlay */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl opacity-0"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: 1.5, 
          opacity: [0, 0.5, 0],
          transition: { duration: 0.6, ease: "easeOut" }
        }}
      />
      
      {/* Liquid glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl liquid-glow opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Morphing border */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-white/30"
        whileHover={{ 
          borderColor: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default LiquidButton;
