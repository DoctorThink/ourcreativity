
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Play, Info, Bell, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  // Simplified animations for better performance
  const logoVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: { 
        type: "spring",
        stiffness: 180,
        damping: 18,
        duration: 0.6
      }
    }
  };

  // Enhanced navigation items with better design
  const navigationItems = [
    { 
      text: "Tim Kami", 
      href: "/tim-kami", 
      color: "from-amethyst/20 to-amethyst/40",
      hoverColor: "hover:from-amethyst/30 hover:to-amethyst/60",
      icon: Users,
      description: "Kenali tim kreatif kami"
    },
    { 
      text: "Karya Kami", 
      href: "/karya-kami", 
      color: "from-turquoise/20 to-turquoise/40",
      hoverColor: "hover:from-turquoise/30 hover:to-turquoise/60", 
      icon: Sparkles,
      description: "Jelajahi karya komunitas"
    },
    { 
      text: "Informasi", 
      href: "/informasi", 
      color: "from-coral/20 to-coral/40",
      hoverColor: "hover:from-coral/30 hover:to-coral/60",
      icon: Info,
      description: "Pelajari lebih lanjut"
    },
    { 
      text: "Pengumuman", 
      href: "/pengumuman", 
      color: "from-amber/20 to-amber/40",
      hoverColor: "hover:from-amber/30 hover:to-amber/60",
      icon: Bell,
      description: "Berita terbaru"
    }
  ];

  return (
    <ScrollArea className="h-screen w-full">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 backdrop-blur-lg" />
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container max-w-6xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-10">
            {/* Logo Container with optimized animations */}
            <div className="flex items-center justify-center gap-6">
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                className="w-20 h-20 rounded-full bg-white/5 p-3 flex items-center justify-center backdrop-blur-md border border-white/10"
              >
                <img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Fish Logo"
                  className="w-14 h-14 object-contain"
                  loading="eager"
                />
              </motion.div>
              
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="w-28 h-28 rounded-full bg-white/5 p-3 flex items-center justify-center backdrop-blur-md border border-white/10"
              >
                <img
                  src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                  alt="Text Logo"
                  className="w-20 h-20 object-contain"
                  loading="eager"
                />
              </motion.div>
            </div>
            
            <div className="text-center space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight glow-text font-sans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                OUR CREATIVITY
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans"
              >
                Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami dan wujudkan ide-ide Anda.
              </motion.p>
            </div>

            {/* Enhanced Navigation Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto mt-8"
            >
              {navigationItems.map((button, index) => {
                const IconComponent = button.icon;
                return (
                  <motion.button
                    key={button.text}
                    onClick={() => navigate(button.href)}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.7 + (index * 0.1),
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${button.color} ${button.hoverColor} backdrop-blur-md border border-white/10 text-white font-sans text-center transition-all duration-300 hover:border-white/20`}
                  >
                    {/* Background gradient animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center space-y-3">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-base">{button.text}</h3>
                        <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors">
                          {button.description}
                        </p>
                      </div>
                      
                      {/* Hover arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute top-3 right-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-xs">→</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </ScrollArea>
  );
};

export default Hero;
