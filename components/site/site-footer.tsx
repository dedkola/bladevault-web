export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-4 pb-8 pt-4 text-sm text-muted-foreground lg:px-6">
      <div className="vault-shell flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">BladeVault</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Local-first knife collection manager.</span>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--bladevault-title)]">
            Organize, compare, and review your collection.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/kolasokol/bladevault"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="#install"
            className="hover:text-foreground"
          >
            Install
          </a>
          <span className="text-muted-foreground/60">© {year}</span>
        </div>
      </div>
    </footer>
  )
}
