import { useState, useEffect } from 'react'
import { optimizeImageForVercel } from '../utils/imageOptimization'

interface FastHeroImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  quality?: number
  priority?: boolean
}

export default function FastHeroImage({ 
  src, 
  alt, 
  className = '', 
  width = 1920,
  quality = 85,
  priority = true
}: FastHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState<string>('')
  const [hasError, setHasError] = useState(false)

  // Validate src prop
  const isValidSrc = src && typeof src === 'string' && src.length > 0

  // Generate multiple optimized sizes for responsive loading
  const sizes = [400, 800, 1200, 1600, 1920]
  const optimizedSources = isValidSrc ? sizes.map(size => ({
    src: optimizeImageForVercel(src, size, quality),
    width: size
  })) : []

  // Create srcSet for responsive images
  const srcSet = optimizedSources
    .map(({ src: srcUrl, width: w }) => `${srcUrl} ${w}w`)
    .join(', ')

  // Primary optimized source
  const primarySrc = isValidSrc ? optimizeImageForVercel(src, width, quality) : ''

  useEffect(() => {
    // Only proceed if we have a valid src
    if (!isValidSrc) {
      console.warn('FastHeroImage: Invalid src provided:', src)
      setHasError(true)
      return
    }

    if (!priority) {
      return
    }

    // Preload the hero image immediately with highest priority
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = primarySrc
    if (srcSet) link.setAttribute('imagesrcset', srcSet)
    link.setAttribute('imagesizes', '100vw')
    link.setAttribute('fetchpriority', 'high')
    document.head.appendChild(link)

    // Start loading immediately
    const img = new Image()
    img.decoding = 'sync' // Synchronous decoding for critical images
    
    if ('fetchPriority' in img) {
      (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = 'high'
    }

    img.onload = () => {
      setCurrentSrc(primarySrc)
      setIsLoaded(true)
      setHasError(false)
    }

    img.onerror = () => {
      // Fallback to original source
      console.warn('FastHeroImage: Failed to load optimized image, falling back to original')
      setCurrentSrc(src)
      setIsLoaded(true)
      setHasError(true)
    }

    if (srcSet) img.srcset = srcSet
    img.sizes = '100vw'
    img.src = primarySrc

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
      img.onload = null
      img.onerror = null
    }
  }, [src, primarySrc, srcSet, priority, isValidSrc])

  // Responsive sizes for different breakpoints
  const responsiveSizes = "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"

  // Handle invalid src
  if (!isValidSrc || hasError) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-cream via-accent/10 to-coffee/5 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-coffee/20 to-transparent" />
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl text-coffee/30 mb-4">☕</div>
            <span className="text-coffee/50">
              {!isValidSrc ? 'Image source unavailable' : 'Failed to load image'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Ultra-fast loading placeholder */}
      {!isLoaded && (
        <div className={`absolute inset-0 bg-gradient-to-br from-cream via-accent/10 to-coffee/5`}>
          <div className="absolute inset-0 bg-gradient-to-t from-coffee/20 to-transparent" />
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl text-coffee/30 animate-pulse">☕</div>
          </div>
        </div>
      )}

      {/* Optimized hero image */}
      <img
        src={currentSrc || primarySrc}
        srcSet={srcSet || undefined}
        sizes={responsiveSizes}
        alt={alt}
        loading="eager"
        decoding="sync"
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-coffee/40 via-transparent to-coffee/20" />
    </div>
  )
}
