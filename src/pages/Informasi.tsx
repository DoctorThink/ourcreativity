// --- START OF FILE Informasi.tsx ---

import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { Info, Sparkles, Users, Target, Quote as QuoteIcon, ArrowRight, Instagram, MessageCircle, Link as LinkIcon } from "lucide-react"; // Added MessageCircle, LinkIcon
import React from "react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
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

const textContentVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } }
};

const bulletVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 15, delay: 0.2 } }
};

// --- Data Sections ---
const infoSections = [
  { id: "about", title: "Tentang Kami", icon: Info, accent: "lavender", content: ["Komunitas kreatif sejak 2024, bertujuan memberi manfaat.", "Misi kami: mencetak talenta kreatif muda Indonesia.", "Wadah bertanya & belajar untuk kembangkan kreativitas.", "Anggota bisa bertanya, belajar, sekaligus berkarya."] },
  { id: "vision", title: "Visi Komunitas", icon: Target, accent: "mint", content: ["Mengembangkan jiwa kreatif anak muda Indonesia.", "Wadah diskusi, kolaborasi, & penghasil karya.", "Membantu mengasah bakat tulis, desain, & video editing.", "Memberi kesempatan publikasi karya agar dikenal luas."] },
  { id: "mission", title: "Misi Kami", icon: Sparkles, accent: "peach", content: ["Menghubungkan talenta muda via media sosial.", "Menyediakan platform diskusi & kolaborasi.", "Mempublikasikan karya anggota untuk apresiasi.", "Menyelenggarakan program gratis (diskusi, event, dll).", "Mendorong penguasaan bidang kreatif."] }
];

const communityGroups = [
  { title: "Desain Grafis", imageSrc: "/lovable-uploads/design.png", description: "Fokus pengembangan skill desain visual digital & cetak.", accent: "amethyst" },
  { title: "Video Editing", imageSrc: "/lovable-uploads/video.png", description: "Belajar & berkarya dalam editing & produksi video kreatif.", accent: "coral" },
  { title: "Meme Creator", imageSrc: "/lovable-uploads/meme.png", description: "Mengembangkan konten kreatif & meme untuk media sosial.", accent: "emerald" },
  { title: "Karya Tulis", imageSrc: "/lovable-uploads/karyatulis.png", description: "Menulis & mengembangkan konten tertulis kreatif & bermanfaat.", accent: "softPink" }
];

const quote = { text: "Tanpa keberanian seseorang tidak akan pernah berkarya dan tidak akan berkembang.", author: "OurCreativity" };
const closing = { text: "Bergabunglah dengan OurCreativity dan jadilah bagian dari pergerakan kreatif anak muda Indonesia.", emphasis: "Berkarya tanpa batas dengan OurCreativity", author: "Admin" };

// --- WhatsApp Group Data ---
const whatsappGroups = [
    { name: "O.C Kartul", url: "https://chat.whatsapp.com/CHTz0dzUQq9K3XGfRknYim", color: "text-gray-400" }, // Using a standard gray
    { name: "O.C Community", url: "https://chat.whatsapp.com/KAp4AjCxmVYCGF504eykaG", color: "text-emerald" }, // Correct link? Using distinct color
    { name: "O.C Meme", url: "https://chat.whatsapp.com/BVTsqKqYa9UL2CykAsMmJZ", color: "text-coral" },
];
const whatsappNote = "Beberapa grup butuh pengisian form untuk menyaring anggota, silakan isi form untuk di accept.";

