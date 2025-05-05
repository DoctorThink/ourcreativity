
import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberBioProps {
  bio?: string;
  achievements?: string[];
  accentColor?: string;
  member?: any; // For compatibility with existing code that passes the whole member object
}

const TeamMemberBio: React.FC<TeamMemberBioProps> = ({
  bio,
  achievements = [],
  accentColor,
  member
}) => {
  // If member object is provided, extract fields from it (for backward compatibility)
  const memberBio = bio || (member ? member.bio : undefined);
  const memberAchievements = achievements.length > 0 ? achievements : (member ? member.achievements || [] : []);
  const memberAccentColor = accentColor || (member ? member.accent : undefined);

  // Accent styles mapping
  const accentStyles: Record<string, {
    bg: string; border: string; text: string; iconText: string; shadow: string; accentLine: string;
  }> = {
    coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/10", accentLine: "bg-coral" },
    emerald: { bg: "bg-emerald/10", border: "border-emerald/40", text: "text-emerald", iconText: "text-emerald", shadow: "shadow-emerald/10", accentLine: "bg-emerald" },
    blueLight: { bg: "bg-blueLight/10", border: "border-blueLight/40", text: "text-blueLight", iconText: "text-blueLight", shadow: "shadow-blueLight/10", accentLine: "bg-blueLight" },
    amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/10", accentLine: "bg-amethyst" },
    grayMid: { bg: "bg-grayMid/10", border: "border-grayMid/40", text: "text-grayMid", iconText: "text-grayMid", shadow: "shadow-grayMid/10", accentLine: "bg-grayMid" },
    orangeLight: { bg: "bg-orangeLight/10", border: "border-orangeLight/40", text: "text-orangeLight", iconText: "text-orangeLight", shadow: "shadow-orangeLight/10", accentLine: "bg-orangeLight" },
    gold: { bg: "bg-amber/10", border: "border-amber/40", text: "text-amber", iconText: "text-amber", shadow: "shadow-amber/10", accentLine: "bg-amber" },
    default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10", accentLine: "bg-neutral-500" },
  };

  const accent = accentStyles[memberAccentColor || 'default'] || accentStyles.default;

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Bio Section */}
      {memberBio && memberBio !== "Nanti ditambah" && (
        <div>
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-serif mb-3"
          >
            Biodata
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-foreground/80 leading-relaxed"
          >
            {memberBio}
          </motion.div>
        </div>
      )}

      {/* Achievements Section */}
      {memberAchievements && memberAchievements.length > 0 && (
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className={cn("p-2 rounded-full", accent.bg)}>
              <Trophy className={cn("w-4 h-4", accent.text)} />
            </div>
            <h3 className="text-xl font-serif">Prestasi</h3>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-3"
          >
            {memberAchievements.map((achievement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
                className="flex items-start gap-3 text-foreground/80"
              >
                <span className={cn("inline-block w-1.5 h-1.5 rounded-full mt-2", accent.accentLine)} />
                <span>{achievement}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )}

      {/* Placeholder for empty bio and achievements */}
      {(!memberBio || memberBio === "Nanti ditambah") && (!memberAchievements || memberAchievements.length === 0) && (
        <div className="text-center py-8">
          <p className="text-foreground/60 italic">Informasi lengkap akan segera hadir.</p>
        </div>
      )}
    </div>
  );
};

export default TeamMemberBio;
