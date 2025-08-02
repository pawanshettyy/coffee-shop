import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HoverImageProps {
  src: string
  hoverSrc: string
  alt?: string
  className?: string
}

export default function HoverImage({ src, hoverSrc, alt, className }: HoverImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false)

  // Preload hover image
  useEffect(() => {
    const img = new Image()
    img.onload = () => setHoverImageLoaded(true)
    img.src = hoverSrc
  }, [hoverSrc])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`overflow-hidden w-fit ${className || ''}`}
    >
      <motion.img
        key={isHovered ? hoverSrc : src}
        src={isHovered && hoverImageLoaded ? hoverSrc : src}
        alt={alt}
        loading="eager"
        decoding="async"
        initial={{ opacity: 0.8, scale: 1.02 }} // Reduced initial scale
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }} // Faster transition
        className="w-full h-auto object-cover rounded-xl"
      />
    </div>
  )
}
