import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { HowTo } from "@/components/sections/howto"
import { Compare } from "@/components/sections/compare"
import { Gallery } from "@/components/sections/gallery"
import { InstallCta } from "@/components/sections/install-cta"
import { PromoSidebar } from "@/components/site/promo-sidebar"

export const dynamic = "force-static"

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-4 lg:px-6 lg:py-6">
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <PromoSidebar />
        <div className="space-y-4 lg:space-y-6">
          <Hero />
          <Features />
          <HowTo />
          <Compare />
          <Gallery />
          <InstallCta />
        </div>
      </div>
    </main>
  )
}
