import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogOut, Bell, Users, ScrollText, Info, LayoutGrid } from "lucide-react";
import ContentEditor from "@/components/admin/ContentEditor";
import TeamEditor from "@/components/admin/TeamEditor";
import AnnouncementEditor from "@/components/admin/AnnouncementEditor";
import { cn } from "@/lib/utils"; // Assuming you have this utility

type AdminSection = "announcements" | "team" | "content" | "info";

const OurAdmin = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<AdminSection>("announcements");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sections: { id: AdminSection; title: string; description: string; icon: React.ElementType; stat?: string, colSpan?: string, rowSpan?: string }[] = [
    {
      id: "announcements",
      title: "Announcements",
      description: "Manage site news",
      icon: Bell,
      stat: "3 Active", // Placeholder stat
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: "team",
      title: "Team Members",
      description: "Edit member profiles",
      icon: Users,
      stat: "8 Members", // Placeholder stat
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      id: "content",
      title: "Page Content",
      description: "Update static pages",
      icon: ScrollText,
      stat: "4 Pages", // Placeholder stat
      colSpan: "col-span-1 md:col-span-2", // Wider on medium screens+
      rowSpan: "row-span-1",
    },
     {
      id: "info",
      title: "Admin Info",
      description: "Guidance & settings",
      icon: Info,
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const glowEffect = "transition-all duration-300 ease-out hover:shadow-[0_0_25px_3px_rgba(155,109,255,0.35)] hover:ring-2 hover:ring-[#9B6DFF]/60 hover:scale-[1.02]";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Enhanced Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vh] sm:w-[80vw] sm:h-[80vh] rounded-full blur-[150px] bg-[#9B6DFF]/10 -top-[15%] -right-[25%]" />
        <div className="absolute w-[50vw] h-[50vh] sm:w-[70vw] sm:h-[70vh] rounded-full blur-[120px] bg-[#40E0D0]/5 -bottom-[10%] -left-[20%]" />
        {/* Optional subtle grid pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-50" />
      </div>

      <header className="border-b border-foreground/10 backdrop-blur-lg bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" // Replace with your actual logo path
              alt="Logo Icon"
              className="w-8 h-8"
            />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-serif">
              Admin Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 text-foreground/80 hover:text-foreground hover:bg-foreground/10 ${glowEffect} rounded-lg border border-transparent hover:border-foreground/20`}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="container py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
             animate: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={cardVariants}
              className={cn(
                "cursor-pointer",
                section.colSpan,
                section.rowSpan
              )}
              onClick={() => setSelectedTab(section.id)}
            >
              <Card className={cn(
                "h-full bg-foreground/5 border border-foreground/10 rounded-3xl backdrop-blur-md overflow-hidden",
                glowEffect,
                selectedTab === section.id ? 'ring-2 ring-[#9B6DFF]/80 shadow-[0_0_25px_3px_rgba(155,109,255,0.35)]' : ''
              )}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                       <CardTitle className="text-lg font-semibold font-serif text-foreground">
                          {section.title}
                        </CardTitle>
                       <CardDescription className="text-xs text-foreground/60">
                          {section.description}
                       </CardDescription>
                    </div>
                     <div className={cn(
                        "p-2 rounded-lg",
                        selectedTab === section.id ? 'bg-[#9B6DFF]/20 text-[#E5DEFF]' : 'bg-foreground/10 text-foreground/70'
                     )}>
                        <section.icon className="h-5 w-5" />
                     </div>
                </CardHeader>
                <CardContent>
                   {section.stat && (
                      <div className="text-2xl font-bold text-foreground/90">{section.stat}</div>
                   )}
                   {/* Add more stats or charts here if needed */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Area */}
        <div className="mt-8 min-h-[400px]"> {/* Ensure minimum height */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab} // Key change triggers animation
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {selectedTab === "announcements" && <AnnouncementEditor />}
              {selectedTab === "team" && <TeamEditor />}
              {selectedTab === "content" && <ContentEditor />}
              {selectedTab === "info" && (
                 <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="font-serif">Admin Instructions</CardTitle>
                      <CardDescription className="text-foreground/60">
                        Welcome to the OUR CREATIVITY admin panel
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-foreground/80">
                      <p>
                        This dashboard allows you to manage content across the website. Click on the cards above to navigate between different management sections.
                      </p>
                      <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Announcements:</strong> Add, edit, or remove announcements displayed on the site.</li>
                        <li><strong>Team Members:</strong> Manage profiles, roles, and photos for the team showcase.</li>
                        <li><strong>Page Content:</strong> Edit text and potentially images on static pages like 'Brand Story' or 'Information'.</li>
                      </ul>
                      <div className="p-4 bg-foreground/5 rounded-xl border border-foreground/10 mt-6">
                        <p className="text-xs text-foreground/60">
                          <strong className="text-foreground/80">Important:</strong> Changes made here will be reflected live on the website. Please review carefully before saving.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OurAdmin;
