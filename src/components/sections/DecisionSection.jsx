import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

export default function DecisionSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const avatarY = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const avatarOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])
  const leftPathX = useTransform(scrollYProgress, [0.3, 0.7], [0, -60])
  const rightPathX = useTransform(scrollYProgress, [0.3, 0.7], [0, 60])
  const forkOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.DECISION}
      className="section-full section-padding relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.04) 0%, transparent 50%),
              var(--color-primary-950)
            `,
          }}
        />

        {/* Walking avatar silhouette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="15" r="10" fill="rgba(255,255,255,0.15)" />
              <line x1="30" y1="25" x2="30" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="40" x2="15" y2="55" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="30" y1="40" x2="45" y2="55" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="30" y1="65" x2="18" y2="95" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="30" y1="65" x2="42" y2="95" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.3) 0%, transparent 70%)',
              }}
            />
          </div>
        </motion.div>

        {/* Title text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="badge border-white/10 mb-6">
            The Road Divides
          </div>
          <h2 className="heading-2 text-white">
            Two paths. <span className="text-gradient-vivid">One journey.</span>
          </h2>
        </motion.div>

        {/* The Fork — Two paths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-16"
        >
          {/* Left Path — Tech */}
          <div className="flex-1 text-center w-full group">
            <motion.a
              href={`#${SECTIONS.TECH}`}
              className="block card-glass card-glass-hover h-full cursor-pointer no-underline"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl"
                style={{
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                }}
              >
                💻
              </div>
              <h3 className="heading-3 text-accent-blue mb-3">Technology</h3>
              <p className="body-text">Code, create & innovate</p>
            </motion.a>
          </div>

          {/* Divider */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent mb-4" />
            <span className="text-text-muted font-mono tracking-widest text-sm">&</span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent mt-4" />
          </div>

          {/* Right Path — Athletics */}
          <div className="flex-1 text-center w-full group">
            <motion.a
              href={`#${SECTIONS.ATHLETICS}`}
              className="block card-glass card-glass-hover h-full cursor-pointer no-underline"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl"
                style={{
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.2)',
                }}
              >
                🏃
              </div>
              <h3 className="heading-3 text-accent-amber mb-3">Athletics</h3>
              <p className="body-text">Speed, power & glory</p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
