import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : './',
  server: {
    host: "::",
    port: 8080
  },
  preview: {
    host: true,
    port: 4173
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          ui: [
            '@radix-ui/react-tabs',
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast'
          ]
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name.replace(/node_modules|[\\/]/g, '');
          return `assets/${name}.[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name?.replace(/[\\/]/g, '') || '';
          return `assets/${name}.[hash][extname]`;
        },
        entryFileNames: 'assets/[name].[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production'
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion',
      '@radix-ui/react-tabs',
      '@radix-ui/react-dialog',
      '@radix-ui/react-toast'
    ]
  }
}));
