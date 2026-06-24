import { PlayCircle } from "lucide-react"

export function HowTo() {
  return (
    <section id="howto" className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
          How to use BladeVault.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border transition-transform hover:scale-[1.02]"
            >
              <PlayCircle className="size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Demo video — coming soon
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
