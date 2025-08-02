
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export const HeroSection: React.FC = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, questionRef.current, answerRef.current], { opacity: 0 });
      
      const tl = gsap.timeline();
      
      // Animate main title first
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      // Then start typing animation for question
      .to(questionRef.current, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          // Trigger typing animation
          startTypingAnimation();
        }
      }, "+=0.5");

    });

    return () => ctx.revert();
  }, []);

  const startTypingAnimation = () => {
    const question = "Apa itu OurCreativity?";
    const element = questionRef.current;
    if (!element) return;

    let currentText = "";
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < question.length) {
        currentText += question[index];
        element.textContent = currentText;
        index++;
      } else {
        clearInterval(typeInterval);
        setTypingComplete(true);
        
        // Animate answer fade in
        gsap.to(answerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.5
        });
      }
    }, 80);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 via-turquoise/5 to-coral/5 opacity-30" />
      
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 30 }}
        >
          Semua Tentang{" "}
          <span className="bg-gradient-to-r from-amethyst via-turquoise to-coral bg-clip-text text-transparent">
            OurCreativity
          </span>
        </motion.h1>

        <h2
          ref={questionRef}
          className="text-2xl md:text-3xl font-sans font-medium text-foreground/80 mb-8 min-h-[1.5em] relative"
        >
          {typingComplete && (
            <span className="absolute right-0 animate-pulse text-turquoise">|</span>
          )}
        </h2>

        <p
          ref={answerRef}
          className="text-lg md:text-xl text-foreground/70 font-sans max-w-3xl mx-auto leading-relaxed opacity-0 transform translate-y-4"
        >
          OurCreativityIDN adalah komunitas kreatif yang didirikan pada tahun 2024 atas dasar kemauan tulus untuk memberikan manfaat bagi banyak orang dan menciptakan lebih banyak anak muda kreatif di Indonesia.
        </p>
      </div>
    </section>
  );
};
