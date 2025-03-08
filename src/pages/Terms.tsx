
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Check, Shield, AlertTriangle, FileText, Bookmark, User, FileCode, Lock, Users, Palette, Video, MessageSquare, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  // Enhanced animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3,
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Enhanced terms sections with rules and regulations
  const termsSections = [
    {
      id: "membership",
      title: "Keanggotaan",
      description: "Syarat dan ketentuan untuk menjadi anggota komunitas OurCreativity.",
      icon: <User className="w-5 h-5" />,
      rules: [
        "Keanggotaan terbuka untuk semua yang tertarik berkarya di bidang kreatif",
        "Setiap anggota wajib mematuhi kode etik komunitas",
        "Anggota didorong untuk berpartisipasi aktif dalam diskusi dan kegiatan",
        "Anggota dapat mengundurkan diri kapan saja dengan pemberitahuan"
      ],
      decoration: (
        <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl border-l border-b border-white/10" style={{ opacity: 0.1 }} />
      )
    },
    {
      id: "content",
      title: "Konten & Karya",
      description: "Aturan terkait konten dan karya yang dibagikan dalam komunitas.",
      icon: <FileCode className="w-5 h-5" />,
      rules: [
        "Semua karya yang dibagikan harus merupakan karya asli atau memiliki izin",
        "Konten tidak boleh melanggar hak cipta atau hak kekayaan intelektual",
        "Karya harus sesuai dengan norma-norma dan nilai positif",
        "Komunitas memiliki hak untuk menampilkan karya Anda untuk keperluan promosi"
      ],
      decoration: (
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl border-t border-r border-white/5" style={{ opacity: 0.1 }} />
      )
    },
    {
      id: "interaction",
      title: "Interaksi & Komunikasi",
      description: "Panduan untuk berinteraksi dengan anggota lain dalam komunitas.",
      icon: <Users className="w-5 h-5" />,
      rules: [
        "Interaksi antar anggota harus tetap sopan dan menghormati",
        "Pelecehan, ujaran kebencian, dan diskriminasi tidak akan ditoleransi",
        "Kritik harus bersifat konstruktif dan fokus pada karya, bukan pribadi",
        "Pelanggaran berulang dapat mengakibatkan pembekuan atau pengakhiran keanggotaan"
      ],
      decoration: (
        <div className="absolute top-10 left-10 w-16 h-16 rotate-45 border border-white/10" style={{ opacity: 0.1 }} />
      )
    },
    {
      id: "groups",
      title: "Pengelompokan Jenis",
      description: "Informasi tentang 4 jenis grup dalam komunitas.",
      icon: <Heart className="w-5 h-5" />,
      rules: [
        "Anggota dapat bergabung di lebih dari satu grup (Desain Grafis, Video Editing, Meme Creator, Karya Tulis)",
        "Setiap grup memiliki forum diskusi khusus untuk topik terkait",
        "Konten yang dibagikan harus relevan dengan grup tempat dibagikan",
        "Kolaborasi antar anggota dari grup berbeda sangat dianjurkan"
      ],
      decoration: (
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-md border border-white/10" style={{ opacity: 0.1 }} />
      )
    }
  ];

  // Group icons
  const groupIcons = [
    { icon: <Palette className="w-5 h-5" />, title: "Desain Grafis" },
    { icon: <Video className="w-5 h-5" />, title: "Video Editing" },
    { icon: <MessageSquare className="w-5 h-5" />, title: "Meme Creator" },
    { icon: <FileText className="w-5 h-5" />, title: "Karya Tulis" }
  ];

  return (
    <PageLayout 
      title="SYARAT & KETENTUAN"
      subtitle="Panduan dan peraturan untuk menjaga kualitas dan integritas komunitas OurCreativity"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Introduction section with enhanced design */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
        >
          {/* Geometric background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-black opacity-50" />
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMjkuNS45OGwxOS4wOCAxMS4wM3YyMi4wNUwyOS41IDQ1LjA5IDEwLjQyIDM0LjA2VjEyLjAxTDI5LjUuOTh6Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Tentang Syarat & Ketentuan
                </h2>
                <p className="text-white/70 mt-2">
                  Syarat dan ketentuan berikut dirancang untuk memastikan pengalaman yang positif dan produktif bagi semua anggota komunitas. Dengan bergabung dengan OurCreativity, Anda setuju untuk mematuhi aturan-aturan ini.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Group Icons Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {groupIcons.map((group, index) => (
            <div 
              key={index}
              className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-4 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-black opacity-50" />
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
                  {group.icon}
                </div>
                <p className="text-white/70 text-sm font-medium">Edisi {group.title}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Grid layout for terms sections */}
        <div className="grid grid-cols-1 gap-8">
          {termsSections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Dynamic geometric decorations */}
              {section.decoration}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-black opacity-50" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      {section.title}
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <ul className="space-y-4">
                  {section.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="min-w-6 h-6 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white/80" />
                      </div>
                      <p className="text-white/70">{rule}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Warning Section */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-black opacity-50" />
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="min-w-10 h-10 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-2">
                Pelanggaran Ketentuan
              </h3>
              <p className="text-white/70">
                Pelanggaran terhadap syarat dan ketentuan ini dapat berakibat pada peringatan, pembatasan akses, atau pengakhiran keanggotaan, tergantung pada tingkat keparahan. Kami berhak untuk mengubah ketentuan ini dari waktu ke waktu, dengan pemberitahuan kepada seluruh anggota.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Agreement section with enhanced design */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4 p-8 backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl relative overflow-hidden"
        >
          {/* Geometric background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 via-black/30 to-zinc-900/30 opacity-50" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMjkuNS45OGwxOS4wOCAxMS4wM3YyMi4wNUwyOS41IDQ1LjA5IDEwLjQyIDM0LjA2VjEyLjAxTDI5LjUuOTh6Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5" />
          <div className="absolute w-60 h-60 rounded-full bg-white/5 blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-white/80" />
            </div>
          </div>
          
          <p className="text-white/80 relative z-10 font-medium">
            Dengan berpartisipasi dalam komunitas OurCreativity, Anda mengakui bahwa telah membaca, memahami, dan setuju untuk mematuhi semua syarat dan ketentuan yang telah ditetapkan.
          </p>
          
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-4" />
          
          <p className="text-sm text-white/50 italic relative z-10">
            Ketentuan ini berlaku sejak 2024 dan dapat berubah sewaktu-waktu dengan pemberitahuan kepada seluruh anggota.
          </p>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Terms;
