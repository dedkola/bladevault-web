import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, Download, ScrollText } from "lucide-react"

import { FeatureCard } from "@/components/features/feature-card"
import { FeatureTour } from "@/components/features/feature-tour"
import hero from "@/components/sections/homepage-hero.module.css"
import base from "@/components/sections/homepage-v3.module.css"
import {
  featureHref,
  featureReleaseHref,
  features,
  getFeature,
} from "@/lib/features"
import { siteConfig } from "@/lib/site"

import styles from "../features.module.css"

export const dynamic = "force-static"
export const dynamicParams = false

type FeaturePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return features.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params
  const feature = getFeature(slug)
  if (!feature) return {}

  const title = `${feature.title}: ${feature.promise}`
  const url = featureHref(feature.slug)

  return {
    title,
    description: feature.intro,
    alternates: { canonical: url },
    openGraph: { title, description: feature.intro, url },
    twitter: { title, description: feature.intro },
  }
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params
  const feature = getFeature(slug)
  if (!feature) notFound()

  const others = features.filter((item) => item.slug !== feature.slug)

  return (
    <main id="main" className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6">
      <article className={`vault-shell ${styles.shell}`}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/features">
            <ArrowLeft aria-hidden="true" />
            Background features
          </Link>
        </nav>

        <FeatureTour slug={feature.slug} titleAs="h1" />

        <div className={styles.actions}>
          <a href={siteConfig.releasesUrl} className={styles.primary}>
            <Download aria-hidden="true" />
            Download BladeVault
          </a>
          {feature.docsHref && (
            <Link href={feature.docsHref} className={styles.secondary}>
              <BookOpen aria-hidden="true" />
              Read the guide
            </Link>
          )}
          <Link href={featureReleaseHref(feature)} className={styles.secondary}>
            <ScrollText aria-hidden="true" />
            Release notes for {feature.since}
          </Link>
        </div>
      </article>

      <section
        className={`${base.homepage} ${styles.more}`}
        aria-labelledby="more-features"
      >
        <h2 id="more-features">More running in the background</h2>
        <ul className={`${hero.cards} ${styles.moreCards}`}>
          {others.map((item) => (
            <li key={item.slug}>
              <FeatureCard feature={item} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
