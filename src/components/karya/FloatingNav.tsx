
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUp } from "lucide-react";

interface FloatingNavProps {
  toggleFilters: () => void;
  showFilters: boolean;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ toggleFilters, showFilters }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Track scroll position to change nav appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
      setShowBackToTop(scrollTop > 600);
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
          backgroundColor: scrolled ? "rgba(28, 28, 30, 0.8)" : "rgba(28, 28, 30, 0)",
          backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ 
          duration: 0.5,
          backgroundColor: { duration: 0.3 },
          backdropFilter: { duration: 0.3 }
        }}
        className={`fixed top-0 left-0 right-0 z-40 py-4 px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
      >
        <motion.div 
          className="flex items-center space-x-1"
          whileHover={{ scale: 1.03 }}
        >
          <img
            src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <motion.span 
            className={`font-serif text-lg font-medium transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            Karya
          </motion.span>
        </motion.div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full ${
              showFilters 
                ? "bg-amethyst text-background" 
                : "bg-foreground/10 hover:bg-foreground/20"
            } transition-colors duration-300`}
            onClick={toggleFilters}
            aria-label="Toggle filters"
          >
            <Filter size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors duration-300"
            aria-label="Search"
          >
            <Search size={20} />
          </motion.button>
        </div>
      </motion.nav>
      
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-amethyst/90 text-background shadow-lg z-40 shadow-amethyst/30"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
