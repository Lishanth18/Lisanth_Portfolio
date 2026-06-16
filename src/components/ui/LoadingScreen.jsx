import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 12 + 3
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setIsReady(true), 400)
      }
      setProgress(current)
    }, 120)
    progressRef.current = interval
    return () => clearInterval(progressRef.current)
  }, [])

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onEnter()
    }, 800)
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
                top: '20%',
                left: '10%',
                animation: 'orbFloat 12s ease-in-out infinite',
              }}
            />
            <div
              className="absolute w-[400px] h-[400px] rounded-full opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                bottom: '10%',
                right: '10%',
                animation: 'orbFloat 15s ease-in-out infinite reverse',
              }}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  background: i % 3 === 0 ? 'rgba(59,130,246,0.5)' : i % 3 === 1 ? 'rgba(139,92,246,0.4)' : 'rgba(6,182,212,0.4)',
                  left: `${(i * 5 + Math.random() * 5) % 100}%`,
                  top: `${(i * 7 + Math.random() * 10) % 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + (i % 5),
                  repeat: Infinity,
                  delay: (i * 0.4) % 3,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-display font-bold text-gradient">L</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="heading-display text-4xl md:text-6xl mb-3 text-gradient-vivid"
            >
              LISANTH
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-text-dim text-xs tracking-[0.4em] uppercase font-mono mb-10"
            >
              Preparing Experience
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 240 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="loading-progress-bar mb-4"
            >
              <div
                className="loading-progress-fill"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.8 }}
              className="text-xs text-text-dim tracking-widest font-mono mb-12"
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.p>

            {/* Enter Experience button */}
            <AnimatePresence>
              {isReady && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={handleEnter}
                  className="btn-enter"
                >
                  Enter Experience
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom scanline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
