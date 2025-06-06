
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
              className="h-6 sm:h-7 w-auto hidden sm:block" 
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
          <button
            className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </motion.header>
      
      {/* Mobile Menu - Improved with solid background */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-20 bg-background border-b border-border/30 lg:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl font-sans transition-all duration-300 text-base",
                    isActive(item.path)
                      ? "bg-amethyst/20 text-white font-medium"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className={cn("flex-grow pt-24 md:pt-28", contentClassName)}>
        {/* Page Title Section */}
        {title && (
          <div className="container mx-auto px-4 sm:px-6 mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                {showBackButton && (
                  <button
                    onClick={handleBackClick}
                    className="mb-4 inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 font-sans"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Kembali</span>
                  </button>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-2 md:mb-3">{title}</h1>
                {subtitle && <p className="text-foreground/80 text-lg md:text-xl font-sans">{subtitle}</p>}
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
      
      {/* Footer - Improved for mobile */}
      <footer className={cn("mt-auto pt-12 pb-6", footerClassName)}>
        <div className={cn(
          "container mx-auto px-4 sm:px-6",
          fullWidth ? "max-w-full" : "max-w-7xl"
        )}>
          <div className="border-t border-border/30 pt-6 md:pt-8">
            {/* Mobile Footer */}
            <div className="flex flex-col items-center md:hidden space-y-6">
              {/* Logo and Copyright */}
              <div className="flex flex-col items-center space-y-4">
                <img 
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                  alt="Logo" 
                  className="h-10 w-auto" 
                />
                <p className="text-foreground/70 text-sm font-sans text-center">
                  © 2025 OUR CREATIVITY. Hak Cipta Dilindungi.
                </p>
              </div>
              
              {/* Navigation */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {navItems.slice(0, 6).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-sm text-center py-2 px-3 bg-secondary/50 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors duration-300 font-sans"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Footer */}
            <div className="hidden md:flex md:flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                  alt="Logo" 
                  className="h-7 w-auto" 
                />
                <span className="text-foreground/70 text-sm font-sans">© 2025 OUR CREATIVITY. Hak Cipta Dilindungi.</span>
              </div>
              <div className="flex gap-4">
                {navItems.slice(0, 4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-sm text-foreground/60 hover:text-foreground/90 transition-colors duration-300 font-sans"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
