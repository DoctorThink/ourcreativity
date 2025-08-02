
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const GrowthSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentCount, setCurrentCount] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Counter animation
      gsap.to({}, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          onEnter: () => {
            gsap.to({ count: 0 }, {
              count: 3000,
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                setCurrentCount(Math.round(this.targets()[0].count));
              }
            });
          }
        }
      });

      // Particle animation
      gsap.fromTo(".particle", {
        opacity: 0,
        scale: 0,
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
      }, {
        opacity: 0.3,
        scale: 1,
        x: 0,
        y: 0,
        duration: 2,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-gradient-to-r from-amethyst to-turquoise opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10">
        {/* Main number */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent">
            {currentCount.toLocaleString()}+
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Anggota Aktif
          </h3>
        </motion.div>

        {/* Supporting text */}
        <motion.div
          className="max-w-2xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-foreground/80 font-sans leading-relaxed">
            Belum genap setahun, kami telah mengumpulkan lebih dari 3000+ anggota dari seluruh Indonesia. 
            Ini adalah bukti nyata semangat belajar dan berkarya di kalangan anak muda.
          </p>
          <p className="text-lg text-foreground/80 font-sans leading-relaxed">
            Kami percaya jika hasrat itu diarahkan pada hal positif, Indonesia akan semakin dipenuhi oleh jiwa-jiwa kreatif.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
