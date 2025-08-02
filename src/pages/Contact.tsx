import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Coffee, 
  MessageCircle,
  Headphones,
  CheckCircle
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

// Contact form data type
interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  category: string
}

// Contact categories
const contactCategories = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'order', label: 'Order Support' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'careers', label: 'Careers' },
  { value: 'catering', label: 'Catering Services' }
]

// Store locations
const storeLocations = [
  {
    id: 1,
    name: 'CoffeeCraft Bhayandar',
    address: '123 Coffee Street, Bhayandar West, Maharashtra 401105',
    phone: '+91 98765 43210',
    email: 'bhayandar@coffeecraft.com',
    hours: {
      weekdays: '6:00 AM - 10:00 PM',
      weekends: '7:00 AM - 11:00 PM'
    },
    image: '/images/store-bhayandar.jpg',
    isMain: true
  },
  {
    id: 2,
    name: 'CoffeeCraft Mira Road',
    address: '456 Brew Avenue, Mira Road East, Maharashtra 401107',
    phone: '+91 98765 43211',
    email: 'miraroad@coffeecraft.com',
    hours: {
      weekdays: '7:00 AM - 10:00 PM',
      weekends: '7:00 AM - 11:00 PM'
    },
    image: '/images/store-miraroad.jpg',
    isMain: false
  }
]

// FAQ data
const faqs = [
  {
    question: 'What are your delivery hours?',
    answer: 'We deliver from 8:00 AM to 9:00 PM, Monday through Sunday. Average delivery time is 25-30 minutes.'
  },
  {
    question: 'Do you offer catering services?',
    answer: 'Yes! We provide catering services for corporate events, parties, and special occasions. Contact us for custom packages.'
  },
  {
    question: 'Are your coffee beans organic?',
    answer: 'We source premium beans from certified organic farms. Our signature blends are 100% organic and ethically sourced.'
  },
  {
    question: 'Do you have loyalty programs?',
    answer: 'Yes, our CoffeeCraft Rewards program offers points for every purchase, exclusive discounts, and early access to new products.'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedStore, setSelectedStore] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessModal(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      })
    }, 2000)
  }

  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-coffee/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSuccessModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-coffee mb-2">Message Sent!</h3>
              <p className="text-coffee/70">
                Thank you for reaching out! We'll get back to you within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
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
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream">
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 lg:py-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-2 mb-6"
          >
            <MessageCircle className="text-accent" size={20} />
            <span className="text-accent font-medium">Get in Touch</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-coffee mb-6">
            We'd Love to{' '}
            <motion.span
              className="text-accent"
              animate={{ color: ['#C69C6D', '#4B2E2E', '#C69C6D'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hear
            </motion.span>
            {' '}From You
          </h1>
          
          <p className="text-lg lg:text-xl text-coffee/70 max-w-3xl mx-auto leading-relaxed">
            Have questions about our coffee, need catering services, or just want to share feedback? 
            Our friendly team is here to help make your coffee experience exceptional.
          </p>
        </motion.section>

        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Send className="text-accent" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-coffee">Send us a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-coffee font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-coffee font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-coffee font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-coffee font-medium mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      >
                        {contactCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-coffee font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-coffee font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-semibold text-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Contact Info & Store Locations */}
            <div className="lg:col-span-1 space-y-8">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Headphones className="text-accent" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-coffee">Quick Contact</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors">
                    <Phone className="text-accent" size={20} />
                    <div>
                      <p className="font-medium text-coffee">Call Us</p>
                      <p className="text-sm text-coffee/70">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors">
                    <Mail className="text-accent" size={20} />
                    <div>
                      <p className="font-medium text-coffee">Email Us</p>
                      <p className="text-sm text-coffee/70">hello@coffeecraft.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors">
                    <Clock className="text-accent" size={20} />
                    <div>
                      <p className="font-medium text-coffee">Support Hours</p>
                      <p className="text-sm text-coffee/70">9 AM - 9 PM (Daily)</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Store Locations */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-coffee">Visit Our Stores</h3>
                </div>

                <div className="space-y-4">
                  {storeLocations.map((store, index) => (
                    <motion.div
                      key={store.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedStore === index
                          ? 'border-accent bg-accent/5'
                          : 'border-accent/20 hover:border-accent/40'
                      }`}
                      onClick={() => setSelectedStore(index)}
                    >
                      {store.isMain && (
                        <span className="inline-block bg-accent text-white text-xs px-2 py-1 rounded-full mb-2">
                          Main Store
                        </span>
                      )}
                      
                      <h4 className="font-semibold text-coffee mb-2">{store.name}</h4>
                      <p className="text-sm text-coffee/70 mb-2">{store.address}</p>
                      
                      <div className="flex items-center justify-between text-xs text-coffee/60">
                        <span>{store.phone}</span>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{store.hours.weekdays}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-coffee mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-coffee/70 max-w-2xl mx-auto">
                Find quick answers to common questions about our coffee, services, and policies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left flex items-center justify-between"
                  >
                    <h3 className="font-semibold text-coffee pr-4">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 45 : 0 }}
                      className="flex-shrink-0"
                    >
                      <Coffee className="text-accent" size={20} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-coffee/70 mt-4 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        <SuccessModal />
      </div>
    </PageWrapper>
  )
}