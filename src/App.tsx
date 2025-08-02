import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EnhancedLoader from './components/EnhancedLoader'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Team from './pages/Team'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  const handleLoadComplete = () => {
    setIsLoaded(true)
  }

  return (
    <>
      <EnhancedLoader onLoadComplete={handleLoadComplete} />
      {isLoaded && (
        <div className="bg-cream min-h-screen text-coffee font-sans">
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
        </div>
      )}
    </>
  )
}

export default function App() {
  return <AppContent />
}