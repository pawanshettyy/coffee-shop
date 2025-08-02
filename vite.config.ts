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
          icons: ['lucide-react'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    },
    // Generate source maps for debugging but optimize for production
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
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
    exclude: [
      // Exclude heavy 3D libraries from pre-bundling for lazy loading
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  },
  // Server optimization for development
  server: {
    // Enable HTTP/2 for better performance
    open: false,
    cors: true
  }
})
