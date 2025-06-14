
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconDisplayProps {
  icon: LucideIcon;
  color?: "amethyst" | "turquoise" | "coral" | "mint" | "amber" | "emerald" | "softPink";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorClasses = {
  amethyst: "bg-amethyst/20 text-amethyst border-amethyst/30",
  turquoise: "bg-turquoise/20 text-turquoise border-turquoise/30", 
  coral: "bg-coral/20 text-coral border-coral/30",
  mint: "bg-mint/20 text-mint border-mint/30",
  amber: "bg-amber/20 text-amber border-amber/30",
  emerald: "bg-emerald/20 text-emerald border-emerald/30",
  softPink: "bg-softPink/20 text-softPink border-softPink/30"
};

const sizeClasses = {
  sm: "w-8 h-8 p-1.5",
  md: "w-12 h-12 p-2.5", 
  lg: "w-16 h-16 p-3.5"
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8"
};

export const IconDisplay: React.FC<IconDisplayProps> = ({ 
  icon: Icon, 
  color = "amethyst", 
  size = "md",
  className 
}) => {
  return (
    <div className={cn(
      "rounded-full border flex items-center justify-center",
      colorClasses[color],
      sizeClasses[size],
      className
    )}>
      <Icon className={cn("flex-shrink-0", iconSizes[size])} />
    </div>
  );
};
