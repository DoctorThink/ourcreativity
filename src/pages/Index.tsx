
import { motion } from "framer-motion";
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
  
  // Handle scroll to reveal navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > window.innerHeight * 0.3);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Navigation items
  const navigationItems = [
    { icon: BookOpen, text: "Brand Story", href: "/brand-story" },
    { icon: Users, text: "Our Team", href: "/tim-kami" },
    { icon: ScrollText, text: "Terms", href: "/terms" },
    { icon: Info, text: "Information", href: "/informasi" },
    { icon: Bell, text: "Announcements", href: "/pengumuman" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
              className="flex items-center justify-center gap-6 mb-10"
            >
              <div className="w-20 h-20 bg-surface rounded-full border border-border p-4 flex items-center justify-center">
                <img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Fish Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              
              <div className="w-28 h-28 bg-surface rounded-full border border-border p-4 flex items-center justify-center">
                <img
                  src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                  alt="Text Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gradient font-extrabold tracking-tight mb-6"
            >
              OUR CREATIVITY
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-foreground-muted max-w-lg mx-auto mb-12 text-balance"
            >
              Where imagination meets innovation. Join our creative community and bring your ideas to life.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <div className="animate-bounce flex flex-col items-center text-foreground-subtle">
                <span className="block mb-2 text-sm">Scroll to Explore</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Navigation Section */}
        <section className="py-section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isScrolled ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl mx-auto"
          >
            {navigationItems.map(({ icon: Icon, text, href }) => (
              <motion.div
                key={text}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={() => navigate(href)}
                  className="w-full h-24 bg-surface border border-border hover:border-accent-blue/50 hover:bg-surface-hover rounded-lg transition-all flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-10 h-10 rounded-md bg-surface-hover flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="py-6 mt-auto text-center"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-border text-foreground-subtle text-xs">
            &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
