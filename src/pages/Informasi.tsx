
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Info, Sparkles, Users, Target, Quote as QuoteIcon, ArrowRight, Instagram } from "lucide-react"; 
import React from "react";

/**
 * FILES/FOLDERS TO CHECK/ENSURE EXIST AND ARE CONFIGURED:
 * (Consistency Check - Assumed same as previous)
 *
 * 1.  `src/components/layouts/PageLayout.tsx`: Provides page structure, header, background.
 * 2.  `public/lovable-uploads/`: (CONFIRM THESE IMAGES EXIST)
 *     - `design.png`
 *     - `video.png`
 *     - `karyatulis.png`
 *     - `meme.png`
 * 3.  `src/index.css`: Defines CSS variables, fonts, base styles, Tailwind directives.
 * 4.  `tailwind.config.ts`: Defines accent colors, fonts, plugins.
 * 5.  `src/lib/utils.ts`: Provides the `cn` utility function.
 * 6.  `lucide-react` (dependency): Installed.
 * 7.  `framer-motion` (dependency): Installed.
 */

// --- Animation Variants (Refined for smoother feel) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }, // Slightly adjusted stagger
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 }, // Less dramatic entrance
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }, // Standard smooth ease
  },
};

const cardHover = {
  scale: 1.02, // Very subtle scale on hover
  boxShadow: "0px 10px 20px -8px rgba(0, 0, 0, 0.2)", // Softer shadow
  transition: { type: "spring", stiffness: 350, damping: 20 },
};

const textContentVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } }
};

const bulletVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 15, delay: 0.2 } }
};

// --- Data Sections (Updated communityGroups with imageSrc) ---
const infoSections = [
  {
    id: "about",
    title: "Tentang Kami",
    icon: Info,
    accent: "lavender",
    content: [
      "Komunitas kreatif sejak 2024, bertujuan memberi manfaat.",
      "Misi kami: mencetak talenta kreatif muda Indonesia.",
      "Wadah bertanya & belajar untuk kembangkan kreativitas.",
      "Anggota bisa bertanya, belajar, sekaligus berkarya.",
    ],
  },
  {
    id: "vision",
    title: "Visi Komunitas",
    icon: Target,
    accent: "mint",
    content: [
      "Mengembangkan jiwa kreatif anak muda Indonesia.",
      "Wadah diskusi, kolaborasi, & penghasil karya.",
      "Membantu mengasah bakat tulis, desain, & video editing.",
      "Memberi kesempatan publikasi karya agar dikenal luas.",
    ],
  },
  {
    id: "mission",
    title: "Misi Kami",
    icon: Sparkles,
    accent: "peach",
    content: [
      "Menghubungkan talenta muda via media sosial.",
      "Menyediakan platform diskusi & kolaborasi.",
      "Mempublikasikan karya anggota untuk apresiasi.",
      "Menyelenggarakan program gratis (diskusi, event, dll).",
      "Mendorong penguasaan bidang kreatif.",
    ],
  }
];

