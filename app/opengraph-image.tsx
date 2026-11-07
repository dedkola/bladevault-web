import { createSocialImageResponse } from "@/lib/seo-art"

export const runtime = "nodejs"

export const alt =
  "BladeVault auto scrape, AI access, and a local-first knife collection manager"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return createSocialImageResponse({
    eyebrow: "Auto scrape · AI access · v2.0",
    title: "Paste a link. Get a record.",
    description:
      "Import a knife from a product page, ask the vault through MCP, and keep it local on macOS or Windows, or self-host it for iPad and iPhone.",
    screenshotPath: "/screenshots/live/add-result-3x.jpg",
  })
}
