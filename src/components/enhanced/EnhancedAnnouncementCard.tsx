
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Eye, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  views?: number;
  isNew?: boolean;
}

interface EnhancedAnnouncementCardProps {
  announcement: Announcement;
  onClick?: () => void;
  featured?: boolean;
  className?: string;
}

const EnhancedAnnouncementCard = ({
  announcement,
  onClick,
  featured = false,
  className,
}: EnhancedAnnouncementCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'from-mint/20 to-mint/40',
    medium: 'from-turquoise/20 to-turquoise/40',
    high: 'from-coral/20 to-coral/40',
    urgent: 'from-red-500/20 to-red-600/40',
  };

  const priorityGlow = {
    low: 'rgba(152, 245, 225, 0.3)',
    medium: 'rgba(64, 224, 208, 0.3)',
    high: 'rgba(255, 127, 80, 0.3)',
    urgent: 'rgba(239, 68, 68, 0.4)',
  };

  return (
    <motion.div
      className={cn(
        'relative group cursor-pointer overflow-hidden',
        'rounded-3xl backdrop-blur-xl border border-white/20',
        'bg-gradient-to-br from-white/10 via-white/5 to-transparent',
        featured ? 'p-8' : 'p-6',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        y: -8,
        rotateX: 5,
        rotateY: 5,
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? `0 25px 50px rgba(0,0,0,0.3), 0 0 30px ${priorityGlow[announcement.priority]}`
          : '0 8px 32px rgba(0,0,0,0.2)'
      }}
    >
      {/* Dynamic Priority Background */}
      <motion.div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-60',
          priorityColors[announcement.priority]
        )}
        animate={{
          opacity: isHovered ? 0.8 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Liquid Flow Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={isHovered ? {
          x: ['-100%', '100%'],
        } : {}}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
        }}
      />

      {/* Priority Indicator */}
      <motion.div
        className={cn(
          'absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold',
          'bg-white/20 backdrop-blur-sm border border-white/30',
          announcement.priority === 'urgent' && 'animate-pulse'
        )}
        animate={announcement.priority === 'urgent' ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {announcement.priority.toUpperCase()}
      </motion.div>

      {/* New Badge */}
      {announcement.isNew && (
        <motion.div
          className="absolute top-4 left-4 px-2 py-1 bg-emerald-500/80 rounded-full text-xs font-bold text-white"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          BARU
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-2">
          <motion.h3
            className={cn(
              'font-serif font-bold text-white leading-tight',
              featured ? 'text-2xl' : 'text-xl'
            )}
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {announcement.title}
          </motion.h3>
          
          <motion.p
            className="text-white/80 font-sans leading-relaxed"
            animate={isHovered ? { x: 3 } : { x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {announcement.content.slice(0, 120)}
            {announcement.content.length > 120 && '...'}
          </motion.p>
        </div>

        {/* Meta Information */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-white/20"
          animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
        >
          <div className="flex items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{announcement.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{announcement.date}</span>
            </div>
            {announcement.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{announcement.views}</span>
              </div>
            )}
          </div>

          {featured && (
            <motion.div
              className="flex items-center gap-1 text-amber/80"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-medium">Featured</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Glass Highlights */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Floating Particles on Hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/60"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedAnnouncementCard;
