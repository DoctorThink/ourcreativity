// --- START OF FILE PageLayout.tsx ---

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { ArrowLeft, Instagram, ExternalLink } from "lucide-react"; // Instagram is imported but not used, can be removed if not needed later
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming this custom hook exists
import { cn } from "@/lib/utils"; // Assuming this utility function exists
import FlowingBackground from "@/components/FlowingBackground"; // Assuming this component exists

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
      className="min-h-screen overflow-hidden relative perspective-1000 gpu-accelerated bg-background dark:bg-background-dark" // Assuming dark:bg-background-dark is defined in your Tailwind config
    >
      {/* Add our FlowingBackground component */}
      <FlowingBackground />
      
      {/* Enhanced Dynamic Background with improved visual quality */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Improved blurred elements */}
        <motion.div
          className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] bg-foreground/5 dark:bg-foreground-dark/5 -top-[20%] -right-[20%]" // Added dark mode variant
          style={{
            y: -scrollPosition * 0.03,
            willChange: "transform"
          }}
        />
        <motion.div
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-foreground/5 dark:bg-foreground-dark/5 -bottom-[10%] -left-[10%]" // Added dark mode variant
          style={{
            y: scrollPosition * 0.03,
            willChange: "transform"
          }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.015] dark:via-foreground-dark/[0.015] to-transparent opacity-30" />

        {/* Improved grid overlay - ensure foreground/foreground-dark are suitable for grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground-rgb),0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(var(--foreground-dark-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground-dark-rgb),0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{
            transform: `translateY(${scrollPosition * 0.01}px)`
            // CSS variables --foreground-rgb and --foreground-dark-rgb should be defined in your global CSS
            // e.g., :root { --foreground-rgb: 0,0,0; } .dark { --foreground-dark-rgb: 255,255,255; }
          }}
        />

        {/* Subtle 3D layered lines */}
        <motion.div
          className="absolute left-[5%] top-[10%] w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-foreground/10 dark:via-foreground-dark/10 to-transparent gpu-accelerated"
          style={{
            y: -scrollPosition * 0.04,
            opacity: 1 - (scrollPosition * 0.0005)
          }}
        />
        <motion.div
          className="absolute right-[10%] top-[20%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-foreground/5 dark:via-foreground-dark/5 to-transparent gpu-accelerated"
          style={{
            y: -scrollPosition * 0.06,
            opacity: 1 - (scrollPosition * 0.0008)
          }}
        />
        <motion.div
          className="absolute left-[20%] bottom-[10%] w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-foreground/10 dark:via-foreground-dark/10 to-transparent gpu-accelerated"
          style={{
            y: scrollPosition * 0.03,
            opacity: 1 - (scrollPosition * 0.0005)
          }}
        />
      </div>

      {/* Enhanced Header with Logo */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 dark:bg-background-dark/60 p-4 border-b border-foreground/5 dark:border-foreground-dark/5 shadow-md shadow-black/5 dark:shadow-black/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {showBackButton && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => navigate("/")} // Assuming home is "/"
              className="flex items-center space-x-2 text-foreground/60 dark:text-foreground-dark/60 hover:text-foreground dark:hover:text-foreground-dark transition-colors gpu-accelerated group"
              whileHover={{ x: -3, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Kembali ke halaman sebelumnya"
            >
              <ArrowLeft className="w-5 h-5 group-hover:text-foreground dark:group-hover:text-foreground-dark transition-colors" />
              <span className="group-hover:text-foreground dark:group-hover:text-foreground-dark transition-colors">Kembali</span>
            </motion.button>
          )}

          <div className={cn("flex items-center gap-2", !showBackButton && "mx-auto")}> {/* Center logos if no back button */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-foreground/5 dark:bg-foreground-dark/5 p-1 flex items-center justify-center backdrop-blur-md border border-foreground/10 dark:border-foreground-dark/10 shadow-lg shadow-black/10 dark:shadow-black/20 gpu-accelerated"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Replace with your actual logo path
                alt="Logo Icon"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              whileHover={{ rotate: -5, scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-foreground/5 dark:bg-foreground-dark/5 p-1 flex items-center justify-center backdrop-blur-md border border-foreground/10 dark:border-foreground-dark/10 shadow-lg shadow-black/10 dark:shadow-black/20 gpu-accelerated"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png" // Replace with your actual text logo path
                alt="Logo Text"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
          </div>
          {showBackButton && <div className="w-auto" style={{minWidth: "90px"}}></div>} {/* Spacer to balance header if back button is present */}

        </div>
      </header>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 sm:pb-8 relative z-10">
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit" // This might cause issues if not wrapped in AnimatePresence at route level
          className="space-y-12"
        >
          {(title || subtitle) && (
            <div className="text-center space-y-4">
              {title && (
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground dark:text-foreground-dark text-shadow-lg gpu-accelerated"
                  variants={titleVariants}
                  style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.3), 0px 0px 1px rgba(0,0,0,0.2)' }} // Adjusted shadow
                >
                  {title}
                </motion.h1>
              )}

              {subtitle && (
                <motion.p
                  className="text-lg md:text-xl text-foreground/70 dark:text-foreground-dark/70 leading-relaxed max-w-3xl mx-auto" // Removed text-readable, text-sharp as they are not standard Tailwind
                  variants={subtitleVariants}
                >
                  {subtitle}
                </motion.p>
              )}

              <motion.div
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 dark:via-foreground-dark/30 to-transparent mx-auto mt-6 sm:mt-8 gpu-accelerated"
                variants={decorativeLineVariants}
              />
            </div>
          )}

          {children}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="mt-20 sm:mt-24 mb-8 text-center gpu-accelerated"
        >
          <motion.div
            className="bg-background/70 dark:bg-background-dark/70 backdrop-blur-md border border-foreground/10 dark:border-foreground-dark/10 rounded-full px-4 py-2.5 inline-block relative overflow-hidden group shadow-lg shadow-black/5 dark:shadow-black/10"
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.2 }}
          >
            {/* Subtle hover gradient effect using your theme colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-amethyst/5 via-emerald/5 to-coral/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--foreground-rgb),0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(var(--foreground-dark-rgb),0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            <p className={cn(
              "text-xs text-foreground/60 dark:text-foreground-dark/60 font-sans flex flex-wrap items-center justify-center",
              isMobile ? "flex-col gap-y-1" : "gap-x-1.5"
            )}>
              <span>© {new Date().getFullYear()} OUR CREATIVITY</span> {/* Dynamic Year */}
              <span className={isMobile ? 'hidden' : 'mx-1'}>•</span>
              <span className="flex items-center gap-1.5">
                Designed by
                <a
                  href="https://bit.ly/ardelyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-foreground/80 dark:text-foreground-dark/80 hover:text-foreground dark:hover:text-foreground-dark transition-colors duration-200 group/link"
                  aria-label="Designed by ardel.yo (opens in new tab)"
                >
                  <span className="transition-all duration-200 group-hover/link:text-amethyst dark:group-hover/link:text-amethyst group-hover/link:[text-shadow:0_0_6px_var(--tw-shadow-color)] shadow-amethyst/50">@ardel.yo</span>
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

// --- END OF FILE PageLayout.tsx ---
