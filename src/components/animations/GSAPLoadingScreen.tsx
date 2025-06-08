
import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

interface GSAPLoadingScreenProps {
  onComplete: () => void;
}

export const GSAPLoadingScreen: React.FC<GSAPLoadingScreenProps> = ({ onComplete }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const { createTimeline, gsap } = useGSAP();

  useEffect(() => {
    if (!loadingRef.current) return;

    const tl = createTimeline();

    // Logo animation
    tl.fromTo(".loading-logo", 
      { 
        scale: 0, 
        rotation: -180, 
        opacity: 0 
      },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "back.out(1.7)" 
      }
    )
    .to(".loading-logo", {
      rotation: 360,
      duration: 1,
      ease: "power2.inOut"
    })
    .to(".loading-text", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.5")
    .to(".loading-progress", {
      width: "100%",
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.3")
    .to(loadingRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "+=0.2");

    return () => {
      tl.kill();
    };
  }, [createTimeline, gsap, onComplete]);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="loading-logo relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amethyst via-turquoise to-coral opacity-80 blur-sm" />
          <img
            src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
            alt="Loading..."
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Text */}
        <div className="loading-text opacity-0 transform translate-y-4">
          <h2 className="text-2xl md:text-3xl font-bold font-sans bg-gradient-to-r from-amethyst to-turquoise bg-clip-text text-transparent">
            OUR CREATIVITY
          </h2>
          <p className="text-foreground/70 mt-2 font-sans">
            Memuat kreativitas...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-border/30 rounded-full mx-auto overflow-hidden">
          <div className="loading-progress h-full bg-gradient-to-r from-amethyst to-turquoise rounded-full w-0" />
        </div>
      </div>
    </div>
  );
};
