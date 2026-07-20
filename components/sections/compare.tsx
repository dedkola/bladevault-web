import Image from "next/image"
import { Check, Columns3, Gauge, PanelsTopLeft } from "lucide-react"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"

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
          <h2 className="vault-section-title">
            Put the spec sheet on stage, not in the background.
          </h2>
          <p className="vault-section-copy">
            Compare dimensions, materials, finishes, and other key details in
            one place when you need to make a fast call between multiple pieces.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 border-y border-border/60 py-3">
              <Columns3 className="size-4 shrink-0 text-[var(--bladevault-title)]" />
              <p className="text-sm font-medium text-foreground">
                Multi-column clarity
              </p>
            </div>
            <div className="flex items-center gap-3 border-y border-border/60 py-3">
              <Gauge className="size-4 shrink-0 text-[var(--bladevault-title)]" />
              <p className="text-sm font-medium text-foreground">
                Fast visual scanning
              </p>
            </div>
            <div className="flex items-center gap-3 border-y border-border/60 py-3">
              <PanelsTopLeft className="size-4 shrink-0 text-[var(--bladevault-title)]" />
              <p className="text-sm font-medium text-foreground">
                Purpose-built layout
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-border/70">
            {comparePoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 border-b border-border/55 bg-card p-4 text-sm leading-6 text-muted-foreground last:border-b-0"
              >
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-[var(--bladevault-title)]">
                  <Check className="size-3.5" />
                </div>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="vault-window">
          <div className="vault-window-bar">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
              <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
            </div>
            <span className="vault-label">Comparison check</span>
          </div>
          <div className="overflow-hidden">
            <ScreenshotLightbox
              src="/screenshots/compare.png"
              alt="BladeVault compare board screenshot"
              className="w-full"
            >
              <Image
                src="/screenshots/compare.png"
                width={1440}
                height={900}
                alt="BladeVault compare board screenshot"
                className="h-auto w-full"
              />
            </ScreenshotLightbox>
          </div>
        </div>
      </div>
    </section>
  )
}
