import { ArrowUpRight, BookOpen, Film, Newspaper } from "lucide-react"

const guides = [
  {
    label: "05:42 · Overview",
    title: "Watch the product tour",
    href: "https://www.youtube.com/watch?v=yurbpv0JY80",
    icon: Film,
  },
  {
    label: "Workflow",
    title: "Add your first knife",
    href: "https://www.youtube.com/watch?v=5co8rHxLZgE",
    icon: BookOpen,
  },
  {
    label: "Release notes",
    title: "See what changed",
    href: "https://github.com/dedkola/bladevault/releases",
    icon: Newspaper,
  },
]

export function GuideStrip() {
  return (
    <section className="grid overflow-hidden rounded-xl border border-border/75 bg-[var(--shell)] lg:grid-cols-[1.1fr_repeat(3,1fr)]">
      <div className="p-6 sm:p-8">
        <p className="vault-label">See it in use</p>
        <h2 className="mt-3 max-w-sm text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
          One demo. Practical setup guides.
        </h2>
      </div>
      {guides.map(({ label, title, href, icon: Icon }) => (
        <a
          key={title}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-36 flex-col justify-between border-t border-border/65 p-6 transition-colors hover:bg-accent/65 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-inset lg:border-t-0 lg:border-l"
        >
          <div className="flex items-center justify-between gap-3">
            <Icon className="size-4 text-[var(--bladevault-title)]" />
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div>
            <small className="font-mono text-[9px] tracking-[0.08em] text-[var(--bladevault-title)] uppercase">
              {label}
            </small>
            <strong className="mt-2 block text-sm text-foreground">
              {title}
            </strong>
          </div>
        </a>
      ))}
    </section>
  )
}
