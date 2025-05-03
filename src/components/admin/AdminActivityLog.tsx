
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Filter, Search, ArrowUpDown, Info, AlertCircle } from 'lucide-react';

// Sample data for activity logs
const SAMPLE_LOGS = [
  { id: 1, type: 'login', user: 'Admin', description: 'Login successful', timestamp: new Date(2025, 4, 3, 10, 30) },
  { id: 2, type: 'content', user: 'Admin', description: 'Updated homepage content', timestamp: new Date(2025, 4, 3, 9, 45) },
  { id: 3, type: 'karya', user: 'Admin', description: 'Approved new karya submission', timestamp: new Date(2025, 4, 2, 16, 20) },
  { id: 4, type: 'team', user: 'Admin', description: 'Added new team member', timestamp: new Date(2025, 4, 2, 14, 15) },
  { id: 5, type: 'announcement', user: 'Admin', description: 'Created new announcement', timestamp: new Date(2025, 4, 2, 11, 30) },
  { id: 6, type: 'karya', user: 'Admin', description: 'Rejected karya submission', timestamp: new Date(2025, 4, 1, 15, 45) },
  { id: 7, type: 'login', user: 'Admin', description: 'Login attempt failed', timestamp: new Date(2025, 4, 1, 10, 10) },
  { id: 8, type: 'content', user: 'Admin', description: 'Updated about page', timestamp: new Date(2025, 4, 1, 9, 20) },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const LogTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'login':
      return <div className="p-1 rounded-full bg-blueLight/10 text-blueLight"><Info className="h-4 w-4" /></div>;
    case 'content':
      return <div className="p-1 rounded-full bg-emerald/10 text-emerald"><Info className="h-4 w-4" /></div>;
    case 'karya':
      return <div className="p-1 rounded-full bg-coral/10 text-coral"><Info className="h-4 w-4" /></div>;
    case 'team':
      return <div className="p-1 rounded-full bg-purpleLight/10 text-purpleLight"><Info className="h-4 w-4" /></div>;
    case 'announcement':
      return <div className="p-1 rounded-full bg-amber/10 text-amber"><Info className="h-4 w-4" /></div>;
    default:
      return <div className="p-1 rounded-full bg-grayMid/10 text-grayMid"><AlertCircle className="h-4 w-4" /></div>;
  }
};

const AdminActivityLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredLogs = SAMPLE_LOGS.filter(log => 
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-between">
        <Card className="w-full md:w-1/4 bg-black/5 backdrop-blur-md border-foreground/5">
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>Overview of recent activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Total Entries</span>
                <span className="font-bold">{SAMPLE_LOGS.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Login Activities</span>
                <span className="font-bold">{SAMPLE_LOGS.filter(log => log.type === 'login').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Content Updates</span>
                <span className="font-bold">{SAMPLE_LOGS.filter(log => log.type === 'content').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Karya Actions</span>
                <span className="font-bold">{SAMPLE_LOGS.filter(log => log.type === 'karya').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-3/4 bg-black/5 backdrop-blur-md border-foreground/5">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Activity Logs</CardTitle>
                <CardDescription>Detailed list of all system activities</CardDescription>
              </div>
              <div className="flex items-center gap-2 w-full max-w-xs">
                <Search className="h-4 w-4 text-foreground/50" />
                <Input 
                  placeholder="Filter logs..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-foreground/10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center gap-1">
                      <span>Timestamp</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-foreground/5 transition-colors">
                    <TableCell><LogTypeIcon type={log.type} /></TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell className="text-foreground/70 text-sm">
                      {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-foreground/50">
                      No logs found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminActivityLog;
