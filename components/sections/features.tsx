import {
  Cloud,
  LayoutDashboard,
  Library,
  Search,
  PencilLine,
  Columns3,
  Link2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Command View",
    description:
      "Open into a structured overview with totals, latest additions, and a quiet layout that makes browsing feel fast.",
  },
  {
    icon: Library,
    title: "Collection Library",
    description:
      "Browse the full vault with sidebar-driven context, filters, pinned items, and room to breathe around every card.",
  },
  {
    icon: Search,
    title: "Rich Detail Focus",
    description:
      "Keep specs, descriptions, and image review in one place without turning the detail view into a wall of noise.",
  },
  {
    icon: PencilLine,
    title: "Inline Editing",
    description:
      "Tune fields directly inside the workspace instead of bouncing between isolated edit screens.",
  },
  {
    icon: Columns3,
    title: "Comparison Board",
    description:
      "Put multiple entries on the table at once to spot differences in steel, dimensions, hardware, and finish.",
  },
  {
    icon: Cloud,
    title: "Local with Backup Options",
    description:
      "Stay local-first by default, then layer in cloud backup only when it actually serves your workflow.",
  },
  {
    icon: Link2,
    title: "Quick Add from URLs",
    description:
      "Drop in a product link and let BladeVault pull in the details that would otherwise cost you manual entry time.",
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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="rounded-[1.5rem] border border-border/70 bg-card/95 py-0 shadow-[var(--panel-shadow)]"
          >
            <CardContent className="flex h-full flex-col gap-4 p-5 sm:p-6">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-[var(--bladevault-title)]">
                <feature.icon className="size-5" />
              </div>
              <div>
                <h3 className="mt-2 text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
