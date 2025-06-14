
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
  Share2,
  Palette,
  Video,
  FileText,
  Laugh,
  Award,
  Calendar,
  MapPin
} from 'lucide-react';
import BentoGrid from '@/components/ui/BentoGrid';
import BentoCard from '@/components/ui/BentoCard';

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

      // Bento cards animation on scroll
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: ".bento-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
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
      description: "Karya motion graphics yang memukau dengan efek visual yang menawan"
    },
    {
      id: 2,
      title: "Logo Design Minimalis",
      creator: "Ashtrozz",
      category: "Graphic Design",
      views: "8.7K",
      likes: "456",
      thumbnail: "/lovable-uploads/design.png",
      description: "Desain logo yang clean dan modern dengan filosofi yang mendalam"
    },
    {
      id: 3,
      title: "Meme Viral Terbaru",
      creator: "Daffa Deploid",
      category: "Meme Creation",
      views: "25.1K",
      likes: "1.2K",
      thumbnail: "/lovable-uploads/meme.png",
      description: "Konten meme yang menghibur dan relevan dengan isu terkini"
    },
    {
      id: 4,
      title: "Puisi Digital Modern",
      creator: "Saviora",
      category: "Karya Tulis",
      views: "5.3K",
      likes: "289",
      thumbnail: "/lovable-uploads/karyatulis.png",
      description: "Karya sastra digital yang menyentuh hati dengan kata-kata indah"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 parallax-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-black to-orange-900/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.1
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
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full blur-lg opacity-60 animate-pulse" />
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="OUR CREATIVITY Logo"
                className="relative w-full h-full object-contain rounded-full bg-black/50 backdrop-blur-sm border border-white/20 p-4"
              />
            </div>
          </div>

          {/* Main Title with Brand Colors */}
          <h1 ref={titleRef} className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-orange-400 to-teal-400 bg-clip-text text-transparent leading-tight">
            OUR CREATIVITY
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Komunitas Kreatif Indonesia yang Menginspirasi
            <br />
            <span className="text-transparent bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text font-semibold">
              Dimana Imajinasi Bertemu Inovasi
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/karya-kami')}
              className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-teal-500/25"
            >
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Jelajahi Karya Kami
            </button>
            <button
              onClick={() => navigate('/tim-kami')}
              className="group px-8 py-4 border-2 border-teal-500 rounded-full text-lg font-semibold hover:bg-teal-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Kenali Tim Kami
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="bento-section py-20 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
            Tentang Komunitas Kami
          </h2>
          
          <BentoGrid cols={4} mdCols={2} smCols={1} gap="lg" className="max-w-6xl mx-auto">
            {/* Large Feature Card */}
            <BentoCard 
              className="bento-card col-span-2 row-span-2 p-8 bg-gradient-to-br from-teal-900/30 to-orange-900/30 border-teal-400/20"
              glowColor="rgba(20, 184, 166, 0.3)"
            >
              <div className="h-full flex flex-col justify-center">
                <Sparkles className="w-12 h-12 text-teal-400 mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-white">Kreativitas Tanpa Batas</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Bergabunglah dengan komunitas kreatif terbesar Indonesia. Kami menyediakan platform untuk 
                  mengekspresikan ide-ide brilliant tanpa batasan, dengan dukungan penuh dari sesama kreator.
                </p>
                <div className="flex items-center gap-4 text-sm text-teal-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>200+ Anggota</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>25+ Awards</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Video Editing Card */}
            <BentoCard 
              className="bento-card p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-400/20"
              onClick={() => navigate('/tim-kami')}
            >
              <Video className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Video Editing</h3>
              <p className="text-gray-400 text-sm mb-4">
                Tim ahli dalam motion graphics, cinematic editing, dan visual effects
              </p>
              <div className="text-purple-400 text-sm font-semibold">5 Anggota Aktif</div>
            </BentoCard>

            {/* Graphic Design Card */}
            <BentoCard 
              className="bento-card p-6 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-400/20"
              onClick={() => navigate('/tim-kami')}
            >
              <Palette className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Graphic Design</h3>
              <p className="text-gray-400 text-sm mb-4">
                Desainer berbakat dalam branding, ilustrasi, dan desain digital
              </p>
              <div className="text-emerald-400 text-sm font-semibold">8 Anggota Aktif</div>
            </BentoCard>

            {/* Meme Creation Card */}
            <BentoCard 
              className="bento-card p-6 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-400/20"
              onClick={() => navigate('/tim-kami')}
            >
              <Laugh className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Meme Creation</h3>
              <p className="text-gray-400 text-sm mb-4">
                Kreator konten viral dan hiburan digital yang mengena
              </p>
              <div className="text-yellow-400 text-sm font-semibold">6 Anggota Aktif</div>
            </BentoCard>

            {/* Karya Tulis Card */}
            <BentoCard 
              className="bento-card p-6 bg-gradient-to-br from-pink-900/30 to-red-900/30 border-pink-400/20"
              onClick={() => navigate('/tim-kami')}
            >
              <FileText className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Karya Tulis</h3>
              <p className="text-gray-400 text-sm mb-4">
                Penulis dan penyair digital dengan karya-karya menyentuh hati
              </p>
              <div className="text-pink-400 text-sm font-semibold">4 Anggota Aktif</div>
            </BentoCard>

            {/* Stats Card */}
            <BentoCard 
              className="bento-card col-span-2 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/30 border-gray-600/20"
            >
              <div className="grid grid-cols-2 gap-8 h-full">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-2">1500+</div>
                  <div className="text-gray-400">Karya Dipublikasi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">50K+</div>
                  <div className="text-gray-400">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-2">8</div>
                  <div className="text-gray-400">Kategori Kreatif</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">#1</div>
                  <div className="text-gray-400">Komunitas ID</div>
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* Karya Kami Section */}
      <section ref={karyaRef} className="karya-section py-20 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
              Karya Kami Terbaru
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Jelajahi koleksi karya luar biasa dari para kreator berbakat di komunitas kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {karyaItems.map((item, index) => (
              <div
                key={item.id}
                className="karya-item group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md border border-white/10 hover:border-teal-400/30 transition-all duration-500 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/karya-kami')}
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/60 to-orange-500/60 opacity-80" />
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
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-teal-500 to-orange-500 text-white">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-2">
                    oleh {item.creator}
                  </p>

                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                    {item.description}
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
              className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto shadow-2xl shadow-teal-500/25"
            >
              Lihat Semua Karya
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-teal-900/30 to-orange-900/30 backdrop-blur-md border border-teal-400/20">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-orange-600/10 rounded-3xl" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Siap Bergabung?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Jadilah bagian dari komunitas kreatif terbesar Indonesia dan wujudkan impian kreatif Anda bersama kami
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/informasi')}
                className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center shadow-2xl shadow-teal-500/25"
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Bergabung Sekarang
              </button>
              <button
                onClick={() => navigate('/pengumuman')}
                className="group px-8 py-4 border-2 border-teal-500 rounded-full text-lg font-semibold hover:bg-teal-500/20 transition-all duration-300 flex items-center gap-2 justify-center"
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
