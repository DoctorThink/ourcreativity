import React, { Suspense, lazy, useState, useEffect, ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { PageTransition } from "@/components/PageTransition";

// Improved lazy loading with retry logic and proper typing
const retryLoadComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): Promise<{ default: T }> => {
  return new Promise((resolve, reject) => {
    const maxRetries = 2;
    let retries = 0;

    const attempt = () => {
      importFn()
        .then(resolve)
        .catch((error) => {
          retries++;
          if (retries <= maxRetries) {
            setTimeout(attempt, 1000 * retries); // Exponential backoff
          } else {
            reject(error);
          }
        });
    };

    attempt();
  });
};

// Lazy load components with retry logic
const Index = lazy(() => retryLoadComponent(() => import("./pages/Index")));
const BrandStory = lazy(() => retryLoadComponent(() => import("./pages/BrandStory")));
const Informasi = lazy(() => retryLoadComponent(() => import("./pages/Informasi")));
const Pengumuman = lazy(() => retryLoadComponent(() => import("./pages/Pengumuman")));
const Terms = lazy(() => retryLoadComponent(() => import("./pages/Terms")));
const TimKami = lazy(() => retryLoadComponent(() => import("./pages/TimKami")));
const KaryaKami = lazy(() => retryLoadComponent(() => import("./pages/KaryaKami")));
const OurAdmin = lazy(() => retryLoadComponent(() => import("./pages/OurAdmin")));
const AdminLogin = lazy(() => retryLoadComponent(() => import("./pages/AdminLogin")));
const RequireAuth = lazy(() => retryLoadComponent(() => import("./components/admin/RequireAuth")));

// Enhanced loading fallback with error state
const LoadingFallback = ({ error }: { error?: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    {error ? (
      <div className="text-center space-y-4">
        <p className="text-rose-500">Failed to load the page. Please try again.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-foreground/10 hover:bg-foreground/20 rounded-full text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    ) : (
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
    )}
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Page loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <LoadingFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <ErrorBoundary>
            <PageTransition><Index /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/brand-story" element={
          <ErrorBoundary>
            <PageTransition><BrandStory /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/informasi" element={
          <ErrorBoundary>
            <PageTransition><Informasi /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/pengumuman" element={
          <ErrorBoundary>
            <PageTransition><Pengumuman /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/terms" element={
          <ErrorBoundary>
            <PageTransition><Terms /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/tim-kami" element={
          <ErrorBoundary>
            <PageTransition><TimKami /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/karya-kami" element={
          <ErrorBoundary>
            <PageTransition><KaryaKami /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/admin-login" element={
          <ErrorBoundary>
            <PageTransition><AdminLogin /></PageTransition>
          </ErrorBoundary>
        } />
        <Route path="/our-admin" element={
          <ErrorBoundary>
            <PageTransition>
              <RequireAuth>
                <OurAdmin />
              </RequireAuth>
            </PageTransition>
          </ErrorBoundary>
        } />
      </Routes>
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
              <BrowserRouter>
                <ErrorBoundary>
                  {isAppReady ? (
                    <Suspense fallback={<LoadingFallback />}>
                      <AnimatedRoutes />
                    </Suspense>
                  ) : (
                    <LoadingFallback />
                  )}
                </ErrorBoundary>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
