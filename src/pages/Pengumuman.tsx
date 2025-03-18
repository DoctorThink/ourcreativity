
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Bell, Megaphone, Speaker, Calendar, Star, Users, PlusCircle, AlertCircle, ArrowRight, Zap, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Pengumuman = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Data structure for announcements with improved visuals
  const announcements = [
    {
      id: 1,
      title: "Pertemuan Komunitas",
      date: "Mei 2024",
      content: "Akan diadakan pertemuan komunitas untuk membahas project kreatif mendatang dan eksplorasi kolaborasi antar divisi.",
      icon: <Bell className="w-5 h-5 sm:w-6 sm:h-6" />,
      priority: "high",
      color: "from-foreground/10 to-transparent",
      accentColor: "border-foreground/20",
      tag: "Event"
    },
    {
      id: 2,
      title: "Workshop Desain Grafis",
      date: "Juni 2024",
      content: "Workshop online tentang proses design thinking dan implementasinya dalam project kreatif modern. Dibawakan oleh praktisi berpengalaman.",
      icon: <Megaphone className="w-5 h-5 sm:w-6 sm:h-6" />,
      priority: "medium",
      color: "from-foreground/8 to-transparent",
      accentColor: "border-foreground/15",
      tag: "Workshop"
    },
    {
      id: 3,
      title: "Open Recruitment",
      date: "Juli 2024",
      content: "Pembukaan pendaftaran anggota baru untuk periode mendatang. Fokus rekrutmen pada desainer UI/UX, motion designer, dan content writer.",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      priority: "high",
      color: "from-foreground/10 to-transparent",
      accentColor: "border-foreground/20",
      tag: "Recruitment"
    },
    {
      id: 4,
      title: "Kompetisi Kreativitas",
      date: "Agustus 2024",
      content: "Kompetisi kreativitas dengan tema 'Kekayaan Budaya Indonesia'. Hadiah menarik untuk 3 karya terbaik di masing-masing kategori.",
      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
      priority: "medium",
      color: "from-foreground/8 to-transparent",
      accentColor: "border-foreground/15",
      tag: "Competition"
    },
    {
      id: 5,
      title: "Update Platform Komunitas",
      date: "September 2024",
      content: "Pengembangan platform komunitas dengan fitur-fitur baru untuk memudahkan interaksi dan kolaborasi antar anggota.",
      icon: <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      priority: "low",
      color: "from-foreground/6 to-transparent",
      accentColor: "border-foreground/10",
      tag: "Update"
    }
  ];

  // Flowchart steps
  const flowchartSteps = [
    {
      id: 1,
      title: "Media Sosial 1",
      description: "Konten yang menginspirasi/menarik minat sebagai pemicu",
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 2,
      title: "Minat Didapat",
      description: "Ketertarikan terbentuk dari konten inspiratif",
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 3,
      title: "Bergabung ke OurCreativity",
      description: "Menjadi bagian dari komunitas kreatif",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 4,
      title: "Berkarya, Berdiskusi, Belajar",
      description: "Aktif berpartisipasi dalam kegiatan komunitas",
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 5,
      title: "Menjadi Pribadi yang Konsisten",
      description: "Membangun kebiasaan berkarya secara berkelanjutan",
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 6,
      title: "Berkolaborasi di Akun @ourcreativity.ofc",
      description: "Mendapatkan apresiasi/kritik dan branding secara gratis",
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 7,
      title: "Media Sosial 2",
      description: "Menarik minat lebih banyak anak muda kreatif",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  ];

  return (
    <PageLayout
      title="PENGUMUMAN"
      subtitle="Informasi terbaru dan alur perkembangan komunitas OurCreativity"
    >
      {/* Announcements List with enhanced design and mobile responsiveness */}
      <motion.div 
        className="space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-50" />
          <div className="absolute inset-0 geometric-hexagon-pattern opacity-5" />
          
          {/* Calendar Icon Header with enhanced styling */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6 relative z-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shadow-xl">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/80" />
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-semibold text-foreground">
              Agenda Komunitas
            </h2>
          </div>
          
          <Separator className="bg-foreground/5 mb-4 sm:mb-6" />
          
          <div className="space-y-4 sm:space-y-5">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 hover:bg-foreground/5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Dynamic geometric background element */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/3 to-transparent opacity-50" />
                <div className={`absolute inset-0 bg-gradient-to-br ${announcement.color} opacity-30`} />
                <div className="absolute right-0 bottom-0 w-32 h-32 rounded-tl-[100px] border-l border-t border-foreground/5" style={{ opacity: 0.05 }} />
                
                {/* Interactive hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/5 to-foreground/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" 
                />
                
                <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-md bg-foreground/5 border ${announcement.accentColor} transform transition-transform group-hover:scale-110 duration-300`}>
                    {announcement.icon}
                  </div>
                  <div className="flex-1 space-y-2 sm:space-y-3">
                    <div className="flex flex-wrap items-start sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-xl font-serif font-semibold text-foreground transform transition-transform group-hover:-translate-y-1 duration-300">
                        {announcement.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                        <span className="bg-foreground/10 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs text-foreground/70 border border-foreground/5">
                          {announcement.tag}
                        </span>
                        <div className="backdrop-blur-md bg-foreground/5 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-foreground/80 border border-foreground/10 transform transition-transform group-hover:translate-y-1 duration-300">
                          {announcement.date}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/70 leading-relaxed text-xs sm:text-sm">
                      {announcement.content}
                    </p>
                    
                    {/* Progress indicator (visual element only) */}
                    <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden mt-2 sm:mt-4">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-foreground/30 to-foreground/10"
                        initial={{ width: '0%' }}
                        animate={{ width: hoveredItem === index ? '100%' : '30%' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Flowchart Section - Improved mobile responsiveness */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-50" />
          <div className="absolute inset-0 geometric-hexagon-pattern opacity-5" />
          
          {/* Flow Header with enhanced styling */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6 relative z-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shadow-xl">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/80" />
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-semibold text-foreground">
              Harapan & Alur Perkembangan
            </h2>
          </div>
          
          <Separator className="bg-foreground/5 mb-4 sm:mb-6" />
          
          <div className="relative">
            {/* Connector line */}
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-foreground/5 via-foreground/20 to-foreground/5 left-4 sm:left-6 top-0 z-0 ml-3 sm:ml-3.5"></div>
            
            <div className="space-y-4 sm:space-y-5 relative z-10">
              {flowchartSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className="flex items-start gap-3 sm:gap-4 ml-0 sm:ml-1"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full backdrop-blur-md bg-foreground/5 border border-foreground/20 flex items-center justify-center z-10">
                      {step.icon}
                    </div>
                    {index !== flowchartSteps.length - 1 && (
                      <div className="h-10 sm:h-12 w-[1px] bg-foreground/5"></div>
                    )}
                  </div>
                  
                  <div className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-lg sm:rounded-xl p-3 sm:p-4 flex-1">
                    <h3 className="text-sm sm:text-lg font-serif font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Alternative path - Improved for mobile */}
              <motion.div
                variants={itemVariants}
                className="ml-6 sm:ml-8 mt-2 mb-2"
              >
                <div className="relative">
                  <div className="absolute -left-5 sm:-left-7 top-1/2 w-4 sm:w-6 h-[1px] bg-foreground/20"></div>
                  <div className="absolute -left-5 sm:-left-7 -top-4 h-10 w-[1px] bg-foreground/20"></div>
                  <div className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <h3 className="text-sm sm:text-lg font-serif font-semibold text-foreground mb-1">
                      Terciptanya Komunitas Baru
                    </h3>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                      Alternatif skenario - berkembangnya komunitas-komunitas kreatif lainnya
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Cycle indicator */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center mt-4"
              >
                <div className="text-foreground/50 text-xs sm:text-sm backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-full px-3 sm:px-4 py-1 sm:py-2">
                  Proses berjalan berulang dan berkelanjutan
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action - Improved mobile responsiveness */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-foreground/5 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-tl-[100px] border-l border-t border-foreground/5" style={{ opacity: 0.05 }} />
          
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md bg-foreground/5 border border-foreground/10 flex items-center justify-center">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground mb-3 sm:mb-4">
            Bergabung dengan OurCreativity
          </h3>
          
          <p className="text-foreground/70 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
            Jadilah bagian dari perjalanan 3000+ anak muda kreatif Indonesia. Kunjungi media sosial kami dan mulai berkarya bersama.
          </p>
          
          <Button
            onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
            className="backdrop-blur-xl bg-foreground/10 hover:bg-foreground/20 text-foreground px-4 sm:px-8 py-3 sm:py-6 rounded-full text-sm sm:text-lg font-semibold relative z-10 group border border-foreground/10"
          >
            <span className="hidden sm:inline">LINKTR.EE/</span>OURCREATIVITY.OFC
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 inline transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
        
        {/* Additional note - Improved mobile responsiveness */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-20 h-20 rounded-br-3xl bg-foreground/5" />
          <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-3xl bg-foreground/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-foreground/5" style={{ opacity: 0.1 }} />
          
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-foreground/50" />
            <p className="text-foreground/50 text-xs sm:text-sm font-medium">Informasi Penting</p>
          </div>
          
          <p className="text-foreground/70 relative z-10 text-xs sm:text-sm">
            Pengumuman akan diperbarui secara berkala. Pantau terus halaman ini dan media sosial kami untuk mendapatkan informasi terbaru.
          </p>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Pengumuman;
