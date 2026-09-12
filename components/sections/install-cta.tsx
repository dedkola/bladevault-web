import {
  Apple,
  ArrowRight,
  Container,
  Download,
  Layers3,
  Monitor,
} from "lucide-react"

import { siteConfig } from "@/lib/site"

const installOptions = [
  {
    title: "macOS",
    detail: "Native desktop app for macOS 13 or newer.",
    action: "Download DMG",
    href: siteConfig.macDownloadUrl,
    icon: Apple,
  },
  {
    title: "Windows",
    detail: "Native installer with in-app update support.",
    action: "Download EXE",
    href: siteConfig.windowsDownloadUrl,
    icon: Monitor,
  },
  {
    title: "Docker / Podman",
    detail: "Run locally with a persistent data folder.",
    action: "View command",
    href: "https://github.com/dedkola/bladevault#run-in-a-container",
    icon: Container,
  },
  {
    title: "Kubernetes",
    detail: "Install the official Helm chart on your cluster.",
    action: "Open chart guide",
    href: "https://github.com/dedkola/bladevault/tree/main/charts/bladevault",
    icon: Layers3,
  },
]

export function InstallCta() {
  return (
    <section
      id="install"
      className="grid overflow-hidden rounded-xl border border-border/75 bg-[var(--shell)] lg:grid-cols-[minmax(0,0.78fr)_minmax(32rem,1.22fr)]"
    >
      <div className="flex flex-col justify-center border-b border-border/65 p-7 sm:p-10 lg:border-r lg:border-b-0 xl:p-14">
        <p className="vault-label">Choose your setup</p>
        <h2 className="mt-4 max-w-[10ch] text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.96] font-semibold tracking-[-0.06em] text-balance text-foreground">
          Bring the vault home.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
          Start with the desktop app or run BladeVault wherever you already keep
          the rest of your tools.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={siteConfig.releasesUrl}
            className="vault-action vault-action-primary"
          >
            <Download className="size-4" />
            Download latest release
          </a>
          <a href={siteConfig.githubUrl} className="vault-action">
            View source <ArrowRight className="size-4" />
          </a>
        </div>
      </div>

      <div className="grid sm:grid-cols-2">
        {installOptions.map(
          ({ title, detail, action, href, icon: Icon }, index) => (
            <a
              key={title}
              href={href}
              className={`group flex min-h-52 flex-col p-7 transition-colors hover:bg-accent/55 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-inset sm:p-9 ${index % 2 ? "sm:border-l" : ""} ${index > 1 ? "border-t" : index ? "border-t sm:border-t-0" : ""} border-border/65`}
            >
              <span className="vault-icon-box">
                <Icon className="size-4" />
              </span>
              <h3 className="mt-8 text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {detail}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-[10px] font-semibold tracking-[0.07em] text-[var(--bladevault-title)] uppercase">
                {action}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          )
        )}
      </div>
    </section>
  )
}
