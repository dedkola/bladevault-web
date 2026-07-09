import {
  AppWindow,
  CloudDownload,
  CloudUpload,
  Library,
  Monitor,
  Search,
  Columns3,
  Database,
  Gauge,
  Gift,
  Image,
  ImagePlus,
  MoonStar,
  PackageOpen,
  PanelsTopLeft,
  Pin,
  Printer,
  RefreshCw,
  SlidersHorizontal,
  Upload,
} from "lucide-react"

const featureHighlights = [
  {
    icon: Columns3,
    label: "Multi-column clarity",
  },
  {
    icon: Search,
    label: "Power text search",
  },
  {
    icon: Gauge,
    label: "Fast visual scanning",
  },
  {
    icon: PanelsTopLeft,
    label: "Purpose-built layout",
  },
]

const compactFeatures = [
  {
    icon: Database,
    label: "Search in database",
  },
  {
    icon: Pin,
    label: "Pin for quick access",
  },
  {
    icon: Library,
    label: "Easy brand navigation",
  },
  {
    icon: Printer,
    label: "Direct print results",
  },
  {
    icon: SlidersHorizontal,
    label: "Amazon-style category filters",
  },
  {
    icon: RefreshCw,
    label: "Rescrape brand pages later",
  },
  {
    icon: ImagePlus,
    label: "Upload your own images",
  },
  {
    icon: Image,
    label: "Choose main display image",
  },
  {
    icon: Upload,
    label: "Upload images from your PC",
  },
  {
    icon: MoonStar,
    label: "Dark theme",
  },
  {
    icon: CloudDownload,
    label: "Cloud restore and backup",
  },
  {
    icon: CloudUpload,
    label: "Automatic cloud backups",
  },
  {
    icon: PackageOpen,
    label: "Open source",
  },
  {
    icon: Monitor,
    label: "Windows app",
  },
  {
    icon: AppWindow,
    label: "macOS app",
  },
  {
    icon: Gift,
    label: "It's free",
  },
]

export function Features() {
  return (
    <section id="features" className="vault-shell p-6 sm:p-8 xl:p-10">
      <div className="mb-8 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="vault-label">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Everything you need to manage a serious collection.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Track what you own, review details quickly, and keep every item easy
          to find, compare, and update.
        </p>
      </div>

      <div className="mb-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {featureHighlights.map((highlight) => (
          <div
            key={highlight.label}
            className="vault-panel flex items-center gap-3 p-4"
          >
            <highlight.icon className="size-4 shrink-0 text-[var(--bladevault-title)]" />
            <p className="text-sm font-medium text-foreground">
              {highlight.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {compactFeatures.map((feature) => (
          <div
            key={feature.label}
            className="vault-panel flex items-center gap-3 p-4"
          >
            <feature.icon className="size-4 shrink-0 text-[var(--bladevault-title)]" />
            <p className="text-sm font-medium text-foreground">
              {feature.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
