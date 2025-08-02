import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollText() {
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Calculate scale based on scroll position - starts at 1, grows to 3
      const newScale = Math.min(1 + (scrollY / 400), 3)
      
      // Calculate opacity to fade out as it gets very large
      const newOpacity = Math.max(1 - (scrollY / 1200), 0.3)
      
      setScale(newScale)
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-cream via-white to-cream sticky top-0 z-10 overflow-hidden">
      <motion.div
        style={{ 
          transform: `scale(${scale})`, 
          opacity,
          transition: 'all 0.1s ease-out' 
        }}
        className="text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-coffee leading-tight mb-4">
          Brew
          <span className="block text-accent">Something</span>
          <span className="block text-coffee/80">Extraordinary</span>
        </h1>
        <motion.p 
          className="text-lg md:text-xl text-coffee/60 font-medium"
          style={{ opacity: opacity * 0.8 }}
        >
          Every scroll brings you closer to perfection ☕
        </motion.p>
      </motion.div>
    </div>
  )
}
