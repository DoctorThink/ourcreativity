// --- START OF FILE OurAdmin.tsx ---
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogOut, Bell, Users, ScrollText, Info, LayoutGrid } from "lucide-react";
import ContentEditor from "@/components/admin/ContentEditor";
import TeamEditor from "@/components/admin/TeamEditor";
import AnnouncementEditor from "@/components/admin/AnnouncementEditor";
import { cn } from "@/lib/utils";

// Define types for better management
type AdminSection = "announcements" | "team" | "content" | "info" | null;

interface BentoItemProps {
  title: string;
  description: string;
  icon: React.ElementType;
  section: AdminSection;
  onClick: (section: AdminSection) => void;
  colorClasses: string; // e.g., "bg-[#E54646] text-[#FFE0E0] border-[#FF6B6B]/50"
  className?: string; // For grid spanning etc.
  isActive: boolean;
}

const BentoItem: React.FC<BentoItemProps> = ({
  title,
  description,
  icon: Icon,
  section,
  onClick,
  colorClasses,
  className = "",
  isActive
}) => {
  return (
    <motion.div
      layout // Enable smooth layout transitions
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      onClick={() => onClick(section)}
      className={cn(
        "p-5 rounded-3xl border cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl",
        colorClasses, // Apply color theme
        "flex flex-col justify-between group", // Flex layout
        isActive ? "ring-4 ring-offset-2 ring-offset-[#1a1a1c]" : "ring-0", // Active state indicator
        className // Grid positioning classes
      )}
      style={{ ringColor: colorClasses.split(' ')[2]?.replace('border-', '') }} // Use border color for ring
    >
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
                <Icon className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{description}</p>
        </div>
        {/* Subtle background pattern/icon */}
        <Icon className="absolute bottom-2 right-2 w-16 h-16 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300 -rotate-12 text-current pointer-events-none z-0"/>
    </motion.div>
  );
};

const OurAdmin = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<AdminSection>("announcements"); // Default selection

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSectionSelect = (section: AdminSection) => {
    setSelectedSection(section);
  };

  // Define Bento Grid Items Data
  const bentoItems = [
    {
      title: "Announcements",
      description: "Manage site-wide news and updates.",
      icon: Bell,
      section: "announcements",
      colorClasses: "bg-[#2a2a2e] hover:bg-[#E54646]/80 text-[#FFE0E0] border-[#FF6B6B]/50", // Red-ish on hover
      className: "md:col-span-2", // Span 2 columns on medium screens and up
    },
    {
      title: "Team Members",
      description: "Add, edit, or remove team profiles.",
      icon: Users,
      section: "team",
      colorClasses: "bg-[#2a2a2e] hover:bg-[#3ECAC4]/80 text-[#E0FFFD] border-[#6BFFFA]/50", // Teal-ish on hover
      className: "md:row-span-1",
    },
    {
        title: "Page Content",
        description: "Edit text and elements on core pages.",
        icon: ScrollText,
        section: "content",
        colorClasses: "bg-[#2a2a2e] hover:bg-[#FFA83E]/80 text-[#FFF2E0] border-[#FFC06B]/50", // Orange-ish on hover
        className: "md:row-span-1",
    },
    {
      title: "Information",
      description: "View admin panel guidelines.",
      icon: Info,
      section: "info",
      colorClasses: "bg-[#2a2a2e] hover:bg-[#A855F7]/80 text-[#F3E8FF] border-[#C084FC]/50", // Purple-ish on hover
      className: "md:col-span-2", // Span 2 columns on medium screens and up
    },
    // Example for a potential future stats block
    // {
    //   title: "Site Stats",
    //   description: "Overview of website activity.",
    //   icon: BarChart,
    //   section: "stats", // Assuming a 'stats' section exists
    //   colorClasses: "bg-[#2a2a2e] hover:bg-[#666]/80 text-neutral-200 border-neutral-500/50",
    //   className: "md:col-span-1",
    // },
  ];

  // Component mapping
  const sectionComponents: Record<Exclude<AdminSection, null>, React.ReactNode> = {
    announcements: <AnnouncementEditor />,
    team: <TeamEditor />,
    content: <ContentEditor />,
    info: (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="p-6 space-y-4 backdrop-blur-xl bg-[#2a2a2e]/60 border border-[#444448]/70 rounded-3xl shadow-lg"
      >
        <h3 className="text-xl font-semibold text-neutral-100">Admin Instructions</h3>
        <p className="text-neutral-300">
          Welcome to the OUR CREATIVITY admin panel. This dashboard allows you to manage content across the website.
        </p>
        <p className="text-neutral-300">
          Use the navigation grid above to switch between management sections:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-4">
          <li><strong>Announcements:</strong> Add, edit, or remove announcements.</li>
          <li><strong>Team Members:</strong> Manage team member information, bios, and achievements.</li>
          <li><strong>Page Content:</strong> Edit static content on various pages (future feature).</li>
        </ul>
        <div className="p-4 bg-[#1a1a1c]/70 rounded-lg border border-[#444448]/50 mt-4">
          <p className="text-sm text-neutral-400">
            Remember that changes made here can be immediately visible on the website.
            Please review your changes carefully before saving.
          </p>
        </div>
      </motion.div>
    ),
  };

  return (
    <div className="min-h-screen bg-[#1a1a1c] text-white">
      <div className="absolute inset-0 -z-10 opacity-50">
         {/* Consistent background blobs */}
        <div className="absolute w-[60vw] h-[60vh] rounded-full blur-[110px] bg-[#E54646]/10 -top-[15%] -right-[15%]" />
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-[#3ECAC4]/10 -bottom-[10%] -left-[10%]" />
        <div className="absolute w-[40vw] h-[40vh] rounded-full blur-[90px] bg-[#FFA83E]/5 bottom-[20%] right-[5%]" />
        <div className="absolute w-[45vw] h-[45vh] rounded-full blur-[95px] bg-[#A855F7]/5 top-[5%] left-[5%]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <header className="border-b border-[#444448]/50 backdrop-blur-xl bg-[#1a1a1c]/70 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Ensure this path is correct
              alt="Logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-100">Admin Dashboard</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-2 text-neutral-300 hover:bg-[#E54646]/80 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-6 md:py-8 px-4 md:px-6">
         {/* Bento Grid Navigation */}
         <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
         >
            {bentoItems.map((item) => (
                <BentoItem
                    key={item.section}
                    {...item}
                    onClick={handleSectionSelect}
                    isActive={selectedSection === item.section}
                />
            ))}
        </motion.div>

        {/* Content Area based on Selection */}
        <div className="mt-4 md:mt-6">
            <AnimatePresence mode="wait">
                {selectedSection && (
                    <motion.div
                        key={selectedSection} // Key change triggers animation
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                       {sectionComponents[selectedSection]}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OurAdmin;
