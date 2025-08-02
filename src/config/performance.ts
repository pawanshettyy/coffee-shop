// Performance optimization constants
export const PERFORMANCE_CONFIG = {
  // Loader settings
  LOADER_MIN_DURATION: 1000, // 1 second minimum
  LOADER_MAX_DURATION: 2000, // 2 seconds maximum
  
  // Animation settings
  FAST_TRANSITION: 0.3,
  NORMAL_TRANSITION: 0.5,
  SLOW_TRANSITION: 0.8,
  
  // Image loading settings
  CRITICAL_IMAGE_LOADING: 'eager' as const,
  LAZY_IMAGE_LOADING: 'lazy' as const,
  
  // Intersection observer settings
  LAZY_LOAD_THRESHOLD: 0.1,
  LAZY_LOAD_ROOT_MARGIN: '50px',
  
  // Preload settings
  CRITICAL_IMAGES: [
    '/images/hero-coffee-main.jpg',
    '/images/hero-coffee-pour.jpg',
    '/images/menu-espresso.jpg',
    '/images/menu-caramel-macchiato.jpg',
    '/images/menu-cold-brew.jpg'
  ]
}

// Utility function to determine if image should load eagerly
export const shouldLoadEagerly = (imageSrc: string): boolean => {
  return PERFORMANCE_CONFIG.CRITICAL_IMAGES.some(criticalImg => 
    imageSrc.includes(criticalImg.split('/').pop() || '')
  )
}
