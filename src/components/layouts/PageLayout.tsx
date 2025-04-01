
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showBackButton?: boolean;
}

const PageLayout = ({ 
  title,
  subtitle,
  children,
  showBackButton = true,
}: PageLayoutProps) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: scrollRef,
    offset: ["start start", "end end"] 
  });
  
  // Parallax effects
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -20]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  return (
    <div className="min-h-screen overflow-hidden relative perspective-1000">
      {/* Topographical Background */}
      <div className="fixed inset-0 bg-background -z-10">
        {/* Base patterns */}
        <div className="absolute inset-0 geo-topo-pattern opacity-20" />
        <div className="absolute inset-0 contour-pattern opacity-10" />
        
        {/* Curved layers */}
        <motion.div 
          className="absolute w-[120vw] h-[35vh] -left-[10vw] top-[65vh] rounded-topo topo-layer-1"
          style={{ y: layer1Y }}
        />
        <motion.div 
          className="absolute w-[130vw] h-[40vh] -right-[15vw] top-[70vh] rounded-topo topo-layer-2"
          style={{ y: layer2Y }}
        />
        
        {/* Connection nodes */}
        <div className="absolute left-[15%] top-[20%] w-2 h-2 rounded-full bg-tone-300/20 animate-pulse-soft" />
        <div className="absolute right-[20%] top-[30%] w-3 h-3 rounded-full bg-tone-300/30 animate-pulse-soft" style={{ animationDelay: "-2s" }} />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path 
            d="M15%,20% Q30%,40% 20%,60%" 
            className="connection-line" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.path 
            d="M80%,30% Q65%,45% 70%,65%" 
            className="connection-line" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </svg>
      </div>
      
      {/* Header with Logo */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-tone-900/40 border-b border-tone-800/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-4 md:px-8">
          {showBackButton && (
            <motion.button 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-tone-400 hover:text-tone-100 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm relative tracking-wide">
                BACK
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-[1px] bg-tone-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.button>
          )}
          
          <div className="flex items-center gap-3 ml-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-full bg-tone-900/60 p-1 flex items-center justify-center backdrop-blur-md border border-tone-800/40 shadow-lg"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-8 h-8 rounded-full bg-tone-900/60 p-1 flex items-center justify-center backdrop-blur-md border border-tone-800/40 shadow-lg"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="max-w-5xl mx-auto px-4 py-16" ref={scrollRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Title Section with enhanced typography */}
            {(title || subtitle) && (
              <motion.div 
                className="text-center space-y-6"
                style={{ y: titleY, opacity: titleOpacity }}
              >
                {title && (
                  <motion.h1 
                    className="display-large text-3d"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    data-text={title}
                  >
                    {title}
                  </motion.h1>
                )}
                
                {subtitle && (
                  <motion.p 
                    className="text-lg md:text-xl text-tone-400 leading-relaxed max-w-3xl mx-auto font-mono tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    <span className="relative">
                      {subtitle}
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-tone-700"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                      />
                    </span>
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10 topo-layer-1 rounded-topo p-6 md:p-10 backdrop-blur-md bg-tone-900/30 border border-tone-800/20"
            >
              <div className="absolute inset-0 contour-pattern opacity-10 rounded-topo" />
              <div className="relative z-10">
                {children}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Credits Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-24 mb-8 text-center"
          >
            <div className="bg-tone-900/30 backdrop-blur-md border border-tone-800/20 rounded-full px-4 py-2 inline-block">
              <p className="text-xs text-tone-500 font-mono tracking-wide">
                &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
              </p>
            </div>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PageLayout;
