
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

// Enhanced badge floating animation
const floatAnimation = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const sparkleAnimation = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const VersionBadge: React.FC = () => (
  <motion.div 
    className="w-full flex justify-center mb-8"
    initial={{ opacity: 0, y: -30, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.8,
      delay: 0.1,
      ease: "backOut",
      scale: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }}
  >
    <motion.div 
      className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full
                 bg-gradient-to-r from-amethyst/40 via-turquoise/30 to-coral/40 
                 backdrop-blur-md border border-white/20 shadow-xl shadow-amethyst/20
                 hover:shadow-2xl hover:shadow-amethyst/30 transition-all duration-300"
      variants={floatAnimation}
      initial="initial"
      animate="animate"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 25px 50px rgba(155, 109, 255, 0.3)",
        transition: { duration: 0.2 }
      }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amethyst/20 to-turquoise/20 blur-xl" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        <motion.div variants={sparkleAnimation} initial="initial" animate="animate">
          <Sparkles className="w-5 h-5 text-amethyst" />
        </motion.div>
        
        <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-amethyst">
          OurCreativity Web v4.0
        </span>
        
        <motion.div 
          variants={sparkleAnimation} 
          initial="initial" 
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <Zap className="w-4 h-4 text-turquoise" />
        </motion.div>
      </div>
      
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/30"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  </motion.div>
);
