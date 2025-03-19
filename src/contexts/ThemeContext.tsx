
import { ReactNode, createContext, useContext, useEffect } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always use dark theme
  const theme: Theme = "dark";

  // Apply dark theme class when component mounts
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove any existing theme classes and add dark
    root.classList.remove("light");
    root.classList.add("dark");
    
    // Remove from localStorage to ensure persistence
    localStorage.removeItem("theme");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
