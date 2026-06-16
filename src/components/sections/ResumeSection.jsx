import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const TABS = [
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'education', label: 'Education', icon: '🎓' },
]

const EXPERIENCE = [
  {
    title: 'Backend Developer',
    company: 'Acheron',
    period: 'Present',
    highlights: [
      'Architecting and developing highly scalable backend services',
      'Integrating diverse third-party REST APIs for core business functionality',
      'Optimizing complex database queries to reduce latency significantly',
      'Working with IBM Sterling OMS for enterprise order management',
    ],
  },
]

const SKILL_BARS = [
  { name: 'Java', level: 90, color: '#f59e0b' },
  { name: 'Spring Boot', level: 85, color: '#14b8a6' },
  { name: 'React.js', level: 80, color: '#3b82f6' },
  { name: 'Python', level: 75, color: '#22c55e' },
  { name: 'TypeScript', level: 78, color: '#06b6d4' },
  { name: 'SQL / Databases', level: 82, color: '#8b5cf6' },
  { name: 'Docker / DevOps', level: 70, color: '#ef4444' },
  { name: 'AI / Prompt Engineering', level: 65, color: '#a855f7' },
]

const PROJECT_ITEMS = [
  { name: 'Project Alpha', desc: 'Enterprise API Architecture', tech: 'Java, Spring Boot' },
  { name: 'Project Beta', desc: 'Real-Time Full Stack Platform', tech: 'React, Node.js' },
  { name: 'Project Gamma', desc: 'AI-Powered Automation Pipeline', tech: 'Python, Django' },
]

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="mb-5"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white">{skill.name}</span>
        <span className="text-xs font-mono text-text-dim">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            boxShadow: `0 0 10px ${skill.color}30`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState('experience')

  return (
    <section
      id={SECTIONS.RESUME}
      className="section-full section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-premium opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="badge border-accent-teal/20 bg-accent-teal/5 text-accent-teal mb-6">
            Resume
          </div>
          <h2 className="heading-2 text-white mb-4">
            Interactive <span className="text-gradient">Resume</span>
          </h2>
          <p className="body-text max-w-md mx-auto text-center">
            Explore my qualifications interactively, or download the full PDF.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass-dark p-1.5 rounded-2xl flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer border-none ${
                  activeTab === tab.id
                    ? 'bg-accent-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                    : 'bg-transparent text-text-muted hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'experience' && (
              <div className="space-y-6">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="card-glass">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h3 className="heading-3 text-white">{exp.title}</h3>
                      <span className="text-sm font-mono tracking-widest text-accent-teal uppercase">{exp.period}</span>
                    </div>
                    <p className="body-text mb-6">{exp.company}</p>
                    <ul className="space-y-3">
                      {exp.highlights.map((h, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.1 }}
                          className="flex items-start gap-3 text-sm text-zinc-300 font-light"
                        >
                          <span className="text-accent-teal mt-1">♦</span>
                          <span>{h}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="card-glass">
                {SKILL_BARS.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                {PROJECT_ITEMS.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card-glass flex items-center gap-6 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-xl shrink-0">
                      🚀
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                      <p className="text-sm text-text-muted font-light">{project.desc}</p>
                    </div>
                    <span className="text-xs font-mono text-text-dim hidden sm:block">{project.tech}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="card-glass">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 shrink-0 text-3xl">
                    🎓
                  </div>
                  <div>
                    <h3 className="heading-3 text-white mb-2">
                      B.E. Computer Science & Engineering
                    </h3>
                    <p className="body-text mb-1">
                      Nadar Saraswathi College of Engineering and Technology
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-sm font-mono text-accent-blue">2021 – 2025</span>
                      <span className="text-sm font-mono text-accent-teal">GPA: 7.8</span>
                    </div>
                    <p className="body-text mb-6">
                      Built a strong theoretical foundation focusing on data structures, algorithmic efficiency, database management systems, and modern software engineering principles.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Data Structures', 'Algorithms', 'Database Systems', 'System Design', 'Software Engineering', 'Computer Networks'].map((course) => (
                        <span key={course} className="text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 border border-white/5 rounded-full bg-white/[0.02] text-zinc-400">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="btn-primary inline-flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
