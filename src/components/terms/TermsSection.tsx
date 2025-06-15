
import React from "react";
import { motion } from "framer-motion";
import { IconTitleRow } from "@/components/ui/IconTitleRow";
import { LucideIcon } from "lucide-react";

interface TermsSectionProps {
  id: string;
  title: string;
  number: number;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
}

export const TermsSection: React.FC<TermsSectionProps> = ({
  id,
  title,
  number,
  icon,
  iconColor,
  children
}) => {
  return (
    <motion.section
      id={id}
      className="mb-16 scroll-mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-8 rounded-full bg-amethyst text-background flex items-center justify-center text-sm font-semibold">
            {number}
          </span>
          <IconTitleRow
            icon={icon}
            iconColor={iconColor}
            title={title}
            titleClassName="text-2xl md:text-3xl font-serif font-bold"
            gap="md"
          />
        </div>
        <div className="h-px bg-gradient-to-r from-amethyst/50 via-white/20 to-transparent ml-12"></div>
      </div>
      
      <div className="ml-12 prose prose-invert max-w-none">
        <div className="text-foreground/80 font-sans leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </motion.section>
  );
};
