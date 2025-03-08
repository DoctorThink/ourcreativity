
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Bell, Megaphone, Speaker } from "lucide-react";

const Pengumuman = () => {
  // Performance optimized animation variants
  const staggerContainerVariants = {
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
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  // Optimized data structure for announcements
  const announcements = [
    {
      id: 1,
      title: "Pertemuan Komunitas",
      date: "15 Maret 2024",
      content: "Akan diadakan pertemuan komunitas untuk membahas project kreatif mendatang.",
      icon: <Bell className="w-6 h-6" />,
      priority: "high",
      color: "bg-white/20"
    },
    {
      id: 2,
      title: "Workshop Design Thinking",
      date: "20 Maret 2024",
      content: "Workshop online tentang proses design thinking dan implementasinya dalam project kreatif.",
      icon: <Megaphone className="w-6 h-6" />,
      priority: "medium",
      color: "bg-white/10"
    },
    {
      id: 3,
      title: "Open Recruitment",
      date: "1 April 2024",
      content: "Pembukaan pendaftaran anggota baru untuk periode April 2024.",
      icon: <Speaker className="w-6 h-6" />,
      priority: "high",
      color: "bg-white/20"
    }
  ];

  return (
    <PageLayout
      title="PENGUMUMAN"
      subtitle="Informasi terbaru dari komunitas OUR CREATIVITY"
    >
      {/* Announcements Grid with enhanced animations */}
      <motion.div 
        className="grid gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="glass rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Interactive hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className={`p-3 rounded-2xl ${announcement.color} backdrop-blur-md transform transition-transform group-hover:scale-110 duration-300`}>
                {announcement.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transform transition-transform group-hover:-translate-y-1 duration-300">
                    {announcement.title}
                  </h3>
                  <span className="text-sm text-gray-400 transform transition-transform group-hover:translate-y-1 duration-300">
                    {announcement.date}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {announcement.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </PageLayout>
  );
};

export default Pengumuman;
