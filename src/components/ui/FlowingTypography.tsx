
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlowingTypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
  animationType?: 'subtle-glow' | 'liquid-reveal' | 'none';
  className?: string;
  glowColor?: string;
}

const FlowingTypography: React.FC<FlowingTypographyProps> = ({
  as: Component = 'p',
  children,
  animationType = 'subtle-glow',
  className,
  glowColor
}) => {
  const baseClasses = cn(
    "relative text-white",
    {
      // Glass text effect
      'backdrop-blur-sm': animationType !== 'none',
    },
    className
  );

  const glowStyle = glowColor ? { '--color-glow-primary': glowColor } as React.CSSProperties : {};

  // Convert children to string for character animation
  const text = typeof children === 'string' ? children : '';
  const characters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  const characterVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  if (animationType === 'liquid-reveal' && typeof children === 'string') {
    return (
      <motion.div
        className={baseClasses}
        style={glowStyle}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={characterVariants}
            style={{ 
              textShadow: glowColor 
                ? `0 0 10px ${glowColor}, 0 0 20px ${glowColor}` 
                : `0 0 10px var(--color-glow-primary), 0 0 20px var(--color-glow-primary)`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
        
        {/* Glass overlay effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 1, 0] }}
          transition={{ 
            duration: 2,
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      style={glowStyle}
      initial={animationType !== 'none' ? { opacity: 0, y: 20 } : {}}
      animate={animationType !== 'none' ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      <Component
        className={cn(
          "relative z-10",
          {
            'glass-text-glow': animationType === 'subtle-glow',
          }
        )}
        style={{
          textShadow: animationType === 'subtle-glow' 
            ? glowColor 
              ? `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`
              : `0 0 10px var(--color-glow-primary), 0 0 20px var(--color-glow-primary)`
            : undefined
        }}
      >
        {children}
      </Component>
      
      {/* Glass reflection overlay */}
      {animationType !== 'none' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default FlowingTypography;
