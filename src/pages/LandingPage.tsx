import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Users, Target, Infinity, Palette, Video, Smile, FileText, ArrowRight } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Helper component for Brand-specific styles and fonts
const BrandStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&display=swap');

    :root {
      --bg-dark: #1A1A1A;
      --bg-secondary-dark: #242424;
      --text-light: #F5F5F5;
      --text-muted: #A0A0A0;
      --brand-red: #FF0000;
      --brand-red-darker: #CC0000;
    }

    .font-display {
      font-family: 'Anton', sans-serif;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .font-body {
      font-family: 'Inter', sans-serif;
    }
    
    .bg-dark { background-color: var(--bg-dark); }
    .text-light { color: var(--text-light); }
    .text-muted { color: var(--text-muted); }
    .bg-brand-red { background-color: var(--brand-red); }

    .animated-gradient-text-red {
      background: linear-gradient(90deg, var(--text-light) 50%, var(--brand-red) 110%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    .glass-card-dark {
      background: rgba(36, 36, 36, 0.5); /* --bg-secondary-dark with alpha */
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .checkerboard-bg {
      background-color: var(--bg-dark);
      background-image: 
        linear-gradient(45deg, var(--brand-red) 25%, transparent 25%), 
        linear-gradient(-45deg, var(--brand-red) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--brand-red) 75%),
        linear-gradient(-45deg, transparent 75%, var(--brand-red) 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    }

    .text-readable {
        line-height: 1.75;
    }
  `}</style>
);


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
        gsap.timeline()
          .from(titleRef.current.querySelectorAll('span'), {
            opacity: 0, y: 80, duration: 1, ease: "power3.out", stagger: 0.1
          })
          .from(subtitleRef.current, {
            opacity: 0, y: 30, duration: 0.8, ease: "power2.out"
          }, "-=0.6");
      }

      // Bento grid staggered animation
      if (bentoGridRef.current) {
        gsap.from(bentoGridRef.current.querySelectorAll('.bento-item'), {
          opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: bentoGridRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        });
      }

      // Counter animation
      if (counterRef.current) {
        const counterElement = counterRef.current.querySelector('.counter-number');
        if (counterElement) {
          gsap.to(counterElement, {
            textContent: "3000", innerHTML: "3000+", duration: 2.5, ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: counterRef.current, start: "top 80%", toggleActions: "play none none reverse" }
          });
        }
      }

      // Journey flowchart animation
      if (journeyRef.current) {
        const journeySteps = journeyRef.current.querySelectorAll('.journey-step');
        const journeyLine = journeyRef.current.querySelector('.journey-line');
        
        const tl = gsap.timeline({
          scrollTrigger: { trigger: journeyRef.current, start: "top 70%", toggleActions: "play none none reverse" }
        });

        if (journeyLine) {
          tl.from(journeyLine, { scaleX: 0, transformOrigin: "left center", duration: 1.5, ease: "power2.inOut" });
        }
        tl.from(journeySteps, { opacity: 0, y: 50, scale: 0.9, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }, "-=1");
      }

      // CTA button hover effect
      if (ctaRef.current) {
        const ctaButton = ctaRef.current.querySelector('.cta-button');
        if (ctaButton) {
          const hoverTween = gsap.to(ctaButton, {
            scale: 1.05,
            boxShadow: "0px 10px 40px -10px var(--brand-red)",
            duration: 0.3,
            ease: "power2.out",
            paused: true
          });
          ctaButton.addEventListener('mouseenter', () => hoverTween.play());
          ctaButton.addEventListener('mouseleave', () => hoverTween.reverse());
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-light font-body overflow-x-hidden">
      <BrandStyles />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 checkerboard-bg opacity-5"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-display mb-6 animated-gradient-text-red">
            {'THIS IS OURCREATIVITY'.split(' ').map((word, i) => <span key={i} className="inline-block">{word} </span>)}
          </h1>
          <p ref={subtitleRef} className="text-xl md:text-2xl text-muted font-body max-w-3xl mx-auto text-readable">
            OurCreativityIDN adalah komunitas kreatif yang didirikan untuk memberikan manfaat dan menciptakan lebih banyak anak muda kreatif di Indonesia.
          </p>
          <div className="absolute top-1/4 right-1/4 opacity-10 animate-float">
            <Infinity className="w-32 h-32 text-brand-red" />
          </div>
        </div>
      </section>

      {/* Main Bento Grid */}
      <section ref={bentoGridRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
            
            <div className="bento-item md:col-span-2 lg:col-span-3 md:row-span-2 glass-card-dark rounded-3xl p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Infinity className="w-12 h-12 text-brand-red" />
                  <h2 className="text-3xl font-display text-light">APA ITU OURCREATIVITY</h2>
                </div>
                <p className="text-muted text-lg leading-relaxed text-readable">
                  Sebenarnya Komunitas ini diciptakan karena banyaknya komentar yang bertebaran di internet yang berisi kemauan mereka untuk mempelajari suatu hal, namun sayangnya mereka tidak memiliki tempat untuk bertanya, karena itulah dibuat komunitas ini, dengan harapan mereka dapat bertanya sekaligus menghasilkan karya dari komunitas ini.
                </p>
              </div>
            </div>

            <div className="bento-item md:col-span-2 lg:col-span-3 glass-card-dark rounded-3xl p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-10 h-10 text-brand-red" />
                  <h2 className="text-2xl font-display text-light">MISI KAMI</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "Menyaring dan menghubungkan anak muda berbakat melalui media sosial.",
                    "Menyediakan platform diskusi dan kolaborasi.",
                    "Mempublikasikan setiap karya anggota untuk apresiasi lebih luas.",
                    "Menyelenggarakan program gratis untuk pengembangan keterampilan.",
                    "Mendorong anggota untuk menciptakan karya yang lebih inovatif."
                  ].map((mission, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-brand-red mt-1.5 flex-shrink-0" />
                      <span className="text-muted text-readable">{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div ref={counterRef} className="bento-item glass-card-dark rounded-3xl p-8 relative text-center flex flex-col justify-center">
              <Users className="w-12 h-12 text-brand-red mx-auto mb-4" />
              <div className="counter-number text-5xl font-display text-light mb-2">0</div>
              <p className="text-lg font-display text-muted">MEMBER</p>
            </div>

            <div className="bento-item glass-card-dark rounded-3xl p-8 relative text-center flex flex-col justify-center">
              <Infinity className="w-16 h-16 text-brand-red mx-auto mb-4 group-hover:rotate-180 transition-transform duration-700" />
              <p className="text-sm font-body text-muted text-readable italic">
                "Simbol kreativitas tanpa batas, menunjukkan bahwa kreativitas manusia tidak seharusnya dibatasi."
              </p>
            </div>

            <div className="bento-item md:col-span-2 lg:col-span-2 md:row-span-2 glass-card-dark rounded-3xl p-8 relative overflow-hidden">
              <h2 className="text-2xl font-display text-light mb-6 text-center">4 JENIS GRUP</h2>
              <div className="grid grid-cols-2 gap-4 h-5/6">
                {[
                  { icon: Palette, label: "DESAIN GRAFIS", color: "#40E0D0" },
                  { icon: Video, label: "VIDEO EDITING", color: "#FF7F50" },
                  { icon: Smile, label: "MEME CREATOR", color: "#FFD1DC" },
                  { icon: FileText, label: "KARYA TULIS", color: "#98F5E1" },
                ].map((item, i) => (
                  <div key={i} className="group relative bg-black/20 rounded-2xl p-4 flex items-center justify-center cursor-pointer transition-all duration-300" style={{'--hover-color': item.color} as React.CSSProperties}>
                    <item.icon className="w-12 h-12 text-muted group-hover:opacity-0 transition-opacity duration-300" style={{color: item.color}}/>
                    <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-base font-display text-light text-center">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section ref={journeyRef} className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-16 text-light">PERJALANAN KAMI</h2>
          <div className="relative">
            <div className="journey-line absolute top-8 left-0 w-full h-1 bg-brand-red transform -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { num: 1, title: "Konten Pemicu", desc: "Ide kreatif yang menginspirasi dari media sosial." },
                { num: 2, title: "Minat Didapat", desc: "Menemukan passion dan keinginan untuk belajar." },
                { num: 3, title: "Bergabung", desc: "Menjadi bagian dari komunitas OurCreativity." },
                { num: 4, title: "Berkarya & Konsisten", desc: "Berdiskusi, kolaborasi, dan menghasilkan karya." },
                { num: 5, title: "Komunitas Baru", desc: "Membangun jaringan dan menginspirasi orang lain." },
              ].map((step) => (
                <div key={step.num} className="journey-step text-center">
                  <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-bg-secondary-dark">
                    <span className="text-2xl font-display text-light">{step.num}</span>
                  </div>
                  <h3 className="font-display text-lg mb-2 text-light">{step.title}</h3>
                  <p className="text-sm text-muted text-readable">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="py-24 px-6 relative bg-dark">
        <div className="absolute bottom-0 left-0 w-full h-24 checkerboard-bg opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-display mb-8 text-light">
            Jadilah Bagian dari Perjalanan Kami
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto text-readable">
            Bergabunglah dengan ribuan kreator Indonesia dan wujudkan potensi kreatif Anda bersama komunitas OurCreativity.
          </p>
          <a 
            href="https://linktr.ee/ourcreativity" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-4 bg-brand-red text-light px-12 py-5 rounded-full text-xl font-display transition-all duration-300 hover:bg-brand-red-darker"
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
