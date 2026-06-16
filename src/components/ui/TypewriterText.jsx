import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 50, delay = 0, className = '', onComplete }) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayedText.length >= text.length) {
      onComplete?.()
      return
    }
    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [started, displayedText, text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      <span
        className="inline-block w-[2px] h-[1em] bg-accent-blue ml-1 align-middle"
        style={{ animation: 'typewriterBlink 0.8s step-end infinite' }}
      />
    </span>
  )
}
