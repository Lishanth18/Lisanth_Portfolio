import { motion } from 'framer-motion'

export default function SocialLink({ href, icon, label, delay = 0 }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300"
      style={{
        background: 'rgba(15, 41, 22, 0.4)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(90, 181, 110, 0.15)',
      }}
    >
      <span className="text-xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="text-sm text-cream/70 group-hover:text-cream transition-colors duration-300 font-medium">
        {label}
      </span>
      <svg
        className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-60 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.a>
  )
}