// --- Accent Color Mapping ---
// Make sure these class names match your tailwind.config.ts
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string }> = {
  lavender: { bg: "bg-lavender/10", border: "border-lavender/40", text: "text-lavender", iconText: "text-lavender", shadow: "shadow-lavender/5" },
  mint: { bg: "bg-mint/10", border: "border-mint/40", text: "text-mint", iconText: "text-mint", shadow: "shadow-mint/5" },
  peach: { bg: "bg-peach/10", border: "border-peach/40", text: "text-peach", iconText: "text-peach", shadow: "shadow-peach/5" },
  softPink: { bg: "bg-softPink/10", border: "border-softPink/40", text: "text-softPink", iconText: "text-softPink", shadow: "shadow-softPink/5" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/5" },
  coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/5" },
  emerald: { bg: "bg-emerald/10", border: "border-emerald/40", text: "text-emerald", iconText: "text-emerald", shadow: "shadow-emerald/5" },
  // Adding fallbacks for potential group colors if not fully defined above
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/40", text: "text-blue-400", iconText: "text-blue-400", shadow: "shadow-blue-500/5" },
  gray: { bg: "bg-gray-500/10", border: "border-gray-500/40", text: "text-gray-400", iconText: "text-gray-400", shadow: "shadow-gray-500/5" },
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
};


// --- Main Component ---
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
                 "p-6 rounded-3xl border relative overflow-hidden shadow-lg",
                 "bg-secondary/70 backdrop-blur-xl",
                 accent.border,
                 accent.shadow
               )}
             >
               <motion.div
                  variants={textContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", accent.bg)}>
                        <Icon className={cn("w-4 h-4", accent.iconText)} />
                    </div>
                    <h2 className="text-lg font-semibold font-serif text-foreground tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-2.5 font-sans text-[13.5px] text-foreground/80 leading-relaxed list-none pl-1">
                     {section.content.map((item, index) => (
                       <motion.li
                          key={index}
                          className="relative pl-5"
                          initial="hidden"
                          animate="visible"
                          custom={index}
                          variants={{
                             hidden: { opacity: 0, x: -10 },
                             visible: { opacity: 1, x: 0, transition: { delay: 0.2 + index * 0.05 } }
                          }}
                        >
                           <motion.span
                              variants={bulletVariants}
                              className={cn(
                                "absolute left-0 top-[0.45em] w-2 h-2 rounded-full",
                                accent.bg.replace('/10', '/80')
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
            variants={cardVariants}
            className="md:col-span-2 lg:col-span-3 mt-8 mb-2 flex items-center gap-3"
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
              <motion.div
                  variants={textContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative z-10 flex-grow flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                        src={group.imageSrc}
                        alt={`${group.title} Icon`}
                        className="w-10 h-10 object-contain flex-shrink-0 bg-black/10 rounded-lg p-1"
                        loading="lazy"
                      />
                    <h3 className="text-base font-semibold font-serif text-foreground tracking-tight">
                       {group.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-foreground/75 leading-relaxed flex-grow">
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
            "md:col-span-2 lg:col-span-3 mt-4 p-8 rounded-3xl border relative overflow-hidden shadow-xl flex flex-col justify-center items-center text-center",
            "bg-gradient-to-br from-secondary/70 to-secondary/80 backdrop-blur-xl",
            "border-neutral-700/50"
          )}
        >
           <QuoteIcon className="absolute left-4 top-4 w-8 h-8 text-neutral-600 opacity-50" aria-hidden="true"/>
            <motion.blockquote
                variants={textContentVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-xl"
             >
              <p className="text-lg md:text-xl font-serif italic text-foreground/90 leading-relaxed mb-3">
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
            "md:col-span-2 lg:col-span-3 p-8 rounded-3xl border relative overflow-hidden shadow-xl text-center",
            "bg-secondary/70 backdrop-blur-xl",
            "border-amethyst/50 shadow-amethyst/10"
          )}
        >
            <motion.div
                variants={textContentVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 space-y-4"
            >
                <Sparkles className="w-7 h-7 text-amethyst mx-auto mb-1" />
                <p className="text-base text-foreground/85 max-w-2xl mx-auto leading-relaxed">
                    {closing.text}
                </p>
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

        {/* --- NEW: Enhanced Join Us Card with Animations --- */}
        <motion.section
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className={cn(
            "md:col-span-2 lg:col-span-3 rounded-3xl border relative overflow-hidden shadow-2xl mt-4",
            "bg-gradient-to-tr from-secondary/70 via-secondary/60 to-secondary/80 backdrop-blur-xl",
            "border-amethyst/40"
          )}
          style={{
            boxShadow: "0 0 30px rgba(155, 109, 255, 0.15), 0 15px 35px rgba(0, 0, 0, 0.2)"
          }}
        >
            {/* Card Content Container */}
            <motion.div
                variants={textContentVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 p-6 md:p-8"
            >
                 {/* Card Title with Animated Glow */}
                <motion.div
                    initial={{ opacity: 0.9 }}
                    animate={{ 
                        opacity: 1,
                        textShadow: ["0 0 8px rgba(155,109,255,0.3)", "0 0 20px rgba(155,109,255,0.5)", "0 0 8px rgba(155,109,255,0.3)"]
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        ease: "easeInOut" 
                    }}
                    className="flex items-center justify-center gap-3 mb-8 text-center"
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amethyst/30 to-amethyst/10 border border-amethyst/40 flex items-center justify-center shadow-lg">
                        <motion.div
                            animate={{ 
                                rotate: [0, 5, 0, -5, 0],
                                scale: [1, 1.1, 1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Users className="w-6 h-6 text-amethyst" />
                        </motion.div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold font-serif text-foreground">
                        Bergabung dengan Komunitas Kami
                    </h3>
                </motion.div>

                {/* Introduction Text with Animation */}
                <motion.p 
                    className="text-base md:text-lg text-neutral-200 text-center max-w-xl mx-auto leading-relaxed mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Terhubung dengan <span className="text-amethyst font-semibold">3000+ kreator muda</span>! Pilih cara bergabung yang paling cocok untukmu di bawah ini.
                </motion.p>

                {/* Animated Decorative Elements */}
                <motion.div 
                    className="absolute top-10 right-10 w-16 h-16 rounded-full bg-mint/20 opacity-40 blur-md pointer-events-none"
                    animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ 
                        duration: 7, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                    }}
                />
                <motion.div 
                    className="absolute bottom-40 left-20 w-20 h-20 rounded-full bg-coral/20 opacity-40 blur-md pointer-events-none"
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1 
                    }}
                />

                {/* Linktree Option (Primary) with Enhanced Animation */}
                <div className="text-center mb-10 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="relative z-10"
                    >
                        <p className="text-sm text-amethyst mb-4">Lihat semua platform & media sosial kami:</p>
                        <motion.button
                            onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
                            className={cn(
                                "relative inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium transition-all duration-300",
                                "bg-gradient-to-r from-amethyst via-amethyst/90 to-amethyst text-white hover:shadow-lg", 
                                "group overflow-hidden"
                            )}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 0 25px rgba(155, 109, 255, 0.5)"
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Button Glow Effects */}
                            <span className="absolute inset-0 bg-gradient-to-r from-amethyst/0 via-white/20 to-amethyst/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                            
                            <LinkIcon className="mr-2 w-5 h-5"/>
                            Kunjungi Linktree Kami
                            <motion.div
                                className="ml-2 inline-flex items-center"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut" 
                                }}
                            >
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                    
                    {/* Button Background Glow Effect */}
                    <motion.div 
                        className="absolute inset-0 bg-amethyst/20 rounded-full blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0.4, 0.8, 0.4],
                            scale: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* WhatsApp Groups Section with Floating Animation */}
                <motion.div 
                    className="border-t border-neutral-700/50 pt-8 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <p className="text-sm text-neutral-300 mb-6 text-center">Atau gabung langsung ke grup diskusi spesifik:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                         {whatsappGroups.map((group, index) => (
                            <motion.a
                                key={group.name}
                                href={group.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                                    "bg-secondary/90 border-neutral-700/60 hover:border-neutral-500",
                                    "backdrop-blur-md relative overflow-hidden"
                                )}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                                whileHover={{ 
                                    y: -5, 
                                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                                    borderColor: "rgba(155, 109, 255, 0.5)"
                                }}
                             >
                                {/* Button Glow Effect */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></span>
                                
                                {/* Content */}
                                <MessageCircle className={cn("w-5 h-5 flex-shrink-0", group.color)} />
                                <span className="text-sm font-medium text-neutral-200">{group.name}</span>
                                <ArrowRight className="ml-auto w-4 h-4 text-neutral-500" />
                             </motion.a>
                         ))}
                    </div>
                     
                     {/* Important Note with Icon Animation */}
                     <motion.p 
                        className="text-xs text-neutral-400 mt-6 text-center px-4 flex items-center justify-center gap-1.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                     >
                        <motion.div
                            animate={{ 
                                rotate: [0, 20, 0, -20, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1]
                            }}
                        >
                            <Info size={12} className="inline align-middle text-amethyst"/>
                        </motion.div>
                        {whatsappNote}
                    </motion.p>
                </motion.div>

            </motion.div>
            
            {/* Backdrop Decorative Elements */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-tr from-amethyst/10 to-mint/5 opacity-60 blur-3xl pointer-events-none"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-br from-coral/10 to-softPink/5 opacity-40 blur-3xl pointer-events-none"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 noise-pattern opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        </motion.section>

      </motion.div>
    </PageLayout>
  );
};

export default Informasi;
