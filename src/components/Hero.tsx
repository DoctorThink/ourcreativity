
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Play, Info, Bell } from "lucide-react";

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

  // Optimized navigation items
  const navigationItems = [
    { text: "Jelajahi Grup", href: "/groups", color: "from-lavender/20 to-transparent" },
    { text: "Mulai", href: "#", color: "from-mint/20 to-transparent" },
    { text: "Informasi", href: "/informasi", color: "from-peach/20 to-transparent" },
    { text: "Pengumuman", href: "/pengumuman", color: "from-softPink/20 to-transparent" }
  ];

  return (
    <ScrollArea className="h-screen w-full">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 backdrop-blur-lg" />
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container max-w-7xl mx-auto relative z-10"
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

            {/* Navigation Buttons with simplified animations */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mx-auto mt-6"
            >
              {navigationItems.map((button, index) => (
                <motion.button
                  key={button.text}
                  onClick={() => navigate(button.href)}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 0 12px rgba(255,255,255,0.15)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-full px-4 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-sans text-center transition-all hover:bg-white/10 relative overflow-hidden group`}
                >
                  {/* Interactive gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${button.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Show little icon on hover */}
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="text-sm md:text-base">{button.text}</span>
                    <motion.span 
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      whileHover={{ opacity: 1, width: "auto", marginLeft: 6 }}
                      className="overflow-hidden"
                    >
                      {index === 0 && <Users className="w-3.5 h-3.5" />}
                      {index === 1 && <Play className="w-3.5 h-3.5" />}
                      {index === 2 && <Info className="w-3.5 h-3.5" />}
                      {index === 3 && <Bell className="w-3.5 h-3.5" />}
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
