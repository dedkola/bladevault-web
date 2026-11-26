type SiteNavigationLink = {
  href: string
  label: string
  sectionId?: string
}

export const siteNavigation: readonly SiteNavigationLink[] = [
  { href: "/#ai", label: "AI chat", sectionId: "ai" },
  { href: "/#wishlist", label: "Wishlist", sectionId: "wishlist" },
  { href: "/#import", label: "Import", sectionId: "import" },
  { href: "/#collection", label: "Collection", sectionId: "collection" },
  { href: "/#everywhere", label: "Everywhere", sectionId: "everywhere" },
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

export const siteLegalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const

export function releaseAnchor(version: string) {
  return `release-${version}`
}
