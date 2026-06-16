import { motion } from 'framer-motion'

export default function PathButton({ icon, label, subtitle, glowColor, onClick, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative px-8 py-6 rounded-2xl cursor-pointer text-left w-64 border-0"
      style={{
        background: 'rgba(15, 41, 22, 0.5)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${glowColor}33`,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor}15, transparent 70%)`,
          boxShadow: `0 0 40px ${glowColor}20, inset 0 0 40px ${glowColor}08`,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          border: `1px solid ${glowColor}66`,
        }}
      />

      <div className="relative z-10">
        <span className="text-3xl mb-3 block">{icon}</span>
        <h3 className="heading-display text-xl mb-1" style={{ color: glowColor }}>
          {label}
        </h3>
        <p className="text-sm text-cream/50 font-light">
          {subtitle}
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-70 transition-all duration-300"
        style={{ color: glowColor }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.button>
  )
}
