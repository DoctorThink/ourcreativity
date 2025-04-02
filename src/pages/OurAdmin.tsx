import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogOut, Bell, Users, ScrollText, Info, ArrowUpRight, BarChart2, Settings, LayoutGrid } from "lucide-react"; // Added LayoutGrid here
import ContentEditor from "@/components/admin/ContentEditor";
import TeamEditor from "@/components/admin/TeamEditor";
import AnnouncementEditor from "@/components/admin/AnnouncementEditor";
import { cn } from "@/lib/utils"; // Assuming you have this utility

// Define the type for admin sections
type AdminSectionId = "dashboard" | "announcements" | "team" | "content" | "settings" | "info";

// Define the structure for each Bento Grid item
interface BentoItem {
  id: AdminSectionId;
  title: string;
  description?: string; // Optional description
  icon: React.ElementType;
  stat?: string; // Main statistic
  subStat?: string; // Smaller secondary stat like percentage change
  colSpan: string; // Tailwind class for column span
  rowSpan: string; // Tailwind class for row span
  bgColorClass: string; // Background color class
  textColorClass: string; // Text color class for contrast
  accentColor: string; // Hex color for glow/accent
}

const OurAdmin = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  // Default to 'dashboard' view which shows the grid
  const [selectedSection, setSelectedSection] = useState<AdminSectionId>("dashboard");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Bento Grid configuration inspired by the "nue" example and OurCreativity branding
  // Main Accent: Purple (#9B6DFF)
  // Secondary Accents: Teal (#40E0D0), Peach (#FF7F50), Pink (#FFD1DC)
  const bentoItems: BentoItem[] = [
    {
      id: "dashboard", // Special item to represent the overview/grid itself
      title: "Dashboard",
      icon: LayoutGrid, // Using the imported LayoutGrid icon
      colSpan: "col-span-2 sm:col-span-1",
      rowSpan: "row-span-1",
      bgColorClass: "bg-[#9B6DFF]", // Primary Accent
      textColorClass: "text-white",
      accentColor: "#E5DEFF", // Light Lavender for contrast glow
      description: "Admin Overview",
    },
     {
      id: "announcements",
      title: "Announcements",
      icon: Bell,
      stat: "3",
      subStat: "Active",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColorClass: "bg-[#2C2C2E]", // Darker Gray
      textColorClass: "text-white",
      accentColor: "#9B6DFF", // Purple
    },
    {
      id: "team",
      title: "Team Members",
      icon: Users,
      stat: "8",
      subStat: "Profiles",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
       bgColorClass: "bg-[#2C2C2E]",
      textColorClass: "text-white",
      accentColor: "#40E0D0", // Teal
    },
    {
      id: "content",
      title: "Page Content",
      icon: ScrollText,
      stat: "4",
      subStat: "Pages",
      colSpan: "col-span-2 sm:col-span-1", // Span 2 on mobile, 1 on sm+
      rowSpan: "row-span-1",
       bgColorClass: "bg-[#2C2C2E]",
      textColorClass: "text-white",
      accentColor: "#FF7F50", // Peach
    },
     {
      id: "info", // Simple info/help section link
      title: "Help & Info",
      icon: Info,
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColorClass: "bg-[#222]", // Even darker subtle gray
      textColorClass: "text-neutral-300",
      accentColor: "#FFFFFF", // White/Gray glow
    },
     {
      id: "settings", // Placeholder for future settings
      title: "Settings",
      icon: Settings,
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColorClass: "bg-[#222]",
      textColorClass: "text-neutral-300",
      accentColor: "#CCCCCC", // Light gray glow
    },
     // Example: Larger Card (if needed for visual balance)
    // {
    //   id: "analytics", // Placeholder
    //   title: "Site Analytics",
    //   icon: BarChart2,
    //   stat: "1.2k",
    //   subStat: "Visits Today",
    //   colSpan: "col-span-2",
    //   rowSpan: "row-span-1",
    //   bgColorClass: "bg-[#333]",
    //   textColorClass: "text-white",
    //   accentColor: "#FFD1DC", // Pink
    // },
  ];

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeOut" } }
  }

  const renderContent = () => {
    switch (selectedSection) {
      case "announcements":
        return <AnnouncementEditor />;
      case "team":
        return <TeamEditor />;
      case "content":
        return <ContentEditor />;
      case "info":
         return (
             <div className="text-neutral-300">
                <h2 className="text-xl font-serif font-semibold mb-4 text-white">Admin Instructions</h2>
                <p className="text-sm font-sans mb-4 text-neutral-400 leading-relaxed">
                    Welcome! Use the dashboard widgets above to navigate and manage different sections of the OUR CREATIVITY website. Click any widget to access its specific editor or information panel below.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm font-sans text-neutral-400 mb-6 pl-2">
                  <li><strong>Announcements:</strong> Create, update, or remove news items.</li>
                  <li><strong>Team Members:</strong> Manage public profiles for the team.</li>
                  <li><strong>Page Content:</strong> Edit text on informational pages.</li>
                  <li><strong>Settings:</strong> (Future implementation) Adjust site configurations.</li>
                </ul>
                <div className="p-3 bg-black/30 rounded-lg border border-white/10">
                  <p className="text-xs font-sans text-neutral-500">
                    <strong className="text-neutral-400">Remember:</strong> Most changes are reflected live. Please review carefully.
                  </p>
                </div>
              </div>
          );
      case "settings":
         return <div className="text-center text-neutral-400 font-sans p-8">Settings section coming soon...</div>;
      case "dashboard": // Show instructions when dashboard is selected but no specific item
      default:
          return (
              <div className="text-center text-neutral-400 font-sans p-8 h-64 flex items-center justify-center">
                  <p>Select a widget above to start managing content.</p>
              </div>
          );
    }
  };

  return (
    // Use a dark background consistent with branding
    <div className="min-h-screen bg-[#1C1C1E] text-white font-sans">
       {/* Subtle background glows */}
       <div className="absolute inset-0 -z-10 overflow-hidden">
         <div className="absolute w-[70vw] h-[70vh] rounded-full blur-[130px] bg-[#9B6DFF]/10 -top-[10%] -right-[20%]" />
         <div className="absolute w-[60vw] h-[60vh] rounded-full blur-[120px] bg-[#40E0D0]/5 -bottom-[15%] -left-[15%]" />
       </div>

      <header className="border-b border-white/10 backdrop-blur-lg bg-[#1C1C1E]/70 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Ensure this path is correct
              alt="Logo Icon"
              className="w-7 h-7"
            />
            {/* Use Serif font for the main title */}
            <h1 className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-white">
              Admin Panel
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="flex items-center justify-center h-9 w-9 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 group"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Dynamic Bento Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
          // Responsive grid: 2 cols mobile, 3 cols sm+
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-8"
        >
          {bentoItems.map((item) => {
            const isActive = selectedSection === item.id;
            const glowStyle = { boxShadow: `0 0 20px -5px ${item.accentColor}60, 0 0 12px -8px ${item.accentColor}90` };

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                layout // Enable smooth layout changes if grid structure changes dynamically
                className={cn(
                  "relative group cursor-pointer",
                  item.colSpan,
                  item.rowSpan
                )}
                onClick={() => setSelectedSection(item.id)}
                whileTap={{ scale: 0.97 }}
              >
                {/* Subtle glow effect on hover/active */}
                <div className={cn(
                    "absolute -inset-px rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-70 pointer-events-none", // Added pointer-events-none
                    isActive ? "opacity-100" : ""
                 )} style={isActive || null ? glowStyle : {}} />

                <Card className={cn(
                  "relative h-full overflow-hidden transition-all duration-300 ease-in-out",
                  "rounded-3xl", // iOS style rounding
                  "border",
                   isActive ? "border-transparent" : "border-white/10", // Hide border when glow is active
                   item.bgColorClass, // Apply specific background
                   item.textColorClass, // Apply specific text color
                   "p-4 sm:p-5 flex flex-col justify-between" // Padding and layout
                )}>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <div className={cn(
                           "p-1.5 rounded-lg bg-black/10 inline-block", // Semi-transparent icon bg
                           item.textColorClass === "text-white" ? "text-white/80" : "text-black/60"
                       )}>
                          <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                       </div>
                       {/* Arrow indicator */}
                        <ArrowUpRight className="h-4 w-4 text-current/50 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>
                    {/* Use Serif for card titles */}
                    <CardTitle className={cn(
                        "text-base sm:text-lg font-serif font-medium mb-1",
                         item.textColorClass
                    )}>
                      {item.title}
                    </CardTitle>
                     {item.description && (
                      <p className={cn("text-xs sm:text-sm font-sans opacity-70", item.textColorClass)}>
                        {item.description}
                      </p>
                    )}
                  </div>
                   {(item.stat || item.subStat) && (
                     <div className="mt-3 text-right">
                        {item.stat && (
                            <p className={cn("text-2xl sm:text-3xl font-sans font-semibold", item.textColorClass)}>
                                {item.stat}
                            </p>
                        )}
                        {item.subStat && (
                            <p className={cn("text-xs sm:text-sm font-sans opacity-70", item.textColorClass)}>
                                {item.subStat}
                            </p>
                        )}
                    </div>
                   )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Content Area Below Grid - Conditionally Rendered */}
        <div className="mt-6 sm:mt-8 min-h-[300px]">
           <AnimatePresence mode="wait">
              {selectedSection !== "dashboard" && (
                 <motion.div
                    key={selectedSection} // Key change triggers animation
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-[#252527]/50 border border-white/10 rounded-3xl backdrop-blur-sm p-4 sm:p-6" // Container for editors
                 >
                    {renderContent()}
                 </motion.div>
              )}
              {selectedSection === "dashboard" && ( // Show default message when no section selected
                   <motion.div
                      key="dashboard-placeholder"
                      variants={contentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex items-center justify-center h-48 text-center text-neutral-500 font-sans p-8 rounded-3xl bg-[#252527]/30 border border-dashed border-white/10"
                    >
                       <p>Select an item from the dashboard above to manage its content.</p>
                   </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OurAdmin;
