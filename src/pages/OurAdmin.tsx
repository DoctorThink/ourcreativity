
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AnnouncementEditor from '@/components/admin/AnnouncementEditor';
import ContentEditor from '@/components/admin/ContentEditor';
import TeamEditor from '@/components/admin/TeamEditor';
import KaryaModeration from '@/components/admin/KaryaModeration';
import { ScrollProgressIndicator } from '@/components/karya/ScrollProgressIndicator';
import { 
  ActivityLog, 
  Database, 
  Settings, 
  AreaChart, 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  Bell,
  LogOut
} from 'lucide-react';
import AdminDashboardHeader from '@/components/admin/AdminDashboardHeader';
import AdminActivityLog from '@/components/admin/AdminActivityLog';
import AdminDashboardStats from '@/components/admin/AdminDashboardStats';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const OurAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout } = useAdminAuth();
  const [lastLogin, setLastLogin] = useState(new Date());
  const [activityCounter, setActivityCounter] = useState(0);
  
  // Simulate activity counter
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition isAdmin={true}>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute w-[60vw] h-[60vh] rounded-full bg-gradient-radial from-amethyst/5 via-amethyst/2 to-transparent -top-[25%] -right-[15%] filter blur-[120px]"></div>
          <div className="absolute w-[50vw] h-[50vh] rounded-full bg-gradient-radial from-emerald/5 via-emerald/2 to-transparent -bottom-[15%] -left-[15%] filter blur-[120px]"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        
        <ScrollProgressIndicator />

        {/* Admin Header */}
        <AdminDashboardHeader 
          onLogout={logout}
          lastLogin={lastLogin}
          activityCount={activityCounter}
        />
        
        {/* Main Content */}
        <div className="container mx-auto py-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 glass-admin-tabs">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <AreaChart className="w-4 h-4" />
                  <span>Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="announcements" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>Pengumuman</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Konten</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Tim</span>
                </TabsTrigger>
                <TabsTrigger value="karya" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Karya</span>
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex items-center gap-2">
                  <ActivityLog className="w-4 h-4" />
                  <span>Logs</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <AdminDashboardStats />
              </TabsContent>
              
              <TabsContent value="announcements">
                <motion.div variants={itemVariants}>
                  <AnnouncementEditor />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="content">
                <motion.div variants={itemVariants}>
                  <ContentEditor />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="team">
                <motion.div variants={itemVariants}>
                  <TeamEditor />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="karya">
                <motion.div variants={itemVariants}>
                  <KaryaModeration />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="logs">
                <AdminActivityLog />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OurAdmin;
