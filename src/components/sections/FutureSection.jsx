import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const WORDS_LINE1 = "I don't just build software.".split(' ')
const WORDS_LINE2 = 'I build experiences.'.split(' ')
const WORDS_LINE3 = 'The next chapter is'.split(' ')
const HIGHLIGHTS = ['AI,', 'Product Engineering,', 'and Innovation.']

export default function FutureSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.4])

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.FUTURE}
      className="relative min-h-[200vh] overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Dark futuristic background */}
        <div className="absolute inset-0 bg-primary-950" />
        <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 bg-grid" />

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-[120px]"
          />
          <motion.div
            animate={{
              opacity: [0.08, 0.2, 0.08],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-blue/10 blur-[100px]"
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 vignette pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Line 1 */}
          <div className="mb-4 overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/60"
            >
              {WORDS_LINE1.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Line 2 — emphasized */}
          <div className="mb-12 overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {WORDS_LINE2.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="inline-block mr-3 text-gradient-vivid"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent mx-auto mb-12"
          />

          {/* Line 3 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-xl sm:text-2xl text-text-muted font-light mb-6"
          >
            {WORDS_LINE3.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {HIGHLIGHTS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.8 + i * 0.15, type: 'spring', stiffness: 200 }}
                className="text-2xl sm:text-3xl md:text-4xl heading-display text-gradient-vivid"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary-950 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
