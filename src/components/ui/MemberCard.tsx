
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  name: string;
  role: string;
  category: string;
  avatar?: string;
  categoryColor?: "coral" | "turquoise" | "amethyst" | "mint" | "amber" | "emerald" | "softPink";
  onClick?: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  category,
  avatar,
  categoryColor = "amethyst",
  onClick
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(/[\s/]+/)
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const categoryColorStyles = {
    coral: "bg-coral/10 text-coral border-coral/30",
    turquoise: "bg-turquoise/10 text-turquoise border-turquoise/30",
    amethyst: "bg-amethyst/10 text-amethyst border-amethyst/30",
    mint: "bg-mint/10 text-mint border-mint/30",
    amber: "bg-amber/10 text-amber border-amber/30",
    emerald: "bg-emerald/10 text-emerald border-emerald/30",
    softPink: "bg-softPink/10 text-softPink border-softPink/30",
  };

  return (
    <motion.div
      className="group p-6 rounded-xl backdrop-blur-sm border cursor-pointer transition-all duration-300 bg-secondary/30 border-white/10 hover:border-white/20 hover:bg-secondary/50"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar className="w-16 h-16 border-2 border-white/20 shadow-lg">
            {avatar ? (
              <AvatarImage src={avatar} alt={name} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/50 text-foreground font-semibold text-lg">
                {getInitials(name)}
              </AvatarFallback>
            )}
          </Avatar>
        </motion.div>

        {/* Member Info */}
        <div className="text-center space-y-2">
          <h4 className="font-serif font-semibold text-foreground group-hover:text-white transition-colors">
            {name}
          </h4>
          <p className="text-sm text-foreground/60">{role}</p>
          
          {/* Category Tag */}
          <div className={cn(
            "inline-flex px-3 py-1 rounded-full text-xs font-medium border",
            categoryColorStyles[categoryColor]
          )}>
            {category}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/5 to-transparent" />
      </div>
    </motion.div>
  );
};
