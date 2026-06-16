import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="section-full section-padding bg-primary-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-20 text-left"
        >
          <div className="badge border-accent-purple/20 bg-accent-purple/5 text-accent-purple mb-6">
            Introduction
          </div>
          <h2 className="heading-2 text-white mb-6">About Me</h2>
          <p className="body-text text-lg md:text-xl font-light max-w-3xl leading-relaxed">
            Bridging the gap between highly complex system architecture and seamless user execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="card-glass relative group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 className="heading-3 text-white mb-4">Core Philosophy</h3>
            <p className="body-text mb-6">
              I specialize in <strong className="text-white font-medium">backend development</strong>, API integration, and feature enhancement. I believe that a resilient foundation allows for infinite scalability.
            </p>
            <p className="body-text">
              Whether orchestrating microservices or optimizing raw SQL, my approach is clinical: write clean, maintainable code that solves real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="glass-glow"
          >
            <div className="card-glass h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner transition-transform duration-500 hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-teal">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3 className="heading-3 text-white mb-4">Architectural Approach</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <span className="text-[10px] text-zinc-300">01</span>
                  </div>
                  <p className="body-text text-sm"><strong className="text-white font-medium block mb-1">Resilience</strong> Design systems that expect and gracefully handle failures.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <span className="text-[10px] text-zinc-300">02</span>
                  </div>
                  <p className="body-text text-sm"><strong className="text-white font-medium block mb-1">Scalability</strong> Future-proof architecture ready for enterprise deployment.</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
