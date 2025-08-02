import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LazyImage from './LazyImage'

// Import team images
import teamAvaImage from '/images/team-ava.jpg'
import teamLiamImage from '/images/team-liam.jpg'
import teamNoahImage from '/images/team-noah.jpg'
import teamMayaImage from '/images/team-maya.jpg'

const team = [
  { name: 'Ava', image: teamAvaImage },
  { name: 'Liam', image: teamLiamImage },
  { name: 'Noah', image: teamNoahImage },
  { name: 'Maya', image: teamMayaImage },
]

export default function TeamSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="p-6 flex flex-col md:flex-row gap-10">
      <ul className="space-y-4 text-xl font-medium">
        {team.map((member, idx) => (
          <li
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer relative"
          >
            {member.name}
          </li>
        ))}
      </ul>

      <div className="relative min-h-[200px] w-full max-w-[300px] hidden md:block">
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.4 }}
              className="absolute rounded-lg shadow-lg w-full h-auto"
            >
              <LazyImage
                src={team[hovered].image}
                alt={team[hovered].name}
                className="rounded-lg w-full h-auto"
                priority={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
