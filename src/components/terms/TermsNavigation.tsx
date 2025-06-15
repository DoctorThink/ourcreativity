
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  title: string;
  number: number;
}

interface TermsNavigationProps {
  items: NavigationItem[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const TermsNavigation: React.FC<TermsNavigationProps> = ({
  items,
  activeSection,
  onSectionClick
}) => {
  return (
    <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
      <div className="sticky top-8">
        <div className="bg-card/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-serif font-semibold text-foreground mb-6">
            Daftar Isi
          </h3>
          <nav className="space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group",
                  "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amethyst/50",
                  activeSection === item.id
                    ? "bg-amethyst/20 text-amethyst border-l-2 border-amethyst"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                    activeSection === item.id
                      ? "bg-amethyst text-background"
                      : "bg-foreground/20 text-foreground/60"
                  )}>
                    {item.number}
                  </span>
                  <span className="font-sans text-sm">{item.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
