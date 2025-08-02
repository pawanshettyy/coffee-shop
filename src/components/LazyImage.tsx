import { useState, useRef, useEffect } from 'react'

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
  srcSet
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority || loading === 'eager')
  const [currentSrc, setCurrentSrc] = useState<string>(blurDataURL || '')
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload critical images immediately
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      if (srcSet) link.setAttribute('imagesrcset', srcSet)
      if (sizes) link.setAttribute('imagesizes', sizes)
      document.head.appendChild(link)
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [src, srcSet, sizes, priority])

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
          rootMargin: '100px', // Load images 100px before they enter viewport
          threshold: 0.01
        }
      )
      
      observer.observe(containerRef.current)
      
      return () => {
        observer.disconnect()
      }
    }
  }, [priority, loading])

  // Progressive image loading with better performance
  useEffect(() => {
    if (isInView && src) {
      const img = new Image()
      
      // Performance optimizations
      img.decoding = 'async'
      img.fetchPriority = priority ? 'high' : 'auto'
      
      img.onload = () => {
        setCurrentSrc(src)
        setIsLoaded(true)
        setHasError(false)
        onLoad?.()
      }
      
      img.onerror = () => {
        setHasError(true)
        if (fallback) {
          setCurrentSrc(fallback)
          setIsLoaded(true)
        }
        onError?.()
      }
      
      // Set responsive image attributes
      if (srcSet) img.srcset = srcSet
      if (sizes) img.sizes = sizes
      img.src = src
      
      // Cleanup function
      return () => {
        img.onload = null
        img.onerror = null
      }
    }
  }, [isInView, src, srcSet, sizes, fallback, priority, onLoad, onError])

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
