
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  external?: boolean;
}

interface LiquidNavigationProps {
  items: NavigationItem[];
  onItemClick: (item: NavigationItem) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const LiquidNavigation: React.FC<LiquidNavigationProps> = ({
  items,
  onItemClick,
  className,
  orientation = 'horizontal'
}) => {
  const containerClasses = cn(
    "relative glass-morphism rounded-full p-2",
    {
      'flex items-center space-x-1': orientation === 'horizontal',
      'flex flex-col space-y-1': orientation === 'vertical',
    },
    className
  );

  return (
    <nav className={containerClasses}>
      {/* Floating background for active item */}
      <motion.div
        className="absolute bg-white/20 rounded-full"
        layoutId="activeBackground"
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      />
      
      {items.map((item, index) => (
        <motion.button
          key={item.href}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            "hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50",
            {
              'text-white font-semibold': item.isActive,
              'text-white/70 hover:text-white': !item.isActive,
            }
          )}
          onClick={() => onItemClick(item)}
          whileHover={{ 
            scale: 1.05,
            y: orientation === 'horizontal' ? -2 : 0,
            x: orientation === 'vertical' ? 2 : 0,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          {/* Active background */}
          {item.isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full"
              layoutId="activePill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            style={{
              boxShadow: "0 0 20px var(--color-glow-primary)"
            }}
            whileHover={{ opacity: 0.5 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Liquid ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-full opacity-0"
            whileTap={{ 
              opacity: [0, 0.5, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Text content */}
          <span className="relative z-10 flex items-center gap-2">
            {item.label}
            {item.external && (
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="w-3 h-3 opacity-70" />
              </motion.div>
            )}
          </span>
          
          {/* Morphing border */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            whileHover={{ 
              borderColor: "rgba(255, 255, 255, 0.4)",
              scale: 1.02
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      ))}
      
      {/* Floating particles effect */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            top: `${20 + i * 20}%`,
            left: `${10 + i * 30}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </nav>
  );
};

export default LiquidNavigation;
