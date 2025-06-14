
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Trophy, 
  Heart,
  Star,
  Play,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const LandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const karyaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline();
      
      tl.from(".hero-logo", {
        scale: 0,
        rotation: 180,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
      })
      .from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "<0.3")
      .from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "<0.2")
      .from(".hero-cta", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "<0.3");

      // Floating animation for hero elements
      gsap.to(".floating", {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });

      // Cards animation on scroll
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Karya section animations
      gsap.from(".karya-item", {
        scrollTrigger: {
          trigger: ".karya-section",
          start: "top 70%",
          toggleActions: "play none none reverse"
        },
        scale: 0.8,
        opacity: 0,
        rotation: 5,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });

      // Stats counter animation
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 80%",
        onEnter: () => {
          gsap.to(".stat-number", {
            innerHTML: (i, el) => {
              const finalValue = parseInt(el.dataset.final || "0");
              return finalValue;
            },
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            stagger: 0.1
          });
        }
      });

      // Parallax effects
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        },
        y: -200,
        ease: "none"
      });

      // Text reveal animation
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const karyaItems = [
    {
      id: 1,
      title: "Motion Graphics Spektakuler",
      creator: "Kevin Zyu",
      category: "Video Editing",
      views: "15.2K",
      likes: "892",
      thumbnail: "/lovable-uploads/video.png",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Logo Design Minimalis",
      creator: "Ashtrozz",
      category: "Graphic Design",
      views: "8.7K",
      likes: "456",
      thumbnail: "/lovable-uploads/design.png",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Meme Viral Terbaru",
      creator: "Daffa Deploid",
      category: "Meme Creation",
      views: "25.1K",
      likes: "1.2K",
      thumbnail: "/lovable-uploads/meme.png",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      id: 4,
      title: "Puisi Digital Modern",
      creator: "Saviora",
      category: "Karya Tulis",
      views: "5.3K",
      likes: "289",
      thumbnail: "/lovable-uploads/karyatulis.png",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 parallax-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container max-w-7xl mx-auto text-center relative z-10">
          {/* Logo */}
          <div className="hero-logo floating mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60 animate-pulse" />
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="OUR CREATIVITY Logo"
                className="relative w-full h-full object-contain rounded-full bg-black/50 backdrop-blur-sm border border-white/20 p-4"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            OUR CREATIVITY
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Komunitas Kreatif Indonesia yang Menginspirasi
            <br />
            <span className="text-purple-400 font-semibold">Dimana Imajinasi Bertemu Inovasi</span>
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/karya-kami')}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-purple-500/25"
            >
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Jelajahi Karya Kami
            </button>
            <button
              onClick={() => navigate('/tim-kami')}
              className="group px-8 py-4 border-2 border-purple-500 rounded-full text-lg font-semibold hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Kenali Tim Kami
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 floating">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          <h2 className="reveal-text text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mengapa Bergabung dengan Kami?
          </h2>
          
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Kreativitas Tanpa Batas",
                description: "Ekspresikan ide-ide brillian Anda tanpa batasan",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Komunitas Solid",
                description: "Bergabung dengan 200+ kreator berbakat Indonesia",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Prestasi Gemilang",
                description: "Raih pencapaian dan pengakuan atas karya Anda",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Passion Driven",
                description: "Dikerjakan dengan cinta dan dedikasi penuh",
                gradient: "from-red-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card group relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 rounded-3xl transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Karya Kami Section */}
      <section ref={karyaRef} className="karya-section py-20 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal-text text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Karya Kami Terbaru
            </h2>
            <p className="reveal-text text-xl text-gray-300 max-w-3xl mx-auto">
              Jelajahi koleksi karya luar biasa dari para kreator berbakat di komunitas kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {karyaItems.map((item, index) => (
              <div
                key={item.id}
                className="karya-item group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/karya-kami')}
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`} />
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.gradient} text-white`}>
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    oleh {item.creator}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/karya-kami')}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto shadow-2xl shadow-purple-500/25"
            >
              Lihat Semua Karya
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section py-20 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Anggota Aktif", value: 200, suffix: "+" },
              { label: "Karya Dipublikasi", value: 1500, suffix: "+" },
              { label: "Kategori Kreatif", value: 8, suffix: "" },
              { label: "Awards Diraih", value: 25, suffix: "+" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <span className="stat-number" data-final={stat.value}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-gray-400 text-lg group-hover:text-white transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Siap Bergabung?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Jadilah bagian dari komunitas kreatif terbesar Indonesia dan wujudkan impian kreatif Anda bersama kami
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/informasi')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center shadow-2xl shadow-purple-500/25"
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Bergabung Sekarang
              </button>
              <button
                onClick={() => navigate('/pengumuman')}
                className="group px-8 py-4 border-2 border-purple-500 rounded-full text-lg font-semibold hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
