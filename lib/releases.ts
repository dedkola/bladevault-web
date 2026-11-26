import releaseData from "@/data/releases.json"

// Release notes live in data/releases.json, newest first.
// The "Sync BladeVault releases" GitHub Action adds new entries from
// https://github.com/dedkola/bladevault/releases — edit the JSON to polish copy.
//
// Add `announcement` and `highlights` by hand to a release worth featuring.
// The first highlight is the one release line in the homepage hero. Patch
// releases without them leave the last featured release on the homepage.
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

/** The newest release with homepage copy, shown in the hero release line. */
export const featuredRelease: Release | undefined = releases.find(
  (release) => release.announcement
)

/** "v2.6.0" → "2.6", "v2.5.21" → "2.5.21": how the site names a release. */
export function shortVersion(version: string) {
  return version.replace(/^v/, "").replace(/\.0$/, "")
}

export type ChangeKind = "new" | "improved" | "fixed"

export type ReleaseChange = {
  text: string
  kind: ChangeKind
}

// Work on the repo itself (CI, agent notes, tests, READMEs) is real, but it
// tells a collector nothing. The GitHub release keeps the full list.
const internalChange =
  /\bCI\b|CLAUDE\.md|AGENTS\.md|\.codex\b|\bREADMEs?\b|\btests?\b|dependency updates/i

// The release sync sometimes leaves a GitHub label such as (`enhancement`).
const labelSuffix = /\s*\(`[\w-]+`\)\s*$/

const fixedChange =
  /^(Fix|Fixes|Fixed|Stop|Stops)\b|\bno longer\b|\bcorrectly\b|\bbugs?\b|\bcrash/i

// "now" describes a change to something that already existed.
const improvedChange = /\bnow\b/i

const newChange =
  /^(Add|Adds|New|Ask|Track|Introduce|Choose|Pick|Filter|Check|Search|See|Set|Use)\b|\bnew\b|\bcan\b/i

function changeKind(text: string): ChangeKind {
  if (fixedChange.test(text)) return "fixed"
  if (improvedChange.test(text)) return "improved"
  if (newChange.test(text)) return "new"
  return "improved"
}

/** The changes worth showing on the site, each tagged New, Improved or Fixed. */
export function publicChanges(release: Release): ReleaseChange[] {
  return release.changes
    .filter((change) => !internalChange.test(change))
    .map((change) => {
      const text = change.replace(labelSuffix, "")
      return { text, kind: changeKind(text) }
    })
}

/** Releases with at least one change worth showing, newest first. */
export const publicReleases: readonly Release[] = releases.filter(
  (release) => publicChanges(release).length > 0
)
