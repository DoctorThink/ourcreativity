import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout"; // Assuming PageLayout provides base structure/padding
import { Bookmark, BookOpen, Target, ExternalLink, Sparkles, Star, Calendar, Quote } from "lucide-react";
import { Separator } from "@/components/ui/separator"; // Keep using Shadcn components where appropriate

// Helper to map border color class to glow color name for animated border
const mapColorToGlow = (colorClass: string): string => {
  if (colorClass.includes("lavender")) return "lavender";
  if (colorClass.includes("mint")) return "mint";
  if (colorClass.includes("peach")) return "peach";
  if (colorClass.includes("softPink")) return "softPink";
  if (colorClass.includes("turquoise")) return "turquoise"; // Added just in case
  if (colorClass.includes("amethyst")) return "lavender"; // Map amethyst to lavender glow
  return "default"; // Fallback to default white/grey glow
};

// Define accent colors directly for easier use (ensure these are in tailwind.config.js)
const accentColors = {
  lavender: { bg: 'bg-lavender', text: 'text-background', border: 'border-lavender' },
  mint: { bg: 'bg-mint', text: 'text-background', border: 'border-mint' },
  peach: { bg: 'bg-peach', text: 'text-background', border: 'border-peach' },
  softPink: { bg: 'bg-softPink', text: 'text-gray-800', border: 'border-softPink' }, // Pink might need darker text
  amethyst: { bg: 'bg-amethyst', text: 'text-background', border: 'border-amethyst' }, // Use amethyst color
  turquoise: { bg: 'bg-turquoise', text: 'text-background', border: 'border-turquoise' },
  default: { bg: 'bg-neutral-700', text: 'text-foreground', border: 'border-neutral-600' }
};

