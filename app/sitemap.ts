import type { MetadataRoute } from "next"

import { getDocsNav } from "@/lib/docs"
import { absoluteUrl, absoluteVideoUrl, siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getDocsNav()
  const docsLastModified = new Date(docs.generatedAt)

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: siteConfig.screenshotPaths.map((path) => absoluteUrl(path)),
      videos: siteConfig.videoEntries.map((video) => ({
        title: video.title,
        description: video.description,
        thumbnail_loc: absoluteUrl(video.thumbnailPath),
        content_loc: absoluteVideoUrl(video.path),
      })),
    },
    {
      url: absoluteUrl("/whats-new"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/tutorials"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...docs.pages.map((page) => ({
      url: absoluteUrl(page.route),
      lastModified: docsLastModified,
      changeFrequency: "weekly" as const,
      priority: page.route === "/docs" ? 0.8 : 0.6,
    })),
  ]
}
