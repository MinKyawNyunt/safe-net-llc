import Image from "next/image"
import { ShieldCheck, Zap, Users, TrendingUp } from "lucide-react"

const reasons = [
  {
    icon: ShieldCheck,
    title: "Built for reliability",
    description: "Secure, well-tested systems your team can depend on every single day.",
  },
  {
    icon: Zap,
    title: "Faster operations",
    description: "Automate the busywork so your people can focus on what actually matters.",
  },
  {
    icon: Users,
    title: "A real partnership",
    description: "We embed with your team, learn your business, and stay through delivery.",
  },
  {
    icon: TrendingUp,
    title: "Designed to scale",
    description: "Solutions that grow with you, from a single workflow to enterprise-wide.",
  },
]

export function Approach() {
  return (
    <section id="approach" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-border">
            <Image
              src="/team-collaboration.png"
              alt="Safe Net LLC consultants collaborating with a client team around a laptop"
              width={800}
              height={600}
              className="h-auto w-full"
            />
          </div>
        </div> */}

        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Safe Net
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Technology delivered with care and accountability
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            We are not just developers. We are partners who take the time to
            understand your operations and deliver solutions that hold up in the
            real world.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex flex-col">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <reason.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
