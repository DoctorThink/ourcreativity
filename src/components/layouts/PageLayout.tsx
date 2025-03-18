
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";
import InteractiveElement from "@/components/ui/InteractiveElement";
import MicroInteraction from "@/components/ui/MicroInteraction";

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

  // Track scroll position to implement dynamic color schemes
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate dynamic background opacity based on scroll
  const backgroundOpacity = Math.min(0.8, 0.4 + (scrollPosition / 1000));
  const blurAmount = Math.min(20, 10 + (scrollPosition / 100));

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Dynamic Background with geometric elements */}
      <div className="fixed inset-0 bg-background -z-10 transition-all duration-500">
        {/* Geometric decorative elements with dynamic properties */}
        <div 
          className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] -top-[20%] -right-[20%] transition-all duration-1000" 
          style={{ 
            backgroundColor: `rgba(155, 109, 255, ${0.05 + (scrollPosition / 10000)})`,
            transform: `translateY(${scrollPosition * 0.05}px) rotate(${scrollPosition * 0.01}deg)`
          }}
        />
        <div 
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] -bottom-[10%] -left-[10%] transition-all duration-1000" 
          style={{ 
            backgroundColor: `rgba(64, 224, 208, ${0.05 + (scrollPosition / 12000)})`,
            transform: `translateY(${-scrollPosition * 0.03}px)`
          }}
        />
        
        {/* Enhanced Grid overlay with dynamic properties */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] transition-opacity duration-1000" 
          style={{ 
            opacity: 0.1 + (scrollPosition / 5000),
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)'
          }}
        />
        
        {/* Morphing blob backgrounds that move with scroll */}
        <div 
          className="absolute left-[10%] top-[30%] w-[20vw] h-[20vw] morphing-blob opacity-5 transition-all duration-700"
          style={{ 
            transform: `translateY(${scrollPosition * 0.1}px) rotate(${scrollPosition * 0.02}deg)`,
            background: `radial-gradient(circle, rgba(155, 109, 255, 0.3) 0%, rgba(155, 109, 255, 0) 70%)` 
          }}
        />
        <div 
          className="absolute right-[15%] bottom-[20%] w-[25vw] h-[25vw] morphing-blob opacity-5 transition-all duration-700"
          style={{ 
            transform: `translateY(${-scrollPosition * 0.05}px) rotate(${-scrollPosition * 0.01}deg)`,
            background: `radial-gradient(circle, rgba(64, 224, 208, 0.3) 0%, rgba(64, 224, 208, 0) 70%)` 
          }}
        />
      </div>
      
      {/* Header with Logo - dynamic backdrop-blur based on scroll */}
      <header 
        className="sticky top-0 z-50 p-4 border-b border-foreground/5 transition-all duration-300"
        style={{ 
          backdropFilter: `blur(${blurAmount}px)`,
          backgroundColor: `rgba(28, 28, 30, ${backgroundOpacity})`
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {showBackButton && (
            <MicroInteraction type="link">
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Kembali</span>
              </motion.button>
            </MicroInteraction>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <InteractiveElement effect="float">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 rounded-full bg-foreground/5 p-1 flex items-center justify-center backdrop-blur-md border border-foreground/10"
              >
                <img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="Logo"
                  className="w-6 h-6 object-contain"
                  loading="eager"
                />
              </motion.div>
            </InteractiveElement>
            <InteractiveElement effect="float">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-8 h-8 rounded-full bg-foreground/5 p-1 flex items-center justify-center backdrop-blur-md border border-foreground/10"
              >
                <img
                  src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                  alt="Text Logo"
                  className="w-6 h-6 object-contain"
                  loading="eager"
                />
              </motion.div>
            </InteractiveElement>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-72px)]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <ScrollAnimationWrapper animation="fadeIn" duration={0.6}>
            <div className="space-y-12">
              {/* Title Section with enhanced typography */}
              {(title || subtitle) && (
                <div className="text-center space-y-4">
                  {title && (
                    <ScrollAnimationWrapper animation="slideUp" delay={0.2} duration={0.7}>
                      <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">{title}</span>
                      </h1>
                    </ScrollAnimationWrapper>
                  )}
                  
                  {subtitle && (
                    <ScrollAnimationWrapper animation="fadeIn" delay={0.4} duration={0.7}>
                      <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
                        {subtitle}
                      </p>
                    </ScrollAnimationWrapper>
                  )}
                  
                  {/* Decorative line with animation */}
                  <motion.div 
                    className="w-16 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mt-8"
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>
              )}

              {/* Main Content */}
              <ScrollAnimationWrapper animation="fadeIn" delay={0.5} duration={0.8}>
                {children}
              </ScrollAnimationWrapper>
            </div>

            {/* Enhanced Credits Footer */}
            <ScrollAnimationWrapper animation="fadeIn" delay={0.8} duration={0.5}>
              <div className="mt-24 mb-8 text-center">
                <InteractiveElement effect="glow">
                  <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-full px-4 py-2 inline-block">
                    <p className="text-xs text-foreground/50">
                      &copy; 2024 OUR CREATIVITY • Designed by Ardellio S. A.
                    </p>
                  </div>
                </InteractiveElement>
              </div>
            </ScrollAnimationWrapper>
          </ScrollAnimationWrapper>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PageLayout;
