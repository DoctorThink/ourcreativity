
import { useEffect } from 'react';
import { gsap } from 'gsap';

// Simplified global animations with no scroll triggers for better performance
const initializeSimpleAnimations = () => {
  // Only keep essential smooth scrolling without triggers
  const smoothScroll = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { 
          y: element, 
          offsetY: 100
        },
        ease: 'power2.inOut'
      });
    }
  };

  // Add click handlers for smooth scroll links only
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        smoothScroll(href);
      }
    });
  });
};

export const GlobalAnimations = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeSimpleAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
};
