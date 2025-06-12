
import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonPath?: string;
  className?: string;
  footerClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  backButtonPath,
  className = "",
  contentClassName = "",
  headerClassName = "",
  footerClassName = "",
  fullWidth = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const handleBackClick = () => {
    if (backButtonPath) {
      navigate(backButtonPath);
    } else {
      navigate(-1);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Pengumuman", path: "/pengumuman" },
    { name: "Tim Kami", path: "/tim-kami" },
    { name: "Cerita Kami", path: "/cerita-kami" },
    { name: "Karya Kami", path: "/karya-kami" },
    { name: "Informasi", path: "/informasi" },
    { name: "Syarat & Ketentuan", path: "/terms" },
  ];
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  
  // Detect if we're on a dark background page
  const isDarkPage = location.pathname === "/";
  
  return (
    <div className={cn("relative min-h-screen flex flex-col", className)}>
      {/* Header */}
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 md:py-5 transition-all duration-300",
          scrollY > 20 ? "bg-background/95 backdrop-blur-md border-b border-border/30 shadow-sm" : "",
          headerClassName
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className={cn("container mx-auto px-4 sm:px-6 flex justify-between items-center", fullWidth ? "max-w-full" : "max-w-7xl")}>
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
              alt="Logo" 
              className="h-8 sm:h-9 w-auto" 
            />
            <img 
              src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png" 
              alt="Our Creativity" 
              className="h-7 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-sans transition-all duration-300",
                  isActive(item.path)
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-3 rounded-2xl bg-secondary/80 backdrop-blur-sm border border-border/30 hover:bg-secondary transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>
      
      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="fixed inset-x-4 top-24 z-40 bg-secondary/95 backdrop-blur-xl border border-border/30 rounded-3xl shadow-2xl shadow-black/20 lg:hidden overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <nav className="p-6">
                <motion.div 
                  className="space-y-2"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1
                      }
                    }
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-4 rounded-2xl font-sans transition-all duration-300 text-base group",
                          isActive(item.path)
                            ? "bg-amethyst/20 text-white font-medium border border-amethyst/30"
                            : "text-foreground/80 hover:text-foreground hover:bg-background/50"
                        )}
                      >
                        <motion.span
                          className="flex-1"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                        {isActive(item.path) && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-amethyst"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className={cn("flex-grow pt-24 md:pt-28", contentClassName)}>
        {/* Page Title Section with improved alignment and font composition */}
        {title && (
          <div className="container mx-auto px-4 sm:px-6 mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-center md:text-left w-full">
                {showBackButton && (
                  <button
                    onClick={handleBackClick}
                    className="mb-4 inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 font-sans"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Kembali</span>
                  </button>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans mb-2 md:mb-3 text-center md:text-left">{title}</h1>
                {subtitle && <p className="text-foreground/80 text-lg md:text-xl font-sans text-center md:text-left">{subtitle}</p>}
              </div>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <div className={cn(
          "container mx-auto px-4 sm:px-6",
          fullWidth ? "max-w-full" : "max-w-7xl"
        )}>
          {children}
        </div>
      </main>
      
      {/* Simplified Footer */}
      <footer className={cn("mt-auto pt-12 pb-6", footerClassName)}>
        <div className={cn(
          "container mx-auto px-4 sm:px-6",
          fullWidth ? "max-w-full" : "max-w-7xl"
        )}>
          <div className="border-t border-border/30 pt-8">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                  alt="Logo" 
                  className="h-7 w-auto" 
                />
                <span className="text-foreground/70 text-sm font-sans">© 2025 OUR CREATIVITY. Hak Cipta Dilindungi.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
