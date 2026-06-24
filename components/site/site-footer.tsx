export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">BladeVault</span>
        <span className="text-muted-foreground/60">·</span>
        <span>Built with precision for knife enthusiasts.</span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/kolasokol/bladevault"
          className="hover:text-foreground"
        >
          GitHub
        </a>
        <span className="text-muted-foreground/60">© {year}</span>
      </div>
    </footer>
  )
}