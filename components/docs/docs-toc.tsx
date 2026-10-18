"use client"

import { useEffect, useState } from "react"

import type { DocsHeading } from "@/lib/docs"
import { cn } from "@/lib/utils"

const TOP_OFFSET = 160

export function DocsToc({ headings }: { headings: DocsHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "")

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    function spy() {
      let current = elements[0].id
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= TOP_OFFSET) current = element.id
      }
      setActive(current)
    }

    spy()
    window.addEventListener("scroll", spy, { passive: true })
    window.addEventListener("resize", spy)
    return () => {
      window.removeEventListener("scroll", spy)
      window.removeEventListener("resize", spy)
    }
  }, [headings])

  if (!headings.length) return null

  return (
    <aside
      aria-label="On this page"
      className="hidden xl:sticky xl:top-[7.5rem] xl:block xl:self-start"
    >
      <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="mt-2 border-l border-border/70">
        {headings.map((heading) => (
          <li key={heading.id} className={cn("my-1.5", heading.depth === 3 && "pl-2.5")}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "true" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-0.5 pl-3 text-sm transition-colors focus-visible:outline-none",
                active === heading.id
                  ? "border-[var(--bladevault-gold)] font-semibold text-[var(--bladevault-title)]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
