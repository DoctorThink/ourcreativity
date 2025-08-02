
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import {
  Users,
  FileText,
  Image,
  CheckCheck,
  XCircle,
  Clock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboardStats = () => {
  const [stats, setStats] = useState({
    totalKarya: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    categories: {
      design: 0,
      video: 0,
      meme: 0,
      writing: 0,
    },
  });

  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchStats = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Fetch total count
      const { count: totalCount, error: totalError } = await supabase
        .from('karya')
        .select('*', { count: 'exact', head: true });
      
      if (totalError) throw totalError;

      // Fetch approved count
      const { count: approvedCount, error: approvedError } = await supabase
        .from('karya')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');
      
      if (approvedError) throw approvedError;

      // Fetch rejected count
      const { count: rejectedCount, error: rejectedError } = await supabase
        .from('karya')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rejected');
      
      if (rejectedError) throw rejectedError;

      // Fetch pending count
      const { count: pendingCount, error: pendingError } = await supabase
        .from('karya')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (pendingError) throw pendingError;

      // Fetch category counts
      const { data: designCount, error: designError } = await supabase
        .from('karya')
        .select('*', { count: 'exact' })
        .eq('category', 'design');
      
      if (designError) throw designError;

      const { data: videoCount, error: videoError } = await supabase
        .from('karya')
        .select('*', { count: 'exact' })
        .eq('category', 'video');
      
      if (videoError) throw videoError;

      const { data: memeCount, error: memeError } = await supabase
        .from('karya')
        .select('*', { count: 'exact' })
        .eq('category', 'meme');
      
      if (memeError) throw memeError;

      const { data: writingCount, error: writingError } = await supabase
        .from('karya')
        .select('*', { count: 'exact' })
        .eq('category', 'karyatulis');
      
      if (writingError) throw writingError;

      // Fetch data for chart (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: recentKarya, error: chartError } = await supabase
        .from('karya')
        .select('created_at, status')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true });
      
      if (chartError) throw chartError;
      
      // Process chart data
      const processedChartData = processChartData(recentKarya || []);

      setStats({
        totalKarya: totalCount || 0,
        approved: approvedCount || 0,
        rejected: rejectedCount || 0,
        pending: pendingCount || 0,
        categories: {
          design: designCount?.length || 0,
          video: videoCount?.length || 0,
          meme: memeCount?.length || 0,
          writing: writingCount?.length || 0,
        },
      });

      setChartData(processedChartData);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      setHasError(true);
      toast({
        title: "Error fetching dashboard statistics",
        description: "Could not load complete dashboard data. Try refreshing.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Set up a subscription for real-time updates
    let subscription;
    
    try {
      subscription = supabase
        .channel('dashboard-stats')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'karya' }, 
          () => {
            fetchStats(); // Refresh stats when data changes
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
        title: "Real-time updates issue",
        description: "Dashboard statistics might not update automatically",
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

  // Process data for the chart
  const processChartData = (data) => {
    const days = {};
    const now = new Date();
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const formattedDate = date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
      days[formattedDate] = { date: formattedDate, approved: 0, rejected: 0, pending: 0, total: 0 };
    }
    
    // Populate with actual data
    data.forEach(item => {
      const date = new Date(item.created_at);
      const formattedDate = date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
      
      if (days[formattedDate]) {
        days[formattedDate].total += 1;
        days[formattedDate][item.status] = (days[formattedDate][item.status] || 0) + 1;
      }
    });
    
    return Object.values(days);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStats();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="bg-foreground/5 border-foreground/10">
            <CardContent className="p-6">
              <div className="h-16 rounded-md bg-foreground/10"></div>
            </CardContent>
          </Card>
        ))}
        <Card className="col-span-1 md:col-span-2 bg-foreground/5 border-foreground/10">
          <CardHeader>
            <div className="h-6 w-48 bg-foreground/10 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-foreground/5 rounded-md"></div>
          </CardContent>
        </Card>
        <Card className="bg-foreground/5 border-foreground/10">
          <CardHeader>
            <div className="h-6 w-24 bg-foreground/10 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex justify-between">
                  <div className="h-4 w-24 bg-foreground/10 rounded"></div>
                  <div className="h-4 w-8 bg-foreground/10 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="p-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <AlertCircle className="h-16 w-16 mb-4 text-coral/70" />
          <h3 className="text-xl font-medium mb-2">Failed to load dashboard data</h3>
          <p className="text-foreground/70 mb-6">There was an error retrieving dashboard statistics</p>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="text-xs"
        >
          <RefreshCw className={`mr-1 h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Total Karya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalKarya}</div>
              <FileText className="h-6 w-6 text-amethyst" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Disetujui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.approved}</div>
              <CheckCheck className="h-6 w-6 text-emerald" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Ditolak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.rejected}</div>
              <XCircle className="h-6 w-6 text-coral" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Menunggu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.pending}</div>
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 backdrop-blur-xl bg-foreground/5 border border-foreground/10">
          <CardHeader>
            <CardTitle>Aktivitas 7 Hari Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9B6DFF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9B6DFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#9B6DFF"
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-foreground/50">No activity data available</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
          <CardHeader>
            <CardTitle>Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amethyst rounded-full mr-2"></div>
                  <span>Design</span>
                </div>
                <span className="font-medium">{stats.categories.design}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-azure rounded-full mr-2"></div>
                  <span>Video</span>
                </div>
                <span className="font-medium">{stats.categories.video}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span>Meme</span>
                </div>
                <span className="font-medium">{stats.categories.meme}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-coral rounded-full mr-2"></div>
                  <span>Karya Tulis</span>
                </div>
                <span className="font-medium">{stats.categories.writing}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardStats;
