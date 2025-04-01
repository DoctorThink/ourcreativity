
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
      className="bg-surface border border-border rounded-lg p-4 flex items-center gap-4 group hover:border-accent-blue/30 hover:bg-surface-hover transition-all"
    >
      <Avatar className="h-14 w-14 border border-border">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={name} />
        ) : (
          <AvatarFallback className="bg-surface text-foreground">
            {getInitials(name)}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          {instagram && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://instagram.com/${instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors flex items-center gap-1 text-sm"
            >
              <Instagram size={16} />
              <span>{instagram}</span>
            </motion.a>
          )}
        </div>
        <p className="text-sm text-foreground-muted">{role}</p>
      </div>
    </motion.div>
  );
};

export default TeamMember;
