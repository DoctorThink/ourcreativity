
import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Users, LinkIcon, ExternalLink, MessageCircle, Info } from "lucide-react";

interface JoinCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinCommunityDialog = ({ open, onOpenChange }: JoinCommunityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-border/30 shadow-xl bg-gradient-to-tr from-secondary/70 to-secondary/80 backdrop-blur-xl">
        <div className="p-6 md:p-8 space-y-6">
          {/* Enhanced Dialog Title with Animation */}
          <div className="flex items-center justify-center gap-3 mb-4 text-center">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-emerald/10 border border-emerald/30 flex items-center justify-center"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Users className="w-6 h-6 text-emerald" />
            </motion.div>
            <motion.h3 
              className="text-xl md:text-2xl font-semibold font-serif text-foreground"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Bergabung dengan Komunitas Kami
            </motion.h3>
          </div>

          {/* Introduction Text with Animation */}
          <motion.p 
            className="text-sm md:text-base text-neutral-300 text-center max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Terhubung dengan 1000+ kreator muda! Pilih cara bergabung yang paling cocok untukmu di bawah ini.
          </motion.p>

          {/* Linktree Button with Enhanced Animation */}
          <motion.div 
            className="text-center border-t border-neutral-700/50 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p className="text-sm text-neutral-400 mb-3">Lihat semua platform & media sosial kami:</p>
            <motion.button
              onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-gradient-to-r from-neutral-200 to-white text-neutral-900 hover:shadow-lg group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmering effect */}
              <motion.div
                className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <LinkIcon className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300"/>
              <span>Kunjungi Linktree Kami</span>
            </motion.button>
          </motion.div>

          {/* WhatsApp Groups with Staggered Animation */}
          <motion.div 
            className="border-t border-neutral-700/50 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <motion.p 
              className="text-sm text-neutral-400 mb-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Atau gabung langsung ke grup diskusi spesifik:
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
              {[
                {
                  name: "O.C Kartul",
                  link: "https://chat.whatsapp.com/CHTz0dzUQq9K3XGfRknYim",
                  color: "text-gray-400"
                },
                {
                  name: "O.C Community",
                  link: "https://chat.whatsapp.com/KAp4AjCxmVYCGF504eykaG",
                  color: "text-emerald"
                },
                {
                  name: "O.C Meme",
                  link: "https://chat.whatsapp.com/BVTsqKqYa9UL2CykAsMmJZ",
                  color: "text-coral"
                }
              ].map((group, index) => (
                <motion.a
                  key={group.name}
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50 border-neutral-700/60 hover:bg-secondary/80 hover:border-neutral-600 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -2, 
                    scale: 1.02,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" 
                  }}
                >
                  <MessageCircle className={`w-5 h-5 ${group.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-sm font-medium text-neutral-200">{group.name}</span>
                  <ExternalLink className="ml-auto w-4 h-4 text-neutral-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Subtle animated ring */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg z-0 pointer-events-none"
                    initial={false}
                    animate={{ opacity: 0, scale: 1 }}
                    whileHover={{ 
                      opacity: [0, 0.2, 0],
                      scale: [1, 1.05, 1],
                      transition: { 
                        repeat: Infinity,
                        duration: 1.5
                      }
                    }}
                    style={{ 
                      border: `1px solid ${group.color === 'text-gray-400' ? '#9ca3af' : 
                              group.color === 'text-emerald' ? '#34d399' : 
                              '#f9a8d4'}` 
                    }}
                  />
                </motion.a>
              ))}
            </div>
            
            <motion.p 
              className="text-xs text-neutral-500 mt-4 text-center px-4 flex items-center justify-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Info size={12} className="inline mr-1 align-middle"/>
              Beberapa grup butuh pengisian form untuk menyaring anggota, silakan isi form untuk di accept.
            </motion.p>
          </motion.div>
        </div>

        {/* Enhanced Decorative Background Elements with Animation */}
        <motion.div 
          className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-emerald/5 opacity-50 blur-xl pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
        <motion.div 
          className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-emerald/5 opacity-40 blur-xl pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 0.4, duration: 1 }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityDialog;
