import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { HeroVisual } from '@/components/hero-visual'
import { LiveTime, Magnetic, ScrambleText } from '@/components/interactions'

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(4,6,11,0.72)_0%,rgba(4,6,11,0.28)_46%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 z-[2] hidden xl:block" aria-hidden="true">
        <div className="hero-hud hud-1">
          UPTIME <strong>99.99%</strong>
        </div>
        <div className="hero-hud hud-2">
          SYNC <strong>ACTIVE</strong>
        </div>
        <div className="hero-hud hud-3">
          NODES <strong>218</strong>
        </div>
        <span className="absolute bottom-[13%] left-[64%] mono text-[0.5rem] tracking-[0.2em] text-white/30">
          MOVE TO ORBIT
        </span>
      </div>
      <HeroVisual />

      <div className="shell relative z-10 flex min-h-[100svh] flex-col pt-[var(--header-h)]">
        <div className="flex items-center justify-between gap-6 pt-6">
          <div className="flex items-center gap-3">
            <span className="status-dot" />
            <span className="mono whitespace-nowrap text-[0.58rem] text-white/55">
              <span className="sm:hidden">
                Available / <span className="text-mint/80">Q4 2026</span>
              </span>
              <span className="hidden sm:inline">
                Available for new projects <span className="text-mint/80">/ Q4 2026</span>
              </span>
            </span>
          </div>
          <div className="hidden items-center gap-6 sm:flex">
            <span className="mono hidden text-[0.55rem] text-white/35 xl:inline">Products · Platforms · Automation</span>
            <span className="hidden items-center gap-2 lg:flex">
              <MapPin className="size-3 text-white/35" />
              <span className="mono text-[0.55rem] text-white/35">Sheridan, WY</span>
              <span className="mono text-[0.55rem] text-white/20">/</span>
              <LiveTime className="mono text-[0.55rem] text-white/35" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-14 sm:py-10">
          <div className="max-w-[1220px]">
            <h1
              data-reveal-lines
              className="hero-title"
              aria-label="We make complex systems behave."
            >
              <span className="line-mask" style={{ '--d': '0ms' } as React.CSSProperties}>
                <span>We make</span>
              </span>
              <span className="line-mask" style={{ '--d': '110ms' } as React.CSSProperties}>
                <span className="whitespace-nowrap">
                  <span className="serif">complex</span> systems
                </span>
              </span>
              <span className="line-mask" style={{ '--d': '220ms' } as React.CSSProperties}>
                <span className="whitespace-nowrap">
                  <ScrambleText text="behave" trigger="hover" />
                  <span className="text-mint">.</span>
                </span>
              </span>
            </h1>

            <div className="mt-10 grid max-w-[760px] gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
              <div data-reveal style={{ '--reveal-delay': '420ms' } as React.CSSProperties}>
                <p className="max-w-[34rem] text-pretty text-[0.98rem] leading-[1.8] text-dim sm:text-[1.04rem]">
                  Safe Net is a software studio, founded in 2026. We design and build
                  digital products, business platforms and the automations that connect
                  them — with the same senior team from first map to{' '}
                  <span className="text-white/85">launch</span>.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a href="#contact" className="btn btn-primary">
                      Start a project
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href="#work" className="btn btn-ghost">
                      Explore the work
                      <span className="flex size-5 items-center justify-center rounded-full border border-white/20">
                        <ArrowDown className="size-2.5" />
                      </span>
                    </a>
                  </Magnetic>
                </div>
              </div>

              <div
                className="hidden flex-col items-start gap-2 border-l border-white/10 pl-6 md:flex"
                data-reveal
                style={{ '--reveal-delay': '540ms' } as React.CSSProperties}
              >
                <span className="mono text-[0.52rem] leading-relaxed text-white/35">
                  Founded 2026
                  <br />
                  Working worldwide
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="#manifesto" className="scroll-cue group">
            <span className="scroll-cue-line" />
            <span className="mono text-[0.55rem] transition-colors group-hover:text-white/80">
              Scroll to explore
            </span>
          </a>
          <span className="mono hidden text-[0.52rem] text-white/25 md:block">
            Strategy → Systems → Automation
          </span>
          <span className="mono text-[0.52rem] text-white/30">
            <span className="text-white/60">01</span> / 07
          </span>
        </div>
      </div>
    </section>
  )
}
