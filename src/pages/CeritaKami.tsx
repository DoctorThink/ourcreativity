
import React, { useRef, useLayoutEffect } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { HeroSection } from "../components/cerita/HeroSection";
import { OriginStorySection } from "../components/cerita/OriginStorySection";
import { GrowthSection } from "../components/cerita/GrowthSection";
import { VisionSection } from "../components/cerita/VisionSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CeritaKami = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Smooth scrolling setup
      gsap.set("body", { overflow: "auto" });
      
      // Global scroll animations for section transitions
      gsap.utils.toArray<HTMLElement>('section').forEach((section, index) => {
        if (index > 0) { // Skip hero section
          gsap.fromTo(section, {
            opacity: 0.8,
            y: 50
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Remove the PageLayout wrapper to create a full-screen experience */}
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
        <HeroSection />
        <OriginStorySection />
        <GrowthSection />
        <VisionSection />
      </div>
    </div>
  );
};

export default CeritaKami;
