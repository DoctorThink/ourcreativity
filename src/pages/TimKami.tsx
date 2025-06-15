
import React, { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { CategoryShowcase } from "@/components/ui/CategoryShowcase";
import { FeaturedMemberCard } from "@/components/ui/FeaturedMemberCard";
import { MemberCard } from "@/components/ui/MemberCard";
import { StandardCard } from "@/components/ui/StandardCard";
import { IconDisplay } from "@/components/ui/IconDisplay";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video, Palette, Smile, FileText, Users, Star, Droplet } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamMemberBio from "@/components/TeamMemberBio";

// Enhanced team data for the new layout
const categories = [
  {
    id: "video",
    name: "Video Editing",
    icon: Video,
    color: "coral" as const,
    description: "Tempat bagi para editor video untuk berkolaborasi, mempelajari software baru, dan menghasilkan konten sinematik berkualitas tinggi.",
    memberCount: 8,
    memberAvatars: ["K", "A", "S", "D"]
  },
  {
    id: "design", 
    name: "Graphic Design",
    icon: Palette,
    color: "turquoise" as const,
    description: "Wadah bagi para seniman visual untuk berbagi teknik, inspirasi, dan menciptakan karya desain yang memukau dan bermakna.",
    memberCount: 12,
    memberAvatars: ["A", "N", "X", "R", "M"]
  },
  {
    id: "meme",
    name: "Meme Creator", 
    icon: Smile,
    color: "softPink" as const,
    description: "Ruang santai namun kreatif bagi para pembuat meme untuk berbagi humor dan mengasah kemampuan bercerita visual secara singkat.",
    memberCount: 6,
    memberAvatars: ["D", "K", "P"]
  },
  {
    id: "writing",
    name: "Karya Tulis",
    icon: FileText,
    color: "mint" as const,
    description: "Komunitas bagi para penulis, penyair, dan pencerita untuk berbagi tulisan, memberikan kritik membangun, dan mengasah keterampilan literasi.",
    memberCount: 6,
    memberAvatars: ["K", "Se", "Sa"]
  }
];

// Featured members for the spotlight section
const featuredMembers = [
  {
    id: "1",
    name: "Muhammad Syahid Al Haqi",
    role: "Founder & Poet",
    category: "Leadership",
    bio: "Pemenang berbagai kompetisi puisi nasional dan pemimpin visi OurCreativity. Mendapat penghargaan langsung dari Walikota Bandar Lampung.",
    avatar: "MS",
    accentColor: "amber" as const
  },
  {
    id: "2", 
    name: "Ardellio",
    role: "Tech Lead",
    category: "Development",
    bio: "Siswa berbakat yang telah menerbitkan buku dan meraih medali emas dalam kompetisi bahasa Inggris tingkat nasional.",
    avatar: "AR",
    accentColor: "turquoise" as const
  },
  {
    id: "3",
    name: "Ashtrozz",
    role: "Lead Designer", 
    category: "Design",
    bio: "Desainer kreatif yang memimpin tim visual dan menciptakan identitas brand yang kuat untuk komunitas.",
    avatar: "AS",
    accentColor: "amethyst" as const
  },
  {
    id: "4",
    name: "Kevin/Zyu",
    role: "Multi-Creator",
    category: "Video & Meme",
    bio: "Kreator serbaguna yang aktif di bidang video editing dan pembuatan meme, memberikan sentuhan humor pada konten komunitas.",
    avatar: "KZ",
    accentColor: "coral" as const
  }
];

// All members for the directory
const allMembers = [
  // Video Editing Team
  { name: "Kevin/Zyu", role: "Video Editor", category: "Video", avatar: "KZ", accentColor: "coral" as const },
  { name: "Aljaan", role: "Video Editor", category: "Video", avatar: "AL", accentColor: "coral" as const },
  
  // Design Team  
  { name: "Ashtrozz", role: "Designer", category: "Design", avatar: "AS", accentColor: "turquoise" as const },
  { name: "nexx4sure", role: "Designer", category: "Design", avatar: "NX", accentColor: "turquoise" as const },
  { name: "瑶Xoraa", role: "Designer", category: "Design", avatar: "XO", accentColor: "turquoise" as const },
  { name: "Rappal", role: "Designer", category: "Design", avatar: "RP", accentColor: "turquoise" as const },
  
  // Meme Creators
  { name: "Daffa/deploid", role: "Meme Creator", category: "Meme", avatar: "DF", accentColor: "softPink" as const },
  
  // Writers
  { name: "Kevin", role: "Writer", category: "Writing", avatar: "KV", accentColor: "mint" as const },
  { name: "Senku", role: "Writer", category: "Writing", avatar: "SE", accentColor: "mint" as const },
  { name: "Saviora", role: "Writer", category: "Writing", avatar: "SV", accentColor: "mint" as const },
  
  // Bot Developers & Admins
  { name: "Ardellio", role: "Tech Lead", category: "Development", avatar: "AR", accentColor: "orangeLight" as const },
  { name: "Rappal", role: "Bot Developer", category: "Development", avatar: "RF", accentColor: "orangeLight" as const },
  { name: "Flores", role: "Bot Developer", category: "Development", avatar: "FL", accentColor: "orangeLight" as const },
  { name: "Aljaan", role: "Discord Admin", category: "Admin", avatar: "AJ", accentColor: "amethyst" as const }
];

