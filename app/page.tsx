import type { Metadata } from "next"

import { HomepageAi } from "@/components/sections/homepage-ai"
import { HomepageBackup } from "@/components/sections/homepage-backup"
import { HomepageCare } from "@/components/sections/homepage-care"
import { HomepageDevices } from "@/components/sections/homepage-devices"
import { HomepageFeatures } from "@/components/sections/homepage-features"
import { HomepageHero } from "@/components/sections/homepage-hero"
import { HomepageImport } from "@/components/sections/homepage-import"
import { HomepageJournal } from "@/components/sections/homepage-journal"
import { HomepageThemes } from "@/components/sections/homepage-themes"
import { HomepageWishlist } from "@/components/sections/homepage-wishlist"
import { InstallCta } from "@/components/sections/install-cta"
import styles from "@/components/sections/homepage-v3.module.css"
import { absoluteUrl, siteConfig } from "@/lib/site"

export const dynamic = "force-static"

const pageTitle =
  "AI Chat, Wishlist deals, Price Drops, care reminders, and a local-first knife vault | BladeVault"
const pageDescription =
  "Ask BladeVault about your knives, prices, and care in the new AI Chat, with answers built from your own records. Paste a product URL and let BladeVault fill the record. See which knives on your Wishlist are on sale with price vs regular, a 90-day range and a 30-day trend, watch store prices and restocks with Price Drops and an optional AI supervisor, get alerts in one Inbox, keep dated notes, care reminders, and history for every knife, back up to your own Google Drive, connect Claude or Codex through MCP to add knives with photos, and run it on macOS, Windows, or Linux, or self-host it for iPad and iPhone."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/opengraph-image",
        alt: "BladeVault preview card for AI Chat, automatic product-page scraping, and a local-first knife collection manager",
      },
    ],
  },
}

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: siteConfig.name,
        description: pageDescription,
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organization`,
        name: siteConfig.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon-512.png"),
        sameAs: [siteConfig.githubUrl],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl("/")}#software`,
        name: siteConfig.name,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "macOS, Windows, Linux",
        url: absoluteUrl("/"),
        image: absoluteUrl("/opengraph-image"),
        screenshot: siteConfig.screenshotPaths.map((path) => absoluteUrl(path)),
        description: pageDescription,
        isAccessibleForFree: true,
        downloadUrl: siteConfig.releasesUrl,
        featureList: siteConfig.featureList,
        author: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main
        id="main"
        className="mx-auto w-full max-w-[1600px] overflow-hidden px-4 pb-4 sm:px-6"
      >
        <div className={styles.homepage}>
          <HomepageHero />
          <HomepageBackup />
          <HomepageWishlist />
          <HomepageImport />
          <HomepageDevices />
          <HomepageAi />
          <HomepageJournal />
          <HomepageCare />
          <HomepageThemes />
          <HomepageFeatures />
          <div className={styles.installWrap}>
            <InstallCta />
          </div>
        </div>
      </main>
    </>
  )
}
