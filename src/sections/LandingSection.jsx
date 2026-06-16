import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from '../components/ui/TypewriterText'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import { SECTIONS } from '../context/JourneyContext'

const LETTERS = 'LISANTH'.split('')

export default function LandingSection() {
  const sectionRef = useRef(null)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.LANDING}
      className="section-full flex items-center justify-center relative"
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(45,107,63,0.15) 0%, transparent 60%), radial-gradient(ellipse at 30% 20%, rgba(212,168,83,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Animated name */}
        <div className="overflow-hidden mb-6">
          <h1 className="heading-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none tracking-tight">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block text-gradient-nature"
                onAnimationComplete={() => {
                  if (i === LETTERS.length - 1) {
                    setShowSubtitle(true)
                    setTimeout(() => setShowIndicator(true), 2000)
                  }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle with typewriter */}
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-cream/60 font-light tracking-wide">
              <TypewriterText
                text="The Journey of Athletics & Technology"
                speed={40}
              />
            </p>
          </motion.div>
        )}

        {/* Welcome card */}
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass p-6 sm:p-8 max-w-md mx-auto"
          >
            <p className="text-sm sm:text-base text-cream/70 font-light leading-relaxed">
              Welcome to my world. Scroll down to walk with me through a
              cinematic journey of passion, speed, and innovation.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
              <span className="text-xs text-forest-300/60 tracking-widest uppercase">
                Interactive Experience
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {showIndicator && <ScrollIndicator />}

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--color-forest-900), transparent)',
        }}
      />
    </section>
  )
}
