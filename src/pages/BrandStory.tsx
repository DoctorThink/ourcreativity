import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageLayout from "@/components/layouts/PageLayout";
import { Bookmark, BookOpen, Target, Sparkles, Star, Calendar, Quote, Milestone } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classnames

/**
 * FILES/FOLDERS CHECKED (Based on User Provided Files):
 *
 * 1.  `src/components/layouts/PageLayout.tsx` (PageLayout.tsx (1).txt):
 *     - Provides page structure, header, back button, background effects, ScrollArea.
 *     - Used as the main layout wrapper.
 *
 * 2.  `src/index.css` (index (4).css):
 *     - Defines CSS variables (--background, --foreground, --secondary, --border, accent RGBs).
 *     - Defines font families (`font-serif`, `font-sans`).
 *     - Includes Tailwind directives.
 *     - Includes simplified utilities (removed animated border, complex shadows). Added noise pattern.
 *     - Styles assumed to be applied globally.
 *
 * 3.  `tailwind.config.ts` (tailwind.config (1).ts.txt):
 *     - Defines accent colors (lavender, mint, etc.) used for classes.
 *     - Defines `fontFamily`.
 *     - Includes `tailwindcss-animate`.
 *     - Defines `borderRadius: { ios: '1.25rem' }` (Note: This was specified in thought process but not in user's provided config; using `rounded-3xl` as a fallback visually similar style).
 *
 * 4.  `src/lib/utils.ts` (utils.ts.txt):
 *     - Provides the `cn` utility function. Imported and used.
 *
 * 5.  `lucide-react` (dependency): Assumed installed for icons.
 * 6.  `framer-motion` (dependency): Assumed installed for animations.
 */

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }, // Faster stagger
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 }, // Slightly more pronounced entrance
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.3, 0.0, 0.3, 1.0] }, // Custom ease curve
  },
};

