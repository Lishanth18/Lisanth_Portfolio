import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const PARALLAX_LAYERS = [
  { color: 'rgba(59,130,246,0.03)', y: 0.1, scale: 1.05 },
  { color: 'rgba(139,92,246,0.03)', y: 0.2, scale: 1.1 },
  { color: 'rgba(6,182,212,0.02)', y: 0.3, scale: 1.15 },
]

export default function StorySection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const textY1 = useTransform(scrollYProgress, [0.1, 0.4], [60, 0])
  const textOp1 = useTransform(scrollYProgress, [0.1, 0.25, 0.4, 0.55], [0, 1, 1, 0])
  const textY2 = useTransform(scrollYProgress, [0.4, 0.7], [60, 0])
  const textOp2 = useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.85], [0, 1, 1, 0])
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.STORY}
      className="relative min-h-[200vh] overflow-hidden"
    >
      {/* Parallax background layers */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y: bgY, scale: scaleProgress }}
          className="absolute inset-0 gpu-accelerated"
        >
          {/* Dark forest-like gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 100%, rgba(20,30,20,0.9) 0%, transparent 70%),
                radial-gradient(ellipse at 20% 50%, rgba(10,40,25,0.4) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 30%, rgba(15,25,40,0.3) 0%, transparent 50%),
                linear-gradient(180deg, var(--color-primary-950) 0%, #0a1a0f 50%, var(--color-primary-950) 100%)
              `,
            }}
          />

          {/* Cinematic road/path gradient */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[60%]"
            style={{
              background: 'linear-gradient(to top, rgba(59,130,246,0.05) 0%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Ambient light rays */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Side forest gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-primary-950/80 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-primary-950/80 to-transparent" />
        </motion.div>

        {/* Floating nature particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 2 === 0 ? 'rgba(90,181,110,0.4)' : 'rgba(59,130,246,0.3)',
                left: `${(i * 7 + 5) % 100}%`,
                top: `${(i * 11 + 20) % 80}%`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 5 + i % 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Text content - centered */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            {/* First quote */}
            <motion.div style={{ y: textY1, opacity: textOp1 }} className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center">
                <p className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/80 leading-tight mb-6">
                  Every journey starts with{' '}
                  <span className="text-gradient-vivid">curiosity</span>.
                </p>
                <p className="text-xl sm:text-2xl text-text-muted font-light">
                  Mine started with <span className="text-accent-blue">technology</span>.
                </p>
              </div>
            </motion.div>

            {/* Second quote */}
            <motion.div style={{ y: textY2, opacity: textOp2 }} className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center">
                <p className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/80 leading-tight mb-6">
                  From the first line of{' '}
                  <span className="text-gradient">code</span>
                </p>
                <p className="text-xl sm:text-2xl text-text-muted font-light">
                  to building <span className="text-accent-cyan">digital experiences</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary-950 to-transparent pointer-events-none z-10" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary-950 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
