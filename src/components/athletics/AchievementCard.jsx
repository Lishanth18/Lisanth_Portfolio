import { motion } from 'framer-motion'
import { MEDAL_COLORS } from '../../data/achievements'
import GlassCard from '../ui/GlassCard'

export default function AchievementCard({ achievement, index = 0 }) {
  const medalColor = MEDAL_COLORS[achievement.medal] || MEDAL_COLORS.gold

  const medalIcons = {
    gold: '🥇',
    silver: '🥈',
    bronze: '🥉',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full max-w-sm"
    >
      <GlassCard className="p-6 relative overflow-hidden" animate={false}>
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${achievement.color}, transparent)` }}
        />

        {/* Medal & Event */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-cream/40 tracking-widest uppercase mb-1">
              Chapter {achievement.chapter}
            </p>
            <h3
              className="heading-display text-xl"
              style={{ color: achievement.color }}
            >
              {achievement.event}
            </h3>
          </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="text-3xl"
            style={{
              filter: `drop-shadow(0 0 8px ${medalColor.glow})`,
            }}
          >
            {medalIcons[achievement.medal]}
          </motion.div>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-cream/90 mb-1">
          {achievement.title}
        </h4>
        <p className="text-sm text-cream/50 mb-4">{achievement.subtitle}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass-light p-2 rounded-lg text-center">
            <p className="text-xs text-cream/40 mb-0.5">Date</p>
            <p className="text-sm font-semibold text-cream/80">{achievement.date}</p>
          </div>
          <div className="glass-light p-2 rounded-lg text-center">
            <p className="text-xs text-cream/40 mb-0.5">Result</p>
            <p className="text-sm font-semibold" style={{ color: achievement.color }}>
              {achievement.result}
            </p>
          </div>
          <div className="glass-light p-2 rounded-lg text-center">
            <p className="text-xs text-cream/40 mb-0.5">Event</p>
            <p className="text-sm font-semibold text-cream/80 truncate">{achievement.competition}</p>
          </div>
        </div>

        {/* Story */}
        <p className="text-sm text-cream/60 font-light leading-relaxed">
          {achievement.story}
        </p>

        {/* Bottom glow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-xl opacity-20"
          style={{ background: achievement.color }}
        />
      </GlassCard>
    </motion.div>
  )
}
