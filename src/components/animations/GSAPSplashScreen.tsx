
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GSAPSplashScreenProps {
  onComplete: () => void;
}

const GSAPSplashScreen: React.FC<GSAPSplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const particles = particlesRef.current;

    if (!container || !logo || !text || !particles) return;

    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Set initial states
    gsap.set([logo, text], { opacity: 0, scale: 0.5, y: 50 });
    gsap.set(particles, { opacity: 0 });
    gsap.set(container, { opacity: 1 });

    // Animate particles first
    tl.to(particles, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    // Logo animation
    .to(logo, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.3")
    // Text animation
    .to(text, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    // Pulse effect
    .to(logo, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, "+=0.5")
    // Fade out
    .to(container, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power2.inOut"
    }, "+=0.5");

    // Floating animation for particles
    gsap.to(".splash-particle", {
      y: -20,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center"
    >
      {/* Animated particles background */}
      <div ref={particlesRef} className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="splash-particle absolute w-2 h-2 bg-amethyst/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center space-y-8">
        <div ref={logoRef} className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
              alt="Logo"
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <img
              src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
              alt="Our Creativity"
              className="w-20 h-20 md:w-24 md:h-24"
            />
          </div>
        </div>
        
        <div ref={textRef} className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent">
            OUR CREATIVITY
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl font-sans">
            Dimana imajinasi bertemu dengan inovasi
          </p>
        </div>
      </div>
    </div>
  );
};

export default GSAPSplashScreen;
