
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MorphingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const MorphingModal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className,
}: MorphingModalProps) => {
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
        />
      </DialogOverlay>
      
      <DialogContent asChild>
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.8, 
            rotateX: -15,
            y: 50 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            y: 0 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            rotateX: 15,
            y: -50 
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25 
          }}
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full mx-4 p-0 border-0 bg-transparent z-50',
            sizeStyles[size]
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glass Container */}
          <div className={cn(
            'relative overflow-hidden rounded-3xl',
            'bg-gradient-to-br from-white/10 via-white/5 to-transparent',
            'backdrop-blur-xl border border-white/20',
            'shadow-[0_20px_60px_rgba(0,0,0,0.4)]',
            className
          )}>
            {/* Dynamic Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amethyst/20 via-turquoise/20 to-coral/20 opacity-30"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(155,109,255,0.2), rgba(64,224,208,0.2), rgba(255,127,80,0.2))',
                  'linear-gradient(135deg, rgba(64,224,208,0.2), rgba(255,127,80,0.2), rgba(155,109,255,0.2))',
                  'linear-gradient(135deg, rgba(255,127,80,0.2), rgba(155,109,255,0.2), rgba(64,224,208,0.2))',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Header */}
            {title && (
              <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-serif font-bold text-white">{title}</h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 p-6">
              {children}
            </div>

            {/* Glass Highlights */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-60" />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default MorphingModal;
