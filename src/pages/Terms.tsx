import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Check, Shield, AlertTriangle, User, FileCode, Users, Heart, Bookmark } from "lucide-react"; // Removed unused icons
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
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const cardHover = {
  scale: 1.02,
  boxShadow: "0px 10px 20px -8px rgba(0, 0, 0, 0.2)",
  transition: { type: "spring", stiffness: 350, damping: 20 },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

// --- Terms Data (Simplified and Structured for Cards) ---
const termsSections = [
  {
    id: "membership",
    title: "Keanggotaan",
    icon: User,
    accent: "lavender",
    description: "Syarat dasar menjadi anggota komunitas.",
    rules: [
      "Terbuka untuk semua peminat bidang kreatif.",
      "Wajib mematuhi kode etik & peraturan komunitas.",
      "Diharapkan partisipasi aktif dalam diskusi & kegiatan.",
      "Dapat mengundurkan diri kapan saja dengan pemberitahuan.",
    ],
  },
  {
    id: "content",
    title: "Konten & Karya",
    icon: FileCode,
    accent: "mint",
    description: "Aturan berbagi konten dan hasil karya.",
    rules: [
      "Karya harus asli atau memiliki izin yang jelas.",
      "Dilarang melanggar hak cipta & kekayaan intelektual.",
      "Konten harus sesuai norma & nilai positif.",
      "Komunitas berhak menampilkan karya untuk promosi (dengan kredit).",
    ],
  },
  {
    id: "interaction",
    title: "Interaksi Komunitas",
    icon: Users,
    accent: "peach",
    description: "Panduan komunikasi antar anggota.",
    rules: [
      "Jaga kesopanan & saling menghormati.",
      "Tidak ada toleransi untuk pelecehan & diskriminasi.",
      "Kritik bersifat konstruktif, fokus pada karya.",
      "Pelanggaran berulang dapat berakibat sanksi.",
    ],
  },
  {
    id: "groups",
    title: "Fokus Grup",
    icon: Heart, // Representing interests/focus
    accent: "softPink",
    description: "Ketentuan mengenai grup minat kreatif.",
    rules: [
      "Bebas bergabung lebih dari satu grup (Desain, Video, Meme, Tulis).",
      "Diskusi & konten harus relevan dengan topik grup.",
      "Kolaborasi antar grup sangat didorong.",
      "Setiap grup memiliki pedoman tambahan jika diperlukan.",
    ],
  }
];

const intro = {
    title: "Tentang Syarat & Ketentuan",
    icon: Shield,
    accent: "default", // Use default style
    text: "Syarat dan ketentuan ini dirancang untuk memastikan pengalaman yang positif, aman, dan produktif bagi semua anggota komunitas. Dengan bergabung atau berpartisipasi dalam OurCreativity, Anda dianggap telah membaca, memahami, dan setuju untuk mematuhi semua aturan ini."
};

const warning = {
    title: "Pelanggaran Ketentuan",
    icon: AlertTriangle,
    accent: "coral", // Use a distinct accent for warning
    text: "Pelanggaran terhadap syarat dan ketentuan ini dapat berakibat pada peringatan, pembatasan akses, atau pengakhiran keanggotaan, tergantung tingkat keparahan. Komunitas berhak mengubah ketentuan ini dari waktu ke waktu dengan pemberitahuan wajar kepada anggota."
};

const agreement = {
    title: "Persetujuan",
    icon: Bookmark,
    accent: "default",
    text: "Partisipasi Anda dalam komunitas ini adalah bentuk persetujuan terhadap semua syarat dan ketentuan yang berlaku.",
    note: "Ketentuan ini berlaku efektif sejak Juni 2024."
};

// --- Accent Color Mapping (No changes needed) ---
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string; iconBg: string; bulletBg: string }> = {
  lavender: { bg: "bg-lavender/10", border: "border-lavender/40", text: "text-lavender", iconText: "text-lavender", shadow: "shadow-lavender/5", iconBg: "bg-lavender/20", bulletBg: "bg-lavender/70" },
  mint: { bg: "bg-mint/10", border: "border-mint/40", text: "text-mint", iconText: "text-mint", shadow: "shadow-mint/5", iconBg: "bg-mint/20", bulletBg: "bg-mint/70" },
  peach: { bg: "bg-peach/10", border: "border-peach/40", text: "text-peach", iconText: "text-peach", shadow: "shadow-peach/5", iconBg: "bg-peach/20", bulletBg: "bg-peach/70" },
  softPink: { bg: "bg-softPink/10", border: "border-softPink/40", text: "text-softPink", iconText: "text-softPink", shadow: "shadow-softPink/5", iconBg: "bg-softPink/20", bulletBg: "bg-softPink/70" },
  coral: { bg: "bg-coral/10", border: "border-coral/50", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/10", iconBg: "bg-coral/20", bulletBg: "bg-coral/70" }, // Warning accent
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10", iconBg: "bg-neutral-700/50", bulletBg: "bg-neutral-500" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
};


const Terms = () => {
  return (
    <PageLayout
      title="SYARAT & KETENTUAN"
      subtitle="Panduan dan peraturan untuk menjaga kualitas dan integritas komunitas OurCreativity"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* --- Introduction Card --- */}
        <motion.section variants={sectionVariants} className="glass-card rounded-3xl p-6 md:p-8 backdrop-blur-md">
          <div className="flex items-start gap-4">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-1", getAccentStyle(intro.accent).iconBg)}>
                  <intro.icon className={cn("w-5 h-5", getAccentStyle(intro.accent).iconText)} />
              </div>
              <div>
                  <h2 className="text-lg font-semibold font-serif text-foreground mb-1.5">
                      {intro.title}
                  </h2>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed text-readable">
                      {intro.text}
                  </p>
              </div>
          </div>
           <div className={cn("absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-[0.05] blur-lg", getAccentStyle(intro.accent).bg.replace('/20','/80'))}></div>
        </motion.section>

        {/* --- Terms Section Cards --- */}
        {termsSections.map((section) => {
            const accent = getAccentStyle(section.accent);
            const Icon = section.icon;
            return (
             <motion.section
               key={section.id}
               variants={sectionVariants}
               whileHover={cardHover}
               className={cn(
                 "p-6 rounded-3xl border relative overflow-hidden shadow-lg flex flex-col", // Ensure flex column for potential height differences
                 "bg-secondary/70 backdrop-blur-xl",
                 accent.border,
                 accent.shadow
               )}
             >
                {/* Card Header */}
                <div className="flex items-start gap-3.5 mb-4">
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", accent.iconBg)}>
                        <Icon className={cn("w-5 h-5", accent.iconText)} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold font-serif text-foreground tracking-tight">
                        {section.title}
                        </h2>
                        <p className="text-xs text-neutral-400 font-sans mt-0.5">{section.description}</p>
                    </div>
                </div>

                {/* Rules List */}
                <ul className="space-y-3 font-sans text-sm text-foreground/80 leading-relaxed list-none pl-1 flex-grow"> {/* flex-grow helps with alignment */}
                   {section.rules.map((rule, index) => (
                     <motion.li
                        key={index}
                        variants={listItemVariants}
                        className="flex items-start gap-3"
                      >
                         <span className={cn(
                            "mt-[5px] w-2 h-2 rounded-full flex-shrink-0", // Bullet styling
                            accent.bulletBg
                          )}
                          />
                         <span className="flex-1">{rule}</span> {/* Ensure text wraps */}
                     </motion.li>
                   ))}
                </ul>
                <div className={cn("absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-[0.06] blur-lg", accent.bg.replace('/10','/80'))}></div>
             </motion.section>
            );
        })}

         {/* --- Warning Card --- */}
        <motion.section
            variants={cardVariants}
            className={cn(
                "md:col-span-2 p-6 rounded-3xl border-2 relative overflow-hidden shadow-lg", // Stronger border for warning
                "bg-secondary/80 backdrop-blur-xl", // Slightly more opaque
                getAccentStyle(warning.accent).border, // Use warning accent border
                "shadow-lg", getAccentStyle(warning.accent).shadow // Use warning accent shadow
            )}
        >
            <div className="flex items-start gap-4">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-1", getAccentStyle(warning.accent).iconBg)}>
                    <warning.icon className={cn("w-5 h-5", getAccentStyle(warning.accent).iconText)} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold font-serif text-foreground mb-1.5">
                        {warning.title}
                    </h2>
                    <p className="font-sans text-sm text-foreground/80 leading-relaxed text-readable">
                        {warning.text}
                    </p>
                </div>
            </div>
        </motion.section>

        {/* --- Agreement Card --- */}
        <motion.div
            variants={cardVariants}
            className={cn(
                "md:col-span-2 p-6 rounded-3xl border relative overflow-hidden shadow-lg text-center",
                "bg-secondary/70 backdrop-blur-xl",
                getAccentStyle(agreement.accent).border,
                getAccentStyle(agreement.accent).shadow
            )}
        >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3", getAccentStyle(agreement.accent).iconBg)}>
                <agreement.icon className={cn("w-5 h-5", getAccentStyle(agreement.accent).iconText)} />
            </div>
            <p className="font-sans text-sm text-foreground/85 leading-relaxed max-w-xl mx-auto mb-3">
                {agreement.text}
            </p>
            <p className="font-sans text-xs text-neutral-500 italic">
                 {agreement.note}
            </p>
             <div className="absolute inset-0 geometric-dot-pattern opacity-[0.02] mix-blend-overlay"></div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Terms;
