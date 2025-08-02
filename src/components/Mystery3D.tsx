import { useState, useEffect } from 'react'

export default function Mystery3D() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[500px] bg-cream border border-accent rounded-xl shadow-lg overflow-hidden flex items-center justify-center relative">
      {/* Coffee cup emoji with CSS animation instead of 3D */}
      <div 
        className="text-[120px] transition-transform duration-75"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        ☕
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      {/* Interactive overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-coffee/70 text-sm">
          Interactive Coffee Experience
        </p>
        <p className="text-coffee/50 text-xs mt-1">
          Hover to see the magic ✨
        </p>
      </div>
    </div>
  )
}
