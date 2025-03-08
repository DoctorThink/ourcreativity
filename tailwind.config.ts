
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#1C1C1E",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#E5DEFF",
          foreground: "#1C1C1E",
        },
        secondary: {
          DEFAULT: "#2C2C2E",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FEC6A1",
          foreground: "#1C1C1E",
        },
        mint: "#98F5E1",
        lavender: "#E5DEFF",
        peach: "#FEC6A1",
        softPink: "#FFD1DC",
        // New expanded color palette
        amethyst: "#9B6DFF",
        turquoise: "#40E0D0",
        coral: "#FF7F50",
        amber: "#FFBF00",
        emerald: "#50C878",
      },
      fontFamily: {
        serif: ["SF Pro Display", "Playfair Display", "serif"],
        sans: ["SF Pro Text", "Inter", "sans-serif"],
      },
      borderRadius: {
        'ios': '1.25rem',
      },
      keyframes: {
        "glow": {
          "0%, 100%": { textShadow: "0 0 10px rgba(229,222,255,0.8), 0 0 20px rgba(229,222,255,0.8)" },
          "50%": { textShadow: "0 0 20px rgba(229,222,255,0.8), 0 0 30px rgba(229,222,255,0.8)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        // New animations for micro-interactions
        "pulse-soft": {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" }
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "morph": {
          "0%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        // New animations
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 12s linear infinite",
        "morph": "morph 8s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite"
      },
      backgroundImage: {
        "shimmer-gradient": "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
