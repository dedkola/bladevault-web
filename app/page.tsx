import type { Metadata } from "next"

import { Hero } from "@/components/sections/hero"
import { V2Showcase } from "@/components/sections/v2-showcase"
import { WorkspaceFit } from "@/components/sections/workspace-fit"
import { CapabilityMosaic } from "@/components/sections/capability-mosaic"
import { WorkflowBand } from "@/components/sections/workflow-band"
import { ReleaseLedger } from "@/components/sections/release-ledger"
import { LocalFirst } from "@/components/sections/local-first"
import { GuideStrip } from "@/components/sections/guide-strip"
import { InstallCta } from "@/components/sections/install-cta"
import { absoluteUrl, siteConfig } from "@/lib/site"

export const dynamic = "force-static"

const pageTitle =
  "Studio, Collection pulse, and local-first knife collection management | BladeVault"
const pageDescription =
  "Browse the vault in Studio, read Collection pulse, shape a customizable workspace, compare knives, and keep every record in a private local-first collection manager."

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
        alt: "BladeVault preview card for Studio, Collection pulse, and a local-first knife collection manager",
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
      <main
        id="main"
        className="mx-auto w-full max-w-[1600px] overflow-hidden px-4 pb-4 sm:px-6"
      >
        <Hero />
        <V2Showcase />
        <WorkspaceFit />
        <CapabilityMosaic />
        <WorkflowBand />
        <ReleaseLedger />
        <LocalFirst />
        <GuideStrip />
        <div className="mt-4">
          <InstallCta />
        </div>
      </main>
    </>
  )
}
