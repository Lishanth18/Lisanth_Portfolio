import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SECTIONS } from '../context/JourneyContext'
import GlassCard from '../components/ui/GlassCard'

const FUTURE_ITEMS = [
  { icon: '🎓', label: 'Education Journey', desc: 'Academic milestones & learning path' },
  { icon: '💼', label: 'Internship Experience', desc: 'Real-world industry exposure' },
  { icon: '🚀', label: 'Projects Portfolio', desc: 'From ideas to deployed solutions' },
  { icon: '🧠', label: 'AI & Innovation', desc: 'Pushing boundaries with intelligence' },
  { icon: '🌟', label: 'Future Goals', desc: 'What lies ahead on the horizon' },
]

// Animated code rain characters
const CODE_CHARS = '01{}()[]<>/;:=+-.const function return async await import export class extends implements interface type let var if else for while do switch case break continue try catch throw new delete typeof instanceof void yield'

export default function TechnologySection() {
  const sectionRef = useRef(null)

  // Generate code rain columns
  const columns = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      left: `${(i / 20) * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      chars: Array.from({ length: 15 }).map(() =>
        CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
      ),
    }))
  }, [])

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.TECHNOLOGY}
      className="section-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Code rain background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {columns.map((col, i) => (
          <motion.div
            key={i}
            className="absolute top-0 text-forest-400 text-xs font-mono leading-5"
            style={{ left: col.left }}
            initial={{ y: '-100%' }}
            animate={{ y: '100vh' }}
            transition={{
              duration: col.duration,
              repeat: Infinity,
              delay: col.delay,
              ease: 'linear',
            }}
          >
            {col.chars.map((char, j) => (
              <div key={j} className={j === 0 ? 'text-sky-400 opacity-80' : ''}>
                {char}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(103,184,212,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Coming soon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="glass-light px-4 py-2 rounded-full text-xs tracking-widest uppercase text-sky-300/70">
            🔮 Coming Soon
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="heading-display text-4xl sm:text-5xl md:text-6xl mb-4"
          style={{
            background: 'linear-gradient(135deg, #67b8d4, #5ab56e, #67b8d4)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s ease-in-out infinite',
          }}
        >
          Technology Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-cream/50 font-light text-lg mb-12 max-w-md mx-auto"
        >
          The code is being written. The journey through technology, innovation,
          and creativity is being crafted with care.
        </motion.p>

        {/* Future content teaser */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {FUTURE_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="glass-light p-4 rounded-xl flex items-center gap-3 text-left"
            >
              <span className="text-2xl opacity-60">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-cream/80">{item.label}</p>
                <p className="text-xs text-cream/40">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard variant="dark" className="p-4 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-cream/30 ml-2 font-mono">terminal</span>
            </div>
            <div className="font-mono text-xs text-forest-300/70 space-y-1">
              <p><span className="text-sky-400">$</span> building technology-journey...</p>
              <p className="text-gold-400/60">▓▓▓▓▓▓▓░░░░░░░░ 47% complete</p>
              <motion.p
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-cream/40"
              >
                █
              </motion.p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
