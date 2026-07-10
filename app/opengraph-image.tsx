import { createSocialImageResponse } from "@/lib/seo-art"

export const runtime = "nodejs"

export const alt =
  "BladeVault preview card for a local-first desktop knife collection manager"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return createSocialImageResponse({
    eyebrow: "Local-first desktop app",
    title: "Home for your blade collection",
    description:
      "Organize, compare, and review your knife collection with a desktop app built for serious collectors.",
    screenshotPath: "/screenshots/dashboard.png",
  })
}
