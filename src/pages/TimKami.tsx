import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Film, Palette, Feather, Bot, ShieldCheck, Smile, Gamepad2, Instagram, User } from 'lucide-react';
import React from "react";

/**
 * FILES/FOLDERS TO CHECK/ENSURE EXIST AND ARE CONFIGURED:
 *
 * 1.  `src/components/layouts/PageLayout.tsx`: (Assumed consistent with PageLayout.tsx (1).txt)
 *     - Provides page structure, header, background effects, ScrollArea.
 *
 * 2.  `public/lovable-uploads/`: (UPDATED - CHECK THESE FILES ARE PRESENT)
 *     - Must contain: `video.png`, `design.png`, `karyatulis.png`, `game.png`, `meme.png`, `bot.png`.
 *       **NEW IMAGES: `meme.png`, `bot.png` - ENSURE THESE ARE ADDED TO THIS FOLDER.**
 *
 * 3.  `src/index.css`: (Assumed consistent with index (4).css)
 *     - Defines CSS variables, font families, Tailwind directives.
 *
 * 4.  `tailwind.config.ts`: (Assumed consistent with tailwind.config (1).ts.txt)
 *     - Defines necessary accent colors.
 *
 * 5.  `src/lib/utils.ts`: (Assumed consistent with utils.ts.txt)
 *     - Provides the `cn` utility function.
 *
 * 6.  `lucide-react` (dependency): Assumed installed.
 * 7.  `framer-motion` (dependency): Assumed installed.
 */

// --- Animation Variants (No changes needed) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const sectionCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.2, 0.0, 0.2, 1.0] },
  },
};

const memberListVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.2 }
    }
};

const memberCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// --- Team Data Structure (Updated with meme.png and bot.png paths) ---
const teamData = [
  {
    title: "Video Editing",
    icon: Film,
    imageSrc: "/lovable-uploads/video.png",
    accent: "coral",
    members: [
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Video Editor" },
      { name: "Aljaan", instagram: "@snhrrr", role: "Video Editor" }
    ]
  },
   {
    title: "Meme Creator",
    icon: Smile,
    imageSrc: "/lovable-uploads/meme.png", // ADDED meme.png path
    accent: "emerald",
    members: [
      { name: "Daffa/deploid", instagram: "", role: "Meme Creator" },
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Meme Creator" }
    ]
  },
  {
    title: "Game Konten",
    icon: Gamepad2,
    imageSrc: "/lovable-uploads/game.png",
    accent: "blueLight",
    members: [
      { name: "PlayerOne", instagram: "player.one", role: "Content Creator" },
      { name: "GamerX", instagram: "thegamerx", role: "Streamer" },
    ]
  },
  {
    title: "Design Grafis",
    icon: Palette,
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst",
    members: [
      { name: "Ashtrozz", instagram: "damz.snyther", role: "Designer" },
      { name: "nexx4sure", instagram: "@mhmmdmhb_", role: "Designer" },
      { name: "Arriesh", instagram: "@esh33", role: "Designer" },
      { name: "Rappal", instagram: "raffal_arz", role: "Designer" },
      { name: "Ardellio", instagram: "ardel.yo", role: "Designer" }
    ]
  },
  {
    title: "Karya Tulis",
    icon: Feather,
    imageSrc: "/lovable-uploads/karyatulis.png",
    accent: "grayMid",
    members: [
      { name: "Kevin", instagram: "kv.ein_", role: "Writer" },
      { name: "Senku", instagram: "Senkuphotograph", role: "Writer" },
      { name: "Saviora", instagram: "saviorasa", role: "Writer" }
    ]
  },
  {
    title: "Bot Developer",
    icon: Bot,
    imageSrc: "/lovable-uploads/bot.png", // ADDED bot.png path
    accent: "orangeLight",
    members: [
      { name: "Rappal", instagram: "raffal_arz", role: "Bot Developer" },
      { name: "Flores", instagram: "flores.gold", role: "Bot Developer" }
    ]
  },
  {
    title: "Admin Discord",
    icon: ShieldCheck,
    imageSrc: null,
    accent: "grayMid",
    members: [
      { name: "Aljaan", instagram: "@snhrrr", role: "Discord Admin" }
    ]
  }
];

