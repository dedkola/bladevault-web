export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 pt-3 pb-8 text-sm text-muted-foreground lg:px-4">
      <div className="vault-shell flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">BladeVault</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Local-first knife collection manager.</span>
          </div>
          <p className="text-[10px] font-semibold tracking-[0.1em] text-[var(--bladevault-title)] uppercase">
            Organize, compare, and review your collection.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/dedkola/bladevault"
            aria-label="BladeVault on GitHub"
            className="text-[var(--bladevault-title)] transition-colors hover:text-foreground"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 fill-current"
            >
              <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39c0.6 0.11 0.82-0.26 0.82-0.58c0-0.29-0.01-1.06-0.02-2.08c-3.34 0.73-4.04-1.61-4.04-1.61c-0.55-1.38-1.33-1.75-1.33-1.75c-1.09-0.74 0.08-0.72 0.08-0.72c1.2 0.08 1.84 1.24 1.84 1.24c1.08 1.83 2.82 1.3 3.51 0.99c0.11-0.78 0.42-1.3 0.76-1.6c-2.67-0.3-5.47-1.33-5.47-5.9c0-1.3 0.47-2.37 1.24-3.2c-0.12-0.3-0.54-1.52 0.12-3.17c0 0 1.01-0.32 3.3 1.22c0.96-0.27 1.98-0.41 3-0.41c1.02 0 2.04 0.14 3 0.41c2.29-1.54 3.29-1.22 3.29-1.22c0.66 1.65 0.25 2.87 0.12 3.17c0.77 0.83 1.24 1.9 1.24 3.2c0 4.58-2.8 5.6-5.48 5.9c0.43 0.37 0.81 1.1 0.81 2.22c0 1.61-0.01 2.9-0.01 3.29c0 0.32 0.21 0.7 0.82 0.58C20.56 22.3 24 17.8 24 12.5C24 5.87 18.63 0.5 12 0.5Z" />
            </svg>
          </a>
          <span className="text-muted-foreground/60">© {year}</span>
        </div>
      </div>
    </footer>
  )
}
