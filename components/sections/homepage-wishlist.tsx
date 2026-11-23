import type { CSSProperties } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BadgePercent,
  Bell,
  CircleDollarSign,
  Radar,
  X,
} from "lucide-react"

import { releaseAnchor } from "@/lib/navigation"

import { KnifeGlyph } from "./knife-glyph"
import styles from "./homepage-wishlist.module.css"
import base from "./homepage-v3.module.css"

type PillTone = "sale" | "regular" | "above" | "out" | "low"

type WishlistRow = {
  name: string
  brand: string
  stores: string
  price: string
  note: string
  pills: { label: string; tone: PillTone }[]
  low: string
  high: string
  position: string
  change: string
  trend: "down" | "flat" | "up"
  path: string
  thumb: string
}

type DealGroup = {
  id: "sale" | "regular" | "above" | "out"
  title: string
  hint: string
  rows: WishlistRow[]
}

const groups: DealGroup[] = [
  {
    id: "sale",
    title: "On sale now",
    hint: "Below regular price · 2",
    rows: [
      {
        name: "Raccoon",
        brand: "Vosteed",
        stores: "3 stores",
        price: "$54",
        note: "22% below regular",
        pills: [
          { label: "On sale −22%", tone: "sale" },
          { label: "90-day low", tone: "low" },
          { label: "↓ 12% 2d", tone: "low" },
        ],
        low: "$52",
        high: "$79",
        position: "7%",
        change: "−12%",
        trend: "down",
        path: "M2 5 L14 8 L26 6 L38 10 L50 8 L62 11 L74 6 L80 3",
        thumb: styles.thumbWarm,
      },
      {
        name: "Drop Bear",
        brand: "Kizer",
        stores: "2 stores",
        price: "$72",
        note: "16% below regular",
        pills: [
          { label: "On sale −16%", tone: "sale" },
          { label: "90-day low", tone: "low" },
        ],
        low: "$69",
        high: "$89",
        position: "15%",
        change: "−8%",
        trend: "down",
        path: "M2 6 L14 7 L26 9 L38 8 L50 11 L62 9 L74 12 L80 8",
        thumb: styles.thumbGreen,
      },
    ],
  },
  {
    id: "regular",
    title: "Regular price",
    hint: "No discount right now · 2",
    rows: [
      {
        name: "Elementum II",
        brand: "CIVIVI",
        stores: "2 stores",
        price: "$69",
        note: "at regular price",
        pills: [{ label: "Regular price", tone: "regular" }],
        low: "$69",
        high: "$79",
        position: "0%",
        change: "−3%",
        trend: "flat",
        path: "M2 9 L14 8 L26 10 L38 9 L50 11 L62 9 L74 10 L80 10",
        thumb: styles.thumbGreen,
      },
      {
        name: "Banter",
        brand: "WE Knife",
        stores: "3 stores",
        price: "$118",
        note: "at regular price",
        pills: [{ label: "Regular price", tone: "regular" }],
        low: "$112",
        high: "$125",
        position: "46%",
        change: "+2%",
        trend: "flat",
        path: "M2 10 L14 9 L26 11 L38 8 L50 10 L62 9 L74 11 L80 8",
        thumb: styles.thumbOlive,
      },
    ],
  },
  {
    id: "above",
    title: "Above regular",
    hint: "Better to wait · 1",
    rows: [
      {
        name: "Bugout",
        brand: "Benchmade",
        stores: "2 stores",
        price: "$162",
        note: "8% above regular",
        pills: [{ label: "+8% above regular", tone: "above" }],
        low: "$140",
        high: "$165",
        position: "88%",
        change: "+5%",
        trend: "up",
        path: "M2 12 L14 10 L26 11 L38 8 L50 9 L62 6 L74 7 L80 4",
        thumb: styles.thumbSand,
      },
    ],
  },
  {
    id: "out",
    title: "Out of stock",
    hint: "Watching for a restock · 1",
    rows: [
      {
        name: "Para 3",
        brand: "Spyderco",
        stores: "1 store",
        price: "$168",
        note: "last listed",
        pills: [{ label: "Out of stock", tone: "out" }],
        low: "$154",
        high: "$178",
        position: "58%",
        change: "±0%",
        trend: "flat",
        path: "M2 9 L14 9 L26 10 L38 9 L50 9 L62 10 L74 9 L80 9",
        thumb: styles.thumbViolet,
      },
    ],
  },
]

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

const wishlistHref = `/whats-new#${releaseAnchor("v2.5.17")}`
const priceDropsHref = `/whats-new#${releaseAnchor("v2.5.16")}`

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
          <span className={base.newBadge}>New</span>
        </p>
        <h2>Know what&apos;s actually a deal.</h2>
        <p className={base.sectionIntro}>
          The Wishlist groups what you plan to buy by deal and shows each
          knife&apos;s price against its regular price, a 90-day range, and a
          30-day trend. Price Drops watches the list by default.
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
              Price Drops &middot; watching Wishlist
            </span>
          </div>

          <div className={styles.app}>
            <div className={styles.appHead}>
              <h3>Wishlist</h3>
              <span className={styles.watchTag}>
                <Bell aria-hidden="true" /> 5 of 6 watched
              </span>
            </div>

            <div className={styles.summary}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>All of it today</span>
                <span className={styles.statValue}>$842</span>
                <span className={styles.statHint}>
                  6 knives &middot; 1 out of stock
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>On sale now</span>
                <span className={`${styles.statValue} ${styles.statGood}`}>
                  $61 <small>off</small>
                </span>
                <span className={styles.statHint}>
                  2 of 6 below regular price
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Price Drops watches</span>
                <span className={styles.statValue}>5 / 6</span>
                <span className={styles.statHint}>
                  9 store pages &middot;{" "}
                  <Link href={priceDropsHref}>See Price Drops</Link>
                </span>
              </div>
            </div>

            <section className={styles.best} aria-label="Best deal right now">
              <span className={`${styles.thumbLg} ${styles.thumbSand}`}>
                <KnifeGlyph />
              </span>
              <div>
                <p className={styles.eyebrow}>Best deal right now</p>
                <h4>Vosteed Raccoon</h4>
                <div className={styles.bestPrice}>
                  <b>$54</b>
                  <s>$69</s>
                  <span className={styles.pillSale}>On sale −22%</span>
                  <span className={styles.pillLow}>90-day low</span>
                </div>
                <p className={styles.bestNote}>
                  $15 below regular price &middot; −12% in 30 days &middot; 3
                  stores
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
                      <span className={`${styles.thumb} ${row.thumb}`}>
                        <KnifeGlyph />
                      </span>
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
                        <div className={styles.rangeTrack}>
                          <i
                            style={
                              { "--position": row.position } as CSSProperties
                            }
                          />
                        </div>
                        <div className={styles.rangeEnds}>
                          <span>{row.low}</span>
                          <span>{row.high}</span>
                        </div>
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
