
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Megaphone } from "lucide-react";
import LiquidButton from "@/components/ui/LiquidButton";

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
    <div className="flex flex-wrap gap-3 p-2 glass-morphism-shallow rounded-2xl border border-white/10">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = currentFilter === filter.id;
        
        return (
          <motion.div 
            key={filter.id} 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <LiquidButton
              variant={isActive ? "primary" : "secondary"}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
                ${isActive 
                  ? 'liquid-glow' 
                  : 'hover:bg-white/10'
                }
              `}
              glowColor={isActive ? 'var(--color-glow-primary)' : undefined}
            >
              {Icon && (
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              )}
              <span className="text-sm font-medium">{filter.label}</span>
            </LiquidButton>
          </motion.div>
        );
      })}
    </div>
  );
};
