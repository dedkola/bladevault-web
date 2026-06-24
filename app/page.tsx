import { Hero } from "@/components/sections/hero"
import { TechStrip } from "@/components/sections/tech-strip"
import { Features } from "@/components/sections/features"
import { HowTo } from "@/components/sections/howto"
import { Compare } from "@/components/sections/compare"
import { Gallery } from "@/components/sections/gallery"
import { InstallCta } from "@/components/sections/install-cta"

export const dynamic = "force-static"

export default function Page() {
  return (
    <main>
      <Hero />
      <TechStrip />
      <Features />
      <HowTo />
      <Compare />
      <Gallery />
      <InstallCta />
    </main>
  )
}