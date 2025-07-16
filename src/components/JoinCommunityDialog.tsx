
import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Users, LinkIcon, ExternalLink, MessageCircle, Info, Palette, Laugh, UserPlus } from "lucide-react";

interface JoinCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinCommunityDialog = ({ open, onOpenChange }: JoinCommunityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 border-border/20 shadow-2xl bg-gradient-to-tr from-secondary/80 to-background/90 backdrop-blur-xl rounded-3xl overflow-hidden">
        <div className="max-h-[90vh] overflow-y-auto overscroll-contain">
          <div className="p-4 md:p-8 lg:p-10 space-y-6 md:space-y-8">
          {/* Enhanced Dialog Title with Animation */}
          <div className="flex items-center justify-center gap-4 mb-6 text-center">
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/30 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Users className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ayo Bergabung!
              </h3>
              <p className="text-sm text-foreground/70 mt-1">Bergabung dengan Komunitas Kami</p>
            </motion.div>
          </div>

          {/* Introduction Text with Animation */}
          <motion.p 
            className="text-base md:text-lg text-foreground/80 text-center max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Terhubung dengan 1000+ kreator muda! Pilih cara bergabung yang paling cocok untukmu di bawah ini.
          </motion.p>

          {/* Linktree Button with Enhanced Animation */}
          <motion.div 
            className="text-center border-t border-border/30 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p className="text-base text-foreground/60 mb-4">Lihat semua platform & media sosial kami:</p>
            <motion.button
              onClick={() => window.open("https://linktr.ee/ourcreativity.ofc", "_blank")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmering effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000"
                initial={false}
                animate={{ transform: "translateX(-100%)" }}
                whileHover={{ transform: "translateX(100%)" }}
              />
              
              <LinkIcon className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300"/>
              <span>Kunjungi Linktree Kami</span>
            </motion.button>
          </motion.div>

          {/* Community Groups with Staggered Animation */}
          <motion.div 
            className="border-t border-border/30 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <motion.p 
              className="text-base text-foreground/60 mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Atau gabung langsung ke grup diskusi spesifik:
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: "Main OurCreativity",
                  description: "Grup utama komunitas",
                  link: "https://chat.whatsapp.com/KAp4AjCxmVYCGF504eykaG",
                  color: "text-primary",
                  bgColor: "bg-primary/10",
                  borderColor: "border-primary/30",
                  icon: UserPlus,
                  isWhatsApp: true
                },
                {
                  name: "OC Edisi Meme",
                  description: "Berbagi meme kreatif",
                  link: "https://chat.whatsapp.com/BVTsqKqYa9UL2CykAsMmJZ",
                  color: "text-secondary",
                  bgColor: "bg-secondary/10",
                  borderColor: "border-secondary/30",
                  icon: Laugh,
                  isWhatsApp: true
                },
                {
                  name: "OC Edisi Desain",
                  description: "Form registrasi desainer",
                  link: "https://forms.gle/d1SBHkeCWdDfYLGHA",
                  color: "text-accent",
                  bgColor: "bg-accent/10",
                  borderColor: "border-accent/30",
                  icon: Palette,
                  isWhatsApp: false
                }
              ].map((group, index) => (
                <motion.a
                  key={group.name}
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative flex flex-col items-center gap-3 md:gap-4 p-4 md:p-6 rounded-2xl border ${group.bgColor} ${group.borderColor} hover:shadow-lg group transition-all duration-300 backdrop-blur-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl ${group.bgColor} ${group.borderColor} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <group.icon className={`w-6 h-6 ${group.color}`} />
                  </div>
                  
                   <div className="text-center">
                     <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{group.name}</h4>
                     <p className="text-xs md:text-sm text-foreground/60">{group.description}</p>
                   </div>
                  
                  <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/50">
                    {group.isWhatsApp ? (
                      <MessageCircle className="w-4 h-4" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                    <span>{group.isWhatsApp ? 'WhatsApp' : 'Google Form'}</span>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <motion.div 
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    style={{ 
                      background: `radial-gradient(circle at center, ${group.color.includes('primary') ? 'hsl(var(--primary))' : 
                                   group.color.includes('secondary') ? 'hsl(var(--secondary))' : 
                                   'hsl(var(--accent))'}, transparent 70%)`
                    }}
                  />
                </motion.a>
              ))}
            </div>
            
             <motion.p 
               className="text-xs md:text-sm text-foreground/50 mt-6 md:mt-8 text-center px-4 flex items-center justify-center gap-2"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1, duration: 0.5 }}
             >
               <Info size={14} className="text-foreground/40 flex-shrink-0"/>
               <span>Beberapa grup butuh pengisian form untuk menyaring anggota, silakan isi form untuk di accept.</span>
             </motion.p>
           </motion.div>
         </div>
        </div>

        {/* Enhanced Decorative Background Elements with Animation */}
        <motion.div 
          className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-primary/5 opacity-50 blur-2xl pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
        <motion.div 
          className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-secondary/5 opacity-40 blur-2xl pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 0.4, duration: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/3 opacity-30 blur-3xl pointer-events-none"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityDialog;
