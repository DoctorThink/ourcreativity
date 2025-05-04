
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageTransition } from '@/components/PageTransition';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AnnouncementEditor from '@/components/admin/AnnouncementEditor';
import ContentEditor from '@/components/admin/ContentEditor';
import TeamEditor from '@/components/admin/TeamEditor';
import KaryaModeration from '@/components/admin/KaryaModeration';
import { ScrollProgressIndicator } from '@/components/karya/ScrollProgressIndicator';
import { 
  Activity, 
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
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const { isAuthenticated, logout } = useAdminAuth();
  const [lastLogin, setLastLogin] = useState(new Date());
  const [activityCounter, setActivityCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Handle tab change based on URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['dashboard', 'announcements', 'content', 'team', 'karya', 'logs'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('dashboard'); // Default to dashboard if no valid hash
    }
  }, []);

  // Set up real-time counter for new activities with error handling
  useEffect(() => {
    let subscription;
    
    try {
      subscription = supabase
        .channel('schema-db-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'karya' }, 
          payload => {
            console.log('Real-time update received:', payload);
            setActivityCounter(prev => prev + 1); // Increment counter when database changes
          }
        )
        .subscribe((status) => {
          console.log('Supabase subscription status:', status);
          if (status !== 'SUBSCRIBED') {
            console.warn('Supabase subscription status:', status);
          }
        });
    } catch (error) {
      console.error('Error setting up Supabase real-time subscription:', error);
      toast({
        title: "Koneksi real-time bermasalah",
        description: "Data mungkin tidak akan terupdate secara otomatis",
        variant: "destructive"
      });
    }
      
    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing from Supabase channel:', error);
        }
      }
    };
  }, [toast]);

  // Handle logout with feedback
  const handleLogout = () => {
    toast({
      title: "Berhasil logout",
      description: "Anda telah keluar dari Admin Dashboard"
    });
    logout();
    navigate('/admin-login');
  };
  
  // Handle tab change and update URL hash
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab; // Update URL hash without reloading page
  };

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
          onLogout={handleLogout}
          lastLogin={lastLogin}
          activityCount={activityCounter}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        {/* Main Content */}
        <div className="container mx-auto py-4 md:py-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 md:space-y-6"
          >
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              {!isMobile && (
                <TabsList className="mb-6 glass-admin-tabs">
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
                    <Activity className="w-4 h-4" />
                    <span>Logs</span>
                  </TabsTrigger>
                </TabsList>
              )}
              
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
