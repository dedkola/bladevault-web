import type { Metadata } from "next"

import { Hero } from "@/components/sections/hero"
import { VideoOverview } from "@/components/sections/video-overview"
import { Features } from "@/components/sections/features"
import { HowTo } from "@/components/sections/howto"
import { Compare } from "@/components/sections/compare"
import { Gallery } from "@/components/sections/gallery"
import { InstallCta } from "@/components/sections/install-cta"
import { PromoSidebar } from "@/components/site/promo-sidebar"
import { absoluteUrl, siteConfig } from "@/lib/site"

export const dynamic = "force-static"

const pageTitle = "Local-first, AI-ready knife collection manager | BladeVault"
const pageDescription =
  "Organize, compare, and talk to your knife collection with a local-first desktop app and MCP support for your preferred AI client."

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
        alt: "BladeVault preview card for a local-first, AI-ready knife collection manager",
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
        operatingSystem: "macOS, Windows",
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
      <main className="mx-auto w-full max-w-[1600px] px-4 py-4">
        <div className="grid min-w-0 gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <PromoSidebar />
          <div className="min-w-0 space-y-4">
            <Hero />
            <VideoOverview />
            <Features />
            <HowTo />
            <Compare />
            <Gallery />
            <InstallCta />
          </div>
        </div>
      </main>
    </>
  )
}
