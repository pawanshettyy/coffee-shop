import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Coffee, Star, Users, Award, ArrowRight, Play, Heart, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import HoverImage from '../components/HoverImage'
import ImageGrid from '../components/ImageGrid'
import Marquee from '../components/Marquee'
import ScrollText from '../components/ScrollText'
import Mystery3D from '../components/Mystery3D'
import TeamSection from '../components/TeamSection'

// Hero stats data
const heroStats = [
  { icon: Coffee, label: 'Cups Served', value: '50,000+', color: 'text-accent' },
  { icon: Users, label: 'Happy Customers', value: '5,000+', color: 'text-coffee' },
  { icon: Star, label: 'Average Rating', value: '4.9', color: 'text-yellow-500' },
  { icon: Award, label: 'Awards Won', value: '15+', color: 'text-accent' }
]

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Signature Blend',
    price: '₹449',
    originalPrice: '₹499',
    image: '/images/featured-signature-blend.jpg',
    rating: 4.9,
    isPopular: true
  },
  {
    id: 2,
    name: 'Cold Brew Supreme',
    price: '₹349',
    originalPrice: null,
    image: '/images/featured-cold-brew.jpg',
    rating: 4.8,
    isPopular: true
  },
  {
    id: 3,
    name: 'Caramel Macchiato',
    price: '₹449',
    originalPrice: null,
    image: '/images/featured-macchiato.jpg',
    rating: 4.7,
    isPopular: false
  }
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Coffee Enthusiast',
    content: 'The best coffee in town! Their signature blend is absolutely divine. The ambiance is perfect for work and relaxation.',
    rating: 5,
    avatar: '/images/testimonial-priya.jpg'
  },
  {
    id: 2,
    name: 'Rahul Gupta',
    role: 'Business Owner',
    content: 'I come here every morning before work. The baristas know my order by heart and the consistency is amazing.',
    rating: 5,
    avatar: '/images/testimonial-rahul.jpg'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Student',
    content: 'Perfect place for studying! Great wifi, comfortable seating, and the pastries are to die for. Highly recommended!',
    rating: 5,
    avatar: '/images/testimonial-ananya.jpg'
  }
]

