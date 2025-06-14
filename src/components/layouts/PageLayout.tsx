import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showBackButton = false, 
  title,
  className = "" 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Cerita Kami', path: '/cerita-kami' },
    { label: 'Tim Kami', path: '/tim-kami' },
    { label: 'Karya Kami', path: '/karya-kami' },
    { label: 'Pengumuman', path: '/pengumuman' },
    { label: 'Informasi', path: '/informasi' },
    { 
      label: 'Ayo Gabung', 
      path: 'https://linktr.ee/ourcreativity',
      external: true,
      icon: ExternalLink
    },
  ];

  const backgroundAnimationStyles = {
    floatingElement1: {
      top: '20',
      left: '10',
      width: '64',
      height: '64',
      fromColor: '#9B6DFF',
    },
    floatingElement2: {
      top: '40',
      right: '16',
      width: '48',
      height: '48',
      fromColor: '#40E0D0',
    },
    floatingElement3: {
      bottom: '32',
      left: '1/4',
      width: '56',
      height: '56',
      fromColor: '#FF7F50',
    },
    floatingElement4: {
      bottom: '20',
      right: '1/3',
      width: '72',
      height: '72',
      fromColor: '#FEC6A1',
    },
  };

  return (
    <div className={`min-h-screen bg-background text-foreground relative overflow-x-hidden ${className}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#9B6DFF]/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-16 w-48 h-48 bg-gradient-to-br from-[#40E0D0]/15 to-transparent rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-32 left-1/4 w-56 h-56 bg-gradient-to-br from-[#FF7F50]/10 to-transparent rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-gradient-to-br from-[#FEC6A1]/15 to-transparent rounded-full blur-3xl animate-float-slow-reverse" />
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-50 bg-secondary/80 backdrop-blur-lg border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Back button or Logo */}
            <div className="flex items-center gap-4">
              {showBackButton ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              ) : (
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                    alt="OC Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <h1 className="text-xl font-serif font-bold text-foreground">
                    {title || 'OUR CREATIVITY'}
                  </h1>
                </motion.div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                if (item.external) {
                  return (
                    <motion.a
                      key={item.label}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-[#9B6DFF]/20 text-[#9B6DFF] hover:bg-[#9B6DFF]/30 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                      {item.icon && <item.icon className="w-4 h-4" />}
                    </motion.a>
                  );
                }

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden bg-secondary/95 backdrop-blur-lg border-t border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  if (item.external) {
                    return (
                      <a
                        key={item.label}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 bg-[#9B6DFF]/20 text-[#9B6DFF] hover:bg-[#9B6DFF]/30"
                      >
                        {item.label}
                        {item.icon && <item.icon className="w-4 h-4" />}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`block w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-foreground/70 hover:text-foreground hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