const BrandStory = () => {
  // --- Animation Variants (Consistent with Index.tsx) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Slightly faster stagger
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0] // Smoother ease
      }
    }
  };

  // --- Interactive Animations (Consistent with Index.tsx) ---
   const interactiveHover = {
     y: -4,
     scale: 1.03,
     boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)", // Slightly enhanced shadow
     transition: { type: "spring", stiffness: 300, damping: 15 }
   };

   const interactiveTap = {
     scale: 0.98,
     transition: { type: "spring", stiffness: 400, damping: 20 }
   };


  // --- Data ---
  const timelineEvents = [
    { date: "Januari 2024", title: "Awal Mula", description: "Visi untuk wadah kreatif muda Indonesia.", highlight: true, accent: "amethyst" },
    { date: "Februari 2024", title: "Pembentukan Komunitas", description: "Pengembangan struktur & platform komunikasi.", highlight: false, accent: "mint" },
    { date: "Maret 2024", title: "Peluncuran Media Sosial", description: "Menjangkau audiens via media sosial.", highlight: true, accent: "peach" },
    { date: "April 2024", title: "Pengembangan Grup", description: "Pembentukan 4 grup minat kreatif.", highlight: false, accent: "softPink" },
    { date: "Mei 2024", title: "Fase Pertumbuhan", description: "Mencapai 3000+ anggota & inisiatif kolaborasi.", highlight: true, accent: "turquoise" }
  ];

  const coreValues = [
    { title: "Kreativitas Tanpa Batas", description: "Mendorong eksplorasi ide & inovasi.", icon: Sparkles, accent: "lavender" },
    { title: "Kolaborasi & Komunitas", description: "Membangun hubungan kuat & dukungan.", icon: BookOpen, accent: "mint" },
    { title: "Konsistensi", description: "Berkomitmen untuk terus berkarya & berkembang.", icon: Target, accent: "peach" },
    { title: "Keunggulan", description: "Berusaha memberikan yang terbaik.", icon: Star, accent: "softPink" }
  ];

  // --- Helper Function to get Accent Style ---
  const getAccentStyle = (accentKey: keyof typeof accentColors | string) => {
      const key = accentKey as keyof typeof accentColors;
      return accentColors[key] || accentColors.default;
  };


  return (
    <PageLayout
      title="CERITA KAMI"
      subtitle="Perjalanan OurCreativity dalam menciptakan ruang bagi kreativitas anak muda Indonesia"
      showTitleAnimation={true} // Optional prop to enable gradient title if PageLayout supports it
    >
        {/* --- Animated Background Elements (like Index.tsx) --- */}
        {/* These should ideally be part of PageLayout if used on multiple pages */}
        {/* Replicated here for demonstration if PageLayout doesn't include them */}
        <div className="fixed inset-0 -z-20 opacity-90">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"></div>
            <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[120px] bg-amethyst/5 -top-[15%] -right-[15%] opacity-50"></div>
            <div className="absolute w-[45vw] h-[45vh] rounded-full blur-[100px] bg-turquoise/5 -bottom-[15%] -left-[15%] opacity-40"></div>
            <div className="absolute inset-0 noise-pattern opacity-[0.03]"></div>
            <div className="absolute inset-0 geometric-dot-pattern opacity-[0.04]"></div>
        </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16 md:space-y-20 relative z-10" // Increased spacing
      >
        {/* Section: Origin Story */}
        <motion.section
          variants={itemVariants}
          className="relative bg-secondary border border-neutral-800 rounded-2xl p-6 md:p-8 overflow-hidden shadow-xl"
        >
            <div className="absolute inset-0 geometric-line-pattern opacity-[0.03] mix-blend-soft-light"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-lavender/5 rounded-full blur-2xl opacity-60"></div>

            <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-700/50 border border-neutral-700 flex items-center justify-center shadow-inner">
                    <BookOpen className="w-5 h-5 text-lavender" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-shadow-sm">
                    Asal Mula
                  </h2>
                </div>

                <Separator className="bg-neutral-700/50" />

                <p className="text-foreground/80 leading-relaxed font-sans text-readable">
                  OurCreativityIDN lahir dari keinginan untuk memberikan dampak positif bagi perkembangan anak muda kreatif di Indonesia. Berawal dari pengamatan terhadap banyaknya komentar di internet tentang keinginan untuk mempelajari sesuatu namun tidak memiliki tempat untuk bertanya, kami memutuskan untuk membuat komunitas ini.
                </p>

                <p className="text-foreground/70 leading-relaxed font-sans text-readable">
                  Komunitas ini bukan hanya menjadi tempat untuk belajar dan bertanya, tetapi juga menjadi wadah untuk menampung karya-karya kreatif dari para anggota. Kami percaya bahwa setiap orang memiliki potensi kreatif yang perlu diasah dan diberi ruang untuk berkembang.
                </p>
            </div>
        </motion.section>

        {/* Section: Timeline */}
        <motion.section
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
             <div className="w-10 h-10 rounded-lg bg-neutral-700/50 border border-neutral-700 flex items-center justify-center shadow-inner">
                 <Calendar className="w-5 h-5 text-mint" />
              </div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-shadow-sm">
              Perjalanan Kami
            </h2>
          </div>

          <div className="relative pl-6 md:pl-8"> {/* Adjusted padding for line alignment */}
            {/* Vertical timeline line - Enhanced */}
            <div className="absolute h-full w-[2px] bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-800 left-4 top-1 z-0 rounded-full"></div>

            {/* Timeline events */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => {
                const accentStyle = getAccentStyle(event.accent);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4 md:gap-6 group"
                  >
                    {/* Timeline Marker */}
                     <div className={`absolute left-0 w-8 h-8 rounded-full ${event.highlight ? `${accentStyle.bg}/60 ${accentStyle.border}` : 'bg-neutral-800 border-neutral-700'} border-2 flex items-center justify-center z-10 shadow-md transition-all duration-300 group-hover:scale-110`}>
                         {event.highlight && (
                             <div className={`w-3 h-3 rounded-full ${accentStyle.bg} animate-pulse-soft shadow-lg ${accentStyle.bg}/50`} />
                         )}
                         {!event.highlight && (
                             <div className="w-2 h-2 rounded-full bg-neutral-600" />
                         )}
                    </div>

                    {/* Timeline Content Card */}
                    <motion.div
                       className="relative bg-secondary border border-neutral-800 rounded-xl p-4 md:p-5 flex-1 overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-xl"
                       whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
                    >
                       {/* Subtle Accent Gradient & Pattern */}
                       <div className={`absolute inset-0 bg-gradient-to-br from-${event.accent}/10 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                       <div className="absolute inset-0 geometric-dot-pattern opacity-[0.02] mix-blend-overlay"></div>

                       <div className="relative z-10">
                           <span className={`inline-block px-3 py-1 rounded-full ${accentStyle.bg}/20 ${accentStyle.text === 'text-background' ? 'text-white/80' : accentStyle.text+'/80'} text-xs font-sans font-medium mb-2 border ${accentStyle.border}/30`}>
                                {event.date}
                            </span>
                            <h3 className="text-md md:text-lg font-serif font-semibold text-foreground mb-1">
                                {event.title}
                            </h3>
                            <p className="text-foreground/70 text-sm font-sans text-readable">
                                {event.description}
                            </p>
                       </div>
                       {/* Shimmer effect on hover */}
                       <div className="absolute top-0 left-0 w-full h-full bg-shimmer-gradient opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Section: Core Values */}
        <motion.section
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
             <div className="w-10 h-10 rounded-lg bg-neutral-700/50 border border-neutral-700 flex items-center justify-center shadow-inner">
                 <Bookmark className="w-5 h-5 text-peach" />
             </div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-shadow-sm">
              Nilai-Nilai Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {coreValues.map((value, index) => {
              const accentStyle = getAccentStyle(value.accent);
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative" // Group for hover effects on wrapper
                  whileHover={interactiveHover}
                  whileTap={interactiveTap}
                >
                  {/* Animated Border */}
                   <div
                     className="animated-border-wrapper rounded-xl"
                     data-glow-color={mapColorToGlow(accentStyle.border)}
                   >
                     {/* Actual Content Card */}
                     <div className="relative z-10 bg-secondary p-5 md:p-6 rounded-xl overflow-hidden h-full flex items-start gap-4">
                       {/* Icon with Accent Background */}
                       <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg ${accentStyle.bg} flex items-center justify-center shadow-md border ${accentStyle.border}/50 transition-transform duration-300 group-hover:scale-105`}>
                           <Icon className={`w-5 h-5 md:w-6 md:h-6 ${accentStyle.text}`} />
                       </div>
                       {/* Text Content */}
                       <div className="flex-grow">
                          <h3 className="text-lg md:text-xl font-serif font-semibold text-foreground mb-1">
                            {value.title}
                          </h3>
                          <p className="text-foreground/70 font-sans text-sm text-readable">{value.description}</p>
                       </div>
                        {/* Subtle pattern inside card */}
                       <div className="absolute inset-0 topo-layer opacity-[0.02] mix-blend-luminosity"></div>
                     </div>
                   </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Section: Quote */}
        <motion.div
          variants={itemVariants}
          className="relative py-10 px-6 md:px-10 bg-secondary border border-neutral-800 rounded-2xl text-center overflow-hidden shadow-xl"
        >
           <div className="absolute inset-0 geometric-hexagon-pattern opacity-[0.03] mix-blend-soft-light"></div>
           <div className="absolute w-60 h-60 rounded-full bg-foreground/5 blur-[70px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-mint/5 rounded-full blur-xl opacity-60"></div>


          <blockquote className="relative z-10 max-w-3xl mx-auto">
            <Quote className="absolute left-0 -top-4 w-10 h-10 text-neutral-700 opacity-50 transform -translate-x-1/2" aria-hidden="true"/>
            <p className="text-xl md:text-2xl font-serif italic text-foreground/90 text-shadow-sm leading-relaxed">
              "Kreativitas adalah menemukan cara untuk menyampaikan apa yang tidak bisa dikatakan."
            </p>
            <footer className="text-foreground/50 mt-4 font-sans">— Team OurCreativity</footer>
             <Quote className="absolute right-0 -bottom-4 w-10 h-10 text-neutral-700 opacity-50 transform translate-x-1/2 rotate-180" aria-hidden="true"/>
          </blockquote>
        </motion.div>

        {/* Section: Future Vision */}
        <motion.section
          variants={itemVariants}
          className="relative bg-secondary border border-neutral-800 rounded-2xl p-6 md:p-8 overflow-hidden shadow-xl"
        >
             <div className="absolute inset-0 geometric-dot-pattern opacity-[0.03] mix-blend-soft-light"></div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-peach/5 rounded-full blur-2xl opacity-60"></div>

            <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-700/50 border border-neutral-700 flex items-center justify-center shadow-inner">
                        <Target className="w-5 h-5 text-turquoise" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-shadow-sm">
                        Visi Ke Depan
                    </h2>
                </div>

                <Separator className="bg-neutral-700/50" />

                <p className="text-foreground/80 leading-relaxed font-sans text-readable">
                  Ke depannya, OurCreativityIDN berkomitmen untuk terus berkembang dan memberikan manfaat lebih banyak bagi komunitas kreatif di Indonesia. Kami berencana untuk memperluas jangkauan, mengadakan workshop, serta memfasilitasi kolaborasi yang lebih intensif.
                </p>

                <p className="text-foreground/70 leading-relaxed font-sans text-readable">
                  Dengan membangun platform dan komunitas yang solid, kami bertujuan mendorong lebih banyak anak muda Indonesia untuk mengembangkan kreativitas mereka dan berkontribusi positif bagi industri kreatif tanah air.
                </p>

                {/* Replaced morphing blob with a simpler, styled emphasis box */}
                 <div className="mt-5 p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg text-center shadow-inner">
                   <p className="text-foreground/90 font-medium font-serif text-shadow-sm">
                     <span className="home-title !text-lg"> {/* Reuse home title gradient effect */}
                        Berkarya tanpa batas bersama OurCreativity
                     </span>
                   </p>
                 </div>
            </div>
        </motion.section>

      </motion.div>
    </PageLayout>
  );
};

export default BrandStory;
