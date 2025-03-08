
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showBackButton?: boolean;
}

const PageLayout = ({ 
  title,
  subtitle,
  children,
  showBackButton = true
}: PageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Fixed Background Gradient for better performance */}
      <div className="fixed inset-0 bg-gradient-to-b from-black to-zinc-900 -z-10" />
      
      {/* Header with Logo */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg p-4 border-b border-white/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {showBackButton && (
            <motion.button 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali</span>
            </motion.button>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-72px)]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Title Section */}
            {(title || subtitle) && (
              <div className="text-center space-y-4">
                {title && (
                  <motion.h1 
                    className="text-4xl md:text-6xl font-serif font-bold tracking-tight glow-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {title}
                  </motion.h1>
                )}
                
                {subtitle && (
                  <motion.p 
                    className="text-lg md:text-xl text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {subtitle}
                  </motion.p>
                )}
              </div>
            )}

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PageLayout;
