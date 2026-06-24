export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-border/40 px-6 py-8 text-sm text-muted-foreground md:flex-row">
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
