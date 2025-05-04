
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type AdminAuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export const ADMIN_PASSWORD = "Ardelyo123$45";

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = sessionStorage.getItem("adminAuth");
        setIsAuthenticated(authStatus === "true");
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Add event listener for storage changes (in case of multiple tabs)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      // Simple password check
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuth", "true");
        
        // Log the login activity in Supabase
        try {
          await supabase.from('admin_activity_log').insert({
            action: 'login',
            details: 'Admin login successful',
            ip_address: 'client-side'
          });
        } catch (error) {
          console.error("Error logging admin activity:", error);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    try {
      setIsAuthenticated(false);
      sessionStorage.removeItem("adminAuth");
      
      // Log the logout activity in Supabase
      supabase.from('admin_activity_log').insert({
        action: 'logout',
        details: 'Admin logged out',
        ip_address: 'client-side'
      }).catch(error => {
        console.error("Error logging admin logout:", error);
      });
      
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An unexpected error occurred during logout",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
