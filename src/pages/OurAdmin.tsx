import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogOut, Bell, Users, ScrollText, Info, BarChart2, MessageSquare, Activity } from "lucide-react";

// Define colors based on the OurCreativity logo (approximations)
const logoColors = {
  red: "#FF4136",
  orange: "#FF851B",
  yellow: "#FFDC00",
  green: "#2ECC40",
  blue: "#0074D9",
  purple: "#B10DC9",
  lightBg: "#F8F8FA", // Light background instead of pure white
  textPrimary: "#1C1C1E",
  textSecondary: "#6B7280",
  cardBg: "#FFFFFF",
};

const OurAdmin = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home or login page after logout
  };

  // Placeholder function for navigation clicks
  const handleNavigation = (path: string) => {
    // In a real app, this would likely navigate to a different route
    // or trigger a state change to show a specific editor view.
    console.log(`Navigating to ${path}`);
    // Example: navigate(`/our-admin/${path}`);
    // For now, we'll just log it as the editor components are not part of this refactor scope.
    alert(`Navigate to manage: ${path}\n(Full navigation/component loading not implemented in this view)`);
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const GlowCard = ({
    title,
    description,
    icon: Icon,
    color,
    stat,
    statLabel,
    onClick,
    className = "",
    span = "col-span-1 row-span-1",
  }: {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    stat?: string | number;
    statLabel?: string;
    onClick: () => void;
    className?: string;
    span?: string;
  }) => (
    <motion.div
      variants={gridItemVariants}
      className={`${span} ${className}`}
    >
      <Card
        onClick={onClick}
        className={`
          cursor-pointer transition-all duration-300 ease-in-out h-full flex flex-col justify-between
          bg-[${logoColors.cardBg}] border border-gray-200 rounded-xl shadow-sm
          hover:shadow-[0_0_20px_5px] hover:shadow-${color.substring(1)}/30
          hover:border-${color.substring(1)}/50
          text-[${logoColors.textPrimary}]
        `}
        style={
          {
            "--glow-color": color,
            "--card-bg": logoColors.cardBg,
            "--text-primary": logoColors.textPrimary,
            "--text-secondary": logoColors.textSecondary,
          } as React.CSSProperties
        }
      >
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <Icon className="h-6 w-6" style={{ color: color }} />
          </div>
          <CardDescription className="text-sm text-[var(--text-secondary)]">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {stat !== undefined && statLabel && (
            <div className="mt-auto pt-4">
              <p className="text-3xl font-bold" style={{ color: color }}>{stat}</p>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{statLabel}</p>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Add pseudo-element for border glow - Tailwind doesn't directly support colored shadows well */}
       <style jsx>{`
        .hover\\:shadow-\\[0_0_20px_5px\\]:hover {
          box-shadow: 0 0 20px 5px var(--glow-color)33; /* 33 is hex for ~20% opacity */
        }
        .hover\\:border-\\[var\\(--glow-color\\)\\/50\\]:hover {
           border-color: color-mix(in srgb, var(--glow-color) 50%, transparent);
        }
      `}</style>
    </motion.div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: logoColors.lightBg }}>
      {/* Optional: Subtle background pattern or gradient if desired */}
      {/* <div className="absolute inset-0 -z-10 opacity-10"> ... pattern ... </div> */}

      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {/* Use the actual logo if available */}
             <img
               src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Replace with actual light-mode friendly logo if needed
               alt="OurCreativity Logo"
               className="w-8 h-8" // Adjust size as needed
             />
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: logoColors.textPrimary }}>
              Admin Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-2"
            style={{ color: logoColors.red }}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Bento Grid Items */}
          <GlowCard
            title="Announcements"
            description="Manage site-wide news and updates."
            icon={Bell}
            color={logoColors.red}
            stat={5} // Placeholder Stat
            statLabel="Active Posts"
            onClick={() => handleNavigation("announcements")}
            span="col-span-1 md:col-span-2 lg:col-span-2 row-span-1"
          />

          <GlowCard
            title="Team Members"
            description="Add, edit, or remove team profiles."
            icon={Users}
            color={logoColors.blue}
            stat={12} // Placeholder Stat
            statLabel="Members"
            onClick={() => handleNavigation("team")}
            span="col-span-1 lg:col-span-1 row-span-1"
          />

           <GlowCard
            title="Page Content"
            description="Edit content on main pages like 'Brand Story'."
            icon={ScrollText}
            color={logoColors.green}
            stat={3} // Placeholder Stat
            statLabel="Editable Pages"
            onClick={() => handleNavigation("content")}
            span="col-span-1 lg:col-span-1 row-span-1"
           />

          <GlowCard
            title="Site Activity"
            description="Overview of recent interactions."
            icon={Activity}
            color={logoColors.orange}
            stat="1.2k" // Placeholder Stat
            statLabel="Visits Today"
            onClick={() => handleNavigation("analytics")} // Example hypothetical section
            span="col-span-1 lg:col-span-1 row-span-1"
           />

          <GlowCard
            title="User Feedback"
            description="Review comments or submissions."
            icon={MessageSquare}
            color={logoColors.yellow}
            stat={23} // Placeholder Stat
            statLabel="Unread Messages"
            onClick={() => handleNavigation("feedback")} // Example hypothetical section
            span="col-span-1 md:col-span-1 lg:col-span-2 row-span-1"
           />


          <GlowCard
            title="Admin Info"
            description="Dashboard usage instructions."
            icon={Info}
            color={logoColors.purple}
            onClick={() => handleNavigation("settings")}
            span="col-span-1 md:col-span-1 lg:col-span-1 row-span-1"
          />

           {/* Add more cards as needed */}

        </motion.div>
      </main>

      {/* Footer or other elements if needed */}
       <footer className="container text-center py-4 mt-8 border-t border-gray-200">
          <p className="text-xs" style={{ color: logoColors.textSecondary }}>
              © {new Date().getFullYear()} OUR CREATIVITY Admin Panel
          </p>
       </footer>
    </div>
  );
};

export default OurAdmin;
