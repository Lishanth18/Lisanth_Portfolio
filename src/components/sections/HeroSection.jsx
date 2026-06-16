import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import TypewriterText from '../ui/TypewriterText'

import { useJourney, SECTIONS } from '../../context/JourneyContext'
import heroVideo from '../../assets/in_a_animated_video_with_real.mp4'



export default function HeroSection() {
  const { isAudioEnabled, toggleAudio, setIsAudioEnabled } = useJourney()
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const videoRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const sectionRef = useRef(null)

  const { scrollY } = useScroll()
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.15])
  const textY = useTransform(scrollY, [0, 600], [0, 150])
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.3, 0.8])

  // Removed the useEffect audio fader to handle it strictly within user interaction events.

  const handleVideoEnded = () => {
    const video = videoRef.current
    if (!video) return

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)

    // Stop at end of video
    video.pause()
    video.currentTime = 0
    video.muted = true
    video.volume = 0
    setIsAudioEnabled(false)
  }

  const handleToggleAudio = () => {
    const video = videoRef.current
    if (!video) return

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)

    if (!isAudioEnabled) {
      // Start video from beginning and unmute
      video.currentTime = 0
      video.muted = false
      video.volume = 0.1
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video play failed in click handler:", error)
        })
      }
      
      let vol = 0.1
      fadeIntervalRef.current = setInterval(() => {
        vol = Math.min(vol + 0.1, 1)
        video.volume = vol
        if (vol >= 1) clearInterval(fadeIntervalRef.current)
      }, 50)
      
      setIsAudioEnabled(true)
    } else {
      let vol = video.volume
      fadeIntervalRef.current = setInterval(() => {
        vol = Math.max(vol - 0.1, 0)
        video.volume = vol
        if (vol <= 0) {
          video.pause()
          video.muted = true
          clearInterval(fadeIntervalRef.current)
        }
      }, 50)
      
      setIsAudioEnabled(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.HERO}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 w-full h-full gpu-accelerated"
      >
        <video
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-primary-950"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-primary-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/40 via-transparent to-primary-950/40" />
      </motion.div>



      {/* Audio toggle */}
      <div className="absolute inset-0 z-40 w-full max-w-7xl mx-auto pointer-events-none">
        <motion.button
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: [0.25, 1, 0.5, 1] }}
          onClick={handleToggleAudio}
          aria-label={isAudioEnabled ? 'Mute audio' : 'Enable audio'}
          className="absolute bottom-10 right-6 md:right-12 pointer-events-auto glass-light px-5 py-3 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors group rounded-full border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
        >
          <div className="flex items-end gap-[3px] h-4 w-5">
            {[0, 1, 2, 3].map((j) => (
              <motion.div
                key={j}
                animate={{
                  height: isAudioEnabled
                    ? [4, 14 + j * 2, 6, 12 - j, 4]
                    : 4,
                }}
                transition={{ repeat: Infinity, duration: 1 + j * 0.2 }}
                className={`w-[3px] rounded-full ${
                  isAudioEnabled ? 'bg-accent-blue' : 'bg-text-dim'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors">
            {isAudioEnabled ? 'Stop Video' : 'Play Video'}
          </span>
        </motion.button>
      </div>

      {/* Main Hero Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-left flex items-center h-full"
      >
        <div className="w-full md:w-3/5 lg:w-1/2">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md mb-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="text-zinc-300 font-mono tracking-widest text-[11px] uppercase font-medium">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-accent-cyan font-mono text-sm md:text-base tracking-[0.4em] uppercase mb-4"
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-none mb-4 font-black tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 drop-shadow-2xl">Lisanth</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-8"
          >
            <h2 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-200 tracking-wide drop-shadow-md">
              Full Stack Developer
            </h2>
          </motion.div>

          {/* Typing subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mb-14 h-16 sm:h-12 flex justify-start items-center"
            onAnimationComplete={() => {
              setTimeout(() => setShowSubtitle(true), 200)
            }}
          >
            {showSubtitle && (
              <p className="text-zinc-400 text-lg md:text-xl font-light tracking-wide max-w-xl drop-shadow-sm">
                <TypewriterText
                  text="Building Digital Experiences with Creativity & Intelligence"
                  speed={35}
                  onComplete={() => setTimeout(() => setShowCTA(true), 500)}
                />
              </p>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6"
          >
            <a href={`#${SECTIONS.PROJECTS}`} className="relative group px-8 py-4 rounded-full bg-white text-zinc-900 font-bold tracking-wide overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                View Projects
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a href={`#${SECTIONS.TIMELINE}`} className="group px-8 py-4 rounded-full border border-white/20 text-white font-semibold tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 flex items-center gap-2 hover:scale-105 active:scale-95">
              Explore Journey
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[9px] text-zinc-600 tracking-[0.3em] uppercase font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  )
}
