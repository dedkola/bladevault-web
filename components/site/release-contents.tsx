"use client"

import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useMemo, useRef } from "react"
import type { KeyboardEvent } from "react"

import { useActiveSection } from "@/components/site/use-active-section"
import { releaseAnchor } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type ReleaseLink = {
  version: string
  date: string
}

type ReleaseContentsProps = {
  releases: readonly ReleaseLink[]
  mobile?: boolean
}

export function ReleaseContents({
  releases,
  mobile = false,
}: ReleaseContentsProps) {
  const ids = useMemo(
    () => releases.map((release) => releaseAnchor(release.version)),
    [releases]
  )
  const activeId = useActiveSection(ids)
  const mobileDetailsRef = useRef<HTMLDetailsElement>(null)
  const recent = releases.slice(0, 8)
  const earlier = releases.slice(8)
  const activeEarlier = earlier.find(
    (release) => releaseAnchor(release.version) === activeId
  )

  function selectRelease(id: string) {
    if (mobileDetailsRef.current) mobileDetailsRef.current.open = false
    requestAnimationFrame(() => {
      document.getElementById(id)?.focus({ preventScroll: true })
    })
  }

  function onDisclosureKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape") return
    const details = (event.target as HTMLElement).closest("details")
    if (!details?.open) return
    event.preventDefault()
    event.stopPropagation()
    details.open = false
    details.querySelector("summary")?.focus()
  }

  function renderReleaseLinks(items: readonly ReleaseLink[]) {
    return items.map((release) => {
      const id = releaseAnchor(release.version)
      const latest = release === releases[0]
      return (
        <a
          key={id}
          href={`#${id}`}
          aria-current={activeId === id ? "location" : undefined}
          onClick={() => selectRelease(id)}
          className={cn(
            "block rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none",
            activeId === id
              ? "bg-[var(--bladevault-olive)] text-[var(--bladevault-gold)]"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <span>
            {release.version}
            {latest && " · Latest"}
          </span>
          <time
            dateTime={release.date}
            className="mt-0.5 block font-mono text-[11px] opacity-75"
          >
            {release.date}
          </time>
        </a>
      )
    })
  }

  const contents = (
    <nav aria-label="Release contents" className="min-h-0 overflow-y-auto p-3">
      {!mobile && <p className="vault-label px-3 pt-1 pb-3">On this page</p>}
      <div className="space-y-1">{renderReleaseLinks(recent)}</div>
      {earlier.length > 0 && (
        <details
          className="group/earlier mt-3 border-t border-border/60 pt-3"
          onKeyDown={onDisclosureKeyDown}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            <span>
              Earlier releases
              {activeEarlier && (
                <span className="mt-1 block text-xs text-[var(--bladevault-title)]">
                  {activeEarlier.version}
                </span>
              )}
            </span>
            <ChevronDown
              className="size-4 shrink-0 transition-transform group-open/earlier:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="mt-1 space-y-1">{renderReleaseLinks(earlier)}</div>
        </details>
      )}
      <a
        href="https://github.com/dedkola/bladevault/releases"
        className="mt-3 flex items-center gap-2 rounded-lg border-t border-border/60 px-3 py-3 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none"
      >
        All GitHub releases
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </nav>
  )

  if (mobile) {
    return (
      <details
        ref={mobileDetailsRef}
        onKeyDown={onDisclosureKeyDown}
        className="group/contents mt-6 border-t border-border/60 pt-4 lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-md text-sm font-medium text-[var(--bladevault-title)] focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
          Jump to a release
          <ChevronDown
            className="size-4 transition-transform group-open/contents:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-3 max-h-[60dvh] overflow-y-auto rounded-lg border border-border/60 bg-sidebar">
          {contents}
        </div>
      </details>
    )
  }

  return (
    <aside className="hidden lg:block">
      <div className="vault-shell sticky top-20 flex max-h-[calc(100dvh-6rem)] flex-col overflow-hidden bg-sidebar">
        {contents}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 border-t border-border/60 px-6 py-5 text-sm text-[var(--bladevault-title)] transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Product overview
        </Link>
      </div>
    </aside>
  )
}
