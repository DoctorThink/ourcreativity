
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidProgressProps {
  value: number; // 0-100
  className?: string;
  showValue?: boolean;
  animated?: boolean;
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LiquidProgress: React.FC<LiquidProgressProps> = ({
  value,
  className,
  showValue = false,
  animated = true,
  glowColor,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  const glowStyle = glowColor ? { '--color-glow-primary': glowColor } as React.CSSProperties : {};
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("relative w-full", className)} style={glowStyle}>
      {/* Progress container */}
      <div className={cn(
        "relative overflow-hidden rounded-full glass-morphism-shallow",
        sizeClasses[size]
      )}>
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.1) 2px,
              rgba(255,255,255,0.1) 4px
            )`
          }}
        />
        
        {/* Progress fill */}
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, var(--color-glow-primary), var(--color-glow-secondary))",
            width: `${clampedValue}%`
          }}
          initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            duration: animated ? 1.5 : 0,
            ease: "easeOut"
          }}
        >
          {/* Flowing liquid effect */}
          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%"
            }}
            animate={{
              backgroundPosition: ["-200% 0%", "200% 0%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Liquid bubbles effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 2px, transparent 2px),
                          radial-gradient(circle at 60% 30%, rgba(255,255,255,0.2) 1px, transparent 1px),
                          radial-gradient(circle at 80% 70%, rgba(255,255,255,0.4) 1.5px, transparent 1.5px)`,
              backgroundSize: "20px 20px, 15px 15px, 25px 25px"
            }}
            animate={{
              backgroundPosition: [
                "0px 0px, 0px 0px, 0px 0px",
                "20px 20px, -15px 15px, 25px -25px"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 0 0 10px var(--color-glow-primary)`
          }}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Value display */}
      {showValue && (
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full ml-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span className="text-sm font-medium text-white/80">
            {Math.round(clampedValue)}%
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default LiquidProgress;
