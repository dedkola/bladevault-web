import { PlayCircle } from "lucide-react"

export function HowTo() {
  return (
    <section id="howto" className="border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
          How to use BladeVault.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
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