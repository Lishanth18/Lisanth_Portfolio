import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { achievements } from '../data/achievements'
import AchievementCard from '../components/athletics/AchievementCard'
import { SECTIONS } from '../context/JourneyContext'

export default function AthleticsSection() {
  const sectionRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.ATHLETICS}
      className="relative py-20"
      style={{ minHeight: '200vh' }}
    >
      {/* Section header */}
      <div className="relative z-10 text-center px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gold-400/60 mb-4">
            The Athletics Journey
          </p>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-gradient-stadium mb-4">
            Born to Run
          </h2>
          <p className="text-cream/50 font-light max-w-md mx-auto">
            From the 100-meter dash to the 1500-meter endurance test.
            Each race is a chapter in the story of speed.
          </p>
        </motion.div>
      </div>

      {/* Chapter navigation */}
      <div className="sticky top-20 z-30 flex justify-center mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark px-4 py-2 rounded-full flex items-center gap-1 overflow-x-auto max-w-full"
        >
          {achievements.map((a, i) => (
            <button
              key={a.id}
              onClick={() => {
                setActiveChapter(i)
                const el = document.getElementById(`chapter-${i}`)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap border-none cursor-pointer ${
                activeChapter === i
                  ? 'text-cream bg-forest-600/60'
                  : 'text-cream/40 hover:text-cream/70 bg-transparent'
              }`}
            >
              {a.event}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Race timeline visualization */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-stadium-500/20 via-gold-400/30 to-forest-400/20" />

        {achievements.map((achievement, i) => (
          <div
            key={achievement.id}
            id={`chapter-${i}`}
            className={`relative flex items-center mb-20 ${
              i % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 z-10"
            >
              <div
                className="w-4 h-4 rounded-full border-2"
                style={{
                  borderColor: achievement.color,
                  background: `${achievement.color}33`,
                  boxShadow: `0 0 12px ${achievement.color}40`,
                }}
              />
            </motion.div>

            {/* Card container */}
            <div className={`w-full sm:w-5/12 ${i % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8 sm:ml-auto'}`}>
              {/* Race animation bar */}
              <RaceBar
                achievement={achievement}
                index={i}
                onInView={() => setActiveChapter(i)}
              />
              <AchievementCard achievement={achievement} index={i} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--color-forest-900), transparent)',
        }}
      />
    </section>
  )
}

function RaceBar({ achievement, index, onInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={onInView}
      className="mb-4 overflow-hidden rounded-full"
      style={{ transformOrigin: 'left', height: '4px' }}
    >
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${achievement.color}, ${achievement.color}00)`,
        }}
      />
    </motion.div>
  )
}
