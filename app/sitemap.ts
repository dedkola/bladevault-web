import type { MetadataRoute } from "next"

import { absoluteUrl, absoluteVideoUrl, siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
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
  ]
}
