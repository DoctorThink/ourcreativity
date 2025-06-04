import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings,
  Megaphone,
  Palette,
  Shield,
  Activity
} from "lucide-react";
import PageLayout from "../components/layouts/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AdminDashboardStats from "@/components/admin/AdminDashboardStats";
import AnnouncementManager from "@/components/admin/AnnouncementManager";
import TeamEditor from "@/components/admin/TeamEditor";
import KaryaModeration from "@/components/admin/KaryaModeration";
import ContentEditor from "@/components/admin/ContentEditor";
import AdminActivityLog from "@/components/admin/AdminActivityLog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    },
  },
};

const OurAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <PageLayout 
      title="Admin Dashboard"
      subtitle="Kelola konten dan komunitas OUR CREATIVITY"
      showBackButton={true}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <AdminDashboardHeader />

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="glass-admin-tabs w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto p-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 px-4 py-3">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2 px-4 py-3">
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Pengumuman</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2 px-4 py-3">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Tim</span>
            </TabsTrigger>
            <TabsTrigger value="karya" className="flex items-center gap-2 px-4 py-3">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Karya</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 px-4 py-3">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Konten</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2 px-4 py-3">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Aktivitas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 px-4 py-3">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Pengaturan</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <motion.div variants={cardVariants}>
                <AdminDashboardStats />
              </motion.div>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-6">
              <motion.div variants={cardVariants}>
                <AnnouncementManager />
              </motion.div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <motion.div variants={cardVariants}>
                <TeamEditor />
              </motion.div>
            </TabsContent>

            <TabsContent value="karya" className="space-y-6">
              <motion.div variants={cardVariants}>
                <KaryaModeration />
              </motion.div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <motion.div variants={cardVariants}>
                <ContentEditor />
              </motion.div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <motion.div variants={cardVariants}>
                <AdminActivityLog />
              </motion.div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <motion.div variants={cardVariants}>
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amethyst" />
                      Pengaturan Admin
                    </CardTitle>
                    <CardDescription>
                      Konfigurasi sistem dan keamanan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">
                      Pengaturan admin akan tersedia dalam update mendatang.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </PageLayout>
  );
};

export default OurAdmin;
