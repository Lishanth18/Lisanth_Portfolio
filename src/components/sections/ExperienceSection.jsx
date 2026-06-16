import { motion } from 'framer-motion'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-full section-padding bg-primary-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 text-left"
        >
          <div className="badge border-accent-teal/20 bg-accent-teal/5 text-accent-teal mb-6">
            Career Path
          </div>
          <h2 className="heading-2 text-white mb-6">Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-teal/50 via-accent-blue/20 to-transparent" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative pl-16 md:pl-24 group"
          >
            {/* Glowing Dot */}
            <div className="absolute left-4 md:left-[28px] top-6 w-6 h-6 rounded-full bg-primary-950 border-2 border-accent-teal shadow-[0_0_15px_rgba(20,184,166,0.6)] flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-500">
              <div className="w-2 h-2 rounded-full bg-accent-teal" />
            </div>

            <div className="card-glass relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 blur-[50px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="heading-3 text-white tracking-tight">Backend Developer</h3>
                <span className="text-sm font-mono tracking-widest text-accent-teal uppercase">Present</span>
              </div>
              <p className="body-text mb-6 text-zinc-400 font-medium">Acheron</p>
              
              <p className="body-text mb-6">
                Driving backend architecture, API integrations, and continuous feature enhancement for mission-critical applications.
              </p>

              <ul className="space-y-4">
                {[
                  'Architecting and developing highly scalable and resilient backend services.',
                  'Integrating diverse third-party REST APIs to extend core business functionality.',
                  'Optimizing complex database queries to significantly reduce latency.'
                ].map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-start gap-4 body-text text-sm">
                    <span className="text-accent-teal mt-1 text-[10px]">♦</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
