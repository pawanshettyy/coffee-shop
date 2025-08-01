import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = ['Home', 'Menu', 'Team']

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="relative z-50 w-full">
      <div className="flex items-center justify-between px-6 py-4 bg-coffee text-cream">
        <h1 className="text-2xl font-bold">
          <Link to="/">CoffeeCraft</Link>
        </h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <nav className="hidden md:flex gap-6 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              className="hover:underline"
            >
              {link}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-coffee text-cream px-6 pb-4 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className="text-lg border-b border-cream/20 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
