import { Apple, Download, Monitor } from "lucide-react"

import { CodeCopy } from "@/components/code-copy"

export function InstallCta() {
  return (
    <section id="install" className="vault-shell overflow-hidden">
      <div>
        <div className="p-6 sm:p-8 xl:p-10">
          <p className="vault-label">Install</p>
          <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Run BladeVault the same day you discover it.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
            Pick your preferred setup: run it in Docker or download a native
            installer for macOS or Windows.
          </p>

          <div className="mt-6 grid gap-4">
            <div className="mx-auto w-full max-w-full text-center sm:w-fit">
              <CodeCopy
                title="Run in Docker"
                className="mx-auto w-full max-w-full text-left sm:w-auto"
                text={`docker run -d \\
  --name bladevault \\
  --restart unless-stopped \\
  -p 5500:3000 \\
  -v "$HOME/BladeVault/data:/app/data" \\
  ghcr.io/kolasokol/bladevault:latest`}
              />
              <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-6 text-muted-foreground">
                Starts BladeVault in a persistent container with local data
                storage mounted from your machine.
              </p>
            </div>

            <div className="vault-panel mx-auto w-full max-w-full p-5 text-center sm:w-[458px]">
              <div className="flex items-center justify-center gap-2">
                <Apple className="size-4 text-[var(--bladevault-title)]" />
                <p className="vault-label">macOS Install</p>
              </div>
              <p className="mt-3 max-w-[44ch] text-sm leading-6 text-muted-foreground">
                Download the latest DMG installer for macOS.
              </p>
              <a
                href="https://github.com/kolasokol/bladevault/releases/latest/download/BladeVault.dmg"
                className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-card/90 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Download className="size-4" />
                Download for macOS
              </a>
            </div>

            <div className="vault-panel mx-auto w-full max-w-full p-5 text-center sm:w-[458px]">
              <div className="flex items-center justify-center gap-2">
                <Monitor className="size-4 text-[var(--bladevault-title)]" />
                <p className="vault-label">Windows Install</p>
              </div>
              <p className="mt-3 max-w-[44ch] text-sm leading-6 text-muted-foreground">
                Download the latest EXE installer for Windows.
              </p>
              <a
                href="https://github.com/kolasokol/bladevault/releases/latest/download/BladeVault.exe"
                className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-card/90 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Download className="size-4" />
                Download for Windows
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
