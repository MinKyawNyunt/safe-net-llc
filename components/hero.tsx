import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = ["Custom ERP builds", "Process automation", "Expert consulting"]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Trusted business technology partner
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Software that runs your business, not the other way around.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Safe Net LLC delivers strategic consulting, custom-built ERP systems,
            and intelligent workflow automation that help your team work faster,
            smarter, and with fewer headaches.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} className="h-11 px-5 text-base" render={<a href="#contact" />}>
              Start a project
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-11 px-5 text-base"
              render={<a href="#services" />}
            >
              Explore services
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/60 blur-2xl" aria-hidden />
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
            <Image
              src="/hero-dashboard.png"
              alt="Safe Net LLC ERP analytics dashboard showing charts, KPIs, and workflow pipelines"
              width={900}
              height={680}
              className="h-auto w-full"
              priority
            />
          </div>
        </div> */}
      </div>
    </section>
  )
}
