import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-50 w-8 h-8 border-2 border-accent rounded-full transition-transform duration-150 ease-out"
      style={{
        top: position.y - 16,
        left: position.x - 16,
      }}
    />
  )
}
