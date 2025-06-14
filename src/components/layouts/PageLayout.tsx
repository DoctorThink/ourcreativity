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
    { name: "Ayo Gabung", path: "#", external: true, url: "https://linktr.ee/ourcreativity" },
    { name: "Informasi", path: "/informasi" },
    { name: "Syarat & Ketentuan", path: "/terms" },
  ];
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  
  const handleNavClick = (item: any) => {
    if (item.external) {
      window.open(item.url, '_blank');
    } else {
      navigate(item.path);
    }
  };
  
  return (
    <div className={cn("relative min-h-screen flex flex-col", className)}>
      {/* Enhanced Glass Morphism Header */}
      <motion.header 
        className={cn(
          "fixed top-3 left-3 right-3 z-50 transition-all duration-500",
          "backdrop-blur-xl border border-white/15",
          "rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
          "bg-gradient-to-r from-white/12 via-white/8 to-white/12",
          headerClassName
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          background: scrollY > 20 
            ? "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 100%)" 
            : "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.10) 100%)"
        }}
      >
        {/* Glass reflection effect */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
        <div className={cn("container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center relative z-10", fullWidth ? "max-w-full" : "max-w-7xl")}>
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div className="relative">
              <motion.img 
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                alt="Logo" 
                className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-110 relative z-10" 
                whileHover={{ rotate: 5 }}
              />
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amethyst/30 to-coral/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          </Link>
          
          {/* Enhanced Desktop Navigation with Glass Pills */}
          <nav className="hidden lg:flex items-center bg-white/8 backdrop-blur-sm rounded-full px-3 py-2 border border-white/15 shadow-inner">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden",
                  isActive(item.path) && !item.external
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/25"
                    : item.name === 'Ayo Gabung'
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 border border-emerald-400/50"
                    : "text-white/70 hover:text-white hover:bg-white/15"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button glass effect */}
                {item.name === 'Ayo Gabung' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-full" />
                )}
                <span className="relative z-10">{item.name}</span>
                {isActive(item.path) && !item.external && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amethyst/30 to-coral/30 rounded-full -z-10"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
          
          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-3 rounded-2xl bg-white/12 backdrop-blur-sm border border-white/25 hover:bg-white/20 transition-all duration-300 shadow-lg"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button glass reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-60" />
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <X className="h-5 w-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Menu className="h-5 w-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>
      
      {/* Enhanced Mobile Menu with Glass Morphism */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              className="fixed inset-x-4 top-24 z-40 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-black/40 lg:hidden overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Glass reflection for mobile menu */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-80 rounded-3xl" />
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              
              <nav className="p-6 relative z-10">
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
                      <button
                        onClick={() => {
                          handleNavClick(item);
                          setIsMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center px-4 py-4 rounded-2xl font-medium transition-all duration-300 text-base group w-full text-left",
                          isActive(item.path) && !item.external
                            ? "bg-amethyst/20 text-white font-semibold border border-amethyst/30"
                            : item.name === 'Ayo Gabung'
                            ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30"
                            : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                        )}
                      >
                        <motion.span
                          className="flex-1"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                        {isActive(item.path) && !item.external && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-amethyst"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content with proper spacing for fixed header */}
      <main className={cn("flex-grow pt-24 md:pt-28", contentClassName)}>
        {/* Page Title Section */}
        {title && (
          <div className="container mx-auto px-4 sm:px-6 mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-center md:text-left w-full">
                {showBackButton && (
                  <button
                    onClick={handleBackClick}
                    className="mb-4 inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Kembali</span>
                  </button>
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
