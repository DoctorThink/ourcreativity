
import React, { useRef, useEffect } from "react";
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
  onSectionClick,
}) => {
  const activeItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSection]);

  return (
    <div className="lg:hidden mb-8 sticky top-4 z-20">
      <div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-full p-1.5">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 whitespace-nowrap">
            {items.map((item) => (
              <button
                key={item.id}
                ref={activeSection === item.id ? activeItemRef : null}
                onClick={() => onSectionClick(item.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all duration-300 flex-shrink-0 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-amethyst/80",
                  activeSection === item.id
                    ? "bg-amethyst text-background shadow-md shadow-amethyst/30"
                    : "bg-transparent text-foreground/70 hover:bg-white/10 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold",
                    activeSection === item.id
                      ? "bg-white/25 text-background"
                      : "bg-foreground/20 text-foreground/70"
                  )}
                >
                  {item.number}
                </span>
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
