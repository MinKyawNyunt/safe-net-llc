'use client'

import { useEffect, useRef, useState } from 'react'
import { LogoMark } from '@/components/logo'

const INTRO_KEY = 'safenet-intro'

function finishIntro() {
  document.documentElement.classList.add('intro-complete')
  document.documentElement.classList.remove('intro-running')
  document.body.style.removeProperty('overflow')
  window.dispatchEvent(new Event('sn:intro-complete'))
}

export function Preloader() {
  const [done, setDone] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try {
      seen = window.sessionStorage.getItem(INTRO_KEY) === '1'
    } catch {
      seen = false
    }

    if (seen || reduce) {
      setDone(true)
      finishIntro()
      return
    }

    document.documentElement.classList.add('intro-running')
    document.body.style.overflow = 'hidden'

    const duration = 1550
    const start = performance.now()
    let raf = 0
    let exitTimer = 0
    let removeTimer = 0
    let safetyTimer = 0
    let lastValue = -1
    let exitingStarted = false

    const beginExit = () => {
      if (exitingStarted) return
      exitingStarted = true
      setProgress(100)
      setExiting(true)
      try {
        window.sessionStorage.setItem(INTRO_KEY, '1')
      } catch {
        /* storage may be unavailable */
      }
      removeTimer = window.setTimeout(() => {
        setDone(true)
        finishIntro()
      }, 720)
    }

    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1)
      // Ease out so the counter feels alive instead of linear.
      const eased = 1 - Math.pow(1 - raw, 3)
      const value = Math.min(100, Math.round(eased * 100))
      if (value !== lastValue) {
        lastValue = value
        setProgress(value)
      }
      if (raw < 1) {
        raf = window.requestAnimationFrame(tick)
      } else {
        exitTimer = window.setTimeout(beginExit, 180)
      }
    }

    raf = window.requestAnimationFrame(tick)
    // Guarantee the intro ends even if animation frames are throttled.
    safetyTimer = window.setTimeout(beginExit, duration + 700)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(exitTimer)
      window.clearTimeout(removeTimer)
      window.clearTimeout(safetyTimer)
      document.body.style.removeProperty('overflow')
    }
  }, [])

  if (done) return null

  return (
    <div className={`preloader ${exiting ? 'is-exiting' : ''}`} aria-hidden="true">
      <div className="preloader-panel is-top" />
      <div className="preloader-panel is-bottom" />

      <div className="preloader-corner absolute inset-x-0 top-0 z-[3] flex items-start justify-between px-[var(--pad)] pt-6 opacity-60">
        <span className="mono text-[0.56rem] text-white/50">Safe Net LLC</span>
        <span className="mono text-[0.56rem] text-white/50">Systems Studio</span>
      </div>

      <div className="preloader-corner absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between px-[var(--pad)] pb-6 opacity-60">
        <span className="mono text-[0.52rem] text-white/40">Worldwide</span>
        <span className="mono text-[0.52rem] text-white/40">43.6°N / 106.9°W</span>
      </div>

      <div className="preloader-content">
        <div className="preloader-logo text-[#7dc4ff]">
          <LogoMark className="h-[70px] w-[60px]" strokeWidth={1.4} />
        </div>

        <div className="text-center">
          <div className="mono text-[0.62rem] tracking-[0.34em] text-white/80">SAFE NET</div>
          <div className="mt-1.5 mono text-[0.48rem] tracking-[0.25em] text-white/30">
            Initializing secure systems
          </div>
        </div>

        <div className="preloader-bar mt-4">
          <div
            className="preloader-bar-fill"
            style={{ transform: `scaleX(${Math.max(progress, 2) / 100})` }}
          />
        </div>

        <div className="flex w-[min(58vw,320px)] items-center justify-between">
          <span className="preloader-count tracking-[0.2em]">EST. 2026</span>
          <span className="preloader-count">{String(progress).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  )
}
