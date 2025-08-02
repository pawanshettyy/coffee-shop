// Image optimization utilities for fast loading

interface ImageConfig {
  src: string
  sizes?: string
  quality?: number
}

// Generate responsive image srcset for different screen sizes
export function generateSrcSet(baseSrc: string, sizes: number[] = [400, 800, 1200, 1600]): string {
  return sizes
    .map(size => `${baseSrc}?w=${size}&q=75 ${size}w`)
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

// Create optimized image configuration
export function createImageConfig(src: string, options: Partial<ImageConfig> = {}): ImageConfig {
  const { sizes, quality = 75 } = options
  
  return {
    src: `${src}?q=${quality}`,
    sizes: sizes || generateSizes(),
    quality
  }
}

// Preload critical images with proper attributes
export function preloadImage(src: string, priority: 'high' | 'low' = 'low'): void {
  // Check if already preloaded/prefetched
  const existingLink = document.querySelector(`link[href="${src}"]`)
  if (existingLink) {
    return // Already preloaded
  }
  
  // Only preload if the image will be used soon
  const link = document.createElement('link')
  link.rel = priority === 'high' ? 'preload' : 'prefetch'
  link.as = 'image'
  link.href = src
  link.fetchPriority = priority
  
  // Add crossorigin for external images
  if (src.startsWith('http')) {
    link.crossOrigin = 'anonymous'
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
