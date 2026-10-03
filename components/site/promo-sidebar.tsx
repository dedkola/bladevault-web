"use client"

import {
  Download,
  FolderKanban,
  HardDrive,
  LayoutDashboard,
  LifeBuoy,
  Newspaper,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { BladevaultLogoMark } from "@/components/site/bladevault-logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "#overview", label: "Overview", icon: LayoutDashboard, kind: "hash" },
  { href: "#workflow", label: "Workflow", icon: FolderKanban, kind: "hash" },
  {
    href: "#capabilities",
    label: "Capabilities",
    icon: FolderKanban,
    kind: "hash",
  },
  { href: "#local-first", label: "Local-first", icon: HardDrive, kind: "hash" },
  { href: "#install", label: "Install", icon: Terminal, kind: "hash" },
  {
    href: "/whats-new",
    label: "What’s new",
    icon: Newspaper,
    kind: "route",
  },
  {
    href: "mailto:support@bladevault.pro",
    label: "Support",
    icon: LifeBuoy,
    kind: "mailto",
  },
]

export function PromoSidebar() {
  const pathname = usePathname()
  const [activeHref, setActiveHref] = useState("#overview")

  useEffect(() => {
    function syncFromHash() {
      if (pathname !== "/") {
        setActiveHref(pathname)
        return
      }

      const hash = window.location.hash
      const isKnownHash = links.some(
        (link) => link.kind === "hash" && link.href === hash
      )
      setActiveHref(isKnownHash ? hash : "#overview")
    }

    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)

    return () => {
      window.removeEventListener("hashchange", syncFromHash)
    }
  }, [pathname])

  return (
    <aside className="hidden lg:block">
      <div className="vault-shell sticky top-20 flex max-h-[calc(100dvh-6rem)] flex-col overflow-hidden bg-sidebar">
        <div className="flex items-center gap-3 border-b border-sidebar-border/75 px-5 py-5">
          <div className="flex size-11 shrink-0 items-center justify-center">
            <BladevaultLogoMark className="size-9" />
          </div>
          <div>
            <p className="text-xl font-semibold tracking-[-0.03em] text-foreground">
              Blade
              <span className="text-[var(--bladevault-title)]">Vault</span>
            </p>
          </div>
        </div>

        <nav
          aria-label="Site navigation"
          className="min-h-0 flex-1 overflow-y-auto px-3 py-4"
        >
          <p className="vault-label px-2 pb-2.5">Main</p>
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive =
                link.kind === "route"
                  ? pathname === link.href
                  : pathname === "/" && link.href === activeHref
              const href = link.kind === "hash" ? `/${link.href}` : link.href
              const className = cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none",
                link.kind !== "mailto" && isActive
                  ? "bg-[var(--bladevault-olive)] text-[var(--bladevault-gold)]"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )
              const content = (
                <>
                  <Icon className="size-4" />
                  <span>{link.label}</span>
                </>
              )

              return link.kind === "mailto" ? (
                <a key={link.href} href={href} className={className}>
                  {content}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    if (link.kind === "hash" && pathname === "/") {
                      setActiveHref(link.href)
                    }
                  }}
                  className={className}
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="border-t border-sidebar-border/60 p-3">
          <Link
            href="/#install"
            className="vault-action vault-action-primary mb-2 w-full"
          >
            <Download className="size-4" />
            Install BladeVault
          </Link>
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <ThemeToggle
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-sidebar-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              label="Toggle theme"
            />
            <Button
              render={<a href="https://github.com/dedkola/bladevault" />}
              nativeButton={false}
              variant="outline"
              className="h-9 justify-center rounded-lg border-border"
            >
              View GitHub
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
