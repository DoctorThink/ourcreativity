import React, { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import TeamMemberCard from "@/components/TeamMemberCard";
import TeamMemberBio from "@/components/TeamMemberBio";
import BentoCard from "@/components/ui/BentoCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Users, User, Video, Palette, Smile, FileText } from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const memberVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

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

// Team Categories with proper icons
const categories = [
  {
    id: "video",
    name: "Video Editing",
    icon: Video,
    color: "bg-coral text-white",
    accentColor: "rgba(254, 198, 161, 0.3)"
  },
  {
    id: "design",
    name: "Graphic Design",
    icon: Palette,
    color: "bg-turquoise text-white",
    accentColor: "rgba(152, 245, 225, 0.3)"
  },
  {
    id: "meme",
    name: "Meme",
    icon: Smile,
    color: "bg-softPink text-white",
    accentColor: "rgba(255, 209, 220, 0.3)"
  },
  {
    id: "karyatulis",
    name: "Karya Tulis",
    icon: FileText,
    color: "bg-mint text-white",
    accentColor: "rgba(152, 245, 225, 0.3)"
  },
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
      {/* Category selector - Bento-style with proper icons */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          
          return (
            <BentoCard
              key={category.id}
              icon={category.icon}
              iconColor={category.color}
              className={`p-6 transition-all duration-300 ${isActive ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
              interactive={true}
              hoverScale={1.05}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              glowColor={isActive ? category.accentColor : undefined}
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <span className="font-medium text-foreground/90 text-sm">{category.name}</span>
                
                {isActive && (
                  <motion.div 
                    className="absolute bottom-3 left-0 right-0 mx-auto w-12 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    layoutId="categoryIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.div>
            </BentoCard>
          );
        })}
      </motion.div>

      {/* Team Overview Stats Card */}
      <BentoCard
        className="p-6 mb-10"
        colSpan="col-span-1 md:col-span-full"
        icon={Users}
        iconColor="bg-amethyst text-background"
        glowColor="rgba(229, 222, 255, 0.3)"
        interactive={false}
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-6">
          <StatCard icon={User} label="Total Anggota" value="32" />
          <StatCard icon={Video} label="Video Editing" value="8" />
          <StatCard icon={Palette} label="Graphic Design" value="12" />
          <StatCard icon={Smile} label="Meme" value="6" />
          <StatCard icon={FileText} label="Karya Tulis" value="6" />
        </div>
      </BentoCard>

      {/* Team members grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teamMembers
          .filter(member => !activeCategory || member.category === activeCategory)
          .map((member) => (
            <motion.div 
              key={member.id} 
              variants={memberVariants}
            >
              <TeamMemberCard
                name={member.name}
                role={member.role}
                instagram={member.instagram}
                accentColor={member.accent}
                bio={member.bio}
                achievements={member.achievements}
                onClick={() => setSelectedMember(member)}
              />
            </motion.div>
          ))}
      </motion.div>

      {/* Empty state when no members match filter */}
      {teamMembers.filter(member => !activeCategory || member.category === activeCategory).length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-foreground/60 text-lg">Tim untuk kategori ini akan segera diperkenalkan.</p>
        </motion.div>
      )}

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

// StatCard component for team stats - updated to use only Lucide icons
const StatCard = ({ icon: Icon, label, value }: { icon?: React.ComponentType<any>; label: string; value: string }) => (
  <motion.div 
    className="flex flex-col items-center justify-center p-2"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {Icon && <Icon className="w-7 h-7 mb-2 text-foreground/90" />}
    <span className="text-3xl font-medium font-serif">{value}</span>
    <span className="text-sm text-foreground/60">{label}</span>
  </motion.div>
);

export default TimKami;
