
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Bell, Megaphone, Speaker, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Pengumuman = () => {
  // Animation variants
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

  // Data structure for announcements
  const announcements = [
    {
      id: 1,
      title: "Pertemuan Komunitas",
      date: "15 Maret 2024",
      content: "Akan diadakan pertemuan komunitas untuk membahas project kreatif mendatang.",
      icon: <Bell className="w-6 h-6" />,
      priority: "high",
      color: "bg-white/20",
      geometricElement: <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-white/10" style={{ opacity: 0.1 }} />
    },
    {
      id: 2,
      title: "Workshop Design Thinking",
      date: "20 Maret 2024",
      content: "Workshop online tentang proses design thinking dan implementasinya dalam project kreatif.",
      icon: <Megaphone className="w-6 h-6" />,
      priority: "medium",
      color: "bg-white/10",
      geometricElement: <div className="absolute bottom-4 right-8 w-12 h-12 rotate-45 border border-white/10" style={{ opacity: 0.1 }} />
    },
    {
      id: 3,
      title: "Open Recruitment",
      date: "1 April 2024",
      content: "Pembukaan pendaftaran anggota baru untuk periode April 2024.",
      icon: <Speaker className="w-6 h-6" />,
      priority: "high",
      color: "bg-white/20",
      geometricElement: <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white/5" style={{ opacity: 0.05 }} />
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
          className="glass rounded-3xl p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30" />
          
          {/* Calendar Icon */}
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Agenda Mendatang
            </h2>
          </div>
          
          <Separator className="bg-white/10 mb-6" />
          
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Geometric element unique to each announcement */}
                {announcement.geometricElement}
                
                {/* Interactive hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`p-3 rounded-xl ${announcement.color} backdrop-blur-md transform transition-transform group-hover:scale-110 duration-300`}>
                    {announcement.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transform transition-transform group-hover:-translate-y-1 duration-300">
                        {announcement.title}
                      </h3>
                      <div className="glass px-3 py-1 rounded-full text-sm text-gray-300 transform transition-transform group-hover:translate-y-1 duration-300">
                        {announcement.date}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {announcement.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Additional note with geometric styling */}
        <motion.div 
          variants={itemVariants}
          className="glass rounded-3xl p-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-20 h-20 rounded-br-3xl bg-white/5" />
          <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-3xl bg-white/5" />
          
          <p className="text-gray-300 relative z-10">
            Pengumuman akan diperbarui secara berkala. Pantau terus halaman ini untuk informasi terbaru.
          </p>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Pengumuman;
