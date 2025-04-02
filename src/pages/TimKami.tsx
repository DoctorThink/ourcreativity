
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Film, Palette, Feather, Bot, ShieldCheck, Smile, Gamepad2, User, Crown } from 'lucide-react';
import React from "react";
import TeamMemberCard from "@/components/TeamMemberCard";

// --- Animation Variants (Optimized for smoother transitions) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, // Reduced stagger for smoother appearance
      delayChildren: 0.05,
      ease: "easeOut"
    },
  },
};

const sectionCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1.0] // More natural easing
    },
  },
};

const memberListVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { 
          staggerChildren: 0.04,
          delayChildren: 0.1,
          ease: "easeOut"
        }
    }
};

// --- Team Data Structure with updated names and bios ---
const founderData = {
  name: "Muhammad Syahid Al Haqi",
  role: "Founder",
  imageSrc: null,
  accent: "gold",
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
  ],
  members: [
    {
      name: "Muhammad Syahid Al Haqi",
      role: "Founder",
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
    title: "Game Konten",
    icon: Gamepad2,
    imageSrc: "/lovable-uploads/game.png",
    accent: "blueLight",
    members: [
      { name: "PlayerOne", instagram: "player.one", role: "Content Creator", bio: "Nanti ditambah" },
      { name: "GamerX", instagram: "thegamerx", role: "Streamer", bio: "Nanti ditambah" }
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
      { name: "Arriesh", instagram: "@esh33", role: "Designer", bio: "Nanti ditambah" },
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
    imageSrc: null,
    accent: "grayMid",
    members: [
      { name: "Aljaan", instagram: "@snhrrr", role: "Discord Admin", bio: "Nanti ditambah" }
    ]
  }
];

// --- Accent Color Mapping ---
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

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
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
        className="space-y-10 md:space-y-12 gpu-accelerated"
      >
        {/* Founder Section */}
        <motion.section
          variants={sectionCardVariants}
          className={cn(
            "rounded-[28px] border-2 relative overflow-hidden shadow-xl gpu-accelerated",
            "bg-gradient-to-br from-amber/5 via-amber/10 to-orange-500/5 backdrop-blur-lg",
            "border-amber/40",
            "shadow-amber/10"
          )}
        >
          {/* Header */}
          <div className={cn(
            "p-4 flex items-center gap-3 relative",
            "bg-gradient-to-r from-amber/30 to-amber/5"
          )}>
            <Crown className="w-8 h-8 text-amber" />
            <h2 className="text-xl font-semibold font-serif text-foreground tracking-tight text-sharp">
              Founder
            </h2>
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-amber via-orange-500/50 to-amber/30"></div>
          </div>

          {/* Member List */}
          <motion.div
            variants={memberListVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-5 gpu-accelerated"
          >
            <TeamMemberCard
              name={founderData.members[0].name}
              role={founderData.members[0].role}
              accentColor="gold"
              bio={founderData.members[0].bio}
              achievements={founderData.members[0].achievements}
            />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-t-3xl opacity-[0.03] bg-gradient-to-t from-amber to-amber/5"></div>
        </motion.section>

        {/* Team Sections */}
        {teamData.map((section) => {
          const SectionIcon = section.icon;
          const accent = getAccentStyle(section.accent);

          return (
            <motion.section
              key={section.title}
              variants={sectionCardVariants}
              className={cn(
                "rounded-[28px] border-2 relative overflow-hidden shadow-xl gpu-accelerated",
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
                    className="w-24 h-24 object-contain rounded-full flex-shrink-0 bg-black/10 p-1 md:p-1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    loading="lazy"
                  />
                ) : (
                  <SectionIcon className={cn("w-6 h-6 flex-shrink-0", accent.iconText)} />
                )}
                <h2 className="text-xl font-semibold font-serif text-foreground tracking-tight text-sharp">
                  {section.title} ({section.members.length})
                </h2>
                <div className={cn("absolute bottom-0 left-0 h-[3px] w-full", accent.accentLine)}></div>
              </div>

              {/* Member List */}
              <motion.div
                variants={memberListVariants}
                initial="hidden"
                animate="visible"
                className="p-4 md:p-5 space-y-3 md:space-y-4 gpu-accelerated"
              >
                {section.members.map((member, index) => (
                  <TeamMemberCard
                    key={`${section.title}-${member.name}-${index}`}
                    name={member.name}
                    role={member.role}
                    instagram={member.instagram}
                    accentColor={section.accent}
                    bio={member.bio}
                    achievements={member.achievements}
                  />
                ))}
              </motion.div>

              <div className={cn(
                "absolute inset-x-0 bottom-0 h-1/2 rounded-t-3xl opacity-[0.03]", 
                accent.bg.replace('/10','/80')
              )}></div>
            </motion.section>
          );
        })}
      </motion.div>
    </PageLayout>
  );
};

export default TimKami;
