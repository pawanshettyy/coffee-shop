import { useEffect, useState } from 'react'

export default function ScrollText() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const newScale = Math.min(1 + scrollY / 600, 2) // Cap at 2x
      setScale(newScale)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex justify-center items-center min-h-[40vh] bg-cream sticky top-0 z-10">
      <h1
        style={{ transform: `scale(${scale})`, transition: 'transform 0.1s linear' }}
        className="text-4xl font-bold text-coffee"
      >
        Scroll to Brew Something Big ☕
      </h1>
    </div>
  )
}
