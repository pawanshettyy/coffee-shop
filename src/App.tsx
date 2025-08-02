import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './context/CartContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Team from './pages/Team'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  // Preload critical images for faster loading
  useEffect(() => {
    const criticalImages = [
      '/images/hero-coffee-main.jpg',
      '/images/menu-espresso.jpg',
      '/images/menu-caramel-macchiato.jpg',
      '/images/menu-cold-brew.jpg'
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