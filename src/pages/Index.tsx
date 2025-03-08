
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Play, Info, Bell, BookOpen } from "lucide-react";
import { lazy, Suspense } from "react";

// Lazy load components to improve initial loading time
const LazyHero = lazy(() => import("@/components/Hero"));

const Index = () => {
  const navigate = useNavigate();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Navigation items with optimized rendering
  const navigationItems = [
    { icon: BookOpen, text: "Cerita Kami", href: "/brand-story", color: "bg-lavender/10" },
    { icon: Play, text: "Mulai", href: "#", color: "bg-mint/10" },
    { icon: Info, text: "Informasi", href: "/informasi", color: "bg-peach/10" },
    { icon: Bell, text: "Pengumuman", href: "/pengumuman", color: "bg-softPink/10" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      {/* Performance optimized background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black to-zinc-900 -z-10" />

      {/* Main Content with optimized rendering */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {/* Logo Container with Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200, // Reduced for better performance
            damping: 20,
            duration: 1.2
          }}
          className="flex gap-6 mb-12"
        >
          <div className="w-24 h-24 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
              alt="Fish Logo"
              className="w-16 h-16 object-contain"
              loading="eager" // Ensure this loads immediately
            />
          </div>
          <div className="w-32 h-32 rounded-full bg-white/5 p-4 flex items-center justify-center animate-float backdrop-blur-md border border-white/10">
            <img
              src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
              alt="Text Logo"
              className="w-24 h-24 object-contain"
              loading="eager" // Ensure this loads immediately
            />
          </div>
        </motion.div>

        {/* Title with Optimized Glow Effect */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6 text-center glow-text"
        >
          OUR CREATIVITY
        </motion.h1>

        {/* Description with better animation */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-12 font-serif"
        >
          Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.
        </motion.p>

        {/* Interactive Navigation Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto"
        >
          {navigationItems.map(({ icon: Icon, text, href, color }) => (
            <motion.div
              key={text}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate(href)}
                variant="secondary"
                className={`w-full h-full min-h-[80px] rounded-2xl ${color} backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300 group overflow-hidden relative`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                <Icon className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="text-sm font-serif transition-transform duration-300 group-hover:translate-y-1">{text}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
