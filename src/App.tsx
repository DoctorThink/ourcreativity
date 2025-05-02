
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { Toaster } from "./components/ui/toaster";
import "./App.css";

// Create React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/brand-story" element={<BrandStory />} />
            <Route path="/informasi" element={<Informasi />} />
            <Route path="/pengumuman" element={<Pengumuman />} />
            <Route path="/tim-kami" element={<TimKami />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/karya-kami" element={<KaryaKami />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<OurAdmin />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
