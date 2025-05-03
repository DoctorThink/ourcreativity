
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, FileText, PenTool, Eye, ArrowUpRight, TrendingUp, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// Sample data for stats
const visitsData = [
  { name: 'Mon', visits: 420 },
  { name: 'Tue', visits: 380 },
  { name: 'Wed', visits: 510 },
  { name: 'Thu', visits: 480 },
  { name: 'Fri', visits: 620 },
  { name: 'Sat', visits: 750 },
  { name: 'Sun', visits: 690 },
];

const karyaTypeData = [
  { name: 'Design', value: 45, color: '#9B6DFF' },
  { name: 'Video', value: 30, color: '#50C878' },
  { name: 'Meme', value: 15, color: '#FF7F50' },
  { name: 'Text', value: 10, color: '#FFBF00' },
];

const AdminDashboardStats = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/5 backdrop-blur-md border-foreground/5 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Total Visitors
              <Users className="h-4 w-4 text-amethyst" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">9,842</span>
                <span className="text-xs flex items-center text-emerald">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 
                  +12.5%
                </span>
              </div>
              <p className="text-xs text-foreground/60">vs. previous month</p>
            </div>
          </CardContent>
          <div className="h-1 w-full bg-amethyst/30 mt-auto">
            <div className="h-full bg-amethyst w-[75%]"></div>
          </div>
        </Card>
        
        <Card className="bg-black/5 backdrop-blur-md border-foreground/5 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Content Published
              <FileText className="h-4 w-4 text-emerald" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">124</span>
                <span className="text-xs flex items-center text-emerald">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 
                  +5.2%
                </span>
              </div>
              <p className="text-xs text-foreground/60">vs. previous month</p>
            </div>
          </CardContent>
          <div className="h-1 w-full bg-emerald/30 mt-auto">
            <div className="h-full bg-emerald w-[65%]"></div>
          </div>
        </Card>
        
        <Card className="bg-black/5 backdrop-blur-md border-foreground/5 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              New Submissions
              <PenTool className="h-4 w-4 text-coral" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">57</span>
                <span className="text-xs flex items-center text-emerald">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 
                  +24.8%
                </span>
              </div>
              <p className="text-xs text-foreground/60">vs. previous month</p>
            </div>
          </CardContent>
          <div className="h-1 w-full bg-coral/30 mt-auto">
            <div className="h-full bg-coral w-[85%]"></div>
          </div>
        </Card>
        
        <Card className="bg-black/5 backdrop-blur-md border-foreground/5 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Avg. Engagement
              <Eye className="h-4 w-4 text-amber" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">3:42</span>
                <span className="text-xs flex items-center text-emerald">
                  <TrendingUp className="h-3 w-3 mr-1" /> 
                  +1:12
                </span>
              </div>
              <p className="text-xs text-foreground/60">avg. time on page</p>
            </div>
          </CardContent>
          <div className="h-1 w-full bg-amber/30 mt-auto">
            <div className="h-full bg-amber w-[70%]"></div>
          </div>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-black/5 backdrop-blur-md border-foreground/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Site Visitors</CardTitle>
                  <CardDescription>Daily visitor count for the past week</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitsData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white' 
                      }}
                    />
                    <Bar 
                      dataKey="visits" 
                      fill="url(#visitGradient)" 
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9B6DFF" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#9B6DFF" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="bg-black/5 backdrop-blur-md border-foreground/5 h-full">
            <CardHeader>
              <CardTitle>Karya Distribution</CardTitle>
              <CardDescription>Breakdown by type</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={karyaTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {karyaTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white' 
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

// We need to import Button separately since it's used within this file
import { Button } from "@/components/ui/button";

export default AdminDashboardStats;
