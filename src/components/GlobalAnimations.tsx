
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const GlobalAnimations: React.FC = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [colorScheme, setColorScheme] = useState({
    primary: "amethyst",
    secondary: "turquoise",
    accent: "coral"
  });
  
  // Change color scheme based on route
  useEffect(() => {
    switch (location.pathname) {
      case '/brand-story':
        setColorScheme({ 
          primary: "amethyst", 
          secondary: "coral", 
          accent: "mint" 
        });
        break;
      case '/tim-kami':
        setColorScheme({ 
          primary: "turquoise", 
          secondary: "coral", 
          accent: "amethyst" 
        });
        break;
      case '/informasi':
        setColorScheme({ 
          primary: "coral", 
          secondary: "amethyst", 
          accent: "softPink" 
        });
        break;
      case '/pengumuman':
        setColorScheme({ 
          primary: "mint", 
          secondary: "softPink", 
          accent: "turquoise" 
        });
        break;
      case '/terms':
        setColorScheme({ 
          primary: "softPink", 
          secondary: "mint", 
          accent: "amethyst" 
        });
        break;
      case '/karya-kami':
        setColorScheme({ 
          primary: "lavender", 
          secondary: "coral", 
          accent: "mint" 
        });
        break;
      default:
        setColorScheme({ 
          primary: "amethyst", 
          secondary: "turquoise", 
          accent: "coral" 
        });
    }
  }, [location.pathname]);
  
  // Generate CSS variables for the selected color scheme
  const getCssVariable = (color: string) => {
    switch (color) {
      case "amethyst": return "rgba(155, 109, 255, 0.15)";
      case "turquoise": return "rgba(64, 224, 208, 0.15)";
      case "coral": return "rgba(255, 127, 80, 0.12)";
      case "mint": return "rgba(152, 245, 225, 0.12)";
      case "softPink": return "rgba(255, 209, 220, 0.12)";
      case "lavender": return "rgba(229, 222, 255, 0.15)";
      default: return "rgba(155, 109, 255, 0.15)";
    }
  };

  // Generate radial gradients based on the colors
  const getPrimaryGradient = () => `radial-gradient(circle at center, ${getCssVariable(colorScheme.primary)} 0%, transparent 70%)`;
  const getSecondaryGradient = () => `radial-gradient(circle at center, ${getCssVariable(colorScheme.secondary)} 0%, transparent 70%)`;
  const getAccentGradient = () => `radial-gradient(circle at center, ${getCssVariable(colorScheme.accent)} 0%, transparent 70%)`;

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div 
          className="absolute w-[80vw] h-[80vh] rounded-full -top-[15%] -right-[15%] opacity-80 filter blur-[120px]"
          style={{ background: getPrimaryGradient() }}
        />
        <div 
          className="absolute w-[70vw] h-[70vh] rounded-full -bottom-[15%] -left-[15%] opacity-60 filter blur-[150px]"
          style={{ background: getSecondaryGradient() }}
        />
        <div 
          className="absolute w-[60vw] h-[60vh] rounded-full -bottom-[5%] -right-[5%] opacity-50 filter blur-[130px]"
          style={{ background: getAccentGradient() }}
        />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-pattern opacity-[0.03] z-10" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 will-change-transform gpu-accelerated">
      {/* Primary Gradient Orb - Optimized animation with will-change */}
      <motion.div 
        className="absolute w-[80vw] h-[80vh] rounded-full -top-[15%] -right-[15%] filter blur-[120px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 0.8, 
          scale: 1,
          y: prefersReducedMotion ? undefined : [0, -20, 0],
          scale: prefersReducedMotion ? 1 : [1, 1.05, 1]
        }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 20,
          ease: "easeInOut"
        }}
        style={{ 
          background: getPrimaryGradient(),
          willChange: "transform, opacity"
        }}
      />
      
      {/* Secondary Gradient Orb */}
      <motion.div 
        className="absolute w-[70vw] h-[70vh] rounded-full -bottom-[15%] -left-[15%] filter blur-[150px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 0.6, 
          scale: 1,
          y: prefersReducedMotion ? undefined : [0, 20, 0],
          scale: prefersReducedMotion ? 1 : [1, 1.03, 1]
        }}
        transition={{ 
          duration: 1, 
          delay: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 25,
          ease: "easeInOut"
        }}
        style={{ 
          background: getSecondaryGradient(),
          willChange: "transform, opacity"
        }}
      />
      
      {/* Accent Gradient Orb */}
      <motion.div 
        className="absolute w-[60vw] h-[60vh] rounded-full -bottom-[5%] -right-[5%] filter blur-[130px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 0.5, 
          scale: 1,
          y: prefersReducedMotion ? undefined : [0, 15, 0],
          x: prefersReducedMotion ? undefined : [0, -15, 0],
          scale: prefersReducedMotion ? 1 : [1, 1.02, 1]
        }}
        transition={{ 
          duration: 1, 
          delay: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 30,
          ease: "easeInOut"
        }}
        style={{ 
          background: getAccentGradient(),
          willChange: "transform, opacity"
        }}
      />
      
      {/* Additional subtle gradient with reduced intensity */}
      <motion.div 
        className="absolute w-[40vw] h-[40vh] rounded-full top-[10%] left-[15%] filter blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.3,
          x: prefersReducedMotion ? undefined : [0, 20, 0],
          y: prefersReducedMotion ? undefined : [0, -10, 0]
        }}
        transition={{ 
          duration: 1, 
          delay: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 35,
          ease: "easeInOut"
        }}
        style={{ background: `radial-gradient(circle at center, rgba(255, 209, 220, 0.08) 0%, transparent 70%)` }}
      />
      
      {/* Subtle line accents */}
      <motion.div 
        className="absolute h-[1px] w-[40vw]"
        style={{ 
          background: `linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent)`,
          top: '30%', 
          left: '10%',
          opacity: 0.15,
          willChange: "transform, opacity"
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, 20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 15,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute w-[1px] h-[40vh]"
        style={{ 
          background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15), transparent)`,
          top: '20%', 
          right: '30%',
          opacity: 0.15,
          willChange: "transform, opacity"
        }}
        animate={prefersReducedMotion ? {} : {
          y: [0, 20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 20,
          ease: "easeInOut"
        }}
      />
      
      {/* Grid overlay with reduced opacity */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 noise-pattern opacity-[0.03] mix-blend-overlay"
      />
      
      {/* Dynamic particles - reduced to improve performance */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-foreground/5"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.4 + 0.2
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight + (Math.random() > 0.5 ? -80 : 80),
                Math.random() * window.innerHeight
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth + (Math.random() > 0.5 ? -80 : 80),
                Math.random() * window.innerWidth
              ],
              opacity: [Math.random() * 0.4 + 0.2, Math.random() * 0.6 + 0.3, Math.random() * 0.4 + 0.2]
            }}
            transition={{
              duration: 25 + Math.random() * 35,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default GlobalAnimations;
