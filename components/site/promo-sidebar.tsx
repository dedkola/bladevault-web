"use client"

import {
  BookOpen,
  Film,
  FolderKanban,
  LayoutDashboard,
  Terminal,
} from "lucide-react"
import { useEffect, useState } from "react"

import { BladevaultLogoMark } from "@/components/site/bladevault-logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "#overview", label: "Overview", icon: LayoutDashboard },
  { href: "#features", label: "Features", icon: FolderKanban },
  { href: "#workflows", label: "Workflows", icon: Film },
  { href: "#gallery", label: "Gallery", icon: BookOpen },
  { href: "#install", label: "Install", icon: Terminal },
]

const highlights = [
  "Local-first vault with optional cloud backup",
  "Desktop-grade collection dashboard and detail views",
  "Fast compare, quick add, and URL-powered importing",
]

export function PromoSidebar() {
  const [activeHref, setActiveHref] = useState("#overview")

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash
      const isKnownHash = links.some((link) => link.href === hash)
      setActiveHref(isKnownHash ? hash : "#overview")
    }

    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)

    return () => {
      window.removeEventListener("hashchange", syncFromHash)
    }
  }, [])

  return (
    <aside className="hidden lg:block">
      <div className="vault-shell sticky top-6 flex h-[calc(100vh-3rem)] flex-col overflow-hidden bg-sidebar/95">
        <div className="flex items-center gap-3 border-b border-sidebar-border/70 px-5 py-5">
          <div className="flex size-12 shrink-0 items-center justify-center">
            <BladevaultLogoMark className="size-10" />
          </div>
          <div>
            <p className="text-xl font-semibold tracking-tight text-foreground">
              Blade
              <span className="text-[var(--bladevault-title)]">Vault</span>
            </p>
          </div>
        </div>

        <div className="space-y-3 border-b border-sidebar-border/60 px-5 py-4">
          <div className="flex flex-wrap gap-2">
            <span className="vault-chip">Local</span>
            <span className="vault-chip">Desktop</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <p className="vault-label px-2 pb-2">Sections</p>
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = link.href === activeHref

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveHref(link.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--bladevault-olive)] text-[var(--bladevault-gold)]"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{link.label}</span>
                </a>
              )
            })}
          </div>

          <div className="mt-6 border-t border-sidebar-border/60 pt-5">
            <p className="vault-label px-2 pb-2">Highlights</p>
            <div className="space-y-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-sidebar-border/70 bg-card/80 px-4 py-3 text-sm text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t border-sidebar-border/60 p-4">
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <ThemeToggle
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sidebar-border/70 bg-card/90 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              label="Toggle theme"
            />
            <Button
              render={<a href="https://github.com/kolasokol/bladevault" />}
              nativeButton={false}
              variant="outline"
              className="h-11 justify-center rounded-2xl"
            >
              View GitHub
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
