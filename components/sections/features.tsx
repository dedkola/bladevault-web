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
      <div className="mb-8">
        <div>
          <p className="vault-label">Features</p>
          <h2 className="vault-section-title">
            Everything you need to manage a serious collection.
          </h2>
        </div>
      </div>

      <div className="mb-5 grid overflow-hidden rounded-lg border border-[var(--bladevault-olive)] sm:grid-cols-2 xl:grid-cols-4">
        {featureHighlights.map((highlight) => (
          <div
            key={highlight.label}
            className="flex items-center gap-3 border-b border-[rgb(211_164_47_/_0.28)] bg-[var(--bladevault-olive)] p-4 text-[var(--bladevault-gold)] last:border-b-0 sm:border-r xl:border-b-0 xl:last:border-r-0 sm:[&:nth-child(2)]:border-r-0 xl:[&:nth-child(2)]:border-r"
          >
            <highlight.icon className="size-4 shrink-0" />
            <p className="text-sm font-medium text-[#f4e8c6]">
              {highlight.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid overflow-hidden rounded-lg border border-border/70 sm:grid-cols-2 xl:grid-cols-4">
        {compactFeatures.map((feature) => (
          <div
            key={feature.label}
            className="flex min-h-14 items-center gap-3 border-b border-border/55 bg-card px-4 py-3 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(4n)]:border-r-0 xl:[&:nth-last-child(-n+4)]:border-b-0"
          >
            <feature.icon className="size-3.5 shrink-0 text-[var(--bladevault-title)]" />
            <p className="text-sm text-foreground">{feature.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
