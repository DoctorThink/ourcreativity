import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import TeamMember from "@/components/TeamMember"; // Assuming this component exists and renders member details
import { cn } from "@/lib/utils";
import { Film, Palette, Feather, Bot, ShieldCheck, Smile, Gamepad2 } from 'lucide-react'; // Added Gamepad2

/**
 * FILES/FOLDERS TO CHECK/ENSURE EXIST AND ARE CONFIGURED:
 *
 * 1.  `src/components/layouts/PageLayout.tsx`: (Assumed consistent with PageLayout.tsx (1).txt)
 *     - Provides page structure, header, background effects, ScrollArea.
 *
 * 2.  `src/components/TeamMember.tsx`:
 *     - Renders individual team member info. Assumed to accept className or be styled appropriately internally.
 *     *Example Assumption:* Handles display of name, role, optional Instagram link. Styling ideally minimal or accepts `className`.
 *
 * 3.  `public/lovable-uploads/`:
 *     - Must contain the specified PNG images: `video.png`, `design.png`, `karyatulis.png`, `game.png`. Ensure paths are correct relative to the `public` directory.
 *
 * 4.  `src/index.css`: (Assumed consistent with index (4).css)
 *     - Defines CSS variables, font families, Tailwind directives.
 *
 * 5.  `tailwind.config.ts`: (Assumed consistent with tailwind.config (1).ts.txt)
 *     - Defines necessary accent colors used in `accentStyles` map (coral, emerald, blueLight, amethyst, grayMid, orangeLight). Checked against provided config - these should exist.
 *
 * 6.  `src/lib/utils.ts`: (Assumed consistent with utils.ts.txt)
 *     - Provides the `cn` utility function.
 *
 * 7.  `lucide-react` (dependency): Assumed installed.
 * 8.  `framer-motion` (dependency): Assumed installed.
 */

// --- Animation Variants (Consistent with BrandStory/iOS Style) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const sectionCardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.3, 0.0, 0.3, 1.0] },
  },
};

