
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidProgressProps {
  value: number;
  className?: string;
  color?: 'amethyst' | 'turquoise' | 'coral' | 'mint';
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LiquidProgress = ({
  value,
  className,
  color = 'amethyst',
  animated = true,
  size = 'md',
}: LiquidProgressProps) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  
  const colorStyles = {
    amethyst: 'from-amethyst/60 to-amethyst/80',
    turquoise: 'from-turquoise/60 to-turquoise/80',
    coral: 'from-coral/60 to-coral/80',
    mint: 'from-mint/60 to-mint/80',
  };

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn(
      'relative w-full rounded-full overflow-hidden',
      'bg-white/10 backdrop-blur-sm border border-white/20',
      sizeStyles[size],
      className
    )}>
      {/* Background Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={animated ? {
          x: ['-100%', '100%'],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Progress Fill */}
      <motion.div
        className={cn(
          'h-full bg-gradient-to-r rounded-full relative overflow-hidden',
          colorStyles[color]
        )}
        style={{ width: `${clampedValue}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Liquid Wave Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20"
          animate={animated ? {
            x: ['-100%', '100%'],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className={cn(
          'absolute inset-0 bg-gradient-to-r opacity-60 blur-sm',
          colorStyles[color]
        )}
        style={{ width: `${clampedValue}%` }}
        animate={animated ? {
          opacity: [0.4, 0.8, 0.4],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default LiquidProgress;
