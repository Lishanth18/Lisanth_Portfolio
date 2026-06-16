import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const PROJECTS = [
  {
    id: 1,
    title: 'Project Alpha',
    tagline: 'Enterprise API Architecture',
    description: 'A highly scalable RESTful API built with Spring Boot and PostgreSQL, featuring secure JWT authentication and robust concurrent data processing.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT'],
    challenges: 'Handling 10k+ concurrent API requests with sub-100ms response times while maintaining data consistency across distributed services.',
    solution: 'Implemented connection pooling, Redis caching layer, and asynchronous event processing with Spring WebFlux.',
    results: 'Achieved 99.9% uptime with average response time of 45ms under load.',
    color: '#3b82f6',
    icon: '🏗️',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'Project Beta',
    tagline: 'Real-Time Full Stack Platform',
    description: 'Full-stack distributed application utilizing React on the frontend and Node.js on the backend. Real-time features implemented via WebSockets with Redis caching.',
    tech: ['React.js', 'Node.js', 'Redis', 'MongoDB', 'WebSocket'],
    challenges: 'Building real-time collaborative features while handling state synchronization across multiple client connections.',
    solution: 'WebSocket-based event system with Redis pub/sub for horizontal scaling and optimistic UI updates for instant feedback.',
    results: 'Supports 500+ concurrent real-time users with zero message loss.',
    color: '#14b8a6',
    icon: '⚡',
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'Project Gamma',
    tagline: 'AI-Powered Automation Pipeline',
    description: 'Python-based automation pipelines and Django backend designed to streamline internal workflows and generate complex analytical reports.',
    tech: ['Python', 'Django', 'MySQL', 'Pandas', 'Celery'],
    challenges: 'Processing large datasets (100k+ rows) for report generation while keeping the user interface responsive.',
    solution: 'Asynchronous task queue with Celery, chunked data processing, and progressive result streaming.',
    results: 'Reduced report generation time from 30 minutes to under 2 minutes.',
    color: '#8b5cf6',
    icon: '🤖',
    github: '#',
    live: '#',
  },
]

function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="card-glass card-glass-hover p-0 overflow-hidden group"
    >
      {/* Hero area */}
      <div className="relative overflow-hidden">
        {/* Project visual - gradient placeholder */}
        <div
          className="w-full aspect-video relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}15, ${project.color}05, var(--color-primary-800))`,
          }}
        >
          {/* Animated grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-7xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            >
              {project.icon}
            </motion.div>
          </div>

          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary-950/60 to-transparent" />

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-800 to-transparent" />

          {/* Project number */}
          <div className="absolute top-4 left-5 flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-white/30">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Links */}
          <div className="absolute top-4 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a href={project.github} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href={project.live} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label="Live Demo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Tagline */}
        <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: project.color }}>
          {project.tagline}
        </p>

        <h3 className="heading-3 text-white mb-4 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>

        <p className="body-text mb-6">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border"
              style={{
                color: project.color,
                borderColor: `${project.color}25`,
                background: `${project.color}08`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expand for case study */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium cursor-pointer bg-transparent border-none"
          style={{ color: project.color }}
        >
          <span>{isExpanded ? 'Hide' : 'View'} Case Study</span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-4">
                <div>
                  <h4 className="text-xs font-mono tracking-widest uppercase text-text-dim mb-2">Challenge</h4>
                  <p className="text-text-muted text-sm font-light">{project.challenges}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono tracking-widest uppercase text-text-dim mb-2">Solution</h4>
                  <p className="text-text-muted text-sm font-light">{project.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono tracking-widest uppercase text-text-dim mb-2">Results</h4>
                  <p className="text-sm font-medium" style={{ color: project.color }}>{project.results}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ProjectsShowcase() {
  return (
    <section
      id={SECTIONS.PROJECTS}
      className="section-full section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-premium opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="badge border-white/10 bg-white/5 text-zinc-300 mb-6">
            Portfolio
          </div>
          <h2 className="heading-2 text-white mb-6">
            Featured <span className="text-gradient-vivid">Work</span>
          </h2>
          <p className="body-text max-w-lg mx-auto">
            Each project is a story of challenges conquered, problems solved, and systems built to last.
          </p>
        </motion.div>

        {/* Projects - cinematic vertical layout */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
