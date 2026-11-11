"use client"

import type { ImageLoaderProps } from "next/image"

/**
 * `next/image` loader for Cloudflare Image Transformations.
 * Static export can't run the built-in optimizer, so images are resized at the edge through
 * `/cdn-cgi/image/…` on the same zone (Images → Transformations must be enabled for it).
 * `next dev` and `wrangler dev` have no `/cdn-cgi/image` endpoint, so dev builds and local
 * previews (`pnpm preview`, which sets NEXT_PUBLIC_CF_IMAGE_TRANSFORMS=off) serve the original file.
 *
 * Docs: https://developers.cloudflare.com/images/transform-images/transform-via-url/
 */
const transformsEnabled =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_CF_IMAGE_TRANSFORMS !== "off"

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!transformsEnabled || src.endsWith(".svg")) {
    return src
  }

  const params = [`width=${width}`, `quality=${quality ?? 75}`, "format=auto"]
  const source = src.startsWith("/") ? src.slice(1) : src

  return `/cdn-cgi/image/${params.join(",")}/${source}`
}