// --- Accent Color Mapping (No changes needed) ---
const accentStyles: Record<string, {
    bg: string; border: string; text: string; iconText: string; shadow: string; accentLine: string; avatarBorder: string;
}> = {
  coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/10", accentLine: "bg-coral", avatarBorder: "border-coral/70" },
  emerald: { bg: "bg-emerald/10", border: "border-emerald/40", text: "text-emerald", iconText: "text-emerald", shadow: "shadow-emerald/10", accentLine: "bg-emerald", avatarBorder: "border-emerald/70" },
  blueLight: { bg: "bg-blueLight/10", border: "border-blueLight/40", text: "text-blueLight", iconText: "text-blueLight", shadow: "shadow-blueLight/10", accentLine: "bg-blueLight", avatarBorder: "border-blueLight/70" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/10", accentLine: "bg-amethyst", avatarBorder: "border-amethyst/70" },
  grayMid: { bg: "bg-grayMid/10", border: "border-grayMid/40", text: "text-grayMid", iconText: "text-grayMid", shadow: "shadow-grayMid/10", accentLine: "bg-grayMid", avatarBorder: "border-grayMid/70" },
  orangeLight: { bg: "bg-orangeLight/10", border: "border-orangeLight/40", text: "text-orangeLight", iconText: "text-orangeLight", shadow: "shadow-orangeLight/10", accentLine: "bg-orangeLight", avatarBorder: "border-orangeLight/70" },
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10", accentLine: "bg-neutral-500", avatarBorder: "border-neutral-500/70" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
};

// --- Helper Function for Initials (No changes needed) ---
const getInitials = (name: string): string => {
    if (!name) return "?";
    const nameParts = name.split(/[\s/]+/);
    if (nameParts.length === 1) return name.charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

// --- Team Member Card Component (No changes needed) ---
interface TeamMemberCardProps {
  name: string;
  role: string;
  instagram?: string | null;
  accentColor?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, instagram, accentColor }) => {
    const accent = getAccentStyle(accentColor);
    const initials = getInitials(name);
    const instaUser = instagram?.replace('@', '');
    const instaLink = instaUser ? `https://instagram.com/${instaUser}` : null;

    return (
        <motion.div
            variants={memberCardVariants}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
            className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border relative overflow-hidden",
                "bg-neutral-800/50 backdrop-blur-sm",
                "border-neutral-700/60 hover:border-neutral-600 transition-colors duration-200"
            )}
        >
            {/* Circular Avatar (No changes needed here, already circular) */}
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
                 <div className={cn("absolute inset-0 opacity-10 blur-[1px]", accent.bg.replace('/10','/30'))}></div>
            </motion.div>

            {/* Text Info (No changes needed) */}
            <div className="flex-grow">
                <h3 className="text-md md:text-lg font-semibold font-serif text-foreground leading-tight">{name}</h3>
                <p className="text-xs md:text-sm text-neutral-400 font-sans">{role}</p>
            </div>

            {/* Instagram Link (No changes needed) */}
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
            {/* Decorative Corner Arc (No changes needed) */}
            <div className={cn(
                "absolute bottom-0 right-0 w-12 h-12 border-l border-t rounded-tl-full opacity-20",
                 accent.border
            )}></div>
        </motion.div>
    );
};


// --- Main TimKami Component ---
const TimKami = () => {
  return (
    <PageLayout
      title="Tim Kami"
      subtitle="Kenali lebih dekat para kreator dan admin di balik OUR CREATIVITY"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10 md:space-y-12"
      >
        {teamData.map((section) => {
          const SectionIcon = section.icon;
          const accent = getAccentStyle(section.accent);

          return (
            <motion.section
              key={section.title}
              variants={sectionCardVariants}
              className={cn(
                "rounded-[28px] border-2 relative overflow-hidden shadow-xl",
                "bg-gradient-to-b from-secondary/50 to-secondary/70 backdrop-blur-lg",
                accent.border,
                accent.shadow
              )}
            >
              {/* Header */}
              <div className={cn("p-4 flex items-center gap-3 relative", accent.bg)}>
                   {section.imageSrc ? (
                     <motion.img
                       src={section.imageSrc}
                       alt={`${section.title} logo`}
                       className="w-24 h-24 object-contain rounded-full flex-shrink-0 bg-black/10 p-1 md:p-1.5" // ENLARGED SIZE TO w-24 h-24 and rounded-full
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 0.1 }}
                     />
                   ) : (
                     <SectionIcon className={cn("w-6 h-6 flex-shrink-0", accent.iconText)} />
                   )}
                   <h2 className="text-xl font-semibold font-serif text-foreground tracking-tight">
                     {section.title} ({section.members.length})
                   </h2>
                   <div className={cn("absolute bottom-0 left-0 h-[3px] w-full", accent.accentLine)}></div>
                   <div className="absolute inset-0 noise-pattern opacity-[0.01]"></div>
              </div>

              {/* Member List */}
              <motion.div
                 variants={memberListVariants}
                 initial="hidden"
                 animate="visible"
                 className="p-4 md:p-5 space-y-3 md:space-y-4"
               >
                  {section.members.map((member, index) => (
                    <TeamMemberCard
                       key={`${section.title}-${member.name}-${index}`}
                       name={member.name}
                       role={member.role}
                       instagram={member.instagram}
                       accentColor={section.accent}
                    />
                  ))}
              </motion.div>

               <div className={cn("absolute inset-x-0 bottom-0 h-1/2 rounded-t-3xl opacity-[0.03] blur-xl", accent.bg.replace('/10','/80'))}></div>

            </motion.section>
          );
        })}
      </motion.div>
    </PageLayout>
  );
};

export default TimKami;
