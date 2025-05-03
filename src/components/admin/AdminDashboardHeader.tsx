
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Clock, LogOut, User, Menu } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';

interface AdminDashboardHeaderProps {
  onLogout: () => void;
  lastLogin: Date;
  activityCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminDashboardHeader = ({
  onLogout,
  lastLogin,
  activityCount,
  activeTab,
  onTabChange
}: AdminDashboardHeaderProps) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Fetch pending karya count
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const { count, error } = await supabase
          .from('karya')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
        
        if (error) throw error;
        setPendingCount(count || 0);
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };

    fetchPendingCount();
    
    // Set up real-time subscription for changes
    let subscription;
    
    try {
      subscription = supabase
        .channel('karya-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'karya' }, 
          () => {
            fetchPendingCount(); // Refresh count when data changes
          }
        )
        .subscribe((status) => {
          if (status !== 'SUBSCRIBED') {
            console.warn('Supabase subscription status:', status);
          }
        });
    } catch (error) {
      console.error('Error setting up real-time subscription:', error);
      toast({
        title: "Notifikasi real-time bermasalah",
        description: "Data mungkin tidak akan terupdate secara otomatis",
        variant: "destructive"
      });
    }
      
    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing:', error);
        }
      }
    };
  }, [toast]);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Tab navigation items for mobile
  const tabItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'announcements', label: 'Pengumuman' },
    { id: 'content', label: 'Konten' },
    { id: 'team', label: 'Tim' },
    { id: 'karya', label: 'Karya' },
    { id: 'logs', label: 'Logs' }
  ];

  // Handle tab change from mobile menu
  const handleMobileTabChange = (tab: string) => {
    onTabChange(tab);
    setIsSheetOpen(false);
  };

  return (
    <motion.header 
      className="py-3 md:py-4 border-b border-foreground/10 backdrop-blur-xl bg-background/50 sticky top-0 z-40"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background/95 backdrop-blur-lg border-foreground/10 w-[250px]">
                <div className="pt-6">
                  <h3 className="font-serif text-lg mb-4">Admin Panel</h3>
                  <nav className="space-y-1">
                    {tabItems.map(tab => (
                      <Button 
                        key={tab.id}
                        variant={activeTab === tab.id ? "secondary" : "ghost"}
                        className={`w-full justify-start text-left ${
                          activeTab === tab.id ? 'bg-amethyst/10 text-amethyst' : ''
                        }`}
                        onClick={() => handleMobileTabChange(tab.id)}
                      >
                        {tab.label}
                      </Button>
                    ))}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-coral mt-6"
                      onClick={onLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <div>
            <h1 className="text-lg md:text-xl font-serif">Admin Dashboard</h1>
            <div className="hidden md:flex items-center text-xs md:text-sm text-foreground/70 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <span>{format(currentTime, "EEEE, d MMMM yyyy • HH:mm", { locale: id })}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="flex items-center">
            <div className="relative cursor-pointer" onClick={() => onTabChange('karya')}>
              <Bell className="w-5 h-5" />
              {pendingCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral flex items-center justify-center">
                  <span className="text-[10px] text-white">{pendingCount > 9 ? '9+' : pendingCount}</span>
                </div>
              )}
            </div>
            
            <Badge className="ml-2 bg-foreground/5 text-xs hidden md:flex">
              <span className="text-amber-500 mr-1">{pendingCount}</span> menunggu
            </Badge>
          </div>
          
          <div className="hidden md:flex items-center">
            <Avatar className="w-8 h-8 mr-2 bg-amethyst/10">
              <AvatarFallback className="bg-amethyst/20 text-amethyst">A</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Admin</div>
              <div className="text-xs text-foreground/70">
                Login: {format(lastLogin, "HH:mm")}
              </div>
            </div>
          </div>
          
          {!isMobile && (
            <Button 
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-foreground/70 hover:text-foreground"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default AdminDashboardHeader;
