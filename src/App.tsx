import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { preloadImages, CRITICAL_IMAGES, NON_CRITICAL_IMAGES } from './utils/imageOptimization'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Lazy load pages for better code splitting
const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const Team = lazy(() => import('./pages/Team'))
const Cart = lazy(() => import('./pages/Cart'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  // Optimized image preloading based on current route
  useEffect(() => {
    let prefetchTimer: NodeJS.Timeout | undefined
    
    // Only preload hero images when on home page
    if (location.pathname === '/') {
      preloadImages(
        CRITICAL_IMAGES.map(src => ({ src, priority: 'high' }))
      )
      
      // Prefetch other home page images after delay
      prefetchTimer = setTimeout(() => {
        preloadImages(
          NON_CRITICAL_IMAGES.slice(0, 6).map(src => ({ src, priority: 'low' }))
        )
      }, 2000)
    }
    
    return () => {
      if (prefetchTimer) clearTimeout(prefetchTimer)
    }
  }, [location.pathname])

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
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin text-4xl">☕</div></div>}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/team" element={<Team />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
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