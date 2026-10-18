import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export type DocsPagerLink = {
  title: string
  route: string
} | null

export function DocsPager({ prev, next }: { prev: DocsPagerLink; next: DocsPagerLink }) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Page navigation"
      className="mt-10 flex flex-col gap-3.5 border-t border-border/70 pt-6 sm:flex-row sm:justify-between"
    >
      {prev ? (
        <Link
          href={prev.route}
          rel="prev"
          className="vault-panel max-w-full p-3.5 transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none sm:max-w-[45%]"
        >
          <span className="block text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            Previous
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-semibold">
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
          className="vault-panel max-w-full p-3.5 transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none sm:ml-auto sm:max-w-[45%] sm:text-right"
        >
          <span className="block text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            Next
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-semibold sm:justify-end">
            {next.title}
            <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
