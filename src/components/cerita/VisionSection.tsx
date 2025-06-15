
import React, { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, Heart, Lightbulb, Target } from "lucide-react";

export const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flowchartRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate SVG paths
      const paths = flowchartRef.current?.querySelectorAll('.flow-path');
      const boxes = flowchartRef.current?.querySelectorAll('.flow-box');

      if (paths && boxes) {
        gsap.set(paths, { strokeDasharray: "1000", strokeDashoffset: "1000" });
        gsap.set(boxes, { opacity: 0, scale: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1,
          }
        });

        // Draw paths first
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.5,
          ease: "power2.inOut"
        })
        // Then animate boxes
        .to(boxes, {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: "back.out(1.7)"
        }, "-=1");
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
            Visi Ke Depan
          </h2>
          <p className="text-lg text-foreground/70 font-sans max-w-3xl mx-auto">
            Perjalanan komunitas yang dimulai dari hasrat sederhana hingga menjadi ekosistem kreativitas yang berkelanjutan.
          </p>
        </motion.div>

        {/* Animated Flowchart */}
        <div className="mb-16">
          <svg
            ref={flowchartRef}
            viewBox="0 0 800 400"
            className="w-full h-auto max-w-4xl mx-auto"
          >
            {/* Paths */}
            <path
              className="flow-path"
              d="M 100 200 L 200 200"
              stroke="url(#gradient1)"
              strokeWidth="3"
              fill="none"
            />
            <path
              className="flow-path"
              d="M 300 200 L 400 200"
              stroke="url(#gradient2)"
              strokeWidth="3"
              fill="none"
            />
            <path
              className="flow-path"
              d="M 500 200 L 600 200"
              stroke="url(#gradient3)"
              strokeWidth="3"
              fill="none"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9B6DFF" />
                <stop offset="100%" stopColor="#40E0D0" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#40E0D0" />
                <stop offset="100%" stopColor="#FF7F50" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF7F50" />
                <stop offset="100%" stopColor="#98F5E1" />
              </linearGradient>
            </defs>

            {/* Boxes */}
            <g className="flow-box">
              <rect x="50" y="160" width="100" height="80" rx="12" fill="rgba(155, 109, 255, 0.1)" stroke="#9B6DFF" strokeWidth="2"/>
              <text x="100" y="190" textAnchor="middle" fill="#9B6DFF" fontSize="12" fontWeight="bold">Media</text>
              <text x="100" y="205" textAnchor="middle" fill="#9B6DFF" fontSize="12" fontWeight="bold">Sosial</text>
            </g>

            <g className="flow-box">
              <rect x="250" y="160" width="100" height="80" rx="12" fill="rgba(64, 224, 208, 0.1)" stroke="#40E0D0" strokeWidth="2"/>
              <text x="300" y="190" textAnchor="middle" fill="#40E0D0" fontSize="12" fontWeight="bold">Minat</text>
              <text x="300" y="205" textAnchor="middle" fill="#40E0D0" fontSize="12" fontWeight="bold">Didapat</text>
            </g>

            <g className="flow-box">
              <rect x="450" y="160" width="100" height="80" rx="12" fill="rgba(255, 127, 80, 0.1)" stroke="#FF7F50" strokeWidth="2"/>
              <text x="500" y="190" textAnchor="middle" fill="#FF7F50" fontSize="12" fontWeight="bold">Bergabung</text>
              <text x="500" y="205" textAnchor="middle" fill="#FF7F50" fontSize="12" fontWeight="bold">Komunitas</text>
            </g>

            <g className="flow-box">
              <rect x="650" y="160" width="100" height="80" rx="12" fill="rgba(152, 245, 225, 0.1)" stroke="#98F5E1" strokeWidth="2"/>
              <text x="700" y="190" textAnchor="middle" fill="#98F5E1" fontSize="12" fontWeight="bold">Berkarya</text>
              <text x="700" y="205" textAnchor="middle" fill="#98F5E1" fontSize="12" fontWeight="bold">Bersama</text>
            </g>
          </svg>
        </div>

        {/* Future Goals */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, stagger: 0.2 }}
          viewport={{ once: true }}
        >
          <VisionCard 
            icon={Users} 
            title="Ekspansi Nasional" 
            description="Menjangkau kreator muda di seluruh Indonesia"
            color="amethyst"
          />
          <VisionCard 
            icon={Heart} 
            title="Festival Tahunan" 
            description="Menyelenggarakan event kreativitas skala besar"
            color="turquoise"
          />
          <VisionCard 
            icon={Lightbulb} 
            title="Platform Digital" 
            description="Membangun ekosistem digital terintegrasi"
            color="coral"
          />
          <VisionCard 
            icon={Target} 
            title="Kolaborasi Global" 
            description="Menjalin kemitraan internasional"
            color="mint"
          />
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
            Menjadi Bagian dari Perjalanan Kami
          </h3>
          <p className="text-foreground/70 font-sans mb-8 max-w-2xl mx-auto">
            Kami mengundang para kreator muda Indonesia untuk bergabung dan menjadi bagian dari komunitas kami. 
            Bersama, kita akan menciptakan, menginspirasi, dan mengembangkan ekosistem kreativitas yang berkelanjutan.
          </p>
          
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-amethyst via-turquoise to-coral rounded-full text-background font-semibold font-sans text-lg transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(155, 109, 255, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              Bergabung Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

interface VisionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: "amethyst" | "turquoise" | "coral" | "mint";
}

const VisionCard: React.FC<VisionCardProps> = ({ icon: Icon, title, description, color }) => {
  const colorClasses = {
    amethyst: "border-amethyst/30 bg-amethyst/10 text-amethyst",
    turquoise: "border-turquoise/30 bg-turquoise/10 text-turquoise",
    coral: "border-coral/30 bg-coral/10 text-coral",
    mint: "border-mint/30 bg-mint/10 text-mint"
  };

  return (
    <motion.div
      className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${colorClasses[color]}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 10px 25px rgba(0, 0, 0, 0.1)`
      }}
    >
      <Icon className="w-8 h-8 mb-4" />
      <h4 className="font-serif font-bold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-foreground/70 font-sans">{description}</p>
    </motion.div>
  );
};
