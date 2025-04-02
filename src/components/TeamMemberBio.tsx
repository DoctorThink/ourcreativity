
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

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mt-2 w-full">
      <motion.button
        onClick={toggleOpen}
        className={cn(
          "flex w-full items-center justify-between px-3 py-2 rounded-md text-xs",
          "bg-foreground/5 hover:bg-foreground/10",
          "transition-colors duration-200"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isOpen ? "Tutup Bio" : "Lihat Bio"}</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden gpu-accelerated"
          >
            <div className="pt-3 pb-2 px-3 text-xs space-y-2 backdrop-blur-sm bg-foreground/5 mt-2 rounded-md border border-foreground/10">
              {bio && <p className="text-neutral-300 leading-relaxed">{bio}</p>}

              {achievements && achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-foreground/80">Prestasi:</h4>
                  <ul className="space-y-1.5">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award size={14} className="mt-0.5 flex-shrink-0 text-amber-300" />
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
