import type { Metadata } from "next"

import { TutorialsPage } from "@/components/tutorials/tutorials-page"
import {
  tutorialPlaylistUrl,
  videoTutorials,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/video-tutorials"

export const dynamic = "force-static"

const pageTitle = "Video tutorials"
const pageDescription =
  "Watch BladeVault setup and collection-management tutorials, from your first knife to Smart Collections, backups, insights, and maintenance."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/tutorials",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/tutorials",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
}

export default function VideoTutorialsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BladeVault video tutorials",
    description: pageDescription,
    url: tutorialPlaylistUrl,
    numberOfItems: videoTutorials.length,
    itemListElement: videoTutorials.map((tutorial, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: tutorial.title,
        description: tutorial.description,
        thumbnailUrl: youtubeThumbnailUrl(tutorial.id),
        embedUrl: youtubeEmbedUrl(tutorial.id),
        url: youtubeWatchUrl(tutorial.id),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TutorialsPage />
    </>
  )
}
