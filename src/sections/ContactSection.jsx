import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SECTIONS } from '../context/JourneyContext'
import GlassCard from '../components/ui/GlassCard'
import SocialLink from '../components/ui/SocialLink'

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null) // 'sending' | 'sent' | null

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    // UI placeholder — simulate sending
    setTimeout(() => {
      setFormStatus('sent')
      setTimeout(() => setFormStatus(null), 3000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.CONTACT}
      className="section-full flex items-center justify-center relative py-20"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 70%, rgba(45,107,63,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(212,168,83,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-forest-300/60 mb-4">
            Get in Touch
          </p>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-gradient-nature mb-4">
            Let's Connect
          </h2>
          <p className="text-cream/50 font-light max-w-md mx-auto">
            Have a question, opportunity, or just want to say hello?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <GlassCard className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm text-cream/60 mb-2 font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-forest-800/40 border border-forest-600/20 text-cream/90 placeholder-cream/20 text-sm focus:outline-none focus:border-forest-400/40 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-cream/60 mb-2 font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-forest-800/40 border border-forest-600/20 text-cream/90 placeholder-cream/20 text-sm focus:outline-none focus:border-forest-400/40 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm text-cream/60 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project or just say hi..."
                  className="w-full px-4 py-3 rounded-xl bg-forest-800/40 border border-forest-600/20 text-cream/90 placeholder-cream/20 text-sm focus:outline-none focus:border-forest-400/40 transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={formStatus === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide uppercase transition-all duration-300 border-none cursor-pointer"
                style={{
                  background: formStatus === 'sent'
                    ? 'linear-gradient(135deg, #2d6b3f, #3d8b52)'
                    : 'linear-gradient(135deg, #1d4a28, #2d6b3f)',
                  color: '#f5f0e8',
                  opacity: formStatus === 'sending' ? 0.6 : 1,
                }}
              >
                {formStatus === 'sending'
                  ? 'Sending...'
                  : formStatus === 'sent'
                  ? '✓ Message Sent!'
                  : 'Send Message'}
              </motion.button>
            </form>
          </GlassCard>

          {/* Links & Info */}
          <div className="space-y-6">
            {/* Social links */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-cream/80 mb-4">Connect</h3>
              <div className="space-y-3">
                <SocialLink
                  href="#"
                  icon="💼"
                  label="LinkedIn"
                  delay={0.1}
                />
                <SocialLink
                  href="#"
                  icon="🐙"
                  label="GitHub"
                  delay={0.2}
                />
                <SocialLink
                  href="mailto:lisanth@example.com"
                  icon="📧"
                  label="Email"
                  delay={0.3}
                />
              </div>
            </GlassCard>

            {/* Resume download */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-cream/80 mb-3">Resume</h3>
              <p className="text-sm text-cream/50 mb-4">
                Download my latest resume to learn more about my experience.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium no-underline transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(212,168,83,0.1))',
                  color: '#d4a853',
                  border: '1px solid rgba(212,168,83,0.2)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V10M8 10L5 7M8 10L11 7M3 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Resume
              </motion.a>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pb-8"
        >
          <div className="w-12 h-px bg-forest-600/30 mx-auto mb-4" />
          <p className="text-xs text-cream/30 font-light">
            © {new Date().getFullYear()} Lisanth. Crafted with passion and code.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
