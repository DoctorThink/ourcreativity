import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Info, Bell, ScrollText } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
const Index = () => {
  const navigate = useNavigate();
  const {
    theme
  } = useTheme();

  // Enhanced animation variants for staggered animations
  const containerVariants = {
    hidden: {
      opacity: 0
    },
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
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  // Navigation items with updated routing and refined design
  const navigationItems = [{
    icon: BookOpen,
    text: "Cerita Kami",
    href: "/brand-story",
    color: "from-lavender to-amethyst/50",
    decorColor: "border-lavender"
  }, {
    icon: ScrollText,
    text: "Syarat & Ketentuan",
    href: "/terms",
    color: "from-mint to-turquoise/50",
    decorColor: "border-mint"
  }, {
    icon: Info,
    text: "Informasi",
    href: "/informasi",
    color: "from-peach to-coral/50",
    decorColor: "border-peach"
  }, {
    icon: Bell,
    text: "Pengumuman",
    href: "/pengumuman",
    color: "from-softPink to-amber/50",
    decorColor: "border-softPink"
  }];
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen overflow-hidden relative">
      {/* Enhanced Dynamic Background with geometric elements */}
      <div className="fixed inset-0 bg-background -z-10">
        {/* Geometric decorative elements with enhanced colors */}
        <div className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] bg-amethyst/5 -top-[20%] -right-[20%]" />
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-turquoise/5 -bottom-[10%] -left-[10%]" />
        <div className="absolute w-[40vw] h-[40vh] rounded-full blur-[80px] bg-coral/5 bottom-[30%] right-[5%]" />
        
        {/* Enhanced Grid overlay with dot pattern */}
        <div className="absolute inset-0 geometric-dot-pattern opacity-30" />
        <div className="absolute inset-0 geometric-line-pattern opacity-20" />
        
        {/* Animated subtle lines */}
        <div className="absolute left-[5%] top-[10%] w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-lavender/20 to-transparent animate-pulse-soft" />
        <div className="absolute right-[10%] top-[20%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-mint/20 to-transparent animate-pulse-soft" />
        <div className="absolute left-[20%] bottom-[10%] w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-peach/20 to-transparent animate-pulse-soft" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-[15%] left-[15%] w-16 h-16 border border-lavender/20 rounded-full animate-float" style={{
        animationDelay: "-2s"
      }} />
        <div className="absolute bottom-[25%] right-[25%] w-24 h-24 border border-mint/20 rounded-full animate-float" style={{
        animationDelay: "-1s"
      }} />
        <div className="absolute top-[40%] right-[10%] w-12 h-12 border border-peach/20 morphing-blob animate-float" style={{
        animationDelay: "-3s"
      }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Logo Container with Enhanced Animation and Geometric Accents */}
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 1.2
        }} className="flex gap-6 mb-12 relative">
            {/* Decorative circles */}
            <div className="absolute inset-0 -z-10 w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 border border-foreground/5 rounded-full animate-rotate-slow" />
              <div className="absolute w-80 h-80 border border-foreground/5 rounded-full animate-rotate-slow" style={{
              animationDirection: "reverse",
              animationDuration: "15s"
            }} />
              <div className="absolute w-96 h-96 border border-foreground/5 rounded-full animate-pulse-soft mx-0" />
            </div>
            
            <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2,
            duration: 0.7
          }} className="w-24 h-24 rounded-full backdrop-blur-xl bg-foreground/5 border border-foreground/10 p-4 flex items-center justify-center animate-float shadow-lg shadow-black/20 geometric-circle" whileHover={{
            scale: 1.05,
            borderColor: "rgba(155, 109, 255, 0.3)"
          }}>
              <img src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" alt="Fish Logo" className="w-16 h-16 object-contain" loading="eager" />
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4,
            duration: 0.7
          }} className="w-32 h-32 rounded-full backdrop-blur-xl bg-foreground/5 border border-foreground/10 p-4 flex items-center justify-center animate-float shadow-lg shadow-black/20 geometric-circle" whileHover={{
            scale: 1.05,
            borderColor: "rgba(64, 224, 208, 0.3)"
          }} style={{
            animationDelay: "-2s"
          }}>
              <img src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png" alt="Text Logo" className="w-24 h-24 object-contain" loading="eager" />
            </motion.div>
          </motion.div>

          {/* Enhanced Title with Gradient Animation */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6,
          duration: 0.7
        }} className="text-5xl md:text-7xl font-serif font-bold mb-6 text-center relative z-10">
            <motion.span className="inline-block" animate={{
            background: theme === "dark" ? ["linear-gradient(to right, #fff, #fff)", "linear-gradient(to right, #fff, #9B6DFF)", "linear-gradient(to right, #9B6DFF, #FEC6A1)", "linear-gradient(to right, #FEC6A1, #8A898C)", "linear-gradient(to right, #8A898C, #33C3F0)", "linear-gradient(to right, #33C3F0, #fff)"] : ["linear-gradient(to right, #333336, #333336)", "linear-gradient(to right, #333336, #9B6DFF)", "linear-gradient(to right, #9B6DFF, #FEC6A1)", "linear-gradient(to right, #FEC6A1, #8A898C)", "linear-gradient(to right, #8A898C, #33C3F0)", "linear-gradient(to right, #33C3F0, #333336)"],
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }} transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}>
              OUR CREATIVITY
            </motion.span>
          </motion.h1>

          {/* Description with enhanced typography and subtle animation */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7,
          duration: 0.7
        }} className="text-lg md:text-xl text-foreground/70 max-w-2xl text-center mb-12 font-serif relative z-10">
            <span className="shimmer px-6 py-4 rounded-full">
              Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
            </span>
          </motion.p>

          {/* Interactive Navigation Buttons with improved design and micro-interactions */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
            {navigationItems.map(({
            icon: Icon,
            text,
            href,
            color,
            decorColor
          }) => <motion.div key={text} variants={itemVariants} whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.2
            }
          }} whileTap={{
            scale: 0.95
          }} className="relative">
                <Button onClick={() => navigate(href)} variant="secondary" className={`w-full h-full min-h-[120px] rounded-2xl backdrop-blur-xl bg-foreground/5 border border-foreground/10 flex flex-col items-center justify-center gap-4 transition-all duration-300 group overflow-hidden relative btn-hover-effect`}>
                  {/* Enhanced background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30 transition-opacity duration-300 group-hover:opacity-50`}></div>
                  
                  {/* Interactive hover effect with shimmer */}
                  <span className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                  
                  {/* Enhanced geometric accent */}
                  <div className={`absolute -bottom-6 -right-6 w-16 h-16 ${decorColor} rounded-full border opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-125`} />
                  <div className={`absolute -top-6 -left-6 w-12 h-12 ${decorColor} rounded-full border opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-125`} />
                  
                  {/* Icon container with enhanced micro-interactions */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-foreground/10 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-foreground/20 relative z-10 overflow-hidden">
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    {/* Animated border */}
                    <span className="absolute inset-0 border border-foreground/0 group-hover:border-foreground/20 rounded-xl transition-all duration-300"></span>
                  </div>
                  
                  {/* Enhanced text with subtle animation */}
                  <span className="text-sm font-serif transition-all duration-300 group-hover:translate-y-1 relative z-10 group-hover:font-medium">{text}</span>
                </Button>
              </motion.div>)}
          </motion.div>
        </div>

        {/* Enhanced Credits Footer with geometric accents */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.2,
        duration: 0.8
      }} className="mt-auto pt-16 pb-6 text-center">
          <div className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-full px-6 py-3 inline-block relative overflow-hidden group hover:border-foreground/20 transition-colors duration-300">
            {/* Animated subtle accents */}
            <span className="absolute inset-0 bg-gradient-to-r from-amethyst/0 via-amethyst/5 to-amethyst/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
            
            <p className="text-xs text-foreground/50 group-hover:text-foreground/60 transition-colors duration-300">
              &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>;
};
export default Index;