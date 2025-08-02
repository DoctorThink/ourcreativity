
import React, { useRef, useLayoutEffect } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { HeroSection } from "../components/features/cerita/HeroSection";
import { OriginStorySection } from "../components/features/cerita/OriginStorySection";
import { GrowthSection } from "../components/features/cerita/GrowthSection";
import { VisionSection } from "../components/features/cerita/VisionSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CeritaKami = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Remove complex animations for better performance
    gsap.set("body", { overflow: "auto" });
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
