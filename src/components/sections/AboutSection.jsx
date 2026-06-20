import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import aboutImage from '../../assets/Gemini_Generated_Image_57auko57auko57au.png'

const skills = [
  { name: 'Java', color: '#f89820' },
  { name: 'Spring Boot', color: '#6db33f' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'SQL', color: '#00758f' },
  { name: 'React', color: '#61dafb' },
  { name: 'Node.js', color: '#339933' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const bgOrbX = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const bgOrbY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section section-padding relative overflow-hidden"
      style={{ background: 'var(--color-primary-950)' }}
    >
      {/* ── Ambient Background Orbs ── */}
      <motion.div
        style={{ x: bgOrbX, y: bgOrbY }}
        className="about-orb about-orb--blue"
      />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [20, -20]), y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
        className="about-orb about-orb--purple"
      />
      <div className="about-orb about-orb--teal" />

      {/* ── Subtle Grid ── */}
      <div className="about-grid-bg" />

      <div className="about-container">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="about-header"
        >
          <div className="badge border-accent-blue/20 bg-accent-blue/5 text-accent-blue mb-5">
            <span className="about-badge-dot" />
            About Me
          </div>
          <h2 className="heading-2 text-white mb-4">
            Get to know me
          </h2>
          <p className="body-text text-lg font-light max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
            A glimpse into who I am, what drives me, and the technologies I work with every day.
          </p>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="about-grid">

          {/* ── Image Side ── */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="about-image-wrapper"
          >
            {/* Glow ring behind card */}
            <div className="about-image-glow" />

            <div className="about-image-card">
              <img
                src={aboutImage}
                alt="Lisanth V — Full Stack Developer"
                className="about-image"
                loading="lazy"
              />

              {/* Glassmorphism overlay strip at bottom */}
              <div className="about-image-overlay">
                <div className="about-image-overlay-inner">
                  <span className="about-image-status-dot" />
                  <span className="about-image-status-text">Available for work</span>
                </div>
              </div>
            </div>

            {/* Floating accent shapes */}
            <div className="about-float about-float--1" />
            <div className="about-float about-float--2" />
          </motion.div>

          {/* ── Content Side ── */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="about-content"
          >
            {/* Greeting */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="about-greeting"
            >
              Hi, I'm Lisanth <span className="about-wave"></span>
            </motion.h3>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="about-role-badge"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Full Stack Developer
            </motion.div>

            {/* Introduction paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="about-intro"
            >
              <p>
                Passionate about building <strong>scalable web applications</strong> and <strong>AI-powered experiences</strong> that make a real difference.
              </p>
              <p>
                Skilled in <strong>Java, Spring Boot, JavaScript, SQL</strong>, and modern web technologies — I bring ideas to life with clean architecture and thoughtful engineering.
              </p>
              <p>
                Constantly learning and creating innovative digital solutions. Focused on writing <strong>clean code</strong> and delivering <strong>great user experiences</strong>.
              </p>
            </motion.div>

            {/* Skills Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="about-skills"
            >
              <span className="about-skills-label">Core Stack</span>
              <div className="about-skills-list">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.06 }}
                    className="about-skill-tag"
                    style={{ '--skill-color': skill.color }}
                  >
                    <span className="about-skill-dot" style={{ background: skill.color }} />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="about-metrics"
            >
              {[
                { value: '2+', label: 'Years Exp.' },
                { value: '15+', label: 'Projects' },
                { value: '∞', label: 'Curiosity' },
              ].map((metric) => (
                <div key={metric.label} className="about-metric">
                  <span className="about-metric-value">{metric.value}</span>
                  <span className="about-metric-label">{metric.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
