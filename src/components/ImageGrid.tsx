import { motion } from 'framer-motion'
import LazyImage from './LazyImage'
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 cursor-none relative">
      {images.map((src, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="overflow-hidden rounded-lg"
        >
          <LazyImage
            src={src}
            alt={`Grid ${i}`}
            className="w-full h-full"
            loading="lazy"
          />
        </motion.div>
      ))}
      <CustomCursor />
    </div>
  )
}
