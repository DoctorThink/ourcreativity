
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlowingTypographyProps {
  children: React.ReactNode;
  variant?: 'hero' | 'title' | 'subtitle' | 'body';
  className?: string;
  animated?: boolean;
  glowEffect?: boolean;
}

const FlowingTypography = ({
  children,
  variant = 'body',
  className,
  animated = true,
  glowEffect = false,
}: FlowingTypographyProps) => {
  const variantStyles = {
    hero: 'text-6xl md:text-8xl font-serif font-bold',
    title: 'text-3xl md:text-5xl font-serif font-bold',
    subtitle: 'text-xl md:text-2xl font-sans font-medium',
    body: 'text-base md:text-lg font-sans',
  };

  const glowStyles = glowEffect ? 'glow-text' : '';

  return (
    <motion.div
      className={cn(
        variantStyles[variant],
        glowStyles,
        animated && 'animated-gradient-text',
        className
      )}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Liquid Text Animation */}
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      )}
      
      {children}
    </motion.div>
  );
};

export default FlowingTypography;
