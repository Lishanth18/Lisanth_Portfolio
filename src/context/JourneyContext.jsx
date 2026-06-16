import { createContext, useContext, useState, useCallback, useRef } from 'react'

const JourneyContext = createContext(null)

export const SECTIONS = {
  LOADING: 'loading',
  HERO: 'hero',
  STORY: 'story',
  TIMELINE: 'timeline',
  DECISION: 'decision',
  TECH: 'tech-universe',
  ATHLETICS: 'athletics-universe',
  PROJECTS: 'projects',
  AI: 'ai-assistant',
  BLOG: 'blog',
  RESUME: 'resume',
  FUTURE: 'future-vision',
  CONTACT: 'contact',
}

export const NAV_SCENES = [
  { id: SECTIONS.HERO, label: 'Hero', number: 1 },
  { id: SECTIONS.STORY, label: 'Story', number: 2 },
  { id: SECTIONS.TIMELINE, label: 'Journey', number: 3 },
  { id: SECTIONS.DECISION, label: 'Paths', number: 4 },
  { id: SECTIONS.TECH, label: 'Tech', number: 5 },
  { id: SECTIONS.ATHLETICS, label: 'Athletics', number: 5 },
  { id: SECTIONS.PROJECTS, label: 'Projects', number: 6 },
  { id: SECTIONS.AI, label: 'AI', number: 7 },
  { id: SECTIONS.BLOG, label: 'Blog', number: 8 },
  { id: SECTIONS.RESUME, label: 'Resume', number: 9 },
  { id: SECTIONS.FUTURE, label: 'Future', number: 10 },
  { id: SECTIONS.CONTACT, label: 'Contact', number: 11 },
]

export function JourneyProvider({ children }) {
  const [currentSection, setCurrentSection] = useState(SECTIONS.LOADING)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasEnteredExperience, setHasEnteredExperience] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)

  // Easter egg states
  const [devModeActive, setDevModeActive] = useState(false)
  const [avatarClicks, setAvatarClicks] = useState(0)
  const [miniGameOpen, setMiniGameOpen] = useState(false)

  // Scroll progress ref (updated in animation frames, no re-renders)
  const scrollProgressRef = useRef({ global: 0 })

  const enterExperience = useCallback(() => {
    setHasEnteredExperience(true)
    setIsAudioEnabled(false)
    setCurrentSection(SECTIONS.HERO)
  }, [])

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled(prev => !prev)
  }, [])

  const clickAvatar = useCallback(() => {
    setAvatarClicks(prev => {
      const newCount = prev + 1
      if (newCount >= 5) {
        setMiniGameOpen(true)
        return 0
      }
      return newCount
    })
  }, [])

  const value = {
    currentSection,
    setCurrentSection,
    isLoaded,
    setIsLoaded,
    hasEnteredExperience,
    enterExperience,
    isAudioEnabled,
    setIsAudioEnabled,
    toggleAudio,
    scrollProgressRef,
    // Easter eggs
    devModeActive,
    setDevModeActive,
    avatarClicks,
    clickAvatar,
    miniGameOpen,
    setMiniGameOpen,
  }

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const context = useContext(JourneyContext)
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider')
  }
  return context
}
