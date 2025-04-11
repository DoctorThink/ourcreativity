
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Zap, Sparkles, ArrowRight, Users, Star, Instagram, AlertCircle, Milestone, UploadCloud, ChevronDown } from 'lucide-react';
import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FILES/FOLDERS TO CHECK/ENSURE EXIST AND ARE CONFIGURED:
 * (Consistency Check - Assumed same as previous examples)
 *
 * 1.  `src/components/layouts/PageLayout.tsx`: Provides page structure, header, background.
 * 2.  `src/index.css`: Defines CSS variables, fonts, base styles, Tailwind directives.
 * 3.  `tailwind.config.ts`: Defines accent colors, fonts, plugins.
 * 4.  `src/lib/utils.ts`: Provides the `cn` utility function.
 * 5.  `lucide-react` (dependency): Installed.
 * 6.  `framer-motion` (dependency): Installed.
 */

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
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
const majorUpdateAnnouncement = {
  id: 1,
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

const timelineSteps = [
  { id: 1, title: "Media Sosial Inspiratif", description: "Konten menarik minat awal.", icon: Instagram, accent: "softPink" },
  { id: 2, title: "Minat Terbentuk", description: "Ketertarikan untuk bergabung.", icon: Star, accent: "peach" },
  { id: 3, title: "Bergabung Komunitas", description: "Menjadi bagian dari OurCreativity.", icon: Users, accent: "mint" },
  { id: 4, title: "Berkarya & Belajar Aktif", description: "Diskusi, kolaborasi, pengembangan diri.", icon: Sparkles, accent: "lavender" },
  { id: 5, title: "Konsistensi Berkarya", description: "Membangun kebiasaan kreatif.", icon: Milestone, accent: "turquoise" },
  { id: 6, title: "Kolaborasi & Apresiasi", description: "Publikasi karya di @ourcreativity.ofc.", icon: Instagram, accent: "amethyst" },
  { id: 7, title: "Menarik Minat Baru", description: "Komunitas berkembang & menginspirasi.", icon: Users, accent: "coral" }
];

const newAnnouncement = {
  id: 2,
  title: "🎉 UPDATE v3.7: WUJUDKAN KREASIMU! 🎉🚀",
  date: "11 April 2025", // Updated date
  icon: UploadCloud, // New icon
  accent: "yellow", // New accent color
  tag: "Fitur Baru",
  content: `
Halo para Kreator OurCreativity! 👋🎨

Ada kabar SUPER HEBOH! 🤩 Dengan Update v3.7 (11 April 2025), kini giliran KAMU untuk PAMERKAN KARYA KERENMU langsung di OurCreativity! 🔥

**Apa yang Baru? Fitur "UNGGAH KARYA" 🤩 Spesial Buat KAMU!**

*   **PAMERKAN KREASIMU:** ⬆️ Upload Gambar 🖼️, Video 🎬, atau Tulisan ✍️ karyamu SENDIRI!
*   **GAMPANG BANGET:** 👍 Cari tombol "UNGGAH KARYA" (ada di header atau halaman Karya Kami), lalu ikuti formulirnya yang MUDAH!
*   **PILIH JENIS KARYAMU:** Ada tab untuk Gambar (JPG, PNG, MAKS 1MB), Video (MP4, MAKS 50MB), atau Tulisan (langsung ketik aja!).

**Bagaimana Caranya? Gampang Kok!**

1.  Klik tombol "UNGGAH KARYA" 🖱️.
2.  Isi detail singkat: Judul, Nama Kamu, Kategori (Desain, Video, Tulisan, Meme). 📝
3.  UPLOAD file gambarmu (MAKS 1MB) 🖼️ atau videomu (MAKS 50MB) 🎬. Kalau tulisan, ketik langsung di deskripsi ✍️.
4.  Klik Kirim! ✅ Karyamu akan dicek dulu (status pending ⏳) oleh tim admin kami sebelum bisa TAMPIL di galeri. Tenang, kamu akan dapat notifikasi kok! 😉

📌 **PENTING! Ingat Aturan Mainnya Ya:**

*   Pastikan karya itu ORISINAL (buatanmu sendiri) atau kamu PUNYA IZIN yang jelas untuk membagikannya! 📜
*   DILARANG KERAS mengunggah konten yang melanggar HAK CIPTA orang lain! 🚫
*   Jaga konten tetap SOPAN & POSITIF (NO SARA, kekerasan, hal negatif)! 👍✨
*   Patuhi BATAS UKURAN FILE yang ditentukan (Gambar: 1MB, Video: 50MB)! 📏

Kami GAK SABAR BANGET mau lihat karya-karya HEBAT dari kalian semua! Yuk, langsung COBA FITUR BARUNYA SEKARANG dan ramaikan galeri OurCreativity! 🚀🔥✨

Salam Kreatif, 🎨
Tim OurCreativity
`
};

// --- Accent Color Mapping (No changes needed) ---
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string; iconBg: string; lineBg: string }> = {
  lavender: { bg: "bg-lavender/10", border: "border-lavender/40", text: "text-lavender", iconText: "text-lavender", shadow: "shadow-lavender/5", iconBg: "bg-lavender/20", lineBg: "bg-lavender/50" },
  mint: { bg: "bg-mint/10", border: "border-mint/40", text: "text-mint", iconText: "text-mint", shadow: "shadow-mint/5", iconBg: "bg-mint/20", lineBg: "bg-mint/50" },
  peach: { bg: "bg-peach/10", border: "border-peach/40", text: "text-peach", iconText: "text-peach", shadow: "shadow-peach/5", iconBg: "bg-peach/20", lineBg: "bg-peach/50" },
  softPink: { bg: "bg-softPink/10", border: "border-softPink/40", text: "text-softPink", iconText: "text-softPink", shadow: "shadow-softPink/5", iconBg: "bg-softPink/20", lineBg: "bg-softPink/50" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/5", iconBg: "bg-amethyst/20", lineBg: "bg-amethyst/50" },
  turquoise: { bg: "bg-turquoise/10", border: "border-turquoise/40", text: "text-turquoise", iconText: "text-turquoise", shadow: "shadow-turquoise/5", iconBg: "bg-turquoise/20", lineBg: "bg-turquoise/50" },
  coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/5", iconBg: "bg-coral/20", lineBg: "bg-coral/50" },
  yellow: { bg: "bg-yellow-400/10", border: "border-yellow-500/40", text: "text-yellow-400", iconText: "text-yellow-400", shadow: "shadow-yellow-500/15", iconBg: "bg-yellow-400/20", lineBg: "bg-yellow-500/50" }, // Added Yellow
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10", iconBg: "bg-neutral-700/50", lineBg: "bg-neutral-600/50" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
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
        className="space-y-8 md:space-y-10 relative z-10 pb-12"
      >
        {/* --- New Announcement Card (v3.7) --- */}
        <motion.section
            variants={cardVariants}
            whileHover={cardHover}
            className={cn(
                "rounded-3xl border relative overflow-hidden shadow-xl p-6 md:p-8",
                "bg-secondary/70 backdrop-blur-xl", // Base style
                getAccentStyle(newAnnouncement.accent).border, // Yellow border
                getAccentStyle(newAnnouncement.accent).shadow, // Yellow shadow/glow
                "shadow-yellow-500/20" // Explicit stronger glow
            )}
        >
            {/* Glowing effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className={cn(
                    "absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl",
                    "bg-gradient-radial from-yellow-400/60 via-yellow-500/30 to-transparent"
                )}></div>
                <div className={cn(
                    "absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl",
                     "bg-gradient-radial from-yellow-500/60 via-yellow-600/30 to-transparent"
                )}></div>
            </div>

           <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative z-10"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", getAccentStyle(newAnnouncement.accent).iconBg)}>
                            <newAnnouncement.icon className={cn("w-5 h-5", getAccentStyle(newAnnouncement.accent).iconText)} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold font-serif text-foreground tracking-tight">
                            {newAnnouncement.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                         <span className={cn(
                             "inline-block px-3 py-1 rounded-full text-xs font-medium border",
                             getAccentStyle(newAnnouncement.accent).bg,
                             getAccentStyle(newAnnouncement.accent).border,
                             getAccentStyle(newAnnouncement.accent).text,
                             "opacity-90"
                         )}>
                             {newAnnouncement.tag}
                         </span>
                        <span className="text-xs font-medium text-neutral-400">
                            {newAnnouncement.date}
                        </span>
                    </div>
                </div>
                {/* Markdown Content */}
                <div className="prose prose-sm md:prose-base prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-p:text-foreground/80 prose-li:text-foreground/80 prose-strong:text-yellow-400 prose-a:text-yellow-400 hover:prose-a:text-yellow-300 prose-code:text-softPink prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-secondary">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {newAnnouncement.content}
                    </ReactMarkdown>
                </div>
            </motion.div>
             <div className="absolute inset-0 noise-pattern opacity-[0.01] z-0"></div>
        </motion.section>

        {/* --- Accordion for Old Announcement (v3.5) --- */}
        <motion.div variants={cardVariants}>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="old-announcement-1" className={cn(
                    "rounded-2xl border overflow-hidden",
                    "bg-secondary/50 backdrop-blur-lg border-neutral-700/40 shadow-md"
                )}>
                    <AccordionTrigger className="px-5 py-3 hover:no-underline hover:bg-neutral-800/30 transition-colors duration-200 group">
                        <div className="flex items-center gap-3 text-left">
                             <div className={cn("w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-200", getAccentStyle(majorUpdateAnnouncement.accent).iconBg.replace('/20','/15'), "group-hover:bg-neutral-700/40")}>
                                <majorUpdateAnnouncement.icon className={cn("w-4 h-4 transition-colors duration-200", getAccentStyle(majorUpdateAnnouncement.accent).iconText, "group-hover:text-neutral-300")} />
                            </div>
                            <span className="text-sm md:text-base font-medium font-serif text-neutral-300 group-hover:text-foreground transition-colors duration-200">
                                Arsip: {majorUpdateAnnouncement.title} ({majorUpdateAnnouncement.date})
                            </span>
                        </div>
                         <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pt-2 pb-5 border-t border-neutral-700/40 bg-secondary/30">
                         {/* Re-using structure from original card, simplified */}
                         <div className="space-y-3 font-sans text-[13px] text-neutral-400 leading-relaxed mt-2">
                            {majorUpdateAnnouncement.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </motion.div>

        {/* --- Interactive Timeline Section --- */}
        <motion.section
            variants={cardVariants}
            className={cn(
                "rounded-3xl border relative overflow-hidden shadow-lg p-6 md:p-8",
                "bg-secondary/70 backdrop-blur-xl border-neutral-700/40 shadow-black/10"
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="relative z-10"
            >
                <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-neutral-700/50 border border-neutral-600 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-5 h-5 text-neutral-300" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold font-serif text-foreground tracking-tight">
                        Harapan & Alur Perkembangan
                    </h2>
                </div>

                {/* Timeline Container */}
                <div className="relative pl-5">
                     {/* Vertical Connecting Line */}
                    <div className="absolute left-[21px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-neutral-700/30 via-neutral-600/50 to-neutral-700/30 rounded-full z-0"></div>

                    <div className="space-y-6 relative z-10">
                        {timelineSteps.map((step, index) => {
                            const accent = getAccentStyle(step.accent);
                            const StepIcon = step.icon;
                            return (
                                <motion.div
                                    key={step.id}
                                    variants={timelineItemVariants}
                                    className="flex items-start gap-4 group"
                                >
                                    {/* Step Marker */}
                                    <motion.div
                                        className={cn(
                                            "mt-1 w-11 h-11 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300",
                                            accent.border, accent.iconBg, "group-hover:scale-110 group-hover:shadow-md", accent.shadow
                                        )}
                                        whileHover={{ rotate: 5 }}
                                    >
                                        <StepIcon className={cn("w-5 h-5", accent.iconText)} />
                                    </motion.div>

                                    {/* Step Content */}
                                    <motion.div
                                        className={cn(
                                            "flex-1 pt-1 pb-2 transition-opacity duration-300 group-hover:opacity-100",
                                            // index === 0 ? "opacity-100" : "opacity-80" // Example: Make first item fully opaque initially
                                        )}
                                        initial={{ opacity: 0.8 }} // Start slightly faded
                                        whileHover={{ opacity: 1 }} // Full opacity on hover
                                    >
                                        <h3 className="text-base md:text-lg font-semibold font-serif text-foreground mb-0.5 leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-[13px] text-neutral-400 font-sans leading-normal">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
             <div className="absolute inset-0 geometric-dot-pattern opacity-[0.02] mix-blend-overlay"></div>
        </motion.section>

        {/* --- Important Info Card --- */}
        <motion.div
            variants={cardVariants}
            className={cn(
                "rounded-3xl border p-5 text-center", // Slightly smaller padding
                "bg-secondary/60 backdrop-blur-md border-neutral-700/40 shadow-md" // More subtle
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
    </PageLayout>
  );
};

export default Pengumuman;
