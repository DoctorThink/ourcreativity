
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { Check, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  // Animation variants for staggered animations
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

  // Terms sections with rules and regulations
  const termsSections = [
    {
      title: "Keanggotaan",
      rules: [
        "Keanggotaan terbuka untuk semua yang berusia minimal 18 tahun",
        "Setiap anggota wajib mematuhi kode etik komunitas",
        "Pendaftaran mengharuskan verifikasi identitas"
      ],
      icon: <motion.div className="absolute top-0 right-0 w-24 h-24 rounded-full border border-white/10" style={{ opacity: 0.1 }} />,
      color: "from-lavender/20 to-transparent"
    },
    {
      title: "Konten & Karya",
      rules: [
        "Semua karya yang dibagikan harus merupakan karya asli atau memiliki izin",
        "Konten tidak boleh melanggar hak cipta atau hak kekayaan intelektual",
        "Karya yang menampilkan konten dewasa harus diberi label yang sesuai"
      ],
      icon: <motion.div className="absolute bottom-0 left-0 w-32 h-32 rounded-full border-2 border-white/5" style={{ opacity: 0.1 }} />,
      color: "from-mint/20 to-transparent"
    },
    {
      title: "Interaksi & Komunikasi",
      rules: [
        "Interaksi antar anggota harus tetap sopan dan menghormati",
        "Pelecehan, ujaran kebencian, dan diskriminasi tidak akan ditoleransi",
        "Kritik harus bersifat konstruktif dan fokus pada karya, bukan pribadi"
      ],
      icon: <motion.div className="absolute top-10 left-10 w-16 h-16 rotate-45 border border-white/10" style={{ opacity: 0.1 }} />,
      color: "from-peach/20 to-transparent"
    },
    {
      title: "Privasi & Data",
      rules: [
        "Informasi pribadi anggota akan dilindungi sesuai kebijakan privasi",
        "Anggota tidak boleh membagikan informasi pribadi anggota lain tanpa izin",
        "Kami berhak menggunakan karya yang dibagikan untuk keperluan promosi komunitas"
      ],
      icon: <motion.div className="absolute bottom-10 right-10 w-20 h-20 rounded-md border border-white/10" style={{ opacity: 0.1 }} />,
      color: "from-softPink/20 to-transparent"
    }
  ];

  return (
    <PageLayout 
      title="SYARAT & KETENTUAN"
      subtitle="Panduan dan peraturan untuk menjaga kualitas dan integritas komunitas OUR CREATIVITY"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Introduction section */}
        <motion.div 
          variants={itemVariants}
          className="glass rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-lavender/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-mint/5 blur-3xl" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Tentang Syarat & Ketentuan
                </h2>
                <p className="text-gray-300 mt-2">
                  Syarat dan ketentuan berikut dirancang untuk memastikan pengalaman yang positif dan produktif bagi semua anggota komunitas. Dengan bergabung dengan OUR CREATIVITY, Anda setuju untuk mematuhi aturan-aturan ini.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms sections */}
        {termsSections.map((section, index) => (
          <motion.div
            key={section.title}
            variants={itemVariants}
            className="glass rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Geometric decorations */}
            {section.icon}
            <div className="absolute inset-0 bg-gradient-to-br bg-white/5 opacity-5" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {section.title}
              </h2>
              <Separator className="bg-white/10" />
              <ul className="space-y-4">
                {section.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="min-w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-gray-300">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* Agreement section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4 p-6 glass rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-lavender/10 via-mint/10 to-peach/10 opacity-10" />
          <p className="text-gray-300 relative z-10">
            Dengan berpartisipasi dalam komunitas OUR CREATIVITY, Anda mengakui bahwa telah membaca, memahami, dan setuju untuk mematuhi semua syarat dan ketentuan yang telah ditetapkan.
          </p>
          <p className="text-sm text-gray-400 italic relative z-10">
            Ketentuan ini dapat berubah sewaktu-waktu dengan pemberitahuan kepada seluruh anggota.
          </p>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Terms;
