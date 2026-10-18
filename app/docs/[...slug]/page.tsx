import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsPageView } from "@/components/docs/docs-page-view"
import { getDocsNav, getDocsPage } from "@/lib/docs"

export const dynamic = "force-static"
export const dynamicParams = false

type DocsPageProps = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return getDocsNav()
    .pages.filter((page) => page.route !== "/docs")
    .map((page) => ({ slug: page.route.replace(/^\/docs\//, "").split("/") }))
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getDocsPage(`/docs/${slug.join("/")}`)
  if (!page) return {}

  const title = `${page.title} | BladeVault documentation`

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.route,
    },
    openGraph: {
      type: "article",
      title,
      description: page.description,
      url: page.route,
    },
    twitter: {
      title,
      description: page.description,
    },
  }
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params
  const page = getDocsPage(`/docs/${slug.join("/")}`)
  if (!page) notFound()

  return <DocsPageView page={page} />
}
