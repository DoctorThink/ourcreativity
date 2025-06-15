
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { IconDisplay } from "./IconDisplay";
import { cn } from "@/lib/utils";

interface GlowarCategoryCardProps {
  icon: LucideIcon;
  title: string;
  memberCount: number;
  description: string;
  color: "coral" | "turquoise" | "amethyst" | "mint" | "amber" | "emerald" | "softPink";
  onClick?: () => void;
}

export const GlowarCategoryCard: React.FC<GlowarCategoryCardProps> = ({
  icon,
  title,
  memberCount,
  description,
  color,
  onClick
}) => {
  const colorStyles = {
    coral: "shadow-coral/30 hover:shadow-coral/40",
    turquoise: "shadow-turquoise/30 hover:shadow-turquoise/40", 
    amethyst: "shadow-amethyst/30 hover:shadow-amethyst/40",
    mint: "shadow-mint/30 hover:shadow-mint/40",
    amber: "shadow-amber/30 hover:shadow-amber/40",
    emerald: "shadow-emerald/30 hover:shadow-emerald/40",
    softPink: "shadow-softPink/30 hover:shadow-softPink/40",
  };

  return (
    <motion.div
      className={cn(
        "group relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer overflow-hidden",
        "bg-secondary/40 border-white/10 hover:border-white/20",
        "hover:shadow-2xl transform hover:-translate-y-1",
        colorStyles[color]
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Glow Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl",
        `bg-gradient-to-br from-${color}/20 via-transparent to-${color}/10`
      )} />

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Icon & Title */}
        <div className="flex items-center gap-4">
          <IconDisplay icon={icon} color={color} size="xl" />
          <h3 className="text-2xl font-serif font-bold text-foreground">{title}</h3>
        </div>

        {/* Member Count */}
        <div className="space-y-1">
          <motion.div 
            className="text-5xl font-bold text-foreground"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {memberCount}
          </motion.div>
          <p className="text-lg text-foreground/60 font-medium">Anggota</p>
        </div>

        {/* Description */}
        <p className="text-foreground/80 leading-relaxed">{description}</p>

        {/* Hover Action */}
        <motion.div
          className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          <span className={`text-${color}`}>Jelajahi Kategori</span>
          <motion.span 
            className={`text-${color}`}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-foreground/5 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
    </motion.div>
  );
};
