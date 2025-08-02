import { useState, useRef, useEffect } from 'react'
import { optimizeImageForVercel, generateSrcSet } from '../utils/imageOptimization'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  fallback?: string
  onLoad?: () => void
  onError?: () => void
  blurDataURL?: string
  sizes?: string
  srcSet?: string
  quality?: number
  width?: number
  height?: number
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  priority = false,
  fallback,
  onLoad,
  onError,
  blurDataURL,
  sizes = '100vw',
  srcSet,
  quality = 75,
  width
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority || loading === 'eager')
  const [currentSrc, setCurrentSrc] = useState<string>(blurDataURL || '')
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Optimize image source for Vercel
  const optimizedSrc = src ? optimizeImageForVercel(src, width, quality) : ''
  const optimizedSrcSet = srcSet || (src ? generateSrcSet(src) : '')

  // Preload critical images immediately
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = optimizedSrc
      if (optimizedSrcSet) link.setAttribute('imagesrcset', optimizedSrcSet)
      if (sizes) link.setAttribute('imagesizes', sizes)
      
      // Add fetchpriority for modern browsers
      link.setAttribute('fetchpriority', 'high')
      
      document.head.appendChild(link)
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [optimizedSrc, optimizedSrcSet, sizes, priority])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority && loading === 'lazy' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        },
        {
          rootMargin: '50px', // Reduced from 100px for faster loading
          threshold: 0.01
        }
      )
      
      observer.observe(containerRef.current)
      
      return () => {
        observer.disconnect()
      }
    }
  }, [priority, loading])

  // Progressive image loading with Vercel optimization
  useEffect(() => {
    if (isInView && optimizedSrc) {
      const img = new Image()
      
      // Performance optimizations
      img.decoding = 'async'
      
      // Use modern attributes safely
      if ('fetchPriority' in img) {
        (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = priority ? 'high' : 'auto'
      }
      
      img.onload = () => {
        setCurrentSrc(optimizedSrc)
        setIsLoaded(true)
        setHasError(false)
        onLoad?.()
      }
      
      img.onerror = () => {
        setHasError(true)
        if (fallback) {
          const optimizedFallback = optimizeImageForVercel(fallback, width, quality)
          setCurrentSrc(optimizedFallback)
          setIsLoaded(true)
        }
        onError?.()
      }
      
      // Set responsive image attributes with optimization
      if (optimizedSrcSet) img.srcset = optimizedSrcSet
      if (sizes) img.sizes = sizes
      
      // Start loading the optimized image
      img.src = optimizedSrc
      
      // Cleanup function
      return () => {
        img.onload = null
        img.onerror = null
      }
    }
  }, [isInView, optimizedSrc, optimizedSrcSet, sizes, fallback, priority, onLoad, onError, quality, width])

  // Memory cleanup on unmount
  useEffect(() => {
    const imgElement = imgRef.current
    return () => {
      if (imgElement) {
        imgElement.src = ''
        imgElement.removeAttribute('src')
      }
    }
  }, [])

  const displaySrc = currentSrc || src

  if (hasError && !fallback) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 ${className}`}
          style={{ zIndex: 1 }}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !blurDataURL && (
        <div className={`bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${className}`}>
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="w-8 h-8 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={displaySrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{ 
            zIndex: 2,
            position: 'relative'
          }}
        />
      )}
    </div>
  )
}
