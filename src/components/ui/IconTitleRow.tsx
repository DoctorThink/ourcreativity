
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconTitleRowProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  titleClassName?: string;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-4", 
  lg: "gap-6"
};

export const IconTitleRow: React.FC<IconTitleRowProps> = ({
  icon: Icon,
  iconColor = "bg-amethyst text-background",
  title,
  titleClassName = "",
  gap = "md",
  className = ""
}) => {
  return (
    <div className={cn(
      "flex items-center",
      gapClasses[gap],
      className
    )}>
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
        iconColor
      )}>
        <Icon className="w-3 h-3" />
      </div>
      <h3 className={cn(
        "text-lg md:text-xl font-serif font-medium",
        titleClassName
      )}>
        {title}
      </h3>
    </div>
  );
};
