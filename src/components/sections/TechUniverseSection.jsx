import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const SKILLS = [
  { name: 'Java', icon: '☕', color: '#f59e0b', x: 15, y: 20, duration: 7 },
  { name: 'Spring Boot', icon: '🍃', color: '#14b8a6', x: 70, y: 15, duration: 8 },
  { name: 'React', icon: '⚛️', color: '#3b82f6', x: 40, y: 70, duration: 6 },
  { name: 'TypeScript', icon: '📘', color: '#06b6d4', x: 80, y: 55, duration: 9 },
  { name: 'MySQL', icon: '🗄️', color: '#8b5cf6', x: 25, y: 55, duration: 7.5 },
  { name: 'Git', icon: '🔀', color: '#ef4444', x: 60, y: 35, duration: 6.5 },
  { name: 'AI', icon: '🧠', color: '#a855f7', x: 85, y: 80, duration: 8.5 },
  { name: 'Prompt Engineering', icon: '✨', color: '#ec4899', x: 10, y: 80, duration: 7 },
  { name: 'Python', icon: '🐍', color: '#22c55e', x: 50, y: 15, duration: 8 },
  { name: 'Docker', icon: '🐳', color: '#0ea5e9', x: 30, y: 40, duration: 9 },
  { name: 'REST APIs', icon: '🔗', color: '#6366f1', x: 65, y: 65, duration: 7 },
  { name: 'Node.js', icon: '💚', color: '#22c55e', x: 90, y: 35, duration: 6 },
]

export default function TechUniverseSection() {
  const sectionRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.5])

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.TECH}
      className="section-cinematic section-padding flex flex-col items-center justify-start relative"
    >
      {/* Futuristic grid background */}
      <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-purple/5 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-cyan/3 blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-20 text-center px-6 w-full max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="badge border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan mb-6">
            Tech Universe
          </div>
          <h2 className="heading-1 text-white mb-6">
            Skills in <span className="text-gradient">Orbit</span>
          </h2>
          <p className="body-text max-w-md mx-auto text-center">
            Move your mouse to explore the technology constellation
          </p>
        </motion.div>
      </div>

      {/* Floating skill orbs */}
      <div className="relative w-full min-h-[60vh] max-w-6xl mx-auto">
        {SKILLS.map((skill, i) => {
          const depth = (i % 3) + 1 // 1-3 depth layers
          const parallaxX = mousePos.x * depth * 12
          const parallaxY = mousePos.y * depth * 12

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3 + i * 0.08,
                duration: 0.6,
                type: 'spring',
                stiffness: 150,
              }}
              className="skill-orb"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                '--duration': `${skill.duration}s`,
                '--delay': `${i * 0.5}s`,
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                borderColor: `${skill.color}30`,
              }}
            >
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xl">{skill.icon}</span>
                <span style={{ color: skill.color }}>{skill.name}</span>
              </motion.div>

              {/* Individual glow */}
              <div
                className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: `radial-gradient(circle, ${skill.color}15 0%, transparent 70%)`,
                  transform: 'scale(2)',
                }}
              />
            </motion.div>
          )
        })}

        {/* Central orb */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 40px rgba(59,130,246,0.1)',
                '0 0 80px rgba(139,92,246,0.15)',
                '0 0 40px rgba(6,182,212,0.1)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
            }}
          >
            <span className="text-3xl opacity-40">🌟</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-950 to-transparent pointer-events-none z-10" />
    </section>
  )
}
