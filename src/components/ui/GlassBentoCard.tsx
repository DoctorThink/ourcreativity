
import React, { ReactNode, useRef, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useElementInView } from '@/hooks/useElementInView';

interface GlassBentoCardProps {
  children: ReactNode;
  title?: string;
  icon?: LucideIcon;
  iconColor?: string;
  interactive?: boolean;
  hoverScale?: number;
  colSpan?: string;
  rowSpan?: string;
  accentColor?: string;
  hasShimmer?: boolean;
  className?: string;
  shineDuration?: number;
  disabled?: boolean;
  motionProps?: MotionProps;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const GlassBentoCard: React.FC<GlassBentoCardProps> = ({
  children,
  title,
  icon: Icon,
  iconColor = 'bg-amethyst/90',
  interactive = true,
  hoverScale = 1.02,
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  accentColor = 'rgba(155, 109, 255, 0.2)', // Glowar: Default to amethyst glow
  hasShimmer = true,
  className = "",
  shineDuration = 5,
  disabled = false,
  motionProps,
  style,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const { elementRef, isInView } = useElementInView({ threshold: 0.2, triggerOnce: true });

  // Mouse move effect for glass card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setPosition({ x, y });
  };
  
  // Handle click for interactive cards
  const handleClick = () => {
    if (!disabled && interactive && onClick) {
      onClick();
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const shineVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: { 
      opacity: hasShimmer ? [0, 1, 0] : 0, 
      x: ['100%', '100%', '300%'],
      transition: {
        duration: shineDuration,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 8
      }
    }
  };

  // Create merged styles object
  const cardStyles: React.CSSProperties = {
    filter: `drop-shadow(0 10px 20px rgba(0, 0, 0, 0.05))`,
    transform: disabled ? 'none' : undefined,
    ...style
  };

  // Properly separate motion props from event handlers
  const interactiveMotionProps: MotionProps = !disabled && interactive ? {
    whileHover: { 
      scale: hoverScale,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    },
    whileTap: { scale: 0.98 },
  } : {};
  
  // Create HTML event handlers separately from motion props
  const interactiveEventHandlers = !disabled && interactive ? {
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};
  
  // Combine motion props
  const combinedMotionProps: MotionProps = {
    ...interactiveMotionProps,
    ...motionProps,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    variants: cardVariants,
  };

  // Function to handle ref assignment
  const assignRef = (node: HTMLDivElement | null) => {
    // Handle the elementRef if it exists
    if (node !== null) {
      // Only call elementRef if it's a function
      if (typeof elementRef === 'function') {
        elementRef(node);
      }
      
      // Always update our local cardRef
      cardRef.current = node;
    }
  };

  return (
    <motion.div
      ref={assignRef}
      className={cn(
        colSpan,
        rowSpan,
        "rounded-3xl relative overflow-hidden",
        "backdrop-blur-md bg-white/5 border border-white/10",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      style={cardStyles}
      onClick={handleClick}
      {...combinedMotionProps}
      {...interactiveEventHandlers}
    >
      {/* Moving gradient background effect */}
      <div
        className="absolute inset-0"
        style={{
          '--gradient-position': `${position.x * 100}% ${position.y * 100}%`,
          background: `radial-gradient(circle at var(--gradient-position), ${accentColor} 0%, transparent 70%)`,
          opacity: hovered ? 0.4 : 0.2,
          transition: 'opacity 0.3s ease'
        } as React.CSSProperties}
      />

      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
        style={{ width: '30%' }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={shineVariants}
      />

      {/* Border glow */}
      {!disabled && hovered && (
        <div className={`absolute inset-0 rounded-3xl border border-white/30 pointer-events-none`} />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 h-full">
        {Icon && (
          <div className="absolute top-4 left-4">
            <div className={cn("p-3 rounded-full", iconColor)}>
              <Icon className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        
        {title && (
          <div className="px-6 pt-16 pb-2">
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
        )}
        
        {children}
      </div>
    </motion.div>
  );
};

export default GlassBentoCard;
