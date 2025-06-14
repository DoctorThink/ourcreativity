
import React from "react";
import { motion } from "framer-motion";
import TeamMemberCard from "@/components/TeamMemberCard";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const memberVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Team member interface
interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageSrc: string | null;
  accent: string;
  category: string;
  achievements?: string[];
  instagram?: string;
  bio?: string;
}

interface TeamMemberGridProps {
  members: TeamMember[];
  activeCategory: string | null;
  onMemberClick: (member: TeamMember) => void;
}

export const TeamMemberGrid: React.FC<TeamMemberGridProps> = ({
  members,
  activeCategory,
  onMemberClick
}) => {
  const filteredMembers = members.filter(
    member => !activeCategory || member.category === activeCategory
  );

  if (filteredMembers.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-foreground/60 text-lg">Tim untuk kategori ini akan segera diperkenalkan.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredMembers.map((member) => (
        <motion.div 
          key={member.id} 
          variants={memberVariants}
        >
          <TeamMemberCard
            name={member.name}
            role={member.role}
            instagram={member.instagram}
            accentColor={member.accent}
            bio={member.bio}
            achievements={member.achievements}
            onClick={() => onMemberClick(member)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
