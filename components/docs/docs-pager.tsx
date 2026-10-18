import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export type DocsPagerLink = {
  title: string
  route: string
} | null

export function DocsPager({
  prev,
  next,
}: {
  prev: DocsPagerLink
  next: DocsPagerLink
}) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Page navigation"
      className="mt-12 grid grid-cols-1 gap-3 border-t border-border/60 pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.route}
          rel="prev"
          className="vault-panel group min-w-0 p-4 transition-colors hover:border-[var(--bladevault-gold)] hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none"
        >
          <span className="block text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            Previous
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-sm font-medium">
            <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={next.route}
          rel="next"
          className="vault-panel group min-w-0 p-4 transition-colors hover:border-[var(--bladevault-gold)] hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none sm:text-right"
        >
          <span className="block text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            Next
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-sm font-medium sm:justify-end">
            {next.title}
            <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
