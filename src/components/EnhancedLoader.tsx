import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Coffee, Wifi, WifiOff } from 'lucide-react'

interface LoaderProps {
  onLoadComplete?: () => void
}

export default function EnhancedLoader({ onLoadComplete }: LoaderProps) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const loadingSteps = [
    'Brewing fresh coffee...',
    'Warming up the espresso machine...',
    'Grinding premium beans...',
    'Preparing your experience...',
    'Almost ready!'
  ]

  useEffect(() => {
    // Network status monitoring
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15 + 5
        const newProgress = Math.min(prev + increment, 100)
        
        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1))
        
        if (newProgress >= 100) {
          setTimeout(() => {
            setLoading(false)
            onLoadComplete?.()
          }, 800)
          clearInterval(progressInterval)
        }
        
        return newProgress
      })
    }, 200)

    return () => {
      clearInterval(progressInterval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onLoadComplete, loadingSteps.length])

  const coffeeVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      rotate: -10
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8
      }
    },
    exit: { 
      scale: 1.2, 
      opacity: 0,
      rotate: 10,
      transition: {
        duration: 0.6
      }
    }
  }

  const steamVariants = {
    animate: {
      y: [-5, -15, -5],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  }

  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="enhanced-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.95,
            transition: { 
              duration: 0.8
            }
          }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-coffee via-coffee to-accent flex flex-col items-center justify-center text-cream overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-cream/20 rounded-full"></div>
            <div className="absolute top-40 right-40 w-24 h-24 border border-cream/20 rounded-full"></div>
            <div className="absolute bottom-32 left-1/3 w-40 h-40 border border-cream/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 border border-cream/20 rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            
            {/* Coffee Icon with Steam Animation */}
            <motion.div
              variants={coffeeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative mb-8"
            >
              <motion.div
                className="relative inline-block"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity
                  }
                }}
              >
                <Coffee size={80} className="text-accent drop-shadow-2xl" />
                
                {/* Steam Effects */}
                <motion.div 
                  variants={steamVariants}
                  animate="animate"
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                >
                  <div className="w-1 h-6 bg-cream/40 rounded-full"></div>
                </motion.div>
                <motion.div 
                  variants={steamVariants}
                  animate="animate"
                  style={{ animationDelay: '0.3s' }}
                  className="absolute -top-6 left-1/2 transform translate-x-1"
                >
                  <div className="w-1 h-4 bg-cream/30 rounded-full"></div>
                </motion.div>
                <motion.div 
                  variants={steamVariants}
                  animate="animate"
                  style={{ animationDelay: '0.6s' }}
                  className="absolute -top-6 left-1/2 transform -translate-x-3"
                >
                  <div className="w-1 h-5 bg-cream/35 rounded-full"></div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Brand */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.8
                }
              }}
              className="text-4xl lg:text-5xl font-bold mb-4 tracking-wide"
            >
              CoffeeCraft
            </motion.h1>

            {/* Loading Step */}
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg mb-8 text-cream/90 min-h-[28px]"
            >
              {loadingSteps[currentStep]}
            </motion.p>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mx-auto mb-6">
              <div className="flex justify-between text-sm text-cream/70 mb-2">
                <span>Loading</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-cream/20 rounded-full overflow-hidden">
                <motion.div
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  className="h-full bg-gradient-to-r from-accent to-cream rounded-full relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full"
                    animate={{
                      x: ['-100%', '100%'],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity
                      }
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Network Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center space-x-2 text-sm text-cream/60"
            >
              {isOnline ? (
                <>
                  <Wifi size={16} className="text-green-400" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <WifiOff size={16} className="text-red-400" />
                  <span>Offline Mode</span>
                </>
              )}
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              className="flex space-x-1 justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-cream/40 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom decorative elements */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-cream/50 text-xs">
              Crafting the perfect experience since 2020
            </p>
          </motion.div>

          {/* Side decorative coffee beans */}
          <motion.div
            className="absolute top-1/4 left-8 opacity-20"
            animate={{
              rotate: 360,
              transition: {
                duration: 20,
                repeat: Infinity
              }
            }}
          >
            <Coffee size={24} className="text-cream" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 right-8 opacity-20"
            animate={{
              rotate: -360,
              transition: {
                duration: 25,
                repeat: Infinity
              }
            }}
          >
            <Coffee size={28} className="text-cream" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}