// Process steps data
const processSteps = [
  {
    id: 1,
    title: 'Source',
    description: 'Premium beans from the finest plantations worldwide',
    icon: MapPin,
    image: '/images/process-source.jpg'
  },
  {
    id: 2,
    title: 'Roast',
    description: 'Expertly roasted to perfection in small batches',
    icon: Coffee,
    image: '/images/process-roast.jpg'
  },
  {
    id: 3,
    title: 'Brew',
    description: 'Crafted by skilled baristas with passion and precision',
    icon: Heart,
    image: '/images/process-brew.jpg'
  },
  {
    id: 4,
    title: 'Serve',
    description: 'Delivered fresh with love in every cup',
    icon: Clock,
    image: '/images/process-serve.jpg'
  }
]

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { scrollY } = useScroll()
  
  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const featuredY = useTransform(scrollY, [200, 700], [50, -50])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream overflow-hidden">
        
        {/* Hero Section */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="min-h-screen flex items-center justify-center relative px-4"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-coffee/10 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-2 mb-6"
              >
                <Coffee className="text-accent" size={20} />
                <span className="text-accent font-medium">Welcome to CoffeeCraft</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-coffee mb-6 leading-tight">
                Where Every{' '}
                <motion.span
                  className="text-accent relative"
                  animate={{ 
                    color: ['#C69C6D', '#4B2E2E', '#C69C6D'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Sip
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/30 rounded-full"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.span>
                {' '}Tells a Story
              </h1>
              
              <p className="text-lg lg:text-xl text-coffee/70 mb-8 leading-relaxed max-w-2xl">
                Experience the perfect blend of tradition and innovation. Our passionate baristas 
                craft each cup with premium beans sourced from the world's finest plantations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Explore Menu</span>
                    <ArrowRight 
                      size={20} 
                      className="group-hover:translate-x-1 transition-transform" 
                    />
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoPlaying(true)}
                  className="group border-2 border-coffee text-coffee hover:bg-coffee hover:text-cream px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Watch Our Story</span>
                </motion.button>
              </div>

              {/* Hero Stats */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {heroStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center group"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.color} bg-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <stat.icon size={24} />
                    </div>
                    <div className="text-2xl font-bold text-coffee mb-1">{stat.value}</div>
                    <div className="text-coffee/60 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                <HoverImage
                  src="/images/hero-coffee-main.jpg"
                  hoverSrc="/images/hero-coffee-pour.jpg"
                  alt="Premium Coffee"
                  className="w-full max-w-lg mx-auto"
                />
                
                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-semibold text-coffee">4.9 Rating</span>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 bg-accent text-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Cups Served</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Infinite Marquee */}
        <section className="mb-16">
          <Marquee />
        </section>

        {/* Scroll-based Text Animation - Enhanced */}
        <ScrollText />

        {/* Featured Products */}
        <motion.section
          style={{ y: featuredY }}
          className="py-20 relative"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-2 mb-6">
                <Coffee className="text-accent" size={20} />
                <span className="text-accent font-medium">Featured Products</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-coffee mb-6">
                Our Bestsellers
              </h2>
              <p className="text-lg text-coffee/70 max-w-2xl mx-auto">
                Discover our most loved coffee creations, crafted to perfection
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-${1500000000000 + product.id}?w=400&h=300&fit=crop`;
                      }}
                    />
                    {product.isPopular && (
                      <span className="absolute top-4 left-4 bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-coffee/60 ml-2">{product.rating}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-coffee mb-2">{product.name}</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-accent">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-coffee/50 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      
                      <Link to="/menu">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                        >
                          Order Now
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-r from-coffee to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Coffee Journey</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                From bean to cup, every step is carefully crafted to deliver the perfect coffee experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <img 
                      src={step.image}
                      alt={step.title}
                      className="w-20 h-20 rounded-2xl mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-${1500000000000 + step.id}?w=80&h=80&fit=crop`;
                      }}
                    />
                    <div className="absolute -top-2 -right-2 bg-white text-coffee rounded-full p-2 shadow-lg">
                      <step.icon size={16} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="opacity-90 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Grid Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-coffee mb-6">Our Gallery</h2>
              <p className="text-lg text-coffee/70 max-w-2xl mx-auto">
                Take a glimpse into our world of coffee craftsmanship and cozy ambiance
              </p>
            </motion.div>
            <ImageGrid />
          </div>
        </section>

        {/* 3D Mystery Element */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-coffee mb-6">Interactive Experience</h2>
              <p className="text-lg text-coffee/70 max-w-2xl mx-auto">
                Explore our 3D coffee experience - drag to rotate and discover the art of coffee making
              </p>
            </motion.div>
            <Mystery3D />
          </div>
        </section>

        {/* Team Preview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-coffee mb-6">Meet Our Baristas</h2>
              <p className="text-lg text-coffee/70 max-w-2xl mx-auto mb-8">
                The passionate people behind every perfect cup
              </p>
            </motion.div>
            <TeamSection />
            <div className="text-center mt-12">
              <Link to="/team">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <span>Meet Our Full Team</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-cream to-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-coffee mb-6">What Our Customers Say</h2>
              <p className="text-lg text-coffee/70">
                Don't just take our word for it - hear from our amazing community
              </p>
            </motion.div>

            <div className="relative">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={24} />
                  ))}
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-coffee/80 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-${1500000000000 + currentTestimonial}?w=100&h=100&fit=crop&crop=face`;
                    }}
                  />
                  <div className="text-left">
                    <div className="font-bold text-coffee text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-coffee/60">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentTestimonial ? 'bg-accent' : 'bg-coffee/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-coffee to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready for Your Perfect Cup?
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Visit us today and discover why we're the favorite coffee destination 
                for thousands of happy customers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-coffee hover:bg-cream px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                  >
                    <Coffee size={20} />
                    <span>Order Now</span>
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-coffee px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <MapPin size={20} />
                  <span>Find Us</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full aspect-video bg-coffee rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <Coffee size={64} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-2xl font-bold mb-2">Our Story Video</h3>
                  <p className="text-white/70">Coming Soon - The CoffeeCraft Journey</p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <Coffee size={24} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  )
}