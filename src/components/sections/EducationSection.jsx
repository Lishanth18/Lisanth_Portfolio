import { motion } from 'framer-motion'

export default function EducationSection() {
  return (
    <section id="education" className="section-full section-padding bg-primary-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 text-left"
        >
          <div className="badge border-white/10 bg-white/5 text-zinc-300 mb-6">
            Academic Foundation
          </div>
          <h2 className="heading-2 text-white mb-6">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="glass-glow"
        >
          <div className="card-glass relative overflow-hidden flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <h3 className="heading-3 text-white tracking-tight">Bachelor's Degree in Computer Science</h3>
                <span className="text-sm font-mono tracking-widest text-zinc-400 bg-white/5 px-3 py-1.5 rounded border border-white/5">
                  20XX - 20XX
                </span>
              </div>
              <p className="body-text text-zinc-400 font-medium mb-6">University Name</p>
              
              <p className="body-text mb-8">
                Built a strong theoretical foundation focusing on data structures, algorithmic efficiency, database management systems, and modern software engineering principles.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {['Data Structures', 'Algorithms', 'Database Systems', 'System Design'].map((course) => (
                  <span key={course} className="text-[11px] font-mono tracking-widest uppercase px-3 py-1.5 border border-white/5 rounded bg-white/[0.02] text-zinc-400">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
