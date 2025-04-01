
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

  // Create random layer height for topographic effect
  const layerHeight = 10 + (index % 3) * 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="topo-layer bg-tone-900/30 backdrop-blur-sm border border-tone-700/20 rounded-topo p-5 flex items-center gap-4 relative overflow-hidden group"
      style={{
        transform: `perspective(1000px) translateZ(${layerHeight}px)`,
        boxShadow: `0 ${layerHeight/2}px ${layerHeight*2}px rgba(0,0,0,0.15)`
      }}
    >
      {/* Topographic contour patterns */}
      <div className="absolute inset-0 contour-pattern opacity-10" />
      <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border border-tone-600/10 opacity-30" />
      <div className="absolute -top-10 -left-10 w-16 h-16 rounded-full border border-tone-600/5 opacity-20" />
      
      <div className="relative z-10 flex items-center gap-4 w-full">
        <Avatar className="h-14 w-14 border border-tone-700/40 shadow-lg overflow-hidden">
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt={name} />
          ) : (
            <AvatarFallback className="bg-tone-800 text-tone-100 font-mono">
              {getInitials(name)}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <motion.h3 
              className="font-display tracking-tight text-lg"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              {name}
            </motion.h3>
            {instagram && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tone-300 hover:text-tone-100 transition-colors flex items-center gap-1 text-sm group"
              >
                <Instagram size={16} className="opacity-70 group-hover:opacity-100" />
                <span className="font-mono text-xs tracking-tight">{instagram}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-[1px] bg-tone-100"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            )}
          </div>
          <p className="text-sm text-tone-400 font-mono">{role}</p>
        </div>
      </div>
      
      {/* Connection lines that animate in */}
      <svg className="absolute -bottom-4 -right-4 w-16 h-16 opacity-30" viewBox="0 0 100 100">
        <motion.path 
          d="M100,0 Q50,50 100,100" 
          className="connection-line"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
        />
      </svg>
    </motion.div>
  );
};

export default TeamMember;
