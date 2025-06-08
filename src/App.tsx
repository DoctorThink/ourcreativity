
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importing pages with normal imports instead of dynamic imports
import Index from "./pages/Index";
import CeritaKami from "./pages/CeritaKami";
import Informasi from "./pages/Informasi";
import Pengumuman from "./pages/Pengumuman";
import TimKami from "./pages/TimKami";
import Terms from "./pages/Terms";
import KaryaKami from "./pages/KaryaKami";
import AdminLogin from "./pages/AdminLogin";
import OurAdmin from "./pages/OurAdmin";

// Importing components
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

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

import { GSAPPageTransition } from "./components/animations/GSAPPageTransition";
import { GSAPLoadingScreen } from "./components/animations/GSAPLoadingScreen";
import { AnimatePresence } from "framer-motion";
import { CustomCursor } from "./components/karya/CustomCursor";
import { ScrollProgressIndicator } from "./components/karya/ScrollProgressIndicator";
import RequireAuth from "./components/admin/RequireAuth";

// Create AppContent component that uses router hooks
function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading screen completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading screen on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <GSAPLoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      {/* Apply global design elements */}
      <CustomCursor />
      <ScrollProgressIndicator />
      
      <AnimatePresence mode="wait">
        <GSAPPageTransition key={location.pathname}>
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
        </GSAPPageTransition>
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
