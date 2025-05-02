// --- START OF FILE TimKami.tsx (3) ---
// src/pages/TimKami.tsx

import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Film, Palette, Feather, Bot, ShieldCheck, Smile, Gamepad2, User, Crown, Award } from 'lucide-react'; // Added Award
import React from "react";
import TeamMemberCard from "@/components/TeamMemberCard"; // Import the updated component

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const memberListVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
        },
    }
};

const memberCardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// --- Team Data Structure with updated names and bios ---
// Use the provided data structure
const founderData = {
  name: "Muhammad Syahid Al Haqi",
  role: "Founder",
  imageSrc: null, // No specific image provided for founder card itself
  accent: "gold",
  members: [
    {
      name: "Muhammad Syahid Al Haqi",
      role: "Founder",
      instagram: "hakyyofficial", // Add instagram if available
      bio: "M. Syahid Al-Haqi Seorang Remaja Penggemar Sastra Yang Berdomisili Di Lampung, telah meraih berbagai prestasi dari hasil karyanya. M. Syahid Al - Haqi yang berstatus sebagai siswa kelas X SMAN 9 Bandar Lampung, merupakan Putra Pertama dari Ibu Septiyana Natalia S.Pd dan Bapak Sigit Jatmiko. Dimana selain berstatus sebagai pelajar, Haqi Juga menyalurkan minat Bakatnya pada Perusahaan Penerbitan sebagai Desainer Grafis Dan Penulis.",
      achievements: [
        "Mendapatkan langsung Reward Umroh yang diserahkan langsung oleh Walikota Bandar Lampung, di acara DPD KNPI.",
        "Juara 1 lomba baca Puisi nasional di Universitas Brawijaya Malang.",
        "Juara 1 Lomba Cipta Baca Puisi Nasional di KGLL Lampung.",
        "Juara 3 Lomba Baca Puisi BEM FKIP UNILA.",
        "Juara 3 Lomba Baca Puisi UNUSA Surabaya.",
        "Juara 2 Lomba Baca Puisi KMNU UNILA.",
        "Juara 3 Lomba Baca Puisi Regional.",
        "Juara 3 Lomba Baca Puisi SBS HMPJ Universitas Lampung 2023.",
        "Dalam Acara AMUSE AL KAUTSAR 2023."
      ]
    }
  ]
};

const teamData = [
  {
    title: "Video Editing",
    icon: Film,
    imageSrc: "/lovable-uploads/video.png",
    accent: "coral",
    members: [
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Video Editor", bio: "Nanti ditambah" },
      { name: "Aljaan", instagram: "@snhrrr", role: "Video Editor", bio: "Nanti ditambah" }
    ]
  },
  {
    title: "Meme Creator",
    icon: Smile,
    imageSrc: "/lovable-uploads/meme.png",
    accent: "emerald",
    members: [
      { name: "Daffa/deploid", instagram: "", role: "Meme Creator", bio: "Nanti ditambah" },
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Meme Creator", bio: "Nanti ditambah" }
    ]
  },
  {
    title: "Design Grafis",
    icon: Palette,
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst",
    members: [
      { name: "Ashtrozz", instagram: "damz.snyther", role: "Designer", bio: "Nanti ditambah" },
      { name: "nexx4sure", instagram: "@mhmmdmhb_", role: "Designer", bio: "Nanti ditambah" },
      { name: "瑶Xoraa", instagram: "xoraareall", role: "Designer", bio: "Nanti ditambah" },
      { name: "Rappal", instagram: "raffal_arz", role: "Designer", bio: "Nanti ditambah" },
      {
        name: "Ardellio",
        instagram: "ardel.yo",
        role: "Designer",
        bio: "Ardellio adalah seorang siswa kelas 9 di SMPN 20 Bandung. Suka dengan coding dan programming, dan suka menulis. Meneliti dan Eksperimen dengan membuat juga menggunakan AI.",
        achievements: [
          "Juara 2 dalam kompetisi menulis RedGolden Media",
          "Telah menerbitkan 1 buku.",
          "Meraih medali emas di bidang bahasa Inggris, Di Yogyakarta (OSPI)",
          "Meraih medali emas di bidang bahasa Inggris, Di Purwokerto (OSI-SP 2023)",
          "Penghargaan Top 10 Artikel Schneider terbaik sekota Bandung."
        ]
      }
    ]
  },
  {
    title: "Karya Tulis",
    icon: Feather,
    imageSrc: "/lovable-uploads/karyatulis.png",
    accent: "grayMid",
    members: [
      { name: "Kevin", instagram: "kv.ein_", role: "Writer", bio: "Nanti ditambah" },
      { name: "Senku", instagram: "Senkuphotograph", role: "Writer", bio: "Nanti ditambah" },
      { name: "Saviora", instagram: "saviorasa", role: "Writer", bio: "Nanti ditambah" }
    ]
  },
  {
    title: "Bot Developer",
    icon: Bot,
    imageSrc: "/lovable-uploads/bot.png",
    accent: "orangeLight",
    members: [
      { name: "Rappal", instagram: "raffal_arz", role: "Bot Developer", bio: "Nanti ditambah" },
      { name: "Flores", instagram: "flores.gold", role: "Bot Developer", bio: "Nanti ditambah" }
    ]
  },
  {
    title: "Admin Discord",
    icon: ShieldCheck,
    imageSrc: null, // No specific image
    accent: "grayMid",
    members: [
      { name: "Aljaan", instagram: "@snhrrr", role: "Discord Admin", bio: "Nanti ditambah" }
    ]
  }
];

