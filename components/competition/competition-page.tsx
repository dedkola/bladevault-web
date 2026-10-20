import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Boxes,
  Check,
  Code2,
  Database,
  FileSpreadsheet,
  LockKeyhole,
  Scale,
  Sparkles,
  Wrench,
  X,
} from "lucide-react"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"
import { siteConfig } from "@/lib/site"

const comparisonRows = [
  {
    label: "Designed around knives",
    bladevault: "Yes — the vocabulary is already there",
    spreadsheet: "You create the columns",
    inventory: "Usually generic",
    diy: "You design the model",
  },
  {
    label: "Model families & variants",
    bladevault: "Native grouping with distinct records",
    spreadsheet: "Manual links or duplicated rows",
    inventory: "Depends on the app",
    diy: "Possible, if you build it",
  },
  {
    label: "Side-by-side comparison",
    bladevault: "Named lists with PDF export",
    spreadsheet: "Possible, but hand-built",
    inventory: "Varies",
    diy: "Possible, if you build it",
  },
  {
    label: "Maintenance history",
    bladevault: "Attached to each knife",
    spreadsheet: "Usually a notes column",
    inventory: "Often an adaptation",
    diy: "You own the workflow",
  },
  {
    label: "Where your records live",
    bladevault: "Local SQLite + images",
    spreadsheet: "A file you control",
    inventory: "Depends on the service",
    diy: "Wherever you host it",
  },
  {
    label: "AI / MCP access",
    bladevault: "Local read access through MCP",
    spreadsheet: "Not built in",
    inventory: "Depends on the app",
    diy: "You connect it yourself",
  },
] as const

const approaches = [
  {
    icon: FileSpreadsheet,
    eyebrow: "The blank canvas",
    title: "Spreadsheet",
    detail:
      "Best when your collection is small or you want total freedom over the columns.",
    tradeoff:
      "You become the product designer: views, relationships, care history, and comparisons are all yours to build.",
    tone: "bg-[#f6f1e5]",
  },
  {
    icon: Boxes,
    eyebrow: "The broad toolbox",
    title: "Generic inventory app",
    detail:
      "Best when knives are one category inside a much bigger asset list.",
    tradeoff:
      "The tradeoff for breadth is usually less room for model families, provenance, measurements, and collector-specific context.",
    tone: "bg-[#f2f2e9]",
  },
  {
    icon: Code2,
    eyebrow: "The custom build",
    title: "DIY database",
    detail:
      "Best when designing schemas and maintaining infrastructure is part of the hobby.",
    tradeoff:
      "You get exactly what you build—and inherit every screen, migration, backup, and maintenance decision.",
    tone: "bg-[#ecefe5]",
  },
  {
    icon: Sparkles,
    eyebrow: "The focused tool",
    title: "BladeVault",
    detail:
      "Best when you want a serious knife collection workflow ready on day one.",
    tradeoff:
      "It is intentionally focused: your knife vault, not every asset you own.",
    tone: "bg-[var(--bladevault-olive)] text-[#f4edcf]",
  },
] as const

function CheckMark({ muted = false }: { muted?: boolean }) {
  return muted ? (
    <X
      className="mt-0.5 size-4 shrink-0 text-muted-foreground/55"
      aria-hidden="true"
    />
  ) : (
    <Check
      className="mt-0.5 size-4 shrink-0 text-[var(--bladevault-title)]"
      aria-hidden="true"
    />
  )
}

