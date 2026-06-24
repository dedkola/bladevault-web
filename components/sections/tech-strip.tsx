const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "SQLite",
  "Cloudflare",
  "Playwright",
  "Docker",
]

export function TechStrip() {
  return (
    <section className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-wrap justify-center gap-2">
          {techs.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
