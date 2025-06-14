
import React from "react";
import { motion } from "framer-motion";
import { Users, User, Video, Palette, Smile, FileText } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { StandardCard } from "@/components/ui/StandardCard";
import { IconDisplay } from "@/components/ui/IconDisplay";

// StatCard component
const StatCard = ({ icon, label, value, color }: { 
  icon: LucideIcon; 
  label: string; 
  value: string;
  color: "amethyst" | "turquoise" | "coral" | "mint" | "amber" | "emerald" | "softPink";
}) => (
  <motion.div 
    className="flex flex-col items-center justify-center p-4 gap-3"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <IconDisplay icon={icon} color={color} size="lg" />
    <div className="text-center">
      <span className="text-3xl font-bold font-serif text-foreground block">{value}</span>
      <span className="text-sm text-foreground/60 font-medium">{label}</span>
    </div>
  </motion.div>
);

export const TeamOverviewStats: React.FC = () => {
  return (
    <StandardCard className="mb-10" glowColor="rgba(229, 222, 255, 0.3)">
      <div className="flex items-center gap-4 mb-6">
        <IconDisplay icon={Users} color="amethyst" size="lg" />
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground">Tim Overview</h3>
          <p className="text-sm text-foreground/60">Statistik anggota komunitas</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={User} label="Total Anggota" value="32" color="amethyst" />
        <StatCard icon={Video} label="Video Editing" value="8" color="coral" />
        <StatCard icon={Palette} label="Graphic Design" value="12" color="turquoise" />
        <StatCard icon={Smile} label="Meme" value="6" color="softPink" />
        <StatCard icon={FileText} label="Karya Tulis" value="6" color="mint" />
      </div>
    </StandardCard>
  );
};
