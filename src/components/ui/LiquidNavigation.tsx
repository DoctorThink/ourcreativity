
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
}

interface LiquidNavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const LiquidNavigation = ({
  items,
  activeItem,
  onItemClick,
  className,
  orientation = 'horizontal',
}: LiquidNavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const orientationStyles = {
    horizontal: 'flex-row space-x-2',
    vertical: 'flex-col space-y-2',
  };

  return (
    <nav className={cn(
      'relative flex p-3 rounded-2xl',
      'bg-gradient-to-r from-white/10 via-white/5 to-white/10',
      'backdrop-blur-xl border border-white/20',
      'shadow-lg',
      orientationStyles[orientation],
      className
    )}>
      {/* Dynamic Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amethyst/20 via-turquoise/20 to-coral/20 rounded-2xl"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(155,109,255,0.1), rgba(64,224,208,0.1), rgba(255,127,80,0.1))',
            'linear-gradient(45deg, rgba(64,224,208,0.1), rgba(255,127,80,0.1), rgba(155,109,255,0.1))',
            'linear-gradient(45deg, rgba(255,127,80,0.1), rgba(155,109,255,0.1), rgba(64,224,208,0.1))',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        const isHovered = hoveredItem === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => {
              item.onClick?.();
              onItemClick?.(item);
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative z-10 flex items-center gap-3 px-4 py-2 rounded-xl',
              'transition-all duration-300 font-medium text-white/80',
              'hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20',
              isActive && 'text-white bg-white/20',
            )}
          >
            {/* Active/Hover Background */}
            {(isActive || isHovered) && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {/* Liquid Ripple Effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-xl"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            )}

            {/* Icon */}
            <motion.div
              animate={isActive || isHovered ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>

            {/* Label */}
            <span className="relative z-10">{item.label}</span>

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full"
                layoutId="activeIndicator"
                initial={false}
                style={{ x: '-50%' }}
              />
            )}
          </motion.button>
        );
      })}

      {/* Glass Reflection */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </nav>
  );
};

export default LiquidNavigation;
