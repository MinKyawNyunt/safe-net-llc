import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { LiveTime, Magnetic } from '@/components/interactions'
import { LogoMark, Wordmark } from '@/components/logo'

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Selected work', href: '#work' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'Capabilities',
    links: [
      { label: 'Product engineering', href: '#services' },
      { label: 'Business platforms', href: '#services' },
      { label: 'AI & automation', href: '#services' },
      { label: 'Open source', href: '#work' },
    ],
  },
]

const wordOne = ['S', 'A', 'F', 'E']
const wordTwo = ['N', 'E', 'T']

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#04060b]/55">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-[1.2fr_0.55fr_0.65fr_0.8fr] md:py-16">
          <div className="col-span-2 md:col-span-1">
            <a href="#top" className="inline-flex items-center gap-2.5" aria-label="Safe Net LLC home">
              <LogoMark className="h-9 w-8 text-electric" />
              <Wordmark className="text-[1.05rem] text-ink" />
            </a>
            <p className="mt-5 max-w-xs text-[0.82rem] leading-[1.8] text-dim">
              A software studio founded in 2026. We design and build digital products,
              business platforms and the automations that connect them.
            </p>
            <Magnetic>
              <a
                href="#top"
                data-cursor="Top"
                className="group mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-3 py-2 transition-colors hover:border-mint/35"
              >
                <span className="flex size-7 items-center justify-center rounded-full border border-white/10 text-mint transition-colors group-hover:border-mint/40">
                  <ArrowUp className="size-3" />
                </span>
                <span className="mono text-[0.5rem] text-white/45">Back to top</span>
              </a>
            </Magnetic>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className="col-span-1">
              <h3 className="mono text-[0.5rem] tracking-[0.18em] text-white/30">{column.heading}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-underline text-[0.8rem] text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className="mono text-[0.5rem] tracking-[0.18em] text-white/30">Say hello</h3>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:contact@safenet.llc"
                className="link-underline text-[0.8rem] text-white/80 transition-colors hover:text-mint"
              >
                contact@safenet.llc
              </a>
              <a
                href="tel:+13074349898"
                className="link-underline text-[0.8rem] text-white/60 transition-colors hover:text-white"
              >
                +1 (307) 434-9898
              </a>
              <span className="text-[0.78rem] leading-[1.7] text-white/40">
                30 N Gould St, Ste N
                <br />
                Sheridan, WY 82801
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span className="status-dot" />
                <span className="mono text-[0.48rem] text-white/30">
                  Local time <LiveTime className="text-white/60" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="mono text-[0.48rem] text-white/25">
            © {new Date().getFullYear()} Safe Net LLC. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <span className="mono text-[0.48rem] text-white/35">Designed &amp; engineered by Experts</span>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 mono text-[0.48rem] text-white/40 transition-colors hover:text-mint"
            >
              Start a project
              <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
