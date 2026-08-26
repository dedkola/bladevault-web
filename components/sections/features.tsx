import {
  AppWindow,
  CloudDownload,
  CloudUpload,
  Columns3,
  Database,
  Gauge,
  Gift,
  Image as ImageIcon,
  ImagePlus,
  Library,
  Monitor,
  MoonStar,
  PackageOpen,
  PanelsTopLeft,
  Pin,
  Printer,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import { cn } from "@/lib/utils"

const featureCategories = [
  {
    category: "Collection Core",
    description: "The foundation of your knife library",
    features: [
      {
        icon: Database,
        title: "Structured database",
        description:
          "Keep specifications, pricing, provenance, notes, links, custom fields, and multiple images together in each knife record.",
      },
      {
        icon: Search,
        title: "Search & detailed filters",
        description:
          "Search collection fields, then narrow results by brand, steel, lock type, blade shape, carry style, and other recorded details.",
      },
      {
        icon: Pin,
        title: "Pin for quick access",
        description:
          "Keep favorites, active projects, or frequently referenced knives close at hand in your collection.",
      },
      {
        icon: Library,
        title: "Brand-centric browsing",
        description:
          "Browse by maker to focus the collection on the brands, models, and variants you have recorded.",
      },
    ],
  },
  {
    category: "Comparison & Analysis",
    description: "Make informed decisions with powerful visual tools",
    features: [
      {
        icon: Columns3,
        title: "Multi-column comparison",
        description:
          "Compare any number of knives side by side in a purpose-built table with specifications aligned by row.",
      },
      {
        icon: Gauge,
        title: "Fast visual scanning",
        description:
          "Focus on differences and scan dimensions, steel, grind, finish, and other recorded details at a glance.",
      },
      {
        icon: PanelsTopLeft,
        title: "Purpose-built layout",
        description:
          "Use a comparison board designed for collectors instead of assembling a separate spreadsheet.",
      },
      {
        icon: Printer,
        title: "Direct print & export",
        description:
          "Print the comparison table or export it as a landscape PDF for offline reference.",
      },
    ],
  },
  {
    category: "Media & Enrichment",
    description: "Rich visual records that tell the full story",
    features: [
      {
        icon: ImagePlus,
        title: "Upload your own photos",
        description:
          "Attach multiple images per knife — product shots, detail close-ups, box/paperwork, wear documentation.",
      },
      {
        icon: ImageIcon,
        title: "Choose main display image",
        description:
          "Choose the primary photo shown for a knife throughout the collection interface.",
      },
      {
        icon: Upload,
        title: "Import details or upload images",
        description:
          "Import product details from supported retailer URLs and add your own images from disk.",
      },
      {
        icon: RefreshCw,
        title: "Refresh imported details",
        description:
          "Revisit a supported product URL to refresh imported specifications and images when the source changes.",
      },
    ],
  },
  {
    category: "Platform & Sync",
    description: "Native apps, cloud backup, and total ownership",
    features: [
      {
        icon: Monitor,
        title: "Windows desktop app",
        description:
          "Install BladeVault on Windows for local SQLite storage, offline access, and automatic desktop updates.",
      },
      {
        icon: AppWindow,
        title: "macOS desktop app",
        description:
          "Run BladeVault as a macOS desktop app while keeping your collection and downloaded images on your machine.",
      },
      {
        icon: CloudDownload,
        title: "Cloud restore & backup",
        description:
          "Opt into complete cloud archives, including images, when a BladeVault backup service is configured.",
      },
      {
        icon: CloudUpload,
        title: "Automatic cloud backups",
        description:
          "Run automatic backups hourly and after collection changes while local storage remains the source of truth.",
      },
    ],
  },
  {
    category: "Experience & Access",
    description: "Polished details that respect your workflow",
    features: [
      {
        icon: SlidersHorizontal,
        title: "Detailed collection filters",
        description:
          "Combine collection categories and recorded details to narrow a large vault to the knives you need.",
      },
      {
        icon: MoonStar,
        title: "Dark theme",
        description:
          "Switch to a dark interface for lower-light browsing while keeping collection details easy to scan.",
      },
      {
        icon: PackageOpen,
        title: "Open source (MIT)",
        description:
          "Review the source on GitHub, self-host with Docker or Kubernetes, customize it, or contribute under the MIT license.",
      },
      {
        icon: Gift,
        title: "Completely free",
        description:
          "BladeVault is free to use, with local, desktop, container, Kubernetes, and source-install options.",
      },
    ],
  },
] as const

function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, ReactNode> = {
    "Collection Core": <Database className="size-5" />,
    "Comparison & Analysis": <Columns3 className="size-5" />,
    "Media & Enrichment": <ImageIcon className="size-5" />,
    "Platform & Sync": <CloudUpload className="size-5" />,
    "Experience & Access": <SlidersHorizontal className="size-5" />,
  }
  return icons[category] || <Database className="size-5" />
}

