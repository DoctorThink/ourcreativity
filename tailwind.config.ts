
import type { Config } from "tailwindcss";

export default {
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
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: {
          DEFAULT: "var(--background)",
          dark: "#1C1C1E"
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          dark: "#FFFFFF"
        },
        primary: {
          DEFAULT: "#E5DEFF",
          foreground: "#333336",
          light: "#9B6DFF",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          dark: "#2C2C2E"
        },
        accent: {
          DEFAULT: "#FEC6A1",
          foreground: "#333336",
        },
        mint: "#98F5E1",
        lavender: "#E5DEFF",
        peach: "#FEC6A1",
        softPink: "#FFD1DC",
        amethyst: "#9B6DFF",
        turquoise: "#40E0D0",
        coral: "#FF7F50",
        amber: "#FFBF00",
        emerald: "#50C878",
        purpleLight: "#B197FC",
        purpleDark: "#7E57C2",
        orangeLight: "#FFA07A",
        orangeDark: "#FF6347",
        grayLight: "#CCCCCC",
        grayMid: "#8A898C",
        grayDark: "#555558",
        blueLight: "#87CEFA",
        blueDark: "#1E90FF",
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
        },
        "gradient-cycle": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "theme-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 12s linear infinite",
        "morph": "morph 8s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "gradient-cycle": "gradient-cycle 8s ease-in-out infinite",
        "theme-fade": "theme-fade 0.5s ease-in-out",
      },
      backgroundImage: {
        "shimmer-gradient": "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
        "gradient-purple-orange": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-blue-cyan": "linear-gradient(to right, var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
