import { Check, Search, Wrench } from "lucide-react"
import type { ReactNode } from "react"

function KnifeIllustration({
  handle = "#30351b",
  blade = "#c8c6bd",
}: {
  handle?: string
  blade?: string
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 42"
      className="h-auto w-full max-w-36 -rotate-3"
    >
      <defs>
        <linearGradient id={`blade-${handle.slice(1)}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fafaf7" />
          <stop offset="1" stopColor={blade} />
        </linearGradient>
      </defs>
      <path
        d="M4 22 28 8h87l-8 25H28Z"
        fill={`url(#blade-${handle.slice(1)})`}
      />
      <path d="M105 8h65q8 0 8 8v10q0 8-8 8h-65Z" fill={handle} />
      <circle cx="124" cy="21" r="5" fill="#d3a42f" />
      <circle cx="124" cy="21" r="2.4" fill="#4d4a3c" />
    </svg>
  )
}

function StoryCopy({
  index,
  eyebrow,
  title,
  body,
  points,
  className = "",
}: {
  index: string
  eyebrow: string
  title: string
  body: string
  points: string[]
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.11em] text-[var(--bladevault-title)] uppercase">
        <span>
          {index} · {eyebrow}
        </span>
        <span className="h-px w-14 bg-[var(--bladevault-gold)]" />
      </div>
      <h2 className="mt-5 max-w-[10ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.96] font-semibold tracking-[-0.06em] text-balance text-foreground">
        {title}
      </h2>
      <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
        {body}
      </p>
      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li
            key={point}
            className="flex max-w-xl items-start gap-3 text-sm leading-6 text-muted-foreground"
          >
            <Check className="mt-1 size-3.5 shrink-0 text-[var(--bladevault-title)]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DemoWindow({
  label,
  status,
  children,
  className = "",
}: {
  label: string
  status: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`vault-grid overflow-hidden rounded-xl border border-[var(--bladevault-line)]/75 bg-[#f8f4e9]/65 shadow-[0_18px_55px_rgb(46_52_23/9%)] ${className}`}
    >
      <div className="flex min-h-11 items-center justify-between gap-4 border-b border-[var(--bladevault-line)]/55 px-4 font-mono text-[9px] tracking-[0.09em] text-muted-foreground uppercase">
        <span>{label}</span>
        <span>{status}</span>
      </div>
      {children}
    </div>
  )
}

