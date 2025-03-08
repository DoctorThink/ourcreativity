
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Bell, Megaphone, Speaker, Calendar, Star, Users, PlusCircle, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

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
      date: "15 Maret 2024",
      content: "Akan diadakan pertemuan komunitas untuk membahas project kreatif mendatang dan eksplorasi kolaborasi antar divisi.",
      icon: <Bell className="w-6 h-6" />,
      priority: "high",
      color: "from-[#2A2A2A] to-transparent",
      accentColor: "border-white/20",
      tag: "Event"
    },
    {
      id: 2,
      title: "Workshop Design Thinking",
      date: "20 Maret 2024",
      content: "Workshop online tentang proses design thinking dan implementasinya dalam project kreatif modern. Dibawakan oleh praktisi berpengalaman.",
      icon: <Megaphone className="w-6 h-6" />,
      priority: "medium",
      color: "from-[#252525] to-transparent",
      accentColor: "border-white/15",
      tag: "Workshop"
    },
    {
      id: 3,
      title: "Open Recruitment",
      date: "1 April 2024",
      content: "Pembukaan pendaftaran anggota baru untuk periode April 2024. Fokus rekrutmen pada desainer UI/UX, motion designer, dan content writer.",
      icon: <Users className="w-6 h-6" />,
      priority: "high",
      color: "from-[#2A2A2A] to-transparent",
      accentColor: "border-white/20",
      tag: "Recruitment"
    },
    {
      id: 4,
      title: "Kompetisi Digital Art",
      date: "15 April 2024",
      content: "Kompetisi digital art dengan tema 'Futurisme dalam Kehidupan Sehari-hari'. Hadiah menarik untuk 3 karya terbaik.",
      icon: <Star className="w-6 h-6" />,
      priority: "medium",
      color: "from-[#252525] to-transparent",
      accentColor: "border-white/15",
      tag: "Competition"
    },
    {
      id: 5,
      title: "Pembaruan Platform",
      date: "10 Mei 2024",
      content: "Pengembangan platform komunitas dengan fitur-fitur baru untuk memudahkan interaksi dan kolaborasi antar anggota.",
      icon: <PlusCircle className="w-6 h-6" />,
      priority: "low",
      color: "from-[#232323] to-transparent",
      accentColor: "border-white/10",
      tag: "Update"
    }
  ];

  return (
    <PageLayout
      title="PENGUMUMAN"
      subtitle="Informasi terbaru dari komunitas OUR CREATIVITY"
    >
      {/* Announcements List with enhanced design */}
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-black opacity-50" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMjkuNS45OGwxOS4wOCAxMS4wM3YyMi4wNUwyOS41IDQ1LjA5IDEwLjQyIDM0LjA2VjEyLjAxTDI5LjUuOTh6Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5" />
          
          {/* Calendar Icon Header with enhanced styling */}
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
              <Calendar className="w-5 h-5 text-white/80" />
            </div>
            <h2 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Agenda Komunitas
            </h2>
          </div>
          
          <Separator className="bg-white/5 mb-6" />
          
          <div className="space-y-5">
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
                className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Dynamic geometric background element */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900/30 to-black opacity-50" />
                <div className={`absolute inset-0 bg-gradient-to-br ${announcement.color} opacity-30`} />
                <div className="absolute right-0 bottom-0 w-32 h-32 rounded-tl-[100px] border-l border-t border-white/5" style={{ opacity: 0.05 }} />
                
                {/* Interactive hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" 
                />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`p-3 rounded-xl backdrop-blur-md bg-white/5 border ${announcement.accentColor} transform transition-transform group-hover:scale-110 duration-300`}>
                    {announcement.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent transform transition-transform group-hover:-translate-y-1 duration-300">
                        {announcement.title}
                      </h3>
                      <div className="flex gap-3 items-center">
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/70 border border-white/5">
                          {announcement.tag}
                        </span>
                        <div className="backdrop-blur-md bg-black/20 px-3 py-1 rounded-full text-sm text-white/80 border border-white/10 transform transition-transform group-hover:translate-y-1 duration-300">
                          {announcement.date}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {announcement.content}
                    </p>
                    
                    {/* Progress indicator (visual element only) */}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-white/30 to-white/10"
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
        
        {/* Additional note with geometric styling */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-20 h-20 rounded-br-3xl bg-white/5" />
          <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-3xl bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/5" style={{ opacity: 0.1 }} />
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-white/50" />
            <p className="text-white/50 text-sm font-medium">Informasi Penting</p>
          </div>
          
          <p className="text-white/70 relative z-10">
            Pengumuman akan diperbarui secara berkala. Pantau terus halaman ini untuk mendapatkan informasi terbaru.
          </p>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Pengumuman;
