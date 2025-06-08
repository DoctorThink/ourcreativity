
import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface GSAPAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  scrollTrigger?: boolean;
  triggerElement?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export const useGSAP = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup timeline on unmount
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const createTimeline = (options?: gsap.TimelineVars) => {
    const tl = gsap.timeline(options);
    timelineRef.current = tl;
    return tl;
  };

  const fadeIn = (
    element: string | Element | RefObject<Element>, 
    options: GSAPAnimationOptions = {}
  ) => {
    const { duration = 0.8, delay = 0, ease = "power2.out", scrollTrigger = false } = options;
    
    const animationConfig: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
    };

    if (scrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: element,
        start: options.start || "top 85%",
        end: options.end || "bottom 15%",
        toggleActions: "play none none reverse",
      };
    }

    return gsap.fromTo(element, 
      { opacity: 0, y: 30 }, 
      animationConfig
    );
  };

  const slideIn = (
    element: string | Element | RefObject<Element>,
    direction: 'left' | 'right' | 'up' | 'down' = 'up',
    options: GSAPAnimationOptions = {}
  ) => {
    const { duration = 0.8, delay = 0, ease = "power2.out", scrollTrigger = false } = options;
    
    const getInitialTransform = (dir: string) => {
      switch (dir) {
        case 'left': return { x: -100, y: 0 };
        case 'right': return { x: 100, y: 0 };
        case 'up': return { x: 0, y: 50 };
        case 'down': return { x: 0, y: -50 };
        default: return { x: 0, y: 50 };
      }
    };

    const initial = getInitialTransform(direction);
    
    const animationConfig: gsap.TweenVars = {
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
    };

    if (scrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: element,
        start: options.start || "top 85%",
        toggleActions: "play none none reverse",
      };
    }

    return gsap.fromTo(element, 
      { ...initial, opacity: 0 }, 
      animationConfig
    );
  };

  const scaleIn = (
    element: string | Element | RefObject<Element>,
    options: GSAPAnimationOptions = {}
  ) => {
    const { duration = 0.6, delay = 0, ease = "back.out(1.7)", scrollTrigger = false } = options;
    
    const animationConfig: gsap.TweenVars = {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
    };

    if (scrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: element,
        start: options.start || "top 85%",
        toggleActions: "play none none reverse",
      };
    }

    return gsap.fromTo(element, 
      { scale: 0.8, opacity: 0 }, 
      animationConfig
    );
  };

  const staggerAnimation = (
    elements: string | Element[],
    animationType: 'fadeIn' | 'slideIn' | 'scaleIn' = 'fadeIn',
    options: GSAPAnimationOptions = {}
  ) => {
    const { stagger = 0.1, scrollTrigger = false } = options;
    
    const getAnimation = () => {
      switch (animationType) {
        case 'slideIn':
          return { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } };
        case 'scaleIn':
          return { from: { scale: 0.8, opacity: 0 }, to: { scale: 1, opacity: 1 } };
        default:
          return { from: { y: 20, opacity: 0 }, to: { y: 0, opacity: 1 } };
      }
    };

    const { from, to } = getAnimation();
    
    const animationConfig = {
      ...to,
      duration: options.duration || 0.6,
      ease: options.ease || "power2.out",
      stagger,
    };

    if (scrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: elements,
        start: options.start || "top 85%",
        toggleActions: "play none none reverse",
      };
    }

    gsap.set(elements, from);
    return gsap.to(elements, animationConfig);
  };

  const morphingBackground = (element: string | Element) => {
    return gsap.to(element, {
      background: "linear-gradient(135deg, #9B6DFF 0%, #40E0D0 50%, #FF7F50 100%)",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  };

  const floatingAnimation = (element: string | Element) => {
    return gsap.to(element, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  };

  const parallaxScroll = (
    element: string | Element,
    speed: number = 0.5
  ) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  };

  return {
    createTimeline,
    fadeIn,
    slideIn,
    scaleIn,
    staggerAnimation,
    morphingBackground,
    floatingAnimation,
    parallaxScroll,
    gsap,
    ScrollTrigger
  };
};
