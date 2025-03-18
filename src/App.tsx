
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Terms from "./pages/Terms";
import BrandStory from "./pages/BrandStory";
import Informasi from "./pages/Informasi";
import Pengumuman from "./pages/Pengumuman";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/brand-story" element={<BrandStory />} />
          <Route path="/informasi" element={<Informasi />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
