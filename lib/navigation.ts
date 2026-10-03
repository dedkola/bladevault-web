type SiteNavigationLink = {
  href: string
  label: string
  sectionId?: string
}

export const siteNavigation: readonly SiteNavigationLink[] = [
  { href: "/#workflow", label: "Workflow", sectionId: "workflow" },
  { href: "/#capabilities", label: "Capabilities", sectionId: "capabilities" },
  { href: "/#local-first", label: "Local-first", sectionId: "local-first" },
  { href: "/#install", label: "Install", sectionId: "install" },
  { href: "/whats-new", label: "What’s new" },
]

export const homepageSectionIds = [
  "overview",
  ...siteNavigation.flatMap((link) => (link.sectionId ? [link.sectionId] : [])),
]

export const siteUtilityLinks = [
  { href: "mailto:support@bladevault.pro", label: "Support" },
  { href: "https://github.com/dedkola/bladevault", label: "GitHub" },
] as const

export function releaseAnchor(version: string) {
  return `release-${version}`
}
