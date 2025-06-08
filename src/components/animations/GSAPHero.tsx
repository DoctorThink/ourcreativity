
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@/hooks/useGSAP';
import { Users, Sparkles, Info, Bell } from 'lucide-react';

export const GSAPHero: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { createTimeline, gsap, staggerAnimation, morphingBackground, floatingAnimation } = useGSAP();

  const navigationItems = [
    { 
      text: "Tim Kami", 
      href: "/tim-kami", 
      icon: Users,
      description: "Kenali tim kreatif kami"
    },
    { 
      text: "Karya Kami", 
      href: "/karya-kami", 
      icon: Sparkles,
      description: "Jelajahi karya komunitas"
    },
    { 
      text: "Informasi", 
      href: "/informasi", 
      icon: Info,
      description: "Pelajari lebih lanjut"
    },
    { 
      text: "Pengumuman", 
      href: "/pengumuman", 
      icon: Bell,
      description: "Berita terbaru"
    }
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = createTimeline();
    
    // Initial setup
    gsap.set(".hero-logo", { scale: 0, rotation: -180, opacity: 0 });
    gsap.set(".hero-title", { y: 50, opacity: 0 });
    gsap.set(".hero-subtitle", { y: 30, opacity: 0 });
    gsap.set(".hero-nav-card", { y: 60, opacity: 0, scale: 0.8 });

    // Animation sequence
    tl.to(".hero-logo", {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      stagger: 0.2
    })
    .to(".hero-title", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(".hero-subtitle", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Stagger navigation cards
    staggerAnimation(".hero-nav-card", 'scaleIn', {
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Floating animations for logos
    floatingAnimation(".hero-logo-1");
    floatingAnimation(".hero-logo-2");

    // Background morphing
    const bgElement = heroRef.current.querySelector('.hero-background');
    if (bgElement) {
      morphingBackground(bgElement);
    }

    return () => {
      tl.kill();
    };
  }, [createTimeline, gsap, staggerAnimation, morphingBackground, floatingAnimation]);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
      <div className="hero-background absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 backdrop-blur-lg" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-10">
          {/* Logo Container */}
          <div className="flex items-center justify-center gap-6">
            <div className="hero-logo hero-logo-1 w-20 h-20 rounded-full bg-white/5 p-3 flex items-center justify-center backdrop-blur-md border border-white/10">
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Fish Logo"
                className="w-14 h-14 object-contain"
                loading="eager"
              />
            </div>
            
            <div className="hero-logo hero-logo-2 w-28 h-28 rounded-full bg-white/5 p-3 flex items-center justify-center backdrop-blur-md border border-white/10">
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-20 h-20 object-contain"
                loading="eager"
              />
            </div>
          </div>
          
          <div className="text-center space-y-6">
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight glow-text font-sans">
              OUR CREATIVITY
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
              Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami dan wujudkan ide-ide Anda.
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto mt-8">
            {navigationItems.map((button, index) => {
              const IconComponent = button.icon;
              return (
                <button
                  key={button.text}
                  onClick={() => navigate(button.href)}
                  className="hero-nav-card group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-amethyst/20 to-amethyst/40 hover:from-amethyst/30 hover:to-amethyst/60 backdrop-blur-md border border-white/10 text-white font-sans text-center transition-all duration-300 hover:border-white/20"
                >
                  {/* Background gradient animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base">{button.text}</h3>
                      <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors">
                        {button.description}
                      </p>
                    </div>
                    
                    {/* Hover arrow */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-xs">→</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
