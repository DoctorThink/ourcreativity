// --- START OF FILE PageLayout.tsx ---

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { ArrowLeft, Instagram, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import FlowingBackground from "@/components/FlowingBackground";

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
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Use passive listener for better scroll performance on the window
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced animated variants with smoother transitions
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: "easeOut" } }
  };

  const subtitleVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15, ease: "easeOut" } }
  };

  const decorativeLineVariants = {
    initial: { width: 0 },
    animate: { width: "4rem", transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen overflow-hidden relative perspective-1000 gpu-accelerated bg-background"
    >
      {/* Add our new FlowingBackground component */}
      <FlowingBackground />
      
      {/* Enhanced Dynamic Background with improved visual quality */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Improved blurred elements */}
        <motion.div
          className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] bg-foreground/3 -top-[20%] -right-[20%]"
          style={{
            y: -scrollPosition * 0.03,
            willChange: "transform"
          }}
        />
        <motion.div
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-foreground/2 -bottom-[10%] -left-[10%]"
          style={{
            y: scrollPosition * 0.03,
            willChange: "transform"
          }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent opacity-30" />

        {/* Improved grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{
            transform: `translateY(${scrollPosition * 0.01}px)`
          }}
        />

        {/* Subtle 3D layered lines */}
        <motion.div
          className="absolute left-[5%] top-[10%] w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-foreground/5 to-transparent gpu-accelerated"
          style={{
            y: -scrollPosition * 0.04,
            opacity: 1 - (scrollPosition * 0.0005)
          }}
        />
        <motion.div
          className="absolute right-[10%] top-[20%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-foreground/3 to-transparent gpu-accelerated"
          style={{
            y: -scrollPosition * 0.06,
            opacity: 1 - (scrollPosition * 0.0008)
          }}
        />
        <motion.div
          className="absolute left-[20%] bottom-[10%] w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-foreground/5 to-transparent gpu-accelerated"
          style={{
            y: scrollPosition * 0.03,
            opacity: 1 - (scrollPosition * 0.0005)
          }}
        />
      </div>

      {/* Enhanced Header with Logo */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/40 p-4 border-b border-foreground/5 shadow-md shadow-black/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {showBackButton && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors gpu-accelerated group"
              whileHover={{ x: -3, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:text-foreground transition-colors" />
              <span className="group-hover:text-foreground transition-colors">Kembali</span>
            </motion.button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-foreground/5 p-1 flex items-center justify-center backdrop-blur-md border border-foreground/10 shadow-lg shadow-black/20 gpu-accelerated"
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
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              whileHover={{ rotate: -5, scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-foreground/5 p-1 flex items-center justify-center backdrop-blur-md border border-foreground/10 shadow-lg shadow-black/20 gpu-accelerated"
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

      {/* Content flows directly, removed ScrollArea */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-4 sm:pb-8">
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-12"
        >
          {(title || subtitle) && (
            <div className="text-center space-y-4">
              {title && (
                <motion.h1
                  className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground text-shadow-lg gpu-accelerated text-sharp"
                  variants={titleVariants}
                  style={{ textShadow: '0px 4px 8px rgba(0,0,0,0.5)' }}
                >
                  {title}
                </motion.h1>
              )}

              {subtitle && (
                <motion.p
                  className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto text-readable text-sharp"
                  variants={subtitleVariants}
                >
                  {subtitle}
                </motion.p>
              )}

              <motion.div
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mt-8 gpu-accelerated"
                variants={decorativeLineVariants}
              />
            </div>
          )}

          {children}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="mt-24 mb-8 text-center gpu-accelerated"
        >
          <motion.div
            className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-full px-4 py-2.5 inline-block relative overflow-hidden group shadow-lg shadow-black/10"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amethyst/5 via-emerald/5 to-amethyst/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>

            <p className={cn(
              "text-xs text-foreground/60 font-sans flex flex-wrap items-center justify-center",
              isMobile ? "flex-col gap-y-1" : "gap-x-1.5"
            )}>
              <span>© 2024 OUR CREATIVITY</span>
              <span className={isMobile ? 'hidden' : 'mx-1'}>•</span>
              <span className="flex items-center gap-1.5">
                Designed by
                <a
                  href="https://bit.ly/ardelyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors duration-200 group/link"
                  aria-label="Designed by ardel.yo (opens in new tab)"
                >
                  <span className="transition-all duration-200 group-hover/link:text-white group-hover/link:[text-shadow:0_0_8px_rgba(255,255,255,0.7)]">@ardel.yo</span>
                  <ExternalLink size={10} className="inline-block opacity-70 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLayout;
