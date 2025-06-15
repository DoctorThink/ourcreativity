
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  name: string;
  role: string;
  category: string;
  avatar: string;
  accentColor?: "coral" | "emerald" | "amethyst" | "turquoise" | "amber" | "softPink" | "grayMid" | "orangeLight";
  onClick?: () => void;
}

const colorClasses = {
  coral: "bg-coral/10 text-coral border-coral/30",
  emerald: "bg-emerald/10 text-emerald border-emerald/30",
  amethyst: "bg-amethyst/10 text-amethyst border-amethyst/30",
  turquoise: "bg-turquoise/10 text-turquoise border-turquoise/30",
  amber: "bg-amber/10 text-amber border-amber/30",
  softPink: "bg-softPink/10 text-softPink border-softPink/30",
  grayMid: "bg-grayMid/10 text-grayMid border-grayMid/30",
  orangeLight: "bg-orangeLight/10 text-orangeLight border-orangeLight/30"
};

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  category,
  avatar,
  accentColor = "amethyst",
  onClick
}) => {
  return (
    <motion.div
      className="bg-secondary/50 backdrop-blur-sm border border-neutral-700/60 rounded-2xl p-4 cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -4,
        borderColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <motion.div 
          className="w-14 h-14 rounded-full bg-neutral-700 border border-neutral-600 flex items-center justify-center text-lg font-semibold text-white/80"
          whileHover={{ scale: 1.1 }}
        >
          {avatar}
        </motion.div>
      </div>

      {/* Content */}
      <div className="text-center space-y-2">
        <h4 className="font-serif font-medium text-foreground text-sm">{name}</h4>
        <p className="text-xs text-foreground/60">{role}</p>
        <span className={cn(
          "inline-block px-2 py-1 rounded-full text-xs font-medium",
          colorClasses[accentColor]
        )}>
          {category}
        </span>
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};
