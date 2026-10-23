'use client'

import { useEffect, useRef, useState } from 'react'
import { Counter } from '@/components/interactions'

const sentence =
  'Your business is a living system. Every order, approval, invoice and handoff is a signal. When those signals get lost, growth turns into friction. We build the digital nervous system that keeps them moving — clearly, securely, at the speed your business actually runs.'

const keywordStems = new Set(['signal', 'signals', 'friction', 'nervous', 'system', 'systems'])

const words = sentence.split(' ')
const barHeights = [38, 62, 44, 78, 54, 90, 66, 48, 72, 40, 58, 84, 50, 68, 36, 76]

const stats = [
  { to: 2026, suffix: '', label: 'Founded', note: 'Wyoming LLC', plain: true },
  { to: 7, suffix: '', label: 'Products shipped', note: 'Across six industries' },
  { to: 6, suffix: '', label: 'Industries served', note: 'Security to hospitality' },
  { to: 1, suffix: '', label: 'Open-source release', note: 'IMAP MCP connector' },
]

const principles = [
  { num: '01', title: 'Signal over noise', copy: 'We start with how work actually moves, not with a software wish list.' },
  { num: '02', title: 'One source of truth', copy: 'Every decision, record and handoff lives in the same reliable system.' },
  { num: '03', title: 'Built with your team', copy: 'Your people are in the room from the first map to the final release.' },
]

export function Manifesto() {
  const textRef = useRef<HTMLParagraphElement | null>(null)
  const [lit, setLit] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(words.length)
      return
    }

    const el = textRef.current
    if (!el) return

    let raf = 0
    let top = 0

    const measure = () => {
      const rect = el.getBoundingClientRect()
      top = rect.top + window.scrollY
    }

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const start = vh * 0.88
      const end = vh * 0.34
      const raw = (start - (top - window.scrollY)) / Math.max(start - end, 1)
      const next = Math.round(Math.min(Math.max(raw, 0), 1) * words.length)
      setLit((current) => (current === next ? current : next))
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="manifesto" className="section relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-[3vw] top-[12%] select-none text-[19vw] font-medium leading-none tracking-[-0.07em] text-transparent"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.045)' }}
        aria-hidden="true"
      >
        SIGNAL
      </div>

      <div className="shell relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-[calc(var(--header-h)+3rem)]" data-reveal>
            <span className="section-kicker mono text-[0.6rem]">
              <span className="section-index">02</span> The problem
            </span>
            <h2 className="section-heading mt-6">
              The work is the <span className="serif">system</span>.
            </h2>
            <p className="mt-6 max-w-sm text-[0.92rem] leading-[1.85] text-dim">
              Most systems don&apos;t fail loudly. They slowly stop matching how your
              business actually works — until everyone is working around them.
            </p>

            <div className="mt-10 flex items-end gap-4 border-t border-white/10 pt-6">
              <div className="signal-bars" aria-hidden="true">
                {barHeights.map((height, i) => (
                  <span
                    key={i}
                    style={
                      {
                        '--h': `${height}%`,
                        '--d': `${i * 70}ms`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
              <div>
                <span className="mono text-[0.5rem] text-white/30">Signal integrity</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-mint shadow-[0_0_8px_rgba(120,240,205,0.8)]" />
                  <span className="mono text-[0.55rem] text-mint/80">LIVE / NOMINAL</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p
              ref={textRef}
              aria-label={sentence}
              className="text-[clamp(1.5rem,2.7vw,2.5rem)] font-medium leading-[1.35] tracking-[-0.035em]"
            >
              {words.map((word, i) => {
                const stem = word.toLowerCase().replace(/[^a-z]/g, '')
                const key = keywordStems.has(stem)
                return (
                  <span
                    key={`${word}-${i}`}
                    className={`scroll-word ${i < lit ? 'is-lit' : ''} ${key ? 'word-key' : ''}`}
                    aria-hidden="true"
                  >
                    {word}{' '}
                  </span>
                )
              })}
            </p>

            <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
              {principles.map((principle, i) => (
                <div
                  key={principle.num}
                  data-reveal
                  style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
                >
                  <span className="mono text-[0.55rem] text-mint/70">{principle.num}</span>
                  <h3 className="mt-3 text-[0.95rem] font-medium tracking-[-0.02em] text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-[1.7] text-dim">{principle.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
              className={`group border-white/10 py-8 lg:px-8 ${
                i % 2 === 1 ? 'border-l pl-5 sm:pl-8' : 'lg:border-l lg:pl-8'
              } ${i < 2 ? 'border-b lg:border-b-0' : ''}`}
            >
              <div className="flex items-baseline gap-1 text-[clamp(2.3rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.05em] text-ink transition-colors duration-500 group-hover:text-mint">
                <Counter
                  to={stat.to}
                  suffix={stat.suffix}
                  grouping={!('plain' in stat && stat.plain)}
                />
              </div>
              <div className="mt-3 text-[0.78rem] text-white/70">{stat.label}</div>
              <div className="mt-1 mono text-[0.48rem] text-white/30">{stat.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