export function Features() {
  return (
    <section
      id="features"
      className="vault-shell scroll-mt-28 overflow-hidden lg:scroll-mt-4"
    >
      <div className="px-6 py-7 sm:px-8 sm:py-9 xl:px-10 xl:py-12">
        <div className="mb-10 max-w-3xl">
          <p className="vault-label">Features</p>
          <h2 className="vault-section-title">
            Everything you need to manage a serious collection.
          </h2>
          <p className="vault-section-copy">
            Five capability areas, twenty features — each built for the way
            collectors actually work.
          </p>
        </div>

        <div className="space-y-10">
          {featureCategories.map((category, catIndex) => (
            <div
              key={category.category}
              className={cn(
                "rounded-xl border border-border/60 bg-card/50 p-5 transition-all duration-300 sm:p-6 xl:p-8",
                "hover:border-[var(--bladevault-gold)]/40 hover:bg-card hover:shadow-[0_8px_30px_rgb(46_52_23_/_0.08)]"
              )}
              style={{ transitionDelay: `${catIndex * 60}ms` }}
            >
              {/* Category header */}
              <div className="mb-6 flex items-start gap-4">
                <div className="vault-icon-box shrink-0">
                  <CategoryIcon category={category.category} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.category}
                    </h3>
                    <span className="vault-chip">
                      {category.features.length} features
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Feature grid */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {category.features.map((feature, featIndex) => (
                  <article
                    key={feature.title}
                    className={cn(
                      "group relative rounded-lg border border-border/50 bg-card/50 p-4 transition-all duration-300",
                      "hover:-translate-y-0.5 hover:border-[var(--bladevault-gold)]/30 hover:bg-card hover:shadow-[0_4px_20px_rgb(46_52_23_/_0.06)]"
                    )}
                    style={{ transitionDelay: `${featIndex * 30}ms` }}
                  >
                    {/* Icon */}
                    <div className="mb-3 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted/50 text-[var(--bladevault-title)] transition-colors duration-300 group-hover:border-[var(--bladevault-gold)]/40 group-hover:bg-[var(--bladevault-gold)]/10">
                      <feature.icon className="size-4.5" />
                    </div>

                    {/* Content */}
                    <h4 className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-[var(--bladevault-title)]">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {feature.description}
                    </p>

                    {/* Subtle hover accent */}
                    <div className="absolute right-0 bottom-0 left-0 h-px bg-transparent transition-colors duration-300 group-hover:bg-[var(--bladevault-gold)]/30" />
                  </article>
                ))}
              </div>
            </div>
          ))}

          {/* Summary stats row */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              value="20+"
              label="Features included"
              icon={PackageOpen}
            />
            <StatCard value="100%" label="Local-first" icon={Database} />
            <StatCard value="Free" label="Open source (MIT)" icon={Gift} />
            <StatCard value="2" label="Native platforms" icon={AppWindow} />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string
  label: string
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-4 py-3 transition-colors hover:border-[var(--bladevault-gold)]/40 hover:bg-card">
      <div className="vault-icon-box">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-[10px] font-medium tracking-[0.08em] text-[var(--bladevault-title)] uppercase">
          {label}
        </p>
      </div>
    </div>
  )
}
