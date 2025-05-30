
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  instagram?: string;
  role: string;
  imageUrl?: string;
  index: number;
}

const TeamMember = ({ name, instagram, role, imageUrl, index }: TeamMemberProps) => {
  // Get first letters for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="backdrop-blur-lg bg-foreground/5 border border-foreground/10 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group card-depth topo-layer shadow-lg shadow-black/20"
    >
      {/* Enhanced depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full border border-foreground/10 opacity-30 group-hover:scale-125 transition-all duration-500" />
      
      <motion.div 
        className="relative z-10"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Avatar className="h-14 w-14 border border-foreground/10 shadow-lg">
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt={name} />
          ) : (
            <AvatarFallback className="bg-foreground/10 text-foreground shadow-inner">
              {getInitials(name)}
            </AvatarFallback>
          )}
        </Avatar>
      </motion.div>

      <div className="flex-1 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">{name}</h3>
          {instagram && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={`https://instagram.com/${instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 text-sm"
            >
              <Instagram size={16} className="animate-pulse-soft" />
              <span>{instagram}</span>
            </motion.a>
          )}
        </div>
        <p className="text-sm text-foreground/60">{role}</p>
      </div>

      {/* Enhanced 3D effects */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-foreground/5 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <div className="absolute inset-0 shadow-inner opacity-20"></div>
      <div className="absolute inset-0 community-node opacity-30 pointer-events-none"></div>
    </motion.div>
  );
};

export default TeamMember;
