import { createSocialImageResponse } from "@/lib/seo-art"

export const runtime = "nodejs"

export const alt =
  "BladeVault Studio, Collection pulse, and a customizable local-first knife collection manager"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return createSocialImageResponse({
    eyebrow: "Studio · Collection pulse · v2.0",
    title: "See the whole vault.",
    description:
      "Browse a visual library, read collection patterns, and shape a workspace that fits. Local-first, no account.",
    screenshotPath: "/screenshots/studio.jpg",
  })
}
