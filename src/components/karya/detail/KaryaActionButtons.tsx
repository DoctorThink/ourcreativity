
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ExternalLink } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import { UseMutationResult } from '@tanstack/react-query';

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface KaryaActionButtonsProps {
  karya: KaryaType;
  hasLiked: boolean;
  likeMutation: UseMutationResult<string, Error, string, unknown>;
}

export const KaryaActionButtons = ({ karya, hasLiked, likeMutation }: KaryaActionButtonsProps) => {
  return (
    <div className="p-4 sm:p-6 pt-4 flex flex-col sm:flex-row justify-between items-center">
      <p className="text-xs text-foreground/60 mb-4 sm:mb-0 font-medium">
        Dibuat pada {new Date(karya.created_at).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
          <Button
            size="sm"
            className="gap-2 w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl transition-shadow bg-secondary text-foreground hover:bg-secondary/80 border border-white/10 font-medium disabled:opacity-50"
            onClick={() => {
              if (!hasLiked && karya) {
                likeMutation.mutate(karya.id);
              }
            }}
            disabled={hasLiked || likeMutation.isPending}
          >
            <Heart className={`w-4 h-4 transition-colors ${hasLiked ? 'text-red-500 fill-current' : ''}`} />
            <span>Suka ({karya.likes_count || 0})</span>
          </Button>
        </motion.div>
        {karya.content_url && !karya.link_url && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
            <Button 
              onClick={() => window.open(karya.content_url, '_blank')}
              className="gap-2 w-full rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-mint to-sage text-white border border-white/10 font-medium" 
              size="sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Link Konten</span>
            </Button>
          </motion.div>
        )}
        {karya.link_url && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
            <Button 
              onClick={() => window.open(karya.link_url, '_blank')}
              className="gap-2 w-full rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-lavender to-purpleLight text-white border border-white/10 font-medium" 
              size="sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Lihat Karya Lengkap</span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
