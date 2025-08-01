import { motion } from 'framer-motion'
import CustomCursor from './CustomCursor'

const images = [
  '/images/grid1.jpg',
  '/images/grid2.jpg',
  '/images/grid3.jpg',
  '/images/grid4.jpg',
  '/images/grid5.jpg',
  '/images/grid6.jpg',
]

export default function ImageGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 cursor-none relative">
      {images.map((src, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="overflow-hidden rounded-lg"
        >
          <motion.img
            src={src}
            alt={`Grid ${i}`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      ))}
      <CustomCursor />
    </div>
  )
}
