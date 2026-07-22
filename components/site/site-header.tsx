import { BladevaultLogoMark } from "@/components/site/bladevault-logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navLinks = [
  { href: "/#overview", label: "Overview" },
  { href: "/#features", label: "Features" },
  { href: "/#workflows", label: "Workflows" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#install", label: "Install" },
  { href: "/whats-new", label: "What’s new" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/75 bg-background/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 py-3">
            <div className="flex size-10 items-center justify-center">
              <BladevaultLogoMark className="size-8" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                Blade
                <span className="text-[var(--bladevault-title)]">Vault</span>
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-9 w-9 border border-border bg-card" />
            <Button
              render={<a href="https://github.com/dedkola/bladevault" />}
              nativeButton={false}
              variant="outline"
              size="sm"
              className="h-9 rounded-lg border-border"
            >
              GitHub
            </Button>
          </div>
        </div>
        <nav className="scrollbar-hide flex items-center gap-4 overflow-x-auto border-t border-border/55 py-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-[11px] font-medium text-muted-foreground transition-colors hover:text-[var(--bladevault-title)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
