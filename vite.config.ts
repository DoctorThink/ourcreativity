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
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-select'],
            'animation-vendor': ['framer-motion'],
            'pages': ['./src/pages/KaryaKami.tsx', './src/pages/TimKami.tsx', './src/pages/Informasi.tsx']
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      },
      modulePreload: {
        polyfill: true
      },
      sourcemap: true,
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
