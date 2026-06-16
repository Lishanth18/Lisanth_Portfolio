import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SECTIONS } from '../context/JourneyContext'

const CAPTIONS = [
  { progress: 0.1, text: 'Every journey begins with a single step...' },
  { progress: 0.3, text: 'Walking through the forest of possibilities...' },
  { progress: 0.5, text: 'Nature whispers the stories of those who dare...' },
  { progress: 0.7, text: 'Ahead lies a choice that changes everything...' },
  { progress: 0.9, text: 'The road divides... which path will you choose?' },
]

const DOT_THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.8, 1]

export default function ForestSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.FOREST}
      className="relative"
      style={{ height: '400vh' }}
    >
      {/* Parallax text captions */}
      {CAPTIONS.map((caption, i) => (
        <CaptionText
          key={i}
          text={caption.text}
          progress={scrollYProgress}
          triggerAt={caption.progress}
          index={i}
        />
      ))}

      {/* Side decorative elements */}
      <div className="sticky top-0 h-screen pointer-events-none">
        {/* Left forest gradient */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(10,26,15,0.6), transparent)',
          }}
        />
        {/* Right forest gradient */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(10,26,15,0.6), transparent)',
          }}
        />

        {/* Progress indicator on the side */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {DOT_THRESHOLDS.map((threshold, i) => (
            <ProgressDot key={i} progress={scrollYProgress} threshold={threshold} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaptionText({ text, progress, triggerAt, index }) {
  const opacity = useTransform(
    progress,
    [triggerAt - 0.08, triggerAt, triggerAt + 0.08, triggerAt + 0.15],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    progress,
    [triggerAt - 0.08, triggerAt, triggerAt + 0.15],
    [30, 0, -20]
  )

  const isLeft = index % 2 === 0

  return (
    <motion.div
      className="fixed top-1/2 -translate-y-1/2 z-20 max-w-xs pointer-events-none"
      style={{
        opacity,
        y,
        left: isLeft ? '5%' : 'auto',
        right: isLeft ? 'auto' : '5%',
        textAlign: isLeft ? 'left' : 'right',
      }}
    >
      <p className="text-lg sm:text-xl font-light text-cream/70 italic leading-relaxed">
        "{text}"
      </p>
      <div
        className="mt-3 h-px w-12"
        style={{
          background: 'linear-gradient(to right, var(--color-forest-400), transparent)',
          marginLeft: isLeft ? 0 : 'auto',
          marginRight: isLeft ? 'auto' : 0,
        }}
      />
    </motion.div>
  )
}

/*
  Each dot is its own component so useTransform (a hook) 
  is called at the top level of a component — NOT inside a .map() loop.
*/
function ProgressDot({ progress, threshold }) {
  const opacity = useTransform(
    progress,
    [threshold - 0.1, threshold],
    [0.2, 0.8]
  )
  const scale = useTransform(
    progress,
    [threshold - 0.1, threshold, threshold + 0.1],
    [0.6, 1, 0.6]
  )

  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-2 h-2 rounded-full bg-forest-300"
    />
  )
}
