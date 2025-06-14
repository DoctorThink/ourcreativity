
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
  
  return (
    <div className={cn("relative min-h-screen flex flex-col", className)}>
      {/* True Sticky Header - Edge to Edge */}
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
          "backdrop-blur-2xl border-b border-white/5",
          scrollY > 20 
            ? "bg-background/95 shadow-2xl shadow-black/40 border-white/10" 
            : "bg-background/85 shadow-xl shadow-black/20",
          headerClassName
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        <div className={cn(
          "container mx-auto px-6 py-4 flex justify-between items-center transition-all duration-500",
          fullWidth ? "max-w-full" : "max-w-7xl",
          scrollY > 20 ? "py-3" : "py-4"
        )}>
          {/* Enhanced Logo with Hover Effects */}
          <Link to="/" className="flex items-center group relative z-10">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                alt="Logo" 
                className={cn(
                  "w-auto transition-all duration-300 filter drop-shadow-lg",
                  scrollY > 20 ? "h-8" : "h-10"
                )} 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amethyst/20 to-coral/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          </Link>
          
          {/* Modern Desktop Navigation with Enhanced Glass Effect */}
          <nav className="hidden lg:flex items-center bg-white/5 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  "hover:bg-white/10 hover:scale-105",
                  isActive(item.path)
                    ? "bg-white/15 text-white shadow-lg font-semibold" 
                    : "text-white/80 hover:text-white"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amethyst/30 via-coral/20 to-turquoise/30 rounded-full"
                    layoutId="activeNavTab"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className={cn(
              "lg:hidden relative z-10 rounded-2xl backdrop-blur-md border transition-all duration-300",
              "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30",
              "shadow-lg hover:shadow-xl",
              scrollY > 20 ? "p-2.5" : "p-3"
            )}
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
                  <X className="h-5 w-5 text-white drop-shadow-sm" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 text-white drop-shadow-sm" />
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
            {/* Enhanced Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Repositioned Menu Content */}
            <motion.div
              className={cn(
                "fixed inset-x-4 z-50 bg-secondary/95 backdrop-blur-2xl border border-border/30",
                "rounded-3xl shadow-2xl shadow-black/30 lg:hidden overflow-hidden",
                scrollY > 20 ? "top-20" : "top-24"
              )}
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <nav className="p-6">
                <motion.div 
                  className="space-y-3"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.15
                      }
                    }
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-5 py-4 rounded-2xl font-medium",
                          "transition-all duration-300 text-base group border",
                          isActive(item.path)
                            ? "bg-amethyst/20 text-white font-semibold border-amethyst/30 shadow-lg"
                            : "text-foreground/80 hover:text-foreground hover:bg-white/10 border-transparent hover:border-white/20"
                        )}
                      >
                        <motion.span
                          className="flex-1 text-left"
                          whileHover={{ x: 6 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                        {isActive(item.path) && (
                          <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-amethyst shadow-glow"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
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
      
      {/* Main Content with Proper Spacing */}
      <main className={cn("flex-grow pt-20 md:pt-24", contentClassName)}>
        {/* Page Title Section */}
        {title && (
          <div className={cn(
            "container mx-auto px-4 sm:px-6 mb-8 md:mb-10",
            scrollY > 50 ? "pt-4" : "pt-8"
          )}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-center md:text-left w-full">
                {showBackButton && (
                  <motion.button
                    onClick={handleBackClick}
                    className="mb-4 inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-all duration-300 font-medium hover:translate-x-1"
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span>Kembali</span>
                  </motion.button>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-2 md:mb-3 text-center md:text-left">{title}</h1>
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
      
      {/* Footer */}
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
                <span className="text-foreground/70 text-sm font-medium">© 2025 OUR CREATIVITY. Hak Cipta Dilindungi.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
