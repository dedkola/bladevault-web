import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgePercent,
  Bell,
  CircleDollarSign,
  Radar,
  Store,
  X,
} from "lucide-react"

import { releaseAnchor } from "@/lib/navigation"

import { KnifePhoto, type KnifePhotoId } from "./knife-photo"
import styles from "./homepage-wishlist.module.css"
import { SuperSaleBlock } from "./super-sale-block"
import base from "./homepage-v3.module.css"

type PillTone = "sale" | "regular" | "above" | "out" | "low"

type WishlistRow = {
  name: string
  brand: string
  stores: string
  price: string
  note: string
  pills: { label: string; tone: PillTone }[]
  low?: string
  high?: string
  position?: string
  change: string
  trend: "down" | "flat" | "up"
  path: string
  photo: KnifePhotoId
}

type DealGroup = {
  id: "sale" | "regular" | "above" | "out"
  title: string
  hint: string
  rows: WishlistRow[]
}

// Real rows from the author's own vault on Nov 23, 2026 (BladeVault 2.5.21).
// Tracking started Nov 19, so ranges and trends cover the days since then.
const groups: DealGroup[] = [
  {
    id: "sale",
    title: "On sale now",
    hint: "Below regular price · 12",
    rows: [
      {
        name: "Raccoon TiSlim",
        brand: "Vosteed",
        stores: "4 stores",
        price: "$94.50",
        note: "30% below regular",
        pills: [
          { label: "On sale −30%", tone: "sale" },
          { label: "Lowest seen", tone: "low" },
          { label: "↓ 30% 3 days ago", tone: "low" },
        ],
        low: "$94.50",
        high: "$135",
        position: "0%",
        change: "−30%",
        trend: "down",
        path: "M2 4 L40 4 L44 14 L80 14",
        photo: "raccoon",
      },
      {
        name: "Kroc 329",
        brand: "Vosteed",
        stores: "2 stores",
        price: "$90.35",
        note: "35% below regular",
        pills: [
          { label: "On sale −35%", tone: "sale" },
          { label: "↓ 35% today", tone: "low" },
        ],
        low: "$90.35",
        high: "$139",
        position: "0%",
        change: "−35%",
        trend: "down",
        path: "M2 4 L72 4 L75 15 L80 15",
        photo: "kroc",
      },
      {
        name: "Native Chief Lightweight",
        brand: "Spyderco",
        stores: "4 stores",
        price: "$161.25",
        note: "25% below regular",
        pills: [
          { label: "On sale −25%", tone: "sale" },
          { label: "Best at SMKW", tone: "low" },
        ],
        low: "$161.25",
        high: "$215",
        position: "0%",
        change: "−25%",
        trend: "down",
        path: "M2 4 L70 4 L73 13 L80 13",
        photo: "nativeChief",
      },
      {
        name: "Military 2",
        brand: "Spyderco",
        stores: "2 stores",
        price: "$220.50",
        note: "25% below regular",
        pills: [
          { label: "On sale −25%", tone: "sale" },
          { label: "Best at SMKW", tone: "low" },
        ],
        low: "$220.50",
        high: "$294",
        position: "0%",
        change: "−25%",
        trend: "down",
        path: "M2 4 L72 4 L75 13 L80 13",
        photo: "military",
      },
    ],
  },
  {
    id: "regular",
    title: "Regular price",
    hint: "No discount right now · 19",
    rows: [
      {
        name: "Dingo",
        brand: "Kizer",
        stores: "3 stores",
        price: "$64.96",
        note: "at regular price",
        pills: [{ label: "Regular price", tone: "regular" }],
        low: "$64.96",
        high: "$64.96",
        position: "50%",
        change: "±0%",
        trend: "flat",
        path: "M2 9 L80 9",
        photo: "dingo",
      },
      {
        name: "Porcupine",
        brand: "Vosteed",
        stores: "3 stores",
        price: "$69",
        note: "back in stock at Blade HQ",
        pills: [
          { label: "Regular price", tone: "regular" },
          { label: "Restocked", tone: "low" },
        ],
        low: "$69",
        high: "$69",
        position: "50%",
        change: "±0%",
        trend: "flat",
        path: "M2 9 L80 9",
        photo: "porcupine",
      },
    ],
  },
  {
    id: "out",
    title: "Out of stock",
    hint: "Watching for a restock · 7",
    rows: [
      {
        name: "Nymble",
        brand: "Vosteed",
        stores: "3 stores",
        price: "—",
        note: "out at Blade HQ and SMKW",
        pills: [{ label: "Out of stock", tone: "out" }],
        change: "—",
        trend: "flat",
        path: "M2 9 L80 9",
        photo: "nymble",
      },
    ],
  },
]

