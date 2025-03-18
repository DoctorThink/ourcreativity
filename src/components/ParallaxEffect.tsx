
import { useRef, useEffect, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // -1 to 1 (negative values move opposite to scroll)
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

const ParallaxEffect = ({ 
  children, 
  speed = 0.2, 
  className = '',
  direction = 'vertical'
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let animationFrameId: number | null = null;
    let lastScrollTop = window.scrollY;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollDiff = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;
      
      const rect = element.getBoundingClientRect();
      const inView = 
        rect.top < window.innerHeight && 
        rect.bottom > 0;
      
      if (inView) {
        animationFrameId = requestAnimationFrame(() => {
          // Calculate transform based on scroll position and element position
          const scrollPosition = window.scrollY;
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const windowHeight = window.innerHeight;
          
          // Calculate how far the element is from the center of the viewport
          const centerPosition = elementTop - scrollPosition - (windowHeight / 2) + (elementHeight / 2);
          
          // Scale the effect based on distance from center
          let translateValue = centerPosition * speed * -0.1;
          
          // Apply transformation
          if (direction === 'vertical') {
            element.style.transform = `translateY(${translateValue}px)`;
          } else {
            element.style.transform = `translateX(${translateValue}px)`;
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize positions
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [speed, direction]);
  
  return (
    <div 
      ref={ref}
      className={`parallax-item ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

export default ParallaxEffect;
