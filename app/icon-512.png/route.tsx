import { createIconResponse } from "@/lib/seo-art"

export const dynamic = "force-static"

export function GET() {
  return createIconResponse(512)
}