export function WorkflowStories() {
  return (
    <section id="workflow" className="pt-10 pb-20 lg:pt-16 lg:pb-32">
      <article className="grid items-center gap-8 border-t border-border/60 py-14 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(30rem,1.28fr)] lg:gap-[clamp(2rem,7vw,7rem)] lg:py-20">
        <StoryCopy
          index="01"
          eyebrow="Smart Collections"
          title="Save the question, not a static list."
          body="Combine search, categories, measurement ranges, and missing data into a named view. The result count changes automatically when you add or edit a knife."
          points={[
            "Build views such as “Titanium folders,” “Under 3 oz,” or “Needs research.”",
            "Keep saved views in the sidebar with a live count.",
            "Update, rename, or save a variation without rebuilding filters.",
          ]}
        />
        <DemoWindow label="Smart Collections" status="Live results">
          <div className="grid gap-3 p-3 sm:grid-cols-[9.5rem_1fr] sm:p-5">
            <div className="hidden rounded-lg border border-[var(--bladevault-line)]/55 bg-[#fffefa]/90 p-4 sm:block">
              <h3 className="text-sm font-semibold text-[var(--bladevault-olive)]">
                Saved views
              </h3>
              <div className="mt-4 space-y-2 text-[10px] text-muted-foreground">
                {[
                  ["Titanium folders", "18"],
                  ["Under 3 oz", "12"],
                  ["Needs research", "7"],
                  ["Recent additions", "9"],
                ].map(([name, count], index) => (
                  <div
                    key={name}
                    className={`flex items-center justify-between rounded-md px-2.5 py-2 ${index === 0 ? "bg-[var(--bladevault-olive)] text-[#f4edcf]" : ""}`}
                  >
                    <span>{name}</span>
                    <span className="font-mono">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[var(--bladevault-line)]/55 bg-[#fffefa]/90 p-4">
              <h3 className="text-sm font-semibold text-[var(--bladevault-olive)]">
                Titanium folders
              </h3>
              <div className="mt-4 flex items-center gap-2 rounded-md border border-[var(--bladevault-line)]/70 bg-white px-3 py-2 text-[10px] text-muted-foreground">
                <Search className="size-3" /> Search model name…
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["handle:titanium", "type:folder", "blade:<3.5in"].map(
                  (filter) => (
                    <span
                      key={filter}
                      className="rounded border border-[var(--bladevault-line)]/70 bg-[#f6f1e5] px-2 py-1 font-mono text-[8px] text-muted-foreground"
                    >
                      {filter}
                    </span>
                  )
                )}
              </div>
              <div className="mt-4 space-y-2">
                {[
                  [
                    "Vosteed Porcupine TiSlim",
                    "154CM · Titanium · 2.97 oz",
                    "6",
                  ],
                  ["Kizer Militaw", "S45VN · Titanium · 3.11 oz", "8"],
                  ["QSP Penguin Plus", "20CV · Titanium · 3.42 oz", "4"],
                  ["Vero Synapse Mini", "M390 · Titanium · 2.88 oz", "11"],
                ].map(([name, detail, photos]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-3 rounded-md border border-[var(--bladevault-line)]/45 bg-white px-3 py-2"
                  >
                    <div className="grid h-9 place-items-center overflow-hidden rounded bg-[#f7f5ee] px-2">
                      <KnifeIllustration />
                    </div>
                    <span className="min-w-0">
                      <strong className="block truncate text-[10px] text-foreground">
                        {name}
                      </strong>
                      <small className="block truncate text-[8px] text-muted-foreground">
                        {detail}
                      </small>
                    </span>
                    <span className="font-mono text-[8px] text-[var(--bladevault-title)]">
                      {photos} photos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoWindow>
      </article>

      <article className="grid items-center gap-8 border-t border-border/60 py-14 lg:grid-cols-[minmax(30rem,1.28fr)_minmax(18rem,0.72fr)] lg:gap-[clamp(2rem,7vw,7rem)] lg:py-20">
        <StoryCopy
          index="02"
          eyebrow="Model families"
          title="See the model. Keep every variation."
          body="BladeVault recognizes matching brand and model records, then groups them into a family. Browse the set together and switch between variants from the detail page."
          points={[
            "Reduce repeated-model clutter in a large collection.",
            "Use image previews and distinct labels to tell close configurations apart.",
            "Preserve the specifications, images, provenance, and service history of each record.",
          ]}
          className="lg:order-2"
        />
        <DemoWindow
          label="Collection / Model family"
          status="3 configurations"
          className="lg:order-1"
        >
          <div className="p-3 sm:p-5">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--bladevault-line)]/55 bg-[#fffefa]/90 px-4 py-4">
              <div>
                <h3 className="text-sm font-semibold text-[var(--bladevault-olive)]">
                  Vosteed · Porcupine
                </h3>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  One family, three distinct configurations
                </p>
              </div>
              <span className="hidden rounded-md border border-[var(--bladevault-line)] bg-[#f6f1e5] px-3 py-2 font-mono text-[8px] text-[var(--bladevault-title)] sm:block">
                Open family view ↓
              </span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                ["Current", "TiSlim · A4804", "154CM · Titanium", "#30351b"],
                [
                  "Variant 02",
                  "Porcupine · Satin",
                  "Elmax · Titanium",
                  "#6b685f",
                ],
                [
                  "Variant 03",
                  "Porcupine · Copper",
                  "14C28N · Copper",
                  "#8f4325",
                ],
              ].map(([label, title, detail, handle], index) => (
                <div
                  key={title}
                  className={`overflow-hidden rounded-lg border border-[var(--bladevault-line)]/55 bg-white ${index === 2 ? "max-sm:hidden" : ""}`}
                >
                  <div className="grid h-36 place-items-center bg-[linear-gradient(145deg,#fff,#f5f3ec)] px-8">
                    <KnifeIllustration handle={handle} />
                  </div>
                  <div className="border-t border-[var(--bladevault-line)]/45 p-3">
                    <small className="font-mono text-[8px] tracking-[0.08em] text-[var(--bladevault-title)] uppercase">
                      {label}
                    </small>
                    <strong className="mt-1 block text-[11px] text-foreground">
                      {title}
                    </strong>
                    <p className="mt-1 text-[9px] text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DemoWindow>
      </article>

      <article className="grid items-center gap-8 border-t border-border/60 py-14 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(30rem,1.28fr)] lg:gap-[clamp(2rem,7vw,7rem)] lg:py-20">
        <StoryCopy
          index="03"
          eyebrow="Maintenance"
          title="Remember the work, not just the knife."
          body="Log cleaning, lubrication, sharpening, stropping, disassembly, repairs, and other care beside the record they belong to. Quick actions cover common work; detailed entries keep the setup."
          points={[
            "See the last service date at a glance.",
            "Record sharpening angle, grit, system, passes, compound, and notes.",
            "Edit history and find maintenance activity again in Logs.",
          ]}
        />
        <DemoWindow label="Knife detail / Maintenance" status="Care history">
          <div className="grid gap-3 p-3 sm:grid-cols-[0.82fr_1.18fr] sm:p-5">
            <div className="rounded-lg border border-[var(--bladevault-line)]/55 bg-[#fffefa]/90 p-4">
              <div className="flex items-center gap-2 text-[var(--bladevault-olive)]">
                <Wrench className="size-4" />
                <h3 className="text-sm font-semibold">Last service</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["Sharpened", "23 days ago"],
                  ["Cleaned", "Today"],
                  ["Lubricated", "Today"],
                  ["Disassembled", "4 months"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-[#f6f1e5] p-3">
                    <span className="text-[9px] text-muted-foreground">
                      {label}
                    </span>
                    <strong className="mt-1 block font-mono text-[10px] text-[var(--bladevault-olive)]">
                      {value}
                    </strong>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Cleaned", "Lubricated", "Stropped", "+ Details"].map(
                  (action) => (
                    <span
                      key={action}
                      className="rounded-md border border-[var(--bladevault-line)]/65 bg-white px-2.5 py-2 text-[9px] text-[var(--bladevault-olive)]"
                    >
                      {action}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="rounded-lg border border-[var(--bladevault-line)]/55 bg-[#fffefa]/90 p-4">
              <h3 className="text-sm font-semibold text-[var(--bladevault-olive)]">
                Maintenance timeline
              </h3>
              <div className="mt-4 space-y-4 border-l border-[var(--bladevault-line)]/65 pl-4">
                {[
                  [
                    "Cleaned & lubricated",
                    "Today · Pivot cleaned; KPL Original applied.",
                  ],
                  ["Stropped", "Aug 18 · 1 µm compound · 10 passes."],
                  ["Sharpened", "Jul 27 · 17° per side · 1000 grit."],
                  [
                    "Disassembled",
                    "May 06 · Full clean and hardware inspection.",
                  ],
                ].map(([title, detail]) => (
                  <div key={title} className="relative">
                    <span className="absolute top-1 -left-[1.2rem] size-2 rounded-full border border-[var(--bladevault-gold)] bg-[#fffefa]" />
                    <strong className="block text-[11px] text-foreground">
                      {title}
                    </strong>
                    <span className="mt-1 block text-[9px] leading-4 text-muted-foreground">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoWindow>
      </article>
    </section>
  )
}