const cardHover = {
  scale: 1.02,
  boxShadow: "0px 10px 20px -8px rgba(0, 0, 0, 0.2)",
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

// --- Team Data Structure (Updated with Images, Icons, and Accents) ---
const teamData = [
  {
    title: "Video Editing",
    icon: Film,
    imageSrc: "/lovable-uploads/video.png", // Path relative to public folder
    accent: "coral", // Merah -> Coral/OrangeDark from config
    members: [
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Video Editor" },
      { name: "Aljaan", instagram: "@snhrrr", role: "Video Editor" }
    ]
  },
   {
    title: "Meme Creator", // Changed title to match request
    icon: Smile,
    imageSrc: null, // No specific image mentioned
    accent: "emerald", // Ijo -> Emerald from config
    members: [
      { name: "Daffa/deploid", instagram: "", role: "Meme Creator" },
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Meme Creator" }
    ]
  },
  {
    title: "Game Konten",
    icon: Gamepad2,
    imageSrc: "/lovable-uploads/game.png",
    accent: "blueLight", // Biru -> blueLight from config
    members: [
      // Add actual members here if known, using placeholders for now
      { name: "PlayerOne", instagram: "player.one", role: "Content Creator" },
      { name: "GamerX", instagram: "thegamerx", role: "Streamer" },
    ]
  },
  {
    title: "Design Grafis", // Changed title to match request
    icon: Palette,
    imageSrc: "/lovable-uploads/design.png",
    accent: "amethyst", // Purple -> Amethyst from config
    members: [
      { name: "Ashtrozz", instagram: "damz.snyther", role: "Designer" },
      { name: "nexx4sure", instagram: "@mhmmdmhb_", role: "Designer" },
      { name: "Arriesh", instagram: "@esh33", role: "Designer" },
      { name: "Rappal", instagram: "raffal_arz", role: "Designer" },
      { name: "Ardellio", instagram: "ardel.yo", role: "Designer" }
    ]
  },
  {
    title: "Karya Tulis",
    icon: Feather,
    imageSrc: "/lovable-uploads/karyatulis.png",
    accent: "grayMid", // Grey -> grayMid from config
    members: [
      { name: "Kevin", instagram: "kv.ein_", role: "Writer" },
      { name: "Senku", instagram: "Senkuphotograph", role: "Writer" },
      { name: "Saviora", instagram: "saviorasa", role: "Writer" }
    ]
  },
  {
    title: "Bot Developer", // Changed title
    icon: Bot,
    imageSrc: null, // No specific image mentioned (E. BOT was text)
    accent: "orangeLight", // Oren -> orangeLight from config
    members: [
      { name: "Rappal", instagram: "raffal_arz", role: "Bot Developer" },
      { name: "Flores", instagram: "flores.gold", role: "Bot Developer" }
    ]
  },
  {
    title: "Admin Discord",
    icon: ShieldCheck,
    imageSrc: null, // No specific image mentioned
    accent: "grayMid", // No color specified, using Grey
    members: [
      { name: "Aljaan", instagram: "@snhrrr", role: "Discord Admin" }
    ]
  }
];

// --- Accent Color Mapping (Tailwind Classes - Ensure colors exist in config) ---
// Assuming tailwind.config.ts has: coral, emerald, blueLight, amethyst, grayMid, orangeLight
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string }> = {
  coral: { bg: "bg-coral/10", border: "border-coral/40", text: "text-coral", iconText: "text-coral", shadow: "shadow-coral/5" },
  emerald: { bg: "bg-emerald/10", border: "border-emerald/40", text: "text-emerald", iconText: "text-emerald", shadow: "shadow-emerald/5" },
  blueLight: { bg: "bg-blueLight/10", border: "border-blueLight/40", text: "text-blueLight", iconText: "text-blueLight", shadow: "shadow-blueLight/5" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/5" },
  grayMid: { bg: "bg-grayMid/10", border: "border-grayMid/40", text: "text-grayMid", iconText: "text-grayMid", shadow: "shadow-grayMid/5" },
  orangeLight: { bg: "bg-orangeLight/10", border: "border-orangeLight/40", text: "text-orangeLight", iconText: "text-orangeLight", shadow: "shadow-orangeLight/5" },
  // Fallback default style
  default: { bg: "bg-neutral-800/20", border: "border-neutral-700/40", text: "text-neutral-400", iconText: "text-neutral-300", shadow: "shadow-black/10" },
};

const getAccentStyle = (accentKey: string | undefined) => {
    return accentStyles[accentKey || 'default'] || accentStyles.default;
};


const TimKami = () => {
  return (
    <PageLayout
      title="Tim Kami"
      subtitle="Kenali lebih dekat para kreator dan admin di balik OUR CREATIVITY"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 md:space-y-10"
      >
        {teamData.map((section) => {
          const SectionIcon = section.icon;
          const accent = getAccentStyle(section.accent);

          return (
            <motion.div
              key={section.title}
              variants={sectionCardVariants}
              whileHover={cardHover}
              className={cn(
                "rounded-3xl border relative overflow-hidden shadow-md",
                "bg-secondary/60 backdrop-blur-md",
                accent.border,
                accent.shadow
              )}
            >
              {/* Header for the Section */}
              <div className={cn("p-4 border-b", accent.border, accent.bg)}>
                <div className="flex items-center gap-3">
                   {/* Conditionally render Image or Icon */}
                   {section.imageSrc ? (
                     <motion.img
                       src={section.imageSrc}
                       alt={`${section.title} logo`}
                       className="w-6 h-6 object-contain rounded-sm flex-shrink-0" // Style the image
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 0.1 }}
                     />
                   ) : (
                     <SectionIcon className={cn("w-5 h-5 flex-shrink-0", accent.iconText)} />
                   )}
                   <h2 className="text-lg font-semibold font-serif text-foreground">
                     {section.title} ({section.members.length})
                   </h2>
                </div>
              </div>

              {/* Grid for Team Members */}
              <div className="p-4 md:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {section.members.map((member, index) => (
                    <motion.div
                       key={`${section.title}-${member.name}-${index}`}
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 0.1 + index * 0.03, duration: 0.3 }}
                       className={cn(
                           "bg-neutral-800/40 p-3 rounded-xl border border-neutral-700/50 shadow-sm hover:bg-neutral-700/50 transition-colors duration-200"
                       )}
                    >
                        <TeamMember
                          name={member.name}
                          instagram={member.instagram}
                          role={member.role}
                          // className="text-center" // Optional: If TeamMember accepts it
                        />
                     </motion.div>
                  ))}
                </div>
              </div>

               {/* Optional subtle background element */}
               <div className={cn("absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-[0.05] blur-lg", accent.bg.replace('/10','/80'))}></div>
            </motion.div>
          );
        })}
      </motion.div>
    </PageLayout>
  );
};

export default TimKami;
