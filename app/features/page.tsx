import type { Metadata } from "next"

import { FeatureCard } from "@/components/features/feature-card"
import hero from "@/components/sections/homepage-hero.module.css"
import base from "@/components/sections/homepage-v3.module.css"
import { features } from "@/lib/features"

import styles from "./features.module.css"

export const dynamic = "force-static"

const pageTitle = "What BladeVault does for you"
const pageDescription =
  "Seven BladeVault features: Chat that answers questions about your collection, plus six that run in the background: a Wishlist grouped by deal, Price Drops across stores, an AI supervisor for price monitoring, one Inbox for alerts, care reminders on the Maintenance page, and achievements."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/features" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/features",
  },
  twitter: { title: pageTitle, description: pageDescription },
}

export default function FeaturesPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6">
      <section className={`vault-shell ${base.homepage} ${styles.shell}`}>
        <header className={styles.indexHead}>
          <p className={base.eyebrow}>
            <span className={base.eyebrowDot} aria-hidden="true" />
            Features
          </p>
          <h1>Seven things BladeVault does for you</h1>
          <p>
            Ask your vault anything in Chat. Then BladeVault keeps watching
            after you add a knife: prices across stores, deals on your Wishlist,
            care that is coming due, and the badges your collection earns. Pick
            one for a tour.
          </p>
        </header>
        <ul className={`${hero.cards} ${styles.indexCards}`}>
          {features.map((feature) => (
            <li key={feature.slug}>
              <FeatureCard feature={feature} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
