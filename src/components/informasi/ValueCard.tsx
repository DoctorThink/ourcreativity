
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { IconDisplay } from "@/components/ui/IconDisplay";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "amethyst" | "turquoise" | "coral";
  delay?: number;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  color,
  delay = 0
}) => {
  const glowColors = {
    amethyst: "rgba(155, 109, 255, 0.3)",
    turquoise: "rgba(64, 224, 208, 0.3)",
    coral: "rgba(255, 127, 80, 0.3)"
  };

  return (
    <motion.div
      className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-white/10 transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 10px 40px ${glowColors[color]}`
      }}
    >
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <IconDisplay 
            icon={icon} 
            color={color} 
            size="lg"
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <h3 className="text-xl font-serif font-bold text-foreground mb-3">
          {title}
        </h3>
        
        <p className="text-foreground/70 font-sans leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
