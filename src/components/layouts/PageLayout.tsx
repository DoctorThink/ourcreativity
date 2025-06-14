import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LiquidNavigation from "../ui/LiquidNavigation";
import FlowingTypography from "../ui/FlowingTypography";
import GlassCard from "../ui/GlassCard";

interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  className?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.FC<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  {
    id: "pengumuman",
    label: "Pengumuman",
    href: "/pengumuman",
    icon: Menu,
  },
  {
    id: "tim-kami",
    label: "Tim Kami",
    href: "/tim-kami",
    icon: Menu,
  },
  {
    id: "karya-kami",
    label: "Karya Kami",
    href: "/karya-kami",
    icon: Menu,
  },
  {
    id: "informasi",
    label: "Informasi",
    href: "/informasi",
    icon: Menu,
  },
];

const PageLayout = ({ title, subtitle, children, showBackButton = true, className = "" }: PageLayoutProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen relative ${className}`}>
      {/* Enhanced Liquid Glass Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="mx-auto max-w-6xl" glowColor="rgba(155, 109, 255, 0.2)">
          <div className="flex items-center justify-between p-4">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {showBackButton && (
                <motion.button
                  onClick={() => navigate(-1)}
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </motion.button>
              )}
              
              <div className="flex items-center gap-3">
                <motion.img
                  src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                  alt="OUR CREATIVITY Logo"
                  className="w-8 h-8 object-contain"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />
                <FlowingTypography 
                  variant="subtitle" 
                  className="font-bold text-white"
                  animated={false}
                >
                  OUR CREATIVITY
                </FlowingTypography>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <LiquidNavigation 
                items={navigationItems}
                onItemClick={(item) => navigate(item.href || '/')}
              />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/20 mt-4 pt-4"
            >
              <LiquidNavigation 
                items={navigationItems}
                orientation="vertical"
                onItemClick={(item) => {
                  navigate(item.href || '/');
                  setIsMobileMenuOpen(false);
                }}
              />
            </motion.div>
          )}
        </GlassCard>
      </motion.header>

      {/* Main Content */}
      <main className="relative pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Enhanced Page Title */}
          {title && (
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FlowingTypography 
                variant="hero" 
                className="mb-4 text-white"
                glowEffect={true}
              >
                {title}
              </FlowingTypography>
              
              {subtitle && (
                <FlowingTypography 
                  variant="subtitle" 
                  className="text-white/80"
                  animated={false}
                >
                  {subtitle}
                </FlowingTypography>
              )}
            </motion.div>
          )}
          
          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Enhanced Liquid Glass Footer */}
      <motion.footer 
        className="relative mt-20 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassCard className="mx-auto max-w-6xl text-center" glowColor="rgba(64, 224, 208, 0.2)">
          <div className="p-6">
            <FlowingTypography 
              variant="body" 
              className="text-white/80 mb-4"
              animated={false}
            >
              © 2024 OUR CREATIVITY. Semua hak cipta dilindungi.
            </FlowingTypography>
            <FlowingTypography 
              variant="body" 
              className="text-white/60 text-sm"
              animated={false}
            >
              Dibuat dengan ❤️ untuk komunitas kreatif Indonesia
            </FlowingTypography>
          </div>
        </GlassCard>
      </motion.footer>

      {/* Background Parallax Effect */}
      <motion.div
        className="fixed inset-0 -z-50"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(155, 109, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(64, 224, 208, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 127, 80, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(155, 109, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(64, 224, 208, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 127, 80, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(64, 224, 208, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 127, 80, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(155, 109, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(155, 109, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(64, 224, 208, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 127, 80, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default PageLayout;
