import { createSocialImageResponse } from "@/lib/seo-art"

export const dynamic = "force-static"

export const alt =
  "BladeVault AI Chat, auto scrape, and a local-first knife collection manager"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return createSocialImageResponse({
    eyebrow: "AI Chat · Auto scrape · Price Drops",
    title: "Ask your vault anything.",
    description:
      "Chat with your own knife collection, paste a link to get a record, and watch store prices, all kept local on macOS, Windows, or Linux, or self-hosted for iPad and iPhone.",
    screenshotPath: "/screenshots/live/add-result-3x.jpg",
  })
}
