
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogOut, Bell, Users, BookOpen, ScrollText, Info } from "lucide-react";
import ContentEditor from "@/components/admin/ContentEditor";
import TeamEditor from "@/components/admin/TeamEditor";
import AnnouncementEditor from "@/components/admin/AnnouncementEditor";

const OurAdmin = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] bg-foreground/5 -top-[20%] -right-[20%]" />
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-foreground/3 -bottom-[10%] -left-[10%]" />
      </div>

      <header className="border-b border-foreground/10 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
              alt="Logo"
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <main className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="announcements" className="space-y-4">
            <TabsList className="grid grid-cols-4 gap-2 bg-foreground/5 backdrop-blur-xl p-1 rounded-xl">
              <TabsTrigger value="announcements" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Announcements</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team Members</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                <span className="hidden sm:inline">Page Content</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Information</span>
              </TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[calc(100vh-9rem)]">
              <TabsContent value="announcements" className="space-y-4">
                <AnnouncementEditor />
              </TabsContent>
              
              <TabsContent value="team" className="space-y-4">
                <TeamEditor />
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4">
                <ContentEditor />
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
                  <CardHeader>
                    <CardTitle>Admin Instructions</CardTitle>
                    <CardDescription>
                      Welcome to the OUR CREATIVITY admin panel
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/70">
                      This dashboard allows you to manage content across the website. Use the tabs above to navigate between different management sections.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-foreground/70">
                      <li><strong>Announcements:</strong> Add, edit, or remove announcements</li>
                      <li><strong>Team Members:</strong> Manage team member information and photos</li>
                      <li><strong>Page Content:</strong> Edit content on various pages</li>
                    </ul>
                    <div className="p-4 bg-foreground/5 rounded-lg border border-foreground/10 mt-4">
                      <p className="text-sm text-foreground/60">
                        Remember that changes made here will be immediately visible on the website.
                        Please preview your changes before saving them.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default OurAdmin;
