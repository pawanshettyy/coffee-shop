import { useState, useEffect, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { lazy } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const Team = lazy(() => import('./pages/Team'))
const Cart = lazy(() => import('./pages/Cart'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-coffee/60">Loading...</p>
    </div>
  </div>
)

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  // Preload only critical above-the-fold images
  useEffect(() => {
    const criticalImages = [
      '/images/hero-coffee-main.jpg'  // Only preload hero image
    ]

    const preloadImages = criticalImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    })

    Promise.allSettled(preloadImages).then(() => {
      // Critical images preloaded
    })

    // Preload route components on idle
    const preloadRoutes = () => {
      import('./pages/Menu')
      import('./pages/Cart')
    }

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadRoutes)
    } else {
      setTimeout(preloadRoutes, 1000)
    }
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
            <Suspense fallback={<PageFallback />}>
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