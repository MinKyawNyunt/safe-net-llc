'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/* Magnetic wrapper                                                           */
/* -------------------------------------------------------------------------- */

export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rect: DOMRect | null = null

    const loop = () => {
      currentX += (targetX - currentX) * 0.16
      currentY += (targetY - currentY) * 0.16
      const settled =
        Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1
      if (settled) {
        currentX = targetX
        currentY = targetY
      }
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      raf = settled ? 0 : window.requestAnimationFrame(loop)
    }

    const kick = () => {
      if (!raf) raf = window.requestAnimationFrame(loop)
    }

    const onEnter = () => {
      rect = el.getBoundingClientRect()
    }

    const onMove = (event: MouseEvent) => {
      if (!rect) rect = el.getBoundingClientRect()
      targetX = (event.clientX - (rect.left + rect.width / 2)) * strength
      targetY = (event.clientY - (rect.top + rect.height / 2)) * strength
      kick()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      kick()
    }

    const invalidate = () => {
      rect = null
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', invalidate, { passive: true })

    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', invalidate)
      window.cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <span ref={ref} className={cn('inline-block will-change-transform', className)}>
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Scramble text                                                              */
/* -------------------------------------------------------------------------- */

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>/\\'

export function ScrambleText({
  text,
  className,
  trigger = 'hover',
}: {
  text: string
  className?: string
  trigger?: 'hover' | 'view'
}) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      window.cancelAnimationFrame(rafRef.current)
      const duration = 620
      const start = performance.now()
      const frame = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const reveal = Math.floor(progress * text.length * 1.18)
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const char = text[i]
          if (char === ' ') {
            out += ' '
          } else if (i < reveal) {
            out += char
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
        }
        setDisplay(out)
        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(frame)
        } else {
          setDisplay(text)
        }
      }
      rafRef.current = window.requestAnimationFrame(frame)
    }

    if (trigger === 'hover') {
      el.addEventListener('pointerenter', run)
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !played.current) {
            played.current = true
            window.setTimeout(run, 500)
            io.disconnect()
          }
        },
        { threshold: 0.6 },
      )
      io.observe(el)
      return () => io.disconnect()
    }

    return () => {
      el.removeEventListener('pointerenter', run)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [text, trigger])

  return (
    <span ref={ref} className={cn('inline-block whitespace-nowrap', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Spotlight card                                                             */
/* -------------------------------------------------------------------------- */

export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const frame = useRef(0)
  const point = useRef({ x: 0, y: 0 })
  const rect = useRef<DOMRect | null>(null)

  const paint = () => {
    frame.current = 0
    const el = ref.current
    const box = rect.current
    if (!el || !box) return
    el.style.setProperty('--mx', `${point.current.x - box.left}px`)
    el.style.setProperty('--my', `${point.current.y - box.top}px`)
  }

  return (
    <div
      ref={ref}
      className={cn('bento spotlight-card', className)}
      onPointerEnter={() => {
        rect.current = ref.current?.getBoundingClientRect() || null
      }}
      onPointerMove={(event) => {
        point.current.x = event.clientX
        point.current.y = event.clientY
        if (!frame.current) frame.current = window.requestAnimationFrame(paint)
      }}
      onPointerLeave={() => {
        window.cancelAnimationFrame(frame.current)
        frame.current = 0
      }}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Count-up number                                                            */
/* -------------------------------------------------------------------------- */

export function Counter({
  to,
  suffix = '',
  prefix = '',
  duration = 1800,
  grouping = true,
  className,
}: {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  grouping?: boolean
  className?: string
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(eased * to))
          if (progress < 1) raf = window.requestAnimationFrame(tick)
        }
        raf = window.requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.cancelAnimationFrame(raf)
    }
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {grouping ? value.toLocaleString('en-US') : value}
      {suffix}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Live local time                                                            */
/* -------------------------------------------------------------------------- */

export function LiveTime({
  timeZone = 'America/Denver',
  className,
}: {
  timeZone?: string
  className?: string
}) {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const format = () => {
      try {
        const value = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone,
        }).format(new Date())
        setTime(value)
      } catch {
        setTime('--:--')
      }
    }
    format()
    const id = window.setInterval(format, 20_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return <span className={cn('tabular-nums', className)}>{time}</span>
}
