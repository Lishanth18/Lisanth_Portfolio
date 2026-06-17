import { useState, useEffect } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'

import { JourneyProvider, useJourney } from './context/JourneyContext'
import useEasterEggs from './hooks/useEasterEggs'

import LoadingScreen from './components/ui/LoadingScreen'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import TimelineSection from './components/sections/TimelineSection'
import TechUniverseSection from './components/sections/TechUniverseSection'
import ProjectsShowcase from './components/sections/ProjectsSection'
import AISection from './components/sections/AISection'
import BlogSection from './components/sections/BlogSection'
import ResumeSection from './components/sections/ResumeSection'
import FutureSection from './components/sections/FutureSection'
import ContactSection from './components/sections/ContactSection'

function AppContent() {
  const { hasEnteredExperience, enterExperience } = useJourney()
  const { devModeActive } = useEasterEggs()

  // Initialize smooth scrolling
  useEffect(() => {
    if (!hasEnteredExperience) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [hasEnteredExperience])

  return (
    <>
      <Helmet>
        <title>Lisanth V | Full Stack Developer — The Journey of a Creator</title>
        <meta
          name="description"
          content="A cinematic interactive portfolio by Lisanth V — Full Stack Developer. Explore the journey of a creator."
        />
      </Helmet>

      {/* Loading / Enter Experience Gate */}
      <AnimatePresence>
        {!hasEnteredExperience && (
          <LoadingScreen onEnter={enterExperience} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {hasEnteredExperience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Navbar />

          <main className="relative z-10 w-full overflow-hidden bg-primary-950">
            {/* Scene 1: Cinematic Hero */}
            <HeroSection />

            {/* Scene 3: Journey Timeline */}
            <TimelineSection />

            {/* Scene 5A: Tech Universe */}
            <TechUniverseSection />

            {/* Scene 6: Project Showcase */}
            <ProjectsShowcase />

            {/* Scene 7: AI Assistant */}
            <AISection />

            {/* Scene 8: Blog */}
            <BlogSection />

            {/* Scene 9: Interactive Resume */}
            <ResumeSection />

            {/* Scene 10: Future Vision */}
            <FutureSection />

            {/* Scene 11: Contact */}
            <ContactSection />
          </main>
        </motion.div>
      )}

      {/* Dev Mode Easter Egg Overlay */}
      <AnimatePresence>
        {devModeActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]"
          >
            <div className="glass-dark px-6 py-3 rounded-full flex items-center gap-3 border border-accent-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-mono text-accent-blue tracking-wider">
                Developer Mode Activated
              </span>
              <span className="text-lg">🔓</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <JourneyProvider>
        <AppContent />
      </JourneyProvider>
    </HelmetProvider>
  )
}
