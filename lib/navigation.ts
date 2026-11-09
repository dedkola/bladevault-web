type SiteNavigationLink = {
  href: string
  label: string
  sectionId?: string
}

export const siteNavigation: readonly SiteNavigationLink[] = [
  { href: "/#import", label: "Import", sectionId: "import" },
  { href: "/#devices", label: "Devices", sectionId: "devices" },
  { href: "/#ai", label: "AI", sectionId: "ai" },
  { href: "/#themes", label: "Themes", sectionId: "themes" },
  { href: "/#features", label: "Features", sectionId: "features" },
  { href: "/compare", label: "Compare" },
  { href: "/docs", label: "Docs" },
  { href: "/tutorials", label: "Tutorials" },
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
