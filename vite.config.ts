import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    },
    // Generate source maps for debugging but optimize for production
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Minify for production
    minify: 'esbuild',
    // Target modern browsers for better optimization
    target: 'esnext'
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ]
  },
  // Server optimization for development
  server: {
    open: false,
    cors: true,
    port: 5174
  },
  // Preview server settings
  preview: {
    port: 4173,
    cors: true
  }
})