const storeRows = [
  { name: "Blade HQ", price: "$94.50", state: "low", note: "found by AI" },
  { name: "SMKW", price: "$94.50", state: "low", note: "lowest seen" },
  { name: "vosteed.com", price: "$135", state: "regular", note: "brand site" },
  { name: "DLT Trading", price: "$135", state: "out", note: "out of stock" },
] as const

const alsoSearched = ["KnifeJoy", "Northwest Knives", "Amazon"]

const storeStateClasses = {
  low: styles.storeLow,
  regular: styles.storeRegular,
  out: styles.storeOut,
} as const

const notes = [
  {
    icon: BadgePercent,
    title: "Deal groups, not targets",
    body: "On sale, Regular, Above regular, Out of stock and No store price replace the old priority lanes.",
  },
  {
    icon: CircleDollarSign,
    title: "Price vs regular",
    body: "Every knife shows its best live store price against the regular price, on a 90-day range bar.",
  },
  {
    icon: Radar,
    title: "Watched by default",
    body: "Price Drops watches the Wishlist, and each row carries a 30-day trend and a watch control.",
  },
] as const

const wishlistHref = `/whats-new#${releaseAnchor("v2.5.20")}`
const priceDropsHref = `/whats-new#${releaseAnchor("v2.5.19")}`
const storesHref = `/whats-new#${releaseAnchor("v2.5.21")}`

const groupClasses: Record<DealGroup["id"], string> = {
  sale: styles.groupSale,
  regular: styles.groupRegular,
  above: styles.groupAbove,
  out: styles.groupOut,
}

const pillClasses: Record<PillTone, string> = {
  sale: styles.pillSale,
  regular: styles.pillRegular,
  above: styles.pillAbove,
  out: styles.pillOut,
  low: styles.pillLow,
}

const trendClasses = {
  down: styles.trendDown,
  flat: styles.trendFlat,
  up: styles.trendUp,
} as const

