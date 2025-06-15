
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedMemberCardProps {
  name: string;
  role: string;
  category: string;
  bio: string;
  avatar: string;
  accentColor?: "coral" | "emerald" | "amethyst" | "turquoise" | "amber" | "softPink";
  onClick?: () => void;
}

const colorClasses = {
  coral: "border-coral/30 shadow-coral/20",
  emerald: "border-emerald/30 shadow-emerald/20",
  amethyst: "border-amethyst/30 shadow-amethyst/20",
  turquoise: "border-turquoise/30 shadow-turquoise/20",
  amber: "border-amber/30 shadow-amber/20",
  softPink: "border-softPink/30 shadow-softPink/20"
};

export const FeaturedMemberCard: React.FC<FeaturedMemberCardProps> = ({
  name,
  role,
  category,
  bio,
  avatar,
  accentColor = "amethyst",
  onClick
}) => {
  return (
    <motion.div
      className={cn(
        "bg-secondary/60 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer relative overflow-hidden group",
        "min-w-[280px] flex-shrink-0",
        colorClasses[accentColor]
      )}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        boxShadow: `0 20px 40px ${colorClasses[accentColor].split(' ')[1].replace('shadow-', 'rgba(').replace('/20', ', 0.4)')}`
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <motion.div 
          className="w-20 h-20 rounded-full bg-neutral-700 border-2 border-neutral-600 flex items-center justify-center text-2xl font-bold text-white/80"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {avatar}
        </motion.div>
      </div>

      {/* Content */}
      <div className="text-center space-y-3">
        <div>
          <h4 className="font-serif font-bold text-lg text-foreground">{name}</h4>
          <p className="text-sm text-foreground/60">{role}</p>
          <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-medium mt-2",
            `bg-${accentColor}/10 text-${accentColor} border border-${accentColor}/30`
          )}>
            {category}
          </span>
        </div>
        
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
          {bio}
        </p>
      </div>

      {/* Hover Action */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <div className={cn(
          "flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full",
          `text-${accentColor} bg-${accentColor}/10 border border-${accentColor}/30`
        )}>
          <span>Lihat Profil</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-foreground/5 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
    </motion.div>
  );
};
