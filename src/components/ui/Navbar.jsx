import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useJourney, SECTIONS } from '../../context/JourneyContext'

const NAV_ITEMS = [
  { id: SECTIONS.LANDING, label: 'Home', icon: '◆' },
  { id: SECTIONS.FOREST, label: 'Journey', icon: '🌿' },
  { id: SECTIONS.DECISION, label: 'Paths', icon: '⚡' },
  { id: SECTIONS.CONTACT, label: 'Contact', icon: '✦' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { currentSection } = useJourney()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 26, 15, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(90, 181, 110, 0.1)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection(SECTIONS.LANDING)}
          className="heading-display text-lg tracking-wider text-cream/90 hover:text-cream transition-colors bg-transparent border-none cursor-pointer"
        >
          LISANTH
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-transparent border-none cursor-pointer ${
                currentSection === item.id
                  ? 'text-forest-300 bg-forest-800/50'
                  : 'text-cream/50 hover:text-cream/80 hover:bg-forest-800/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
        >
          <motion.div
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-cream/70 rounded"
          />
          <motion.div
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-0.5 bg-cream/70 rounded"
          />
          <motion.div
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-cream/70 rounded"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2 mx-4 glass-dark p-4 rounded-xl"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-cream/70 hover:text-cream hover:bg-forest-800/30 transition-all bg-transparent border-none cursor-pointer"
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
