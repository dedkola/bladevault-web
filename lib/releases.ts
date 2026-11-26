import releaseData from "@/data/releases.json"

// Release notes live in data/releases.json, newest first.
// The "Sync BladeVault releases" GitHub Action adds new entries from
// https://github.com/dedkola/bladevault/releases — edit the JSON to polish copy.
//
// Add `announcement` (homepage bar) and `highlights` (hero chips, at most
// three) by hand to a release worth featuring. Patch releases without them
// leave the last featured release on the homepage.
export type ReleaseAnnouncement = {
  title: string
  body: string
}

export type Release = {
  version: string
  date: string
  changes: string[]
  major?: boolean
  milestone?: boolean
  announcement?: ReleaseAnnouncement
  highlights?: string[]
}

export const releases: readonly Release[] = releaseData

export const latestRelease = releases[0]

/** The newest release with homepage copy, shown in the bar and hero chips. */
export const featuredRelease: Release | undefined = releases.find(
  (release) => release.announcement
)

/** "v2.6.0" → "2.6", "v2.5.21" → "2.5.21": how the site names a release. */
export function shortVersion(version: string) {
  return version.replace(/^v/, "").replace(/\.0$/, "")
}
