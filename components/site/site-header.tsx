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
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <a href="#" className="font-semibold text-lg">
          BladeVault
        </a>
        <nav className="flex flex-wrap gap-4 items-center">
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