import { useState, useEffect } from 'react'

export default function Mystery3D() {
  const [rotation, setRotation] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + (isHovered ? 3 : 1))
    }, 50)
    return () => clearInterval(interval)
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="h-[500px] bg-cream border border-accent rounded-xl shadow-lg overflow-hidden flex items-center justify-center relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Coffee cup emoji with interactive animation */}
      <div 
        className="text-[120px] transition-all duration-300 ease-out"
        style={{ 
          transform: `rotate(${rotation}deg) scale(${isHovered ? 1.2 : 1})`,
          filter: `hue-rotate(${mousePosition.x * 3.6}deg)`,
        }}
      >
        ☕
      </div>
      
      {/* Interactive floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-accent rounded-full transition-all duration-300 ${
              isHovered ? 'animate-bounce' : 'animate-pulse'
            }`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.3}s`,
              opacity: isHovered ? 0.8 : 0.3,
              transform: isHovered ? `scale(1.5) translateY(-${mousePosition.y * 0.2}px)` : 'scale(1)',
            }}
          />
        ))}
      </div>
      
      {/* Interactive steam effect */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-8 bg-gradient-to-t from-accent/40 to-transparent rounded-full ${
              isHovered ? 'animate-pulse' : 'opacity-50'
            }`}
            style={{
              left: `${i * 8 - 8}px`,
              animationDelay: `${i * 0.5}s`,
              transform: `scaleY(${isHovered ? 1.5 : 1})`,
            }}
          />
        ))}
      </div>
      
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(198, 156, 109, 0.3) 0%, transparent 60%)`,
        }}
      />
      
      {/* Interactive overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className={`text-coffee transition-all duration-300 ${isHovered ? 'text-base font-medium' : 'text-sm'}`}>
          {isHovered ? '🌟 Magic in Motion! 🌟' : 'Interactive Coffee Experience'}
        </p>
        <p className="text-coffee/50 text-xs mt-1">
          {isHovered ? 'Move your cursor around!' : 'Hover to see the magic ✨'}
        </p>
      </div>
    </div>
  )
}
