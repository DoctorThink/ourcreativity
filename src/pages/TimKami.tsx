import React, { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { CategoryShowcase } from "@/components/ui/CategoryShowcase";
import { FeaturedMemberCard } from "@/components/ui/FeaturedMemberCard";
import { MemberCard } from "@/components/ui/MemberCard";
import { StandardCard } from "@/components/ui/StandardCard";
import { IconDisplay } from "@/components/ui/IconDisplay";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video, Palette, Smile, FileText, Users, Star, Droplet, Code, Bot as BotIcon, TowerControl } from "lucide-react";
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
    memberCount: 3,
    memberAvatars: ["AB", "KZ", "AL"]
  },
  {
    id: "design", 
    name: "Graphic Design",
    icon: Palette,
    color: "turquoise" as const,
    description: "Wadah bagi para seniman visual untuk berbagi teknik, inspirasi, dan menciptakan karya desain yang memukau dan bermakna.",
    memberCount: 4,
    memberAvatars: ["XO", "AS", "NX", "RP"]
  },
  {
    id: "meme",
    name: "Meme Creator", 
    icon: Smile,
    color: "softPink" as const,
    description: "Ruang santai namun kreatif bagi para pembuat meme untuk berbagi humor dan mengasah kemampuan bercerita visual secara singkat.",
    memberCount: 1,
    memberAvatars: ["DF"]
  },
  {
    id: "writing",
    name: "Karya Tulis",
    icon: FileText,
    color: "mint" as const,
    description: "Komunitas bagi para penulis, penyair, dan pencerita untuk berbagi tulisan, memberikan kritik membangun, dan mengasah keterampilan literasi.",
    memberCount: 3,
    memberAvatars: ["KV", "SE", "SV"]
  },
  {
    id: "coding",
    name: "Coding",
    icon: Code,
    color: "turquoise" as const,
    description: "Divisi untuk para programmer berdiskusi, belajar, dan berkolaborasi dalam proyek pengembangan web dan teknologi lainnya.",
    memberCount: 1,
    memberAvatars: ["AR"]
  },
  {
    id: "bot",
    name: "Bot Development",
    icon: BotIcon,
    color: "orangeLight" as const,
    description: "Tempat bagi para pengembang untuk merancang dan membangun bot Discord yang fungsional dan inovatif untuk komunitas.",
    memberCount: 2,
    memberAvatars: ["RF", "FL"]
  },
  {
    id: "discord",
    name: "Discord Admin",
    icon: TowerControl,
    color: "amethyst" as const,
    description: "Tim yang bertanggung jawab menjaga server Discord tetap menjadi lingkungan yang aman, teratur, dan ramah bagi semua anggota.",
    memberCount: 1,
    memberAvatars: ["AJ"]
  }
];

// Featured members for the spotlight section
const featuredMembers = [
  {
    id: "1",
    name: "Muhammad Syahid Al Haqi",
    role: "Founder & Community Leader",
    category: "Leadership",
    bio: "Visiuner di balik OurCreativity, Hakky membangun komunitas ini dari nol dengan semangat untuk menyatukan para kreator Indonesia. Ia percaya bahwa kolaborasi adalah kunci pertumbuhan.",
    avatar: "MS",
    accentColor: "amber" as const
  },
  {
    id: "2", 
    name: "Ardelyo",
    role: "Tech Lead & Coding Division Leader",
    category: "Coding",
    bio: "Programmer muda berbakat dengan spesialisasi dalam pengembangan web dan bot Discord. Ardelyo memimpin divisi koding, membimbing anggota dalam menciptakan solusi teknologi inovatif.",
    avatar: "AR",
    accentColor: "turquoise" as const
  },
  {
    id: "3",
    name: "瑶Xoraa",
    role: "Lead Designer & Graphics Division Leader", 
    category: "Design",
    bio: "Dengan mata yang tajam untuk estetika, Xoraa memimpin divisi desain grafis. Karyanya mendefinisikan identitas visual OurCreativity, menginspirasi anggota lain untuk mencapai standar visual yang tinggi.",
    avatar: "XO",
    accentColor: "amethyst" as const
  },
  {
    id: "4",
    name: "Abhyrahma",
    role: "Video Division Leader",
    category: "Video",
    bio: "Seorang pencerita visual yang handal, Abhyrahma memimpin divisi video editing. Ia memiliki keahlian dalam mengubah rekaman mentah menjadi karya sinematik yang menarik dan penuh emosi.",
    avatar: "AB",
    accentColor: "coral" as const
  },
  {
    id: "5",
    name: "Daffa/deploid",
    role: "Meme Division Leader",
    category: "Meme",
    bio: "Pionir humor di OurCreativity, Daffa memimpin divisi meme dengan kreativitas tak terbatas. Ia ahli dalam mengubah tren menjadi konten viral yang menghibur.",
    avatar: "DF",
    accentColor: "softPink" as const
  }
];

