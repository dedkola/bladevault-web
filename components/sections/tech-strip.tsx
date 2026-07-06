const techs = ["Next.js", "React", "TypeScript", "Tailwind", "SQLite", "Docker"]

export function TechStrip() {
  return (
    <section className="vault-shell px-6 py-5 sm:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="vault-label">Stack</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Built with a modern web stack and easy to run locally.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <span key={tech} className="vault-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
