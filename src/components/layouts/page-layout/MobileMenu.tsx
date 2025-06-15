
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NavItem } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  mainNav: NavItem[];
  infoNav: NavItem[];
  ctaNav?: NavItem;
  isActive: (path: string) => boolean;
  handleNavClick: (item: NavItem) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  toggleMenu,
  mainNav,
  infoNav,
  ctaNav,
  isActive,
  handleNavClick,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMenu}
          />
          
          <motion.div
            className="fixed left-3 right-3 lg:left-auto lg:right-auto z-50"
            style={{
              top: 'calc(60px + 0.75rem)',
              maxHeight: '70vh',
            }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="bg-background/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-black/30 lg:hidden overflow-hidden"
              style={{
                maxHeight: '70vh',
                display: 'flex',
                flexDirection: 'column'
              }}>
              <div className="p-6 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <img 
                    src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                    alt="Logo" 
                    className="h-8 w-auto" 
                  />
                  <span className="text-lg font-semibold text-white">OUR CREATIVITY</span>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto p-6" style={{ minHeight: 0 }}>
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-4">Menu Utama</h3>
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
                          'flex items-center w-full px-4 py-4 rounded-2xl font-medium transition-all duration-300 text-base group',
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-amethyst/20 to-turquoise/10 text-white font-semibold border border-amethyst/30 shadow-lg'
                            : 'text-foreground/80 hover:text-foreground hover:bg-white/10 hover:shadow-md'
                        )}
                      >
                        <div className={cn(
                          'p-2.5 rounded-xl mr-4 transition-all duration-300',
                          isActive(item.path) 
                            ? 'bg-amethyst/30 text-white shadow-lg' 
                            : 'bg-white/10 text-foreground/70 group-hover:bg-white/20 group-hover:text-white'
                        )}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="flex-1 text-left">{item.name}</span>
                        {isActive(item.path) && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-amethyst"
                            layoutId="mobile-active-dot"
                          />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-4">Informasi</h3>
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
                          'flex items-center w-full px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 text-sm group',
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-amethyst/20 to-turquoise/10 text-white font-semibold border border-amethyst/30'
                            : 'text-foreground/70 hover:text-foreground hover:bg-white/10'
                        )}
                      >
                        <div className={cn(
                          'p-2 rounded-lg mr-3 transition-all duration-300',
                          isActive(item.path) 
                            ? 'bg-amethyst/30 text-white' 
                            : 'bg-white/10 text-foreground/60 group-hover:bg-white/20 group-hover:text-white'
                        )}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <div className="text-xs text-foreground/50 mt-0.5">{item.description}</div>
                          )}
                        </div>
                        {isActive(item.path) && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-amethyst"
                            layoutId="mobile-active-dot-info"
                          />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {ctaNav && (
                <div className="p-6 border-t border-white/10 flex-shrink-0">
                  <motion.button
                    onClick={() => {
                      handleNavClick(ctaNav);
                      toggleMenu();
                    }}
                    className="flex items-center justify-center w-full px-6 py-4 rounded-2xl font-semibold transition-all duration-300 text-base bg-gradient-to-r from-emerald-500 to-turquoise text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ctaNav.icon className="w-5 h-5 mr-3" />
                    <span>{ctaNav.name}</span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
