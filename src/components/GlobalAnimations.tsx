
import React from 'react';
import { motion } from 'framer-motion';

export const GlobalAnimations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Enhanced Background Gradient Orbs */}
      <motion.div 
        className="absolute w-[80vw] h-[80vh] rounded-full bg-gradient-radial from-amethyst/20 via-amethyst/5 to-transparent -top-[15%] -right-[15%] filter blur-[120px]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute w-[70vw] h-[70vh] rounded-full bg-gradient-radial from-turquoise/20 via-turquoise/5 to-transparent -bottom-[15%] -left-[15%] filter blur-[150px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute w-[60vw] h-[60vh] rounded-full bg-gradient-radial from-coral/15 via-coral/5 to-transparent -bottom-[5%] -right-[5%] filter blur-[130px] opacity-70"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      {/* Secondary subtle gradients with enhanced animations */}
      <motion.div 
        className="absolute w-[40vw] h-[40vh] rounded-full bg-gradient-radial from-softPink/10 via-softPink/3 to-transparent top-[10%] left-[15%] filter blur-[100px] opacity-50"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
      />
      <motion.div 
        className="absolute w-[35vw] h-[35vh] rounded-full bg-gradient-radial from-mint/15 via-mint/3 to-transparent bottom-[20%] right-[20%] filter blur-[90px] opacity-60"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Enhanced particle effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="stars-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Noise Overlay with improved opacity */}
      <div className="absolute inset-0 noise-pattern opacity-[0.04] z-10"></div>
      
      {/* Subtle grid overlay with animation */}
      <motion.div 
        className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default GlobalAnimations;
