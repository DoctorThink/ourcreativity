
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Play, Info, Bell } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Hero = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

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
    { text: "Jelajahi Grup", href: "/groups", color: "from-lavender/20 to-transparent", darkColor: "from-lavender/20 to-transparent", lightColor: "from-amethyst/10 to-transparent" },
    { text: "Mulai", href: "#", color: "from-mint/20 to-transparent", darkColor: "from-mint/20 to-transparent", lightColor: "from-emerald/10 to-transparent" },
    { text: "Informasi", href: "/informasi", color: "from-peach/20 to-transparent", darkColor: "from-peach/20 to-transparent", lightColor: "from-orangeLight/10 to-transparent" },
    { text: "Pengumuman", href: "/pengumuman", color: "from-softPink/20 to-transparent", darkColor: "from-softPink/20 to-transparent", lightColor: "from-coral/10 to-transparent" }
  ];

  return (
    <ScrollArea className="h-screen w-full">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 backdrop-blur-lg" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container max-w-7xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-12">
            {/* Logo Container with optimized animations */}
            <div className="flex items-center justify-center gap-8">
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                className="w-24 h-24 rounded-full glass flex items-center justify-center animate-float"
              >
                <img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Fish Logo"
                  className="w-16 h-16 object-contain"
                  loading="eager"
                />
              </motion.div>
              
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="w-32 h-32 rounded-full glass flex items-center justify-center animate-float"
              >
                <img
                  src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                  alt="Text Logo"
                  className="w-24 h-24 object-contain"
                  loading="eager"
                />
              </motion.div>
            </div>
            
            <div className="text-center space-y-8">
              <motion.h1 
                className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight glow-text gradient-text-animation"
              >
                OUR CREATIVITY
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-serif"
              >
                Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami dan wujudkan ide-ide Anda.
              </motion.p>
            </div>

            {/* Navigation Buttons with enhanced interactivity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto mt-8"
            >
              {navigationItems.map((button, index) => (
                <motion.button
                  key={button.text}
                  onClick={() => navigate(button.href)}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: theme === "dark" 
                      ? "0 0 15px rgba(255,255,255,0.2)" 
                      : "0 0 15px rgba(42,42,46,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full px-6 py-3 glass text-foreground font-serif text-center transition-all relative overflow-hidden group"
                >
                  {/* Interactive gradient effect - adaptive to theme */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${theme === "dark" ? button.darkColor : button.lightColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
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
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </ScrollArea>
  );
};

export default Hero;
