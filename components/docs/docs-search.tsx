"use client"

import { Dialog } from "@base-ui/react/dialog"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useId, useMemo, useRef, useState } from "react"

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
    } else if (
      entry.headings.some((heading) =>
        heading.text.toLowerCase().includes(needle)
      )
    ) {
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

export function DocsSearch({
  indexUrl = "/docs/search-index.json",
}: {
  indexUrl?: string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()
  const results = useMemo(
    () => (index ? buildResults(index, query) : []),
    [index, query]
  )

  function changeOpen(value: boolean) {
    setOpen(value)
    if (!value) {
      setQuery("")
      setSelected(0)
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
        setQuery("")
        setSelected(0)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (!open || index) return
    const controller = new AbortController()
    fetch(indexUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status))
        return response.json()
      })
      .then((data: SearchEntry[]) => {
        if (!controller.signal.aborted) setIndex(data)
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [open, index, indexUrl, attempt])

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [selected, query])

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setSelected((current) =>
        Math.min(current + 1, Math.max(results.length - 1, 0))
      )
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setSelected((current) => Math.max(current - 1, 0))
    } else if (event.key === "Enter" && results[selected]) {
      event.preventDefault()
      changeOpen(false)
      router.push(results[selected].href)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger
        aria-label="Search documentation"
        aria-keyshortcuts="Meta+K Control+K"
        className="vault-action h-9 min-w-0 gap-2 px-2.5 text-muted-foreground sm:w-44 sm:justify-start"
      >
        <Search className="size-4 shrink-0" aria-hidden="true" />
        <span className="hidden flex-1 text-left text-xs sm:inline">
          Search docs…
        </span>
        <kbd className="hidden rounded border border-border/60 px-1 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-[rgb(20_18_12_/_0.45)] backdrop-blur-sm" />
        <Dialog.Popup
          initialFocus={inputRef}
          className="fixed top-[min(15vh,8rem)] left-1/2 z-[60] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_80px_rgb(30_27_15_/_0.2)] outline-none"
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-border/60 px-4">
            <Search
              className="size-5 shrink-0 text-[var(--bladevault-title)]"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setSelected(0)
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search the documentation…"
              aria-label="Search documentation"
              autoComplete="off"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={
                results[selected] ? `${listId}-${selected}` : undefined
              }
              className="min-w-0 flex-1 bg-transparent py-5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Dialog.Close
              className="vault-action size-8 min-h-8 px-0"
              aria-label="Close search"
            >
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>
          </div>
          {error && !index ? (
            <div
              role="alert"
              className="space-y-3 px-5 py-6 text-sm text-muted-foreground"
            >
              <p>
                Search couldn’t load. You can still browse the documentation.
              </p>
              <button
                type="button"
                className="vault-action"
                onClick={() => {
                  setError(false)
                  setAttempt((value) => value + 1)
                }}
              >
                Try again
              </button>
            </div>
          ) : !index ? (
            <p
              role="status"
              className="px-5 py-6 text-sm text-muted-foreground"
            >
              Loading search…
            </p>
          ) : !results.length ? (
            <div
              role="status"
              className="px-5 py-8 text-sm text-muted-foreground"
            >
              No results for “{query.trim()}”. Try a different word.
            </div>
          ) : null}
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Search results"
            className="m-0 max-h-[min(52dvh,28rem)] list-none overflow-auto p-2"
          >
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
                  position === selected && "bg-secondary"
                )}
              >
                <Link
                  href={result.href}
                  onClick={() => changeOpen(false)}
                  tabIndex={-1}
                  className={cn(
                    "block px-3 py-3 text-sm",
                    position === selected
                      ? "text-[var(--bladevault-title)]"
                      : "text-foreground"
                  )}
                >
                  {result.title}
                  <small className="mt-1 block text-xs text-muted-foreground">
                    {result.context}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4 border-t border-border/60 bg-muted/40 px-5 py-3 text-[11px] text-muted-foreground">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
