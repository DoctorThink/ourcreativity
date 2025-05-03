
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importing pages with normal imports instead of dynamic imports
import Index from "./pages/index";
import BrandStory from "./pages/BrandStory";
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

// Create React Query client
const queryClient = new QueryClient();

import { PageTransition } from "./components/PageTransition";
import { AnimatePresence } from "framer-motion";
import { CustomCursor } from "./components/karya/CustomCursor";
import { ScrollProgressIndicator } from "./components/karya/ScrollProgressIndicator";
import { ParticleBackground } from "./components/karya/ParticleBackground";
import { GlobalAnimations } from "./components/GlobalAnimations";

// Create AppContent component that uses router hooks
function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Apply global design elements */}
      <CustomCursor />
      <ScrollProgressIndicator />
      <GlobalAnimations />
      
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/brand-story" element={<BrandStory />} />
            <Route path="/informasi" element={<Informasi />} />
            <Route path="/pengumuman" element={<Pengumuman />} />
            <Route path="/tim-kami" element={<TimKami />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/karya-kami" element={<KaryaKami />} />
            
            {/* Wrap admin routes with AdminAuthProvider */}
            <Route path="/admin-login" element={
              <AdminAuthProvider>
                <AdminLogin />
              </AdminAuthProvider>
            } />
            <Route path="/admin/*" element={
              <AdminAuthProvider>
                <OurAdmin />
              </AdminAuthProvider>
            } />
          </Routes>
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
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
