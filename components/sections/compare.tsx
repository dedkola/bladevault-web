import Image from "next/image"
import { Check, Columns3, Gauge, PanelsTopLeft } from "lucide-react"

const comparePoints = [
  "Keep multiple pieces in view without flattening the details into a spreadsheet vibe.",
  "Read dimensions, materials, and finish information in a structured table that still feels premium.",
  "Use the compare board as a selling point for collectors who obsess over specifics.",
]

export function Compare() {
  return (
    <section id="compare" className="vault-shell p-6 sm:p-8 xl:p-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] xl:items-center">
        <div>
          <p className="vault-label">Compare</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Put the spec sheet on stage, not in the background.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            Compare dimensions, materials, finishes, and other key details in
            one place when you need to make a fast call between multiple pieces.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="vault-panel flex items-center gap-3 p-4">
              <Columns3 className="size-4 shrink-0 text-[var(--bladevault-title)]" />
              <p className="text-sm font-medium text-foreground">
                Multi-column clarity
              </p>
            </div>
            <div className="vault-panel flex items-center gap-3 p-4">
              <Gauge className="size-4 shrink-0 text-[var(--bladevault-title)]" />
              <p className="text-sm font-medium text-foreground">
                Fast visual scanning
              </p>
            </div>
            <div className="vault-panel flex items-center gap-3 p-4">
              <PanelsTopLeft className="size-4 shrink-0 text-[var(--bladevault-title)]" />
              <p className="text-sm font-medium text-foreground">
                Purpose-built layout
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {comparePoints.map((point) => (
              <div
                key={point}
                className="vault-panel flex items-start gap-3 p-4 text-sm leading-6 text-muted-foreground"
              >
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[var(--bladevault-title)]">
                  <Check className="size-3.5" />
                </div>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="vault-panel overflow-hidden p-3 sm:p-4">
          <div className="overflow-hidden rounded-[1.4rem] border border-border/70">
            <Image
              src="/screenshots/compare.png"
              width={1440}
              height={900}
              alt="BladeVault compare board screenshot"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
