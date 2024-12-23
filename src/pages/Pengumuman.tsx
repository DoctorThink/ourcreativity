import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Bell, Megaphone, Speaker } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pengumuman = () => {
  const navigate = useNavigate();

  const announcements = [
    {
      id: 1,
      title: "Pertemuan Komunitas",
      date: "15 Maret 2024",
      content: "Akan diadakan pertemuan komunitas untuk membahas project kreatif mendatang.",
      icon: <Bell className="w-6 h-6" />,
      priority: "high"
    },
    {
      id: 2,
      title: "Workshop Design Thinking",
      date: "20 Maret 2024",
      content: "Workshop online tentang proses design thinking dan implementasinya dalam project kreatif.",
      icon: <Megaphone className="w-6 h-6" />,
      priority: "medium"
    },
    {
      id: 3,
      title: "Open Recruitment",
      date: "1 April 2024",
      content: "Pembukaan pendaftaran anggota baru untuk periode April 2024.",
      icon: <Speaker className="w-6 h-6" />,
      priority: "high"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Logo */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg p-4 border-b border-white/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Title Section */}
            <div className="text-center space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-serif font-bold tracking-tight animate-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                PENGUMUMAN
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Informasi terbaru dari komunitas OUR CREATIVITY
              </motion.p>
            </div>

            {/* Announcements Grid */}
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="glass rounded-3xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${
                      announcement.priority === "high" 
                        ? "bg-white/20" 
                        : "bg-white/10"
                    } backdrop-blur-md`}>
                      {announcement.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif font-semibold">
                          {announcement.title}
                        </h3>
                        <span className="text-sm text-gray-400">
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
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Pengumuman;