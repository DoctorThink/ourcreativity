
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Activity, CheckCircle, Clock, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type ActivityLogItem = {
  id: string;
  action: string;
  details: string | null;
  ip_address: string | null;
  created_at: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AdminActivityLog = () => {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  const fetchLogs = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Fetch the admin activity logs
      const { data, error } = await supabase
        .from('admin_activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      setHasError(true);
      toast({
        title: "Error fetching activity logs",
        description: "Could not load activity data. Please try refreshing.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Set up a subscription for real-time updates
    const subscription = supabase
      .channel('activity-logs-admin')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'admin_activity_log' }, 
        payload => {
          console.log('Admin activity log changed:', payload);
          fetchLogs(); // Refresh logs when data changes
        }
      )
      .subscribe((status) => {
        console.log('Supabase subscription status for admin logs:', status);
        if (status !== 'SUBSCRIBED') {
          console.warn('Supabase subscription status:', status);
        }
      });
      
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLogs();
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return <CheckCircle className="h-4 w-4 text-emerald" />;
      case 'logout':
        return <XCircle className="h-4 w-4 text-blueLight" />;
      case 'update':
      case 'create':
        return <Clock className="h-4 w-4 text-amethyst" />;
      case 'delete':
        return <XCircle className="h-4 w-4 text-coral" />;
      default:
        return <Activity className="h-4 w-4 text-foreground/70" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'login':
        return <Badge variant="outline" className="bg-foreground/5 text-emerald border-emerald/30">Login</Badge>;
      case 'logout':
        return <Badge variant="outline" className="bg-foreground/5 text-blueLight border-blueLight/30">Logout</Badge>;
      case 'create':
        return <Badge variant="outline" className="bg-foreground/5 text-amethyst border-amethyst/30">Create</Badge>;
      case 'update':
        return <Badge variant="outline" className="bg-foreground/5 text-amber-500 border-amber-500/30">Update</Badge>;
      case 'delete':
        return <Badge variant="outline" className="bg-foreground/5 text-coral border-coral/30">Delete</Badge>;
      case 'approve':
        return <Badge variant="outline" className="bg-foreground/5 text-emerald border-emerald/30">Approve</Badge>;
      case 'reject':
        return <Badge variant="outline" className="bg-foreground/5 text-coral border-coral/30">Reject</Badge>;
      default:
        return <Badge variant="outline" className="bg-foreground/5">{action}</Badge>;
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      // Loading skeleton
      return Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-start space-x-4 pb-4 border-b border-foreground/5">
          <Skeleton className="h-10 w-10 rounded-full bg-foreground/5" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4 bg-foreground/5" />
            <Skeleton className="h-3 w-1/2 bg-foreground/5" />
          </div>
        </div>
      ));
    }
    
    if (hasError) {
      return (
        <div className="py-12 text-center text-foreground/50">
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="h-12 w-12 mb-3 text-coral/70" />
            <p>Error loading activity logs</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4" 
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }
    
    if (logs.length === 0) {
      return (
        <div className="py-12 text-center text-foreground/50">
          <div className="flex flex-col items-center justify-center">
            <Activity className="h-12 w-12 mb-3 text-foreground/20" />
            <p>Belum ada aktivitas admin untuk ditampilkan</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4" 
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <motion.div variants={containerVariants} className="space-y-4">
        {logs.map((log) => (
          <motion.div 
            key={log.id} 
            className="flex items-start space-x-4 pb-4 border-b border-foreground/5 last:border-0"
            variants={itemVariants}
          >
            <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
              {getActionIcon(log.action)}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {getActionBadge(log.action)}
                <span className="font-medium">{log.details}</span>
              </div>
              <div className="text-sm text-foreground/70">
                {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: id })}
              </div>
              <div className="text-xs text-foreground/50">
                {format(new Date(log.created_at), "d MMMM yyyy, HH:mm", { locale: id })}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif">
            Log Aktivitas Admin
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost"
            className="h-8 px-2 text-xs"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {renderContent()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminActivityLog;
