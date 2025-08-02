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
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const extType = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(extType || '')) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
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
    target: 'esnext',
    // Optimize image assets
    assetsInlineLimit: 4096 // Inline smaller assets as base64
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    // Force pre-bundling of these packages
    force: true
  },
  // Server optimization for development
  server: {
    open: false,
    cors: true,
    port: 5174,
    // Enable compression
    middlewareMode: false
  },
  // Preview server settings
  preview: {
    port: 4173,
    cors: true
  },
  // Asset handling
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp']
})
