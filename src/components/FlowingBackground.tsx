
import React from 'react';
import { motion } from 'framer-motion';

interface FlowingBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'high';
  accents?: Array<'amethyst' | 'turquoise' | 'coral' | 'mint' | 'softPink'>;
  variant?: 'gradient' | 'monochromatic' | 'neutral';
  animate?: boolean;
}

const FlowingBackground: React.FC<FlowingBackgroundProps> = ({ 
  className, 
  intensity = 'medium',
  accents = ['amethyst', 'turquoise', 'coral'],
  variant = 'gradient',
  animate = true
}) => {
  // Configure opacity based on intensity
  const opacitySettings = {
    subtle: {
      primary: 0.15,
      secondary: 0.1,
      lines: 0.1
    },
    medium: {
      primary: 0.25,
      secondary: 0.15,
      lines: 0.2
    },
    high: {
      primary: 0.35,
      secondary: 0.2,
      lines: 0.3
    }
  };
  
  const opacities = opacitySettings[intensity];

  // Function to get color values based on accent
  const getAccentColor = (accent: string): string => {
    switch (accent) {
      case 'amethyst':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(155, 109, 255, 0.3) 0%, transparent 70%)' : 
          '#9b6dff';
      case 'turquoise':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(64, 224, 208, 0.3) 0%, transparent 70%)' : 
          '#40e0d0';
      case 'coral':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(255, 127, 80, 0.3) 0%, transparent 70%)' : 
          '#ff7f50';
      case 'mint':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(152, 245, 225, 0.3) 0%, transparent 70%)' : 
          '#98f5e1';
      case 'softPink':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(255, 209, 220, 0.3) 0%, transparent 70%)' : 
          '#ffd1dc';
      default:
        return variant === 'gradient' ?
          'radial-gradient(circle at center, rgba(80, 80, 95, 0.3) 0%, transparent 70%)' : 
          '#50505f';
    }
  };

  // Get colors for the background elements
  const colors = accents.map(accent => getAccentColor(accent));
  
  // Determine if we should use monochromatic colors
  const monochromaticGray = variant === 'monochromatic' || variant === 'neutral';
  const baseColor = monochromaticGray ? 
    (variant === 'neutral' ? '#424244' : '#5f5f6f') : 
    undefined;

  return (
    <div className={`fixed inset-0 -z-20 overflow-hidden pointer-events-none ${className}`}>
      {/* First large gradient blob - primary accent or monochromatic */}
      <motion.div 
        className="absolute w-[120vw] h-[120vh] rounded-full blur-[150px]"
        style={{
          background: monochromaticGray ? 
            `radial-gradient(circle at center, ${baseColor} 0%, transparent 70%)` : 
            colors[0],
          top: '-10vh',
          left: '-10vw',
          opacity: opacities.primary
        }}
        animate={animate ? {
          x: [20, -20, 20],
          y: [20, -20, 20],
          scale: [1, 1.05, 1]
        } : undefined}
        transition={animate ? {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 40,
          ease: 'easeInOut',
        } : undefined}
      />
      
      {/* Second large gradient blob - secondary accent or monochromatic */}
      <motion.div 
        className="absolute w-[80vw] h-[80vh] rounded-full blur-[100px]"
        style={{
          background: monochromaticGray ? 
            `radial-gradient(circle at center, ${baseColor} 0%, transparent 70%)` : 
            colors[1] || colors[0],
          bottom: '-10vh',
          right: '-10vw',
          opacity: opacities.secondary
        }}
        animate={animate ? {
          x: [-30, 30, -30],
          y: [-20, 20, -20],
          scale: [1, 1.03, 1]
        } : undefined}
        transition={animate ? {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 50,
          ease: 'easeInOut',
        } : undefined}
      />
      
      {/* Optional third accent blob */}
      {colors[2] && (
        <motion.div 
          className="absolute w-[60vw] h-[60vh] rounded-full blur-[120px]"
          style={{
            background: monochromaticGray ? 
              `radial-gradient(circle at center, ${baseColor} 0%, transparent 70%)` : 
              colors[2],
            top: '30vh',
            right: '10vw',
            opacity: opacities.secondary * 0.8
          }}
          animate={animate ? {
            x: [15, -15, 15],
            y: [10, -10, 10],
            scale: [1, 1.02, 1]
          } : undefined}
          transition={animate ? {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 35,
            ease: 'easeInOut',
          } : undefined}
        />
      )}
      
      {/* Subtle line accents */}
      <motion.div 
        className="absolute h-[1px] w-[40vw]"
        style={{ 
          background: `linear-gradient(to right, transparent, ${monochromaticGray ? 'rgba(160, 160, 180, 0.3)' : 'rgba(255, 255, 255, 0.3)'}, transparent)`,
          top: '30%', 
          left: '10%',
          opacity: opacities.lines
        }}
        animate={animate ? {
          x: [0, 50, 0],
          opacity: [opacities.lines * 0.5, opacities.lines, opacities.lines * 0.5],
        } : undefined}
        transition={animate ? {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 25,
          ease: 'easeInOut',
        } : undefined}
      />
      
      <motion.div 
        className="absolute w-[1px] h-[40vh]"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${monochromaticGray ? 'rgba(160, 160, 180, 0.3)' : 'rgba(255, 255, 255, 0.3)'}, transparent)`,
          top: '20%', 
          right: '30%',
          opacity: opacities.lines
        }}
        animate={animate ? {
          y: [0, 40, 0],
          opacity: [opacities.lines * 0.5, opacities.lines, opacities.lines * 0.5],
        } : undefined}
        transition={animate ? {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 30,
          ease: 'easeInOut',
        } : undefined}
      />
      
      {/* Grid overlay with reduced opacity */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        style={{
          opacity: opacities.lines * 0.75,
          transform: animate ? `translateY(${Math.sin(Date.now() * 0.0001) * 10}px)` : undefined
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 noise-pattern opacity-[0.03] mix-blend-overlay"
        style={{ opacity: opacities.lines * 1.5 }}
      />
    </div>
  );
};

export default FlowingBackground;
