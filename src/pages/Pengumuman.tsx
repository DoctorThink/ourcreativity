import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Zap, Sparkles, ArrowRight, Users, Star, Instagram, AlertCircle, ChevronDown } from 'lucide-react';
import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const announcementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const cardHover = {
  scale: 1.02,
  boxShadow: "0px 10px 20px -8px rgba(0, 0, 0, 0.2)",
  transition: { type: "spring", stiffness: 350, damping: 20 },
};

const timelineItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

// --- Data ---
const newAnnouncement = {
  title: "🎉 Update v3.7: Fitur Unggah Karya",
  subtitle: "WUJUDKAN KARYAMU!",
  date: "11 April 2025",
  sections: [
    {
      title: "Apa yang Baru?",
      content: [
        "Ada pembaruan seru di website kita! Dengan Update v3.7, kini giliran kamu untuk berbagi dan mewujudkan karya kerenmu langsung melalui OurCreativity!",
        "Fitur \"Unggah Karya\" Spesial Buat Kamu!",
      ]
    },
    {
      title: "Yang Kamu Bisa Lakukan:",
      content: [
        "Pamerkan Kreasimu: Sekarang kamu bisa unggah Gambar, Video, atau Tulisan karyamu sendiri",
        "Gampang Banget: Cari tombol \"Unggah Karya\" (ada di header atau halaman Karya Kami)",
        "Pilih Jenis Karyamu: Ada pilihan untuk Gambar (JPG, PNG, WebP, GIF - maks 1MB), Video (MP4, WebM, OGG - maks 50MB), atau Tulisan"
      ]
    },
    {
      title: "Bagaimana Caranya?",
      content: [
        "1. Klik tombol \"Unggah Karya\"",
        "2. Isi detail singkat: Judul, Namamu, Kategori (Desain, Video, Tulisan, Meme)",
        "3. Unggah file gambar (maks 1MB) atau video (maks 50MB)",
        "4. Klik Kirim!"
      ]
    },
    {
      title: "Proses Seleksi & Tampil Karya",
      content: [
        "• Karya yang kamu kirim akan ditinjau oleh tim admin",
        "• Kami akan melakukan seleksi berdasarkan kriteria seperti orisinalitas, kualitas, dan kesesuaian",
        "• Karya-karya terpilih akan kami umumkan dan tampilkan di galeri Karya Kami dalam update mingguan"
      ]
    },
    {
      title: "Ingat Aturan Mainnya Ya:",
      content: [
        "• Pastikan karya itu buatanmu sendiri atau kamu punya izin jelas untuk membagikannya",
        "• Hargai hak cipta orang lain. Dilarang keras mengunggah karya milik orang lain tanpa izin",
        "• Jaga konten tetap sopan dan positif (tidak mengandung SARA, kekerasan, dll)",
        "• Patuhi batas ukuran file (Gambar 1MB, Video 50MB)"
      ]
    }
  ]
};

const oldAnnouncement = {
  title: "Major Update 3.5: Wajah Baru OurCreativity!",
  date: "2 April 2024",
  icon: Zap,
  accent: "amethyst",
  tag: "Pembaruan",
  content: [
    "Selamat datang di tampilan baru website OurCreativity! Update 3.5 membawa penyegaran visual menyeluruh dengan fokus pada pengalaman pengguna yang modern, intuitif, dan inspiratif.",
    "Mengadopsi filosofi desain 'Creative Constellations', kami menghadirkan antarmuka yang terinspirasi iOS: kartu-kartu elegan dengan sudut membulat, efek kedalaman melalui latar belakang blur (`backdrop-blur`), dan tipografi yang jelas serta mudah dibaca (`font-serif` untuk judul, `font-sans` untuk teks).",
    "Navigasi disederhanakan, dan animasi halus (`framer-motion`) ditambahkan untuk interaksi yang lebih dinamis dan menyenangkan. Palet warna gelap dipertahankan dengan aksen warna cerah (seperti Lavender, Mint, Peach) yang digunakan secara strategis untuk menyorot informasi penting dan kategori.",
    "Tujuannya adalah menciptakan ruang digital yang tidak hanya fungsional tetapi juga secara estetis mencerminkan semangat kreativitas, kolaborasi, dan inovasi komunitas kita.",
  ]
};

