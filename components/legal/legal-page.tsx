import type { ReactNode } from "react"

type LegalSection = {
  id: string
  title: string
  body: ReactNode
}

type LegalPageProps = {
  eyebrow: string
  title: string
  updated: string
  intro: ReactNode
  sections: readonly LegalSection[]
}

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-[1600px] px-4 pt-6 pb-10 lg:px-4"
    >
      <article className="vault-shell mx-auto max-w-3xl px-6 py-10 md:px-12 md:py-14">
        <header className="flex flex-col gap-3 border-b border-border/60 pb-8">
          <span className="text-[10px] font-semibold tracking-[0.1em] text-[var(--bladevault-title)] uppercase">
            {eyebrow}
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated {updated}
          </p>
          <div className="text-base leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
            {intro}
          </div>
        </header>

        <nav
          aria-label="On this page"
          className="border-b border-border/60 py-6"
        >
          <ol className="grid gap-1.5 text-sm sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-8 pt-8">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-28"
            >
              <h2
                id={`${section.id}-title`}
                className="mb-3 text-lg font-semibold text-foreground"
              >
                {index + 1}. {section.title}
              </h2>
              <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
