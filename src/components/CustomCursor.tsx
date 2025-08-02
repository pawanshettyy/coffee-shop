import { useEffect, useState, useCallback } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    // Use passive listeners for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  return (
    <div
      className={`pointer-events-none fixed z-50 w-8 h-8 border-2 border-accent rounded-full transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
        willChange: 'transform',
      }}
    />
  )
}
