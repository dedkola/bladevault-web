"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"

import type { DocsHeading } from "@/lib/docs"
import { cn } from "@/lib/utils"

type SearchEntry = {
  title: string
  group: string
  route: string
  description?: string
  headings: DocsHeading[]
  body: string
}

type SearchResult = {
  key: string
  title: string
  context: string
  href: string
  score: number
}

const RESULT_LIMIT = 30

/** Local, client-side filter over the build-time index — no search service involved. */
function buildResults(index: SearchEntry[], query: string): SearchResult[] {
  const needle = query.trim().toLowerCase()
  const results: SearchResult[] = []

  for (const entry of index) {
    const title = entry.title.toLowerCase()
    let score = 0

    if (!needle) {
      score = 1
    } else if (title === needle) {
      score = 100
    } else if (title.startsWith(needle)) {
      score = 80
    } else if (title.includes(needle)) {
      score = 60
    } else if (entry.group.toLowerCase().includes(needle)) {
      score = 45
    } else if (entry.headings.some((heading) => heading.text.toLowerCase().includes(needle))) {
      score = 35
    } else if ((entry.description ?? "").toLowerCase().includes(needle)) {
      score = 25
    } else if (entry.body.toLowerCase().includes(needle)) {
      score = 15
    }

    if (!score) continue

    results.push({
      key: entry.route,
      title: entry.title,
      context: `${entry.group} · ${entry.route}`,
      href: entry.route,
      score,
    })

    if (!needle) continue

    for (const heading of entry.headings) {
      if (!heading.text.toLowerCase().includes(needle)) continue
      results.push({
        key: `${entry.route}#${heading.id}`,
        title: heading.text,
        context: `${entry.title} · ${entry.route}`,
        href: `${entry.route}#${heading.id}`,
        score: 30 - heading.depth,
      })
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, RESULT_LIMIT)
}

export function DocsSearch({ indexUrl = "/docs/search-index.json" }: { indexUrl?: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)

  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listId = useId()

  const results = useMemo(() => (index ? buildResults(index, query) : []), [index, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setSelected(0)
    triggerRef.current?.focus()
  }, [])

  // ⌘K / Ctrl+K opens the palette, Esc closes it.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
        return
      }
      if (event.key === "Escape" && open) {
        event.preventDefault()
        close()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, close])

  // The index is fetched the first time the palette opens.
  useEffect(() => {
    if (!open || index) return

    let cancelled = false
    fetch(indexUrl)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: SearchEntry[]) => {
        if (!cancelled) setIndex(data)
      })
      .catch(() => {
        if (!cancelled) setIndex([])
      })

    return () => {
      cancelled = true
    }
  }, [open, index, indexUrl])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = ""
    }
  }, [open, index])

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${selected}"]`)
    node?.scrollIntoView({ block: "nearest" })
  }, [selected])

  function go(result: SearchResult | undefined) {
    if (!result) return
    setOpen(false)
    setQuery("")
    setSelected(0)
    router.push(result.href)
  }

  function onDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault()
      close()
      return
    }

    if (event.key === "Tab") {
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setSelected((current) => Math.min(current + 1, Math.max(results.length - 1, 0)))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setSelected((current) => Math.max(current - 1, 0))
    } else if (event.key === "Enter") {
      event.preventDefault()
      go(results[selected])
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        aria-keyshortcuts="Meta+K Control+K"
        className="inline-flex h-9 min-w-0 items-center gap-2.5 rounded-lg border border-border bg-card pr-2 pl-3 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none lg:min-w-[13.5rem]"
      >
        <Search className="size-4 shrink-0" aria-hidden="true" />
        <span className="hidden min-w-0 flex-1 truncate text-left lg:inline">
          Search documentation…
        </span>
        <kbd className="hidden rounded-[5px] border border-border bg-muted px-1.5 py-0.5 font-sans text-[11px] text-muted-foreground lg:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-[rgb(20_18_12_/_0.45)] px-4 pt-[12vh] pb-4 backdrop-blur-[2px]"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            onKeyDown={onDialogKeyDown}
            className="w-full max-w-[38rem] overflow-hidden rounded-[14px] border border-border bg-card shadow-[0_24px_60px_rgb(0_0_0_/_0.28)]"
          >
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setSelected(0)
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search the BladeVault documentation…"
              autoComplete="off"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={results[selected] ? `${listId}-${selected}` : undefined}
              className="w-full border-b border-border/70 bg-transparent px-4 py-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
            />

            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Search results"
              className="m-0 max-h-[52vh] list-none overflow-auto p-1.5"
            >
              {!index ? (
                <li className="px-3.5 py-3 text-sm text-muted-foreground">Loading the index…</li>
              ) : null}

              {index && !results.length ? (
                <li className="px-3.5 py-3 text-sm text-muted-foreground">
                  No page matches “{query.trim()}”.
                </li>
              ) : null}

              {results.map((result, position) => (
                <li
                  key={result.key}
                  id={`${listId}-${position}`}
                  role="option"
                  aria-selected={position === selected}
                  data-index={position}
                  onMouseEnter={() => setSelected(position)}
                  className={cn(
                    "rounded-lg",
                    position === selected ? "bg-secondary" : "bg-transparent"
                  )}
                >
                  <Link
                    href={result.href}
                    onClick={() => {
                      setOpen(false)
                      setQuery("")
                      setSelected(0)
                    }}
                    tabIndex={-1}
                    className={cn(
                      "block px-3 py-2.5 text-[14.5px] focus-visible:outline-none",
                      position === selected
                        ? "text-[var(--bladevault-title)]"
                        : "text-foreground"
                    )}
                  >
                    {result.title}
                    <small className="mt-0.5 block font-mono text-[12px] text-muted-foreground">
                      {result.context}
                    </small>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-x-3.5 gap-y-1 border-t border-border/70 px-4 py-2.5 text-[11.5px] text-muted-foreground">
              <span>↑↓ to move</span>
              <span>↵ to open</span>
              <span>esc to close</span>
              <span className="ml-auto">local index — no search service</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
