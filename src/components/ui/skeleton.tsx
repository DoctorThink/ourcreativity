
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'image' | 'default';
  width?: string | number;
  height?: string | number;
  lines?: number;
  style?: React.CSSProperties;
}

function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  lines = 1,
  style: customStyle,
}: SkeletonProps) {
  // Default skeleton behavior for backward compatibility
  if (variant === 'default') {
    return (
      <div
        className={cn("animate-pulse rounded-md bg-secondary/50", className)}
        style={customStyle}
      />
    );
  }

  const baseClasses = 'bg-secondary/50 animate-pulse rounded';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'rounded-xl';
      case 'circle':
        return 'rounded-full';
      case 'image':
        return 'rounded-lg';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const getDefaultSize = () => {
    switch (variant) {
      case 'card':
        return { width: '100%', height: '200px' };
      case 'circle':
        return { width: '40px', height: '40px' };
      case 'image':
        return { width: '100%', height: '160px' };
      case 'text':
      default:
        return { width: '100%', height: '1rem' };
    }
  };

  const defaultSize = getDefaultSize();
  const style = {
    ...customStyle,
    width: width || defaultSize.width,
    height: height || defaultSize.height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={cn(baseClasses, getVariantClasses(), className)}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : style.width, // Last line shorter
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(baseClasses, getVariantClasses(), className)}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
  );
}

export { Skeleton }
