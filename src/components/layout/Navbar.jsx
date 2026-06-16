import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_SCENES, SECTIONS } from '../../context/JourneyContext'

const NAV_ITEMS = [
  { id: SECTIONS.HERO, label: 'Home' },
  { id: SECTIONS.TIMELINE, label: 'Journey' },
  { id: SECTIONS.TECH, label: 'Skills' },
  { id: SECTIONS.PROJECTS, label: 'Projects' },
  { id: SECTIONS.AI, label: 'AI' },
  { id: SECTIONS.RESUME, label: 'Resume' },
  { id: SECTIONS.CONTACT, label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Determine active section
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter(s => s.el)

      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? 'glass-dark px-6 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                : ''
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo(SECTIONS.HERO)}
              className="flex items-center gap-3 cursor-pointer bg-transparent border-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center">
                <span className="text-sm font-display font-bold text-gradient">L</span>
              </div>
              <span className="text-sm font-display font-bold text-white tracking-wide hidden sm:block">
                Lisanth<span className="text-accent-blue">.</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer border-none ${
                    activeSection === item.id
                      ? 'text-white bg-white/10'
                      : 'text-text-dim hover:text-white hover:bg-white/5 bg-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Scene progress dots - desktop */}
            <div className="hidden lg:flex items-center gap-1.5 ml-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  aria-label={item.label}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                    activeSection === item.id
                      ? 'bg-accent-blue w-4 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-4 h-[1.5px] bg-white rounded-full block"
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-4 h-[1.5px] bg-white rounded-full block"
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-4 h-[1.5px] bg-white rounded-full block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-primary-950/95 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className={`px-8 py-3 rounded-xl text-lg font-medium transition-all cursor-pointer border-none bg-transparent ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
