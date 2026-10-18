"use client"

import { Dialog } from "@base-ui/react/dialog"
import { ArrowUpRight, BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

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
    <nav aria-label="Documentation navigation" className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.pages.map((page) => {
              const current = pathname === page.route
              return (
                <li key={page.route}>
                  <Link
                    href={page.route}
                    aria-current={current ? "page" : undefined}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-3 py-2 text-[13px] leading-5 transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
                      current
                        ? "bg-secondary font-semibold text-[var(--bladevault-title)] shadow-[inset_2px_0_0_var(--bladevault-gold)]"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
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

function SidebarContent({
  groups,
  repo,
  sha,
  stale,
  pathname,
  onNavigate,
}: DocsSidebarProps & { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      <div className="border-b border-border/60 px-4 py-5">
        <p className="vault-label flex items-center gap-2">
          <BookOpen className="size-3.5" aria-hidden="true" />
          Documentation
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          A guide to your collection.
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-4">
        <Link
          href="/docs"
          aria-current={pathname === "/docs" ? "page" : undefined}
          onClick={onNavigate}
          className={cn(
            "mb-6 block rounded-md px-3 py-2 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
            pathname === "/docs"
              ? "bg-secondary text-[var(--bladevault-title)]"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          Overview
        </Link>
        <NavTree groups={groups} pathname={pathname} onNavigate={onNavigate} />
      </div>
      <a
        href={`https://github.com/${repo}/tree/${sha}/docs`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between gap-2 border-t border-border/60 px-4 py-3 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <span>
          {stale ? "Viewing cached documentation" : "Documentation on GitHub"}
        </span>
        <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
      </a>
    </>
  )
}

export function DocsSidebar(props: DocsSidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false)
    }
    desktop.addEventListener("change", onBreakpoint)
    return () => desktop.removeEventListener("change", onBreakpoint)
  }, [])

  const currentPage = props.groups
    .flatMap((group) => group.pages)
    .find((page) => page.route === pathname)

  return (
    <>
      <div className="flex min-w-0 items-center gap-3 lg:hidden">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="vault-action shrink-0">
            <Menu className="size-4" aria-hidden="true" />
            Browse docs
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-[60] bg-[rgb(20_18_12_/_0.45)] backdrop-blur-sm" />
            <Dialog.Popup className="fixed inset-y-0 left-0 z-[60] flex w-[min(20rem,calc(100vw-2rem))] flex-col border-r border-border/70 bg-card outline-none">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <Dialog.Title className="text-sm font-semibold">
                  Browse documentation
                </Dialog.Title>
                <Dialog.Close
                  className="vault-action size-9 px-0"
                  aria-label="Close documentation navigation"
                >
                  <X className="size-4" aria-hidden="true" />
                </Dialog.Close>
              </div>
              <SidebarContent
                {...props}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <span className="min-w-0 truncate text-xs text-muted-foreground">
          {currentPage?.title ?? "Overview"}
        </span>
      </div>
      <aside
        aria-label="Documentation"
        className="vault-shell sticky top-20 hidden max-h-[calc(100dvh-6rem)] flex-col lg:flex"
      >
        <SidebarContent {...props} pathname={pathname} />
      </aside>
    </>
  )
}
