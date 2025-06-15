
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { NavItem } from './types';
import { DesktopNav } from './DesktopNav';

interface AppHeaderProps {
  className?: string;
  fullWidth?: boolean;
  scrollY: number;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  mainNav: NavItem[];
  infoNav: NavItem[];
  ctaNav?: NavItem;
  isActive: (path: string) => boolean;
  handleNavClick: (item: NavItem) => void;
  handleBackClick: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  className,
  fullWidth,
  scrollY,
  isMenuOpen,
  toggleMenu,
  mainNav,
  infoNav,
  ctaNav,
  isActive,
  handleNavClick,
  handleBackClick
}) => {
  const location = useLocation();

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        'bg-background/80 backdrop-blur-xl border border-white/10',
        'rounded-none sm:rounded-[20px] shadow-2xl shadow-black/20',
        'hover:shadow-2xl hover:shadow-black/30',
        className
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        background: scrollY > 20 
          ? 'rgba(28, 28, 30, 0.95)' 
          : 'rgba(28, 28, 30, 0.85)'
      }}
    >
      <div className={cn('container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center', fullWidth ? 'max-w-full' : 'max-w-7xl')}>
        <div className="flex items-center gap-3">
          {location.pathname !== '/' && (
            <motion.button
              onClick={handleBackClick}
              className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 lg:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Kembali"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </motion.button>
          )}
          
          <Link to="/" className="flex items-center group">
            <motion.img 
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
              alt="Logo" 
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-110" 
              whileHover={{ rotate: 5 }}
            />
          </Link>
        </div>
        
        <DesktopNav 
          mainNav={mainNav}
          infoNav={infoNav}
          ctaNav={ctaNav}
          isActive={isActive}
          handleNavClick={handleNavClick}
        />
        
        <motion.button
          className="lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
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
  );
};
