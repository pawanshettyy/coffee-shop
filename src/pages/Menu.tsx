import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Coffee, Filter, Star, Heart, ShoppingCart, Plus, Minus, Search, Clock, Thermometer } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import LazyImage from '../components/LazyImage'
import { useCart } from '../hooks/useCart'
import { preloadImage } from '../utils/imageOptimization'

// Image imports
import espressoImage from '/images/menu-espresso.jpg'
import caramelMacchiatoImage from '/images/menu-caramel-macchiato.jpg'
import vanillaLatteImage from '/images/menu-iced-vanilla-latte.jpg'
import coldBrewImage from '/images/menu-cold-brew.jpg'
import chocolateCroissantImage from '/images/menu-chocolate-croissant.jpg'
import cappuccinoImage from '/images/menu-cappuccino.jpg'
import matchaLatteImage from '/images/menu-matcha-latte.jpg'
import blueberryMuffinImage from '/images/menu-blueberry-muffin.jpg'

// Type definitions
interface Size {
  name: string
  price: number
}

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number | null
  description: string
  image: string
  rating: number
  reviews: number
  prepTime: string
  isPopular: boolean
  isFavorite: boolean
  ingredients: string[]
  allergens: string[]
  nutritionInfo: {
    calories: number
    caffeine: string
  }
  sizes: Size[]
}

// Menu categories
const categories = [
  { id: 'all', name: 'All Items', icon: Coffee },
  { id: 'hot-coffee', name: 'Hot Coffee', icon: Thermometer },
  { id: 'cold-coffee', name: 'Cold Coffee', icon: Coffee },
  { id: 'pastries', name: 'Pastries', icon: Heart },
  { id: 'specialty', name: 'Specialty', icon: Star }
]

