import { BladevaultLogoMark } from "@/components/site/bladevault-logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#features", label: "Features" },
  { href: "#workflows", label: "Workflows" },
  { href: "#gallery", label: "Gallery" },
  { href: "#install", label: "Install" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/82 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <a href="#overview" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center">
              <BladevaultLogoMark className="size-8" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                Blade
                <span className="text-[var(--bladevault-title)]">Vault</span>
              </p>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-10 w-10 border border-border/70 bg-card/90" />
            <Button
              render={<a href="https://github.com/kolasokol/bladevault" />}
              nativeButton={false}
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              GitHub
            </Button>
          </div>
        </div>
        <nav className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
