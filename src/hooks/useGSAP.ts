
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Create main timeline
    timelineRef.current = gsap.timeline();

    return () => {
      // Cleanup
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const createTimeline = (config?: gsap.TimelineVars) => {
    return gsap.timeline(config);
  };

  const animateIn = (elements: string | Element | Element[], config: gsap.TweenVars = {}) => {
    return gsap.fromTo(elements, 
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", ...config }
    );
  };

  const staggerIn = (elements: string | Element | Element[], config: gsap.TweenVars = {}) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30, scale: 0.98 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.1,
        ...config 
      }
    );
  };

  const floatingAnimation = (elements: string | Element | Element[]) => {
    return gsap.to(elements, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  };

  const pulseAnimation = (elements: string | Element | Element[]) => {
    return gsap.to(elements, {
      scale: 1.05,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  };

  return {
    gsap,
    ScrollTrigger,
    timeline: timelineRef.current,
    createTimeline,
    animateIn,
    staggerIn,
    floatingAnimation,
    pulseAnimation
  };
};
