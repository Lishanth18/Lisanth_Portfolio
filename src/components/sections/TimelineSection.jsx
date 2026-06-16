import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const MILESTONES = [
  {
    year: '2021',
    title: 'Learning Java',
    description: 'The foundation was laid — Object-Oriented Programming, data structures, and the discipline of clean code.',
    icon: '☕',
    color: '#f59e0b',
  },
  {
    year: '2024',
    title: 'Internships Begin',
    description: 'Stepped into the real world of software development. Building production code, learning from senior engineers.',
    icon: '💼',
    color: '#3b82f6',
  },
  {
    year: '2025',
    title: 'IBM Sterling OMS',
    description: 'Deep-diving into enterprise-grade Order Management Systems. Understanding supply chain at scale.',
    icon: '🏢',
    color: '#8b5cf6',
  },
  {
    year: '2025',
    title: 'Spring Boot Mastery',
    description: 'Building robust microservices, REST APIs, and mastering the art of backend architecture.',
    icon: '🍃',
    color: '#14b8a6',
  },
  {
    year: '2026',
    title: 'Full Stack Development',
    description: 'Bridging frontend and backend — React, TypeScript, and end-to-end application development.',
    icon: '🚀',
    color: '#06b6d4',
  },
  {
    year: 'Future',
    title: 'AI Engineering',
    description: 'The next frontier — prompt engineering, LLMs, and building intelligent systems that transform industries.',
    icon: '🧠',
    color: '#a855f7',
  },
]

function TimelineCard({ milestone, index, isLeft }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full flex ${isLeft ? 'justify-end md:pr-12' : 'justify-start md:pl-12'}`}
    >
      {/* Content */}
      <div className="w-full md:w-[90%]">
        <div className="card-glass card-glass-hover text-left group">
          {/* Year badge */}
          <div
            className="badge mb-4"
            style={{
              background: `${milestone.color}15`,
              color: milestone.color,
              borderColor: `${milestone.color}30`,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: milestone.color }} />
            {milestone.year}
          </div>

          <h3 className="heading-3 text-white mb-3 group-hover:text-gradient-vivid transition-all duration-300">
            {milestone.title}
          </h3>

          <p className="body-text">
            {milestone.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TimelineSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.TIMELINE}
      className="section-full section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-mesh-premium opacity-50 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="badge border-accent-blue/20 bg-accent-blue/5 text-accent-blue mb-6">
            The Journey
          </div>
          <h2 className="heading-2 text-white mb-6">
            My <span className="text-gradient-vivid">Timeline</span>
          </h2>
          <p className="body-text max-w-2xl text-center">
            From learning my first programming language to building production systems — every step shaped who I am.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]">
            <div className="w-full h-full bg-primary-700/30 rounded-full" />
            <motion.div
              className="absolute top-0 w-full rounded-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, var(--color-accent-blue), var(--color-accent-purple), var(--color-accent-cyan))',
                boxShadow: '0 0 15px rgba(59,130,246,0.3)',
              }}
            />
          </div>

          {/* Milestone cards */}
          <div className="relative w-full">
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0
              return (
                <div key={index} className="relative mb-12 md:mb-20 last:mb-0 w-full flex flex-col md:flex-row items-center">
                  
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 hidden md:block">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 bg-primary-950"
                      style={{
                        borderColor: milestone.color,
                        boxShadow: `0 0 20px ${milestone.color}40`,
                      }}
                    >
                      {milestone.icon}
                    </motion.div>
                  </div>

                  {/* Left Side (Desktop) */}
                  <div className="w-full md:w-1/2 flex justify-end">
                    {isLeft && (
                      <div className="hidden md:block w-full">
                        <TimelineCard milestone={milestone} isLeft={true} />
                      </div>
                    )}
                  </div>

                  {/* Right Side / Mobile All */}
                  <div className="w-full md:w-1/2 pl-20 md:pl-0">
                    <div className="md:hidden">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="absolute left-6 -translate-x-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 bg-primary-950"
                        style={{
                          top: '1.5rem',
                          borderColor: milestone.color,
                          boxShadow: `0 0 20px ${milestone.color}40`,
                        }}
                      >
                        {milestone.icon}
                      </motion.div>
                      <TimelineCard milestone={milestone} isLeft={false} />
                    </div>
                    {!isLeft && (
                      <div className="hidden md:block w-full">
                        <TimelineCard milestone={milestone} isLeft={false} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
