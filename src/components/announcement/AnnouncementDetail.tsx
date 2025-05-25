import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Bookmark, 
  ExternalLink,
  Sparkles, // For v3.5 Creative Constellation & v4.0 Symphony
  Code, // For Ardelyo/Unix Series
  AlertTriangle, // For Gerakan 27 April
  Share2,
  Users, // For recruitment
  Megaphone, // Default for update
  Zap, // For v3.0 Launch
  Paintbrush, // For v3.7 Karya Kami
  TrendingUp, // For performance in v4.0
  Smartphone // For mobile app in v4.0
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // For Indonesian date formatting
import { Announcement } from "@/models/Announcement";
import { getCategoryTheme } from "@/lib/themeUtils"; 

interface AnnouncementDetailProps {
  announcement: Announcement;
}

// Helper function to render markdown-like content
const renderContent = (content: string) => {
  return content.split('\n\n').map((paragraph, idx) => {
    // Basic list detection
    if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
      const items = paragraph.split('\n').map(item => item.replace(/^[-*]\s*/, ''));
      return (
        <ul key={idx} className="list-disc list-inside my-2 space-y-1">
          {items.map((item, itemIdx) => <li key={itemIdx}>{item}</li>)}
        </ul>
      );
    }
    // Basic bold/italic - simple replacement, not full markdown
    const formattedParagraph = paragraph
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedParagraph }} />;
  });
};


