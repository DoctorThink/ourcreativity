import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogOut, Bell, Users, ScrollText, Info, ArrowUpRight } from "lucide-react";
import ContentEditor from "@/components/admin/ContentEditor";
import TeamEditor from "@/components/admin/TeamEditor";
import AnnouncementEditor from "@/components/admin/AnnouncementEditor";
import { cn } from "@/lib/utils";

type AdminSection = "announcements" | "team" | "content" | "info";

const OurAdmin = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<AdminSection>("announcements");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define distinct glow colors for each widget
  const glowColors = [
    'shadow-[0_0_25px_-5px_rgba(155,109,255,0.6),0_0_15px_-7px_rgba(155,109,255,0.8)] ring-[#9B6DFF]/70', // Purple
    'shadow-[0_0_25px_-5px_rgba(80,200,120,0.6),0_0_15px_-7px_rgba(80,200,120,0.8)] ring-[#50C878]/70', // Green
    'shadow-[0_0_25px_-5px_rgba(30,144,255,0.6),0_0_15px_-7px_rgba(30,144,255,0.8)] ring-[#1E90FF]/70', // Blue
    'shadow-[0_0_25px_-5px_rgba(255,127,80,0.6),0_0_15px_-7px_rgba(255,127,80,0.8)] ring-[#FF7F50]/70', // Coral
  ];

   const sections: { id: AdminSection; title: string; description: string; icon: React.ElementType; stat?: string; colSpan?: string; rowSpan?: string }[] = [
    {
      id: "announcements",
      title: "Announcements",
      description: "Site news & updates",
      icon: Bell,
      stat: "3 Active",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: "team",
      title: "Team Members",
      description: "Manage profiles",
      icon: Users,
      stat: "8 Members",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: "content",
      title: "Page Content",
      description: "Edit static text",
      icon: ScrollText,
      stat: "4 Pages",
      colSpan: "col-span-1 sm:col-span-2", // Takes 2 cols on sm+
      rowSpan: "row-span-1",
    },
     {
      id: "info",
      title: "Admin Info",
      description: "Guides & settings",
      icon: Info,
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-[#111] text-[#eee] font-sans">
      {/* Subtle Background Gradients & Grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#9B6DFF]/10 via-transparent to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#50C878]/10 via-transparent to-transparent blur-[100px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>

      <header className="border-b border-white/10 backdrop-blur-lg bg-[#111]/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Replace with your actual logo path
              alt="Logo Icon"
              className="w-7 h-7"
            />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-[#eee]">
              Admin Panel
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="flex items-center justify-center h-9 w-9 text-[#aaa] hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 group"
          >
            <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>

      <main className="container py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Bento Grid Layout */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
             animate: { transition: { staggerChildren: 0.07 } }
          }}
          // Responsive grid: 1 col mobile, 2 cols sm+, 3 cols lg+
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8"
        >
          {sections.map((section, index) => {
            const isActive = selectedTab === section.id;
            const glowClass = glowColors[index % glowColors.length]; // Cycle through glow colors

            return (
              <motion.div
                key={section.id}
                variants={cardVariants}
                className={cn(
                  "cursor-pointer group relative",
                  section.colSpan,
                  section.rowSpan
                )}
                onClick={() => setSelectedTab(section.id)}
              >
                {/* Optional: Active/Hover Glow Background */}
                 <div className={cn(
                    "absolute -inset-0.5 rounded-xl blur-lg transition-opacity duration-300 opacity-0 group-hover:opacity-60",
                     isActive ? "opacity-70" : "",
                     index % 4 === 0 ? "bg-gradient-to-br from-[#9B6DFF]/50 to-[#E5DEFF]/50" : "",
                     index % 4 === 1 ? "bg-gradient-to-br from-[#50C878]/50 to-[#98F5E1]/50" : "",
                     index % 4 === 2 ? "bg-gradient-to-br from-[#1E90FF]/50 to-[#87CEFA]/50" : "",
                     index % 4 === 3 ? "bg-gradient-to-br from-[#FF7F50]/50 to-[#FEC6A1]/50" : "",
                 )}/>

                <Card className={cn(
                  "relative h-full bg-[#1C1C1E]/80 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300",
                  "group-hover:border-white/20 group-hover:bg-[#222]/90", // Hover state
                  isActive ? `ring-2 ${glowClass} bg-[#252527]/95` : '' // Active state with specific glow
                )}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 p-4">
                      <div className="space-y-1">
                         <CardTitle className="text-base font-medium text-[#eee]">
                            {section.title}
                          </CardTitle>
                         <CardDescription className="text-xs text-[#aaa] group-hover:text-[#ccc] transition-colors">
                            {section.description}
                         </CardDescription>
                      </div>
                       <div className={cn(
                          "p-1.5 rounded-md transition-colors",
                          isActive ? 'bg-white/10 text-white' : 'bg-white/5 text-[#bbb] group-hover:bg-white/10 group-hover:text-white'
                       )}>
                          <section.icon className="h-4 w-4" />
                       </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                     {section.stat && (
                        <div className="text-xl font-semibold text-[#eee]">{section.stat}</div>
                     )}
                     {/* Arrow indicator */}
                      <ArrowUpRight className={cn(
                        "absolute bottom-3 right-3 h-4 w-4 text-[#666] transition-all duration-300",
                        "group-hover:text-[#aaa] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        isActive ? "text-[#aaa]" : ""
                        )} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Content Area Below Grid */}
        <div className="mt-6 sm:mt-8 min-h-[400px]"> {/* Ensure minimum height */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab} // Key change triggers animation
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-[#1C1C1E]/60 border border-white/10 rounded-xl backdrop-blur-sm p-4 sm:p-6" // Container for the editors
            >
              {selectedTab === "announcements" && <AnnouncementEditor />}
              {selectedTab === "team" && <TeamEditor />}
              {selectedTab === "content" && <ContentEditor />}
              {selectedTab === "info" && (
                 <div>
                    <h2 className="text-lg font-semibold mb-3 text-[#eee]">Admin Instructions</h2>
                    <p className="text-sm text-[#bbb] mb-4">
                      Select a widget above to manage different parts of the website. Changes are saved automatically in some sections, while others require explicit saving.
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-[#bbb] mb-6 pl-2">
                      <li><strong>Announcements:</strong> Add, edit, or remove site news.</li>
                      <li><strong>Team Members:</strong> Manage team profiles and photos.</li>
                      <li><strong>Page Content:</strong> Update text on static pages.</li>
                    </ul>
                    <div className="p-3 bg-black/20 rounded-lg border border-white/10">
                      <p className="text-xs text-[#aaa]">
                        <strong className="text-[#ddd]">Note:</strong> Ensure content is reviewed before publishing as changes may be live immediately.
                      </p>
                    </div>
                  </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OurAdmin;
