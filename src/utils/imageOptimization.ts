// Image optimization utilities for fast loading on Vercel

interface ImageConfig {
  src: string
  sizes?: string
  quality?: number
}

// Vercel Image Optimization - automatically optimizes images
export function optimizeImageForVercel(src: string, width?: number, quality: number = 75): string {
  // Ensure src is valid
  if (!src || typeof src !== 'string') {
    console.warn('optimizeImageForVercel: Invalid src provided:', src)
    return src || ''
  }

  // For Vercel deployment, we can use query parameters for optimization
  const params = new URLSearchParams()
  if (width && width > 0) params.set('w', width.toString())
  params.set('q', quality.toString())
  
  // Add format optimization for modern browsers
  if (typeof window !== 'undefined') {
    try {
      // Check for WebP support
      const canvas = document.createElement('canvas')
      const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
      if (webpSupported) {
        params.set('f', 'webp')
      }
    } catch (error) {
      // Fallback if canvas creation fails
      console.warn('WebP detection failed:', error)
    }
  }
  
  return `${src}?${params.toString()}`
}

// Generate responsive image srcset with Vercel optimization
export function generateSrcSet(baseSrc: string, sizes: number[] = [400, 800, 1200, 1600]): string {
  // Ensure baseSrc is valid
  if (!baseSrc || typeof baseSrc !== 'string') {
    console.warn('generateSrcSet: Invalid baseSrc provided:', baseSrc)
    return ''
  }

  // Ensure sizes array is valid
  if (!Array.isArray(sizes) || sizes.length === 0) {
    console.warn('generateSrcSet: Invalid sizes array provided:', sizes)
    return optimizeImageForVercel(baseSrc)
  }

  return sizes
    .filter(size => typeof size === 'number' && size > 0)
    .map(size => `${optimizeImageForVercel(baseSrc, size)} ${size}w`)
    .join(', ')
}

// Generate sizes attribute for responsive images
export function generateSizes(breakpoints: { [key: string]: string } = {}): string {
  const defaultBreakpoints = {
    '(max-width: 768px)': '100vw',
    '(max-width: 1200px)': '50vw',
    default: '33vw'
  }
  
  const merged = { ...defaultBreakpoints, ...breakpoints }
  const sizeQueries = Object.entries(merged)
    .filter(([key]) => key !== 'default')
    .map(([query, size]) => `${query} ${size}`)
    .join(', ')
  
  return `${sizeQueries}, ${merged.default}`
}

// Create optimized image configuration with Vercel optimization
export function createImageConfig(src: string, options: Partial<ImageConfig> = {}): ImageConfig {
  const { sizes, quality = 75 } = options
  
  return {
    src: optimizeImageForVercel(src, undefined, quality),
    sizes: sizes || generateSizes(),
    quality
  }
}

// Enhanced preload with better caching and priority
export function preloadImage(src: string, priority: 'high' | 'low' = 'low'): void {
  // Check if already preloaded/prefetched
  const baseSrc = src.split('?')[0]
  const existingLink = document.querySelector(`link[href*="${baseSrc}"]`)
  if (existingLink) {
    return // Already preloaded
  }
  
  // Use optimized version for preloading
  const optimizedSrc = optimizeImageForVercel(src, undefined, 75)
  
  // Only preload if the image will be used soon
  const link = document.createElement('link')
  link.rel = priority === 'high' ? 'preload' : 'prefetch'
  link.as = 'image'
  link.href = optimizedSrc
  
  // Add modern attributes for better performance
  if ('fetchPriority' in link) {
    (link as any).fetchPriority = priority
  }
  
  // Add crossorigin for external images
  if (src.startsWith('http')) {
    link.crossOrigin = 'anonymous'
  }
  
  // Add loading attribute for better resource management
  if ('loading' in link) {
    (link as any).loading = priority === 'high' ? 'eager' : 'lazy'
  }
  
  document.head.appendChild(link)
}

// Batch preload multiple images
export function preloadImages(images: { src: string; priority?: 'high' | 'low' }[]): void {
  images.forEach(({ src, priority = 'low' }) => {
    preloadImage(src, priority)
  })
}

// Check if image is in cache
export function isImageCached(src: string): boolean {
  const img = new Image()
  img.src = src
  return img.complete && img.naturalWidth > 0
}

// Progressive image loading with callback
export function loadImageProgressive(
  src: string, 
  onLoad?: () => void, 
  onError?: () => void
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.loading = 'lazy'
    
    img.onload = () => {
      onLoad?.()
      resolve(img)
    }
    
    img.onerror = () => {
      onError?.()
      reject(new Error(`Failed to load image: ${src}`))
    }
    
    img.src = src
  })
}

// Critical images that should be preloaded immediately (only home page hero images)
export const CRITICAL_IMAGES = [
  '/images/hero-coffee-main.jpg'  // Actual hero image shown immediately
]

// Non-critical images that can be prefetched (mainly home page images)
export const NON_CRITICAL_IMAGES = [
  '/images/hero-coffee-pour.jpg',  // Hover state image
  '/images/coffee-cup.jpg',
  '/images/coffee-pour.jpg',
  '/images/grid1.jpg',
  '/images/grid2.jpg',
  '/images/grid3.jpg',
  '/images/grid4.jpg',
  '/images/grid5.jpg',
  '/images/grid6.jpg',
  '/images/team-ava.jpg',
  '/images/team-liam.jpg',
  '/images/team-maya.jpg',
  '/images/team-noah.jpg'
]
