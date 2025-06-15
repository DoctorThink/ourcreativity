
import React, { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import TeamMemberBio from "@/components/TeamMemberBio";
import { GlowarCategoryCard } from "@/components/ui/GlowarCategoryCard";
import { MemberCard } from "@/components/ui/MemberCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video, Palette, Smile, FileText } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Team Categories Data
const categories = [
  {
    id: "video",
    title: "Video Editing",
    icon: Video,
    color: "coral" as const,
    memberCount: 3,
    description: "Tempat bagi para editor video untuk berkolaborasi, mempelajari software baru, dan menghasilkan konten sinematik berkualitas tinggi."
  },
  {
    id: "design", 
    title: "Graphic Design",
    icon: Palette,
    color: "turquoise" as const,
    memberCount: 4,
    description: "Wadah bagi para seniman visual untuk berbagi teknik, inspirasi, dan menciptakan karya desain yang memukau mata."
  },
  {
    id: "meme",
    title: "Meme Creator", 
    icon: Smile,
    color: "softPink" as const,
    memberCount: 2,
    description: "Ruang santai namun kreatif bagi para pembuat meme untuk berbagi humor dan mengasah kemampuan bercerita visual secara singkat."
  },
  {
    id: "writing",
    title: "Karya Tulis",
    icon: FileText,
    color: "mint" as const,
    memberCount: 3,
    description: "Komunitas bagi para penulis, penyair, dan pencerita untuk berbagi tulisan, memberikan kritik membangun, dan mengasah keterampilan literasi."
  }
];

// Featured Members Data
const featuredMembers = [
  {
    id: "1",
    name: "Muhammad Syahid Al Haqi", 
    role: "Founder",
    category: "Leadership",
    categoryColor: "amber" as const,
    avatar: null,
    bio: "Founder OurCreativity dengan berbagai prestasi di bidang puisi dan kepemimpinan komunitas.",
    achievements: [
      "Mendapatkan langsung Reward Umroh yang diserahkan langsung oleh Walikota Bandar Lampung, di acara DPD KNPI.",
      "Juara 1 lomba baca Puisi nasional di Universitas Brawijaya Malang.",
      "Juara 1 Lomba Cipta Baca Puisi Nasional di KGLL Lampung."
    ]
  },
  {
    id: "2",
    name: "Kevin/Zyu",
    role: "Video Editor",
    category: "Video Editing", 
    categoryColor: "coral" as const,
    avatar: "/lovable-uploads/video.png",
    bio: "Editor video berbakat dengan spesialisasi dalam konten kreatif dan sinematik."
  },
  {
    id: "3", 
    name: "Ashtrozz",
    role: "Designer",
    category: "Graphic Design",
    categoryColor: "turquoise" as const,
    avatar: "/lovable-uploads/design.png",
    bio: "Desainer grafis dengan keahlian dalam menciptakan visual yang menarik dan fungsional."
  },
  {
    id: "4",
    name: "Ardellio", 
    role: "Admin OC Edisi Coding",
    category: "Development",
    categoryColor: "amethyst" as const,
    avatar: "/lovable-uploads/bot.png",
    bio: "Siswa kelas 9 SMPN 20 Bandung yang suka coding dan programming, juga menulis.",
    achievements: [
      "Juara 2 dalam kompetisi menulis RedGolden Media",
      "Telah menerbitkan 1 buku.",
      "Meraih medali emas di bidang bahasa Inggris, Di Yogyakarta (OSPI)"
    ]
  },
  {
    id: "5",
    name: "Daffa/deploid",
    role: "Meme Creator", 
    category: "Meme",
    categoryColor: "softPink" as const,
    avatar: "/lovable-uploads/meme.png",
    bio: "Kreator meme yang ahli dalam menghadirkan konten humor yang menghibur."
  },
  {
    id: "6",
    name: "Kevin",
    role: "Writer",
    category: "Karya Tulis",
    categoryColor: "mint" as const, 
    avatar: "/lovable-uploads/karyatulis.png",
    bio: "Penulis berbakat dengan kemampuan storytelling yang kuat."
  }
];

const TimKami = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        // Stagger animation for category cards
        gsap.fromTo(".category-card", 
          { 
            opacity: 0, 
            y: 40,
            scale: 0.9
          }, 
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".category-grid",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Stagger animation for member cards
        gsap.fromTo(".member-card", 
          { 
            opacity: 0, 
            y: 30
          }, 
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out", 
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".members-grid",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            }
          }
        );

        const refreshTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(refreshTimer);
      }
    }, mainContentRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const filteredMembers = activeCategory 
    ? featuredMembers.filter(member => {
        switch(activeCategory) {
          case 'video': return member.category === 'Video Editing';
          case 'design': return member.category === 'Graphic Design';
          case 'meme': return member.category === 'Meme';
          case 'writing': return member.category === 'Karya Tulis';
          default: return true;
        }
      })
    : featuredMembers;

  return (
    <PageLayout
      title="Tim Kami"
      subtitle="OurCreativity digerakkan oleh para kreator dari berbagai bidang yang memiliki satu tujuan yang sama: membangun komunitas yang suportif dan inspiratif."
    >
      <div ref={mainContentRef} className="space-y-16">
        {/* Interactive Category Showcase */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.h2 
              variants={cardVariants}
              className="text-3xl md:text-4xl font-serif font-bold text-foreground"
            >
              Kategori Kreatif Kami
            </motion.h2>
            <motion.p 
              variants={cardVariants}
              className="text-lg text-foreground/70 max-w-3xl mx-auto"
            >
              Setiap kategori memiliki identitas dan semangat kreativitas yang unik. Klik untuk menjelajahi anggota di setiap kategori.
            </motion.p>
          </div>

          <div className="category-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div key={category.id} className="category-card">
                <GlowarCategoryCard
                  icon={category.icon}
                  title={category.title}
                  memberCount={category.memberCount}
                  description={category.description}
                  color={category.color}
                  onClick={() => handleCategoryClick(category.id)}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Member Spotlight Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.h2 
              variants={cardVariants}
              className="text-3xl md:text-4xl font-serif font-bold text-foreground"
            >
              {activeCategory ? 'Anggota Kategori' : 'Temui Kreator Kami'}
            </motion.h2>
            <motion.p 
              variants={cardVariants}
              className="text-lg text-foreground/70 max-w-3xl mx-auto"
            >
              {activeCategory 
                ? 'Para anggota berbakat di kategori yang dipilih'
                : 'Para kreator berbakat yang membentuk komunitas OurCreativity'
              }
            </motion.p>
          </div>

          <div className="members-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => (
              <div key={member.id} className="member-card">
                <MemberCard
                  name={member.name}
                  role={member.role}
                  category={member.category}
                  avatar={member.avatar}
                  categoryColor={member.categoryColor}
                  onClick={() => setSelectedMember(member)}
                />
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-foreground/60 text-lg">Belum ada anggota di kategori ini.</p>
            </motion.div>
          )}
        </motion.section>

        {/* Member Detail Dialog */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="bg-secondary/90 backdrop-blur-xl max-w-3xl p-0 border-white/10">
            {selectedMember && <TeamMemberBio 
              bio={selectedMember.bio}
              achievements={selectedMember.achievements}
              accentColor={selectedMember.categoryColor}
              member={selectedMember}
            />}
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default TimKami;
