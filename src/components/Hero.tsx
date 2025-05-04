
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Play, Info, Bell, ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  // Enhanced animations
  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  // Navigation button variants with enhanced effects
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.7 + i * 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(255,255,255,0.2)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px rgba(255,255,255,0.15)",
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15 
      }
    }
  };

  // Enhanced navigation items
  const navigationItems = [
    { 
      text: "Jelajahi Grup", 
      href: "/groups", 
      color: "from-lavender/20 to-transparent",
      icon: Users 
    },
    { 
      text: "Mulai", 
      href: "#", 
      color: "from-mint/20 to-transparent",
      icon: Play 
    },
    { 
      text: "Informasi", 
      href: "/informasi", 
      color: "from-peach/20 to-transparent",
      icon: Info 
    },
    { 
      text: "Pengumuman", 
      href: "/pengumuman", 
      color: "from-softPink/20 to-transparent",
      icon: Bell 
    }
  ];

  return (
    <ScrollArea className="h-screen w-full">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 backdrop-blur-lg" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container max-w-5xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-12">
            {/* Enhanced Logo Container with motion effects */}
            <div className="flex items-center justify-center gap-8">
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="w-24 h-24 rounded-full bg-white/5 p-4 flex items-center justify-center backdrop-blur-md border border-white/10 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-lavender/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                <img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Fish Logo"
                  className="w-16 h-16 object-contain relative z-10"
                  loading="eager"
                />
              </motion.div>
              
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.2 }}
                className="w-32 h-32 rounded-full bg-white/5 p-4 flex items-center justify-center backdrop-blur-md border border-white/10 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-mint/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                <img
                  src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                  alt="Text Logo"
                  className="w-24 h-24 object-contain relative z-10"
                  loading="eager"
                />
              </motion.div>
            </div>
            
            <div className="text-center space-y-8">
              <motion.h1 
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight relative"
              >
                <span className="home-title inline-block">OUR CREATIVITY</span>
                <motion.span 
                  className="absolute -right-10 top-0 text-xs md:text-sm text-amber-400/80"
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 8
                  }}
                >
                  ✨
                </motion.span>
              </motion.h1>
              
              <motion.p
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-serif"
              >
                Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami dan wujudkan ide-ide Anda.
              </motion.p>
            </div>

            {/* Enhanced Navigation Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto mt-8"
            >
              {navigationItems.map((button, index) => (
                <motion.button
                  key={button.text}
                  custom={index}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => navigate(button.href)}
                  className="rounded-full px-6 py-3.5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-serif text-center transition-all hover:bg-white/10 relative overflow-hidden group"
                >
                  {/* Enhanced gradient effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${button.color} opacity-0 group-hover:opacity-100`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Show icon with enhanced animation */}
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span>{button.text}</span>
                    <motion.div
                      initial={{ opacity: 0, width: 0, scale: 0 }}
                      whileHover={{ opacity: 1, width: 'auto', scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden flex items-center"
                    >
                      <button.icon className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Subtle glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      boxShadow: "0 0 15px rgba(255,255,255,0.15) inset",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </motion.div>

            {/* Subtle scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex flex-col items-center"
              >
                <ArrowRight className="w-5 h-5 text-white/30 rotate-90" />
                <div className="text-xs text-white/30 mt-2">Scroll</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </ScrollArea>
  );
};

export default Hero;
