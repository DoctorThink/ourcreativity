
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion } from 'framer-motion';
import { Users, Target, Infinity, Palette, Video, Smile, FileText, ArrowRight } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (titleRef.current && subtitleRef.current) {
        const tl = gsap.timeline();
        
        // Animate title with character reveal
        tl.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        })
        .from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3");
      }

      // Bento grid staggered animation
      if (bentoGridRef.current) {
        const bentoItems = bentoGridRef.current.querySelectorAll('.bento-item');
        
        gsap.from(bentoItems, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bentoGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Counter animation
      if (counterRef.current) {
        const counterElement = counterRef.current.querySelector('.counter-number');
        if (counterElement) {
          gsap.to(counterElement, {
            textContent: "3000+",
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counterRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }

      // Journey flowchart animation
      if (journeyRef.current) {
        const journeySteps = journeyRef.current.querySelectorAll('.journey-step');
        const journeyLine = journeyRef.current.querySelector('.journey-line');
        
        if (journeyLine) {
          gsap.from(journeyLine, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: journeyRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }

        gsap.from(journeySteps, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // CTA magnetic button effect
      if (ctaRef.current) {
        const ctaButton = ctaRef.current.querySelector('.cta-button');
        if (ctaButton) {
          ctaButton.addEventListener('mouseenter', () => {
            gsap.to(ctaButton, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          ctaButton.addEventListener('mouseleave', () => {
            gsap.to(ctaButton, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 animated-gradient-text"
          >
            OUR CREATIVITY
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-foreground/80 font-sans max-w-3xl mx-auto text-readable"
          >
            Perjalanan kreativitas dan inspirasi di balik komunitas kami
          </p>
          
          {/* Floating OC Logo */}
          <div className="absolute top-1/4 right-1/4 opacity-10 animate-float">
            <Infinity className="w-32 h-32 text-foreground" />
          </div>
        </div>
      </section>

      {/* Main Bento Grid */}
      <section ref={bentoGridRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
            
            {/* Box 1: About Us (2x2 Large) */}
            <div className="bento-item md:col-span-2 lg:col-span-3 md:row-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-[#40E0D0]/10 to-[#FF7F50]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Infinity className="w-12 h-12 text-[#40E0D0]" />
                  <h2 className="text-3xl font-serif font-bold text-foreground">APA ITU OURCREATIVITY</h2>
                </div>
                <p className="text-foreground/80 text-lg leading-relaxed text-readable">
                  OurCreativity adalah komunitas digital yang menghubungkan para kreator muda Indonesia. 
                  Kami memberikan ruang untuk berbagi, belajar, dan tumbuh bersama dalam dunia kreativitas digital. 
                  Dari desain grafis hingga konten video, kami memfasilitasi perjalanan kreatif setiap anggota.
                </p>
              </div>
            </div>

            {/* Box 2: Vision & Mission (2x1 Medium) */}
            <div className="bento-item md:col-span-2 lg:col-span-3 glass-card rounded-3xl p-8 relative overflow-hidden group hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9B6DFF]/10 to-[#98F5E1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-10 h-10 text-[#9B6DFF]" />
                  <h2 className="text-2xl font-serif font-bold text-foreground">MISI KAMI</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#40E0D0] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80 text-readable">Membangun komunitas kreatif yang inspiratif</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FF7F50] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80 text-readable">Memberikan platform untuk berbagi karya</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FFBF00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80 text-readable">Mengembangkan skill kreativitas digital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#98F5E1] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80 text-readable">Menghubungkan kreator se-Indonesia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FFD1DC] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80 text-readable">Menciptakan peluang kolaborasi</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Box 3: 3000+ Members (1x1 Small) */}
            <div ref={counterRef} className="bento-item glass-card rounded-3xl p-8 relative overflow-hidden group hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F50] to-[#FFBF00] opacity-20"></div>
              <div className="relative z-10 text-center">
                <Users className="w-12 h-12 text-[#FF7F50] mx-auto mb-4" />
                <div className="counter-number text-4xl font-serif font-bold text-foreground mb-2">0</div>
                <p className="text-lg font-medium text-foreground/80">MEMBER</p>
              </div>
            </div>

            {/* Box 4: Logo Philosophy (1x1 Small) */}
            <div className="bento-item glass-card rounded-3xl p-8 relative overflow-hidden group hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9B6DFF]/20 to-[#40E0D0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <Infinity className="w-16 h-16 text-[#9B6DFF] mx-auto mb-4 group-hover:rotate-180 transition-transform duration-700" />
                <p className="text-sm font-medium text-foreground/80 text-readable">
                  "Simbol kreativitas tanpa batas"
                </p>
              </div>
            </div>

            {/* Box 5: 4 Jenis Grup (2x2 Interactive) */}
            <div className="bento-item md:col-span-2 lg:col-span-2 md:row-span-2 glass-card rounded-3xl p-8 relative overflow-hidden">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">4 JENIS GRUP</h2>
              <div className="grid grid-cols-2 gap-4 h-full">
                
                {/* Desain Grafis */}
                <div className="group relative bg-secondary/50 rounded-2xl p-6 cursor-pointer hover:bg-[#40E0D0]/20 transition-all duration-300">
                  <Palette className="w-12 h-12 text-[#40E0D0] mx-auto mb-4" />
                  <div className="absolute inset-0 bg-[#40E0D0]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-lg font-bold text-foreground">DESAIN GRAFIS</span>
                  </div>
                </div>

                {/* Video Editing */}
                <div className="group relative bg-secondary/50 rounded-2xl p-6 cursor-pointer hover:bg-[#FF7F50]/20 transition-all duration-300">
                  <Video className="w-12 h-12 text-[#FF7F50] mx-auto mb-4" />
                  <div className="absolute inset-0 bg-[#FF7F50]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-lg font-bold text-foreground">VIDEO EDITING</span>
                  </div>
                </div>

                {/* Meme Creator */}
                <div className="group relative bg-secondary/50 rounded-2xl p-6 cursor-pointer hover:bg-[#FFD1DC]/20 transition-all duration-300">
                  <Smile className="w-12 h-12 text-[#FFD1DC] mx-auto mb-4" />
                  <div className="absolute inset-0 bg-[#FFD1DC]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-lg font-bold text-foreground">MEME CREATOR</span>
                  </div>
                </div>

                {/* Karya Tulis */}
                <div className="group relative bg-secondary/50 rounded-2xl p-6 cursor-pointer hover:bg-[#98F5E1]/20 transition-all duration-300">
                  <FileText className="w-12 h-12 text-[#98F5E1] mx-auto mb-4" />
                  <div className="absolute inset-0 bg-[#98F5E1]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-lg font-bold text-foreground">KARYA TULIS</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section ref={journeyRef} className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 text-foreground">PERJALANAN KAMI</h2>
          
          <div className="relative">
            {/* Journey Line */}
            <div className="journey-line absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#40E0D0] via-[#FF7F50] to-[#FFBF00] transform -translate-y-1/2 hidden md:block"></div>
            
            {/* Journey Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              <div className="journey-step text-center">
                <div className="w-16 h-16 bg-[#40E0D0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-background">1</span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Konten Pemicu</h3>
                <p className="text-sm text-foreground/70 text-readable">Ide kreatif yang menginspirasi</p>
              </div>
              
              <div className="journey-step text-center">
                <div className="w-16 h-16 bg-[#98F5E1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-background">2</span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Minat Didapat</h3>
                <p className="text-sm text-foreground/70 text-readable">Passion untuk berkreasi</p>
              </div>
              
              <div className="journey-step text-center">
                <div className="w-16 h-16 bg-[#FF7F50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-background">3</span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Bergabung</h3>
                <p className="text-sm text-foreground/70 text-readable">Menjadi bagian komunitas</p>
              </div>
              
              <div className="journey-step text-center">
                <div className="w-16 h-16 bg-[#FFBF00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-background">4</span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Berkarya & Konsisten</h3>
                <p className="text-sm text-foreground/70 text-readable">Menghasilkan karya terbaik</p>
              </div>
              
              <div className="journey-step text-center">
                <div className="w-16 h-16 bg-[#9B6DFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-background">5</span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Komunitas Baru</h3>
                <p className="text-sm text-foreground/70 text-readable">Membangun jaringan luas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="py-20 px-6 relative">
        {/* Checkerboard Pattern */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <div className="grid grid-cols-16 h-full">
            {Array.from({ length: 32 }, (_, i) => (
              <div 
                key={i} 
                className={`${i % 2 === 0 ? 'bg-[#FF0000]' : 'bg-white'}`}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-foreground">
            Jadilah Bagian dari Perjalanan Kami
          </h2>
          <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto text-readable">
            Bergabunglah dengan ribuan kreator Indonesia dan wujudkan potensi kreatif Anda bersama komunitas OurCreativity.
          </p>
          
          <a 
            href="https://linktr.ee/ourcreativity" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-4 bg-gradient-to-r from-[#40E0D0] to-[#FF7F50] text-background px-12 py-6 rounded-full text-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-[#40E0D0]/25"
          >
            GABUNG SEKARANG
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
