
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@/hooks/useGSAP';

interface GSAPPageTransitionProps {
  children: React.ReactNode;
}

export const GSAPPageTransition: React.FC<GSAPPageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { createTimeline, gsap } = useGSAP();

  useEffect(() => {
    if (!containerRef.current) return;

    // Page enter animation
    const tl = createTimeline();
    
    // Initial state
    gsap.set(containerRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.98
    });

    // Enter animation
    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    return () => {
      tl.kill();
    };
  }, [location.pathname, createTimeline, gsap]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
    </div>
  );
};
