'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

const services = [
  {
    index: '01',
    title: 'Product engineering',
    tagline: 'Digital products, built to be used.',
    description:
      'We take customer-facing products from first flow to production — portals, apps and platforms designed around real use, not a feature list.',
    bullets: ['Product & UX design', 'Web & mobile apps', 'Portals & platforms'],
    meta: 'Product / 6–12 weeks',
  },
  {
    index: '02',
    title: 'Business platforms',
    tagline: 'One source of truth, shaped like your business.',
    description:
      'ERP, PLM and internal tools that unify inventory, production, finance and reporting around the way your teams actually work.',
    bullets: ['Custom ERP & PLM', 'Data migration & integrations', 'Reporting & permissions'],
    meta: 'Platform / 8–16 weeks',
  },
  {
    index: '03',
    title: 'AI & automation',
    tagline: 'Let the busywork run itself.',
    description:
      'Approvals, documents, email and cross-app handoffs automated end to end — including AI connectors with a human in the loop where it matters.',
    bullets: ['Workflow & approval flows', 'API & MCP integrations', 'AI with human control'],
    meta: 'Automation / 3–8 weeks',
  },
]

function ConsultingVisual() {
  return (
    <svg viewBox="0 0 320 320" className="size-full" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="consultCore">
          <stop offset="0%" stopColor="#dff7ff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#5aa9ff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#5aa9ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="132" stroke="rgba(255,255,255,0.08)" strokeDasharray="1 8" />
      <g className="visual-ring">
        <circle cx="160" cy="160" r="112" stroke="rgba(90,169,255,0.28)" strokeDasharray="3 9" />
        <circle cx="272" cy="160" r="3.5" fill="#78f0cd" />
      </g>
      <g className="visual-ring-reverse">
        <circle cx="160" cy="160" r="82" stroke="rgba(120,240,205,0.24)" />
        <circle cx="218" cy="102" r="2.5" fill="#5aa9ff" />
      </g>
      <circle cx="160" cy="160" r="64" stroke="rgba(255,255,255,0.08)" />
      <circle cx="160" cy="160" r="30" fill="url(#consultCore)" className="visual-pulse" />
      <circle cx="160" cy="160" r="3" fill="#eaf9ff" />
      <path d="M160 160 92 108M160 160l74-34M160 160l31 78" stroke="rgba(255,255,255,0.14)" strokeDasharray="2 4" />
      <g fill="rgba(255,255,255,0.55)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.4">
        <text x="48" y="102">STRATEGY</text>
        <text x="232" y="120">DATA</text>
        <text x="193" y="246">PEOPLE</text>
      </g>
      <circle cx="92" cy="108" r="3" fill="#5aa9ff" />
      <circle cx="234" cy="126" r="3" fill="#78f0cd" />
      <circle cx="191" cy="238" r="3" fill="#5aa9ff" />
    </svg>
  )
}

function ErpVisual() {
  return (
    <svg viewBox="0 0 320 320" className="size-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="plateTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3b5e" />
          <stop offset="100%" stopColor="#0c1d33" />
        </linearGradient>
        <linearGradient id="plateEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b83c8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0b1a2a" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g className="erp-float">
        <path d="M160 178 268 234 160 290 52 234Z" fill="url(#plateTop)" stroke="rgba(90,169,255,0.35)" />
        <path d="M52 234v12l108 56v-12Z" fill="url(#plateEdge)" />
        <path d="M268 234v12l-108 56v-12Z" fill="rgba(8,22,38,0.8)" />
        <path d="M160 120 250 167 160 214 70 167Z" fill="#0a1729" stroke="rgba(120,240,205,0.3)" />
        <path d="M70 167v9l90 47v-9Z" fill="rgba(120,240,205,0.09)" />
        <path d="M250 167v9l-90 47v-9Z" fill="rgba(4,10,18,0.7)" />
        <path d="M160 62 232 101 160 140 88 101Z" fill="#0d2038" stroke="rgba(90,169,255,0.5)" />
        <path d="M88 101v9l72 39v-9Z" fill="rgba(90,169,255,0.12)" />
        <path d="M232 101v9l-72 39v-9Z" fill="rgba(4,10,18,0.6)" />
        <circle cx="160" cy="101" r="3" fill="#78f0cd" />
        <circle cx="128" cy="96" r="1.8" fill="rgba(255,255,255,0.45)" />
        <circle cx="193" cy="102" r="1.8" fill="rgba(255,255,255,0.45)" />
        <path d="M160 101 128 96M160 101l33 1" stroke="rgba(120,240,205,0.4)" strokeDasharray="2 3" />
      </g>
      <g stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4">
        <path d="M232 101h30v-23" />
        <path d="M250 167h24v19" />
        <path d="M218 252h32" />
      </g>
      <g fill="rgba(255,255,255,0.55)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.4">
        <text x="264" y="73">REPORTING</text>
        <text x="276" y="198">PEOPLE</text>
        <text x="252" y="268">STOCK</text>
      </g>
      <circle cx="263" cy="78" r="2" fill="#78f0cd" />
    </svg>
  )
}

