
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
} from 'lucide-react';

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

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Fetch total count
        const { count: totalCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact', head: true });

        // Fetch approved count
        const { count: approvedCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved');

        // Fetch rejected count
        const { count: rejectedCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'rejected');

        // Fetch pending count
        const { count: pendingCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Fetch category counts
        const { data: designCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact' })
          .eq('category', 'design');

        const { data: videoCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact' })
          .eq('category', 'video');

        const { data: memeCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact' })
          .eq('category', 'meme');

        const { data: writingCount } = await supabase
          .from('karya')
          .select('*', { count: 'exact' })
          .eq('category', 'karyatulis');

        // Fetch data for chart (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: recentKarya } = await supabase
          .from('karya')
          .select('created_at, status')
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('created_at', { ascending: true });
        
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

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

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="bg-foreground/5 border-foreground/10">
              <CardContent className="p-6">
                <div className="h-16 rounded-md bg-foreground/10"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AdminDashboardStats;
