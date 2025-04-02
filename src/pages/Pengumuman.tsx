import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Zap, Sparkles, ArrowRight, Users, Star, Instagram, AlertCircle, Milestone } from 'lucide-react';
import React from "react";

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
  date: "Juni 2024",
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

// --- Accent Color Mapping (No changes needed) ---
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string; iconBg: string; lineBg: string }> = {
  lavender: { bg: "bg-lavender/10", border: "border-lavender/40", text: "text-lavender", iconText: "text-lavender", shadow: "shadow-lavender/5", iconBg: "bg-lavender/20", lineBg: "bg-lavender/50" },
  mint: { bg: "bg-mint/10", border: "border-mint/40", text: "text-mint", iconText: "text-mint", shadow: "shadow-mint/5", iconBg: "bg-mint/20", lineBg: "bg-mint/50" },
  peach: { bg: "bg-peach/10", border: "border-peach/40", text: "text-peach", iconText: "text-peach", shadow: "shadow-peach/5", iconBg: "bg-peach/20", lineBg: "bg-peach/50" },
  softPink: { bg: "bg-softPink/10", border: "border-softPink/40", text: "text-softPink", iconText: "text-softPink", shadow: "shadow-softPink/5", iconBg: "bg-softPink/20", lineBg: "bg-softPink/50" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/5", iconBg: "bg-amethyst/20", lineBg: "bg-amethyst/50" },
  turquoise: { bg: "bg-turquoise/10", border: "border-turquoise/40", text: "text-turquoise", iconText: "text-turquoise", shadow: "shadow-turquoise/5", iconBg: "bg-turquoise/20", lineBg: "bg-turquoise/50" },
  coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/5", iconBg: "bg-coral/20", lineBg: "bg-coral/50" },
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
        {/* --- Single Announcement Card --- */}
        <motion.section
            variants={cardVariants}
            whileHover={cardHover}
            className={cn(
                "rounded-3xl border relative overflow-hidden shadow-xl p-6 md:p-8",
                "bg-secondary/70 backdrop-blur-xl",
                getAccentStyle(majorUpdateAnnouncement.accent).border,
                getAccentStyle(majorUpdateAnnouncement.accent).shadow
            )}
        >
           <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative z-10"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", getAccentStyle(majorUpdateAnnouncement.accent).iconBg)}>
                            <majorUpdateAnnouncement.icon className={cn("w-5 h-5", getAccentStyle(majorUpdateAnnouncement.accent).iconText)} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold font-serif text-foreground tracking-tight">
                            {majorUpdateAnnouncement.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                         <span className={cn(
                             "inline-block px-3 py-1 rounded-full text-xs font-medium border",
                             getAccentStyle(majorUpdateAnnouncement.accent).bg,
                             getAccentStyle(majorUpdateAnnouncement.accent).border,
                             getAccentStyle(majorUpdateAnnouncement.accent).text,
                             "opacity-90"
                         )}>
                             {majorUpdateAnnouncement.tag}
                         </span>
                        <span className="text-xs font-medium text-neutral-400">
                            {majorUpdateAnnouncement.date}
                        </span>
                    </div>
                </div>
                <div className="space-y-3 font-sans text-[14px] text-foreground/80 leading-relaxed text-readable">
                    {majorUpdateAnnouncement.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </motion.div>
            {/* Decorative elements */}
            <div className={cn("absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-[0.07] blur-xl", getAccentStyle(majorUpdateAnnouncement.accent).bg.replace('/10','/80'))}></div>
            <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-[0.07] blur-xl", getAccentStyle(majorUpdateAnnouncement.accent).bg.replace('/10','/80'))}></div>
             <div className="absolute inset-0 noise-pattern opacity-[0.01]"></div>
        </motion.section>

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

        {/* --- Call to Action Card --- */}
        <motion.section
          variants={cardVariants}
          whileHover={cardHover}
          className={cn(
            "rounded-3xl border relative overflow-hidden shadow-xl p-6 md:p-8 text-center",
            "bg-gradient-to-tr from-secondary/70 to-secondary/80 backdrop-blur-xl", // Different gradient
            "border-neutral-700/50 shadow-black/10"
          )}
        >
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative z-10"
            >
                <div className="w-12 h-12 rounded-xl bg-neutral-700/50 border border-neutral-600 flex items-center justify-center mx-auto mb-4">
                    <Instagram className="w-6 h-6 text-neutral-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold font-serif text-foreground mb-3">
                    Bergabung dengan OurCreativity
                </h3>
                <p className="text-sm md:text-base text-neutral-300 max-w-lg mx-auto mb-6 leading-relaxed">
                    Jadilah bagian dari 3000+ anak muda kreatif. Kunjungi media sosial kami via Linktree dan mulai berkarya bersama.
                </p>
                <motion.button
                    onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
                    className={cn(
                        "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                        "bg-neutral-200 text-neutral-900 hover:bg-white shadow-md hover:shadow-lg", // Light mode button style
                        "group"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Kunjungi Linktree
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </motion.div>
             <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-neutral-700/10 opacity-50 blur-xl"></div>
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