function AutomationVisual() {
  return (
    <svg viewBox="0 0 320 320" className="size-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5aa9ff" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#78f0cd" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#5aa9ff" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect x="28" y="140" width="72" height="40" rx="9" fill="rgba(12,26,44,0.9)" stroke="rgba(90,169,255,0.35)" />
      <rect x="132" y="64" width="74" height="38" rx="9" fill="rgba(12,26,44,0.9)" stroke="rgba(255,255,255,0.18)" />
      <rect x="132" y="218" width="74" height="38" rx="9" fill="rgba(12,26,44,0.9)" stroke="rgba(255,255,255,0.18)" />
      <rect x="228" y="140" width="64" height="40" rx="9" fill="rgba(120,240,205,0.08)" stroke="rgba(120,240,205,0.45)" />
      <path
        d="M100 152c18 0 18-48 32-48M100 168c18 0 18 48 32 48M164 83c40 0 24 69 64 69M164 237c40 0 24-69 64-69"
        stroke="url(#flowLine)"
        strokeWidth="1.3"
        className="flow-dash"
      />
      <circle r="2.6" fill="#78f0cd">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M100 152c18 0 18-48 32-48" />
      </circle>
      <circle r="2.6" fill="#5aa9ff">
        <animateMotion dur="3.2s" begin="0.7s" repeatCount="indefinite" path="M100 168c18 0 18 48 32 48" />
      </circle>
      <circle r="2.6" fill="#78f0cd">
        <animateMotion dur="2.6s" begin="1.1s" repeatCount="indefinite" path="M164 83c40 0 24 69 64 69" />
      </circle>
      <g fill="rgba(255,255,255,0.6)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.2" textAnchor="middle">
        <text x="64" y="164">REQUEST</text>
        <text x="169" y="87">APPROVE</text>
        <text x="169" y="241">ENRICH</text>
        <text x="260" y="164">DONE</text>
      </g>
      <circle cx="64" cy="150" r="2" fill="#5aa9ff" />
      <circle cx="169" cy="76" r="2" fill="#78f0cd" />
      <circle cx="169" cy="230" r="2" fill="#5aa9ff" />
      <circle cx="260" cy="150" r="2" fill="#78f0cd" />
      <g fill="rgba(255,255,255,0.25)" fontFamily="var(--font-mono)" fontSize="5.5" letterSpacing="1.1">
        <text x="28" y="300">TRIGGER</text>
        <text x="250" y="204">COMPLETE</text>
      </g>
    </svg>
  )
}

function ActiveVisual({ active }: { active: number }) {
  return (
    <div key={active} className="service-visual is-active">
      {active === 0 && <ConsultingVisual />}
      {active === 1 && <ErpVisual />}
      {active === 2 && <AutomationVisual />}
    </div>
  )
}

export function Services() {
  const [active, setActive] = useState(0)
  const service = services[active]

  return (
    <section id="services" className="section relative">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end" data-reveal>
          <div>
            <span className="section-kicker mono text-[0.6rem]">
              <span className="section-index">03</span> What we do
            </span>
            <h2 className="section-heading mt-6">
              Three disciplines.
              <br />
              One <span className="serif text-gradient">delivery team</span>.
            </h2>
          </div>
          <p className="max-w-md text-[0.92rem] leading-[1.85] text-dim md:justify-self-end md:pb-2">
            Product, platform and automation are not separate projects. We connect
            them into one coherent build — then stay to make sure it holds.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-12 xl:grid-cols-[1.25fr_0.75fr] xl:gap-16">
          <div data-reveal>
            {services.map((item, i) => (
              <a
                key={item.title}
                href="#contact"
                aria-label={`${item.title} — start a project`}
                className={`service-row group ${active === i ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="service-num">{item.index}</span>
                <span className="service-title">{item.title}</span>
                <span className="service-desc">{item.description}</span>
                <span className="service-arrow">
                  <span className="arrow-circle">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </a>
            ))}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <span className="mono text-[0.52rem] text-white/30">
                Every engagement starts with a conversation
              </span>
              <a href="#contact" className="link-underline mono text-[0.55rem] text-mint/80">
                Talk through your build →
              </a>
            </div>
          </div>

          <div className="hidden xl:block">
            <div className="service-preview sticky top-[calc(var(--header-h)+2rem)] aspect-[4/5]">
              <div className="preview-grid" />
              <div className="relative z-10 flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="mono text-[0.5rem] text-white/40">
                    Capability / {service.index}
                  </span>
                  <span className="mono text-[0.5rem] text-white/25">SAFE NET</span>
                </div>

                <div className="relative min-h-0 flex-1">
                  <ActiveVisual active={active} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070c16] to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="mono text-[0.5rem] tracking-[0.18em] text-mint/70">{service.meta}</div>
                  <h3 className="mt-2 text-[1.35rem] font-medium tracking-[-0.035em] text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[0.78rem] leading-[1.7] text-dim">{service.tagline}</p>
                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-4">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-[0.76rem] text-white/65">
                        <Check className="size-3 text-mint" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
