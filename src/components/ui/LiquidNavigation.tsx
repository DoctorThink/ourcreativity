
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

interface LiquidNavigationProps {
  items: NavItem[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  glowColor?: string;
}

const LiquidNavigation: React.FC<LiquidNavigationProps> = ({
  items,
  className,
  orientation = 'horizontal',
  glowColor = 'rgba(155, 109, 255, 0.4)'
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerClasses = cn(
    "relative flex glass-morphism rounded-2xl p-2 border border-white/20",
    orientation === 'horizontal' ? "flex-row gap-2" : "flex-col gap-2",
    className
  );

  const glowStyle = { '--color-glow-primary': glowColor } as React.CSSProperties;

  return (
    <motion.nav
      className={containerClasses}
      style={glowStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 70%)`,
        }}
        animate={{
          opacity: hoveredIndex !== null ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {items.map((item, index) => (
        <motion.div
          key={item.href}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.a
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className={cn(
              "relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300",
              "text-white/80 hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-white/30",
              activeIndex === index && "bg-white/20 text-white"
            )}
            onClick={() => setActiveIndex(index)}
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            {/* Liquid background effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-white/10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              {item.label}
              
              {/* Badge */}
              {item.badge && (
                <motion.span
                  className="px-2 py-1 text-xs bg-white/20 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  {item.badge}
                </motion.span>
              )}
              
              {/* External link icon */}
              {item.external && (
                <motion.div
                  className="ml-1"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.div>
              )}
            </span>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-white/20 opacity-0"
              whileTap={{
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.2, 1],
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>

          {/* Active indicator */}
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full"
                style={{ x: '-50%' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Floating highlight */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            className="absolute rounded-xl bg-gradient-to-r from-white/10 to-white/5 pointer-events-none"
            style={{
              left: orientation === 'horizontal' 
                ? `${hoveredIndex * (100 / items.length)}%`
                : 0,
              top: orientation === 'vertical'
                ? `${hoveredIndex * (100 / items.length)}%`
                : 0,
              width: orientation === 'horizontal' 
                ? `${100 / items.length}%`
                : '100%',
              height: orientation === 'vertical'
                ? `${100 / items.length}%`
                : '100%',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default LiquidNavigation;
