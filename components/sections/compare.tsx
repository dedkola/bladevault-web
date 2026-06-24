import Image from "next/image"

export function Compare() {
  return (
    <section id="compare" className="border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
          Compare knives side by side.
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <p className="text-muted-foreground">
            Select up to 3 knives and compare specs, steel, and images next to
            each other.
          </p>
          <Image
            src="/screenshots/compare.png"
            width={1440}
            height={900}
            alt="BladeVault compare — side-by-side knife specs"
            className="rounded-lg border border-border/60 shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}