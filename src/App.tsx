import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Loader from './components/Loader'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Team from './pages/Team'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader />
      {isLoaded && (
        <div className="bg-cream min-h-screen text-coffee font-sans">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
