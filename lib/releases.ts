import releaseData from "@/data/releases.json"

// Release notes live in data/releases.json, newest first.
// The "Sync BladeVault releases" GitHub Action adds new entries from
// https://github.com/dedkola/bladevault/releases — edit the JSON to polish copy.
export type Release = {
  version: string
  date: string
  changes: string[]
  major?: boolean
  milestone?: boolean
}

export const releases: readonly Release[] = releaseData

export const latestRelease = releases[0]
