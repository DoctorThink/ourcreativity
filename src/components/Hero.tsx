
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Play, Info, Bell } from "lucide-react";
import ParallaxEffect from "@/components/ParallaxEffect";

const Hero = () => {
  const navigate = useNavigate();

  // Performance optimized animations
  const logoVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    }
  };

  // Optimized navigation items
  const navigationItems = [
    { text: "Jelajahi Grup", href: "/groups", color: "from-lavender/20 to-transparent" },
    { text: "Mulai", href: "#", color: "from-mint/20 to-transparent" },
    { text: "Informasi", href: "/informasi", color: "from-peach/20 to-transparent" },
    { text: "Pengumuman", href: "/pengumuman", color: "from-softPink/20 to-transparent" }
  ];

  return (
    <ScrollArea className="h-screen w-full parallax-container">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
        {/* Enhanced background with geometric patterns and blobs */}
        <div className="absolute inset-0 geometric-grid opacity-40" />
        
        {/* Animated blob backgrounds */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vh] blob opacity-30" 
             style={{"--blob-color-1": "rgba(155, 109, 255, 0.07)", "--blob-color-2": "rgba(64, 224, 208, 0.04)"} as React.CSSProperties} />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40vw] h-[40vh] blob opacity-30" 
             style={{"--blob-color-1": "rgba(254, 198, 161, 0.07)", "--blob-color-2": "rgba(255, 209, 220, 0.04)"} as React.CSSProperties} />
        <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vh] blob-sm opacity-20" 
             style={{"--blob-color-1": "rgba(155, 109, 255, 0.05)", "--blob-color-2": "rgba(152, 245, 225, 0.03)"} as React.CSSProperties} />
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 backdrop-blur-lg" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container max-w-7xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-12">
            {/* Logo Container with parallax effect */}
            <div className="flex items-center justify-center gap-8">
              <ParallaxEffect speed={-0.3}>
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-24 h-24 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10"
                >
                  <img
                    src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                    alt="Fish Logo"
                    className="w-16 h-16 object-contain"
                    loading="eager"
                  />
                </motion.div>
              </ParallaxEffect>
              
              <ParallaxEffect speed={-0.5}>
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="w-32 h-32 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10"
                >
                  <img
                    src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                    alt="Text Logo"
                    className="w-24 h-24 object-contain"
                    loading="eager"
                  />
                </motion.div>
              </ParallaxEffect>
            </div>
            
            <ParallaxEffect speed={0.1}>
              <div className="text-center space-y-8">
                <motion.h1 
                  className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight glow-text"
                >
                  OUR CREATIVITY
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-serif"
                >
                  Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami dan wujudkan ide-ide Anda.
                </motion.p>
              </div>
            </ParallaxEffect>

            {/* Navigation Buttons with 3D card effects */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto mt-8"
            >
              {navigationItems.map((button, index) => (
                <div key={button.text} className="card-3d-container">
                  <motion.button
                    onClick={() => navigate(button.href)}
                    whileTap={{ scale: 0.95 }}
                    className={`card-3d rounded-full px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white font-serif text-center transition-all hover:bg-white/10 relative overflow-hidden group w-full`}
                  >
                    <div className="card-3d-content">
                      {/* Interactive gradient effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${button.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      {/* Show little icon on hover */}
                      <div className="relative z-10 flex items-center justify-center">
                        <span>{button.text}</span>
                        <motion.span 
                          initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                          whileHover={{ opacity: 1, width: "auto", marginLeft: 8 }}
                          className="overflow-hidden"
                        >
                          {index === 0 && <Users className="w-4 h-4" />}
                          {index === 1 && <Play className="w-4 h-4" />}
                          {index === 2 && <Info className="w-4 h-4" />}
                          {index === 3 && <Bell className="w-4 h-4" />}
                        </motion.span>
                      </div>
                    </div>
                  </motion.button>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </ScrollArea>
  );
};

export default Hero;