export const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ announcement }) => {
  const theme = getCategoryTheme(announcement.category);
  
  const categoryIconsMap: Record<string, React.ElementType> = {
    event: Calendar,
    recruitment: Users, 
    update: Megaphone,
  };
  const CategoryIcon = categoryIconsMap[announcement.category] || Megaphone;

  const getDisplayDate = () => {
    try {
      const dateToFormat = announcement.date ? new Date(announcement.date) : new Date(announcement.created_at);
      return format(dateToFormat, "dd MMMM yyyy", { locale: id });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Tanggal tidak valid";
    }
  };
  const displayDate = getDisplayDate();
  
  // Specific Announcement Checks
  const isGerakan27April = announcement.title.includes('Gerakan 27 April') || announcement.content.includes('Gerakan 27 April');
  const isArdelyoMentioned = announcement.content.includes('Ardelyo') || announcement.content.includes('Unix Series');

  // Version Update Checks (more specific)
  const isV3Launch = announcement.title.includes("Peluncuran Resmi Website OurCreativity v3.0");
  const isV35Constellation = announcement.title.includes("v3.5") && announcement.title.includes("Creative Constellation");
  const isV37Karya = announcement.title.includes("v3.7") && announcement.title.includes("Karya Kami");
  const isV4Symphony = announcement.title.includes("v4.0") && announcement.title.includes("Symphony Design");

  let specialBgClass = theme.bgClass;
  let specialTextColor = ''; // Default will be from prose or theme
  let specialAccentColor = theme.accentClass; // Default accent
  let decorativeElements: React.ReactNode = null;

  if (isGerakan27April) {
    specialBgClass = 'bg-black/80 border-red-800/60';
    specialTextColor = 'text-red-200';
    decorativeElements = (
      <>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-red-800/15 rounded-full blur-3xl animate-pulse-soft delay-500"></div>
      </>
    );
  } else if (isV3Launch) {
    specialBgClass = 'bg-gradient-to-br from-amber-500/10 via-background to-peach/10 border-amber-500/30';
    specialTextColor = 'text-amber-200'; // Using a lighter shade for dark bg
    specialAccentColor = 'text-amber-400';
    decorativeElements = (
      <>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 animate-shimmer bg-shimmer-gradient [background-size:200%_100%]" />
        <Zap className="absolute top-10 right-10 w-24 h-24 text-amber-500/10 opacity-50 -rotate-12 animate-float" />
        <Zap className="absolute bottom-10 left-10 w-16 h-16 text-peach/10 opacity-50 rotate-12 animate-float [animation-delay:1s]" />
      </>
    );
  } else if (isV35Constellation) {
    specialBgClass = 'bg-gradient-to-br from-amethyst/20 via-background to-turquoise/20 border-amethyst/30';
    specialTextColor = 'text-lavender';
    specialAccentColor = 'text-mint';
    decorativeElements = (
      <>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-amethyst/10 rounded-full blur-3xl animate-morph"></div>
        <div className="absolute bottom-10 -left-20 w-60 h-60 bg-turquoise/10 rounded-full blur-3xl animate-morph [animation-delay:2s]"></div>
        <Sparkles className="absolute top-1/4 left-1/3 w-16 h-16 text-lavender/20 animate-ping" />
      </>
    );
  } else if (isV37Karya) {
    specialBgClass = 'bg-gradient-to-br from-coral/20 via-background to-mint/20 border-coral/30';
    specialTextColor = 'text-softPink';
    specialAccentColor = 'text-coral';
    decorativeElements = (
      <>
        <Paintbrush className="absolute bottom-5 right-5 w-32 h-32 text-coral/10 opacity-70 -rotate-[15deg] animate-float" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-mint/5 rounded-full blur-2xl animate-pulse-soft"></div>
      </>
    );
  } else if (isV4Symphony) {
    specialBgClass = 'bg-gradient-to-br from-purpleLight/10 via-background to-blueLight/10 border-purpleDark/30';
    specialTextColor = 'text-primary'; // Using primary text color defined in tailwind
    specialAccentColor = 'text-purpleLight';
    decorativeElements = (
      <>
        <div className="absolute inset-0 opacity-5 animate-gradient-cycle" style={{backgroundImage: 'linear-gradient(120deg, var(--tw-color-purpleLight), var(--tw-color-turquoise), var(--tw-color-coral))', backgroundSize: '400% 400%'}}></div>
        <Sparkles className="absolute top-10 right-10 w-20 h-20 text-purpleLight/20 animate-glow" />
        <TrendingUp className="absolute bottom-10 left-10 w-16 h-16 text-turquoise/20 animate-float" />
      </>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-4 sm:p-6 md:p-8 relative overflow-hidden ${specialBgClass}`}
    >
      {decorativeElements}
      
      <div className="flex justify-between items-start mb-4 sm:mb-6 flex-wrap gap-2 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Badge */}
          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium font-sans flex items-center gap-1
            ${isGerakan27April ? 'bg-gradient-to-r from-red-800 to-red-600 text-white' : 
             isV3Launch ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-background' :
             isV35Constellation ? 'bg-gradient-to-r from-amethyst to-turquoise text-white' :
             isV37Karya ? 'bg-gradient-to-r from-coral to-peach text-white' :
             isV4Symphony ? 'bg-gradient-to-r from-purpleLight to-blueLight text-background' :
             getSolidCategoryBgClass(announcement.category) + ' text-white' // Fallback to category theme
            }`}
          >
            {isGerakan27April ? <AlertTriangle className="w-3 h-3" /> :
             isV3Launch ? <Zap className="w-3 h-3" /> :
             isV35Constellation ? <Sparkles className="w-3 h-3" /> :
             isV37Karya ? <Paintbrush className="w-3 h-3" /> :
             isV4Symphony ? <Sparkles className="w-3 h-3" /> :
             <CategoryIcon className="w-3 h-3" />
            }
            {announcement.category === "event" ? "Acara" : 
             announcement.category === "recruitment" ? "Rekrutmen" : "Update"}
          </span>
          
          {/* Version/Special Badges */}
          {isV3Launch && <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-0.5 rounded-full font-sans">v3.0</span>}
          {isV35Constellation && <span className="bg-amethyst/20 text-mint text-xs px-2 py-0.5 rounded-full font-sans">v3.5 - Creative Constellation</span>}
          {isV37Karya && <span className="bg-coral/20 text-coral text-xs px-2 py-0.5 rounded-full font-sans">v3.7 - Karya Kami</span>}
          {isV4Symphony && (
            <motion.span 
              className="bg-gradient-to-r from-amethyst to-turquoise text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 font-sans"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Sparkles className="w-3 h-3" /> v4.0 - Symphony
            </motion.span>
          )}

          {isGerakan27April && (
            <motion.span 
              className="bg-gradient-to-r from-red-700 to-red-900 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-sans"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <AlertTriangle className="w-3 h-3" /> Memorial Event
            </motion.span>
          )}
          
          {isArdelyoMentioned && !isV4Symphony && ( // Avoid double ardelyo tag if v4 is also ardelyo
            <motion.span 
              className="bg-gradient-to-r from-blueLight to-turquoise text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-sans"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            >
              <Code className="w-3 h-3" /> Unix Series / Ardelyo
            </motion.span>
          )}
           {isV4Symphony && announcement.content.includes('Ardelyo') && (
             <span className="bg-blueDark/20 text-blueLight text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
              <Code className="w-3 h-3" /> Ardelyo Dev
            </span>
           )}
          
          {announcement.important && !isGerakan27April && !(isV3Launch || isV35Constellation || isV37Karya || isV4Symphony) && (
            <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full font-sans">Penting</span>
          )}
        </div>
        <span className={`text-xs sm:text-sm flex items-center gap-1.5 font-sans ${isGerakan27April ? 'text-red-200/70' : specialTextColor ? specialTextColor + '/70' : 'text-foreground/60'}`}>
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> {displayDate}
        </span>
      </div>
      
      <motion.h2 
        className={`text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-4 sm:mb-6 ${isGerakan27April ? 'text-red-200' : specialTextColor ? specialTextColor : theme.textClass}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {announcement.title}
      </motion.h2>
      
      {announcement.image_url && (
        <motion.div 
          className={`mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-lg
            ${isGerakan27April ? 'border-2 border-red-800/50 p-1' : 
             isV3Launch ? 'border-2 border-amber-500/30 p-0.5' :
             isV35Constellation ? 'border-2 border-amethyst/30 p-0.5' :
             isV37Karya ? 'border-2 border-coral/30 p-0.5' :
             isV4Symphony ? 'border-2 border-purpleLight/30 p-0.5' :
             ''}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img 
            src={announcement.image_url} 
            alt={announcement.title}
            className={`w-full h-auto object-cover max-h-[200px] sm:max-h-[300px] md:max-h-[350px] rounded-md 
            ${isGerakan27April ? 'filter contrast-125' : ''}`}
            onError={(e) => { e.currentTarget.style.display = 'none'; console.error('Gagal memuat gambar pengumuman:', announcement.image_url); }}
          />
        </motion.div>
      )}
      
      <motion.div 
        className={`prose prose-sm sm:prose-base max-w-none space-y-3 sm:space-y-4 font-sans 
          ${isGerakan27April ? 'text-red-100/90 prose-strong:text-red-200 prose-headings:text-red-200 prose-a:text-red-300 hover:prose-a:text-red-100' :
           specialTextColor ? `text-${specialTextColor.split('-')[1]}/90 prose-strong:text-${specialTextColor.split('-')[1]} prose-headings:text-${specialTextColor.split('-')[1]} prose-a:${specialAccentColor} hover:prose-a:${specialTextColor.split('-')[1]}` : 
           'text-foreground/80 prose-invert prose-a:text-primary-light hover:prose-a:text-primary'
          }
          ${isV3Launch || isV35Constellation || isV37Karya || isV4Symphony ? 'prose-strong:font-semibold' : ''}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {renderContent(announcement.content)}
      </motion.div>
      
      <motion.div 
        className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {announcement.category === "event" && (
          <motion.button
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-sans
              ${isGerakan27April 
                ? 'bg-gradient-to-r from-red-800 to-red-600 text-white hover:from-red-700 hover:to-red-500' 
                : 'bg-gradient-to-r from-coral/80 to-coral/90 text-white hover:from-coral hover:to-peach'}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,127,80,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            Tambahkan ke Kalender
          </motion.button>
        )}
        
        {(isGerakan27April || isV4Symphony) && ( // Allow sharing for important ones
          <motion.button
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-sans
            ${isGerakan27April ? 'bg-red-950/50 hover:bg-red-900/50 text-red-200 border border-red-800/30' :
             'bg-purpleLight/20 hover:bg-purpleLight/30 text-purpleLight border border-purpleLight/30'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Bagikan
          </motion.button>
        )}
        
        <motion.button
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-sans
            ${isGerakan27April 
              ? 'bg-red-950/30 hover:bg-red-900/30 text-red-200 border border-red-800/20' 
              : 'bg-foreground/10 hover:bg-foreground/20 text-foreground/90'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
          Simpan
        </motion.button>
        
        {announcement.link_url && (
          <motion.a
            href={announcement.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-sans
              ${isGerakan27April 
                ? 'bg-gradient-to-r from-red-700/70 to-red-500/70 text-white hover:from-red-600/70 hover:to-red-400/70' 
                : isV4Symphony ? 'bg-gradient-to-r from-amethyst/80 to-turquoise/80 text-white hover:from-amethyst hover:to-turquoise'
                : 'bg-gradient-to-r from-amethyst/60 to-amethyst/80 text-white hover:from-amethyst/70 hover:to-amethyst/90'}`}
            whileHover={{ scale: 1.05, boxShadow: `0px 0px 15px var(--tw-color-amethyst)` }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            Kunjungi Link
          </motion.a>
        )}

        {isV4Symphony && announcement.content.includes('aplikasi mobile') && (
            <motion.div
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-sans bg-gradient-to-r from-mint/80 to-turquoise/80 text-background"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(64,224,208,0.5)" }}
            >
                <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
                Mobile App Soon!
            </motion.div>
        )}
      </motion.div>
      
      {/* Special footers */}
      {isGerakan27April && (
        <motion.div
          className="mt-8 pt-4 border-t border-red-900/30 text-red-200/70 text-xs sm:text-sm font-sans"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          <p className="italic">Gerakan 27 April - Mengenang tragedi pembantaian 300+ member SideR dan member aktif.</p>
        </motion.div>
      )}
      {isV4Symphony && (
        <motion.div
          className="mt-8 pt-4 border-t border-purpleDark/30 text-purpleLight/70 text-xs sm:text-sm font-sans"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          <p className="italic">Symphony Design menandai evolusi OurCreativity. Nantikan inovasi selanjutnya!</p>
        </motion.div>
      )}
    </motion.div>
  );
};
