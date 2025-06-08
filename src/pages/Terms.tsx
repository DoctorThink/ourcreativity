
import React, { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import BentoCard from "@/components/ui/BentoCard";
import { 
  ScrollText, 
  Bell, 
  Shield, 
  Users, 
  Pencil, 
  AlertCircle, 
  CheckCircle2,
  BookOpenCheck,
  LucideIcon
} from "lucide-react";

const Terms = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageLayout 
      title="Syarat & Ketentuan" 
      subtitle="Informasi penting mengenai keanggotaan dan partisipasi dalam komunitas"
    >
      <div className="relative z-10">
        <motion.div className="mb-8 text-center">
          <motion.div 
            className="inline-block p-3 rounded-full bg-amethyst/20 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <BookOpenCheck className="w-6 h-6 text-amethyst" />
          </motion.div>
          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
            Dokumen ini mengatur hubungan antara OUR CREATIVITY dan anggota komunitas. 
            Pastikan untuk membaca dengan seksama sebelum bergabung atau berpartisipasi dalam kegiatan komunitas.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section 1: Keanggotaan */}
          <TermsSection 
            title="Keanggotaan"
            icon={Users}
            iconColor="bg-turquoise text-background"
            glowColor="rgba(152, 245, 225, 0.3)"
            isExpanded={expandedSection === "membership"}
            onToggle={() => setExpandedSection(expandedSection === "membership" ? null : "membership")}
            variants={itemVariants}
          >
            <ul className="space-y-3 text-foreground/80 text-sm">
              <TermsItem>Keanggotaan terbuka untuk semua individu berusia minimal 15 tahun.</TermsItem>
              <TermsItem>Pendaftaran mengharuskan pengisian formulir dan verifikasi email.</TermsItem>
              <TermsItem>Anggota diharapkan berpartisipasi dalam minimal satu kegiatan komunitas setiap tiga bulan.</TermsItem>
              <TermsItem>Anggota dapat memilih untuk bergabung dengan satu atau lebih kelompok kreatif sesuai minat.</TermsItem>
              <TermsItem>Keanggotaan dapat dicabut jika melanggar kode etik komunitas.</TermsItem>
            </ul>
          </TermsSection>

          {/* Section 2: Konten Kreatif */}
          <TermsSection 
            title="Konten Kreatif"
            icon={Pencil}
            iconColor="bg-coral text-background"
            glowColor="rgba(254, 198, 161, 0.3)"
            isExpanded={expandedSection === "content"}
            onToggle={() => setExpandedSection(expandedSection === "content" ? null : "content")}
            variants={itemVariants}
          >
            <ul className="space-y-3 text-foreground/80 text-sm">
              <TermsItem>Konten yang dibagikan harus asli atau memiliki izin penggunaan yang tepat.</TermsItem>
              <TermsItem>Dilarang keras membagikan konten dengan unsur SARA, pornografi, atau melanggar hukum.</TermsItem>
              <TermsItem>OUR CREATIVITY memiliki hak untuk menampilkan karya anggota di platform komunitas.</TermsItem>
              <TermsItem>Hak cipta tetap dimiliki oleh kreator asli.</TermsItem>
              <TermsItem>Penggunaan logo atau identitas OUR CREATIVITY memerlukan izin tertulis.</TermsItem>
            </ul>
          </TermsSection>

          {/* Section 3: Privasi & Data */}
          <TermsSection 
            title="Privasi & Data"
            icon={Shield}
            iconColor="bg-mint text-background"
            glowColor="rgba(152, 245, 225, 0.3)"
            isExpanded={expandedSection === "privacy"}
            onToggle={() => setExpandedSection(expandedSection === "privacy" ? null : "privacy")}
            variants={itemVariants}
          >
            <ul className="space-y-3 text-foreground/80 text-sm">
              <TermsItem>Data pribadi anggota dilindungi dan tidak akan dibagikan kepada pihak ketiga tanpa izin.</TermsItem>
              <TermsItem>Informasi kontak hanya digunakan untuk keperluan komunikasi komunitas.</TermsItem>
              <TermsItem>Anggota dapat meminta penghapusan data pribadi kapan saja.</TermsItem>
              <TermsItem>Cookies digunakan untuk meningkatkan pengalaman di platform digital komunitas.</TermsItem>
              <TermsItem>OUR CREATIVITY tidak bertanggung jawab atas kebocoran data yang terjadi di luar kendali kami.</TermsItem>
            </ul>
          </TermsSection>

          {/* Section 4: Perubahan Ketentuan */}
          <TermsSection 
            title="Perubahan Ketentuan"
            icon={Bell}
            iconColor="bg-softPink text-background"
            glowColor="rgba(255, 209, 220, 0.3)"
            isExpanded={expandedSection === "changes"}
            onToggle={() => setExpandedSection(expandedSection === "changes" ? null : "changes")}
            variants={itemVariants}
          >
            <ul className="space-y-3 text-foreground/80 text-sm">
              <TermsItem>OUR CREATIVITY berhak mengubah Syarat & Ketentuan ini sewaktu-waktu.</TermsItem>
              <TermsItem>Perubahan akan diinformasikan melalui email dan platform komunitas.</TermsItem>
              <TermsItem>Anggota dianggap menyetujui perubahan jika terus berpartisipasi setelah pemberitahuan.</TermsItem>
              <TermsItem>Versi terbaru dari dokumen ini akan selalu tersedia di website resmi.</TermsItem>
              <TermsItem>Pertanyaan mengenai Syarat & Ketentuan dapat diajukan melalui form kontak.</TermsItem>
            </ul>
          </TermsSection>

          {/* Section 5: Komunikasi */}
          <TermsSection 
            title="Komunikasi"
            icon={ScrollText}
            iconColor="bg-amethyst text-background"
            glowColor="rgba(229, 222, 255, 0.3)"
            isExpanded={expandedSection === "communication"}
            onToggle={() => setExpandedSection(expandedSection === "communication" ? null : "communication")}
            variants={itemVariants}
          >
            <ul className="space-y-3 text-foreground/80 text-sm">
              <TermsItem>Anggota wajib menjaga etika komunikasi yang baik dan santun.</TermsItem>
              <TermsItem>Dilarang melakukan spam, promosi berlebihan, atau konten tidak pantas.</TermsItem>
              <TermsItem>Semua diskusi harus tetap dalam koridor yang konstruktif dan positif.</TermsItem>
              <TermsItem>Moderator berhak menghapus konten yang melanggar aturan komunikasi.</TermsItem>
            </ul>
          </TermsSection>

          {/* Section 6: Pelanggaran & Sanksi */}
          <TermsSection 
            title="Pelanggaran & Sanksi"
            icon={AlertCircle}
            iconColor="bg-coral text-background"
            glowColor="rgba(254, 198, 161, 0.3)"
            isExpanded={expandedSection === "violations"}
            onToggle={() => setExpandedSection(expandedSection === "violations" ? null : "violations")}
            variants={itemVariants}
            colSpan="lg:col-span-3"
          >
            <ul className="space-y-3 text-foreground/80 text-sm">
              <TermsItem>Pelanggaran ringan akan mendapat peringatan tertulis.</TermsItem>
              <TermsItem>Pelanggaran berulang dapat mengakibatkan pembatasan akses ke fasilitas komunitas.</TermsItem>
              <TermsItem>Pelanggaran berat (seperti pelecehan, diskriminasi, atau pencurian karya intelektual) dapat berakibat pada penghentian keanggotaan secara permanen.</TermsItem>
              <TermsItem>Keputusan tim moderator bersifat final namun dapat diajukan banding melalui prosedur yang ditetapkan.</TermsItem>
              <TermsItem>OUR CREATIVITY berhak untuk melaporkan kegiatan ilegal kepada pihak berwajib.</TermsItem>
            </ul>
          </TermsSection>
        </motion.div>

        {/* Final Notes */}
        <motion.div 
          className="mt-12 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-secondary/90 to-secondary/70 backdrop-blur-lg border border-white/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <CheckCircle2 className="w-8 h-8 text-amethyst mx-auto mb-4" />
          <h3 className="text-lg md:text-xl font-serif mb-3">Penerimaan Syarat & Ketentuan</h3>
          <p className="text-foreground/80 text-sm md:text-base">
            Dengan bergabung atau berpartisipasi dalam kegiatan OUR CREATIVITY, 
            Anda dianggap telah membaca, memahami, dan menyetujui semua syarat dan ketentuan yang tercantum di atas.
          </p>
          <p className="mt-4 text-xs text-foreground/60">
            Terakhir diperbarui: 4 Mei 2025
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
};

// Terms Section component
interface TermsSectionProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  glowColor: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  variants: any;
  colSpan?: string;
}

const TermsSection = ({
  title,
  icon: Icon,
  iconColor,
  glowColor,
  children,
  isExpanded,
  onToggle,
  variants,
  colSpan = "col-span-1"
}: TermsSectionProps) => {
  return (
    <motion.div 
      variants={variants}
      className={colSpan}
    >
      <BentoCard
        className="overflow-hidden h-full"
        glowColor={glowColor}
        icon={Icon}
        iconColor={iconColor}
        interactive={true}
        onClick={onToggle}
      >
        <div className="p-4 md:p-6 pt-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg md:text-xl font-serif font-medium">{title}</h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3, delay: isExpanded ? 0.2 : 0 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      </BentoCard>
    </motion.div>
  );
};

// Terms Item component
const TermsItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2">
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0"></span>
    <span className="text-xs md:text-sm">{children}</span>
  </li>
);

export default Terms;
