import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const EVENTS = [
  {
    event: '100m Sprint',
    place: '1st Place 🥇',
    time: 'District Athletics Meet',
    color: '#ef4444',
    icon: '⚡',
    story: 'Pure explosive power. In just seconds, everything changes — the roar of the crowd, the burn in your legs, the wind rushing past.',
  },
  {
    event: '200m Sprint',
    place: '1st Place 🥇',
    time: 'District Athletics Meet',
    color: '#f59e0b',
    icon: '🔥',
    story: 'The art of the curve. Leaning into the bend, holding speed through the turn, then unleashing everything on the straight.',
  },
  {
    event: '400m Sprint',
    place: '1st Place 🥇',
    time: 'District Athletics Meet',
    color: '#22c55e',
    icon: '💨',
    story: 'One full lap of pure agony and glory. Both the speed of a sprinter and the endurance of a distance runner.',
  },
  {
    event: '600m',
    place: '1st Place 🥇',
    time: 'District Athletics Meet',
    color: '#06b6d4',
    icon: '🏃',
    story: 'The bridge between sprinting and distance running. Strategy becomes essential — knowing when to push and when to conserve.',
  },
  {
    event: '800m',
    place: '1st Place 🥇',
    time: 'District Athletics Meet',
    color: '#8b5cf6',
    icon: '🎯',
    story: 'Two laps around the track. Chess at full sprint — positioning, pacing, and the devastating final 200-meter kick.',
  },
  {
    event: '1500m',
    place: '1st Place 🥇',
    time: 'District Athletics Meet',
    color: '#ec4899',
    icon: '🏆',
    story: 'The metric mile. Nearly four laps of tactical racing. Every lap demands a new strategy. Where legends are forged.',
  },
  {
    event: '4×100m Relay',
    place: '1st Place 🥇',
    time: 'District Athletics Meet',
    color: '#d4a853',
    icon: '🤝',
    story: 'Teamwork at full speed. The baton pass is everything — milliseconds of trust between teammates moving at maximum velocity.',
  },
]

function EventCard({ event, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div
        className="card-glass card-glass-hover overflow-hidden h-full flex flex-col"
        style={{
          borderColor: `${event.color}15`,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-[40px]"
          style={{ background: event.color }}
        />

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${event.color}20, ${event.color}05)`,
                border: `1px solid ${event.color}30`,
              }}
            >
              {event.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-white tracking-wide">{event.event}</h3>
          </div>
          <div
            className="badge shadow-sm"
            style={{
              color: '#fff',
              background: `linear-gradient(90deg, ${event.color}90, ${event.color}60)`,
              borderColor: `${event.color}40`,
            }}
          >
            {event.place}
          </div>
        </div>

        {/* Race progress bar */}
        <div className="mb-5 h-[2px] rounded-full bg-white/5 overflow-hidden w-full relative">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${event.color}, ${event.color}40)`,
              boxShadow: `0 0 10px ${event.color}60`,
            }}
          />
        </div>

        <p className="body-text flex-1">
          {event.story}
        </p>
      </div>
    </motion.div>
  )
}

export default function AthleticsUniverseSection() {
  return (
    <section
      id={SECTIONS.ATHLETICS}
      className="section-full section-padding relative overflow-hidden"
    >
      {/* Warm ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(239,68,68,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(212,168,83,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Track line decoration */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-amber to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="badge border-accent-amber/20 bg-accent-amber/5 text-accent-amber mb-6">
            Athletics Universe
          </div>
          <h2 className="heading-2 text-white mb-6">
            Born to <span className="text-gradient-amber">Run</span>
          </h2>
          <p className="body-text max-w-lg mx-auto">
            From the 100-meter explosive dash to the 1500-meter endurance test — every race is a chapter in the story of speed.
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="heading-display text-3xl text-accent-amber">7</p>
              <p className="text-xs text-text-dim uppercase tracking-wider">Events</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="heading-display text-3xl text-accent-amber">7</p>
              <p className="text-xs text-text-dim uppercase tracking-wider">Gold Medals</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="heading-display text-3xl text-accent-amber">2021</p>
              <p className="text-xs text-text-dim uppercase tracking-wider">Year</p>
            </div>
          </div>
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event, index) => (
            <EventCard key={event.event} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-950 to-transparent pointer-events-none" />
    </section>
  )
}
