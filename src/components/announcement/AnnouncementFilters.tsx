
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "Semua", icon: null },
  { id: "event", label: "Acara", icon: Calendar },
  { id: "recruitment", label: "Rekrutmen", icon: Users },
  { id: "update", label: "Update", icon: Megaphone },
];

export const AnnouncementFilters: React.FC<AnnouncementFiltersProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3 p-1 bg-secondary/40 backdrop-blur-sm rounded-2xl border border-white/10">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = currentFilter === filter.id;
        
        return (
          <motion.div key={filter.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-foreground text-background shadow-lg' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
                }
              `}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span className="text-sm">{filter.label}</span>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};
