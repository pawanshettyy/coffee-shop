import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loader from './components/Loader'

const Home = () => <div className="p-4 text-xl">Welcome to the Coffee Shop ☕</div>

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader />
      {isLoaded && (
        <div className="bg-cream min-h-screen text-coffee font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      )}
    </>
  )
}
