import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', variant = 'default', animate = true }) {
  const variants = {
    default: 'glass',
    light: 'glass-light',
    dark: 'glass-dark',
  }

  const cardClass = variants[variant] || variants.default

  if (!animate) {
    return (
      <div className={`${cardClass} ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${cardClass} ${className}`}
    >
      {children}
    </motion.div>
  )
}
