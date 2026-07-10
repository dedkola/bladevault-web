import type { MetadataRoute } from "next"

import { absoluteUrl, siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: siteConfig.screenshotPaths.map((path) => absoluteUrl(path)),
    },
  ]
}
