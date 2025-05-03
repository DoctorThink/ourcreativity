
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Activity, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type KaryaLogItem = {
  id: string;
  title: string;
  creator_name: string;
  status: string;
  category: string;
  created_at: string;
  updated_at: string;
  action?: string;
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
  const [logs, setLogs] = useState<KaryaLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      // Fetch the most recent activities (karya creations and updates)
      const { data: recentKarya, error } = await supabase
        .from('karya')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Process the data to create activity logs
      const processedLogs = recentKarya.map((item: KaryaLogItem) => {
        let action = '';
        if (item.created_at === item.updated_at) {
          action = 'created';
        } else {
          if (item.status === 'approved') {
            action = 'approved';
          } else if (item.status === 'rejected') {
            action = 'rejected';
          } else {
            action = 'updated';
          }
        }
        
        return {
          ...item,
          action
        };
      });

      setLogs(processedLogs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Set up a subscription for real-time updates
    const subscription = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'karya' }, 
        payload => {
          fetchLogs(); // Refresh logs when data changes
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLogs();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-emerald" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-coral" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4 text-foreground/70" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'created':
        return <Badge variant="outline" className="bg-foreground/5 text-amethyst border-amethyst/30">Dibuat</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-foreground/5 text-emerald border-emerald/30">Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-foreground/5 text-coral border-coral/30">Ditolak</Badge>;
      case 'updated':
        return <Badge variant="outline" className="bg-foreground/5 text-blueLight border-blueLight/30">Diperbarui</Badge>;
      default:
        return <Badge variant="outline" className="bg-foreground/5">Aktivitas</Badge>;
    }
  };
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'design':
        return <Badge variant="secondary" className="bg-amethyst/10 text-amethyst border-amethyst/30">Design</Badge>;
      case 'video':
        return <Badge variant="secondary" className="bg-blueLight/10 text-blueLight border-blueLight/30">Video</Badge>;
      case 'meme':
        return <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/30">Meme</Badge>;
      case 'karyatulis':
        return <Badge variant="secondary" className="bg-coral/10 text-coral border-coral/30">Karya Tulis</Badge>;
      default:
        return <Badge variant="secondary" className="bg-foreground/10">{category}</Badge>;
    }
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
            Aktivitas Terbaru
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
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-start space-x-4 pb-4 border-b border-foreground/5">
                  <Skeleton className="h-10 w-10 rounded-full bg-foreground/5" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4 bg-foreground/5" />
                    <Skeleton className="h-3 w-1/2 bg-foreground/5" />
                  </div>
                </div>
              ))
            ) : logs.length > 0 ? (
              <motion.div variants={containerVariants} className="space-y-4">
                {logs.map((log) => (
                  <motion.div 
                    key={log.id} 
                    className="flex items-start space-x-4 pb-4 border-b border-foreground/5 last:border-0"
                    variants={itemVariants}
                  >
                    <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                      {getStatusIcon(log.status)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{log.title}</span>
                        {getActionBadge(log.action)}
                        {getCategoryBadge(log.category)}
                      </div>
                      <div className="text-sm text-foreground/70">
                        Oleh {log.creator_name} • {formatDistanceToNow(new Date(log.updated_at), { addSuffix: true, locale: id })}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {format(new Date(log.updated_at), "d MMMM yyyy, HH:mm", { locale: id })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-12 text-center text-foreground/50">
                <div className="flex flex-col items-center justify-center">
                  <Activity className="h-12 w-12 mb-3 text-foreground/20" />
                  <p>Belum ada aktivitas untuk ditampilkan</p>
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
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminActivityLog;
