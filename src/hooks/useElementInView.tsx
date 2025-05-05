
import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Generic type parameter to make the hook work with different element types
export function useElementInView<T extends HTMLElement = HTMLDivElement>({
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
interface AnimateInViewProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  variants?: Variants;
  className?: string;
  as?: keyof typeof motion;
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

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={elementRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default useElementInView;
