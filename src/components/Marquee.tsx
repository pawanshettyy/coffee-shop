import { motion } from 'framer-motion'

const marqueeItems = [
  'Espresso',
  'Cappuccino',
  'Cold Brew',
  'Latte',
  'Mocha',
  'Flat White',
  'Americano',
  'Macchiato',
]

export default function Marquee() {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-accent text-cream py-3">
      <motion.div
        className="inline-block"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: 'linear',
        }}
      >
        <span className="text-lg font-semibold flex gap-8 px-6">
          {marqueeItems.map((item, index) => (
            <span key={index}>{item} •</span>
          ))}
          {/* Duplicate items to avoid gap at end */}
          {marqueeItems.map((item, index) => (
            <span key={index + 100}>{item} •</span>
          ))}
        </span>
      </motion.div>
    </div>
  )
}
