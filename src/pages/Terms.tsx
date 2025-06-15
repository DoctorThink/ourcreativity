
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layouts/PageLayout";
import { TermsNavigation } from "@/components/terms/TermsNavigation";
import { TermsSection } from "@/components/terms/TermsSection";
import { TermsList } from "@/components/terms/TermsList";
import { 
  Users, 
  Pencil, 
  Shield, 
  Bell, 
  ScrollText, 
  AlertCircle,
  CheckCircle2,
  BookOpenCheck
} from "lucide-react";

const Terms = () => {
  const [activeSection, setActiveSection] = useState("membership");

  const navigationItems = [
    { id: "membership", title: "Keanggotaan", number: 1 },
    { id: "content", title: "Konten Kreatif", number: 2 },
    { id: "privacy", title: "Privasi & Data", number: 3 },
    { id: "communication", title: "Komunikasi", number: 4 },
    { id: "changes", title: "Perubahan Ketentuan", number: 5 },
    { id: "violations", title: "Pelanggaran & Sanksi", number: 6 }
  ];

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const membershipTerms = [
    "Keanggotaan terbuka untuk semua individu berusia minimal 15 tahun.",
    "Pendaftaran mengharuskan pengisian formulir dan verifikasi email.",
    "Anggota diharapkan berpartisipasi dalam minimal satu kegiatan komunitas setiap tiga bulan.",
    "Anggota dapat memilih untuk bergabung dengan satu atau lebih kelompok kreatif sesuai minat.",
    "Keanggotaan dapat dicabut jika melanggar kode etik komunitas."
  ];

  const contentTerms = [
    "Konten yang dibagikan harus asli atau memiliki izin penggunaan yang tepat.",
    "Dilarang keras membagikan konten dengan unsur SARA, pornografi, atau melanggar hukum.",
    "OUR CREATIVITY memiliki hak untuk menampilkan karya anggota di platform komunitas.",
    "Hak cipta tetap dimiliki oleh kreator asli.",
    "Penggunaan logo atau identitas OUR CREATIVITY memerlukan izin tertulis."
  ];

  const privacyTerms = [
    "Data pribadi anggota dilindungi dan tidak akan dibagikan kepada pihak ketiga tanpa izin.",
    "Informasi kontak hanya digunakan untuk keperluan komunikasi komunitas.",
    "Anggota dapat meminta penghapusan data pribadi kapan saja.",
    "Cookies digunakan untuk meningkatkan pengalaman di platform digital komunitas.",
    "OUR CREATIVITY tidak bertanggung jawab atas kebocoran data yang terjadi di luar kendali kami."
  ];

  const communicationTerms = [
    "Anggota wajib menjaga etika komunikasi yang baik dan santun.",
    "Dilarang melakukan spam, promosi berlebihan, atau konten tidak pantas.",
    "Semua diskusi harus tetap dalam koridor yang konstruktif dan positif.",
    "Moderator berhak menghapus konten yang melanggar aturan komunikasi."
  ];

  const changesTerms = [
    "OUR CREATIVITY berhak mengubah Syarat & Ketentuan ini sewaktu-waktu.",
    "Perubahan akan diinformasikan melalui email dan platform komunitas.",
    "Anggota dianggap menyetujui perubahan jika terus berpartisipasi setelah pemberitahuan.",
    "Versi terbaru dari dokumen ini akan selalu tersedia di website resmi.",
    "Pertanyaan mengenai Syarat & Ketentuan dapat diajukan melalui form kontak."
  ];

  const violationTerms = [
    "Pelanggaran ringan akan mendapat peringatan tertulis.",
    "Pelanggaran berulang dapat mengakibatkan pembatasan akses ke fasilitas komunitas.",
    "Pelanggaran berat (seperti pelecehan, diskriminasi, atau pencurian karya intelektual) dapat berakibat pada penghentian keanggotaan secara permanen.",
    "Keputusan tim moderator bersifat final namun dapat diajukan banding melalui prosedur yang ditetapkan.",
    "OUR CREATIVITY berhak untuk melaporkan kegiatan ilegal kepada pihak berwajib."
  ];

  return (
    <PageLayout>
      <div className="relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-4 rounded-full bg-amethyst/20 mb-6">
            <BookOpenCheck className="w-8 h-8 text-amethyst" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-6 font-sans leading-relaxed">
            Informasi penting mengenai keanggotaan dan partisipasi dalam komunitas OurCreativity
          </p>
          <p className="text-sm text-foreground/60 font-sans">
            Terakhir diperbarui: 4 Mei 2025
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className="flex gap-12">
          {/* Desktop Sidebar Navigation */}
          <TermsNavigation
            items={navigationItems}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="max-w-4xl">
              <TermsSection
                id="membership"
                title="Keanggotaan"
                number={1}
                icon={Users}
                iconColor="bg-turquoise text-background"
              >
                <TermsList items={membershipTerms} />
              </TermsSection>

              <TermsSection
                id="content"
                title="Konten Kreatif"
                number={2}
                icon={Pencil}
                iconColor="bg-coral text-background"
              >
                <TermsList items={contentTerms} />
              </TermsSection>

              <TermsSection
                id="privacy"
                title="Privasi & Data"
                number={3}
                icon={Shield}
                iconColor="bg-mint text-background"
              >
                <TermsList items={privacyTerms} />
              </TermsSection>

              <TermsSection
                id="communication"
                title="Komunikasi"
                number={4}
                icon={ScrollText}
                iconColor="bg-amethyst text-background"
              >
                <TermsList items={communicationTerms} />
              </TermsSection>

              <TermsSection
                id="changes"
                title="Perubahan Ketentuan"
                number={5}
                icon={Bell}
                iconColor="bg-softPink text-background"
              >
                <TermsList items={changesTerms} />
              </TermsSection>

              <TermsSection
                id="violations"
                title="Pelanggaran & Sanksi"
                number={6}
                icon={AlertCircle}
                iconColor="bg-coral text-background"
              >
                <TermsList items={violationTerms} />
              </TermsSection>

              {/* Final Acknowledgement */}
              <motion.div 
                className="mt-20 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-secondary/90 to-secondary/70 backdrop-blur-lg border border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-block p-4 rounded-full bg-amethyst/20 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-amethyst" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                  Penerimaan Syarat & Ketentuan
                </h3>
                <p className="text-foreground/80 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto">
                  Dengan bergabung atau berpartisipasi dalam kegiatan OUR CREATIVITY, 
                  Anda dianggap telah membaca, memahami, dan menyetujui semua syarat dan ketentuan yang tercantum di atas.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;

