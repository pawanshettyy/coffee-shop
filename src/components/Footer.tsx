import { motion } from 'framer-motion'
import { Coffee, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, Clock, Wifi, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' }
  ],
  menu: [
    { name: 'Coffee Menu', href: '/menu' },
    { name: 'Pastries', href: '/menu?category=pastries' },
    { name: 'Gift Cards', href: '/gift-cards' },
    { name: 'Catering', href: '/catering' }
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Nutrition Info', href: '/nutrition' },
    { name: 'Allergen Info', href: '/allergens' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' }
  ]
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/coffeecraft', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/coffeecraft', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/coffeecraft', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/coffeecraft', label: 'LinkedIn' }
]

const storeFeatures = [
  { icon: Wifi, text: 'Free WiFi' },
  { icon: CreditCard, text: 'Card Payments' },
  { icon: Clock, text: '6 AM - 11 PM' },
  { icon: Coffee, text: 'Fresh Roasted' }
]

export default function Footer() {
  return (
    <footer className="bg-coffee text-cream">
      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-b border-cream/10"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl font-bold mb-4"
            >
              Stay in the Loop ☕
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-cream/80 mb-8"
            >
              Get the latest updates on new blends, exclusive offers, and coffee brewing tips 
              delivered straight to your inbox.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-cream/10 border border-cream/20 text-cream placeholder-cream/60 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-cream/20 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <Coffee size={32} className="text-accent" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <span className="text-2xl font-bold">CoffeeCraft</span>
            </div>
            
            <p className="text-cream/80 mb-6 leading-relaxed">
              Crafting exceptional coffee experiences since 2020. From bean to cup, 
              we're passionate about delivering the perfect brew that brings people together.
            </p>

            {/* Store Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {storeFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 text-sm"
                >
                  <feature.icon size={16} className="text-accent" />
                  <span className="text-cream/80">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-10 h-10 bg-cream/10 hover:bg-accent/20 rounded-full flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-cream/80 group-hover:text-accent transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.href}
                    className="text-cream/80 hover:text-accent transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6">Menu</h4>
            <ul className="space-y-3">
              {footerLinks.menu.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.href}
                    className="text-cream/80 hover:text-accent transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.href}
                    className="text-cream/80 hover:text-accent transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-accent mt-1 flex-shrink-0" />
                <div className="text-cream/80 text-sm">
                  <p>123 Coffee Street</p>
                  <p>Bhayandar, Maharashtra</p>
                  <p>India - 401105</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <span className="text-cream/80 text-sm">+91 98765 43210</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <span className="text-cream/80 text-sm">hello@coffeecraft.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Store Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-cream/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center md:text-left">
              <h5 className="font-semibold mb-2">Store Hours</h5>
              <div className="text-cream/80 text-sm space-y-1">
                <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
                <p>Saturday - Sunday: 7:00 AM - 11:00 PM</p>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h5 className="font-semibold mb-2">Delivery Hours</h5>
              <div className="text-cream/80 text-sm space-y-1">
                <p>Monday - Sunday: 8:00 AM - 9:00 PM</p>
                <p>Average delivery: 25-30 minutes</p>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h5 className="font-semibold mb-2">Quick Links</h5>
              <div className="text-cream/80 text-sm space-y-1">
                <Link to="/menu" className="block hover:text-accent transition-colors">Order Online</Link>
                <Link to="/gift-cards" className="block hover:text-accent transition-colors">Gift Cards</Link>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h5 className="font-semibold mb-2">Download App</h5>
              <div className="text-cream/80 text-sm space-y-1">
                <p>Coming Soon on</p>
                <p>iOS & Android</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-cream/10"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-cream/80 text-sm flex items-center">
                © 2024 CoffeeCraft. Made with{' '}
                <Heart size={14} className="text-red-400 mx-1 fill-current" />
                By Pawan Shetty
              </p>
              
              <div className="flex items-center space-x-4 text-sm">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-cream/60 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-cream/60">
              <span>Powered by CoffeeCraft Technology</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}