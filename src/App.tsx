
import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Lazy load pages for better performance - only Index loads immediately
import Index from "./pages/Index";

// Lazy load other pages to reduce initial bundle size
const CeritaKami = lazy(() => import("./pages/CeritaKami"));
const Informasi = lazy(() => import("./pages/Informasi"));
const Pengumuman = lazy(() => import("./pages/Pengumuman"));
const TimKami = lazy(() => import("./pages/TimKami"));
const Terms = lazy(() => import("./pages/Terms"));
const KaryaKami = lazy(() => import("./pages/KaryaKami"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const OurAdmin = lazy(() => import("./pages/OurAdmin"));

// Importing components
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import { gsap } from "gsap";
import { trackWebVitals, preloadCriticalResources } from "./utils/performance";

// Create React Query client with retry configuration for better reliability
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

import { PageTransition } from "./components/PageTransition";
import { AnimatePresence } from "framer-motion";
import { GlobalAnimations } from "./components/GlobalAnimations";
import { GlobalLoader } from "./components/GlobalLoader";
import { LazyPageLoader } from "./components/LazyPageLoader";
import RequireAuth from "./components/features/admin/RequireAuth";

// Create AppContent component that uses router hooks
function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin();
    
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'production') {
      trackWebVitals();
    }
    
    // Preload critical resources
    preloadCriticalResources();
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Show loader on initial load
  if (isLoading) {
    return <GlobalLoader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <>
      {/* Apply minimal global elements for performance */}
      <GlobalAnimations />
      
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Suspense fallback={<LazyPageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/cerita-kami" element={<CeritaKami />} />
              <Route path="/brand-story" element={<CeritaKami />} /> {/* Keep old route for backward compatibility */}
              <Route path="/informasi" element={<Informasi />} />
              <Route path="/pengumuman" element={<Pengumuman />} />
              <Route path="/tim-kami" element={<TimKami />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/karya-kami" element={<KaryaKami />} />
              
              {/* Admin routes with proper protection */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/our-admin" element={
                <RequireAuth>
                  <OurAdmin />
                </RequireAuth>
              } />
              <Route path="/admin" element={
                <RequireAuth>
                  <OurAdmin />
                </RequireAuth>
              } />
            </Routes>
          </Suspense>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}

// Main App component that provides context
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AdminAuthProvider>
          <Router>
            <AppContent />
            <Toaster />
          </Router>
        </AdminAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