export function CompetitionPage() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-[1600px] overflow-hidden px-4 pb-4 sm:px-6"
    >
      <section className="relative grid items-center gap-10 overflow-hidden py-12 sm:py-20 lg:min-h-[45rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)] lg:gap-[clamp(3rem,7vw,7rem)] lg:py-24">
        <div className="pointer-events-none absolute -top-48 -right-48 -z-10 size-[42rem] rounded-full border border-[var(--bladevault-gold)]/20 bg-[radial-gradient(circle_at_center,rgb(211_164_47/12%),transparent_66%)]" />
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-px bg-border/30" />

        <div>
          <p className="vault-label">
            A fair comparison · {siteConfig.releaseVersion}
          </p>
          <h1 className="mt-5 max-w-[11ch] text-[clamp(3.5rem,6.8vw,7.4rem)] leading-[0.88] font-semibold tracking-[-0.075em] text-balance text-foreground">
            There is no crowded lane.{" "}
            <span className="text-[var(--bladevault-title)]">
              That is the point.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            BladeVault is not trying to beat a dozen knife apps at their own
            game. It is a focused answer to a quieter problem: your collection
            deserves better than a pile of tabs, a heroic spreadsheet, or a
            generic inventory form.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.releasesUrl}
              className="vault-action vault-action-primary"
            >
              Download BladeVault
              <ArrowRight className="size-4" />
            </a>
            <Link href="/#capabilities" className="vault-action">
              See the capabilities
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-3 border-y border-border/65">
            {[
              ["0", "fake rivals named"],
              ["1", "focused vault"],
              ["∞", "ways to make it yours"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={
                  index
                    ? "border-l border-border/55 py-4 pr-2 pl-3 sm:pl-4"
                    : "py-4 pr-2"
                }
              >
                <strong className="block text-xl tracking-[-0.04em] text-foreground sm:text-2xl">
                  {value}
                </strong>
                <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="vault-shell overflow-hidden p-3 sm:p-4">
            <div className="flex items-center justify-between gap-4 border-b border-border/65 px-1 pb-3 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
              <span>Market map / honest edition</span>
              <span className="text-[var(--bladevault-title)]">
                4 approaches
              </span>
            </div>
            <div className="grid gap-2 pt-3 sm:grid-cols-2">
              {approaches.map(
                ({ icon: Icon, eyebrow, title, detail, tradeoff, tone }) => (
                  <article
                    key={title}
                    className={[
                      "flex min-h-56 flex-col rounded-lg border border-border/55 p-4",
                      tone,
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase opacity-70">
                        {eyebrow}
                      </span>
                      <Icon className="size-4 opacity-70" aria-hidden="true" />
                    </div>
                    <h2 className="mt-10 text-xl font-semibold tracking-[-0.035em]">
                      {title}
                    </h2>
                    <p className="mt-2 text-xs leading-5 opacity-75">
                      {detail}
                    </p>
                    <p className="mt-auto border-t border-current/15 pt-3 text-[11px] leading-5 opacity-70">
                      {tradeoff}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
          <p className="mt-3 text-right text-xs leading-5 text-muted-foreground">
            No grand claims. Just a clearer fit test.
          </p>
        </div>
      </section>

      <section className="border-y border-border/65 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div>
            <p className="vault-label">The useful difference</p>
            <h2 className="vault-section-title max-w-[11ch] text-[clamp(2.8rem,5vw,5.3rem)] leading-[0.94]">
              Less assembly. More collecting.
            </h2>
            <p className="vault-section-copy max-w-xl">
              A spreadsheet can record a knife. A generic inventory app can hold
              one. BladeVault is built around what happens after that: comparing
              close variants, filling missing specs, remembering maintenance,
              and understanding the shape of the whole vault.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: Scale,
                title: "Compare with context",
                body: "Keep multiple named comparison lists, line up the details, and export a landscape PDF when a decision needs to leave the app.",
              },
              {
                icon: Wrench,
                title: "Care belongs to the record",
                body: "Maintenance history stays with the knife instead of disappearing into a notes file or a memory you meant to write down.",
              },
              {
                icon: Database,
                title: "Keep the source close",
                body: "Save source URLs and captured product pages alongside the record, so provenance does not evaporate after the purchase.",
              },
              {
                icon: LockKeyhole,
                title: "Own the working data",
                body: "Local SQLite, images, backups, optional app lock, and local MCP access keep the vault under your control.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <article key={title} className="vault-panel p-5 sm:p-6">
                <span className="vault-icon-box">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-base font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col justify-between gap-5 border-b border-border/65 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="vault-label">Side-by-side, without the spin</p>
            <h2 className="vault-section-title">How the approaches differ</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-right">
            These are categories, not product reviews. Choose the shape of tool
            that matches how you actually want to keep your collection.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-border/70 bg-card">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of BladeVault with spreadsheet, generic inventory app,
              and DIY database approaches
            </caption>
            <thead>
              <tr className="border-b border-border/70 bg-muted/60">
                <th
                  scope="col"
                  className="w-[22%] p-4 font-medium text-muted-foreground"
                >
                  What matters
                </th>
                <th
                  scope="col"
                  className="w-[23%] border-x border-border/60 bg-[var(--bladevault-olive)] p-4 text-[#f4edcf]"
                >
                  <span className="block text-base font-semibold">
                    BladeVault
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-[0.08em] text-[#d6b75f] uppercase">
                    The focused tool
                  </span>
                </th>
                <th
                  scope="col"
                  className="w-[18%] p-4 font-semibold text-foreground"
                >
                  Spreadsheet
                </th>
                <th
                  scope="col"
                  className="w-[18%] p-4 font-semibold text-foreground"
                >
                  Generic app
                </th>
                <th
                  scope="col"
                  className="w-[19%] p-4 font-semibold text-foreground"
                >
                  DIY database
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="p-4 align-top font-medium text-foreground"
                  >
                    {row.label}
                  </th>
                  <td className="border-x border-border/60 bg-accent/45 p-4 align-top font-medium text-[var(--bladevault-olive)] dark:text-[var(--bladevault-gold)]">
                    <span className="flex gap-2">
                      <CheckMark />
                      {row.bladevault}
                    </span>
                  </td>
                  <td className="p-4 align-top text-muted-foreground">
                    {row.spreadsheet}
                  </td>
                  <td className="p-4 align-top text-muted-foreground">
                    {row.inventory}
                  </td>
                  <td className="p-4 align-top text-muted-foreground">
                    {row.diy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          “Depends” is doing honest work here. Other tools may support a
          feature; the difference is whether the workflow is already shaped
          around your collection.
        </p>
      </section>

      <section className="vault-shell grid overflow-hidden lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
        <div className="p-6 sm:p-9 lg:p-12">
          <p className="vault-label">The short version</p>
          <h2 className="mt-4 max-w-[12ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.94] font-semibold tracking-[-0.065em] text-balance text-foreground">
            If you want a vault, start here.
          </h2>
          <div className="mt-8 space-y-4">
            {[
              "You care about the difference between two close variants.",
              "You want care, provenance, and notes next to the object they describe.",
              "You would rather own the data than rent access to your collection.",
              "You want a tool that is specific enough to be useful, and open enough to inspect.",
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
              >
                <Check
                  className="mt-1 size-4 shrink-0 text-[var(--bladevault-title)]"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.releasesUrl}
              className="vault-action vault-action-primary"
            >
              Get the latest release
              <ArrowRight className="size-4" />
            </a>
            <a href={siteConfig.githubUrl} className="vault-action">
              Read the source
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-border/65 bg-muted/35 p-3 sm:p-5 lg:border-t-0 lg:border-l">
          <div className="vault-window h-full">
            <div className="vault-window-bar">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
                <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
                <span className="size-2 rounded-full border border-border bg-card" />
              </div>
              <span className="vault-label">Collection / Compare</span>
            </div>
            <ScreenshotLightbox
              src="/screenshots/compare.png"
              alt="BladeVault comparison table with knife specifications aligned side by side"
              title="BladeVault comparison view"
              className="block"
            >
              <Image
                src="/screenshots/compare.png"
                width={1440}
                height={900}
                alt="BladeVault comparison table with knife specifications aligned side by side"
                className="h-auto w-full"
              />
            </ScreenshotLightbox>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-2 py-16 text-center sm:py-20">
        <p className="vault-label">One last honest note</p>
        <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-balance text-foreground">
          You may not need BladeVault yet.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
          If a notes file or spreadsheet already gives you what you need, keep
          it. BladeVault is for the moment when the collection becomes a system
          worth caring for—and you want that system to stay yours.
        </p>
        <Link
          href="/#install"
          className="vault-action vault-action-primary mt-8"
        >
          Choose your setup
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  )
}
