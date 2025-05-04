
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Akses ditolak",
        description: "Silahkan login terlebih dahulu",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-amethyst mx-auto" />
          <p className="text-foreground/70">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the login page with the return url
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