const TimKami = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        // Stagger animation for member cards
        gsap.fromTo(".member-card", 
          { opacity: 0, y: 30 }, 
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".member-grid",
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Featured members scroll animation
        gsap.fromTo(".featured-member", 
          { opacity: 0, x: 50 }, 
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".featured-section",
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );

        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    }, mainContentRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout
      title="Tim Kami"
      subtitle="OurCreativity digerakkan oleh para kreator dari berbagai bidang yang memiliki satu tujuan yang sama: membangun komunitas yang suportif dan inspiratif."
    >
      <div ref={mainContentRef} className="space-y-16">
        
        {/* Section 1: Interactive Category Showcase */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CategoryShowcase categories={categories} />
        </motion.section>

        {/* Section 2: Featured Members Spotlight */}
        <motion.section 
          className="featured-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <StandardCard className="p-8" glowColor="rgba(229, 222, 255, 0.3)">
            <div className="flex items-center gap-4 mb-8">
              <IconDisplay icon={Star} color="amber" size="lg" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground">Sorotan Anggota</h3>
                <p className="text-foreground/60">Kenali para pemimpin dan kontributor utama komunitas kami</p>
              </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {featuredMembers.map((member, index) => (
                <div key={member.id} className="featured-member">
                  <FeaturedMemberCard
                    name={member.name}
                    role={member.role}
                    category={member.category}
                    bio={member.bio}
                    avatar={member.avatar}
                    accentColor={member.accentColor}
                    onClick={() => setSelectedMember(member)}
                  />
                </div>
              ))}
            </div>
          </StandardCard>
        </motion.section>

        {/* Section 3: Member Directory Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <IconDisplay icon={Users} color="turquoise" size="lg" />
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground">Direktori Anggota</h3>
              <p className="text-foreground/60">Jelajahi semua talenta kreatif dalam komunitas</p>
            </div>
          </div>
          
          <div className="member-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allMembers.map((member, index) => (
              <div key={index} className="member-card">
                <MemberCard
                  name={member.name}
                  role={member.role}
                  category={member.category}
                  avatar={member.avatar}
                  accentColor={member.accentColor}
                  onClick={() => setSelectedMember(member)}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Logo Philosophy Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <StandardCard className="p-8" glowColor="rgba(254, 198, 161, 0.3)">
            <div className="flex items-center gap-4 mb-6">
              <IconDisplay icon={Droplet} color="coral" size="lg" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground">Filosofi Logo O.C</h3>
                <p className="text-foreground/60">Simbol di balik identitas visual kami</p>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Logo kami, yang sering disebut O.C (singkatan dari OurCreativity), adalah representasi visual dari nilai-nilai inti kami. Secara keseluruhan, logo ini mengambil bentuk simbol "infinity" atau tak terbatas, melambangkan keyakinan kami bahwa kreativitas manusia tidak seharusnya dibatasi.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Warna merah yang kami pilih melambangkan <strong className="text-coral">keberanian</strong>. Kami yakin, tanpa keberanian untuk memulai dan menunjukkan karya, seorang kreator tidak akan pernah bisa berkembang. Itulah semangat yang kami tanamkan di dalam komunitas OurCreativity.
            </p>
          </StandardCard>
        </motion.section>

        {/* Member bio dialog */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="bg-secondary/90 backdrop-blur-xl max-w-3xl p-0 border-white/10">
            {selectedMember && <TeamMemberBio 
              bio={selectedMember.bio || "Informasi lebih lanjut akan segera tersedia."}
              achievements={selectedMember.achievements || []}
              accentColor={selectedMember.accentColor || "amethyst"}
              member={selectedMember}
            />}
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default TimKami;
