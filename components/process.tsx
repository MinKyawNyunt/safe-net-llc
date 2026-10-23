'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Discover',
    duration: 'Weeks 01–02',
    description:
      'We watch the work, not the org chart. Interviews, systems audit and a map of how value actually moves through your business.',
    outputs: ['Process map', 'Systems audit', 'Opportunity brief'],
  },
  {
    num: '02',
    title: 'Architect',
    duration: 'Weeks 02–04',
    description:
      'We turn the map into a build plan: data model, module boundaries, integrations and the metrics that will define success.',
    outputs: ['Solution blueprint', 'Data model', 'Delivery plan'],
  },
  {
    num: '03',
    title: 'Build',
    duration: 'Weeks 04–12',
    description:
      'A small senior team ships in visible two-week cycles. You see working software and working decisions — not status decks.',
    outputs: ['Working modules', 'Integrations', 'QA & training'],
  },
  {
    num: '04',
    title: 'Operate',
    duration: 'Ongoing',
    description:
      'We launch, monitor and refine. Your team gets the keys, the documentation and a partner who stays past the handover.',
    outputs: ['Monitoring', 'Iteration', 'Team enablement'],
  },
]

export function Process() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!nodes.length) return

    if (!('IntersectionObserver' in window)) {
      setActive(0)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = nodes.indexOf(entry.target as HTMLDivElement)
          if (index >= 0) setActive(index)
        }
      },
      { rootMargin: '-46% 0px -46% 0px', threshold: 0 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="section relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <div data-reveal>
              <span className="section-kicker mono text-[0.6rem]">
                <span className="section-index">05</span> How we work
              </span>
              <h2 className="section-heading mt-6">
                A clear path from
                <br />
                chaos to <span className="serif text-gradient">control</span>.
              </h2>
              <p className="mt-6 max-w-md text-[0.92rem] leading-[1.85] text-dim">
                No black boxes, no big reveals. A visible process with senior people
                in the room and working software at every step.
              </p>
            </div>

            <div
              className="mt-12 hidden gap-6 lg:flex"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              <div className="process-rail">
                <div
                  className="process-rail-fill"
                  style={{
                    height: `${((active + 1) / steps.length) * 100}%`,
                    transition: 'height 0.7s var(--ease)',
                  }}
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                {steps.map((step, i) => (
                  <span
                    key={step.num}
                    className={`mono text-[0.5rem] transition-colors duration-500 ${
                      i <= active ? 'text-white/70' : 'text-white/20'
                    }`}
                  >
                    {step.num} — {step.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-5" data-reveal>
              <span className="flex size-9 items-center justify-center rounded-full border border-mint/25 bg-mint/[0.05]">
                <ArrowUpRight className="size-3.5 text-mint" />
              </span>
              <span className="mono max-w-[16rem] text-[0.52rem] leading-relaxed text-white/35">
                Typical engagement 6–14 weeks. Senior-led, end to end.
              </span>
            </div>
          </div>

          <div>
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                className={`process-step group ${active === i ? 'is-active' : ''}`}
              >
                <div className="flex items-start gap-5 sm:gap-8">
                  <span className="process-num mono pt-1 text-[0.62rem]">{step.num}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="process-title text-[clamp(1.7rem,3vw,2.6rem)] font-medium tracking-[-0.045em] text-white">
                        {step.title}
                      </h3>
                      <span className="mono text-[0.5rem] tracking-[0.18em] text-white/30">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-4 max-w-lg text-[0.88rem] leading-[1.8] text-dim">
                      {step.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {step.outputs.map((output) => (
                        <span
                          key={output}
                          className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 mono text-[0.48rem] text-white/45"
                        >
                          {output}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="process-marker hidden sm:block" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
