import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const Home = () => <div className="p-4 text-xl">Welcome to the Coffee Shop ☕</div>

export default function App() {
  return (
    <div className="bg-cream min-h-screen text-coffee font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future pages here */}
      </Routes>
    </div>
  )
}
