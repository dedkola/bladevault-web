import {
  Database,
  LayoutDashboard,
  Layers,
  Search,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type FeatureHighlight = {
  icon: LucideIcon
  title: string
  description: string
  accent?: "gold" | "olive" | "title"
}

const featureHighlights: FeatureHighlight[] = [
  {
    icon: Shield,
    title: "Local-first & private",
    description:
      "Your collection lives on your machine with no cloud dependency or account required. Cloud backup is available only when you opt in and configure it.",
    accent: "olive",
  },
  {
    icon: Database,
    title: "Rich, structured records",
    description:
      "Capture every detail — specs, materials, finishes, provenance, purchase info, and multiple images per knife — all searchable and filterable.",
    accent: "gold",
  },
  {
    icon: LayoutDashboard,
    title: "Visual comparison board",
    description:
      "Put knives side by side in a purpose-built layout. Scan dimensions, steel, grind, and finish differences at a glance — no spreadsheet fatigue.",
    accent: "title",
  },
  {
    icon: Sparkles,
    title: "AI-ready via MCP",
    description:
      "Model Context Protocol support lets you chat with your collection in Claude, Codex, or any MCP-compatible client. Ask questions, get insights, generate reports.",
    accent: "olive",
  },
  {
    icon: Layers,
    title: "Desktop experience",
    description:
      "Desktop apps for macOS and Windows keep the same local SQLite vault available offline, with automatic desktop updates.",
    accent: "gold",
  },
  {
    icon: Search,
    title: "Powerful filtering & search",
    description:
      "Search collection fields and narrow results by brand, steel, lock type, blade shape, carry style, and other recorded details.",
    accent: "title",
  },
]

function getAccentClasses(accent?: FeatureHighlight["accent"]) {
  switch (accent) {
    case "gold":
      return "border-[var(--bladevault-gold)]/30 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_srgb,var(--bladevault-gold)_6%,var(--card))_100%)]"
    case "olive":
      return "border-[var(--bladevault-olive)]/30 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_srgb,var(--bladevault-olive)_6%,var(--card))_100%)]"
    case "title":
      return "border-[var(--bladevault-title)]/20 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_srgb,var(--bladevault-title)_5%,var(--card))_100%)]"
    default:
      return "border-border/60 bg-card"
  }
}

function getIconClasses(accent?: FeatureHighlight["accent"]) {
  switch (accent) {
    case "gold":
      return "text-[var(--bladevault-gold)]"
    case "olive":
      return "text-[var(--bladevault-olive)]"
    case "title":
      return "text-[var(--bladevault-title)]"
    default:
      return "text-[var(--bladevault-title)]"
  }
}

export function FeatureHighlights() {
  return (
    <section id="highlights" className="vault-shell overflow-hidden">
      <div className="px-6 py-7 sm:px-8 sm:py-9 xl:px-10 xl:py-12">
        <div className="mb-10 max-w-3xl">
          <p className="vault-label">Why BladeVault</p>
          <h2 className="vault-section-title">
            Built for collectors who care about the details.
          </h2>
          <p className="vault-section-copy">
            Six core capabilities that make BladeVault the definitive tool for
            organizing, comparing, and exploring a serious knife collection.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featureHighlights.map((feature, index) => {
            const Icon = feature.icon
            const accentClasses = getAccentClasses(feature.accent)
            const iconClasses = getIconClasses(feature.accent)

            return (
              <article
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden rounded-xl p-5 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(46_52_23_/_0.12)]",
                  accentClasses
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {/* Subtle top accent bar */}
                <div
                  className={cn(
                    "absolute top-0 right-0 left-0 h-1 origin-left transform transition-transform duration-300",
                    "scale-x-0 group-hover:scale-x-100"
                  )}
                  style={{
                    background:
                      feature.accent === "gold"
                        ? "var(--bladevault-gold)"
                        : feature.accent === "olive"
                          ? "var(--bladevault-olive)"
                          : "var(--bladevault-title)",
                  }}
                />

                <div className="relative z-10">
                  <div className={cn("vault-icon-box mb-4", iconClasses)}>
                    <Icon className="size-5" />
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute right-0 bottom-0 left-0 h-px bg-transparent transition-colors duration-300 group-hover:bg-[var(--bladevault-gold)]/40" />
              </article>
            )
          })}
        </div>

        {/* Trust indicators row */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-1 flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="size-4 shrink-0 text-[var(--bladevault-gold)]" />
            <span>100% local-first — your data, your control</span>
          </div>
          <div className="col-span-1 flex items-center gap-3 text-sm text-muted-foreground">
            <Layers className="size-4 shrink-0 text-[var(--bladevault-title)]" />
            <span>Free & open source (MIT licensed)</span>
          </div>
          <div className="col-span-1 flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="size-4 shrink-0 text-[var(--bladevault-olive)]" />
            <span>MCP ready — talk to your collection with AI</span>
          </div>
        </div>
      </div>
    </section>
  )
}