const communityGroups = [
  {
    title: "Desain Grafis",
    imageSrc: "/lovable-uploads/design.png", // Replaced icon with imageSrc
    description: "Fokus pengembangan skill desain visual digital & cetak.",
    accent: "amethyst"
  },
  {
    title: "Video Editing",
    imageSrc: "/lovable-uploads/video.png", // Replaced icon with imageSrc
    description: "Belajar & berkarya dalam editing & produksi video kreatif.",
    accent: "coral"
  },
  {
    title: "Meme Creator",
    imageSrc: "/lovable-uploads/meme.png", // Replaced icon with imageSrc
    description: "Mengembangkan konten kreatif & meme untuk media sosial.",
    accent: "emerald"
  },
  {
    title: "Karya Tulis",
    imageSrc: "/lovable-uploads/karyatulis.png", // Replaced icon with imageSrc
    description: "Menulis & mengembangkan konten tertulis kreatif & bermanfaat.",
    accent: "softPink"
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

// --- Accent Color Mapping (No changes needed) ---
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
      title="Informasi Komunitas"
      subtitle="Tujuan, visi, misi, dan fokus grup kreatif di OurCreativity"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative z-10 pb-12" // Added padding bottom
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
                 "p-6 rounded-3xl border relative overflow-hidden shadow-lg", // Increased padding slightly
                 "bg-secondary/70 backdrop-blur-xl", // Slightly more opaque bg
                 accent.border,
                 accent.shadow
               )}
             >
               {/* Use motion for inner content animation */}
               <motion.div
                  variants={textContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3.5 mb-4"> {/* Slightly more gap */}
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", accent.bg)}> {/* Icon background */}
                        <Icon className={cn("w-4 h-4", accent.iconText)} />
                    </div>
                    <h2 className="text-lg font-semibold font-serif text-foreground tracking-tight"> {/* Tracking tight */}
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-2.5 font-sans text-[13.5px] text-foreground/80 leading-relaxed list-none pl-1"> {/* Adjusted text size & leading */}
                     {section.content.map((item, index) => (
                       <motion.li
                          key={index}
                          className="relative pl-5" // Increased padding for bullet
                          initial="hidden"
                          animate="visible"
                          custom={index} // Pass index for stagger animation if needed on list items
                          variants={{
                             hidden: { opacity: 0, x: -10 },
                             visible: { opacity: 1, x: 0, transition: { delay: 0.2 + index * 0.05 } }
                          }}
                        >
                           <motion.span
                              variants={bulletVariants}
                              className={cn(
                                "absolute left-0 top-[0.45em] w-2 h-2 rounded-full", // Slightly larger bullet
                                accent.bg.replace('/10', '/80') // Use accent bg for bullet
                              )}
                            />
                           {item}
                       </motion.li>
                     ))}
                  </ul>
               </motion.div>
               <div className={cn("absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-[0.08] blur-lg", accent.bg.replace('/10','/80'))}></div>
             </motion.div>
            );
        })}

        {/* --- Divider / Title for Groups --- */}
         <motion.div
            variants={cardVariants} // Use card variants for entrance
            className="md:col-span-2 lg:col-span-3 mt-8 mb-2 flex items-center gap-3" // Adjusted margin
         >
            <div className="w-8 h-8 rounded-lg bg-neutral-700/50 border border-neutral-700 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-neutral-300" />
            </div>
            <h2 className="text-xl font-semibold font-serif text-foreground tracking-tight">
                Fokus Grup Kreatif Kami
            </h2>
        </motion.div>

        {/* --- Community Group Cards --- */}
        {communityGroups.map((group) => {
          const accent = getAccentStyle(group.accent);
          // Removed Icon definition as we use imageSrc now
          return (
            <motion.div
              key={group.title}
              variants={cardVariants}
              whileHover={cardHover}
              className={cn(
                "lg:col-span-1 p-5 rounded-3xl border relative overflow-hidden shadow-lg flex flex-col",
                "bg-secondary/70 backdrop-blur-xl",
                accent.border,
                accent.shadow
              )}
            >
              {/* Use motion for inner content animation */}
              <motion.div
                  variants={textContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative z-10 flex-grow flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {/* Use img tag for imageSrc */}
                    <img
                        src={group.imageSrc}
                        alt={`${group.title} Icon`}
                        className="w-10 h-10 object-contain flex-shrink-0 bg-black/10 rounded-lg p-1" // Added bg and padding
                        loading="lazy" // Lazy load images
                      />
                    <h3 className="text-base font-semibold font-serif text-foreground tracking-tight">
                       {group.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-foreground/75 leading-relaxed flex-grow"> {/* Adjusted text style */}
                    {group.description}
                  </p>
              </motion.div>
              <div className={cn("absolute -bottom-5 -left-5 w-20 h-20 rounded-full opacity-[0.09] blur-md", accent.bg.replace('/10','/80'))}></div>
            </motion.div>
          );
        })}

        {/* --- Quote Card --- */}
        <motion.div
          variants={cardVariants}
          whileHover={cardHover}
          className={cn(
            "md:col-span-2 lg:col-span-3 mt-4 p-8 rounded-3xl border relative overflow-hidden shadow-xl flex flex-col justify-center items-center text-center", // Added shadow-xl
            "bg-gradient-to-br from-secondary/70 to-secondary/80 backdrop-blur-xl",
            "border-neutral-700/50" // Slightly stronger border
          )}
        >
           <QuoteIcon className="absolute left-4 top-4 w-8 h-8 text-neutral-600 opacity-50" aria-hidden="true"/>
            {/* Use motion for inner content animation */}
            <motion.blockquote
                variants={textContentVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-xl"
             >
              <p className="text-lg md:text-xl font-serif italic text-foreground/90 leading-relaxed mb-3"> {/* Increased line height */}
                "{quote.text}"
              </p>
              <footer className="font-sans text-[13px] text-foreground/60">— {quote.author}</footer>
            </motion.blockquote>
           <QuoteIcon className="absolute right-4 bottom-4 w-8 h-8 text-neutral-600 opacity-50 transform rotate-180" aria-hidden="true"/>
        </motion.div>

         {/* --- Closing Card --- */}
        <motion.div
          variants={cardVariants}
          whileHover={cardHover}
          className={cn(
            "md:col-span-2 lg:col-span-3 p-8 rounded-3xl border relative overflow-hidden shadow-xl text-center", // Added shadow-xl
            "bg-secondary/70 backdrop-blur-xl",
            "border-amethyst/50 shadow-amethyst/10" // Slightly stronger border/shadow
          )}
        >
             {/* Use motion for inner content animation */}
            <motion.div
                variants={textContentVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 space-y-4" // Increased spacing
            >
                <Sparkles className="w-7 h-7 text-amethyst mx-auto mb-1" /> {/* Slightly larger icon */}
                <p className="text-base text-foreground/85 max-w-2xl mx-auto leading-relaxed"> {/* Adjusted opacity/leading */}
                    {closing.text}
                </p>
                {/* Added subtle glow animation to emphasis text */}
                <motion.p
                    className="text-lg font-semibold font-serif text-foreground"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1, textShadow: "0 0 8px rgba(155,109,255,0.4)" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                 >
                    "{closing.emphasis}"
                </motion.p>
                <p className="font-sans text-[13px] text-foreground/60 italic pt-1">— {closing.author}</p>
            </motion.div>
             <div className={cn("absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-[0.08] blur-xl bg-amethyst/80")}></div>
             <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-[0.08] blur-xl bg-amethyst/80")}></div>
        </motion.div>

        {/* --- Call to Action Card (Ditambahkan dari halaman Pengumuman) --- */}
        <motion.section
          variants={cardVariants}
          whileHover={cardHover}
          className={cn(
            "md:col-span-2 lg:col-span-3 rounded-3xl border relative overflow-hidden shadow-xl p-6 md:p-8 text-center mt-4",
            "bg-gradient-to-tr from-secondary/70 to-secondary/80 backdrop-blur-xl",
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

      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
