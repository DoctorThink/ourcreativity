
// --- START OF FILE TeamMemberCard.tsx ---
import React from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  name: string;
  role: string;
  instagram?: string | null;
  accentColor?: string;
  bio?: string;
  achievements?: string[];
  onClick?: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  instagram,
  accentColor,
  bio,
  achievements,
  onClick
}) => {
    const getInitials = (name: string): string => {
      if (!name) return "?";
      const nameParts = name.split(/[\s/]+/);
      if (nameParts.length === 1) return name.charAt(0).toUpperCase();
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    };

    const initials = getInitials(name);
    const instaUser = instagram?.replace('@', '');
    const instaLink = instaUser ? `https://instagram.com/${instaUser}` : null;

    // Accent styles mapping
    const accentStyles: Record<string, {
      bg: string; border: string; text: string; iconText: string; shadow: string; accentLine: string; avatarBorder: string;
    }> = {
      coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/10", accentLine: "bg-coral", avatarBorder: "border-coral/70" },
      emerald: { bg: "bg-emerald/10", border: "border-emerald/40", text: "text-emerald", iconText: "text-emerald", shadow: "shadow-emerald/10", accentLine: "bg-emerald", avatarBorder: "border-emerald/70" },
      blueLight: { bg: "bg-blueLight/10", border: "border-blueLight/40", text: "text-blueLight", iconText: "text-blueLight", shadow: "shadow-blueLight/10", accentLine: "bg-blueLight", avatarBorder: "border-blueLight/70" },
      amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/10", accentLine: "bg-amethyst", avatarBorder: "border-amethyst/70" },
      grayMid: { bg: "bg-grayMid/10", border: "border-grayMid/40", text: "text-grayMid", iconText: "text-grayMid", shadow: "shadow-grayMid/10", accentLine: "bg-grayMid", avatarBorder: "border-grayMid/70" },
      orangeLight: { bg: "bg-orangeLight/10", border: "border-orangeLight/40", text: "text-orangeLight", iconText: "text-orangeLight", shadow: "shadow-orangeLight/10", accentLine: "bg-orangeLight", avatarBorder: "border-orangeLight/70" },
      gold: { bg: "bg-amber/10", border: "border-amber/40", text: "text-amber", iconText: "text-amber", shadow: "shadow-amber/10", accentLine: "bg-amber", avatarBorder: "border-amber/70" },
      default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10", accentLine: "bg-neutral-500", avatarBorder: "border-neutral-500/70" },
    };

    const accent = accentStyles[accentColor || 'default'] || accentStyles.default;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } }
            }}
            whileHover={{
              scale: 1.02,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 15
              }
            }}
            onClick={onClick}
            className={cn(
                "flex flex-col gap-4 p-4 rounded-2xl border relative overflow-hidden", 
                "bg-neutral-800/50 backdrop-blur-sm",
                "border-neutral-700/60 hover:border-neutral-600 transition-colors duration-200",
                onClick ? "cursor-pointer" : ""
            )}
        >
             {/* Group main content and ensure it's above decorations */}
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    {/* Circular Avatar */}
                    <motion.div
                        className={cn(
                            "w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex-shrink-0 flex items-center justify-center relative overflow-hidden",
                            "bg-gradient-to-br from-neutral-700 to-neutral-800",
                            accent.avatarBorder
                        )}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-xl md:text-2xl font-semibold font-sans text-white/80 z-10">{initials}</span>
                        <div className={cn("absolute inset-0 opacity-10", accent.bg.replace('/10','/30'))}></div>
                    </motion.div>

                    {/* Text Info */}
                    <div className="flex-grow">
                        <h3 className="text-md md:text-lg font-semibold font-serif text-foreground leading-tight text-sharp">{name}</h3>
                        <p className="text-xs md:text-sm text-neutral-400 font-sans">{role}</p>
                    </div>

                    {/* Instagram Link */}
                    {instaLink && (
                        <motion.a
                            href={instaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                            whileHover={{ x: -2 }}
                            title={`@${instaUser}`}
                        >
                            <Instagram size={14} />
                            <span className="hidden sm:inline truncate max-w-[80px]">{instaUser}</span>
                        </motion.a>
                    )}
                </div>

                {/* Bio preview if available */}
                {(bio || (achievements && achievements.length > 0)) && (
                    <div className="text-xs text-neutral-400 line-clamp-2">
                        {bio ? bio.substring(0, 80) + (bio.length > 80 ? '...' : '') : 'Lihat prestasi'}
                    </div>
                )}
            </div>

            {/* Decorative Elements */}
            <div className={cn(
                "absolute bottom-0 right-0 w-12 h-12 border-l border-t rounded-tl-full opacity-20 pointer-events-none z-0",
                accent.border
            )}></div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-foreground/5 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none z-0"></div>
            <div className="absolute inset-0 shadow-inner opacity-20 pointer-events-none z-0"></div>
            <div className="absolute inset-0 community-node opacity-30 pointer-events-none z-0"></div> 
        </motion.div>
    );
};

export default TeamMemberCard;
