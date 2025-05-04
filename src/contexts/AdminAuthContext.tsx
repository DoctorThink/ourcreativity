
import React, { createContext, useContext, useState, useEffect } from "react";

type AdminAuthContextType = {
  isAuthenticated: boolean;
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

  useEffect(() => {
    // Check if admin is already authenticated from session storage
    const checkAuth = () => {
      const authStatus = sessionStorage.getItem("adminAuth");
      setIsAuthenticated(authStatus === "true");
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Add event listener for storage changes (in case of multiple tabs)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // Simple password check
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
