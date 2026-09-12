import Image from "next/image"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"

function ScreenshotCapability({
  src,
  alt,
  label,
  title,
  body,
  className = "",
}: {
  src: string
  alt: string
  label: string
  title: string
  body: string
  className?: string
}) {
  return (
    <article
      className={`group relative min-h-72 overflow-hidden rounded-xl border border-[#ecdaa3]/25 bg-white/5 ${className}`}
    >
      <ScreenshotLightbox
        src={src}
        alt={alt}
        title={label}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top opacity-70 saturate-[0.7] sepia-[0.08] transition duration-500 group-hover:scale-[1.025] group-hover:opacity-80"
        />
      </ScreenshotLightbox>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgb(24_27_12/95%)_94%)]" />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 p-5">
        <small className="font-mono text-[10px] tracking-[0.11em] text-[#d6b75f] uppercase">
          {label}
        </small>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#fff8dd]">
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#c9c2a7]">{body}</p>
      </div>
    </article>
  )
}

export function CapabilityMosaic() {
  return (
    <section
      id="capabilities"
      className="capability-shell overflow-hidden rounded-2xl py-16 text-[#f4edcf] lg:py-24"
    >
      <div className="grid items-end gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(20rem,0.55fr)] lg:px-16">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.11em] text-[#d6b75f] uppercase">
            One vault, four ways to understand it
          </p>
          <h2 className="mt-4 max-w-[11ch] text-[clamp(2.8rem,5.2vw,5.2rem)] leading-[0.96] font-semibold tracking-[-0.06em] text-balance text-[#f4edcf]">
            Look closer when the details matter.
          </h2>
        </div>
        <p className="max-w-xl text-base leading-8 text-[#c9c2a7]">
          Core capabilities stay visible without another giant feature grid.
          Each one shows an outcome, not a checkbox.
        </p>
      </div>

      <div className="mt-12 grid gap-3 px-3 sm:px-6 md:grid-cols-2 lg:mt-16 xl:grid-cols-[1.25fr_0.75fr_0.85fr] xl:grid-rows-2">
        <ScreenshotCapability
          src="/screenshots/insights.png"
          alt="BladeVault collection insights with charts for makers, blade lengths, steel, and data completeness"
          label="Insights"
          title="See the shape of your collection."
          body="Explore makers, materials, dimensions, recent activity, and data completeness—then open the records behind a chart."
          className="min-h-[34rem] md:row-span-2 xl:min-h-[34rem]"
        />
        <ScreenshotCapability
          src="/screenshots/compare.png"
          alt="BladeVault comparison table with knife specifications aligned side by side"
          label="Compare"
          title="Differences, aligned."
          body="Compare any number of knives and print the table as a landscape PDF."
        />

        <article className="relative min-h-72 overflow-hidden rounded-xl border border-[#ecdaa3]/25 bg-white/5">
          <div className="absolute inset-4 rounded-lg border border-[#ecdaa3]/20 bg-[rgb(12_14_6/72%)] p-4 font-mono text-[10px] leading-6 text-[#bfc89a]">
            <b className="text-[#e2c365]">YOU</b> Which folders under 3 oz are
            missing a designer?
            <br />
            <br />
            <b className="text-[#e2c365]">BLADEVAULT</b>
            <br />
            <span className="text-[#eee8ce]">I found 4 matching records.</span>
            <br />
            ├─ Vosteed Mini Labrador
            <br />
            ├─ Kizer Feist
            <br />
            ├─ QSP Canary Folder
            <br />
            └─ CIVIVI Lumi
            <br />
            <br />
            <b className="text-[#e2c365]">STATUS</b> read-only · local
          </div>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 bg-[linear-gradient(180deg,transparent,rgb(24_27_12/98%)_40%)] px-5 pt-12 pb-5">
            <small className="font-mono text-[10px] tracking-[0.11em] text-[#d6b75f] uppercase">
              MCP · 10 tools
            </small>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#fff8dd]">
              Ask your own database.
            </h3>
          </div>
        </article>

        <article className="relative min-h-72 overflow-hidden rounded-xl border border-[#ecdaa3]/25 bg-white/5 md:col-span-2 xl:col-span-2">
          <div className="absolute inset-4 bottom-24">
            <div className="absolute inset-1 right-8 rotate-[-2deg] rounded bg-[#fffdf5] p-4 text-[#302e29] shadow-2xl after:absolute after:-right-4 after:-bottom-2 after:-z-10 after:h-full after:w-[98%] after:rotate-[5deg] after:rounded after:bg-[#e9e2cb]">
              <div className="flex items-center justify-between gap-4 border-b border-[#ddc58e]/55 pb-2 text-[10px] font-bold text-[var(--bladevault-olive)]">
                <span>BLADEVAULT · COLLECTION REPORT</span>
                <span>128 records</span>
              </div>
              <div className="mt-3 flex h-20 items-end gap-2">
                {[35, 62, 88, 48, 72].map((height, index) => (
                  <span
                    key={height}
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-t-sm ${index === 2 ? "bg-[var(--bladevault-gold)]" : index === 1 ? "bg-[#828857]" : index === 3 ? "bg-[#b1a981]" : "bg-[var(--bladevault-olive)]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 bg-[linear-gradient(180deg,transparent_0%,rgb(27_30_13/97%)_36%,rgb(27_30_13/99%)_100%)] px-5 pt-12 pb-5">
            <small className="font-mono text-[10px] tracking-[0.11em] text-[#d6b75f] uppercase">
              Reports & activity
            </small>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#fff8dd]">
              A portable view of the whole vault.
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#c9c2a7]">
              Create a printable collection report; searchable activity logs
              keep changes and maintenance traceable while each record holds
              images, notes, sources, custom fields, and provenance.
            </p>
          </div>
        </article>
      </div>

      <div className="mx-4 mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ecdaa3]/20 px-1 pt-5 font-mono text-[10px] tracking-[0.05em] text-[#c9c2a7] uppercase sm:mx-8">
        <strong className="text-[#e2c365]">Also included</strong>
        <span>URL product import</span>
        <span>Bulk edit</span>
        <span>Custom fields</span>
        <span>Multi-image galleries</span>
        <span>Pinned items</span>
      </div>
    </section>
  )
}
