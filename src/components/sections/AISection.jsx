import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTIONS } from '../../context/JourneyContext'

const SUGGESTED_QUESTIONS = [
  'Who is Lisanth?',
  'What projects has he built?',
  'What technologies does he know?',
  'Can I hire him?',
  'What is his education background?',
]

// Mock AI knowledge base
const KNOWLEDGE_BASE = {
  'who is lisanth': `I'm Lisanth V — a Full Stack Developer passionate about building digital experiences that merge creativity with technical excellence. I graduated from Nadar Saraswathi College of Engineering and Technology (2021-2025) with a GPA of 7.8 in Computer Science. I believe that the discipline and resilience translate directly into how I approach engineering — with precision, endurance, and a relentless drive to improve.`,

  'projects': `I've built several impactful projects:\n\n🏗️ **Project Alpha** — Enterprise API Architecture using Java, Spring Boot, PostgreSQL & Docker. Achieved 99.9% uptime with 45ms average response time.\n\n⚡ **Project Beta** — Real-Time Full Stack Platform with React, Node.js, Redis & WebSockets. Supports 500+ concurrent real-time users.\n\n🤖 **Project Gamma** — AI-Powered Automation Pipeline with Python, Django & Celery. Reduced report generation from 30 minutes to under 2 minutes.\n\nEach project taught me something new about building resilient, scalable systems.`,

  'technologies': `Here's my technical arsenal:\n\n**Languages:** Java, Python, JavaScript, TypeScript, SQL\n**Backend:** Spring Boot, Node.js, Django, REST APIs\n**Frontend:** React.js, HTML/CSS, Tailwind CSS\n**Databases:** PostgreSQL, MySQL, MongoDB, Redis\n**DevOps:** Docker, Git, CI/CD\n**AI/ML:** Prompt Engineering, LLMs, AI Integration\n\nI specialize in backend development and API architecture, but I'm equally comfortable building beautiful frontends.`,

  'hire': `Absolutely! I'm currently open to new opportunities. Here's why you should consider me:\n\n✅ **Full Stack Expertise** — Backend-focused with strong frontend skills\n✅ **Production Experience** — Built and deployed real-world systems\n✅ **Quick Learner** — From Java basics to enterprise systems in record time\n✅ **Disciplined** — Bringing unmatched work ethic to every project\n✅ **AI-Ready** — Already exploring prompt engineering and LLM integration\n\nFeel free to reach out via LinkedIn or email. Let's build something amazing together! 🚀`,

  'education': `I completed my **Bachelor's degree in Computer Science** from **Nadar Saraswathi College of Engineering and Technology** (2021-2025) with a GPA of **7.8**.\n\nKey areas of study:\n📚 Data Structures & Algorithms\n📚 Database Management Systems\n📚 System Design & Architecture\n📚 Software Engineering Principles\n\nBeyond academics, I was actively involved in building personal projects and honing my development skills.`,
}

function getAIResponse(question) {
  const q = question.toLowerCase()
  if (q.includes('who') || q.includes('about') || q.includes('lisanth') && !q.includes('project') && !q.includes('tech') && !q.includes('hire') && !q.includes('edu')) {
    return KNOWLEDGE_BASE['who is lisanth']
  }
  if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('portfolio')) {
    return KNOWLEDGE_BASE['projects']
  }
  if (q.includes('tech') || q.includes('skill') || q.includes('know') || q.includes('stack') || q.includes('language')) {
    return KNOWLEDGE_BASE['technologies']
  }
  if (q.includes('hire') || q.includes('job') || q.includes('opportunity') || q.includes('work with') || q.includes('contact')) {
    return KNOWLEDGE_BASE['hire']
  }
  if (q.includes('edu') || q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('study')) {
    return KNOWLEDGE_BASE['education']
  }
  return `Great question! I'm Lisanth's AI assistant. I can tell you about his projects, technical skills, education, or hiring availability. Try asking something specific like "What technologies does he know?" or "What is his education background?"! 🤖`
}

export default function AISection() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: "Hey! 👋 I'm the AI version of Lisanth. Ask me anything about his skills, projects, experience, or education. I know it all!",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text) => {
    const question = text || input
    if (!question.trim()) return

    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(question)
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: 'ai', content: response }])
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section
      id={SECTIONS.AI}
      className="section-full section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(59,130,246,0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="badge border-accent-purple/20 bg-accent-purple/5 text-accent-purple mb-6">
            AI Assistant
          </div>
          <h2 className="heading-2 text-white mb-4">
            Ask <span className="text-gradient-vivid">AI Lisanth</span>
          </h2>
          <p className="body-text max-w-md mx-auto text-center">
            Chat with my AI version — it knows everything about my skills, projects, and journey.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-glass p-0 overflow-hidden"
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <span className="text-sm">🤖</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Lisanth</p>
              <p className="text-[10px] text-accent-purple font-mono tracking-wider">Online • Portfolio-aware</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-6 space-y-4 scrollbar-thin">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="chat-bubble-ai">
                  <div className="typing-dots flex gap-1 py-1">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          <div className="px-6 py-3 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-accent-purple/30 hover:bg-accent-purple/5 transition-all cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Lisanth..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-text-dim focus:outline-none focus:border-accent-purple/40 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white disabled:opacity-30 cursor-pointer hover:scale-105 transition-transform border-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
