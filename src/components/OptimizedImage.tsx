import { useState, useEffect, useRef } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 75
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Generate optimized Vercel image URL
  const getOptimizedSrc = (originalSrc: string, w: number, q: number) => {
    if (originalSrc.startsWith('/images/')) {
      return `${originalSrc}?w=${w}&q=${q}&f=webp`
    }
    return originalSrc
  }

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    const widths = [320, 640, 750, 828, 1080, 1200]
    return widths
      .map(w => `${getOptimizedSrc(src, w, quality)} ${w}w`)
      .join(', ')
  }

  useEffect(() => {
    if (!imgRef.current) return

    const img = imgRef.current

    const handleLoad = () => setIsLoaded(true)
    const handleError = () => setError(true)

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }
  }, [])

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      <img
        ref={imgRef}
        src={getOptimizedSrc(src, width, quality)}
        srcSet={generateSrcSet()}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          maxWidth: '100%',
          height: 'auto',
          transition: 'opacity 0.3s ease',
          opacity: isLoaded ? 1 : 0
        }}
        className="w-full h-auto object-cover"
      />
    </div>
  )
}
