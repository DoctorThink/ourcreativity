import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? 'https://54c4ca5d-fdb6-4e0e-a40e-5372c563e093.lovableproject.com/' : '/';

  return {
    base: base, // Ensure proper asset path resolution
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["54c4ca5d-fdb6-4e0e-a40e-5372c563e093.lovableproject.com"],
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: undefined, // Disable manual chunk splitting for now
          // Ensure consistent casing in file names (all lowercase)
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      chunkSizeWarningLimit: 1000
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      // Allow case-sensitive imports
      preserveSymlinks: false
    },
  };
});
