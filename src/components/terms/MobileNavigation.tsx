
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const activeItem = items.find((item) => item.id === activeSection);

  return (
    <div className="lg:hidden mb-8 sticky top-4 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full px-4 py-3 flex items-center justify-between text-left bg-card/90 backdrop-blur-md border border-white/10 rounded-2xl data-[state=open]:rounded-b-none transition-all">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amethyst text-background flex items-center justify-center text-xs font-medium">
                {activeItem?.number || 1}
              </span>
              <span className="font-sans text-sm text-foreground">
                {activeItem?.title || "Navigasi Bagian"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-foreground/60 transition-transform data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] bg-card/90 backdrop-blur-md border border-white/10 rounded-2xl rounded-t-none border-t-0 p-2"
          sideOffset={-1}
        >
          <div className="space-y-1">
            {items.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onSelect={() => onSectionClick(item.id)}
                className={cn(
                  "cursor-pointer rounded-lg transition-colors px-3 py-2 outline-none",
                  activeSection === item.id
                    ? "bg-amethyst/20 text-amethyst focus:bg-amethyst/25"
                    : "text-foreground/70 focus:bg-white/10 focus:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      activeSection === item.id
                        ? "bg-amethyst text-background"
                        : "bg-foreground/20 text-foreground/60"
                    )}
                  >
                    {item.number}
                  </span>
                  <span className="text-sm">{item.title}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
