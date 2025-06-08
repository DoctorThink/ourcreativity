
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GSAPPageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const GSAPPageTransition: React.FC<GSAPPageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial state
    gsap.set(container, { opacity: 0, y: 30 });

    // Animate in
    const tl = gsap.timeline();
    tl.to(container, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GSAPPageTransition;
