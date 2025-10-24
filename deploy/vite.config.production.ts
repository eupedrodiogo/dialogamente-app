import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Configuração otimizada para produção no Netlify
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Desabilitar sourcemaps em produção
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true, // Remove debuggers
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar bibliotecas grandes em chunks
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
          supabase: ['@supabase/supabase-js'],
          stripe: ['@stripe/stripe-js'],
        },
        // Nomear chunks de forma consistente
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Otimizações de performance
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // Inline assets menores que 4kb
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@supabase/supabase-js',
      '@stripe/stripe-js',
      'recharts',
    ],
  },
  define: {
    // Definir variáveis globais para produção
    __DEV__: false,
    'process.env.NODE_ENV': '"production"',
  },
  server: {
    // Configurações para preview local
    host: true,
    port: 4173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});