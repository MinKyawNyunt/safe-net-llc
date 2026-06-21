import { Shield } from "lucide-react"

const footerNav = [
  {
    heading: "Services",
    links: ["Consulting", "Custom ERP Systems", "Workflow Automation", "Integrations"],
  },
  {
    heading: "Company",
    links: ["About", "Our Process", "Careers", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Case Studies", "Insights", "Support", "Privacy Policy"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      {/*
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Safe Net <span className="text-primary">LLC</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Consulting, custom ERP systems, and workflow automation for
              businesses ready to operate at their best.
            </p>
          </div>

          {footerNav.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-foreground">{col.heading}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          <div className="flex gap-6">
            {/* <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a> */}
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Safe Net LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
