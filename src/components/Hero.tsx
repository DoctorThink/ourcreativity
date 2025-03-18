
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Play, Info, Bell } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";
import InteractiveElement from "@/components/ui/InteractiveElement";
import MicroInteraction from "@/components/ui/MicroInteraction";

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
    { text: "Jelajahi Grup", href: "/groups", color: "from-lavender/20 to-transparent", icon: Users },
    { text: "Mulai", href: "#", color: "from-mint/20 to-transparent", icon: Play },
    { text: "Informasi", href: "/informasi", color: "from-peach/20 to-transparent", icon: Info },
    { text: "Pengumuman", href: "/pengumuman", color: "from-softPink/20 to-transparent", icon: Bell }
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
              <InteractiveElement effect="float">
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-24 h-24 rounded-full bg-white/5 p-4 flex items-center justify-center backdrop-blur-md border border-white/10"
                >
                  <img
                    src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                    alt="Fish Logo"
                    className="w-16 h-16 object-contain"
                    loading="eager"
                  />
                </motion.div>
              </InteractiveElement>
              
              <InteractiveElement effect="float">
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="w-32 h-32 rounded-full bg-white/5 p-4 flex items-center justify-center backdrop-blur-md border border-white/10"
                >
                  <img
                    src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                    alt="Text Logo"
                    className="w-24 h-24 object-contain"
                    loading="eager"
                  />
                </motion.div>
              </InteractiveElement>
            </div>
            
            <ScrollAnimationWrapper animation="fadeIn" delay={0.3}>
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
            </ScrollAnimationWrapper>

            {/* Navigation Buttons with enhanced interactivity */}
            <ScrollAnimationWrapper animation="staggerChildren" delay={0.7}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto mt-8">
                {navigationItems.map((button, index) => (
                  <MicroInteraction
                    key={button.text}
                    type="button"
                    className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white font-serif text-center transition-all hover:bg-white/10 relative overflow-hidden group"
                    onClick={() => navigate(button.href)}
                  >
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
                        <button.icon className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </MicroInteraction>
                ))}
              </div>
            </ScrollAnimationWrapper>
          </div>
        </motion.div>
      </section>
    </ScrollArea>
  );
};

export default Hero;
