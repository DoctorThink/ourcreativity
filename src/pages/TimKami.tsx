import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import TeamMember from "@/components/TeamMember"; // Assuming this component exists and renders member details
import { cn } from "@/lib/utils";
import { Film, Palette, Feather, Bot, ShieldCheck, Smile } from 'lucide-react'; // Icons for sections

/**
 * FILES/FOLDERS TO CHECK/ENSURE EXIST AND ARE CONFIGURED:
 *
 * 1.  `src/components/layouts/PageLayout.tsx`: (Assumed consistent with PageLayout.tsx (1).txt)
 *     - Provides page structure, header, background effects, ScrollArea.
 *
 * 2.  `src/components/TeamMember.tsx`:
 *     - This component is crucial. It needs to render individual team member info (name, role, Instagram).
 *     - For best results with the new style, it should ideally be a simple component focusing on displaying text and maybe an avatar, allowing the parent `TimKami.tsx` to wrap it in a styled container if needed, OR it should accept className props to be styled directly.
 *     *Example Assumption for TeamMember:*
 *       ```tsx
 *       // Simplified example structure TeamMember might have:
 *       const TeamMember = ({ name, role, instagram, className }) => (
 *         <div className={cn("p-3 bg-neutral-800/50 rounded-xl text-center", className)}>
 *           <p className="font-semibold text-sm text-foreground">{name}</p>
 *           <p className="text-xs text-neutral-400">{role}</p>
 *           {instagram && <a href={`https://instagram.com/${instagram.replace('@','')}`} target="_blank" className="...">@{instagram.replace('@','')}</a>}
 *         </div>
 *       );
 *       ```
 *
 * 3.  `src/index.css`: (Assumed consistent with index (4).css)
 *     - Defines CSS variables, font families, Tailwind directives.
 *
 * 4.  `tailwind.config.ts`: (Assumed consistent with tailwind.config (1).ts.txt)
 *     - Defines accent colors (lavender, mint, etc.).
 *
 * 5.  `src/lib/utils.ts`: (Assumed consistent with utils.ts.txt)
 *     - Provides the `cn` utility function.
 *
 * 6.  `lucide-react` (dependency): Assumed installed.
 * 7.  `framer-motion` (dependency): Assumed installed.
 */

// --- Animation Variants (Consistent with BrandStory/iOS Style) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
  scale: 1.02, // Very subtle hover for the main section card
  boxShadow: "0px 10px 20px -8px rgba(0, 0, 0, 0.2)",
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

// --- Team Data Structure (Assign Icons and Accents) ---
const teamData = [
  {
    title: "Video",
    icon: Film,
    accent: "amethyst", // Or 'lavender'
    members: [
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Video Editor" },
      { name: "Aljaan", instagram: "@snhrrr", role: "Video Editor" }
    ]
  },
  {
    title: "Design",
    icon: Palette,
    accent: "mint", // Or 'turquoise'
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
    accent: "peach", // Or 'coral'
    members: [
      { name: "Kevin", instagram: "kv.ein_", role: "Writer" },
      { name: "Senku", instagram: "Senkuphotograph", role: "Writer" },
      { name: "Saviora", instagram: "saviorasa", role: "Writer" }
    ]
  },
  {
    title: "Meme",
    icon: Smile,
    accent: "amber", // Assuming amber is defined in config
    members: [
      { name: "Daffa/deploid", instagram: "", role: "Meme Creator" },
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Meme Creator" }
    ]
  },
  {
    title: "Bot",
    icon: Bot,
    accent: "blueLight", // Assuming blueLight is defined
    members: [
      { name: "Rappal", instagram: "raffal_arz", role: "Bot Developer" },
      { name: "Flores", instagram: "flores.gold", role: "Bot Developer" }
    ]
  },
  {
    title: "Admin Discord",
    icon: ShieldCheck,
    accent: "grayMid", // Assuming grayMid is defined
    members: [
      { name: "Aljaan", instagram: "@snhrrr", role: "Discord Admin" }
    ]
  }
];

// --- Accent Color Mapping (Tailwind Classes - Ensure colors exist in config) ---
const accentStyles: Record<string, { bg: string; border: string; text: string; iconText: string; shadow: string }> = {
  lavender: { bg: "bg-lavender/10", border: "border-lavender/40", text: "text-lavender", iconText: "text-lavender", shadow: "shadow-lavender/5" },
  mint: { bg: "bg-mint/10", border: "border-mint/40", text: "text-mint", iconText: "text-mint", shadow: "shadow-mint/5" },
  peach: { bg: "bg-peach/10", border: "border-peach/40", text: "text-peach", iconText: "text-peach", shadow: "shadow-peach/5" },
  softPink: { bg: "bg-softPink/10", border: "border-softPink/40", text: "text-softPink", iconText: "text-softPink", shadow: "shadow-softPink/5" },
  amethyst: { bg: "bg-amethyst/10", border: "border-amethyst/40", text: "text-amethyst", iconText: "text-amethyst", shadow: "shadow-amethyst/5" },
  turquoise: { bg: "bg-turquoise/10", border: "border-turquoise/40", text: "text-turquoise", iconText: "text-turquoise", shadow: "shadow-turquoise/5" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/40", text: "text-amber-500", iconText: "text-amber-500", shadow: "shadow-amber-500/5" }, // Example using direct color if needed
  blueLight: { bg: "bg-blueLight/10", border: "border-blueLight/40", text: "text-blueLight", iconText: "text-blueLight", shadow: "shadow-blueLight/5" },
  grayMid: { bg: "bg-grayMid/10", border: "border-grayMid/40", text: "text-grayMid", iconText: "text-grayMid", shadow: "shadow-grayMid/5" },
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
        className="space-y-8 md:space-y-10" // Add spacing between section cards
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
                "rounded-3xl border relative overflow-hidden shadow-md", // Main card container
                "bg-secondary/60 backdrop-blur-md",
                accent.border, // Use accent border for the section card
                accent.shadow
              )}
            >
              {/* Header for the Section */}
              <div className={cn("p-4 border-b", accent.border, accent.bg)}> {/* Subtle accent bg in header */}
                <div className="flex items-center gap-3">
                   <SectionIcon className={cn("w-5 h-5 flex-shrink-0", accent.iconText)} />
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
                       key={`${section.title}-${member.name}-${index}`} // More unique key
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 0.1 + index * 0.03, duration: 0.3 }}
                       // Apply styling here IF TeamMember is very basic, otherwise let TeamMember handle its style
                       // Example: wrapping TeamMember in a styled div
                       className={cn(
                           "bg-neutral-800/40 p-3 rounded-xl border border-neutral-700/50 shadow-sm hover:bg-neutral-700/50 transition-colors duration-200"
                       )}
                    >
                        <TeamMember
                          name={member.name}
                          instagram={member.instagram}
                          role={member.role}
                          // Pass className if TeamMember supports it:
                          // className="text-center"
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
