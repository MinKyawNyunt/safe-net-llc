import { Globe2, Layers, ShieldCheck, Users } from 'lucide-react'
import { SpotlightCard } from '@/components/interactions'

const features = [
  {
    icon: ShieldCheck,
    title: 'Security by default',
    copy: 'Least-privilege access, encrypted data and auditable systems from day one — not bolted on at the end.',
  },
  {
    icon: Users,
    title: 'One accountable team',
    copy: 'The people who map the system are the people who build it. No account managers relaying messages.',
  },
  {
    icon: Layers,
    title: 'Built to be lived in',
    copy: 'We design for the Tuesday-afternoon reality of your operations, not for a launch-day demo.',
  },
]

function StudioOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-44 sm:w-52">
      <svg viewBox="0 0 240 240" className="size-full" fill="none" aria-hidden="true">
        <circle cx="120" cy="120" r="114" stroke="rgba(255,255,255,0.07)" strokeDasharray="1 7" />
        <g className="visual-ring">
          <circle cx="120" cy="120" r="92" stroke="rgba(90,169,255,0.24)" strokeDasharray="3 8" />
          <circle cx="212" cy="120" r="3" fill="#5aa9ff" />
        </g>
        <g className="visual-ring-reverse">
          <circle cx="120" cy="120" r="68" stroke="rgba(120,240,205,0.2)" />
          <circle cx="168" cy="72" r="2.5" fill="#78f0cd" />
        </g>
        <circle cx="120" cy="120" r="42" stroke="rgba(255,255,255,0.09)" />
        <circle cx="120" cy="120" r="17" fill="rgba(120,240,205,0.07)" stroke="rgba(120,240,205,0.35)" />
        <circle cx="120" cy="120" r="3" fill="#78f0cd" />
        <path d="M120 18v20M120 202v20M18 120h20M202 120h20" stroke="rgba(255,255,255,0.14)" />
        <g fill="rgba(255,255,255,0.35)" fontFamily="var(--font-mono)" fontSize="6" letterSpacing="1.4">
          <text x="120" y="12" textAnchor="middle">01</text>
          <text x="120" y="235" textAnchor="middle">04</text>
          <text x="8" y="123">02</text>
          <text x="218" y="123">03</text>
        </g>
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mono text-[0.45rem] tracking-[0.2em] text-mint/70">
        SN
      </span>
    </div>
  )
}

export function Studio() {
  return (
    <section id="about" className="section relative">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end" data-reveal>
          <div>
            <span className="section-kicker mono text-[0.6rem]">
              <span className="section-index">06</span> About the studio
            </span>
            <h2 className="section-heading mt-6">
              A small studio,
              <br />
              <span className="serif text-gradient">built for the long run</span>.
            </h2>
          </div>
          <p className="max-w-md text-[0.92rem] leading-[1.85] text-dim md:justify-self-end md:pb-2">
            Safe Net is a software studio founded in 2026. We are
            deliberately small: senior people stay close to the work, decisions happen
            quickly, and nothing gets lost in translation.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <SpotlightCard className="relative min-h-[390px] p-8 md:col-span-4 md:row-span-2 md:p-10">
            <span className="mono text-[0.5rem] text-white/30">The operating principle</span>
            <div className="mt-8 grid gap-8 sm:grid-cols-[1.25fr_0.75fr] sm:items-end">
              <div>
                <h3 className="text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
                  Senior people.
                  <br />
                  No hand-offs.
                  <br />
                  <span className="serif text-gradient">No theatre.</span>
                </h3>
                <p className="mt-6 max-w-sm text-[0.86rem] leading-[1.8] text-dim">
                  The person who understands your problem is the person solving it.
                  You get direct access to the team building your system — every week,
                  not just at kickoff.
                </p>
              </div>
              <div className="hidden pb-1 opacity-90 sm:block">
                <StudioOrbit />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="flex min-h-[190px] flex-col justify-between p-7 md:col-span-2">
            <span className="mono text-[0.5rem] text-white/30">Founded</span>
            <div>
              <div className="text-[3rem] font-medium leading-none tracking-[-0.05em] text-white">
                2026
              </div>
              <p className="mt-2 text-[0.76rem] leading-relaxed text-dim">
                a new studio with senior craft and a clear point of view.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="flex min-h-[190px] flex-col justify-between p-7 md:col-span-2">
            <span className="mono text-[0.5rem] text-white/30">Products shipped</span>
            <div>
              <div className="text-[3rem] font-medium leading-none tracking-[-0.05em] text-white">
                07
              </div>
              <p className="mt-2 text-[0.76rem] leading-relaxed text-dim">
                across security, retail, culture, travel, health and hospitality.
              </p>
            </div>
          </SpotlightCard>

          {features.map((feature) => (
            <SpotlightCard key={feature.title} className="p-7 md:col-span-2">
              <span className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mint">
                <feature.icon className="size-4" />
              </span>
              <h3 className="mt-5 text-[1rem] font-medium tracking-[-0.02em] text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-[0.78rem] leading-[1.75] text-dim">{feature.copy}</p>
            </SpotlightCard>
          ))}

          <SpotlightCard className="flex flex-col justify-between gap-6 p-7 sm:flex-row sm:items-center md:col-span-6">
            <div>
              <span className="mono text-[0.5rem] text-white/30">Based in</span>
              <h3 className="mt-2 text-[1rem] font-medium tracking-[-0.02em] text-white">
                Chiang Mai, Thailand
              </h3>
              <p className="mt-1 text-[0.76rem] text-dim">
                Founded here in 2026. Working worldwide.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="mono text-[0.5rem] text-white/30">44.8°N / 106.9°W</span>
              <Globe2 className="size-9 text-electric/50" />
            </div>
          </SpotlightCard>
        </div>

        <div className="mt-24 border-t border-white/10 pt-14">
          <div className="grid gap-10 lg:grid-cols-[0.28fr_1fr]">
            <span className="mono text-[0.55rem] text-white/30" data-reveal>
              The operating belief
            </span>
            <blockquote className="max-w-4xl" data-reveal-lines>
              <p className="text-[clamp(1.5rem,4.2vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.045em] text-white">
                <span className="line-mask" style={{ '--d': '0ms' } as React.CSSProperties}>
                  <span className="whitespace-nowrap">Technology should feel</span>
                </span>
                <span className="line-mask" style={{ '--d': '90ms' } as React.CSSProperties}>
                  <span className="whitespace-nowrap">
                    like <span className="serif text-gradient">silence</span>.
                  </span>
                </span>
                <span className="line-mask" style={{ '--d': '180ms' } as React.CSSProperties}>
                  <span className="whitespace-nowrap">You notice it only when</span>
                </span>
                <span className="line-mask" style={{ '--d': '270ms' } as React.CSSProperties}>
                  <span className="whitespace-nowrap text-white/45">it stops working.</span>
                </span>
              </p>
            </blockquote>
          </div>
          <div className="mt-8 flex items-center gap-3 lg:pl-[calc(28%+2.5rem)]">
            <span className="h-px w-10 bg-mint/50" />
            <span className="mono text-[0.52rem] text-white/30">The Safe Net operating belief</span>
          </div>
        </div>
      </div>
    </section>
  )
}
