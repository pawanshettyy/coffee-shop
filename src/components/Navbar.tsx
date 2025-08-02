import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Coffee, ShoppingBag, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Team', path: '/team' },
  { name: 'Cart', path: '/cart' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showBackendModal, setShowBackendModal] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isActive = (path: string) => location.pathname === path

  const BackendModal = () => (
    <AnimatePresence>
      {showBackendModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-coffee/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowBackendModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-coffee mb-2">Coming Soon!</h3>
              <p className="text-coffee/70">
                User authentication and profile management will be available once 
                backend integration is complete.
              </p>
            </div>
            <button
              onClick={() => setShowBackendModal(false)}
              className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -50 }} // Reduced from -100
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }} // Reduced from 0.6
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-accent/20'
            : 'bg-coffee/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <Coffee 
                    size={24} 
                    className={`sm:w-7 sm:h-7 transition-colors duration-300 ${
                      scrolled ? 'text-coffee' : 'text-cream'
                    } group-hover:text-accent`}
                  />
                  <motion.div
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <span className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                  scrolled ? 'text-coffee' : 'text-cream'
                } group-hover:text-accent`}>
                  CoffeeCraft
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.slice(0, 3).map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-full ${
                      isActive(link.path)
                        ? scrolled
                          ? 'text-cream bg-coffee shadow-lg'
                          : 'text-coffee bg-cream shadow-lg'
                        : scrolled
                          ? 'text-coffee hover:text-accent hover:bg-cream/10'
                          : 'text-cream hover:text-accent hover:bg-cream/10'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full border-2 border-accent"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBackendModal(true)}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  scrolled
                    ? 'text-coffee hover:bg-cream/20'
                    : 'text-cream hover:bg-cream/10'
                }`}
                aria-label="User Profile"
              >
                <User size={20} />
              </motion.button>
              
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full transition-colors duration-300 relative ${
                    scrolled
                      ? 'text-coffee hover:bg-cream/20'
                      : 'text-cream hover:bg-cream/10'
                  } ${isActive('/cart') ? 'bg-accent/20' : ''}`}
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag size={20} />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: cartCount > 0 ? 1 : 0 }}
                    className="absolute -top-1 -right-1 bg-accent text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {cartCount}
                  </motion.span>
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBackendModal(true)}
                className="bg-accent hover:bg-accent/90 text-cream px-4 lg:px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Order Now
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-full transition-colors duration-300 ${
                scrolled
                  ? 'text-coffee hover:bg-cream/20'
                  : 'text-cream hover:bg-cream/10'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-coffee/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 h-full w-72 max-w-[90vw] bg-cream shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-accent/20">
                  <div className="flex items-center space-x-2">
                    <Coffee size={24} className="text-coffee" />
                    <span className="text-lg font-bold text-coffee">CoffeeCraft</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                  >
                    <X size={20} className="text-coffee" />
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
                  <ul className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.path}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                      >
                        <Link
                          to={link.path}
                          className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                            isActive(link.path)
                              ? 'bg-coffee text-cream shadow-lg'
                              : 'text-coffee hover:bg-accent/10 hover:text-accent'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                          {link.path === '/cart' && cartCount > 0 && (
                            <span className="ml-auto bg-accent text-cream text-xs rounded-full px-2 py-1">
                              {cartCount}
                            </span>
                          )}
                          {isActive(link.path) && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-accent rounded-full"
                              layoutId="mobileDot"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Actions */}
                <div className="p-6 border-t border-accent/20 space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowBackendModal(true)
                      setIsOpen(false)
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-cream py-3 rounded-xl font-medium transition-colors duration-300 shadow-lg"
                  >
                    Order Now ☕
                  </motion.button>
                  
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowBackendModal(true)
                        setIsOpen(false)
                      }}
                      className="flex-1 flex items-center justify-center py-3 border border-accent/30 rounded-xl text-coffee hover:bg-accent/5 transition-colors"
                    >
                      <User size={18} className="mr-2" />
                      Profile
                    </motion.button>
                    
                    <Link
                      to="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex-1"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center py-3 border border-accent/30 rounded-xl text-coffee hover:bg-accent/5 transition-colors relative"
                      >
                        <ShoppingBag size={18} className="mr-2" />
                        Cart
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-accent text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-14 sm:h-16 lg:h-20" />
      
      <BackendModal />
    </>
  )
}