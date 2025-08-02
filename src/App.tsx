import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { preloadImages, CRITICAL_IMAGES, NON_CRITICAL_IMAGES } from './utils/imageOptimization'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Import pages directly (no lazy loading to avoid issues)
import Home from './pages/Home'
import Menu from './pages/Menu'
import Team from './pages/Team'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  // Optimized image preloading based on current route
  useEffect(() => {
    // Only preload hero images when on home page
    if (location.pathname === '/') {
      preloadImages(
        CRITICAL_IMAGES.map(src => ({ src, priority: 'high' }))
      )
      
      // Prefetch other home page images after delay
      const prefetchTimer = setTimeout(() => {
        preloadImages(
          NON_CRITICAL_IMAGES.slice(0, 6).map(src => ({ src, priority: 'low' }))
        )
      }, 2000)
      
      return () => clearTimeout(prefetchTimer)
    }
  }, [location.pathname])

  // Preload route components only after initial load
  useEffect(() => {
    const preloadRoutes = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          import('./pages/Menu')
          import('./pages/Cart')
        }, { timeout: 2000 })
        
        // Preload less critical routes even later
        setTimeout(() => {
          import('./pages/Team')
          import('./pages/Contact')
        }, 4000)
      }
    }

    // Start route preloading after a delay
    const timer = setTimeout(preloadRoutes, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLoadComplete = () => {
    setIsLoaded(true)
  }

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <Preloader onComplete={handleLoadComplete} />}
      </AnimatePresence>
      
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-cream min-h-screen text-coffee font-sans"
        >
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/team" element={<Team />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}