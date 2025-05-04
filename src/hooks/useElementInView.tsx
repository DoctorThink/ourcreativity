
import { useState, useEffect, useRef } from 'react';

interface UseElementInViewProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useElementInView = ({ root = null, rootMargin = '0px', threshold = 0 }: UseElementInViewProps = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [root, rootMargin, threshold]);
  
  return { ref, isInView };
};

export default useElementInView;
