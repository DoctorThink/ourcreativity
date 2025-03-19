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
        }
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;