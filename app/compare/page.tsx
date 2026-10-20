import type { Metadata } from "next"

import { CompetitionPage } from "@/components/competition/competition-page"

export const dynamic = "force-static"

const pageTitle = "BladeVault vs. the alternatives"
const pageDescription =
  "An honest comparison of BladeVault with spreadsheets, generic inventory apps, and DIY databases for managing a knife collection."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/compare",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
}

export default function ComparePage() {
  return <CompetitionPage />
}
