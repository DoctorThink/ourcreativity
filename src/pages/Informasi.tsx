
import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/informasi/HeroSection";
import { ValuesSection } from "@/components/informasi/ValuesSection";
import { ProgramsSection } from "@/components/informasi/ProgramsSection";
import { CTASection } from "@/components/informasi/CTASection";

const Informasi = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Global scroll animations for section transitions
      gsap.utils.toArray<HTMLElement>('section').forEach((section, index) => {
        if (index > 0) { // Skip hero section
          gsap.fromTo(section, {
            opacity: 0.8,
            y: 30
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
        <HeroSection />
        <ValuesSection />
        <ProgramsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Informasi;
