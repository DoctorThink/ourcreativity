
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
  fullWidth?: boolean;
}

export const AppFooter: React.FC<FooterProps> = ({ className, fullWidth }) => {
  return (
    <footer className={cn("mt-auto pt-12 pb-6", className)}>
      <div className={cn(
        "container mx-auto px-4 sm:px-6",
        fullWidth ? "max-w-full" : "max-w-7xl"
      )}>
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png" 
                alt="Logo" 
                className="h-7 w-auto" 
              />
              <span className="text-foreground/70 text-sm font-medium">© 2025 OUR CREATIVITY. Hak Cipta Dilindungi.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
