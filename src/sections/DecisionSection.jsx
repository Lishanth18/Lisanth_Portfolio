import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PathButton from '../components/ui/PathButton'
import { useJourney, SECTIONS } from '../context/JourneyContext'

export default function DecisionSection() {
  const sectionRef = useRef(null)
  const { chooseJourney } = useJourney()
  const [chosen, setChosen] = useState(false)

  const handleChoice = (choice) => {
    setChosen(true)
    setTimeout(() => {
      chooseJourney(choice)
      // Scroll to the chosen section
      const targetId = choice === 'athletics' ? SECTIONS.ATHLETICS : SECTIONS.TECHNOLOGY
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 800)
  }

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.DECISION}
      className="section-full flex items-center justify-center relative"
      style={{ minHeight: '100vh' }}
    >
      {/* Dramatic background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(45,107,63,0.2) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(212,168,83,0.1) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(103,184,212,0.08) 0%, transparent 40%)',
        }}
      />

      <AnimatePresence mode="wait">
        {!chosen ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-4"
          >
            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass p-6 sm:p-8 max-w-lg mx-auto mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-cream/90">Lisanth</p>
                  <p className="text-xs text-forest-300/60">is asking...</p>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-cream/80 font-light leading-relaxed italic">
                "Two paths lie before us. One leads to the athletics track where
                speed is everything. The other leads to the world of technology
                where ideas come alive. Which path shall we take?"
              </p>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="heading-display text-3xl sm:text-4xl md:text-5xl mb-10 text-gradient-nature"
            >
              Choose Your Path
            </motion.h2>

            {/* Path buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <PathButton
                icon="🏃"
                label="Athletics Journey"
                subtitle="Speed, power & glory"
                glowColor="#d4a853"
                onClick={() => handleChoice('athletics')}
                delay={0.8}
              />
              <PathButton
                icon="💻"
                label="Technology Journey"
                subtitle="Code, create & innovate"
                glowColor="#67b8d4"
                onClick={() => handleChoice('technology')}
                delay={1.0}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8 }}
              className="text-6xl mb-4"
            >
              ✨
            </motion.div>
            <p className="heading-display text-2xl text-cream/60">
              Let's go...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
