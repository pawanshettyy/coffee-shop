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
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  priority = false,
  fallback,
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority || loading === 'eager')
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
          rootMargin: '50px',
          threshold: 0.1
        }
      )
      
      observer.observe(containerRef.current)
      
      return () => {
        observer.disconnect()
      }
    }
  }, [priority, loading])

  useEffect(() => {
    const img = imgRef.current
    if (!img || !isInView) return

    const handleLoad = () => {
      setIsLoaded(true)
      onLoad?.()
    }
    
    const handleError = () => {
      setHasError(true)
      onError?.()
    }

    // If image is already cached, it will load immediately
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true)
    } else {
      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)
    }

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }
  }, [src, isInView, onLoad, onError])

  // Memory optimization: cleanup on unmount
  useEffect(() => {
    const currentImg = imgRef.current
    return () => {
      if (currentImg) {
        currentImg.src = ''
        currentImg.removeAttribute('src')
      }
    }
  }, [])

  const imageSrc = hasError && fallback ? fallback : src

  if (hasError && !fallback) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-full">
      {/* Skeleton/Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{ 
            minHeight: '100%',
            objectFit: 'cover'
          }}
        />
      )}
    </div>
  )
}
