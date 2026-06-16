import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SECTIONS } from '../../context/JourneyContext'

const CATEGORIES = ['All', 'Java', 'Spring Boot', 'AI', 'Career', 'Product Engineering']

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Understanding Spring Boot Microservices Architecture',
    excerpt: 'A deep dive into building scalable microservices with Spring Boot, including service discovery, load balancing, and circuit breakers.',
    category: 'Spring Boot',
    readTime: '8 min',
    date: 'Coming Soon',
    color: '#14b8a6',
    icon: '🍃',
  },
  {
    id: 2,
    title: 'Java Design Patterns Every Developer Should Know',
    excerpt: 'Master the essential design patterns — from Singleton and Factory to Observer and Strategy — with practical Java examples.',
    category: 'Java',
    readTime: '12 min',
    date: 'Coming Soon',
    color: '#f59e0b',
    icon: '☕',
  },
  {
    id: 3,
    title: 'Prompt Engineering: The Developer\'s Secret Weapon',
    excerpt: 'How to leverage AI effectively as a developer. Learn advanced prompting techniques that 10x your productivity.',
    category: 'AI',
    readTime: '6 min',
    date: 'Coming Soon',
    color: '#8b5cf6',
    icon: '🧠',
  },
  {
    id: 4,
    title: 'From Intern to Full Stack: My Career Journey',
    excerpt: 'Lessons learned from transitioning from a computer science student to a working professional in the tech industry.',
    category: 'Career',
    readTime: '10 min',
    date: 'Coming Soon',
    color: '#3b82f6',
    icon: '🚀',
  },
  {
    id: 5,
    title: 'Building Products That Users Love',
    excerpt: 'The intersection of engineering excellence and user empathy. How to think like a product engineer.',
    category: 'Product Engineering',
    readTime: '7 min',
    date: 'Coming Soon',
    color: '#ec4899',
    icon: '💡',
  },
  {
    id: 6,
    title: 'REST API Best Practices with Spring Boot',
    excerpt: 'From proper HTTP methods to pagination, error handling, and versioning — build APIs that developers love to use.',
    category: 'Spring Boot',
    readTime: '9 min',
    date: 'Coming Soon',
    color: '#14b8a6',
    icon: '🔗',
  },
]

function BlogCard({ post, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-glass card-glass-hover group flex flex-col cursor-pointer"
    >
      {/* Category & read time */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: post.color,
            background: `${post.color}12`,
            border: `1px solid ${post.color}20`,
          }}
        >
          {post.category}
        </span>
        <span className="text-xs text-text-dim font-mono">{post.readTime}</span>
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{
          background: `${post.color}10`,
          border: `1px solid ${post.color}15`,
        }}
      >
        {post.icon}
      </div>

      {/* Title */}
      <h3 className="heading-3 text-white mb-3 group-hover:text-gradient transition-all duration-300 leading-snug">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="body-text flex-grow mb-4">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-xs text-text-dim font-mono">{post.date}</span>
        <span className="text-xs font-medium group-hover:translate-x-1 transition-transform" style={{ color: post.color }}>
          Read →
        </span>
      </div>
    </motion.article>
  )
}

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id={SECTIONS.BLOG}
      className="section-full section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-premium opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="badge border-accent-blue/20 bg-accent-blue/5 text-accent-blue mb-6">
            Knowledge Base
          </div>
          <h2 className="heading-2 text-white mb-4">
            The <span className="text-gradient">Blog</span>
          </h2>
          <p className="body-text max-w-md mx-auto text-center">
            Thoughts on technology, career growth, and building products that matter.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-text-dim focus:outline-none focus:border-accent-blue/40 transition-colors"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border-none ${
                activeCategory === cat
                  ? 'bg-accent-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'bg-white/5 text-text-muted hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-dim">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}
