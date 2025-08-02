import { motion } from 'framer-motion'
import { Coffee, Home, ArrowLeft, Search, MapPin, Users, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const popularPages = [
  { name: 'Menu', path: '/menu', icon: Coffee },
  { name: 'Our Team', path: '/team', icon: Users },
  { name: 'Contact Us', path: '/contact', icon: MapPin },
  { name: 'Cart', path: '/cart', icon: ShoppingBag }
]

const suggestions = [
  'Try our signature espresso blend',
  'Check out our fresh pastries',
  'Meet our talented baristas',
  'Find our store locations'
]

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              {/* Large 404 */}
              <motion.h1
                className="text-8xl lg:text-9xl font-bold text-coffee/20 select-none"
                animate={{ 
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 4, repeat: Infinity }
                }}
              >
                404
              </motion.h1>
              
              {/* Coffee cup in the middle of 0 */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 3, repeat: Infinity }
                }}
              >
                <div className="relative">
                  <Coffee size={64} className="text-accent drop-shadow-lg" />
                  
                  {/* Steam animation */}
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      style={{ left: `${50 + (index - 1) * 8}%` }}
                      animate={{
                        y: [-10, -20, -10],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }
                      }}
                    >
                      <div className="w-1 h-4 bg-accent/40 rounded-full"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-coffee mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-coffee/70 mb-2">
              Looks like this page went on a coffee break and never came back!
            </p>
            <p className="text-coffee/60">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="text-accent" size={24} />
                <h3 className="text-lg font-semibold text-coffee">Quick Search</h3>
              </div>
              <div className="text-left space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    className="flex items-center space-x-2 text-coffee/70"
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    <span className="text-sm">{suggestion}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Home size={20} className="group-hover:scale-110 transition-transform" />
                <span>Go Home</span>
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="group border-2 border-coffee text-coffee hover:bg-coffee hover:text-cream px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-2"
            >
              <ArrowLeft size={20} className="group-hover:scale-110 transition-transform" />
              <span>Go Back</span>
            </motion.button>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-coffee mb-6">
              Or explore these popular pages
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {popularPages.map((page, index) => (
                <Link key={page.path} to={page.path}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white hover:bg-accent/5 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center group"
                  >
                    <div className="w-12 h-12 bg-accent/10 group-hover:bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                      <page.icon className="text-accent" size={24} />
                    </div>
                    <span className="text-coffee font-medium group-hover:text-accent transition-colors">
                      {page.name}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 p-6 bg-gradient-to-r from-accent/10 to-coffee/10 rounded-2xl"
          >
            <p className="text-coffee/60 text-sm">
              <strong>Fun Fact:</strong> Did you know that 404 errors are named after room 404 
              at CERN where the web was invented? Just like how our coffee was invented in our cozy corner booth! ☕
            </p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}