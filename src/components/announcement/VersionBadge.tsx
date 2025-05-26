
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Badge floating animation
const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const VersionBadge: React.FC = () => (
  <motion.div 
    className="w-full flex justify-center mb-6"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut"
    }}
  >
    <motion.div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                 bg-gradient-to-r from-amethyst/30 via-amethyst/50 to-coral/30 
                 backdrop-blur-md border border-white/10"
      variants={floatAnimation}
      initial="initial"
      animate="animate"
    >
      <Sparkles className="w-4 h-4 text-amethyst" />
      <span className="text-sm font-medium">OurCreativity Web v4.0</span>
    </motion.div>
  </motion.div>
);
