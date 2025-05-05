
import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6; // Number of columns on desktop
  mdCols?: 1 | 2 | 3 | 4; // Number of columns on tablets
  smCols?: 1 | 2; // Number of columns on mobile
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  stagger?: number; // Stagger delay between items
}

const gapSizes = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-10',
};

const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className,
  cols = 3,
  mdCols = 2,
  smCols = 1,
  gap = 'md',
  animate = true,
  stagger = 0.1,
}) => {
  const getColsClass = () => {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    };
    
    const mdColsMap = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
    };
    
    const smColsMap = {
      1: 'sm:grid-cols-1',
      2: 'sm:grid-cols-2',
    };
    
    return `grid-cols-${smCols} ${mdColsMap[mdCols]} ${colsMap[cols]}`;
  };

  const gapClass = gapSizes[gap];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Add animation to children
  const childrenWithAnimation = React.Children.map(children, (child, index) => {
    if (!animate || !React.isValidElement(child)) return child;
    
    return React.cloneElement(child as React.ReactElement, {
      variants: itemVariants,
      initial: "hidden",
      animate: "visible",
      transition: { delay: index * stagger },
    });
  });

  if (animate) {
    return (
      <motion.div
        className={cn('grid', getColsClass(), gapClass, className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {childrenWithAnimation}
      </motion.div>
    );
  }

  return (
    <div className={cn('grid', getColsClass(), gapClass, className)}>
      {children}
    </div>
  );
};

export default BentoGrid;
