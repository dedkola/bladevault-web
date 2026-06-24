import {
  LayoutDashboard,
  Library,
  Image,
  PencilLine,
  Columns3,
  Link2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Get a quick overview of your recently added knives.",
  },
  {
    icon: Library,
    title: "Collection Library",
    description:
      "Browse your complete inventory with brand filters and sorting controls.",
  },
  {
    icon: Image,
    title: "Knife Detail",
    description:
      "View specifications, descriptions, and a full image gallery with lightbox navigation.",
  },
  {
    icon: PencilLine,
    title: "Inline Editing",
    description: "Update any knife's details directly from the detail page.",
  },
  {
    icon: Columns3,
    title: "Comparison Tool",
    description: "Select up to 3 knives and compare specs side-by-side.",
  },
  {
    icon: Link2,
    title: "Smart URL Scraping",
    description:
      "Paste a product URL and BladeVault auto-fetches title, brand, images, steel, and specs.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
          Everything you need to manage a knife collection.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/60 shadow-none">
              <CardContent className="flex flex-col gap-3">
                <feature.icon className="size-5 text-muted-foreground" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
