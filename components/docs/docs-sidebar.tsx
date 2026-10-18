"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

import type { DocsGroup } from "@/lib/docs"
import { cn } from "@/lib/utils"

interface DocsSidebarProps {
  groups: DocsGroup[]
  repo: string
  sha: string
  stale?: boolean
}

function NavTree({
  groups,
  pathname,
  onNavigate,
}: {
  groups: DocsGroup[]
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Documentation navigation" className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {group.title}
          </p>
          <ul className="mt-1.5 flex flex-col gap-0.5">
            {group.pages.map((page) => {
              const current = pathname === page.route
              return (
                <li key={page.route}>
                  <Link
                    href={page.route}
                    aria-current={current ? "page" : undefined}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-2.5 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
                      current
                        ? "bg-secondary font-semibold text-[var(--bladevault-title)] shadow-[inset_2px_0_0_var(--bladevault-gold)]"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    {page.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function DocsSidebar({ groups, repo, sha, stale }: DocsSidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)

  const currentPage = groups
    .flatMap((group) => group.pages)
    .find((page) => page.route === pathname)

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    const desktop = window.matchMedia("(min-width: 1024px)")
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onBreakpoint)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onBreakpoint)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <div className="flex items-center gap-3 py-3 lg:hidden">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={panelId}
          className="vault-action h-9 px-3 text-sm"
        >
          <Menu className="size-4" aria-hidden="true" />
          Documentation
        </button>
        <span className="min-w-0 truncate text-xs text-muted-foreground">
          {currentPage?.title ?? "BladeVault"}
        </span>
      </div>

      {open ? (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[rgb(20_18_12_/_0.45)] lg:hidden"
        />
      ) : null}

      <aside
        id={panelId}
        aria-label="Documentation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[19rem] flex-col overflow-y-auto border-r border-border/70 bg-card p-5 transition-transform duration-200",
          "lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)] lg:w-auto lg:translate-x-0 lg:bg-transparent lg:py-0 lg:pr-6 lg:pl-0 lg:transition-none",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <p className="vault-label">Documentation</p>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              triggerRef.current?.focus()
            }}
            aria-label="Close documentation navigation"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <p className="vault-label hidden lg:block">Documentation</p>
        <Link
          href="/docs"
          aria-current={pathname === "/docs" ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={cn(
            "mt-1.5 mb-4 block text-[15px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
            pathname === "/docs"
              ? "text-[var(--bladevault-title)]"
              : "text-foreground hover:text-[var(--bladevault-title)]"
          )}
        >
          BladeVault
        </Link>

        <NavTree groups={groups} pathname={pathname} onNavigate={() => setOpen(false)} />

        <p className="mt-6 border-t border-border/60 pt-3.5 text-xs text-muted-foreground">
          Docs from{" "}
          <code className="font-mono text-[11px] text-[var(--bladevault-title)]">
            {repo}@{sha.slice(0, 7)}
          </code>
          {stale ? " (cached revision)" : null}
        </p>
      </aside>
    </>
  )
}
