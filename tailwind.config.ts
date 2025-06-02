import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // Ensure this covers where the IndexPage component is located
  ],
  prefix: "",
  darkMode: "class", // Important for dark mode variants like dark:bg-background-dark to work
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
        border: "hsl(var(--border) / <alpha-value>)", // Define --border in your global CSS
        input: "hsl(var(--input) / <alpha-value>)",   // Define --input in your global CSS
        ring: "hsl(var(--ring) / <alpha-value>)",     // Define --ring in your global CSS
        background: {
          DEFAULT: "var(--background)", // Define --background in your global CSS e.g. hsl(0 0% 100%)
          dark: "#1C1C1E"               // Use this directly or var(--background-dark)
        },
        foreground: {
          DEFAULT: "var(--foreground)", // Define --foreground in your global CSS e.g. hsl(222.2 84% 4.9%)
          dark: "#FFFFFF"               // Use this directly or var(--foreground-dark)
        },
        primary: { // Used for branding elements
          DEFAULT: "#E5DEFF", // Light lavender, good for backgrounds with dark text
          foreground: "#333336", // Dark text for primary background
          light: "#9B6DFF", // Amethyst, good for accents or highlights
        },
        secondary: { // Used for less prominent elements
          DEFAULT: "var(--secondary)", // Define --secondary in your global CSS e.g. hsl(210 40% 96.1%)
          foreground: "var(--secondary-foreground)", // Define --secondary-foreground e.g. hsl(215.4 16.3% 46.9%)
          dark: "#2C2C2E" // Darker secondary background for dark mode
        },
        accent: { // Used for call-to-actions or highlights
          DEFAULT: "#FEC6A1", // Peach
          foreground: "#333336", // Dark text for accent background
        },
        // Custom palette colors
        mint: "#98F5E1",
        lavender: "#E5DEFF", // Same as primary.DEFAULT
        peach: "#FEC6A1",   // Same as accent.DEFAULT
        softPink: "#FFD1DC",
        amethyst: "#9B6DFF", // Same as primary.light
        turquoise: "#40E0D0",
        coral: "#FF7F50",
        amber: "#FFBF00",
        emerald: "#50C878", // Added for completeness from bentoTiles
        // Grayscale (ensure these don't conflict with default Tailwind gray if you use both)
        // It's often better to use Tailwind's `colors.gray` and customize its shades if needed
        // Or prefix these like `customGrayLight` to avoid conflict
        grayLight: "#CCCCCC",
        grayMid: "#8A898C",
        grayDark: "#555558",
        // Blues
        blueLight: "#87CEFA",
        blueDark: "#1E90FF",
        // Oranges (can conflict with Tailwind's default orange, consider prefixing)
        orangeLight: "#FFA07A",
        orangeDark: "#FF6347",
        // Purples (can conflict with Tailwind's default purple, consider prefixing)
        purpleLight: "#B197FC",
        purpleDark: "#7E57C2",
        
        // Example: To avoid conflicts with default Tailwind colors, you could do:
        // custom: {
        //   grayLight: "#CCCCCC",
        //   purpleLight: "#B197FC",
        // }
        // Then use them as `bg-custom-grayLight`

        // For gradients used in BentoTiles (if not using default Tailwind shades directly)
        // These are already defined above, but ensure consistency
        // "red-500", "pink-600", "teal-600" etc. are default Tailwind colors.
        // If you need specific shades not in default Tailwind, define them here.
      },
      fontFamily: {
        serif: ["SF Pro Display", "Playfair Display", "serif"],
        sans: ["SF Pro Text", "Inter", "sans-serif"],
      },
      borderRadius: {
        'ios': '1.25rem', // Example: 20px for iOS-like rounding
        // Tailwind's default (sm, md, lg, xl, 2xl, 3xl, full) are usually sufficient
        // You can add more specific ones if needed:
        // 'xl': '1rem', // Overriding default xl if necessary
        // '2xl': '1.5rem' // Overriding default 2xl
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer-gradient': "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
        'gradient-purple-orange': "linear-gradient(to right, var(--tw-gradient-stops))", // Define stops in HTML or CSS
        'gradient-blue-cyan': "linear-gradient(to right, var(--tw-gradient-stops))", // Define stops in HTML or CSS
        'founder-gradient': "linear-gradient(135deg, #FFBF00 0%, #FFA500 50%, #FF8C00 100%)", // amber, orange, darkOrange
      },
      backgroundSize: {
        '300%': '300% 300%', // For gradient animations
      },
      keyframes: {
        "glow": {
          "0%, 100%": { textShadow: "0 0 10px rgba(229,222,255,0.8), 0 0 20px rgba(229,222,255,0.8)" }, // Uses lavender color
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
        "gradient-cycle": { // Used in the React component
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
        "gradient-cycle": "gradient-cycle 8s ease-in-out infinite", // Used in the React component
        "theme-fade": "theme-fade 0.5s ease-in-out",
      },
      boxShadow: {
        'glow-sm': '0 0 10px 1px var(--tile-glow-color, rgba(255,255,255,0.1))',
        'glow-md': '0 0 20px 3px var(--tile-glow-color, rgba(255,255,255,0.15))',
        'glow-lg': '0 0 30px 5px var(--tile-glow-color, rgba(255,255,255,0.2))',
        'inner-subtle': 'inset 0 0 15px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
