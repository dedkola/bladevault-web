import { createSocialImageResponse } from "@/lib/seo-art"

export const runtime = "nodejs"

export const alt =
  "BladeVault preview card for a local-first, AI-ready knife collection manager"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return createSocialImageResponse({
    eyebrow: "Local-first · MCP connected",
    title: "Talk to your blade collection",
    description:
      "Organize, compare, and explore your collection with Claude, Codex, or your preferred local AI.",
    screenshotPath: "/screenshots/dashboard.png",
  })
}
