
import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import LiquidBackground from "@/components/ui/LiquidBackground";
import FloatingParticles from "@/components/ui/FloatingParticles";

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
      {/* Permanent Liquid Background */}
      <LiquidBackground />
      <FloatingParticles />
      
      {/* Enhanced Glass Morphism Header */}
      <motion.header 
        className={cn(
          "fixed top-3 left-3 right-3 z-50 transition-all duration-500",
          "glass-morphism-deep rounded-3xl",
          "shadow-[0_16px_48px_rgba(0,0,0,0.4)]",
          headerClassName
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          backdropFilter: scrollY > 20 ? 'blur(24px)' : 'blur(16px)',
          background: scrollY > 20 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.15) 100%)' 
            : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 100%)'
        }}
      >
        {/* Enhanced glass reflection */}
        <div className="absolute inset-0 rounded-3xl glass-reflection" />
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        
        <div className={cn("container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center relative z-10", fullWidth ? "max-w-full" : "max-w-7xl")}>
          {/* Enhanced Logo with Glow */}
          <Link to="/" className="flex items-center group">
            <motion.div className="relative">
              <motion.img 
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                alt="Logo" 
                className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-110 relative z-10" 
                whileHover={{ rotate: 5 }}
              />
              {/* Enhanced logo glow */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: 'radial-gradient(circle, var(--color-glow-primary) 0%, var(--color-glow-secondary) 50%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </Link>
          
          {/* Enhanced Desktop Navigation with Morphing Glass Pills */}
          <nav className="hidden lg:flex items-center glass-morphism-shallow rounded-full px-3 py-2 shadow-inner">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden",
                  isActive(item.path) && !item.external
                    ? "glass-morphism-accent text-white shadow-lg border border-white/30"
                    : item.name === 'Ayo Gabung'
                    ? "bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 border border-emerald-400/50 liquid-glow"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Morphing active background */}
                {isActive(item.path) && !item.external && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(45deg, var(--color-glow-primary), transparent, var(--color-glow-secondary))',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    layoutId="activeTab"
                  />
                )}
                
                {/* Enhanced Join Button Glow */}
                {item.name === 'Ayo Gabung' && (
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0"
                    style={{
                      background: 'radial-gradient(circle, var(--color-emerald-glow) 0%, transparent 70%)',
                    }}
                    whileHover={{ opacity: 0.6 }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                <span className="relative z-10">{item.name}</span>
              </motion.button>
            ))}
          </nav>
          
          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-3 rounded-2xl glass-morphism-shallow hover:glass-morphism transition-all duration-300 shadow-lg"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 rounded-2xl glass-reflection" />
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
      
      {/* Enhanced Mobile Menu */}
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
              className="fixed inset-x-4 top-24 z-40 glass-morphism-deep rounded-3xl shadow-2xl shadow-black/40 lg:hidden overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 glass-reflection rounded-3xl" />
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
                          "flex items-center px-4 py-4 rounded-2xl font-medium transition-all duration-300 text-base group w-full text-left relative overflow-hidden",
                          isActive(item.path) && !item.external
                            ? "glass-morphism-accent text-white font-semibold border border-white/30"
                            : item.name === 'Ayo Gabung'
                            ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30"
                            : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                        )}
                      >
                        {/* Active indicator glow */}
                        {isActive(item.path) && !item.external && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0"
                            style={{
                              background: 'radial-gradient(circle, var(--color-glow-primary) 0%, transparent 70%)',
                            }}
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                        
                        <motion.span
                          className="flex-1 relative z-10"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                        
                        {isActive(item.path) && !item.external && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white shadow-lg relative z-10"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              boxShadow: '0 0 8px var(--color-glow-primary)'
                            }}
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
      
      {/* Main Content */}
      <main className={cn("flex-grow pt-24 md:pt-28 relative z-10", contentClassName)}>
        {/* Page Title Section */}
        {title && (
          <div className="container mx-auto px-4 sm:px-6 mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-center md:text-left w-full">
                {showBackButton && (
                  <motion.button
                    onClick={handleBackClick}
                    className="mb-4 inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium glass-morphism-shallow px-3 py-2 rounded-xl"
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Kembali</span>
                  </motion.button>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-2 md:mb-3 text-center md:text-left text-glow">{title}</h1>
                {subtitle && <p className="text-foreground/80 text-lg md:text-xl font-sans text-center md:text-left text-readable">{subtitle}</p>}
              </div>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <div className={cn(
          "container mx-auto px-4 sm:px-6 relative z-10",
          fullWidth ? "max-w-full" : "max-w-7xl"
        )}>
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className={cn("mt-auto pt-12 pb-6 relative z-10", footerClassName)}>
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
                  className="h-7 w-auto opacity-80" 
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
