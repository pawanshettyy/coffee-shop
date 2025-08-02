import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate loading time and critical resource loading
    const timer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(onComplete, 500) // Allow exit animation to complete
    }, 1500) // Reduced from longer loading time

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream via-white to-accent/10"
    >
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent to-coffee flex items-center justify-center"
          >
            <Coffee size={32} className="text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-bold text-coffee"
          >
            Brew & Bite
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-coffee/70 mt-2"
          >
            Crafting perfect moments
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-accent to-coffee rounded-full mx-auto"
          style={{ maxWidth: "200px" }}
        />
        
        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-coffee/60 mt-4 text-sm"
        >
          {isComplete ? "Ready to serve!" : "Brewing your experience..."}
        </motion.p>
      </div>
    </motion.div>
  )
}
