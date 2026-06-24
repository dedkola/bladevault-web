import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#compare", label: "Compare" },
  { href: "#howto", label: "How-to" },
  { href: "#install", label: "Install" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#" className="text-lg font-semibold">
          BladeVault
        </a>
        <nav className="flex flex-wrap items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