// All members for the directory
const allMembers = [
  // Leadership
  { name: "Muhammad Syahid Al Haqi", role: "Founder & Community Leader", category: "Leadership", avatar: "MS", accentColor: "amber" as const, bio: "Visiuner di balik OurCreativity, Hakky membangun komunitas ini dari nol dengan semangat untuk menyatukan para kreator Indonesia. Ia percaya bahwa kolaborasi adalah kunci pertumbuhan." },
  
  // Video Editing Team
  { name: "Abhyrahma", role: "Video Division Leader", category: "Video", avatar: "AB", accentColor: "coral" as const, bio: "Seorang pencerita visual yang handal, Abhyrahma memimpin divisi video editing. Ia memiliki keahlian dalam mengubah rekaman mentah menjadi karya sinematik yang menarik dan penuh emosi." },
  { name: "Kevin/Zyu", role: "Video Editor", category: "Video", avatar: "KZ", accentColor: "coral" as const, bio: "Editor video dengan spesialisasi pada motion graphics dan efek visual. Zyu selalu mencari cara baru untuk membuat video lebih dinamis dan menarik." },
  { name: "Aljaan", role: "Video Editor", category: "Video", avatar: "AL", accentColor: "coral" as const, bio: "Dengan kejelian terhadap detail, Aljaan menyusun klip video menjadi narasi yang koheren dan berdampak. Keahliannya ada pada penceritaan visual." },
  
  // Design Team  
  { name: "瑶Xoraa", role: "Graphics Division Leader", category: "Design", avatar: "XO", accentColor: "turquoise" as const, bio: "Dengan mata yang tajam untuk estetika, Xoraa memimpin divisi desain grafis. Karyanya mendefinisikan identitas visual OurCreativity." },
  { name: "Ashtrozz", role: "Designer", category: "Design", avatar: "AS", accentColor: "turquoise" as const, bio: "Spesialis dalam ilustrasi dan branding. Ashtrozz menciptakan aset visual yang unik dan memperkuat identitas setiap proyek yang ditanganinya." },
  { name: "nexx4sure", role: "Designer", category: "Design", avatar: "NX", accentColor: "turquoise" as const, bio: "Fokus pada UI/UX, nexx4sure merancang antarmuka yang tidak hanya indah secara visual tetapi juga intuitif dan mudah digunakan." },
  { name: "Rappal", role: "Designer", category: "Design", avatar: "RP", accentColor: "turquoise" as const, bio: "Desainer serbaguna yang mampu beradaptasi dengan berbagai gaya. Rappal senang bereksperimen dengan tipografi dan layout untuk hasil yang segar." },
  
  // Meme Creators
  { name: "Daffa/deploid", role: "Meme Division Leader", category: "Meme", avatar: "DF", accentColor: "softPink" as const, bio: "Pionir humor di OurCreativity, Daffa memimpin divisi meme dengan kreativitas tak terbatas. Ia ahli dalam mengubah tren menjadi konten viral yang menghibur." },
  
  // Writers
  { name: "Kevin", role: "Writer", category: "Writing", avatar: "KV", accentColor: "mint" as const, bio: "Penulis dengan spesialisasi fiksi dan non-fiksi kreatif. Kevin mampu merangkai kata-kata menjadi cerita yang menggugah imajinasi." },
  { name: "Senku", role: "Writer", category: "Writing", avatar: "SE", accentColor: "mint" as const, bio: "Ahli dalam penulisan teknis dan artikel informatif. Senku dapat menyederhanakan topik kompleks menjadi tulisan yang mudah dipahami." },
  { name: "Saviora", role: "Writer", category: "Writing", avatar: "SV", accentColor: "mint" as const, bio: "Penyair dan penulis lirik, Saviora mengekspresikan ide-ide mendalam melalui bahasa puitis yang indah dan penuh makna." },
  
  // Coding Team
  { name: "Ardelyo", role: "Tech Lead & Coding Division Leader", category: "Coding", avatar: "AR", accentColor: "turquoise" as const, bio: "Programmer muda berbakat dengan spesialisasi dalam pengembangan web dan bot Discord. Ardelyo memimpin divisi koding." },
  
  // Bot Team
  { name: "Rappal", role: "Bot Developer", category: "Bot", avatar: "RF", accentColor: "orangeLight" as const, bio: "Pengembang bot Discord yang handal, Rappal menciptakan alat otomatisasi yang membantu menjaga server tetap efisien dan interaktif." },
  { name: "Flores", role: "Bot Developer", category: "Bot", avatar: "FL", accentColor: "orangeLight" as const, bio: "Berfokus pada fungsionalitas dan pengalaman pengguna bot, Flores merancang command yang intuitif dan bermanfaat bagi komunitas." },
  
  // Discord Admin Team
  { name: "Aljaan", role: "Discord Admin", category: "Discord", avatar: "AJ", accentColor: "amethyst" as const, bio: "Sebagai pilar komunitas di Discord, Aljaan memastikan server berjalan lancar, aman, dan menjadi tempat yang ramah bagi semua kreator." }
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
