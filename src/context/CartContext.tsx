import { createContext, useState, type ReactNode } from 'react'

// Types
export interface CartItem {
  id: number
  productId?: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
  size: string
  image: string
  category?: string
  maxQuantity?: number
}

export interface CouponCode {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minAmount: number
  description: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  appliedCoupon: CouponCode | null
  setAppliedCoupon: (coupon: CouponCode | null) => void
  cartCount: number
  subtotal: number
  savings: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export { CartContext }

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null)

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: Date.now() + Math.random(), // Ensure unique ID
      maxQuantity: item.maxQuantity || 10
    }
    
    // Check if item with same name and size already exists
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.name === newItem.name && cartItem.size === newItem.size
    )
    
    if (existingItemIndex > -1) {
      // Update quantity of existing item
      const updatedItems = [...cartItems]
      const existingItem = updatedItems[existingItemIndex]
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: Math.min(existingItem.quantity + newItem.quantity, existingItem.maxQuantity || 10)
      }
      setCartItems(updatedItems)
    } else {
      // Add new item
      setCartItems(prev => [...prev, newItem])
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 10) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    setAppliedCoupon(null)
  }

  // Calculated values
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity)
    }
    return sum
  }, 0)

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedCoupon,
    setAppliedCoupon,
    cartCount,
    subtotal,
    savings
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
