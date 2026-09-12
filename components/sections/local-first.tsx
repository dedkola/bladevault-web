import { ArchiveRestore, Database, HardDrive, Server } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Store locally",
    detail: "SQLite database and images in one movable data folder.",
  },
  {
    number: "02",
    title: "Back up completely",
    detail: "Download or restore a portable archive, including images.",
  },
  {
    number: "03",
    title: "Choose your runtime",
    detail: "Desktop, Docker, Podman, Kubernetes, or source.",
  },
]

const facts = [
  ["No account", "Open the app and begin. No registration gate."],
  ["Offline", "Your core collection does not depend on a cloud service."],
  ["MIT licensed", "Inspect, self-host, customize, and contribute."],
  ["Opt-in backup", "Configure cloud archives only if you want them."],
]

export function LocalFirst() {
  return (
    <section
      id="local-first"
      className="grid items-center gap-10 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.7fr)] lg:gap-[clamp(2rem,7vw,7rem)] lg:py-32"
    >
      <div>
        <p className="vault-label">Local-first, by design</p>
        <h2 className="mt-4 max-w-[11ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] font-semibold tracking-[-0.06em] text-balance text-foreground">
          Your collection is not the product.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
          The working database and images live in a documented folder on your
          machine or server. BladeVault needs no account, works offline, and
          makes cloud backup an opt-in choice—not the price of using your own
          records.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-border/70 pt-4">
              <span className="font-mono text-[10px] font-semibold text-[var(--bladevault-title)]">
                {step.number}
              </span>
              <strong className="mt-3 block text-sm text-foreground">
                {step.title}
              </strong>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="vault-grid overflow-hidden rounded-xl border border-[var(--bladevault-line)]/75 bg-[#f8f4e9]/65 shadow-[0_18px_55px_rgb(46_52_23/9%)]"
        aria-label="Illustration of the BladeVault local data folder"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--bladevault-line)]/55 px-4 py-3">
          <span className="flex items-center gap-2 text-xs font-semibold text-[var(--bladevault-olive)]">
            <HardDrive className="size-4 text-[var(--bladevault-title)]" />
            BladeVault / data
          </span>
          <span className="vault-chip">Local</span>
        </div>
        <div className="m-4 rounded-lg border border-[var(--bladevault-line)]/55 bg-[#fffefa]/92 p-5 font-mono text-[11px] leading-7 text-muted-foreground">
          <strong className="text-[var(--bladevault-olive)]">
            ▾ BladeVault
          </strong>
          <br />
          ├─ bladevault.sqlite
          <br />
          ├─ images
          <br />
          │&nbsp;&nbsp;├─ porcupine-tislim
          <br />
          │&nbsp;&nbsp;├─ militaw
          <br />
          │&nbsp;&nbsp;└─ penguin-plus
          <br />
          └─ backups
        </div>
        <div className="grid border-t border-[var(--bladevault-line)]/55 sm:grid-cols-2">
          {facts.map(([title, detail], index) => {
            const Icon = [Database, Server, ArchiveRestore, HardDrive][index]
            return (
              <div
                key={title}
                className={`p-4 ${index % 2 ? "sm:border-l" : ""} ${index > 1 ? "border-t" : ""} border-[var(--bladevault-line)]/45`}
              >
                <Icon className="size-4 text-[var(--bladevault-title)]" />
                <strong className="mt-2 block text-xs text-[var(--bladevault-olive)]">
                  {title}
                </strong>
                <span className="mt-1 block text-[10px] leading-4 text-muted-foreground">
                  {detail}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
