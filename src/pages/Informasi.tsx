import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Info, Sparkles, Users, Target, Palette, Video, FileText, MessageSquare, Quote as QuoteIcon } from "lucide-react"; // Renamed Quote to QuoteIcon
import React from "react";

/**
 * FILES/FOLDERS TO CHECK/ENSURE EXIST AND ARE CONFIGURED:
 * (Consistency Check - Assumed same as previous)
 *
 * 1.  `src/components/layouts/PageLayout.tsx`: Provides page structure, header, background.
 * 2.  `src/index.css`: Defines CSS variables, fonts, base styles, Tailwind directives.
 * 3.  `tailwind.config.ts`: Defines accent colors, fonts, plugins.
 * 4.  `src/lib/utils.ts`: Provides the `cn` utility function.
 * 5.  `lucide-react` (dependency): Installed.
 * 6.  `framer-motion` (dependency): Installed.
 */

// --- Animation Variants (Consistent) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.3, 0.0, 0.3, 1.0] },
  },
};

const cardHover = {
  scale: 1.025,
  boxShadow: "0px 12px 24px -8px rgba(0, 0, 0, 0.25)",
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

// --- Data Sections (Minor adjustments for consistency) ---
const infoSections = [
  {
    id: "about",
    title: "Tentang Kami",
    icon: Info,
    accent: "lavender", // Assign accents for styling
    content: [
      "Komunitas kreatif berdiri sejak 2024, bertujuan memberi manfaat luas.",
      "Misi kami: mencetak lebih banyak anak muda kreatif di Indonesia.",
      "Wadah bertanya & belajar untuk mengembangkan kreativitas.",
      "Anggota dapat bertanya, belajar, sekaligus menghasilkan karya.",
    ],
  },
  {
    id: "vision",
    title: "Visi Komunitas",
    icon: Target, // Changed icon for variety
    accent: "mint",
    content: [
      "Mengembangkan jiwa kreatif anak muda Indonesia.",
      "Wadah diskusi, kolaborasi, dan penghasil karya.",
      "Membantu mengasah bakat di Karya Tulis, Desain Grafis, & Video Editing.",
      "Memberi kesempatan publikasi karya agar dikenal luas.",
    ],
  },
  {
    id: "mission",
    title: "Misi Kami",
    icon: Sparkles, // Changed icon for variety
    accent: "peach",
    content: [
      "Menghubungkan talenta muda via media sosial untuk bergabung.",
      "Menyediakan platform diskusi & kolaborasi berbagi ilmu.",
      "Mempublikasikan karya anggota via media sosial untuk apresiasi.",
      "Menyelenggarakan program gratis (diskusi, event, proyek).",
      "Mendorong penguasaan berbagai bidang kreatif.",
    ],
  }
];

const communityGroups = [
  {
    title: "Desain Grafis",
    icon: Palette,
    description: "Fokus pada pengembangan skill desain visual digital & cetak.",
    accent: "amethyst" // Using amethyst to match TimKami
  },
  {
    title: "Video Editing",
    icon: Video,
    description: "Belajar & berkarya dalam editing & produksi konten video kreatif.",
    accent: "coral" // Using coral to match TimKami
  },
  {
    title: "Meme Creator",
    icon: MessageSquare, // Using MessageSquare to match data, could use Smile
    description: "Mengembangkan konten kreatif & meme untuk media sosial.",
    accent: "emerald" // Using emerald to match TimKami
  },
  {
    title: "Karya Tulis",
    icon: FileText,
    description: "Menulis & mengembangkan konten tertulis kreatif & bermanfaat.",
    accent: "softPink" // Using softPink
  }
];

const quote = {
    text: "Tanpa keberanian seseorang tidak akan pernah berkarya dan tidak akan berkembang.",
    author: "OurCreativity"
};

const closing = {
    text: "Bergabunglah dengan OurCreativity dan jadilah bagian dari pergerakan kreatif anak muda Indonesia.",
    emphasis: "Berkarya tanpa batas dengan OurCreativity",
    author: "Admin"
};

// --- Accent Color Mapping (Using consistent mapping) ---
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string }> = {
  lavender: { bg: "bg-lavender/10", border: "border-lavender/40", text: "text-lavender", iconText: "text-lavender", shadow: "shadow-lavender/5" },
  mint: { bg: "bg-mint/10", border: "border-mint/40", text: "text-mint", iconText: "text-mint", shadow: "shadow-mint/5" },
  peach: { bg: "bg-peach/10", border: "border-peach/40", text: "text-peach", iconText: "text-peach", shadow: "shadow-peach/5" },
  softPink: { bg: "bg-softPink/10", border: "border-softPink/40", text: "text-softPink", iconText: "text-softPink", shadow: "shadow-softPink/5" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/5" },
  coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/5" },
  emerald: { bg: "bg-emerald/10", border: "border-emerald/40", text: "text-emerald", iconText: "text-emerald", shadow: "shadow-emerald/5" },
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
};

const Informasi = () => {
  return (
    <PageLayout
      title="Informasi Komunitas" // Adjusted title
      subtitle="Tujuan, visi, misi, dan fokus grup kreatif di OurCreativity" // Adjusted subtitle
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative z-10"
      >
        {/* --- Info Section Cards --- */}
        {infoSections.map((section) => {
            const accent = getAccentStyle(section.accent);
            const Icon = section.icon;
            return (
             <motion.div
               key={section.id}
               variants={cardVariants}
               whileHover={cardHover}
               className={cn(
                 "p-5 rounded-3xl border relative overflow-hidden shadow-md",
                 "bg-secondary/60 backdrop-blur-md",
                 accent.border,
                 accent.shadow
               )}
             >
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={cn("w-5 h-5 flex-shrink-0", accent.iconText)} />
                    <h2 className="text-lg font-semibold font-serif text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-2 font-sans text-sm text-foreground/75 leading-normal list-none pl-1"> {/* Use list-none for custom feel */}
                     {section.content.map((item, index) => (
                       <li key={index} className="relative pl-4">
                           <span className={cn("absolute left-0 top-[0.4em] w-1.5 h-1.5 rounded-full", accent.bg.replace('/10', '/80'))}></span> {/* Custom bullet */}
                           {item}
                       </li>
                     ))}
                  </ul>
               </div>
               <div className={cn("absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-[0.07] blur-lg", accent.bg.replace('/10','/80'))}></div>
             </motion.div>
            );
        })}

        {/* --- Divider / Title for Groups --- */}
         <motion.div
            variants={cardVariants} // Use card variants for entrance
            className="md:col-span-2 lg:col-span-3 mt-6 mb-0 flex items-center gap-3"
         >
            <div className="w-8 h-8 rounded-lg bg-neutral-700/50 border border-neutral-700 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-neutral-300" />
            </div>
            <h2 className="text-xl font-semibold font-serif text-foreground">
                Fokus Grup Kreatif Kami
            </h2>
        </motion.div>

        {/* --- Community Group Cards --- */}
        {communityGroups.map((group) => {
          const accent = getAccentStyle(group.accent);
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              variants={cardVariants}
              whileHover={cardHover}
              // Adjusting grid span: 2 groups per row on md+, 3 groups per row on lg+ might be too tight unless the grid has 4 columns
              // Assuming 3 columns on lg: span 1, last one might span more or leave empty space. For now, span 1.
              className={cn(
                "lg:col-span-1 p-5 rounded-3xl border relative overflow-hidden shadow-md flex flex-col", // flex-col
                "bg-secondary/60 backdrop-blur-md",
                accent.border,
                accent.shadow
              )}
            >
              <div className="relative z-10 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={cn("w-5 h-5 flex-shrink-0", accent.iconText)} />
                    <h3 className="text-base font-semibold font-serif text-foreground">
                       {group.title} {/* Removed "Edisi" */}
                    </h3>
                  </div>
                  <p className="font-sans text-[13px] text-foreground/70 leading-normal flex-grow">
                    {group.description}
                  </p>
              </div>
              <div className={cn("absolute -bottom-5 -left-5 w-20 h-20 rounded-full opacity-[0.08] blur-md", accent.bg.replace('/10','/80'))}></div>
            </motion.div>
          );
        })}

        {/* --- Quote Card --- */}
        <motion.div
          variants={cardVariants}
          whileHover={cardHover}
          // Span across columns for emphasis, adjust as needed for layout (e.g., 2 on md, 3 on lg)
          className={cn(
            "md:col-span-2 lg:col-span-3 p-6 rounded-3xl border relative overflow-hidden shadow-md flex flex-col justify-center items-center text-center",
            "bg-gradient-to-br from-secondary/60 to-secondary/70 backdrop-blur-md",
            "border-neutral-700/40 shadow-black/10"
          )}
        >
           <QuoteIcon className="absolute left-4 top-4 w-6 h-6 text-neutral-600 opacity-60" aria-hidden="true"/>
            <blockquote className="relative z-10 max-w-xl"> {/* Limit max width */}
              <p className="text-lg md:text-xl font-serif italic text-foreground/85 leading-relaxed mb-2">
                "{quote.text}"
              </p>
              <footer className="font-sans text-xs text-foreground/60">— {quote.author}</footer>
            </blockquote>
           <QuoteIcon className="absolute right-4 bottom-4 w-6 h-6 text-neutral-600 opacity-60 transform rotate-180" aria-hidden="true"/>
        </motion.div>

         {/* --- Closing Card --- */}
        <motion.div
          variants={cardVariants}
          whileHover={cardHover}
          className={cn(
            "md:col-span-2 lg:col-span-3 p-6 rounded-3xl border relative overflow-hidden shadow-md text-center", // Span full width
            "bg-secondary/60 backdrop-blur-md",
            "border-amethyst/40 shadow-amethyst/5" // Use primary accent color
          )}
        >
            <div className="relative z-10 space-y-3">
                <Sparkles className="w-6 h-6 text-amethyst mx-auto mb-2" />
                <p className="text-base text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                    {closing.text}
                </p>
                <p className="text-lg font-semibold font-serif text-foreground">
                    "{closing.emphasis}"
                </p>
                <p className="font-sans text-xs text-foreground/60 italic pt-1">— {closing.author}</p>
            </div>
             <div className={cn("absolute -top-10 -left-10 w-28 h-28 rounded-full opacity-[0.07] blur-lg bg-amethyst/80")}></div>
             <div className={cn("absolute -bottom-10 -right-10 w-28 h-28 rounded-full opacity-[0.07] blur-lg bg-amethyst/80")}></div>
        </motion.div>

      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
