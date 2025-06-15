
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 mb-8 md:mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left w-full">
          {location.pathname !== '/' && (
            <motion.button
              onClick={handleBackClick}
              className="mb-4 hidden lg:inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium group"
              whileHover={{ x: -2 }}
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali</span>
            </motion.button>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-2 md:mb-3 text-center md:text-left">{title}</h1>
          {subtitle && <p className="text-foreground/80 text-lg md:text-xl font-sans text-center md:text-left">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};
