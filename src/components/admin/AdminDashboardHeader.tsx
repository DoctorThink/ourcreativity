
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Clock, LogOut, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AdminDashboardHeaderProps {
  onLogout: () => void;
  lastLogin: Date;
  activityCount: number;
}

const AdminDashboardHeader = ({
  onLogout,
  lastLogin,
  activityCount
}: AdminDashboardHeaderProps) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

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
    const subscription = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'karya' }, 
        payload => {
          fetchPendingCount(); // Refresh count when data changes
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      className="py-4 border-b border-foreground/10 backdrop-blur-xl bg-background/50 sticky top-0 z-10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-xl font-serif">Admin Dashboard</h1>
          <div className="flex items-center text-sm text-foreground/70 mt-1">
            <Clock className="w-3 h-3 mr-1" />
            <span>{format(currentTime, "EEEE, d MMMM yyyy • HH:mm", { locale: id })}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="relative">
              <Bell className="w-5 h-5" />
              {pendingCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral flex items-center justify-center">
                  <span className="text-[10px] text-white">{pendingCount > 9 ? '9+' : pendingCount}</span>
                </div>
              )}
            </div>
            
            <Badge className="ml-2 bg-foreground/5 text-xs">
              <span className="text-amber-500 mr-1">{pendingCount}</span> menunggu
            </Badge>
          </div>
          
          <div className="flex items-center">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarFallback className="bg-amethyst/20 text-amethyst">A</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Admin</div>
              <div className="text-xs text-foreground/70">
                Login: {format(lastLogin, "HH:mm")}
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="text-foreground/70 hover:text-foreground"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminDashboardHeader;