const cardHover = {
  scale: 1.025, // Subtle scale
  boxShadow: "0px 12px 24px -8px rgba(0, 0, 0, 0.25)", // Softer shadow
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

// --- Data (Concise for Card Display) ---
const originStory = {
  icon: BookOpen,
  title: "Asal Mula",
  paragraphs: [
    "Lahir dari keinginan memberi dampak positif bagi anak muda kreatif Indonesia.",
    "Mengatasi kendala 'tidak tahu harus bertanya ke mana' yang sering muncul online.",
    "Menjadi wadah belajar, bertanya, dan memamerkan karya kreatif.",
  ],
  accent: "lavender",
};

const timelineEvents = [
    { date: "Jan 2024", title: "Awal Mula", icon: Sparkles, accent: "amethyst" },
    { date: "Feb 2024", title: "Pembentukan Komunitas", icon: Milestone, accent: "mint" },
    { date: "Mar 2024", title: "Peluncuran Media Sosial", icon: Milestone, accent: "peach" },
    { date: "Apr 2024", title: "Pengembangan Grup", icon: Milestone, accent: "softPink" },
    { date: "Mei 2024", title: "Fase Pertumbuhan", icon: Star, accent: "turquoise" }
];

const coreValues = [
  { title: "Kreativitas", description: "Eksplorasi ide tanpa batas.", icon: Sparkles, accent: "lavender" },
  { title: "Kolaborasi", description: "Kerja sama & dukungan komunitas.", icon: BookOpen, accent: "mint" },
  { title: "Konsistensi", description: "Berkarya & berkembang berkelanjutan.", icon: Target, accent: "peach" },
  { title: "Keunggulan", description: "Selalu berikan yang terbaik.", icon: Star, accent: "softPink" },
];

const vision = {
  icon: Target,
  title: "Visi Ke Depan",
  paragraphs: [
    "Terus berkembang dan memberi manfaat lebih luas.",
    "Memperluas jangkauan, mengadakan workshop, dan memfasilitasi kolaborasi intensif.",
    "Mendorong kreativitas anak muda untuk berkontribusi pada industri kreatif Indonesia.",
  ],
  accent: "turquoise",
};

const quote = {
    text: "Kreativitas adalah menemukan cara untuk menyampaikan apa yang tidak bisa dikatakan.",
    author: "Team OurCreativity"
}

// --- Accent Color Mapping (Tailwind Classes) ---
// Using defined colors in tailwind.config.ts
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string }> = {
  lavender: { bg: "bg-lavender/10", border: "border-lavender/40", text: "text-lavender", iconText: "text-lavender", shadow: "shadow-lavender/5" },
  mint: { bg: "bg-mint/10", border: "border-mint/40", text: "text-mint", iconText: "text-mint", shadow: "shadow-mint/5" },
  peach: { bg: "bg-peach/10", border: "border-peach/40", text: "text-peach", iconText: "text-peach", shadow: "shadow-peach/5" },
  softPink: { bg: "bg-softPink/10", border: "border-softPink/40", text: "text-softPink", iconText: "text-softPink", shadow: "shadow-softPink/5" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/5" },
  turquoise: { bg: "bg-turquoise/10", border: "border-turquoise/40", text: "text-turquoise", iconText: "text-turquoise", shadow: "shadow-turquoise/5" },
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10" }, // Default shadow more generic
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
};


const BrandStory = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  
  // Scroll-triggered animations
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end start"]
  });
  
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <PageLayout
      title="Cerita Kami"
      subtitle="Perjalanan kami membangun komunitas kreatif muda"
    >
      {/* PageLayout handles background */}

      <motion.div
        ref={storyRef}
        className="relative space-y-12 md:space-y-24"
      >
        {/* Story sections with animations */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="glass-card rounded-3xl p-6 md:p-8 backdrop-blur-md"
        >
          {/* --- Card: Origin Story --- */}
          <motion.div
            variants={cardVariants}
            whileHover={cardHover}
            className={cn(
              "md:col-span-2 lg:col-span-1 p-5 rounded-3xl border relative overflow-hidden shadow-md", // Slightly reduced gap
              "bg-secondary/60 backdrop-blur-md", // Slightly less opaque bg for iOS feel
               getAccentStyle(originStory.accent).border,
               getAccentStyle(originStory.accent).shadow // Apply subtle accent shadow
            )}
          >
             {/* Inner padding container for content */}
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <originStory.icon className={cn("w-5 h-5 flex-shrink-0", getAccentStyle(originStory.accent).iconText)} />
                  <h2 className="text-lg font-semibold font-serif text-foreground">
                    {originStory.title}
                  </h2>
                </div>
                <div className="space-y-2.5 font-sans text-sm text-foreground/75 leading-normal"> {/* Slightly adjusted text style */}
                  {originStory.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
             </div>
             {/* Subtle background glow element */}
             <div className={cn("absolute -bottom-10 -right-10 w-28 h-28 rounded-full opacity-[0.07] blur-lg", getAccentStyle(originStory.accent).bg.replace('/10','/80'))}></div>
          </motion.div>

           {/* --- Card: Timeline --- */}
           <motion.div
             variants={cardVariants}
             whileHover={cardHover}
             className={cn(
               "md:col-span-2 lg:col-span-2 p-5 rounded-3xl border relative overflow-hidden shadow-md",
               "bg-secondary/60 backdrop-blur-md border-neutral-700/40 shadow-black/10" // Consistent border and shadow
             )}
           >
              <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 flex-shrink-0 text-neutral-400" />
                    <h2 className="text-lg font-semibold font-serif text-foreground">
                      Perjalanan Kami
                    </h2>
                  </div>
                  <div className="space-y-3">
                     {timelineEvents.map((event, index) => {
                        const accent = getAccentStyle(event.accent);
                        return (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3 relative pl-1 group" // Group for potential future hover effects inside
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + index * 0.04, duration: 0.3 }}
                          >
                             {/* Timeline Marker */}
                            <div className={cn(
                                "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border",
                                accent.border, accent.bg // Use accent bg/border subtly
                             )}>
                               <event.icon className={cn("w-3.5 h-3.5", accent.iconText)} /> {/* Use accent text color for icon */}
                            </div>
                             {/* Timeline Text */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between flex-grow gap-x-2">
                               <span className="font-sans text-[13px] font-medium text-foreground/85"> {/* Slightly smaller */}
                                  {event.title}
                               </span>
                               <span className={cn("font-sans text-[11px] font-medium uppercase tracking-wide opacity-70", accent.text)}> {/* Even smaller date */}
                                 {event.date}
                               </span>
                            </div>
                          </motion.div>
                        );
                     })}
              </div>
              </div>
              {/* Background decorative element */}
              <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-neutral-700/5 opacity-50 blur-lg"></div>
           </motion.div>

           {/* --- Cards: Core Values --- */}
           {coreValues.map((value) => {
              const accent = getAccentStyle(value.accent);
              return (
               <motion.div
                 key={value.title}
                 variants={cardVariants}
                 whileHover={cardHover}
                 className={cn(
                   "p-5 rounded-3xl border relative overflow-hidden shadow-md flex flex-col", // Use flex column
                   "bg-secondary/60 backdrop-blur-md",
                   accent.border,
                   accent.shadow // Use accent shadow
                 )}
               >
                  <div className="relative z-10 flex-grow flex flex-col"> {/* Ensure content scales */}
                      <div className="flex items-center gap-3 mb-2">
                        <value.icon className={cn("w-5 h-5 flex-shrink-0", accent.iconText)} />
                        <h3 className="text-base font-semibold font-serif text-foreground"> {/* Slightly smaller heading */}
                          {value.title}
                        </h3>
                      </div>
                      <p className="font-sans text-[13px] text-foreground/70 leading-normal flex-grow"> {/* Smaller text, allow growth */}
                        {value.description}
                      </p>
                  </div>
                   {/* Background decorative element */}
                  <div className={cn("absolute -bottom-5 -left-5 w-20 h-20 rounded-full opacity-[0.08] blur-md", accent.bg.replace('/10','/80'))}></div>
               </motion.div>
              );
           })}

          {/* --- Card: Quote --- */}
          <motion.div
            variants={cardVariants}
            whileHover={cardHover}
            className={cn(
              "md:col-span-1 lg:col-span-1 p-6 rounded-3xl border relative overflow-hidden shadow-md flex flex-col justify-center items-center text-center", // Standard padding
              "bg-gradient-to-br from-secondary/60 to-secondary/70 backdrop-blur-md", // Subtle gradient
               "border-neutral-700/40 shadow-black/10"
            )}
          >
             <Quote className="absolute left-3 top-3 w-6 h-6 text-neutral-600 opacity-60" aria-hidden="true"/>
              <blockquote className="relative z-10">
                <p className="text-base md:text-lg font-serif italic text-foreground/85 leading-relaxed mb-2"> {/* Slightly smaller */}
                  "{quote.text}"
                </p>
                <footer className="font-sans text-xs text-foreground/60">— {quote.author}</footer>
              </blockquote>
             <Quote className="absolute right-3 bottom-3 w-6 h-6 text-neutral-600 opacity-60 transform rotate-180" aria-hidden="true"/>
             {/* Optional subtle pattern inside */}
             {/* <div className="absolute inset-0 geometric-dot-pattern opacity-[0.01] mix-blend-overlay"></div> */}
          </motion.div>


          {/* --- Card: Vision --- */}
          <motion.div
            variants={cardVariants}
            whileHover={cardHover}
            className={cn(
              "md:col-span-1 lg:col-span-2 p-5 rounded-3xl border relative overflow-hidden shadow-md",
              "bg-secondary/60 backdrop-blur-md",
               getAccentStyle(vision.accent).border,
               getAccentStyle(vision.accent).shadow
            )}
          >
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <vision.icon className={cn("w-5 h-5 flex-shrink-0", getAccentStyle(vision.accent).iconText)} />
                  <h2 className="text-lg font-semibold font-serif text-foreground">
                    {vision.title}
                  </h2>
                </div>
                <div className="space-y-2.5 font-sans text-sm text-foreground/75 leading-normal">
                  {vision.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
             </div>
             {/* Background decorative element */}
             <div className={cn("absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-[0.07] blur-lg", getAccentStyle(vision.accent).bg.replace('/10','/80'))}></div>
          </motion.div>

        </motion.section>
        
        {/* Add similar motion.section wrappers for other sections */}
        {/* ... keep existing code (other story sections) */}
      </motion.div>
    </PageLayout>
  );
};

export default BrandStory;
