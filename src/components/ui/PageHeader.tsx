
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8 md:mb-12 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gradient font-extrabold tracking-tighter mb-4 text-balance"
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-foreground-muted max-w-2xl mx-auto text-balance"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default PageHeader;
