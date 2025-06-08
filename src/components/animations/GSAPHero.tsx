
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';

const GSAPHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const sparkles = sparklesRef.current;

    if (!container || !title || !subtitle || !sparkles) return;

    // Set initial states
    gsap.set([title, subtitle, sparkles], { opacity: 0, y: 50 });

    // Create timeline
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate elements in sequence
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(sparkles, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Continuous sparkle animation
    gsap.to(".sparkle-icon", {
      rotation: 360,
      duration: 4,
      ease: "none",
      repeat: -1,
      stagger: 0.5
    });

    // Floating effect for title
    gsap.to(title, {
      y: -5,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(".sparkle-icon");
      gsap.killTweensOf(title);
    };
  }, []);

  return (
    <div ref={containerRef} className="mb-6 md:mb-8">
      <div className="text-center space-y-2 md:space-y-4">
        <div ref={titleRef} className="flex flex-col items-center leading-tight">
          <span className="text-base md:text-lg lg:text-xl font-sans font-medium text-foreground/80 mb-1">
            Selamat Datang di
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent">
            OUR CREATIVITY
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="flex items-center justify-center gap-2 text-xs md:text-sm text-foreground/60"
        >
          <div ref={sparklesRef} className="flex items-center gap-2">
            <Sparkles className="sparkle-icon w-3.5 h-3.5 md:w-4 md:h-4 text-amethyst" />
            <span className="font-sans">Dunia kreativitas tanpa batas menanti</span>
            <Sparkles className="sparkle-icon w-3.5 h-3.5 md:w-4 md:h-4 text-coral" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSAPHero;
