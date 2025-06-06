
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface FloatingNavProps {
  toggleFilters: () => void;
  showFilters: boolean;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ toggleFilters, showFilters }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Optimized scroll handler with throttling for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setScrolled(scrollTop > 100);
          setShowBackToTop(scrollTop > 600);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
        className={`fixed top-0 left-0 right-0 z-40 py-4 px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled 
            ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-border/30" 
            : "bg-transparent"
        }`}
        style={{
          willChange: 'transform, opacity, background-color',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <motion.span 
            className="font-serif text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amethyst via-white to-turquoise"
            animate={{
              opacity: scrolled ? 1 : 0,
              x: scrolled ? 0 : -10
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Karya Kami
          </motion.span>
        </motion.div>
        
        {/* Removed filter button - no longer needed */}
      </motion.nav>
      
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-amethyst/90 text-background shadow-lg z-40 shadow-amethyst/30 backdrop-blur-sm"
            aria-label="Back to top"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
