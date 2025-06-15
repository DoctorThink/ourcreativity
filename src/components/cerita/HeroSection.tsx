
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 via-turquoise/5 to-coral/5 animate-gradient-cycle opacity-30" />
      
      {/* Main quote */}
      <motion.div
        className="text-center max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <blockquote className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-8">
          <span className="bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent animate-glow">
            "Tanpa keberanian seseorang tidak akan pernah berkarya."
          </span>
        </blockquote>
        <p className="text-lg sm:text-xl text-foreground/70 font-sans">
          - Pendiri OUR CREATIVITY
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-foreground/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-sans uppercase tracking-wider">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
