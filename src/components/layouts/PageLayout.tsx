import React, { useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Megaphone, Users, Palette, BookOpen, Info, FileText, UserPlus } from "lucide-react";
import { NavItem } from "./page-layout/types";
import { AppHeader } from "./page-layout/Header";
import { MobileMenu } from "./page-layout/MobileMenu";
import { PageHeader } from "./page-layout/PageHeader";
import { AppFooter } from "./page-layout/Footer";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backButtonPath?: string;
  className?: string;
  footerClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  backButtonPath,
  className = "",
  contentClassName = "",
  headerClassName = "",
  footerClassName = "",
  fullWidth = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const handleBackClick = () => {
    if (backButtonPath) {
      navigate(backButtonPath);
    } else {
      navigate(-1);
    }
  };

  const toggleMenu = () => {
    document.body.style.overflow = isMenuOpen ? "" : "hidden";
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  
  const navItems: NavItem[] = [
    { name: "Home", path: "/", icon: Home, type: "main" },
    { name: "Pengumuman", path: "/pengumuman", icon: Megaphone, type: "main" },
    { name: "Tim Kami", path: "/tim-kami", icon: Users, type: "main" },
    { name: "Karya Kami", path: "/karya-kami", icon: Palette, type: "main" },
    { name: "Cerita Kami", path: "/cerita-kami", icon: BookOpen, type: "info", description: "Perjalanan, visi, dan misi komunitas." },
    { name: "Informasi", path: "/informasi", icon: Info, type: "info", description: "Detail lengkap tentang komunitas kami." },
    { name: "Syarat & Ketentuan", path: "/terms", icon: FileText, type: "info", description: "Panduan dan aturan main di komunitas." },
    { name: "Ayo Gabung", path: "#", external: true, url: "https://linktr.ee/ourcreativity.ofc", icon: UserPlus, type: "cta" },
  ];

  const mainNav = navItems.filter(item => item.type === 'main');
  const infoNav = navItems.filter(item => item.type === 'info');
  const ctaNav = navItems.find(item => item.type === 'cta');
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  
  const handleNavClick = (item: NavItem) => {
    if (item.external && item.url) {
      window.open(item.url, '_blank');
    } else {
      navigate(item.path);
    }
  };
  
  return (
    <div className={cn("relative min-h-screen flex flex-col", className)}>
      <AppHeader
        className={headerClassName}
        fullWidth={fullWidth}
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        mainNav={mainNav}
        infoNav={infoNav}
        ctaNav={ctaNav}
        isActive={isActive}
        handleNavClick={handleNavClick}
        handleBackClick={handleBackClick}
      />
      
      <MobileMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        mainNav={mainNav}
        infoNav={infoNav}
        ctaNav={ctaNav}
        isActive={isActive}
        handleNavClick={handleNavClick}
      />
      
      {/* Main Content with proper spacing for fixed header */}
      <main className={cn("flex-grow pt-[80px] md:pt-[100px]", contentClassName)}>
        {/* Page Title Section */}
        {title && (
          <PageHeader title={title} subtitle={subtitle} />
        )}
        
        {/* Page Content */}
        <div className={cn(
          "container mx-auto px-4 sm:px-6",
          fullWidth ? "max-w-full" : "max-w-7xl"
        )}>
          {children}
        </div>
      </main>
      
      <AppFooter className={footerClassName} fullWidth={fullWidth} />
    </div>
  );
};

export default PageLayout;
