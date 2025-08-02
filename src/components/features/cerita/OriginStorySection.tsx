
import React, { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const OriginStorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate visual elements based on scroll
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      })
      .from(".comment-box", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1
      })
      .from(".container-graphic", {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1
      }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Narrative */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-8">
              Bagaimana Semua Dimulai
            </h2>
            
            <div className="space-y-4 text-foreground/80 font-sans leading-relaxed">
              <p>
                Perjalanan OurCreativity berawal dari sebuah pengamatan sederhana: internet dipenuhi oleh 
                <span className="text-coral font-medium"> percakapan dan komentar</span> dari ribuan anak muda 
                yang memiliki hasrat besar untuk mempelajari suatu hal.
              </p>
              
              <p>
                Mulai dari desain grafis, video editing, hingga penulisan kreatif. Namun, semangat itu seringkali 
                terhenti karena satu hal—mereka tidak memiliki <span className="text-turquoise font-medium">tempat yang aman 
                dan terarah</span> untuk bertanya dan bertumbuh.
              </p>
              
              <p>
                Melihat kekosongan ini, kami tergerak untuk membangun sebuah jembatan. OurCreativity lahir dari 
                sebuah harapan sederhana: untuk menciptakan sebuah <span className="text-amethyst font-medium">komunitas</span> di mana 
                pertanyaan tidak hanya dijawab, tetapi juga dirayakan sebagai awal dari sebuah karya.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <div ref={visualsRef} className="relative h-96">
            {/* Comment boxes */}
            <div className="absolute inset-0 flex flex-col justify-center space-y-4">
              <div className="comment-box bg-secondary/50 backdrop-blur-sm border border-neutral-700/60 rounded-xl p-3 max-w-xs ml-8">
                <p className="text-xs text-foreground/70">"Bagaimana cara belajar design?"</p>
              </div>
              <div className="comment-box bg-secondary/50 backdrop-blur-sm border border-neutral-700/60 rounded-xl p-3 max-w-xs">
                <p className="text-xs text-foreground/70">"Ada yang bisa ajarin video editing?"</p>
              </div>
              <div className="comment-box bg-secondary/50 backdrop-blur-sm border border-neutral-700/60 rounded-xl p-3 max-w-xs ml-12">
                <p className="text-xs text-foreground/70">"Komunitas kreatif dimana ya?"</p>
              </div>
            </div>

            {/* Container graphic */}
            <div className="container-graphic absolute bottom-8 right-8 w-24 h-24 rounded-full bg-gradient-to-br from-amethyst/20 to-turquoise/20 border-2 border-amethyst/50 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amethyst to-turquoise" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
