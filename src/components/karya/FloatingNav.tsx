
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
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setScrolled(scrollTop > 80);
          setShowBackToTop(scrollTop > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = document.querySelector('header.fixed') as HTMLElement;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
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
        initial={{ y: -60, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
        style={{
          top: scrolled ? `${headerHeight}px` : '0px',
        }}
        className={`fixed left-0 right-0 z-40 py-4 px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled 
            ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-border/30" 
            : "bg-transparent"
        } ${scrolled ? "" : "top-0"}`} // Conditionally add top-0 when not scrolled
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
        </motion.div>
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
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