export function HomepageWishlist() {
  return (
    <section id="wishlist" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          Wishlist
        </p>
        <h2>Know what&apos;s actually a deal.</h2>
        <p className={base.sectionIntro}>
          The Wishlist groups what you plan to buy by deal and shows each
          knife&apos;s price against its regular price, its range, and a 30-day
          trend. Price Drops watches the list by default. Below: the
          author&apos;s own list on Nov 23.
        </p>
      </div>

      <div className={styles.stage}>
        <div className={base.window}>
          <div className={base.windowBar}>
            <span className={base.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>BladeVault / Wishlist</span>
            <span className={styles.status}>
              Price Drops &middot; 109 store pages
            </span>
          </div>

          <div className={styles.app}>
            <div className={styles.appHead}>
              <h3>Wishlist</h3>
              <span className={styles.watchTag}>
                <Bell aria-hidden="true" /> 50 of 50 watched
              </span>
            </div>

            <div className={styles.summary}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>All of it today</span>
                <span className={styles.statValue}>$5,796</span>
                <span className={styles.statHint}>
                  50 knives &middot; 7 out of stock
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>On sale now</span>
                <span className={`${styles.statValue} ${styles.statGood}`}>
                  $639 <small>off</small>
                </span>
                <span className={styles.statHint}>
                  12 of 50 below regular price
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Price Drops watches</span>
                <span className={styles.statValue}>50 / 50</span>
                <span className={styles.statHint}>
                  109 store pages &middot;{" "}
                  <Link href={priceDropsHref}>See Price Drops</Link>
                </span>
              </div>
            </div>

            <section className={styles.best} aria-label="Best deal right now">
              <KnifePhoto
                id="raccoon"
                className={styles.thumbLg}
                sizes="160px"
              />
              <div>
                <p className={styles.eyebrow}>Best deal right now</p>
                <h4>Vosteed Raccoon TiSlim</h4>
                <div className={styles.bestPrice}>
                  <b>$94.50</b>
                  <s>$135</s>
                  <span className={styles.pillSale}>On sale −30%</span>
                  <span className={styles.pillLow}>Lowest seen</span>
                </div>
                <p className={styles.bestNote}>
                  $40.50 below regular price &middot; 30% drop at Blade HQ
                  &middot; 3 stores
                </p>
              </div>
              <Link href={wishlistHref} className={styles.bestLink}>
                See the release
                <ArrowRight aria-hidden="true" />
              </Link>
            </section>

            <div className={styles.groups}>
              {groups.map((group) => (
                <section
                  key={group.id}
                  className={`${styles.group} ${groupClasses[group.id]}`}
                  aria-labelledby={`wishlist-${group.id}`}
                >
                  <header className={styles.groupHead}>
                    <h4 id={`wishlist-${group.id}`}>{group.title}</h4>
                    <span>{group.hint}</span>
                  </header>

                  {group.rows.map((row) => (
                    <div key={row.name} className={styles.row}>
                      <KnifePhoto
                        id={row.photo}
                        className={styles.thumb}
                        sizes="64px"
                      />
                      <div className={styles.name}>
                        <b>{row.name}</b>
                        <span className={styles.sub}>
                          {row.brand} &middot; {row.stores}
                        </span>
                        <div className={styles.pills}>
                          {row.pills.map((pill) => (
                            <span
                              key={pill.label}
                              className={`${styles.pill} ${pillClasses[pill.tone]}`}
                            >
                              {pill.label}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.rowPrice}>
                        <b>{row.price}</b>
                        <span>{row.note}</span>
                      </div>
                      <div className={styles.range}>
                        {row.position ? (
                          <>
                            <div className={styles.rangeTrack}>
                              <i
                                style={
                                  {
                                    "--position": row.position,
                                  } as CSSProperties
                                }
                              />
                            </div>
                            <div className={styles.rangeEnds}>
                              <span>{row.low}</span>
                              <span>{row.high}</span>
                            </div>
                          </>
                        ) : (
                          <span className={styles.rangeEmpty}>
                            No in-stock price
                          </span>
                        )}
                      </div>
                      <div className={styles.rowTrend}>
                        <svg
                          viewBox="0 0 82 18"
                          preserveAspectRatio="none"
                          className={`${styles.spark} ${trendClasses[row.trend]}`}
                          aria-hidden="true"
                        >
                          <path d={row.path} />
                        </svg>
                        <span>30d {row.change}</span>
                      </div>
                      <div className={styles.rowActions} aria-hidden="true">
                        <i>
                          <Bell />
                        </i>
                        <i className={styles.remove}>
                          <X />
                        </i>
                      </div>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.storesRow}>
        <figure className={`${base.window} ${styles.chartWindow}`}>
          <div className={base.windowBar}>
            <span className={base.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>BladeVault / Price Drops</span>
          </div>
          <Image
            src="/screenshots/live/price-drops-chart.jpg"
            alt="Price Drops details for a Vosteed Raccoon TiSlim: best price $94.50 at Blade HQ against a $135 regular price, a chart with one line per store, and Lowest seen $94.50 at SMKW"
            width={2250}
            height={1310}
            sizes="(min-width: 1100px) 62vw, 94vw"
            className={styles.chartImage}
          />
        </figure>

        <aside className={styles.storesCard} aria-labelledby="wishlist-stores">
          <p className={styles.eyebrow}>New in 2.5.18 &ndash; 2.5.21</p>
          <h3 id="wishlist-stores">Every store, one chart.</h3>
          <p className={styles.storesIntro}>
            Price Drops looks for each knife at more stores, draws one line per
            store, and names the one with the lowest price. Details open right
            under the knife&apos;s row.
          </p>
          <ul className={styles.storeList}>
            {storeRows.map((store) => (
              <li
                key={store.name}
                className={`${styles.storeItem} ${storeStateClasses[store.state]}`}
              >
                <i aria-hidden="true" />
                <span>
                  <b>{store.name}</b>
                  <small>{store.note}</small>
                </span>
                <strong>{store.price}</strong>
              </li>
            ))}
          </ul>
          <p className={styles.alsoSearched}>
            <Store aria-hidden="true" />
            Also searched: {alsoSearched.join(" · ")}
          </p>
          <Link href={storesHref} className={styles.bestLink}>
            See the release
            <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <SuperSaleBlock />

      <div className={styles.notes}>
        {notes.map(({ icon: Icon, title, body }) => (
          <div key={title} className={styles.note}>
            <span className={styles.noteIcon} aria-hidden="true">
              <Icon />
            </span>
            <div>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
