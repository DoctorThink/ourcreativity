import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Target, Infinity, Palette, Video, Smile, FileText, ArrowRight } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom OC Logo Component based on the deck's design
const OCLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 258 101" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M106.878 50.4999C106.878 69.9329 91.1396 85.6718 71.7066 85.6718C52.2737 85.6718 36.5348 69.9329 36.5348 50.4999C36.5348 31.0669 52.2737 15.328 71.7066 15.328C91.1396 15.328 106.878 31.0669 106.878 50.4999ZM71.7066 101C32.103 101 0 78.3971 0 50.5C0 22.6029 32.103 0 71.7066 0C111.31 0 143.413 22.6029 143.413 50.5C143.413 67.4334 133.447 82.2573 118.96 92.1061L155.034 44.591C160.709 37.135 171.742 35.8049 178.932 41.8153L221.45 76.5455C233.918 69.257 247.904 59.9547 258 50.5C251.043 36.1912 237.986 15.328 212.872 15.328C190.52 15.328 174.453 30.6385 166.452 41.595L130.378 89.11C114.717 97.0279 96.0964 101 71.7066 101Z"/>
    <path d="M71.7067 71.7068C83.421 71.7068 92.9861 62.1417 92.9861 50.4274C92.9861 38.7131 83.421 29.148 71.7067 29.148C60.0051 29.148 50.4273 38.7131 50.4273 50.4274C50.4273 62.1417 60.0051 71.7068 71.7067 71.7068Z"/>
g  </svg>
);

const LandingPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General fade-in for sections
      const sections = gsap.utils.toArray('.section-animate') as HTMLElement[];
      sections.forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Hero Animation
      gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, ease: 'power3.out', delay: 0.5 });
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-logo', { opacity: 0, scale: 0.8, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.4 });

      // Vision/Mission List Animation
      const missionItems = gsap.utils.toArray('.mission-item');
      gsap.from(missionItems, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.mission-list',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      // Stats Counter Animation
      const counter = gsap.utils.toArray('.counter-number');
      counter.forEach((num: any) => {
        gsap.to(num, {
          textContent: "3000+",
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: num,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
      
      // Journey Flowchart Animation
      const journeyFlow = document.querySelector('.journey-flow');
      if (journeyFlow) {
        const lines = gsap.utils.toArray('.journey-line');
        const nodes = gsap.utils.toArray('.journey-node');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: journeyFlow,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.from(nodes[0], { opacity: 0, scale: 0.8, duration: 0.5 })
          .to(lines[0], { scaleX: 1, duration: 0.4 })
          .from(nodes[1], { opacity: 0, scale: 0.8, duration: 0.5 })
          .to(lines[1], { scaleX: 1, duration: 0.4 })
          .from(nodes[2], { opacity: 0, scale: 0.8, duration: 0.5 })
          .to('.journey-split-line', { scaleY: 1, duration: 0.4, stagger: 0.1 })
          .from('.journey-split-node', { opacity: 0, y: 20, duration: 0.4, stagger: 0.2 });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#121212] text-white font-sans overflow-x-hidden">
      {/* --- Navbar --- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#121212]/80 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <OCLogo className="h-6 text-[#FF0000]" />
            {/* Font choice inspired by the deck's bold, condensed style */}
            <span className="font-extrabold tracking-wider text-xl uppercase font-display">OurCreativity</span>
          </a>
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#about" className="hover:text-[#FF0000] transition-colors">ABOUT US</a>
            <a href="#vision" className="hover:text-[#FF0000] transition-colors">VISION & MISSION</a>
            <a href="#journey" className="hover:text-[#FF0000] transition-colors">JOURNEY</a>
          </div>
          <a 
            href="https://linktr.ee/ourcreativity.ofc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#FF0000] text-white font-bold text-sm rounded-md hover:bg-white hover:text-[#FF0000] transition-all duration-300 transform hover:scale-105"
          >
            JOIN US
          </a>
        </nav>
      </header>
      
      <main>
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
          {/* Subtle Checkerboard background */}
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ff0000\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h20v20H0zM20 20h20v20H20z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
            <OCLogo className="hero-logo w-40 md:w-52 mb-8 text-[#FF0000]" />
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tighter font-display">
              THIS IS OURCREATIVITY
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-6">
              Komunitas kreatif untuk anak muda Indonesia. Belajar, berkolaborasi, dan tumbuh bersama di era digital.
            </p>
            <div className="hero-cta mt-10">
              <a 
                href="#about"
                className="inline-flex items-center gap-3 bg-white text-[#FF0000] px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF0000]/25 hover:scale-105"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* --- About Us Section --- */}
        <section id="about" className="section-animate py-24 px-6 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase font-display text-[#FF0000]">APA ITU OURCREATIVITY</h2>
              <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-prose">
                OurCreativityIDN adalah komunitas kreatif yang didirikan pada tahun 2024. Kami lahir dari keinginan untuk memberi manfaat dan menciptakan lebih banyak kreator muda di Indonesia.
              </p>
              <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-prose">
                Komunitas ini tercipta karena kami melihat banyak komentar di internet dari mereka yang ingin belajar, namun tidak memiliki tempat untuk bertanya. Kami hadir untuk menjadi ruang itu—tempat untuk bertanya, berdiskusi, sekaligus menghasilkan karya.
              </p>
            </div>
            <div className="flex justify-center items-center p-8">
              <div className="relative w-full max-w-md">
                  <Infinity className="w-full h-auto text-white/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-xl md:text-2xl font-bold text-center text-white px-4">
                        "Simbol kreativitas tanpa batas, karena ide tidak seharusnya dibatasi."
                      </p>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Vision & Mission Section --- */}
        <section id="vision" className="section-animate py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-5xl font-extrabold uppercase font-display flex items-center gap-4"><Target className="w-12 h-12 text-[#FF0000]"/> VISI KAMI</h2>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                Mengembangkan jiwa kreatif anak muda Indonesia dengan menciptakan wadah untuk berdiskusi, berkolaborasi, dan menghasilkan karya, serta berkontribusi bagi perkembangan industri kreatif di Indonesia.
              </p>
            </div>
            <div className="md:col-span-3">
                <h2 className="text-5xl font-extrabold uppercase font-display text-right md:text-left mb-8">MISI KAMI</h2>
                <ul className="space-y-4 mission-list">
                  {[
                    "Menyaring dan menghubungkan anak muda berbakat melalui media sosial.",
                    "Menyediakan platform diskusi dan kolaborasi untuk berbagi ilmu.",
                    "Mempublikasikan karya anggota agar mendapat apresiasi luas.",
                    "Menyelenggarakan program gratis untuk pengembangan skill.",
                    "Mendorong anggota untuk menciptakan karya yang inovatif dan bernilai."
                  ].map((item, index) => (
                    <li key={index} className="mission-item flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-3 h-3 bg-[#FF0000] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </section>

        {/* --- Key Features (Stats & Groups) Section --- */}
        <section className="section-animate py-24 px-6 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-4xl md:text-5xl font-extrabold uppercase font-display mb-16">
                    EKOSISTEM KREATIF KAMI
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Member Count */}
                    <div className="bg-[#1a1a1a] p-8 rounded-2xl text-center border border-white/10">
                        <Users className="w-16 h-16 text-[#FF0000] mx-auto mb-4" />
                        <div className="counter-number text-6xl font-display font-bold text-white mb-2">0</div>
                        <p className="text-xl font-semibold text-white/70 uppercase tracking-widest">Members</p>
                        <p className="mt-2 text-white/50">Dari seluruh Indonesia, siap belajar dan berkarya.</p>
                    </div>

                    {/* 4 Group Types */}
                    <div className="bg-[#1a1a1a] p-8 rounded-2xl md:col-span-2 lg:col-span-2 border border-white/10">
                        <h3 className="text-2xl font-bold font-display text-center mb-6">4 JENIS GRUP KREATIF</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Palette, label: "Desain Grafis", color: "#3b82f6" },
                                { icon: Video, label: "Video Editing", color: "#ef4444" },
                                { icon: Smile, label: "Meme Creator", color: "#eab308" },
                                { icon: FileText, label: "Karya Tulis", color: "#14b8a6" },
                            ].map(group => (
                                <div key={group.label} className="group flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg text-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                                    <group.icon className="w-10 h-10 mb-3 transition-colors duration-300" style={{color: group.color}}/>
                                    <span className="font-semibold text-sm text-white/80">{group.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* --- The Journey Section --- */}
        <section id="journey" className="section-animate py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center uppercase font-display mb-20 text-white">
              BAGAIMANA KAMI <span className="text-[#FF0000]">MENARIK MINAT?</span>
            </h2>
            <div className="journey-flow relative flex flex-col items-center">
              {/* Step 1 */}
              <div className="journey-node w-64 p-4 bg-[#FF0000] rounded-lg text-center font-bold shadow-lg shadow-[#FF0000]/20">
                1. KONTEN PEMICU DI MEDIA SOSIAL
              </div>
              <div className="journey-line w-1 h-16 bg-white/50 my-2 origin-top transform scale-x-0"></div>
              {/* Step 2 */}
              <div className="journey-node w-64 p-4 bg-white text-black rounded-lg text-center font-bold">
                2. MINAT DIDAPAT
              </div>
              <div className="journey-line w-1 h-16 bg-white/50 my-2 origin-top transform scale-x-0"></div>
              {/* Step 3 */}
              <div className="journey-node w-64 p-4 bg-white text-black rounded-lg text-center font-bold">
                3. BERGABUNG KE OURCREATIVITY
              </div>
              {/* Split */}
              <div className="relative w-full h-24 my-2 flex justify-center">
                  <div className="journey-split-line absolute top-0 w-1 h-full bg-white/50 origin-top transform scale-y-0"></div>
                  <div className="journey-split-line absolute top-full left-1/2 w-1/3 h-1 bg-white/50 -translate-x-full origin-right transform scale-x-0"></div>
                  <div className="journey-split-line absolute top-full left-1/2 w-1/3 h-1 bg-white/50 origin-left transform scale-x-0"></div>
              </div>
              <div className="relative w-full flex justify-center gap-8 -mt-2">
                <div className="journey-split-node w-56 p-3 bg-[#1a1a1a] border border-white/20 rounded-lg text-center text-sm">
                  <h4 className="font-bold">KOLABORASI</h4>
                  <p className="text-white/60">di akun @ourcreativity.ofc</p>
                </div>
                <div className="journey-split-node w-56 p-3 bg-[#1a1a1a] border border-white/20 rounded-lg text-center text-sm">
                  <h4 className="font-bold">BERKARYA & BELAJAR</h4>
                  <p className="text-white/60">Diskusi dan konsisten</p>
                </div>
              </div>
              <p className="mt-16 text-center text-lg text-white/70 max-w-2xl">
                Setelah minat didapat, tugas kami adalah mengarahkan mereka ke dalam komunitas untuk mulai Berkarya, Berdiskusi, dan Berkolaborasi. Kami berharap mereka konsisten untuk terus berkembang.
              </p>
            </div>
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section className="py-24 px-6 relative bg-black">
           {/* Checkerboard Pattern */}
           <div className="absolute top-0 left-0 w-full h-full opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(to right, #ff0000 1px, #121212 1px)',
                    backgroundSize: '20px 20px',
                }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-extrabold font-display mb-6 text-white">
              JADILAH BAGIAN DARI KAMI
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Bergabunglah dengan 3000+ kreator Indonesia dan wujudkan potensi kreatif Anda bersama komunitas OurCreativity.
            </p>
            
            <a 
              href="https://linktr.ee/ourcreativity.ofc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center gap-4 bg-[#FF0000] text-white px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-110 transform"
            >
              GABUNG SEKARANG
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-black py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-white/50">
          <p>© {new Date().getFullYear()} OurCreativityIDN. All Rights Reserved.</p>
          <p className="text-sm mt-2">Dibuat untuk para kreator, oleh para kreator.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
