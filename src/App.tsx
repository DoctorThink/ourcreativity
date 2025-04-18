import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { PageTransition } from "@/components/PageTransition";
import FlowingBackground from "@/components/FlowingBackground";

// Fix capitalization to match exactly the file name
const Index = lazy(() => import("./pages/index"));
const BrandStory = lazy(() => import("./pages/BrandStory"));
const Informasi = lazy(() => import("./pages/Informasi"));
const Pengumuman = lazy(() => import("./pages/Pengumuman"));
const Terms = lazy(() => import("./pages/Terms"));
const TimKami = lazy(() => import("./pages/TimKami"));
const KaryaKami = lazy(() => import("./pages/KaryaKami").then(module => {
  // Add a small delay to ensure proper chunk loading
  return new Promise(resolve => setTimeout(() => resolve(module), 100));
}));
const OurAdmin = lazy(() => import("./pages/OurAdmin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const RequireAuth = lazy(() => import("./components/admin/RequireAuth"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-20 h-20 relative gpu-accelerated">
      <div className="absolute inset-0 rounded-full border-2 border-t-foreground/20 border-r-foreground/10 border-b-transparent border-l-foreground/10 animate-spin will-change-transform"></div>
      <div className="absolute inset-[4px] rounded-full border-2 border-t-foreground/30 border-r-transparent border-b-foreground/10 border-l-transparent animate-spin will-change-transform" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-foreground/5 backdrop-blur-xl flex items-center justify-center">
          <img
            src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
            alt="Logo"
            className="w-6 h-6 object-contain animate-pulse"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </div>
);

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('Failed to fetch dynamically imported module')) {
        setHasError(true);
        // Attempt to reload the chunk
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-4">Loading Error</h2>
          <p className="text-muted-foreground mb-4">An error occurred while loading the page. Retrying...</p>
          <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <ErrorBoundary>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/brand-story" element={<PageTransition><BrandStory /></PageTransition>} />
          <Route path="/informasi" element={<PageTransition><Informasi /></PageTransition>} />
          <Route path="/pengumuman" element={<PageTransition><Pengumuman /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
          <Route path="/tim-kami" element={<PageTransition><TimKami /></PageTransition>} />
          <Route path="/karya-kami" element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <KaryaKami />
              </Suspense>
            </PageTransition>
          } />
          <Route path="/admin-login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/our-admin" element={
            <PageTransition>
              <RequireAuth>
                <OurAdmin />
              </RequireAuth>
            </PageTransition>
          } />
        </Routes>
      </ErrorBoundary>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30,   // 30 minutes
    },
  },
});

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  
  useEffect(() => {
    const preloadAssets = async () => {
      const timer = setTimeout(() => {
        setIsAppReady(true);
      }, 300);
      
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
            <div className="app-container gpu-accelerated">
              {/* Global FlowingBackground visible on all pages */}
              <FlowingBackground />
              <BrowserRouter>
                {isAppReady ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <AnimatedRoutes />
                  </Suspense>
                ) : (
                  <LoadingFallback />
                )}
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
