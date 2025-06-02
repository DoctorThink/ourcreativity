
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export const AnnouncementLoadingState: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Featured Loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse"
      >
        <Card className="bg-secondary/40">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-white/10 rounded w-20"></div>
                <div className="h-8 bg-white/10 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              </div>
              <div className="lg:w-80 h-60 bg-white/10 rounded-xl"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid Loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="animate-pulse"
          >
            <Card className="bg-secondary/40 h-64">
              <CardContent className="p-5 space-y-4">
                <div className="h-4 bg-white/10 rounded w-16"></div>
                <div className="h-6 bg-white/10 rounded w-4/5"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded"></div>
                  <div className="h-3 bg-white/10 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
