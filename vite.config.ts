
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/", // Ensure proper asset path resolution
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["54c4ca5d-fdb6-4e0e-a40e-5372c563e093.lovableproject.com"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true, // Enable source maps for Sentry
    rollupOptions: {
      output: {
        // Strategic code splitting for performance
        manualChunks: {
          // Vendor chunk for stable dependencies
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI library chunk
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast', 'framer-motion'],
          // Animation libraries
          animations: ['gsap'],
          // Query and state management
          query: ['@tanstack/react-query'],
          // Supabase and external services
          services: ['@supabase/supabase-js'],
        },
        // Optimized file naming with content hashing
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit for vendor chunks
    chunkSizeWarningLimit: 800,
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Sentry plugin must be last
    mode === 'production' && sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Allow case-sensitive imports
    preserveSymlinks: false
  },
}));