const Pengumuman = () => {
  return (
    <PageLayout
      title="PENGUMUMAN"
      subtitle="Informasi terbaru dan alur perkembangan komunitas OurCreativity"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* New Main Announcement with Yellow Glow */}
        <motion.section
          variants={cardVariants}
          whileHover={cardHover}
          className={cn(
            "rounded-3xl border relative overflow-hidden shadow-xl p-6 md:p-8",
            "bg-secondary/70 backdrop-blur-xl border-amber-500/30",
            "glow-announcement"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-10"
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-amber-200 tracking-tight leading-tight">
                    {newAnnouncement.title}
                  </h2>
                </div>
                <p className="text-lg md:text-xl font-semibold text-amber-100/90">
                  {newAnnouncement.subtitle}
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-amber-500/30 bg-amber-500/10 text-amber-200">
                    Update Terbaru
                  </span>
                  <span className="text-xs font-medium text-amber-200/70">
                    {newAnnouncement.date}
                  </span>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-6 mt-2">
                {newAnnouncement.sections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold text-amber-100">
                      {section.title}
                    </h3>
                    <div className="space-y-2 text-[15px] leading-relaxed text-amber-100/80">
                      {section.content.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Closing */}
              <div className="mt-4 pt-4 border-t border-amber-500/20">
                <p className="text-amber-100/90 text-sm font-medium">
                  Kami nggak sabar melihat karya-karya hebat dari kalian! Yuk, segera coba fitur barunya dan WUJUDKAN KARYAMU di galeri OurCreativity! 🔥
                </p>
                <p className="text-amber-200/70 text-sm mt-2">
                  Salam Kreatif,<br />
                  Tim OurCreativity
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Glowing Effect */}
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full opacity-[0.15] blur-3xl bg-amber-500/80"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-[0.12] blur-3xl bg-amber-400/80"></div>
        </motion.section>

        {/* Previous Announcement in Accordion */}
        <motion.div variants={cardVariants}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="prev-update" className="border-none">
              <AccordionTrigger className="hover:no-underline py-6 px-6 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-neutral-700/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amethyst/20 flex items-center justify-center">
                    <oldAnnouncement.icon className="w-5 h-5 text-amethyst" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-base font-semibold text-foreground">
                      {oldAnnouncement.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border border-amethyst/30 bg-amethyst/10 text-amethyst">
                        {oldAnnouncement.tag}
                      </span>
                      <span className="text-xs font-medium text-neutral-400">
                        {oldAnnouncement.date}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 px-6">
                <div className="space-y-4 text-[14px] text-foreground/80 leading-relaxed">
                  {oldAnnouncement.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Info Card */}
        <motion.div
          variants={cardVariants}
          className={cn(
            "rounded-3xl border p-5 text-center",
            "bg-secondary/60 backdrop-blur-md border-neutral-700/40 shadow-md"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <AlertCircle className="w-4 h-4 text-neutral-500" />
            <p className="text-xs font-medium text-neutral-400">Informasi Penting</p>
          </div>
          <p className="text-xs text-neutral-400 leading-normal">
            Pengumuman akan diperbarui secara berkala. Pantau terus halaman ini dan media sosial kami.
          </p>
        </motion.div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .glow-announcement {
              box-shadow: 0 0 50px -12px rgba(245, 158, 11, 0.2);
              transition: all 0.3s ease;
            }
            .glow-announcement:hover {
              box-shadow: 0 0 60px -8px rgba(245, 158, 11, 0.3);
            }
          `
        }}
      />
    </PageLayout>
  );
};

export default Pengumuman;
