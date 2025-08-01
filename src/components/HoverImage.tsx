import { useState } from 'react'
import { motion } from 'framer-motion'

interface HoverImageProps {
  src: string
  hoverSrc: string
  alt?: string
  className?: string
}

export default function HoverImage({ src, hoverSrc, alt, className }: HoverImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`overflow-hidden w-fit ${className || ''}`}
    >
      <motion.img
        key={isHovered ? hoverSrc : src}
        src={isHovered ? hoverSrc : src}
        alt={alt}
        initial={{ opacity: 0.6, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full h-auto object-cover rounded-xl"
      />
    </div>
  )
}
