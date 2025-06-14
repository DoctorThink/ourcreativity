
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const LiquidButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
}: LiquidButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const variantStyles = {
    primary: 'bg-gradient-to-r from-amethyst/20 to-turquoise/20 border-amethyst/30',
    secondary: 'bg-gradient-to-r from-coral/20 to-mint/20 border-coral/30',
    accent: 'bg-gradient-to-r from-emerald/20 to-softPink/20 border-emerald/30',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-2xl backdrop-blur-xl border',
        'transition-all duration-300 font-medium text-white',
        'shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/20',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
      }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Liquid Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />

      {/* Ripple Effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-2xl"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Glass Reflection */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default LiquidButton;
