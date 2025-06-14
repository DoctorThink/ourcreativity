
import React from 'react';
import { motion } from 'framer-motion';

const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-secondary/50" />
      
      {/* Animated liquid blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(155, 109, 255, 0.3) 0%, rgba(64, 224, 208, 0.2) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 127, 80, 0.3) 0%, rgba(152, 245, 225, 0.2) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255, 209, 220, 0.4) 0%, rgba(254, 198, 161, 0.3) 50%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{
          x: [0, 70, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
      />
      
      {/* Floating glass particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-40"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            filter: 'blur(1px)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default LiquidBackground;
