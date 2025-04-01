
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Info, Bell, ScrollText, Users } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: scrollRef,
    offset: ["start start", "end end"]
  });
  
  // Parallax effects for layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // Handle scroll to reveal navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > window.innerHeight * 0.3);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Navigation items with updated routing and refined design
  const navigationItems = [
    { icon: BookOpen, text: "Cerita Kami", href: "/brand-story", height: 0 },
    { icon: Users, text: "Tim Kami", href: "/tim-kami", height: 10 },
    { icon: ScrollText, text: "Syarat & Ketentuan", href: "/terms", height: 20 },
    { icon: Info, text: "Informasi", href: "/informasi", height: 5 },
    { icon: Bell, text: "Pengumuman", href: "/pengumuman", height: 15 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-x-hidden overflow-y-auto relative perspective-1000"
      ref={containerRef}
    >
      {/* Background layers */}
      <div className="fixed inset-0 bg-background -z-10">
        {/* Topographical patterns */}
        <div className="absolute inset-0 geo-topo-pattern opacity-20" />
        
        {/* Dynamic curved layers */}
        <motion.div 
          className="absolute w-[120vw] h-[40vh] -left-[10vw] top-[65vh] rounded-topo topo-layer-1"
          style={{ y: layer1Y }}
        />
        <motion.div 
          className="absolute w-[130vw] h-[45vh] -right-[15vw] top-[75vh] rounded-topo topo-layer-2"
          style={{ y: layer2Y }}
        />
        <motion.div 
          className="absolute w-[140vw] h-[50vh] -left-[20vw] top-[85vh] rounded-topo topo-layer-3"
          style={{ y: layer3Y }}
        />
        
        {/* Contour lines */}
        <div className="absolute inset-0 contour-pattern opacity-10" />
        
        {/* Connection nodes */}
        <div className="absolute left-[15%] top-[20%] w-2 h-2 rounded-full bg-tone-300/20 animate-pulse-soft" />
        <div className="absolute left-[25%] top-[40%] w-3 h-3 rounded-full bg-tone-300/30 animate-pulse-soft" style={{ animationDelay: "-1.5s" }} />
        <div className="absolute right-[20%] top-[30%] w-4 h-4 rounded-full bg-tone-300/20 animate-pulse-soft" style={{ animationDelay: "-2s" }} />
        <div className="absolute right-[30%] bottom-[35%] w-2 h-2 rounded-full bg-tone-300/30 animate-pulse-soft" style={{ animationDelay: "-0.5s" }} />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path 
            d="M15%,20% Q25%,30% 25%,40%" 
            className="connection-line" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.path 
            d="M25%,40% Q40%,35% 20%,65%" 
            className="connection-line" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.path 
            d="M80%,30% Q70%,50% 70%,65%" 
            className="connection-line" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.8 }}
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-[200vh]" ref={scrollRef}>
        {/* Hero section with 3D typography */}
        <div className="min-h-screen flex items-center justify-center perspective-1000">
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="flex flex-col items-center"
          >
            {/* Logo section with 3D effect */}
            <motion.div
              initial={{ scale: 0, rotateX: 25 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 1.2
              }}
              className="relative mb-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                initial={{ opacity: 0, y: -10, z: 0 }}
                animate={{ opacity: 1, y: 0, z: 30 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-24 h-24 rounded-full backdrop-blur-xl bg-tone-800/50 border border-tone-700/40 p-4 flex items-center justify-center shadow-lg absolute left-0 -translate-x-1/2"
                style={{ transform: "translateZ(30px)" }}
              >
                <img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Fish Logo"
                  className="w-16 h-16 object-contain"
                  loading="eager"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, z: 0 }}
                animate={{ opacity: 1, z: 50 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-32 h-32 rounded-full backdrop-blur-xl bg-tone-800/50 border border-tone-700/40 p-4 flex items-center justify-center shadow-lg"
                style={{ transform: "translateZ(50px)" }}
              >
                <img
                  src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                  alt="Text Logo"
                  className="w-24 h-24 object-contain"
                  loading="eager"
                />
              </motion.div>
              
              <svg className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full opacity-20" height="10">
                <ellipse cx="50%" cy="50%" rx="30%" ry="50%" fill="rgba(255,255,255,0.2)" />
              </svg>
            </motion.div>

            {/* Title with 3D depth effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="display-huge text-depth text-center mb-8"
              data-text="OUR CREATIVITY"
            >
              OUR CREATIVITY
            </motion.h1>

            {/* Subtitle with elegant typography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="text-lg md:text-xl text-tone-400 max-w-xl text-center mb-12 font-mono relative z-10 mx-auto py-2 px-4"
            >
              <span className="relative">
                Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-tone-700"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 1.2 }}
                />
              </span>
            </motion.p>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
              transition={{ 
                delay: 2, 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 rounded-full border-2 border-tone-500/30 flex items-center justify-center">
                <div className="w-1 h-2 bg-tone-400 rounded-full" />
              </div>
              <p className="text-tone-500 text-xs mt-2 text-center font-mono">SCROLL</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation section with topographical elements */}
        <div className="min-h-screen pt-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="display-medium text-center mb-16 relative"
          >
            <span className="text-3d">NAVIGATE</span>
          </motion.h2>

          {/* Navigation items with topographic elevation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity: navOpacity }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 w-full max-w-5xl mx-auto"
          >
            {navigationItems.map(({ icon: Icon, text, href, height }, index) => (
              <motion.div
                key={text}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  translateZ: 20 + height,
                  transition: { duration: 0.3 } 
                }}
                whileTap={{ scale: 0.95 }}
                className="topo-layer relative"
                style={{
                  transform: `perspective(1000px) translateZ(${height}px)`,
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                <Button
                  onClick={() => navigate(href)}
                  variant="secondary"
                  className="w-full h-full min-h-[120px] sm:min-h-[140px] rounded-topo bg-tone-900/30 backdrop-blur-sm border border-tone-700/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 contour-pattern opacity-20" />
                  
                  {/* Elevated icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-tone-800/50 backdrop-blur-sm z-10 border border-tone-700/30 shadow-lg transform-gpu">
                    <Icon className="w-6 h-6 text-tone-200" />
                  </div>
                  
                  {/* Label */}
                  <span className="text-sm font-mono tracking-wide z-10 text-tone-300">{text}</span>
                  
                  {/* Connection lines */}
                  <svg className="absolute -bottom-4 -right-4 w-16 h-16 opacity-30 z-0" viewBox="0 0 100 100">
                    <motion.path 
                      d="M100,0 Q50,50 100,100" 
                      className="connection-line"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
                    />
                  </svg>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer with minimalist typography */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-auto pt-16 pb-6 text-center"
        >
          <div className="backdrop-blur-sm bg-tone-900/30 border border-tone-800/30 rounded-full px-6 py-3 inline-block relative overflow-hidden group hover:border-tone-700/40 transition-colors duration-300">
            <span className="absolute inset-0 bg-gradient-to-r from-tone-800/0 via-tone-800/10 to-tone-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
            
            <p className="text-xs text-tone-500 font-mono tracking-wide group-hover:text-tone-400 transition-colors duration-300">
              &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
