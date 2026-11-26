type SiteNavigationLink = {
  href: string
  label: string
  sectionId?: string
}

// Five destinations: three homepage sections and two pages. Everything else
// lives in the footer, so the header never reads like a table of contents.
export const siteNavigation: readonly SiteNavigationLink[] = [
  { href: "/#features", label: "Features", sectionId: "features" },
  { href: "/#wishlist", label: "Price tracking", sectionId: "wishlist" },
  { href: "/#ai", label: "AI and MCP", sectionId: "ai" },
  { href: "/docs", label: "Docs" },
  { href: "/whats-new", label: "What’s new" },
]

export const homepageSectionIds = [
  "overview",
  ...siteNavigation.flatMap((link) => (link.sectionId ? [link.sectionId] : [])),
]

/** Secondary pages shown in the footer. */
export const siteFooterLinks = [
  { href: "/compare", label: "Compare" },
  { href: "/tutorials", label: "Tutorials" },
] as const

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