// --- Accent Color Mapping (Copied from TeamMemberCard for consistency) ---
const accentStyles: Record<string, {
    bg: string; border: string; text: string; iconText: string; shadow: string; accentLine: string; avatarBorder: string; iconBg?: string; // Added optional iconBg
}> = {
  coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/10", accentLine: "bg-coral", avatarBorder: "border-coral/70", iconBg: "bg-coral/10" },
  emerald: { bg: "bg-emerald/10", border: "border-emerald/40", text: "text-emerald", iconText: "text-emerald", shadow: "shadow-emerald/10", accentLine: "bg-emerald", avatarBorder: "border-emerald/70", iconBg: "bg-emerald/10" },
  blueLight: { bg: "bg-blueLight/10", border: "border-blueLight/40", text: "text-blueLight", iconText: "text-blueLight", shadow: "shadow-blueLight/10", accentLine: "bg-blueLight", avatarBorder: "border-blueLight/70", iconBg: "bg-blueLight/10" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/10", accentLine: "bg-amethyst", avatarBorder: "border-amethyst/70", iconBg: "bg-amethyst/10" },
  grayMid: { bg: "bg-grayMid/10", border: "border-grayMid/40", text: "text-grayMid", iconText: "text-grayMid", shadow: "shadow-grayMid/10", accentLine: "bg-grayMid", avatarBorder: "border-grayMid/70", iconBg: "bg-grayMid/10" },
  orangeLight: { bg: "bg-orangeLight/10", border: "border-orangeLight/40", text: "text-orangeLight", iconText: "text-orangeLight", shadow: "shadow-orangeLight/10", accentLine: "bg-orangeLight", avatarBorder: "border-orangeLight/70", iconBg: "bg-orangeLight/10" },
  gold: { bg: "bg-amber/10", border: "border-amber/40", text: "text-amber", iconText: "text-amber-400", shadow: "shadow-amber/15", accentLine: "bg-amber", avatarBorder: "border-amber/70", iconBg: "bg-amber-900/30" }, // Adjusted gold icon text/bg for better contrast
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10", accentLine: "bg-neutral-500", avatarBorder: "border-neutral-500/70", iconBg: "bg-neutral-800/50" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
};


// --- Main TimKami Component ---
const TimKami = () => {
  const founderAccent = getAccentStyle(founderData.accent); // Get founder accent style

  return (
    <PageLayout
      title="Tim Kami"
      subtitle="Kenali lebih dekat para kreator dan admin di balik OUR CREATIVITY"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16 md:space-y-24"
      >
        {/* --- Founder Section --- */}
        <motion.section
          variants={sectionVariants}
          className={cn(
            "rounded-[28px] border-2 relative overflow-hidden shadow-xl", // Consistent rounded corners, removed gpu-accelerated
            "bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-neutral-900/20 backdrop-blur-lg", // Premium gold-ish gradient
            founderAccent.border, // Gold border
            founderAccent.shadow // Gold shadow
          )}
        >
          {/* Header */}
          <div className={cn(
            "p-4 flex items-center gap-3.5 relative border-b", // Added border-b
            founderAccent.border // Gold border bottom for header
          )}>
             {/* Icon/Image Placeholder */}
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", founderAccent.iconBg)}>
                 <Crown className={cn("w-6 h-6", founderAccent.iconText)} />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold font-serif text-foreground tracking-tight text-shadow-sm"> {/* Added text shadow */}
              Founder
            </h2>
            {/* Optional: Subtle accent line instead of border-b if preferred */}
            {/* <div className={cn("absolute bottom-0 left-0 h-[2px] w-full", founderAccent.accentLine)}></div> */}
             {/* Subtle noise pattern */}
             <div className="absolute inset-0 noise-pattern opacity-[0.02] pointer-events-none"></div>
          </div>

          {/* Member Card (Only one founder) */}
          <motion.div
             // No memberListVariants needed for single item
             initial="hidden" // Apply animation directly
             animate="visible"
             variants={{ // Simple fade-in for single card
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.4 } }
             }}
             className="p-4 md:p-5" // removed gpu-accelerated
           >
            <TeamMemberCard
              name={founderData.members[0].name}
              role={founderData.members[0].role}
              instagram={founderData.members[0].instagram}
              accentColor={founderData.accent}
              bio={founderData.members[0].bio}
              achievements={founderData.members[0].achievements}
            />
          </motion.div>

          {/* Background Element */}
          <div className={cn(
              "absolute inset-x-0 bottom-0 h-1/2 rounded-t-3xl opacity-[0.05] bg-gradient-to-t from-amber-500/30 to-transparent pointer-events-none z-0" // Ensure it's behind content
           )}></div>
        </motion.section>

        {/* --- Team Sections --- */}
        {teamData.map((section) => {
          const SectionIcon = section.icon;
          const accent = getAccentStyle(section.accent);

          return (
            <motion.section
              key={section.title}
              variants={sectionVariants}
              className={cn(
                "rounded-[28px] border relative overflow-hidden shadow-lg", // Consistent rounded corners, removed gpu-accelerated
                "bg-gradient-to-b from-secondary/60 to-secondary/80 backdrop-blur-lg", // Standard section background
                accent.border,
                accent.shadow
              )}
            >
              {/* Header */}
              <div className={cn(
                  "p-4 flex items-center gap-3.5 relative border-b", // Added border-b
                  accent.border // Use accent color for border
              )}>
                {/* Section Image/Icon */}
                {section.imageSrc ? (
                  <motion.img
                    src={section.imageSrc}
                    alt={`${section.title} logo`}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full flex-shrink-0 bg-black/20 p-1 border border-neutral-700 shadow-sm" // Adjusted size, added border
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05, type: "spring", stiffness: 200 }}
                    loading="lazy" // Lazy load team section images
                  />
                ) : (
                  // Fallback icon if no image
                  <div className={cn("w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center flex-shrink-0 border border-neutral-700", accent.iconBg || 'bg-neutral-800/50')}>
                      <SectionIcon className={cn("w-8 h-8 md:w-10 md:h-10", accent.iconText)} />
                   </div>
                )}
                {/* Section Title */}
                <h2 className="text-xl md:text-2xl font-semibold font-serif text-foreground tracking-tight text-shadow-sm">
                  {section.title} <span className="text-base font-sans text-neutral-400">({section.members.length})</span>
                </h2>
                {/* Optional Accent Line */}
                {/* <div className={cn("absolute bottom-0 left-0 h-[2px] w-full", accent.accentLine)}></div> */}
                 <div className="absolute inset-0 noise-pattern opacity-[0.01] pointer-events-none"></div> {/* Subtle noise in header */}
              </div>

              {/* Member List */}
              <motion.div
                variants={memberListVariants}
                initial="hidden"
                animate="visible"
                className="p-4 md:p-5 space-y-3 md:space-y-4" // removed gpu-accelerated
              >
                {section.members.map((member, index) => (
                  <motion.div key={`${section.title}-${member.name}-${index}`} variants={memberCardVariants}>
                    <TeamMemberCard
                      name={member.name}
                      role={member.role}
                      instagram={member.instagram}
                      accentColor={section.accent}
                      bio={member.bio}
                      achievements={member.achievements}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Background Element */}
              <div className={cn(
                "absolute inset-x-0 bottom-0 h-1/2 rounded-t-3xl opacity-[0.04] pointer-events-none z-0", // Ensure it's behind content
                accent.bg.replace('/10','/80') // Use accent bg for the glow
              )}></div>
            </motion.section>
          );
        })}
      </motion.div>
    </PageLayout>
  );
};

export default TimKami;
