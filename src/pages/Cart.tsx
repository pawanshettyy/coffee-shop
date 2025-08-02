import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  Tag, 
  CreditCard, 
  Truck, 
  Clock, 
  MapPin,
  ArrowLeft,
  Percent,
  CheckCircle,
  Coffee
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { useCart } from '../hooks/useCart'
import { type CouponCode } from '../context/CartContext'

// Image imports
import vanillaLatteImage from '/images/menu-iced-vanilla-latte.jpg'
import blueberryMuffinImage from '/images/menu-blueberry-muffin.jpg'
import coldBrewImage from '/images/menu-cold-brew.jpg'

const availableCoupons: CouponCode[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minAmount: 500,
    description: '10% off on orders above ₹500'
  },
  {
    code: 'FLAT50',
    discount: 50,
    type: 'fixed',
    minAmount: 300,
    description: '₹50 off on orders above ₹300'
  },
  {
    code: 'NEWUSER',
    discount: 15,
    type: 'percentage',
    minAmount: 400,
    description: '15% off for new users (min ₹400)'
  }
]

const suggestedItems = [
  {
    id: 9,
    name: 'Vanilla Latte',
    price: 399,
    image: vanillaLatteImage,
    rating: 4.6
  },
  {
    id: 10,
    name: 'Blueberry Muffin',
    price: 249,
    image: blueberryMuffinImage,
    rating: 4.3
  },
  {
    id: 11,
    name: 'Cold Brew',
    price: 349,
    image: coldBrewImage,
    rating: 4.7
  }
]

export default function Cart() {
  const [couponCode, setCouponCode] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showBackendModal, setShowBackendModal] = useState(false)
  
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    appliedCoupon, 
    setAppliedCoupon,
    subtotal,
    savings
  } = useCart()
  
  const couponDiscount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0

  const deliveryFee = subtotal > 500 ? 0 : 49
  const taxes = (subtotal - couponDiscount) * 0.05 // 5% tax
  const total = subtotal - couponDiscount + taxes + deliveryFee

  // Move to saved items (placeholder functionality)
  const moveToSaved = (id: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      // In a real app, this would save to a wishlist/saved items
      // For now, we'll just remove the item
      removeFromCart(id)
    }
  }

  // Apply coupon
  const applyCoupon = (coupon: CouponCode) => {
    if (subtotal >= coupon.minAmount) {
      setAppliedCoupon(coupon)
      setCouponCode(coupon.code)
    }
  }

  // Handle manual coupon input
  const handleCouponSubmit = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase())
    if (coupon && subtotal >= coupon.minAmount) {
      setAppliedCoupon(coupon)
    } else {
      // Show error - invalid coupon or minimum amount not met
      alert('Invalid coupon code or minimum amount not met')
    }
  }

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      setShowBackendModal(true)
    }, 2000)
  }

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
                Backend integration is in progress. Payment processing, order management, 
                and user accounts will be available soon.
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.3
      }
    }
  }

  if (cartItems.length === 0) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="text-accent" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-coffee mb-4">Your cart is empty</h2>
            <p className="text-coffee/70 mb-8">
              Looks like you haven't added any items to your cart yet. 
              Explore our menu and find your perfect coffee!
            </p>
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Browse Menu
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream">
        
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Link to="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-coffee hover:text-accent transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span>Continue Shopping</span>
                  </motion.button>
                </Link>
              </div>
              
              <div className="text-right">
                <h1 className="text-2xl lg:text-3xl font-bold text-coffee">Shopping Cart</h1>
                <p className="text-coffee/60">{cartItems.length} items</p>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      exit="exit"
                      layout
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-coffee mb-1">{item.name}</h3>
                              <p className="text-coffee/60 text-sm mb-2">Size: {item.size}</p>
                              
                              <div className="flex items-center space-x-2 mb-3">
                                <span className="text-lg font-bold text-accent">₹{item.price}</span>
                                {item.originalPrice && (
                                  <span className="text-sm text-coffee/50 line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => moveToSaved(item.id)}
                                  className="flex items-center space-x-1 text-sm text-coffee/60 hover:text-accent transition-colors"
                                >
                                  <Heart size={14} />
                                  <span>Save for later</span>
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="flex items-center space-x-1 text-sm text-red-500 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 size={14} />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors"
                              >
                                <Minus size={14} className="text-accent" />
                              </motion.button>
                              
                              <span className="w-8 text-center font-semibold text-coffee">
                                {item.quantity}
                              </span>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= (item.maxQuantity || 10)}
                                className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus size={14} className="text-accent" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Suggested Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h3 className="text-xl font-bold text-coffee mb-4">You might also like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-coffee mb-1">{item.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-bold">₹{item.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowBackendModal(true)}
                          className="bg-accent text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                        >
                          Add
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24"
              >
                {/* Coupon Section */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-bold text-coffee mb-4 flex items-center">
                    <Tag className="text-accent mr-2" size={20} />
                    Apply Coupon
                  </h3>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCouponSubmit}
                      className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                    >
                      Apply
                    </motion.button>
                  </div>

                  {appliedCoupon && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-green-800 font-medium">
                          Coupon "{appliedCoupon.code}" applied!
                        </span>
                      </div>
                      <p className="text-green-600 text-sm mt-1">
                        You saved ₹{couponDiscount.toFixed(0)}
                      </p>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm text-coffee/60 mb-2">Available offers:</p>
                    {availableCoupons
                      .filter(coupon => subtotal >= coupon.minAmount && coupon.code !== appliedCoupon?.code)
                      .map((coupon) => (
                        <motion.button
                          key={coupon.code}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => applyCoupon(coupon)}
                          className="w-full text-left p-3 border border-accent/20 rounded-xl hover:border-accent/40 hover:bg-accent/5 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-coffee">{coupon.code}</span>
                              <p className="text-sm text-coffee/60">{coupon.description}</p>
                            </div>
                            <Percent className="text-accent" size={16} />
                          </div>
                        </motion.button>
                      ))
                    }
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-coffee mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-coffee/70">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toFixed(0)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings</span>
                        <span>-₹{savings.toFixed(0)}</span>
                      </div>
                    )}
                    
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>-₹{couponDiscount.toFixed(0)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-coffee/70">Taxes (5%)</span>
                      <span className="font-medium">₹{taxes.toFixed(0)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-coffee/70 flex items-center">
                        Delivery Fee
                        {subtotal > 500 && (
                          <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            FREE
                          </span>
                        )}
                      </span>
                      <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600 line-through' : ''}`}>
                        ₹{deliveryFee.toFixed(0)}
                      </span>
                    </div>
                    
                    <hr className="border-accent/20" />
                    
                    <div className="flex justify-between text-lg font-bold text-coffee">
                      <span>Total</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                  </div>

                  {subtotal <= 500 && (
                    <div className="bg-accent/10 rounded-xl p-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Truck className="text-accent" size={16} />
                        <span className="text-sm text-coffee">
                          Add ₹{(500 - subtotal).toFixed(0)} more for FREE delivery
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Delivery Info */}
                  <div className="bg-cream/50 rounded-xl p-4 mb-6 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="text-accent" size={16} />
                      <span className="text-sm text-coffee">Delivery in 25-30 mins</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-accent" size={16} />
                      <span className="text-sm text-coffee">Delivering to current location</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-semibold text-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        <span>Proceed to Checkout</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-coffee/60 text-center mt-4">
                    By placing your order, you agree to our Terms & Conditions
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <BackendModal />
      </div>
    </PageWrapper>
  )
}