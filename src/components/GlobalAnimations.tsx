
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const GlobalAnimations: React.FC = () => {
  const location = useLocation();
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
      case "amethyst": return "rgba(155, 109, 255, 0.2)";
      case "turquoise": return "rgba(64, 224, 208, 0.2)";
      case "coral": return "rgba(255, 127, 80, 0.15)";
      case "mint": return "rgba(152, 245, 225, 0.15)";
      case "softPink": return "rgba(255, 209, 220, 0.15)";
      case "lavender": return "rgba(229, 222, 255, 0.2)";
      default: return "rgba(155, 109, 255, 0.2)";
    }
  };

  // Generate radial gradients based on the colors
  const getPrimaryGradient = () => `radial-gradient(circle at center, ${getCssVariable(colorScheme.primary)} 0%, transparent 70%)`;
  const getSecondaryGradient = () => `radial-gradient(circle at center, ${getCssVariable(colorScheme.secondary)} 0%, transparent 70%)`;
  const getAccentGradient = () => `radial-gradient(circle at center, ${getCssVariable(colorScheme.accent)} 0%, transparent 70%)`;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Primary Gradient Orb */}
      <motion.div 
        className="absolute w-[80vw] h-[80vh] rounded-full -top-[15%] -right-[15%] filter blur-[120px] animate-float"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ background: getPrimaryGradient() }}
      />
      
      {/* Secondary Gradient Orb */}
      <motion.div 
        className="absolute w-[70vw] h-[70vh] rounded-full -bottom-[15%] -left-[15%] filter blur-[150px] animate-float-slow"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ background: getSecondaryGradient() }}
      />
      
      {/* Accent Gradient Orb */}
      <motion.div 
        className="absolute w-[60vw] h-[60vh] rounded-full -bottom-[5%] -right-[5%] filter blur-[130px] opacity-70 animate-float-reverse"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ background: getAccentGradient() }}
      />
      
      {/* Additional subtle gradient */}
      <motion.div 
        className="absolute w-[40vw] h-[40vh] rounded-full top-[10%] left-[15%] filter blur-[100px] opacity-50 animate-float-slow-reverse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ background: `radial-gradient(circle at center, rgba(255, 209, 220, 0.1) 0%, transparent 70%)` }}
      />
      
      {/* Another subtle gradient */}
      <motion.div 
        className="absolute w-[35vw] h-[35vh] rounded-full bottom-[20%] right-[20%] filter blur-[90px] opacity-60 animate-pulse-slow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ background: `radial-gradient(circle at center, rgba(152, 245, 225, 0.1) 0%, transparent 70%)` }}
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-pattern opacity-[0.04] z-10" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.025] z-0" />
      
      {/* Dynamic particles - subtle dots for additional movement */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-foreground/5"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight + (Math.random() > 0.5 ? -100 : 100),
                Math.random() * window.innerHeight
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth + (Math.random() > 0.5 ? -100 : 100),
                Math.random() * window.innerWidth
              ],
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.7 + 0.3, Math.random() * 0.5 + 0.2]
            }}
            transition={{
              duration: 20 + Math.random() * 30,
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
