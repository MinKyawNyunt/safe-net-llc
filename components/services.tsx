import { Lightbulb, Boxes, Workflow, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "Consulting",
    description:
      "We assess your operations, uncover bottlenecks, and build a clear technology roadmap aligned with your business goals.",
    points: ["Digital strategy & roadmapping", "Systems & process audits", "Technology selection"],
  },
  {
    icon: Boxes,
    title: "Custom ERP Systems",
    description:
      "Purpose-built ERP platforms that unify finance, inventory, operations, and reporting into one source of truth.",
    points: ["Tailored modules & dashboards", "Data migration & integration", "Scalable, secure architecture"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Eliminate manual, repetitive work with automations that connect your tools and move data where it needs to go.",
    points: ["Approval & document flows", "App & API integrations", "Real-time notifications"],
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-border bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            What we do
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Three ways we help your business run better
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From strategy to systems to automation, we cover the full journey of
            modernizing how your organization operates.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <service.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-foreground">
                    <ArrowRight className="size-3.5 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
