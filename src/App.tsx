
import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Improved lazy loading with dynamic imports
const Index = lazy(() => import("./pages/Index"));
const BrandStory = lazy(() => import("./pages/BrandStory"));
const Informasi = lazy(() => import("./pages/Informasi"));
const Pengumuman = lazy(() => import("./pages/Pengumuman"));
const Terms = lazy(() => import("./pages/Terms"));
const TimKami = lazy(() => import("./pages/TimKami"));

// Enhanced loading component with topographical design
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background perspective-1000">
    {/* Topographical background */}
    <div className="absolute inset-0 contour-pattern opacity-10" />
    
    {/* Centered loading indicator */}
    <div className="w-24 h-24 relative">
      {/* Animated layers */}
      <div className="absolute inset-0 rounded-full border-2 border-t-tone-400/20 border-r-tone-400/10 border-b-transparent border-l-tone-400/10 animate-spin"></div>
      <div className="absolute inset-[4px] rounded-full border-2 border-t-tone-400/30 border-r-transparent border-b-tone-400/10 border-l-transparent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      
      {/* Logo container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-tone-900 backdrop-blur-xl flex items-center justify-center border border-tone-800/50 shadow-lg shadow-black/20">
          <img
            src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
            alt="Logo"
            className="w-8 h-8 object-contain animate-pulse"
          />
        </div>
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.ellipse 
          cx="50%" 
          cy="50%" 
          rx="45%" 
          ry="45%" 
          className="connection-line"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        />
      </svg>
    </div>
    
    {/* Loading text */}
    <div className="absolute bottom-20 left-0 right-0 text-center">
      <p className="font-mono text-xs text-tone-500 tracking-widest animate-pulse">LOADING</p>
    </div>
  </div>
);

// Create a single QueryClient instance with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    },
  },
});

const App = () => {
  // State to track if the app is ready
  const [isAppReady, setIsAppReady] = useState(false);
  
  // Simulate preloading critical resources
  useEffect(() => {
    // Preload essential assets
    const preloadAssets = async () => {
      // Add a slight delay to ensure smooth animations
      const timer = setTimeout(() => {
        setIsAppReady(true);
      }, 800);
      
      return () => clearTimeout(timer);
    };
    
    preloadAssets();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {isAppReady ? (
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/brand-story" element={<BrandStory />} />
                  <Route path="/informasi" element={<Informasi />} />
                  <Route path="/pengumuman" element={<Pengumuman />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/tim-kami" element={<TimKami />} />
                </Routes>
              </Suspense>
            ) : (
              <LoadingFallback />
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
