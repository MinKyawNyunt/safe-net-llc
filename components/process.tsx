const stats = [
  { value: "150+", label: "Projects delivered" },
  { value: "98%", label: "Client retention" },
  { value: "40%", label: "Avg. hours saved" },
  { value: "12+", label: "Years of experience" },
]

const steps = [
  {
    step: "01",
    title: "Discover",
    description: "We dig into your goals, workflows, and pain points to define what success looks like.",
  },
  {
    step: "02",
    title: "Design",
    description: "We map the solution, scope the build, and align on a clear, realistic plan.",
  },
  {
    step: "03",
    title: "Build",
    description: "We develop, integrate, and test in close collaboration with your team.",
  },
  {
    step: "04",
    title: "Support",
    description: "We launch, train your people, and stay on to refine and scale what we built.",
  },
]

export function Process() {
  return (
    <section id="process">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-semibold tracking-tight sm:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How we work
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A clear process from idea to impact
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.step} className="rounded-2xl border border-border bg-card p-7">
              <span className="text-3xl font-semibold text-primary/30">{item.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
