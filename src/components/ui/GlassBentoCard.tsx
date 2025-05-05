
import React, { ReactNode } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { AnimateInView } from '@/hooks/useElementInView';

interface GlassBentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBackground?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  glassEffect?: boolean;
  glowColor?: string;
  interactive?: boolean;
  hoverScale?: number;
  motionProps?: Omit<MotionProps, 'children' | 'className'>; // Fixed type
  animateWhenInView?: boolean;
  animationDelay?: number;
  animationVariants?: Variants;
  backgroundGradient?: string;
  accentBorder?: boolean;
  featured?: boolean;
}

const GlassBentoCard = ({
  children,
  className,
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  icon: Icon,
  iconColor = "text-foreground",
  iconBackground = "bg-foreground/10", 
  iconSize = 'md',
  glassEffect = true,
  glowColor,
  interactive = true,
  hoverScale = 1.03,
  motionProps,
  animateWhenInView = false,
  animationDelay = 0,
  animationVariants,
  backgroundGradient,
  accentBorder = false,
  featured = false,
  ...props
}: GlassBentoCardProps) => {
  // Configure animations
  const hoverAnimation = interactive ? {
    scale: hoverScale,
    boxShadow: glowColor ? `0 0 25px ${glowColor}` : "0 10px 25px rgba(0, 0, 0, 0.2)"
  } : {};
  
  const tapAnimation = interactive ? { scale: 0.98 } : {};

  // Determine icon size based on the iconSize prop
  const iconSizeClass = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }[iconSize];

  // Determine icon container size based on iconSize
  const iconContainerClass = {
    sm: "p-1.5 rounded-lg",
    md: "p-2 rounded-xl",
    lg: "p-2.5 rounded-2xl"
  }[iconSize];
  
  // Configure base styles
  const baseStyles = cn(
    colSpan,
    rowSpan,
    "rounded-3xl overflow-hidden relative border transition-all duration-300",
    accentBorder ? "border-white/20" : "border-white/10",
    featured ? "shadow-lg" : "shadow-md",
    glassEffect ? "backdrop-blur-lg" : "",
    backgroundGradient || (glassEffect ? "bg-secondary/80" : "bg-secondary"),
    interactive ? "cursor-pointer" : "",
    className
  );

  // Wrap component with AnimateInView if animateWhenInView is true
  if (animateWhenInView) {
    return (
      <AnimateInView 
        className={baseStyles}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: 0.6,
              delay: animationDelay
            } 
          },
          ...(animationVariants || {})
        }}
        {...props}
      >
        <CardContent 
          Icon={Icon}
          iconColor={iconColor}
          iconBackground={iconBackground}
          iconContainerClass={iconContainerClass}
          iconSizeClass={iconSizeClass}
          glowColor={glowColor}
          interactive={interactive}
          hoverAnimation={hoverAnimation}
          tapAnimation={tapAnimation}
          motionProps={motionProps}
        >
          {children}
        </CardContent>
      </AnimateInView>
    );
  }

  // Regular motion component if not using animateWhenInView
  return (
    <motion.div
      className={baseStyles}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay }}
      style={{ 
        boxShadow: featured ? "0 8px 32px rgba(0, 0, 0, 0.15)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
        ...(glowColor ? { '--card-glow-color': glowColor } as React.CSSProperties : {})
      }}
      {...(motionProps || {})}
      {...props}
    >
      <CardContent 
        Icon={Icon}
        iconColor={iconColor}
        iconBackground={iconBackground}
        iconContainerClass={iconContainerClass}
        iconSizeClass={iconSizeClass}
        glowColor={glowColor}
        interactive={interactive}
      >
        {children}
      </CardContent>
    </motion.div>
  );
};

// Extracted card content component to avoid duplication
interface CardContentProps {
  Icon?: LucideIcon;
  iconColor: string;
  iconBackground: string;
  iconContainerClass: string;
  iconSizeClass: string;
  glowColor?: string;
  interactive: boolean;
  hoverAnimation?: any;
  tapAnimation?: any;
  motionProps?: any;
  children: ReactNode;
}

const CardContent = ({ 
  Icon, 
  iconColor,
  iconBackground,
  iconContainerClass,
  iconSizeClass,
  interactive,
  motionProps,
  children 
}: CardContentProps) => {
  return (
    <>
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-3xl shadow-inner-subtle pointer-events-none" />
      
      {/* Enhanced shimmer on hover for interactive cards */}
      {interactive && (
        <motion.div 
          className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer" 
          {...(motionProps || {})}
        />
      )}

      {Icon && (
        <div className="absolute top-4 left-4 z-10">
          <motion.div 
            className={cn("transition-all duration-300", iconContainerClass, iconBackground)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className={cn(iconSizeClass, iconColor)} />
          </motion.div>
        </div>
      )}

      {children}
    </>
  );
};

export default GlassBentoCard;
