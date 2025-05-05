
import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface FlowingBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'high';
  accents?: Array<'amethyst' | 'turquoise' | 'coral' | 'mint' | 'softPink'>;
  variant?: 'gradient' | 'monochromatic' | 'neutral';
  animate?: boolean;
  optimized?: boolean;
}

const FlowingBackground: React.FC<FlowingBackgroundProps> = ({ 
  className, 
  intensity = 'medium',
  accents = ['amethyst', 'turquoise', 'coral'],
  variant = 'gradient',
  animate = true,
  optimized = true
}) => {
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const [currentAccents, setCurrentAccents] = useState(accents);
  
  // Configure colors based on route
  useEffect(() => {
    switch (location.pathname) {
      case '/brand-story':
        setCurrentAccents(['amethyst', 'coral', 'mint']);
        break;
      case '/tim-kami':
        setCurrentAccents(['turquoise', 'coral', 'amethyst']);
        break;
      case '/informasi':
        setCurrentAccents(['coral', 'amethyst', 'softPink']);
        break;
      case '/pengumuman':
        setCurrentAccents(['mint', 'softPink', 'turquoise']);
        break;
      case '/terms':
        setCurrentAccents(['softPink', 'mint', 'amethyst']);
        break;
      case '/karya-kami':
        setCurrentAccents(['amethyst', 'coral', 'mint']);
        break;
      default:
        setCurrentAccents(accents);
    }
  }, [location.pathname, accents]);
  
  // Configure opacity based on intensity
  const opacitySettings = {
    subtle: {
      primary: 0.12,
      secondary: 0.08,
      lines: 0.08
    },
    medium: {
      primary: 0.18,
      secondary: 0.12,
      lines: 0.15
    },
    high: {
      primary: 0.25,
      secondary: 0.15,
      lines: 0.2
    }
  };
  
  const opacities = opacitySettings[intensity];

  // Function to get color values based on accent
  const getAccentColor = (accent: string): string => {
    switch (accent) {
      case 'amethyst':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(155, 109, 255, 0.2) 0%, transparent 70%)' : 
          '#9b6dff';
      case 'turquoise':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(64, 224, 208, 0.2) 0%, transparent 70%)' : 
          '#40e0d0';
      case 'coral':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(255, 127, 80, 0.2) 0%, transparent 70%)' : 
          '#ff7f50';
      case 'mint':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(152, 245, 225, 0.2) 0%, transparent 70%)' : 
          '#98f5e1';
      case 'softPink':
        return variant === 'gradient' ? 
          'radial-gradient(circle at center, rgba(255, 209, 220, 0.2) 0%, transparent 70%)' : 
          '#ffd1dc';
      default:
        return variant === 'gradient' ?
          'radial-gradient(circle at center, rgba(80, 80, 95, 0.2) 0%, transparent 70%)' : 
          '#50505f';
    }
  };

  // Get colors for the background elements
  const colors = currentAccents.map(accent => getAccentColor(accent));
  
  // Determine if we should use monochromatic colors
  const monochromaticGray = variant === 'monochromatic' || variant === 'neutral';
  const baseColor = monochromaticGray ? 
    (variant === 'neutral' ? '#424244' : '#5f5f6f') : 
    undefined;
    
  // Skip most animations when reduced motion is preferred or optimized mode is on
  const shouldAnimate = animate && !prefersReducedMotion && !optimized;

  return (
    <div className={`fixed inset-0 -z-20 overflow-hidden pointer-events-none gpu-accelerated ${className}`}>
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
        animate={shouldAnimate ? {
          x: [0, -10, 0],
          y: [0, -10, 0],
          scale: [1, 1.03, 1]
        } : undefined}
        transition={shouldAnimate ? {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 30,
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
        animate={shouldAnimate ? {
          x: [0, 10, 0],
          y: [0, 10, 0],
          scale: [1, 1.02, 1]
        } : undefined}
        transition={shouldAnimate ? {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 35,
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
          animate={shouldAnimate ? {
            x: [0, -5, 0],
            y: [0, -5, 0],
            scale: [1, 1.01, 1]
          } : undefined}
          transition={shouldAnimate ? {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 25,
            ease: 'easeInOut',
          } : undefined}
        />
      )}
      
      {/* Subtle line accents - only if not optimized */}
      {!optimized && (
        <>
          <motion.div 
            className="absolute h-[1px] w-[40vw]"
            style={{ 
              background: `linear-gradient(to right, transparent, ${monochromaticGray ? 'rgba(160, 160, 180, 0.2)' : 'rgba(255, 255, 255, 0.2)'}, transparent)`,
              top: '30%', 
              left: '10%',
              opacity: opacities.lines
            }}
            animate={shouldAnimate ? {
              x: [0, 20, 0],
              opacity: [opacities.lines * 0.5, opacities.lines, opacities.lines * 0.5]
            } : undefined}
            transition={shouldAnimate ? {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 20,
              ease: 'easeInOut',
            } : undefined}
          />
          
          <motion.div 
            className="absolute w-[1px] h-[40vh]"
            style={{ 
              background: `linear-gradient(to bottom, transparent, ${monochromaticGray ? 'rgba(160, 160, 180, 0.2)' : 'rgba(255, 255, 255, 0.2)'}, transparent)`,
              top: '20%', 
              right: '30%',
              opacity: opacities.lines
            }}
            animate={shouldAnimate ? {
              y: [0, 20, 0],
              opacity: [opacities.lines * 0.5, opacities.lines, opacities.lines * 0.5]
            } : undefined}
            transition={shouldAnimate ? {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 25,
              ease: 'easeInOut',
            } : undefined}
          />
        </>
      )}
    </div>
  );
};

export default FlowingBackground;
