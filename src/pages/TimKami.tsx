import React, { useState } from "react";
import PageLayout from "../components/layouts/PageLayout";
import TeamMemberBio from "@/components/TeamMemberBio";
import { TeamOverviewStats } from "@/components/team/TeamOverviewStats";
import { TeamCategoryFilters } from "@/components/team/TeamCategoryFilters";
import { TeamMemberGrid } from "@/components/team/TeamMemberGrid";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Team Data Structure with updated names and bios
const teamMembers = [
  {
    id: "1",
    name: "Muhammad Syahid Al Haqi",
    role: "Founder",
    imageSrc: null,
    accent: "gold",
    category: "video",
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
  },
  {
    id: "2",
    name: "Kevin/Zyu",
    role: "Video Editor",
    instagram: "Zyu.",
    imageSrc: "/lovable-uploads/video.png",
    accent: "coral",
    category: "video",
    bio: "Nanti ditambah"
  },
  {
    id: "3",
    name: "Aljaan",
    role: "Video Editor",
    instagram: "@snhrrr",
    imageSrc: "/lovable-uploads/video.png",
    accent: "coral",
    category: "video",
    bio: "Nanti ditambah"
  },
  {
    id: "4",
    name: "Daffa/deploid",
    role: "Meme Creator",
    instagram: "",
    imageSrc: "/lovable-uploads/meme.png",
    accent: "emerald",
    category: "meme",
    bio: "Nanti ditambah"
  },
  {
    id: "5",
    name: "Kevin/Zyu",
    role: "Meme Creator",
    instagram: "Zyu.",
    imageSrc: "/lovable-uploads/meme.png",
    accent: "emerald",
    category: "meme",
    bio: "Nanti ditambah"
  },
  {
    id: "6",
    name: "Ashtrozz",
    role: "Designer",
    instagram: "damz.snyther",
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst",
    category: "design",
    bio: "Nanti ditambah"
  },
  {
    id: "7",
    name: "nexx4sure",
    role: "Designer",
    instagram: "@mhmmdmhb_",
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst",
    category: "design",
    bio: "Nanti ditambah"
  },
  {
    id: "8",
    name: "瑶Xoraa",
    role: "Designer",
    instagram: "xoraareall",
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst",
    category: "design",
    bio: "Nanti ditambah"
  },
  {
    id: "9",
    name: "Rappal",
    role: "Designer",
    instagram: "raffal_arz",
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst",
    category: "design",
    bio: "Nanti ditambah"
  },
  {
    id: "10",
    name: "Ardellio",
    role: "Designer",
    instagram: "ardel.yo",
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst",
    category: "design",
    bio: "Ardellio adalah seorang siswa kelas 9 di SMPN 20 Bandung. Suka dengan coding dan programming, dan suka menulis. Meneliti dan Eksperimen dengan membuat juga menggunakan AI.",
    achievements: [
      "Juara 2 dalam kompetisi menulis RedGolden Media",
      "Telah menerbitkan 1 buku.",
      "Meraih medali emas di bidang bahasa Inggris, Di Yogyakarta (OSPI)",
      "Meraih medali emas di bidang bahasa Inggris, Di Purwokerto (OSI-SP 2023)",
      "Penghargaan Top 10 Artikel Schneider terbaik sekota Bandung."
    ]
  },
  {
    id: "11",
    name: "Kevin",
    role: "Writer",
    instagram: "kv.ein_",
    imageSrc: "/lovable-uploads/karyatulis.png",
    accent: "grayMid",
    category: "karyatulis",
    bio: "Nanti ditambah"
  },
  {
    id: "12",
    name: "Senku",
    role: "Writer",
    instagram: "Senkuphotograph",
    imageSrc: "/lovable-uploads/karyatulis.png",
    accent: "grayMid",
    category: "karyatulis",
    bio: "Nanti ditambah"
  },
  {
    id: "13",
    name: "Saviora",
    role: "Writer",
    instagram: "saviorasa",
    imageSrc: "/lovable-uploads/karyatulis.png",
    accent: "grayMid",
    category: "karyatulis",
    bio: "Nanti ditambah"
  },
  {
    id: "14",
    name: "Rappal",
    role: "Bot Developer",
    instagram: "raffal_arz",
    imageSrc: "/lovable-uploads/bot.png",
    accent: "orangeLight",
    category: "bot",
    bio: "Nanti ditambah"
  },
  {
    id: "15",
    name: "Flores",
    role: "Bot Developer",
    instagram: "flores.gold",
    imageSrc: "/lovable-uploads/bot.png",
    accent: "orangeLight",
    category: "bot",
    bio: "Nanti ditambah"
  },
  {
    id: "16",
    name: "Aljaan",
    role: "Discord Admin",
    instagram: "@snhrrr",
    imageSrc: null,
    accent: "grayMid",
    category: "admin",
    bio: "Nanti ditambah"
  }
];

// Main TimKami Component
const TimKami = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <PageLayout
      title="Tim Kami"
      subtitle="Kenali para kreator berbakat di balik OUR CREATIVITY"
    >
      {/* Category selector */}
      <TeamCategoryFilters 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Team Overview Stats */}
      <TeamOverviewStats />

      {/* Team members grid */}
      <TeamMemberGrid 
        members={teamMembers}
        activeCategory={activeCategory}
        onMemberClick={setSelectedMember}
      />

      {/* Member bio dialog */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="bg-secondary/90 backdrop-blur-xl max-w-3xl p-0 border-white/10">
          {selectedMember && <TeamMemberBio 
            bio={selectedMember.bio}
            achievements={selectedMember.achievements}
            accentColor={selectedMember.accent}
            member={selectedMember}
          />}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default TimKami;
