import { Apple, Container, Download, Monitor } from "lucide-react"

import { CodeCopy } from "@/components/code-copy"
import { siteConfig } from "@/lib/site"

const dockerCommand = `docker run -d \\
  --name bladevault \\
  --restart unless-stopped \\
  -p 5500:3000 \\
  -v "$HOME/BladeVault/data:/app/data" \\
  ghcr.io/dedkola/bladevault:latest`

export function InstallCta() {
  return (
    <section id="install" className="vault-shell overflow-hidden">
      <div className="border-b border-border/65 px-6 py-7 sm:px-8 sm:py-9 xl:px-10">
        <p className="vault-label">Install</p>
        <h2 className="vault-section-title">
          Bring your collection home today.
        </h2>
        <p className="vault-section-copy">
          Run BladeVault in Docker or download the native desktop app. Your
          collection stays under your control either way.
        </p>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="border-b border-border/65 p-6 sm:p-8 xl:border-r xl:border-b-0 xl:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="vault-icon-box">
              <Container className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Run in Docker
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Persistent local storage · port 5500
              </p>
            </div>
          </div>
          <CodeCopy text={dockerCommand} />
          <p className="mt-3 max-w-2xl text-xs leading-5 text-muted-foreground">
            The command creates a persistent container and mounts collection
            data from your machine.
          </p>
        </div>

        <div className="divide-y divide-border/65">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="vault-icon-box">
                <Apple className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">macOS</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Download the latest DMG installer.
                </p>
                <a
                  href={siteConfig.macDownloadUrl}
                  className="vault-action mt-4 w-full sm:w-auto"
                >
                  <Download className="size-4" />
                  Download for macOS
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="vault-icon-box">
                <Monitor className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">Windows</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Download the latest EXE installer.
                </p>
                <a
                  href={siteConfig.windowsDownloadUrl}
                  className="vault-action mt-4 w-full sm:w-auto"
                >
                  <Download className="size-4" />
                  Download for Windows
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
