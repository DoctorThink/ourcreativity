
import { Suspense, lazy, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { PageTransition } from "@/components/PageTransition";

// Improved lazy loading with dynamic imports
const Index = lazy(() => import("./pages/Index"));
const BrandStory = lazy(() => import("./pages/BrandStory"));
const Informasi = lazy(() => import("./pages/Informasi"));
const Pengumuman = lazy(() => import("./pages/Pengumuman"));
const Terms = lazy(() => import("./pages/Terms"));
const TimKami = lazy(() => import("./pages/TimKami"));
const OurAdmin = lazy(() => import("./pages/OurAdmin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const RequireAuth = lazy(() => import("./components/admin/RequireAuth"));

// Enhanced loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-20 h-20 relative">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-t-foreground/20 border-r-foreground/10 border-b-transparent border-l-foreground/10 animate-spin"></div>
      
      {/* Middle ring */}
      <div className="absolute inset-[4px] rounded-full border-2 border-t-foreground/30 border-r-transparent border-b-foreground/10 border-l-transparent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      
      {/* Inner content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-foreground/5 backdrop-blur-xl flex items-center justify-center">
          <img
            src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
            alt="Logo"
            className="w-6 h-6 object-contain animate-pulse"
          />
        </div>
      </div>
    </div>
  </div>
);

// AnimatedRoutes component for handling route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/brand-story" element={<PageTransition><BrandStory /></PageTransition>} />
        <Route path="/informasi" element={<PageTransition><Informasi /></PageTransition>} />
        <Route path="/pengumuman" element={<PageTransition><Pengumuman /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/tim-kami" element={<PageTransition><TimKami /></PageTransition>} />
        <Route path="/admin-login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/our-admin" element={
          <PageTransition>
            <RequireAuth>
              <OurAdmin />
            </RequireAuth>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

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
      }, 500);
      
      return () => clearTimeout(timer);
    };
    
    preloadAssets();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {isAppReady ? (
                <Suspense fallback={<LoadingFallback />}>
                  <AnimatedRoutes />
                </Suspense>
              ) : (
                <LoadingFallback />
              )}
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
