#!/usr/bin/env node
// Adds BladeVault GitHub releases that are missing from data/releases.json.
// Existing entries are never touched, so hand-edited copy is safe.
//
// Usage: node scripts/sync-releases.mjs [--tag v2.2.1] [--dry-run]
// Env:   GITHUB_TOKEN (optional, raises the API rate limit)
//        RELEASES_REPO (default dedkola/bladevault)

import { readFile, writeFile } from "node:fs/promises"
import { appendFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const DATA_FILE = fileURLToPath(
  new URL("../data/releases.json", import.meta.url)
)
const REPO = process.env.RELEASES_REPO || "dedkola/bladevault"

// Conventional-commit types that are not interesting to app users.
const HIDDEN_TYPES = new Set([
  "build",
  "chore",
  "ci",
  "deps",
  "docs",
  "style",
  "test",
])
// Scopes for internal tooling, hidden even on feat/fix entries.
const HIDDEN_SCOPES = new Set([
  "ci",
  "deps",
  "deps-dev",
  "docker",
  "release",
  "smoke",
])
const FALLBACK_CHANGE =
  "Maintenance release with build and reliability updates."

const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const tagIndex = args.indexOf("--tag")
const onlyTag =
  tagIndex >= 0 ? args[tagIndex + 1] : process.env.RELEASE_TAG || ""

async function github(path) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "bladevault-web-release-sync",
  }
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    headers,
  })
  if (!res.ok)
    throw new Error(
      `GitHub API ${path} failed: ${res.status} ${await res.text()}`
    )
  return res.json()
}

async function fetchReleases() {
  if (onlyTag)
    return [await github(`/releases/tags/${encodeURIComponent(onlyTag)}`)]
  const all = []
  for (let page = 1; page <= 5; page++) {
    const batch = await github(`/releases?per_page=100&page=${page}`)
    all.push(...batch)
    if (batch.length < 100) break
  }
  return all
}

function sentence(text) {
  const t = text.trim().replace(/\s+/g, " ")
  if (!t) return ""
  const s = t[0].toUpperCase() + t.slice(1)
  return /[.!?]$/.test(s) ? s : `${s}.`
}

// Turns one release-notes line into a readable change, or null to skip it.
function toChange(line) {
  let text = line
    .replace(/^\s*[-*+]\s+/, "")
    // Leading PR or commit link: [#408](...) or [8eaaf1c](...)
    .replace(/^\[[^\]]+\]\([^)]+\)\s*/, "")
    // Trailing "by @user in https://..." from GitHub's generated notes
    .replace(/\s+by @\S+(\s+in\s+\S+)?\s*$/, "")
    // Remaining markdown links -> their text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Trailing "(#35)" / "(1273d05)" references
    .replace(/(\s*\((#\d+|[0-9a-f]{7,40})\))+\s*\.?$/i, "")
    .trim()

  if (
    !text ||
    /^(revert|merge|bump)\b/i.test(text) ||
    /full changelog/i.test(text) ||
    /made their first contribution/i.test(text)
  ) {
    return null
  }

  const conventional = text.match(/^(\w+)(?:\(([^)]*)\))?(!)?:\s*(.+)$/)
  if (conventional) {
    const [, type, scope = "", , description] = conventional
    if (HIDDEN_TYPES.has(type.toLowerCase())) return null
    if (scope.split(",").some((s) => HIDDEN_SCOPES.has(s.trim().toLowerCase())))
      return null
    text = description
  }
  return sentence(text)
}

function changesFromBody(body = "") {
  const lines = body.replace(/\r/g, "").split("\n")
  const bullets = lines.filter((l) => /^\s*[-*+]\s+/.test(l))
  let changes
  if (bullets.length > 0) {
    changes = bullets.map(toChange)
  } else {
    // Hand-written notes without bullets: use each paragraph.
    changes = body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith("#") && !/^full changelog/i.test(p))
      .map((p) => sentence(p.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")))
  }
  changes = [...new Set(changes.filter(Boolean))]
  return changes.length > 0 ? changes : [FALLBACK_CHANGE]
}

function compareVersions(a, b) {
  const pa = a
    .replace(/^v/, "")
    .split(/[.-]/)
    .map((n) => Number.parseInt(n, 10) || 0)
  const pb = b
    .replace(/^v/, "")
    .split(/[.-]/)
    .map((n) => Number.parseInt(n, 10) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (d !== 0) return d
  }
  return 0
}

const existing = JSON.parse(await readFile(DATA_FILE, "utf8"))
const known = new Set(existing.map((r) => r.version))

// Only releases newer than the newest entry on the page are added, so older
// releases that were left out on purpose stay out. --tag skips this check.
const newest = existing.reduce(
  (max, r) => (compareVersions(r.version, max) > 0 ? r.version : max),
  "v0.0.0"
)

const added = (await fetchReleases())
  .filter((r) => !r.draft && !r.prerelease && !known.has(r.tag_name))
  .filter((r) => onlyTag || compareVersions(r.tag_name, newest) > 0)
  .map((r) => {
    const version = r.tag_name
    const entry = {
      version,
      date: (r.published_at || r.created_at).slice(0, 10),
      changes: changesFromBody(r.body),
    }
    // A new x.0.0 release gets the "Major update" chip.
    if (/^v?\d+\.0\.0$/.test(version)) entry.major = true
    return entry
  })

if (added.length === 0) {
  console.log("No new releases.")
} else {
  const merged = [...existing, ...added].sort(
    (a, b) =>
      b.date.localeCompare(a.date) || compareVersions(b.version, a.version)
  )
  console.log(`Adding ${added.map((r) => r.version).join(", ")}`)
  for (const r of added)
    console.log(`\n${r.version} (${r.date})\n  - ${r.changes.join("\n  - ")}`)
  if (!dryRun)
    await writeFile(DATA_FILE, `${JSON.stringify(merged, null, 2)}\n`)
}

if (process.env.GITHUB_OUTPUT) {
  const versions = added.map((r) => r.version).join(", ")
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `added=${versions}\nlatest=${added[0]?.version ?? ""}\n`
  )
}
