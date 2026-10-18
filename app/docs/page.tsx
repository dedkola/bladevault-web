import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsPageView } from "@/components/docs/docs-page-view"
import { getDocsPage } from "@/lib/docs"

export const dynamic = "force-static"

const ROOT_ROUTE = "/docs"
const TITLE = "BladeVault documentation"
const DESCRIPTION =
  "BladeVault documentation: installation, feature guides, and reference for the local-first knife collection manager."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: getDocsPage(ROOT_ROUTE)?.description || DESCRIPTION,
  alternates: {
    canonical: ROOT_ROUTE,
  },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: ROOT_ROUTE,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function DocsIndexPage() {
  const page = getDocsPage(ROOT_ROUTE)
  if (!page) notFound()

  return <DocsPageView page={page} />
}
