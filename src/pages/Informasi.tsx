
import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/features/informasi/HeroSection";
import { ValuesSection } from "@/components/features/informasi/ValuesSection";
import { ProgramsSection } from "@/components/features/informasi/ProgramsSection";
import { CTASection } from "@/components/features/informasi/CTASection";

const Informasi = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    // Remove scroll animations for better performance
    gsap.set("body", { overflow: "auto" });
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
