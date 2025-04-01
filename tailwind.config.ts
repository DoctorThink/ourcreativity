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
          dark: "#0F0F0F"
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          dark: "#FFFFFF"
        },
        primary: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
          light: "#F5F5F5",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          dark: "#1A1A1A"
        },
        tone: {
          100: "#FFFFFF",
          200: "#F0F0F0",
          300: "#DEDEDE",
          400: "#BCBCBC",
          500: "#9D9D9D",
          600: "#757575", 
          700: "#545454",
          800: "#333333",
          900: "#171717",
          950: "#0A0A0A",
        },
        mint: "#E0E0E0",
        lavender: "#F5F5F5",
        peach: "#DEDEDE",
        softPink: "#CCCCCC",
        amethyst: "#BBBBBB",
        turquoise: "#A9A9A9",
        coral: "#999999",
        amber: "#888888",
        emerald: "#777777",
        purpleLight: "#666666",
        purpleDark: "#555555",
        orangeLight: "#444444",
        orangeDark: "#333333",
        grayLight: "#CCCCCC",
        grayMid: "#8A898C",
        grayDark: "#555558",
        blueLight: "#EEEEEE",
        blueDark: "#DDDDDD",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Space Grotesk", "Inter", "sans-serif"],
        display: ["Unbounded", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        'ios': '1.25rem',
        'topo': '2.5rem',
      },
      keyframes: {
        "glow": {
          "0%, 100%": { textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8)" },
          "50%": { textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.8)" }
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
        "text-rise": {
          "0%": { transform: "translateZ(0px)" },
          "100%": { transform: "translateZ(50px)" }
        },
        "layer-shift": {
          "0%": { transform: "translateY(0%) translateZ(0px)" },
          "100%": { transform: "translateY(-5%) translateZ(20px)" }
        },
        "path-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" }
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
        "text-rise": "text-rise 1s ease-out forwards",
        "layer-shift": "layer-shift 1.5s ease-out forwards",
        "path-draw": "path-draw 2s ease-in-out forwards",
      },
      backgroundImage: {
        "shimmer-gradient": "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
        "topo-light": "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,25 Q25,0 50,25 T100,25 L100,100 L0,100 Z' fill='%23f5f5f5' /%3E%3C/svg%3E\")",
        "topo-mid": "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q25,10 50,40 T100,40 L100,100 L0,100 Z' fill='%23e0e0e0' /%3E%3C/svg%3E\")",
        "topo-dark": "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 Q25,30 50,60 T100,60 L100,100 L0,100 Z' fill='%23cccccc' /%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
