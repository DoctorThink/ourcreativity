
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberBioProps {
  bio?: string;
  achievements?: string[];
  accentColor?: string;
}

const TeamMemberBio: React.FC<TeamMemberBioProps> = ({ bio, achievements, accentColor = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render anything if no bio or achievements
  if (!bio && (!achievements || achievements.length === 0)) {
    return null;
  }

  // Get accent color styles
  const accentStyles: Record<string, {
    bg: string;
    text: string;
    buttonHover: string;
  }> = {
    coral: { bg: "bg-coral/10", text: "text-coral", buttonHover: "hover:bg-coral/20" },
    emerald: { bg: "bg-emerald/10", text: "text-emerald", buttonHover: "hover:bg-emerald/20" },
    blueLight: { bg: "bg-blueLight/10", text: "text-blueLight", buttonHover: "hover:bg-blueLight/20" },
    amethyst: { bg: "bg-amethyst/10", text: "text-amethyst", buttonHover: "hover:bg-amethyst/20" },
    grayMid: { bg: "bg-grayMid/10", text: "text-grayMid", buttonHover: "hover:bg-grayMid/20" },
    orangeLight: { bg: "bg-orangeLight/10", text: "text-orangeLight", buttonHover: "hover:bg-orangeLight/20" },
    gold: { bg: "bg-amber/10", text: "text-amber", buttonHover: "hover:bg-amber/20" },
    default: { bg: "bg-neutral-800/20", text: "text-neutral-400", buttonHover: "hover:bg-neutral-700/30" },
  };
  
  const accent = accentStyles[accentColor] || accentStyles.default;

  return (
    <div className="mt-2 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between px-3 py-2 rounded-md text-xs",
          "bg-foreground/5",
          accent.buttonHover,
          "transition-colors duration-200 cursor-pointer"
        )}
        aria-expanded={isOpen}
        aria-controls="bio-content"
      >
        <span>{isOpen ? "Tutup Bio" : "Lihat Bio"}</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="bio-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden gpu-accelerated"
          >
            <div className={cn(
              "pt-3 pb-2 px-3 text-xs space-y-2 backdrop-blur-sm mt-2 rounded-md border border-foreground/10",
              accent.bg
            )}>
              {bio && <p className="text-neutral-300 leading-relaxed">{bio}</p>}

              {achievements && achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-foreground/80">Prestasi:</h4>
                  <ul className="space-y-1.5">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award size={14} className={cn("mt-0.5 flex-shrink-0", accent.text)} />
                        <span className="text-neutral-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamMemberBio;
