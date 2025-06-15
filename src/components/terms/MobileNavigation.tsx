
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  title: string;
  number: number;
}

interface MobileNavigationProps {
  items: NavigationItem[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  activeSection,
  onSectionClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = items.find(item => item.id === activeSection);

  return (
    <div className="lg:hidden mb-8 sticky top-4 z-20">
      <div className="bg-card/90 backdrop-blur-md border border-white/10 rounded-2xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-amethyst text-background flex items-center justify-center text-xs font-medium">
              {activeItem?.number || 1}
            </span>
            <span className="font-sans text-sm text-foreground">
              {activeItem?.title || "Navigasi Bagian"}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-foreground/60" />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="p-2 space-y-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionClick(item.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-colors",
                      "hover:bg-white/10",
                      activeSection === item.id
                        ? "bg-amethyst/20 text-amethyst"
                        : "text-foreground/70"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                        activeSection === item.id
                          ? "bg-amethyst text-background"
                          : "bg-foreground/20 text-foreground/60"
                      )}>
                        {item.number}
                      </span>
                      <span className="text-sm">{item.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
