
import { useState, useEffect, useRef } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useElementInView<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = false,
}: InViewOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    
    // Skip if element is not available or already triggered in triggerOnce mode
    if (!element || (triggerOnce && hasTriggered.current)) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const newInViewState = entry.isIntersecting;

        if (triggerOnce) {
          if (newInViewState) {
            setIsInView(true);
            hasTriggered.current = true;
            
            // Clean up observer if we only need to trigger once
            if (observerRef.current && element) {
              observerRef.current.unobserve(element);
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        } else {
          setIsInView(newInViewState);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isInView };
}

// Helper component to animate elements when they come into view
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface AnimateInViewProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  variants?: any;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export const AnimateInView = ({
  children,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  className = '',
  as = 'div',
  ...props
}: AnimateInViewProps) => {
  const { elementRef, isInView } = useElementInView<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const Component = motion[as as keyof typeof motion] || motion.div;

  return (
    <Component
      ref={elementRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export default useElementInView;