// Enhanced menu items with detailed information
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Espresso',
    category: 'hot-coffee',
    price: 299,
    originalPrice: null,
    description: 'Rich, full-bodied espresso shot with a perfect golden crema',
    image: espressoImage,
    rating: 4.8,
    reviews: 124,
    prepTime: '2-3 min',
    isPopular: true,
    isFavorite: false,
    ingredients: ['Premium Arabica Beans', 'Filtered Water'],
    allergens: [],
    nutritionInfo: { calories: 5, caffeine: '75mg' },
    sizes: [
      { name: 'Single', price: 299 },
      { name: 'Double', price: 399 }
    ]
  },
  {
    id: 2,
    name: 'Caramel Macchiato',
    category: 'hot-coffee',
    price: 449,
    originalPrice: 499,
    description: 'Espresso with steamed milk, vanilla syrup, and caramel drizzle',
    image: caramelMacchiatoImage,
    rating: 4.9,
    reviews: 89,
    prepTime: '4-5 min',
    isPopular: true,
    isFavorite: true,
    ingredients: ['Espresso', 'Steamed Milk', 'Vanilla Syrup', 'Caramel Sauce'],
    allergens: ['Milk'],
    nutritionInfo: { calories: 240, caffeine: '75mg' },
    sizes: [
      { name: 'Small', price: 399 },
      { name: 'Medium', price: 449 },
      { name: 'Large', price: 499 }
    ]
  },
  {
    id: 3,
    name: 'Iced Vanilla Latte',
    category: 'cold-coffee',
    price: 399,
    originalPrice: null,
    description: 'Smooth espresso with cold milk and vanilla syrup over ice',
    image: vanillaLatteImage,
    rating: 4.7,
    reviews: 156,
    prepTime: '3-4 min',
    isPopular: false,
    isFavorite: false,
    ingredients: ['Espresso', 'Cold Milk', 'Vanilla Syrup', 'Ice'],
    allergens: ['Milk'],
    nutritionInfo: { calories: 190, caffeine: '75mg' },
    sizes: [
      { name: 'Medium', price: 399 },
      { name: 'Large', price: 449 }
    ]
  },
  {
    id: 4,
    name: 'Cold Brew Supreme',
    category: 'cold-coffee',
    price: 349,
    originalPrice: null,
    description: 'Smooth, less acidic coffee brewed cold for 12 hours',
    image: coldBrewImage,
    rating: 4.6,
    reviews: 78,
    prepTime: '1-2 min',
    isPopular: true,
    isFavorite: false,
    ingredients: ['Cold Brew Coffee', 'Filtered Water'],
    allergens: [],
    nutritionInfo: { calories: 10, caffeine: '200mg' },
    sizes: [
      { name: 'Medium', price: 349 },
      { name: 'Large', price: 399 }
    ]
  },
  {
    id: 5,
    name: 'Chocolate Croissant',
    category: 'pastries',
    price: 299,
    originalPrice: null,
    description: 'Flaky, buttery croissant filled with rich dark chocolate',
    image: chocolateCroissantImage,
    rating: 4.5,
    reviews: 92,
    prepTime: '2-3 min',
    isPopular: false,
    isFavorite: true,
    ingredients: ['Flour', 'Butter', 'Dark Chocolate', 'Eggs'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    nutritionInfo: { calories: 280, caffeine: '0mg' },
    sizes: [{ name: 'Regular', price: 299 }]
  },
  {
    id: 6,
    name: 'Signature Blend Cappuccino',
    category: 'specialty',
    price: 549,
    originalPrice: null,
    description: 'Our house blend with perfectly steamed milk and artistic foam',
    image: cappuccinoImage,
    rating: 4.9,
    reviews: 203,
    prepTime: '5-6 min',
    isPopular: true,
    isFavorite: false,
    ingredients: ['House Blend Espresso', 'Steamed Milk', 'Milk Foam'],
    allergens: ['Milk'],
    nutritionInfo: { calories: 120, caffeine: '75mg' },
    sizes: [
      { name: 'Small', price: 449 },
      { name: 'Medium', price: 549 }
    ]
  },
  {
    id: 7,
    name: 'Matcha Green Tea Latte',
    category: 'specialty',
    price: 499,
    originalPrice: null,
    description: 'Premium matcha powder with steamed milk and light sweetness',
    image: matchaLatteImage,
    rating: 4.4,
    reviews: 67,
    prepTime: '4-5 min',
    isPopular: false,
    isFavorite: false,
    ingredients: ['Matcha Powder', 'Steamed Milk', 'Sugar'],
    allergens: ['Milk'],
    nutritionInfo: { calories: 190, caffeine: '70mg' },
    sizes: [
      { name: 'Medium', price: 499 },
      { name: 'Large', price: 549 }
    ]
  },
  {
    id: 8,
    name: 'Blueberry Muffin',
    category: 'pastries',
    price: 249,
    originalPrice: null,
    description: 'Fresh baked muffin bursting with juicy blueberries',
    image: blueberryMuffinImage,
    rating: 4.3,
    reviews: 45,
    prepTime: '1-2 min',
    isPopular: false,
    isFavorite: false,
    ingredients: ['Flour', 'Blueberries', 'Sugar', 'Butter', 'Eggs'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    nutritionInfo: { calories: 320, caffeine: '0mg' },
    sizes: [{ name: 'Regular', price: 249 }]
  }
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([2, 5])
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular')
  const [showFilters, setShowFilters] = useState(false)
  
  const { addToCart: addToCartContext, cartItems, subtotal } = useCart()
  const navigate = useNavigate()

  // Preload menu images for faster loading - very conservative approach
  useEffect(() => {
    // Only preload the first 2 visible menu item images with high priority
    const timer = setTimeout(() => {
      const visibleImages = menuItems.slice(0, 2).map(item => item.image)
      visibleImages.forEach(src => preloadImage(src, 'high'))
    }, 500) // Small delay to ensure page is loaded
    
    // Preload next batch of images with low priority after a longer delay
    const timer2 = setTimeout(() => {
      const nextBatchImages = menuItems.slice(2, 6).map(item => item.image)
      nextBatchImages.forEach(src => preloadImage(src, 'low'))
    }, 3000) // Longer delay to ensure images are actually needed
    
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  // Memoized filter and sort menu items for better performance
  const filteredItems = useMemo(() => {
    return menuItems
      .filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'rating':
            return b.rating - a.rating
          case 'popular':
          default:
            return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
        }
      })
  }, [activeCategory, searchQuery, sortBy])

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleAddToCart = (item: MenuItem, selectedSize: string, quantity: number = 1) => {
    const sizeInfo = item.sizes.find((s: Size) => s.name === selectedSize)
    const cartItem = {
      productId: item.id,
      name: `${item.name}`,
      price: sizeInfo?.price || item.price,
      quantity,
      size: selectedSize,
      image: item.image,
      category: item.category,
      maxQuantity: 10
    }
    
    addToCartContext(cartItem)
    setSelectedItem(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

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
            <Coffee className="text-accent" size={20} />
            <span className="text-accent font-medium">Our Menu</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-coffee mb-6">
            Crafted with{' '}
            <motion.span
              className="text-accent"
              animate={{ color: ['#C69C6D', '#4B2E2E', '#C69C6D'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Passion
            </motion.span>
          </h1>
          
          <p className="text-lg lg:text-xl text-coffee/70 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover our carefully curated selection of premium coffees, artisanal pastries, 
            and specialty drinks, each crafted to perfection by our expert baristas.
          </p>

          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coffee/40" size={20} />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
              >
                <Filter size={18} />
                <span>Filters</span>
              </motion.button>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-lg mb-8 overflow-hidden"
                >
                  <h3 className="text-lg font-semibold text-coffee mb-4">Sort by:</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: 'popular', label: 'Most Popular' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest Rated' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as 'popular' | 'price-low' | 'price-high' | 'rating')}
                        className={`px-4 py-2 rounded-full border transition-colors ${
                          sortBy === option.value
                            ? 'bg-accent text-white border-accent'
                            : 'border-accent/30 text-coffee hover:border-accent hover:bg-accent/5'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Category Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-8"
        >
          <div className="flex flex-wrap justify-center gap-4 px-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-coffee text-cream shadow-lg'
                    : 'bg-white text-coffee hover:bg-accent/10 hover:text-accent shadow-md'
                }`}
              >
                <category.icon size={18} />
                <span>{category.name}</span>
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute inset-0 rounded-full border-2 border-accent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Menu Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 auto-rows-fr">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full flex flex-col"
                  onClick={() => setSelectedItem(item.id)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-gray-100">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      fallback="/images/coffee-cup.jpg"
                      loading={index < 2 ? "eager" : "lazy"}
                      priority={index < 2}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {item.isPopular && (
                        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                      {item.originalPrice && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(item.id)
                      }}
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <Heart
                        size={16}
                        className={`transition-colors ${
                          favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-coffee/60'
                        }`}
                      />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-coffee group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-accent">
                          ₹{item.price.toFixed(0)}
                        </div>
                        {item.originalPrice && (
                          <div className="text-sm text-coffee/50 line-through">
                            ₹{item.originalPrice.toFixed(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-coffee/70 text-sm mb-4 flex-1 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Rating and Time */}
                    <div className="flex items-center justify-between text-sm text-coffee/60 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={14} />
                        <span className="font-medium">{item.rating}</span>
                        <span>({item.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{item.prepTime}</span>
                      </div>
                    </div>

                    {/* Quick Add Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        const defaultSize = item.sizes[0]?.name || 'Regular'
                        handleAddToCart(item, defaultSize)
                      }}
                      className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 mt-auto"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Coffee className="mx-auto text-coffee/30 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-coffee mb-2">No items found</h3>
              <p className="text-coffee/60">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </motion.section>

        {/* Item Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-coffee/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const item = menuItems.find(m => m.id === selectedItem);
                  if (!item) return null;
                  
                  return <ItemDetailModal item={item} onAddToCart={handleAddToCart} onClose={() => setSelectedItem(null)} />;
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-4 right-4 bg-coffee text-cream rounded-2xl p-4 shadow-2xl z-40"
          >
            <div className="flex items-center space-x-3">
              <ShoppingCart size={20} />
              <span className="font-medium">{cartItems.length} items</span>
              <span className="font-bold">
                ₹{subtotal.toFixed(0)}
              </span>
              <button 
                onClick={() => navigate('/cart')}
                className="bg-accent hover:bg-accent/90 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                View Cart
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  )
}

// Item Detail Modal Component
function ItemDetailModal({ item, onAddToCart, onClose }: { 
  item: MenuItem, 
  onAddToCart: (item: MenuItem, size: string, quantity: number) => void,
  onClose: () => void 
}) {
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]?.name || 'Regular')
  const [quantity, setQuantity] = useState(1)

  const selectedSizeInfo = item.sizes.find((s: Size) => s.name === selectedSize)
  const totalPrice = (selectedSizeInfo?.price || item.price) * quantity

  return (
    <div className="p-8">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
      >
        <Coffee className="text-coffee" size={20} />
      </button>

      {/* Item Details */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <LazyImage
            src={item.image}
            alt={item.name}
            className="w-full rounded-2xl shadow-lg"
            fallback={`https://images.unsplash.com/photo-${1500000000000 + item.id}?w=500&h=400&fit=crop`}
            priority={true}
          />
        </div>
        
        <div className="md:w-1/2">
          <div className="flex items-center space-x-2 mb-2">
            {item.isPopular && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">Popular</span>
            )}
            <div className="flex items-center space-x-1 text-sm">
              <Star className="fill-yellow-400 text-yellow-400" size={14} />
              <span>{item.rating} ({item.reviews} reviews)</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-coffee mb-2">{item.name}</h2>
          <p className="text-coffee/70 mb-6">{item.description}</p>
          
          {/* Nutrition Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-accent/5 rounded-xl">
            <div>
              <span className="text-sm text-coffee/60">Calories</span>
              <div className="font-semibold">{item.nutritionInfo.calories}</div>
            </div>
            <div>
              <span className="text-sm text-coffee/60">Caffeine</span>
              <div className="font-semibold">{item.nutritionInfo.caffeine}</div>
            </div>
          </div>

          {/* Size Selection */}
          {item.sizes.length > 1 && (
            <div className="mb-6">
              <h4 className="font-semibold text-coffee mb-3">Size</h4>
              <div className="flex gap-2">
                {item.sizes.map((size: Size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-4 py-2 rounded-xl border transition-colors ${
                      selectedSize === size.name
                        ? 'bg-accent text-white border-accent'
                        : 'border-accent/30 text-coffee hover:border-accent'
                    }`}
                  >
                    <div className="text-sm">{size.name}</div>
                    <div className="font-semibold">₹{size.price.toFixed(0)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h4 className="font-semibold text-coffee mb-3">Quantity</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-accent">
              ₹{totalPrice.toFixed(0)}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(item, selectedSize, quantity)}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </motion.button>
          </div>

          {/* Allergens */}
          {item.allergens.length > 0 && (
            <div className="mt-6 text-sm text-coffee/60">
              <strong>Allergens:</strong> {item.allergens.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}