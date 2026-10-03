"use client"

import { Download, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

import { BladevaultLogoMark } from "@/components/site/bladevault-logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { useActiveSection } from "@/components/site/use-active-section"
import {
  homepageSectionIds,
  siteNavigation,
  siteUtilityLinks,
} from "@/lib/navigation"

export function SiteHeader() {
  const pathname = usePathname()
  const activeSection = useActiveSection(homepageSectionIds, pathname === "/")
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  function currentLocation(link: (typeof siteNavigation)[number]) {
    if (link.sectionId) {
      return pathname === "/" && activeSection === link.sectionId
        ? ("location" as const)
        : undefined
    }
    return pathname === link.href ? ("page" as const) : undefined
  }

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const desktop = window.matchMedia("(min-width: 1024px)")
    function onResize(event: MediaQueryListEvent) {
      if (event.matches) setMenuOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onResize)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onResize)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid min-h-16 w-full max-w-[1600px] grid-cols-[1fr_auto] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link
          href="/"
          aria-label="BladeVault home"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 py-2 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <span className="flex size-9 items-center justify-center">
            <BladevaultLogoMark className="size-8" />
          </span>
          <span className="text-lg font-semibold tracking-[-0.035em] text-foreground">
            Blade<span className="text-[var(--bladevault-title)]">Vault</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-8 lg:flex"
        >
          {siteNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={currentLocation(link)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--bladevault-title)] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none aria-[current]:text-[var(--bladevault-title)] aria-[current]:underline aria-[current]:decoration-[var(--bladevault-gold)] aria-[current]:underline-offset-8"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          <ThemeToggle className="h-10 w-10 border border-border bg-card" />
          <Link
            href="/#install"
            aria-label="Download BladeVault"
            onClick={() => setMenuOpen(false)}
            className="vault-action vault-action-primary h-10 px-3 sm:px-4"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Download</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none lg:hidden"
          >
            {menuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <nav
        id={menuId}
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="border-t border-border/70 px-4 py-3 sm:px-6 lg:hidden"
      >
        <div className="mx-auto grid max-w-[1600px] gap-1">
          {siteNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={currentLocation(link)}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none aria-[current]:bg-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-5 border-t border-border/60 px-3 pt-3 pb-1">
            {siteUtilityLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-1 text-sm text-[var(--bladevault-title)] transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
