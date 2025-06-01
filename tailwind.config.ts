
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
        // Enhanced font stacks for better readability
        serif: ["Montserrat", "Inter", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        // Enhanced responsive typography scale
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      fontWeight: {
        // Enhanced weight scale for better readability
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      borderRadius: {
        'ios': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer-gradient': "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)",
        'gradient-purple-orange': "linear-gradient(to right, var(--tw-gradient-stops))",
        'gradient-blue-cyan': "linear-gradient(to right, var(--tw-gradient-stops))",
        'founder-gradient': "linear-gradient(135deg, #FFBF00 0%, #FFA500 50%, #FF8C00 100%)",
      },
      keyframes: {
        "glow": {
          "0%, 100%": { textShadow: "0 0 12px rgba(229,222,255,0.9), 0 0 24px rgba(229,222,255,0.9)" },
          "50%": { textShadow: "0 0 24px rgba(229,222,255,0.9), 0 0 36px rgba(229,222,255,0.9)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.75" },
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
        // Enhanced spring-like animations
        "bounce-gentle": {
          "0%, 100%": { 
            transform: "translateY(0)", 
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" 
          },
          "50%": { 
            transform: "translateY(-8px)", 
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" 
          }
        },
        "scale-gentle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        }
      },
      animation: {
        "glow": "glow 2.5s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "rotate-slow": "rotate-slow 15s linear infinite",
        "morph": "morph 10s ease-in-out infinite",
        "shimmer": "shimmer 3.5s ease-in-out infinite",
        "gradient-cycle": "gradient-cycle 10s ease-in-out infinite",
        "theme-fade": "theme-fade 0.6s ease-in-out",
        "bounce-gentle": "bounce-gentle 2s infinite",
        "scale-gentle": "scale-gentle 3s ease-in-out infinite",
      },
      boxShadow: {
        'glow-sm': '0 0 12px 2px var(--tile-glow-color, rgba(255,255,255,0.12))',
        'glow-md': '0 0 24px 4px var(--tile-glow-color, rgba(255,255,255,0.18))',
        'glow-lg': '0 0 36px 6px var(--tile-glow-color, rgba(255,255,255,0.25))',
        'inner-subtle': 'inset 0 0 20px 0 rgba(0, 0, 0, 0.12)',
        'card-hover': '0 12px 30px -6px rgba(0, 0, 0, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        // Enhanced spacing scale for better proportions
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
