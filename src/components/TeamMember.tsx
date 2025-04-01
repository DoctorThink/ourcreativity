
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
      className="backdrop-blur-lg bg-foreground/5 border border-foreground/10 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group"
    >
      {/* Animated decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full border border-foreground/10 opacity-30 group-hover:scale-125 transition-all duration-500" />
      
      <Avatar className="h-14 w-14 border border-foreground/10 shadow-lg">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={name} />
        ) : (
          <AvatarFallback className="bg-foreground/10 text-foreground">
            {getInitials(name)}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          {instagram && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={`https://instagram.com/${instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 text-sm"
            >
              <Instagram size={16} />
              <span>{instagram}</span>
            </motion.a>
          )}
        </div>
        <p className="text-sm text-foreground/60">{role}</p>
      </div>
    </motion.div>
  );
};

export default TeamMember;
