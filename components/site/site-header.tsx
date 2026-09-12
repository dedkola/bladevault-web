import { Download } from "lucide-react"
import Link from "next/link"

import { BladevaultLogoMark } from "@/components/site/bladevault-logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/#workflow", label: "Workflow" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#local-first", label: "Local-first" },
  { href: "/#install", label: "Install" },
  { href: "/whats-new", label: "What’s new" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid min-h-16 w-full max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link
          href="/"
          aria-label="BladeVault home"
          className="flex items-center gap-2.5 py-2 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <span className="flex size-9 items-center justify-center">
            <BladevaultLogoMark className="size-8" />
          </span>
          <span className="text-lg font-semibold tracking-[-0.035em] text-foreground">
            Blade<span className="text-[var(--bladevault-title)]">Vault</span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--bladevault-title)] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <ThemeToggle className="h-9 w-9 border border-border bg-card" />
          <Link
            href="/#install"
            className="vault-action vault-action-primary h-10 px-4"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Download</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
