import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X, Home, Megaphone, Users, Palette, BookOpen, Info, FileText, UserPlus, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backButtonPath?: string;
  className?: string;
  footerClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  fullWidth?: boolean;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
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
    document.body.style.overflow = isMenuOpen ? "" : "hidden";
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  
  const navItems = [
    { name: "Home", path: "/", icon: Home, type: "main" },
    { name: "Pengumuman", path: "/pengumuman", icon: Megaphone, type: "main" },
    { name: "Tim Kami", path: "/tim-kami", icon: Users, type: "main" },
    { name: "Karya Kami", path: "/karya-kami", icon: Palette, type: "main" },
    { name: "Cerita Kami", path: "/cerita-kami", icon: BookOpen, type: "info", description: "Perjalanan, visi, dan misi komunitas." },
    { name: "Informasi", path: "/informasi", icon: Info, type: "info", description: "Detail lengkap tentang komunitas kami." },
    { name: "Syarat & Ketentuan", path: "/terms", icon: FileText, type: "info", description: "Panduan dan aturan main di komunitas." },
    { name: "Ayo Gabung", path: "#", external: true, url: "https://linktr.ee/ourcreativity", icon: UserPlus, type: "cta" },
  ];

  const mainNav = navItems.filter(item => item.type === 'main');
  const infoNav = navItems.filter(item => item.type === 'info');
  const ctaNav = navItems.find(item => item.type === 'cta');
  
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
      {/* Modern Sticky Header with Enhanced Glassmorphism */}
      <motion.header 
        className={cn(
          "fixed top-3 left-3 right-3 z-50 transition-all duration-500",
          "bg-background/80 backdrop-blur-xl border border-white/10",
          "rounded-[20px] shadow-2xl shadow-black/20",
          "hover:shadow-2xl hover:shadow-black/30",
          headerClassName
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          background: scrollY > 20 
            ? "rgba(28, 28, 30, 0.9)" 
            : "rgba(28, 28, 30, 0.8)"
        }}
      >
        <div className={cn("container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center", fullWidth ? "max-w-full" : "max-w-7xl")}>
          {/* Logo Only */}
          <Link to="/" className="flex items-center group">
            <motion.img 
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
              alt="Logo" 
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-110" 
              whileHover={{ rotate: 5 }}
            />
          </Link>
          
          {/* Modern Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNav.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "bg-transparent", isActive(item.path) ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10")}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                    Tentang
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {infoNav.map((item) => (
                        <ListItem
                          key={item.name}
                          href={item.path}
                          title={item.name}
                          onClick={() => navigate(item.path)}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {ctaNav && (
                   <NavigationMenuItem>
                      <button
                        onClick={() => handleNavClick(ctaNav)}
                        className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 relative bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 ml-2"
                      >
                        {ctaNav.name}
                      </button>
                    </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          {/* Modern Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
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
                  <X className="h-5 w-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
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
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            />
            
            {/* Menu Content */}
            <motion.div
              className="fixed inset-x-4 top-20 bottom-4 z-40 bg-secondary/95 backdrop-blur-xl border border-border/30 rounded-3xl shadow-2xl shadow-black/20 lg:hidden overflow-y-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <nav className="p-6 flex flex-col h-full">
                <motion.div 
                  className="space-y-1 flex-grow"
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
                  {mainNav.map((item) => (
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
                          toggleMenu();
                        }}
                        className={cn(
                          "flex items-center px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 text-base group w-full text-left",
                          isActive(item.path)
                            ? "bg-amethyst/20 text-white font-semibold border border-amethyst/30"
                            : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                        )}
                      >
                        <item.icon className="w-5 h-5 mr-4 text-foreground/70"/>
                        <span className="flex-1">{item.name}</span>
                        {isActive(item.path) && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-amethyst"
                            layoutId="mobile-active-dot"
                          />
                        )}
                      </button>
                    </motion.div>
                  ))}

                  <div className="py-3">
                    <div className="h-px bg-white/10"></div>
                  </div>

                  {infoNav.map((item) => (
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
                          toggleMenu();
                        }}
                        className={cn(
                          "flex items-center px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 text-base group w-full text-left",
                          isActive(item.path)
                            ? "bg-amethyst/20 text-white font-semibold border border-amethyst/30"
                            : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                        )}
                      >
                        <item.icon className="w-5 h-5 mr-4 text-foreground/70"/>
                        <span className="flex-1">{item.name}</span>
                         {isActive(item.path) && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-amethyst"
                            layoutId="mobile-active-dot"
                          />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
                {ctaNav && (
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={() => {
                        handleNavClick(ctaNav);
                        toggleMenu();
                      }}
                      className="flex items-center justify-center w-full px-4 py-4 rounded-2xl font-semibold transition-all duration-300 text-base group bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                    >
                      <ctaNav.icon className="w-5 h-5 mr-3" />
                      <span>{ctaNav.name}</span>
                    </button>
                  </motion.div>
                )}
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
                {location.pathname !== '/' && (
                  <motion.button
                    onClick={handleBackClick}
                    className="mb-4 inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium group"
                    whileHover={{ x: -2 }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
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
