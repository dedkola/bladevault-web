"use client"

import { useId, useState } from "react"
import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, BellOff, BellRing, Target } from "lucide-react"

import { releaseAnchor } from "@/lib/navigation"

import { KnifePhoto, type KnifePhotoId } from "./knife-photo"
import styles from "./super-sale.module.css"
import wishlist from "./homepage-wishlist.module.css"

// Settings → Price monitoring → "Check the rest of the collection in free
// time" (v2.6.0). Knives outside the Wishlist notify only when a price falls
// at least the super-sale line below regular, or reaches the knife's own
// target. Figures describe an example collection, not live data.

const MIN = 20
const MAX = 90
const STEP = 5
const DEFAULT_LINE = 50

type Knife = {
  name: string
  brand: string
  regular: number
  now: number
  target?: number
  photo: KnifePhotoId
}

const knives: Knife[] = [
  {
    name: "Bugout",
    brand: "Benchmade",
    regular: 180,
    now: 81,
    photo: "bugout",
  },
  {
    name: "Razel",
    brand: "CRKT",
    regular: 70,
    now: 28,
    photo: "razel",
  },
  {
    name: "Para Military 2 LW",
    brand: "Spyderco",
    regular: 202,
    now: 131.3,
    photo: "paraMilitary",
  },
  {
    name: "Drop Bear",
    brand: "Kizer",
    regular: 95,
    now: 66.5,
    photo: "dropBear",
  },
  {
    name: "The Seamount",
    brand: "Quiet Carry",
    regular: 375,
    now: 337.5,
    target: 337.5,
    photo: "seamount",
  },
]

// One round of What to monitor, then the collection pass between rounds.
const timeline = [
  { kind: "round", label: "Wishlist" },
  { kind: "pass", label: "Collection" },
  { kind: "round", label: "Wishlist" },
  { kind: "pass", label: "Collection" },
  { kind: "round", label: "Wishlist" },
] as const

const percentOfRange = (value: number) =>
  `${((value - MIN) / (MAX - MIN)) * 100}%`

const money = (value: number) =>
  `$${value % 1 === 0 ? value : value.toFixed(2)}`

const percentBelow = (knife: Knife) =>
  Math.round(((knife.regular - knife.now) / knife.regular) * 100)

function reasonFor(knife: Knife, line: number) {
  const below = percentBelow(knife)
  if (below >= line)
    return {
      kind: "sale",
      label: `Super sale · ${below}% below regular`,
    } as const
  if (knife.target !== undefined && knife.now <= knife.target)
    return {
      kind: "target",
      label: `Reached its target ${money(knife.target)}`,
    } as const
  return { kind: "quiet", label: "Price Drops only" } as const
}

export function SuperSaleBlock() {
  const [line, setLine] = useState(DEFAULT_LINE)
  const sliderId = useId()

  const rows = knives.map((knife) => ({
    knife,
    reason: reasonFor(knife, line),
  }))
  const alerts = rows.filter((row) => row.reason.kind !== "quiet").length

  return (
    <section className={styles.block} aria-labelledby="super-sale-title">
      <div className={styles.copy}>
        <p className={wishlist.eyebrow}>New in 2.6 &middot; Price Drops</p>
        <h3 id="super-sale-title">
          The rest of your collection, checked in free time.
        </h3>
        <p className={styles.intro}>
          Wishlist rounds keep their schedule and always go first. Between them,
          BladeVault checks the rest of your collection knife by knife, at most
          once a day, and stays quiet unless it finds a super sale.
        </p>

        <ol
          className={styles.timeline}
          aria-label="Wishlist rounds, with the rest of the collection checked between them"
        >
          {timeline.map((part, index) => (
            <li key={index} data-kind={part.kind}>
              <span>{part.label}</span>
            </li>
          ))}
        </ol>
        <p className={styles.passNote}>
          <b>Collection: 40 of 312</b> &middot; waits for the round, then picks
          up where it stopped
        </p>

        <ul className={styles.facts}>
          <li>Off by default: Settings &rarr; Price monitoring</li>
          <li>Other stores look for these knives too</li>
          <li>Prices and charts still land on Price Drops</li>
        </ul>

        <div className={styles.links}>
          <Link
            href="/docs/guides/price-drops#wishlist-first-the-rest-of-the-collection-in-free-time"
            className={wishlist.bestLink}
          >
            Read the guide
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link
            href={`/whats-new#${releaseAnchor("v2.6.0")}`}
            className={styles.textLink}
          >
            See the release
          </Link>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.control}>
          <label htmlFor={sliderId}>
            Notify only about a super sale
            <output htmlFor={sliderId} className={styles.value}>
              {line}% <small>below regular</small>
            </output>
          </label>
          <input
            id={sliderId}
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={line}
            onChange={(event) => setLine(Number(event.target.value))}
            aria-valuetext={`${line}% below regular price`}
            className={styles.slider}
            style={
              {
                "--fill": percentOfRange(line),
              } as CSSProperties
            }
          />
          <div className={styles.scale} aria-hidden="true">
            <span>{MIN}%</span>
            <span
              className={styles.defaultMark}
              style={
                { "--at": (DEFAULT_LINE - MIN) / (MAX - MIN) } as CSSProperties
              }
            >
              Default {DEFAULT_LINE}%
            </span>
            <span>{MAX}%</span>
          </div>
        </div>

        <ul className={styles.rows} aria-label="Example collection knives">
          {rows.map(({ knife, reason }) => {
            const below = percentBelow(knife)
            return (
              <li
                key={knife.name}
                className={styles.row}
                data-kind={reason.kind}
              >
                <KnifePhoto
                  id={knife.photo}
                  className={wishlist.thumb}
                  sizes="64px"
                />
                <span className={styles.name}>
                  <b>{knife.name}</b>
                  <small>
                    {knife.brand} &middot; <s>{money(knife.regular)}</s>{" "}
                    {money(knife.now)}
                  </small>
                </span>
                <span
                  className={styles.meter}
                  style={
                    {
                      "--below": `${below}%`,
                      "--line": `${line}%`,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                >
                  <i />
                </span>
                <span className={styles.reason}>
                  {reason.kind === "sale" ? (
                    <BellRing aria-hidden="true" />
                  ) : reason.kind === "target" ? (
                    <Target aria-hidden="true" />
                  ) : (
                    <BellOff aria-hidden="true" />
                  )}
                  {reason.label}
                </span>
              </li>
            )
          })}
        </ul>

        <p className={styles.summary} aria-live="polite">
          {alerts} of {knives.length} send an Inbox message.
          {alerts < knives.length
            ? " The rest show their drop on Price Drops without a notification."
            : ""}
        </p>
      </div>
    </section>
  )
}
