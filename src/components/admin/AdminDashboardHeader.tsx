
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User, LogOut, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface AdminDashboardHeaderProps {
  onLogout: () => void;
  lastLogin: Date;
  activityCount: number;
}

const AdminDashboardHeader = ({ onLogout, lastLogin, activityCount }: AdminDashboardHeaderProps) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/40 p-4 border-b border-foreground/5 shadow-md shadow-black/10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <motion.div 
            className="bg-foreground/5 backdrop-blur-md border border-foreground/10 shadow-lg rounded-xl p-2 flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
              alt="Admin Logo"
              className="h-8 w-8"
            />
            <motion.span 
              className="ml-2 font-serif font-bold text-xl"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Admin Dashboard
            </motion.span>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div 
            className="flex items-center gap-2 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-full px-4 py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <CalendarClock className="w-4 h-4 text-foreground/60" />
            <span className="text-sm text-foreground/60">
              Last login: {formatDistanceToNow(lastLogin, { addSuffix: true })}
            </span>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {activityCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-amethyst text-white">
                  {activityCount}
                </Badge>
              )}
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onLogout}
              className="text-foreground/60 hover:text-foreground hover:bg-foreground/5"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminDashboardHeader;
