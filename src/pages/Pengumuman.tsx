
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import BentoCard from "@/components/ui/BentoCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Bell, 
  Calendar, 
  ChevronRight, 
  Clock, 
  ExternalLink, 
  Tag, 
  Bookmark, 
  Users,
  Megaphone
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  important: boolean;
}

const Pengumuman = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Filter announcements
  const filteredAnnouncements = filter === "all" 
    ? announcements 
    : announcements.filter(announcement => announcement.category === filter);

  return (
    <PageLayout 
      title="Pengumuman" 
      subtitle="Informasi terbaru dan penting dari komunitas OUR CREATIVITY"
    >
      {/* Filter tabs */}
      <motion.div 
        className="mb-10 overflow-x-auto no-scrollbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-2 p-1.5 bg-secondary/50 backdrop-blur-md rounded-full border border-white/10 inline-flex">
          <FilterButton 
            active={filter === "all"} 
            onClick={() => setFilter("all")}
          >
            Semua
          </FilterButton>
          <FilterButton 
            active={filter === "event"} 
            onClick={() => setFilter("event")}
            icon={Calendar}
            color="bg-coral"
          >
            Acara
          </FilterButton>
          <FilterButton 
            active={filter === "recruitment"} 
            onClick={() => setFilter("recruitment")}
            icon={Users}
            color="bg-turquoise"
          >
            Rekrutmen
          </FilterButton>
          <FilterButton 
            active={filter === "update"} 
            onClick={() => setFilter("update")}
            icon={Megaphone}
            color="bg-amethyst"
          >
            Update
          </FilterButton>
        </div>
      </motion.div>

      {/* Featured Announcement */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BentoCard
          colSpan="col-span-1 md:col-span-full"
          className="p-8 relative overflow-hidden"
          iconColor="bg-amethyst text-background"
          icon={Bell}
          glowColor="rgba(229, 222, 255, 0.3)"
          interactive={true}
          onClick={() => setSelectedAnnouncement(featuredAnnouncement)}
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-amethyst/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-20 w-64 h-64 rounded-full bg-turquoise/10 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amethyst/20 text-amethyst text-sm font-medium mb-4">
                <span>Pengumuman Penting</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-3">{featuredAnnouncement.title}</h3>
              <p className="text-foreground/70 mb-4 line-clamp-2 md:line-clamp-3">
                {featuredAnnouncement.content.substring(0, 200)}...
              </p>
              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {featuredAnnouncement.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {featuredAnnouncement.category === "event" ? "Acara" : 
                   featuredAnnouncement.category === "recruitment" ? "Rekrutmen" : "Update"}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <motion.div 
                className="w-16 h-16 rounded-full bg-amethyst/20 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-8 h-8 text-amethyst" />
              </motion.div>
            </div>
          </div>
        </BentoCard>
      </motion.div>

      {/* Announcement grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAnnouncements.map((announcement) => (
          <motion.div key={announcement.id} variants={cardVariants}>
            <AnnouncementCard 
              announcement={announcement}
              onClick={() => setSelectedAnnouncement(announcement)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state when no announcements match filter */}
      {filteredAnnouncements.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Bell className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
          <p className="text-foreground/60 text-lg">Belum ada pengumuman untuk kategori ini</p>
        </motion.div>
      )}

      {/* Detailed announcement dialog */}
      <Dialog 
        open={!!selectedAnnouncement} 
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      >
        <DialogContent className="max-w-3xl p-0 bg-secondary/90 backdrop-blur-xl border border-white/10">
          <AnimatePresence>
            {selectedAnnouncement && (
              <AnnouncementDetail announcement={selectedAnnouncement} />
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

const FilterButton = ({ 
  active, 
  onClick, 
  children,
  icon: Icon,
  color
}: { 
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
}) => (
  <motion.button 
    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
      active ? 'bg-foreground text-background' : 'text-foreground/70 hover:text-foreground'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.2 }}
  >
    {Icon && (
      <span className={`w-5 h-5 rounded-full flex items-center justify-center ${active ? '' : color}`}>
        <Icon className={`w-3 h-3 ${active ? 'text-foreground' : 'text-background'}`} />
      </span>
    )}
    {children}
  </motion.button>
);

const AnnouncementCard = ({ 
  announcement, 
  onClick 
}: { 
  announcement: Announcement;
  onClick: () => void;
}) => {
  const categoryStyles = {
    event: {
      bgColor: "bg-coral/20",
      textColor: "text-coral",
      icon: Calendar
    },
    recruitment: {
      bgColor: "bg-turquoise/20",
      textColor: "text-turquoise",
      icon: Users
    },
    update: {
      bgColor: "bg-amethyst/20",
      textColor: "text-amethyst",
      icon: Megaphone
    }
  };
  
  const categoryStyle = categoryStyles[announcement.category as keyof typeof categoryStyles];
  const CategoryIcon = categoryStyle.icon;
  
  return (
    <BentoCard
      className="p-6 h-full"
      interactive={true}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={`px-3 py-1 rounded-full ${categoryStyle.bgColor} ${categoryStyle.textColor} text-xs font-medium flex items-center gap-1.5`}>
          <CategoryIcon className="w-3 h-3" />
          <span>
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
        </div>
        
        {announcement.important && (
          <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full">
            Penting
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-serif mb-2">{announcement.title}</h3>
        <p className="text-foreground/70 line-clamp-3 text-sm mb-4">
          {announcement.content.substring(0, 120)}...
        </p>
      </div>
      
      <div className="flex items-center justify-between text-xs text-foreground/60 mt-auto">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {announcement.date}
        </span>
        <span className="text-foreground/80 font-medium hover:underline">Selengkapnya →</span>
      </div>
    </BentoCard>
  );
};

const AnnouncementDetail = ({ announcement }: { announcement: Announcement }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="p-8"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium 
          ${announcement.category === "event" ? "bg-coral/20 text-coral" : 
            announcement.category === "recruitment" ? "bg-turquoise/20 text-turquoise" : 
            "bg-amethyst/20 text-amethyst"}`}
        >
          {announcement.category === "event" ? "Acara" : 
           announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
        </span>
        {announcement.important && (
          <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full">
            Penting
          </span>
        )}
      </div>
      <span className="text-sm text-foreground/60 flex items-center gap-1.5">
        <Calendar className="w-4 h-4" /> {announcement.date}
      </span>
    </div>
    
    <h2 className="text-2xl font-serif font-semibold mb-6">{announcement.title}</h2>
    
    <div className="prose prose-invert max-w-none text-foreground/80 space-y-4">
      {announcement.content.split('\n\n').map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
    </div>
    
    <div className="mt-8 flex flex-wrap gap-4">
      {announcement.category === "event" && (
        <motion.a
          href="#"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-coral/20 text-coral"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Calendar className="w-4 h-4" />
          Tambahkan ke Kalender
        </motion.a>
      )}
      
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground/90"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <Bookmark className="w-4 h-4" />
        Simpan
      </motion.button>
      
      <motion.a
        href="#"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground/90"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <ExternalLink className="w-4 h-4" />
        Kunjungi Link
      </motion.a>
    </div>
  </motion.div>
);

// Sample data
const featuredAnnouncement: Announcement = {
  id: "featured1",
  title: "Festival Kreativitas OUR CREATIVITY 2025",
  date: "24 Mei 2025",
  category: "event",
  important: true,
  content: "Dengan bangga kami mengumumkan Festival Kreativitas OUR CREATIVITY 2025 yang akan diselenggarakan pada tanggal 24-26 Mei 2025 di Jakarta Convention Center.\n\nFestival ini akan menjadi ajang showcase karya terbaik dari anggota komunitas, workshop dengan pembicara ternama, dan networking session untuk menjalin kerjasama antar kreator.\n\nPendaftaran sebagai peserta atau exhibitor sudah dibuka mulai hari ini dan akan ditutup pada tanggal 30 April 2025. Jangan lewatkan kesempatan untuk berpartisipasi dalam acara terbesar OUR CREATIVITY tahun ini!"
};

const announcements: Announcement[] = [
  {
    id: "ann1",
    title: "Open Recruitment Tim Multimedia",
    date: "1 Juni 2025",
    category: "recruitment",
    important: true,
    content: "OUR CREATIVITY sedang mencari anggota baru untuk bergabung dengan tim Multimedia. Posisi yang tersedia termasuk Video Editor, Motion Graphic Designer, dan Sound Engineer.\n\nKualifikasi umum:\n- Memiliki pengalaman minimal 1 tahun di bidang terkait\n- Mampu bekerja secara tim maupun individu\n- Bersedia berkontribusi minimal 10 jam per minggu\n- Menguasai software standar industri\n\nCara mendaftar: Kirimkan portfolio dan CV terbaru ke recruitment@ourcreativity.org dengan subjek 'Recruitment Multimedia - [Nama]' sebelum tanggal 15 Juni 2025."
  },
  {
    id: "ann2",
    title: "Workshop Series: Adobe After Effects untuk Pemula",
    date: "15 Juni 2025",
    category: "event",
    important: false,
    content: "Workshop series terbaru kami akan membahas tentang dasar-dasar Adobe After Effects untuk pemula. Workshop ini terdiri dari 4 sesi yang akan dilaksanakan setiap Sabtu mulai 15 Juni 2025.\n\nMateri yang akan dibahas:\n- Perkenalan dengan interface dan tools dasar\n- Animasi teks dan shape\n- Visual effects dasar\n- Project akhir: membuat bumper video\n\nWorkshop akan dipandu langsung oleh Budi Santoso, senior motion designer dengan pengalaman lebih dari 8 tahun di industri perfilman dan periklanan.\n\nKuota terbatas untuk 25 peserta. Daftar sekarang untuk mendapatkan early bird discount!"
  },
  {
    id: "ann3",
    title: "Pembaruan Sistem Keanggotaan",
    date: "10 Juni 2025",
    category: "update",
    important: false,
    content: "Mulai 1 Juli 2025, kami akan meluncurkan sistem keanggotaan baru yang memberikan lebih banyak benefit bagi anggota aktif komunitas.\n\nBeberapa pembaruan termasuk:\n- Sistem poin berdasarkan kontribusi dan partisipasi\n- Tingkatan keanggotaan (Basic, Advanced, Expert) dengan benefit berbeda\n- Akses ke resource eksklusif sesuai tingkatan keanggotaan\n- Program mentoring untuk anggota baru\n\nSemua anggota lama akan otomatis terdaftar dalam sistem baru pada level Basic dan dapat meningkatkan level melalui partisipasi aktif dalam komunitas.\n\nSilakan perbarui profil keanggotaan Anda sebelum 30 Juni 2025 untuk memastikan informasi terkini."
  },
  {
    id: "ann4",
    title: "Kolaborasi dengan Brand Lokal: Design Challenge",
    date: "20 Juni 2025",
    category: "event",
    important: false,
    content: "OUR CREATIVITY telah menjalin kerjasama dengan Lokal Industries, brand fashion lokal yang fokus pada sustainable fashion, untuk mengadakan Design Challenge.\n\nTantangan: Menciptakan desain merchandise yang menggabungkan elemen keberlanjutan dengan estetika urban kontemporer.\n\nHadiah:\n- Juara 1: Rp 5.000.000 + Kontrak freelance dengan Lokal Industries\n- Juara 2: Rp 3.000.000 + Merchandise package\n- Juara 3: Rp 1.500.000 + Merchandise package\n- 10 Finalis: Merchandise package\n\nPendaftaran dan submission karya dibuka dari 20 Juni - 15 Juli 2025. Pengumuman finalis pada 30 Juli 2025."
  },
  {
    id: "ann5",
    title: "Perubahan Jadwal Meeting Bulanan",
    date: "5 Juni 2025",
    category: "update",
    important: false,
    content: "Mulai bulan Juni 2025, meeting bulanan regular untuk seluruh anggota akan dipindahkan dari tanggal 15 setiap bulan menjadi tanggal 20 setiap bulan. Perubahan ini dilakukan untuk mengakomodasi lebih banyak anggota yang memiliki konflik jadwal dengan tanggal sebelumnya.\n\nMeeting akan tetap dilaksanakan secara hybrid (offline di Komunal Space dan online via Zoom) pada pukul 19.00 WIB.\n\nMohon update kalender Anda dan konfirmasi kehadiran untuk meeting bulan Juni melalui form yang sudah dibagikan di grup WhatsApp."
  },
  {
    id: "ann6",
    title: "Open Recruitment Divisi Content Writer",
    date: "8 Juni 2025",
    category: "recruitment",
    important: false,
    content: "Divisi Konten OUR CREATIVITY membuka kesempatan bagi para penulis kreatif untuk bergabung dengan tim kami. Kami mencari individu yang memiliki passion dalam menulis dan mengembangkan konten berkualitas tinggi untuk platform digital kami.\n\nPosisi yang tersedia:\n- Content Writer (3 orang)\n- Copywriter (2 orang)\n- Editor (1 orang)\n\nKualifikasi:\n- Memiliki portofolio tulisan yang relevan\n- Kemampuan menulis dalam Bahasa Indonesia yang baik dan benar\n- Pemahaman dasar SEO (untuk Content Writer)\n- Kreativitas dalam mengembangkan angle tulisan\n- Kemampuan riset yang baik\n\nBenefits:\n- Pelatihan dan pengembangan skill\n- Jaringan profesional\n- Sertifikat pengalaman\n- Kesempatan publikasi di media partner\n\nKirim lamaran ke recruitment@ourcreativity.org sebelum 20 Juni 2025."
  }
];

export default Pengumuman;
