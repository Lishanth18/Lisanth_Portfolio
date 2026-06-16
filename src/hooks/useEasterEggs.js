import { useEffect, useRef, useCallback } from 'react'
import { useJourney } from '../context/JourneyContext'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
]

export default function useEasterEggs() {
  const { devModeActive, setDevModeActive, setMiniGameOpen } = useJourney()
  const konamiIndex = useRef(0)
  const inputBuffer = useRef('')
  const inputTimer = useRef(null)

  // Secret #1: Konami Code
  const handleKonami = useCallback((e) => {
    if (e.code === KONAMI_CODE[konamiIndex.current]) {
      konamiIndex.current++
      if (konamiIndex.current === KONAMI_CODE.length) {
        konamiIndex.current = 0
        setDevModeActive(true)
        // Auto-dismiss after 5 seconds
        setTimeout(() => setDevModeActive(false), 5000)
      }
    } else {
      konamiIndex.current = 0
    }
  }, [setDevModeActive])

  // Secret #2: Type "hire lisanth"
  const handleTyping = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

    inputBuffer.current += e.key.toLowerCase()
    clearTimeout(inputTimer.current)
    inputTimer.current = setTimeout(() => {
      inputBuffer.current = ''
    }, 2000)

    if (inputBuffer.current.includes('hire lisanth')) {
      inputBuffer.current = ''
      triggerConfetti()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKonami)
    window.addEventListener('keypress', handleTyping)
    return () => {
      window.removeEventListener('keydown', handleKonami)
      window.removeEventListener('keypress', handleTyping)
    }
  }, [handleKonami, handleTyping])

  return { devModeActive }
}

function triggerConfetti() {
  const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#14b8a6', '#f59e0b', '#ec4899']
  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;'
  document.body.appendChild(container)

  for (let i = 0; i < 80; i++) {
    const particle = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = Math.random() * 8 + 4
    const x = Math.random() * 100
    const rotation = Math.random() * 360

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      left: ${x}%;
      top: -10px;
      transform: rotate(${rotation}deg);
      opacity: 1;
      animation: confettiFall ${2 + Math.random() * 2}s ease-in forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `
    container.appendChild(particle)
  }

  // Add confetti animation
  const style = document.createElement('style')
  style.textContent = `
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg); opacity: 0; }
    }
  `
  document.head.appendChild(style)

  setTimeout(() => {
    container.remove()
    style.remove()
  }, 4000)

  // Also show a toast
  const toast = document.createElement('div')
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100000;
    padding: 20px 40px;
    background: rgba(17, 24, 39, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 16px;
    color: white;
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    box-shadow: 0 0 60px rgba(59, 130, 246, 0.3);
    animation: fadeInScale 0.5s ease forwards;
  `
  toast.innerHTML = '🎉 You want to hire Lisanth!<br><span style="font-size: 0.9rem; font-weight: 400; opacity: 0.7;">Great choice! Let\'s connect.</span>'
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.style.animation = 'fadeInScale 0.3s ease reverse forwards'
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}
