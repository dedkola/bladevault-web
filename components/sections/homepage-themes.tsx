"use client"

import { useState, type CSSProperties } from "react"
import {
  ChartColumn,
  Check,
  Columns2,
  History,
  Images,
  LayoutGrid,
  Moon,
  Pin,
  Plus,
  Search,
  Sun,
} from "lucide-react"

import { cn } from "@/lib/utils"

import base from "./homepage-v3.module.css"
import styles from "./homepage-themes.module.css"

type Mode = "light" | "dark"

type Palette = {
  bg: string
  card: string
  ink: string
  muted: string
  line: string
  side: string
  sideInk: string
  sideMuted: string
  accent: string
  accentFill: string
  accentInk: string
  plate: string
}

type ThemeStyle = {
  id: string
  name: string
  note: string
  isNew?: boolean
  /** Styles that ignore the color mode, as in the app. */
  fixedMode?: Mode
  /** Logo and swatch accent when the main button color would vanish. */
  mark?: string
  radius: string
  pill: string
  palettes: Record<Mode, Palette>
}

// Colors mirror the app's own theme tokens (app/modern-variants.css and
// the Settings swatches), so the preview matches what users will see.
const themes: ThemeStyle[] = [
  {
    id: "forge",
    name: "Forge",
    note: "Graphite and ember, glow-line controls",
    isNew: true,
    radius: "12px",
    pill: "999px",
    palettes: {
      light: {
        bg: "#f1efeb",
        card: "#ffffff",
        ink: "#17150f",
        muted: "#74706a",
        line: "#e2dfd8",
        side: "#fbfaf8",
        sideInk: "#17150f",
        sideMuted: "#74706a",
        accent: "#d9480f",
        accentFill: "linear-gradient(135deg, #ff8a3d, #e5541b 55%, #c2370f)",
        accentInk: "#ffffff",
        plate: "linear-gradient(180deg, #f7f6f3, #ebe8e2)",
      },
      dark: {
        bg: "#0e0e10",
        card: "#141416",
        ink: "#f2f1ee",
        muted: "#8d8a84",
        line: "rgb(255 255 255 / 8%)",
        side: "#0e0e10",
        sideInk: "#f2f1ee",
        sideMuted: "#8d8a84",
        accent: "#ff6a2b",
        accentFill: "linear-gradient(135deg, #ffb067, #ff6a2b 50%, #e2361c)",
        accentInk: "#160a04",
        plate: "radial-gradient(circle at 50% 35%, #2a2a2e, #161618 70%)",
      },
    },
  },
  {
    id: "titanium",
    name: "Titanium",
    note: "Anodized violet, teal and bronze",
    isNew: true,
    radius: "12px",
    pill: "10px",
    palettes: {
      light: {
        bg: "#f1f0f4",
        card: "#ffffff",
        ink: "#16141b",
        muted: "#73707c",
        line: "#e2dfe8",
        side: "#fbfafc",
        sideInk: "#16141b",
        sideMuted: "#73707c",
        accent: "#6e4ff0",
        accentFill: "linear-gradient(120deg, #7b5cff, #2fb9a6 55%, #c99a4b)",
        accentInk: "#ffffff",
        plate: "linear-gradient(180deg, #f7f6fa, #e9e6f0)",
      },
      dark: {
        bg: "#100f14",
        card: "#15141a",
        ink: "#f1eff5",
        muted: "#8f8b99",
        line: "rgb(255 255 255 / 8%)",
        side: "#100f14",
        sideInk: "#f1eff5",
        sideMuted: "#8f8b99",
        accent: "#a48bff",
        accentFill: "linear-gradient(120deg, #8b6cff, #3dd9c1 50%, #e9b867)",
        accentInk: "#100f14",
        plate: "radial-gradient(circle at 50% 35%, #29263a, #17161d 70%)",
      },
    },
  },
  {
    id: "field",
    name: "Field",
    note: "Tactical stone with acid lime",
    isNew: true,
    radius: "6px",
    pill: "4px",
    palettes: {
      light: {
        bg: "#e6e5dd",
        card: "#fafaf6",
        ink: "#12130f",
        muted: "#66675d",
        line: "#d9d8cd",
        side: "#12130f",
        sideInk: "#efefe6",
        sideMuted: "#9a9b90",
        accent: "#7fa80f",
        accentFill: "#c8f031",
        accentInk: "#12130f",
        plate: "linear-gradient(180deg, #f2f1ea, #e3e2d8)",
      },
      dark: {
        bg: "#121310",
        card: "#171814",
        ink: "#efefe6",
        muted: "#8e8f84",
        line: "rgb(255 255 255 / 8%)",
        side: "#0d0e0b",
        sideInk: "#efefe6",
        sideMuted: "#8e8f84",
        accent: "#c8f031",
        accentFill: "#c8f031",
        accentInk: "#12130f",
        plate: "radial-gradient(circle at 50% 35%, #262822, #151612 70%)",
      },
    },
  },
  {
    id: "lumen",
    name: "Lumen",
    note: "Pure white with orange on the main action",
    isNew: true,
    fixedMode: "light",
    radius: "6px",
    pill: "6px",
    palettes: {
      light: {
        bg: "#ffffff",
        card: "#ffffff",
        ink: "#18181b",
        muted: "#737373",
        line: "#ebebeb",
        side: "#ffffff",
        sideInk: "#18181b",
        sideMuted: "#737373",
        accent: "#f6821f",
        accentFill: "#f6821f",
        accentInk: "#ffffff",
        plate: "#fafafa",
      },
      dark: {
        bg: "#ffffff",
        card: "#ffffff",
        ink: "#18181b",
        muted: "#737373",
        line: "#ebebeb",
        side: "#ffffff",
        sideInk: "#18181b",
        sideMuted: "#737373",
        accent: "#f6821f",
        accentFill: "#f6821f",
        accentInk: "#ffffff",
        plate: "#fafafa",
      },
    },
  },
  {
    id: "espresso",
    name: "Espresso",
    note: "Cream paper and dark roast, amber glow",
    isNew: true,
    fixedMode: "light",
    mark: "#f59e0b",
    radius: "10px",
    pill: "8px",
    palettes: {
      light: {
        bg: "#f8f2e7",
        card: "#fffcf6",
        ink: "#2a2018",
        muted: "#7a6a55",
        line: "#e6d9c0",
        side: "#1f1812",
        sideInk: "#f6ead3",
        sideMuted: "#b8a586",
        accent: "#b45309",
        accentFill: "#2a2018",
        accentInk: "#fbbf24",
        plate: "linear-gradient(180deg, #fffdf8, #f6eedf)",
      },
      dark: {
        bg: "#f8f2e7",
        card: "#fffcf6",
        ink: "#2a2018",
        muted: "#7a6a55",
        line: "#e6d9c0",
        side: "#1f1812",
        sideInk: "#f6ead3",
        sideMuted: "#b8a586",
        accent: "#b45309",
        accentFill: "#2a2018",
        accentInk: "#fbbf24",
        plate: "linear-gradient(180deg, #fffdf8, #f6eedf)",
      },
    },
  },
  {
    id: "phosphor",
    name: "Phosphor",
    note: "Amber terminal, mono labels, square corners",
    isNew: true,
    fixedMode: "dark",
    radius: "2px",
    pill: "2px",
    palettes: {
      light: {
        bg: "#0d0b08",
        card: "#15110b",
        ink: "#f5c66b",
        muted: "#a8875a",
        line: "#2a2218",
        side: "#0d0b08",
        sideInk: "#f5c66b",
        sideMuted: "#a8875a",
        accent: "#ffb000",
        accentFill: "#ffb000",
        accentInk: "#0d0b08",
        plate: "linear-gradient(180deg, #f7ecd3, #ecdbb6)",
      },
      dark: {
        bg: "#0d0b08",
        card: "#15110b",
        ink: "#f5c66b",
        muted: "#a8875a",
        line: "#2a2218",
        side: "#0d0b08",
        sideInk: "#f5c66b",
        sideMuted: "#a8875a",
        accent: "#ffb000",
        accentFill: "#ffb000",
        accentInk: "#0d0b08",
        plate: "linear-gradient(180deg, #f7ecd3, #ecdbb6)",
      },
    },
  },
  {
    id: "classic",
    name: "Classic",
    note: "Olive and gold, the original look",
    radius: "10px",
    pill: "8px",
    palettes: {
      light: {
        bg: "#fcfcfb",
        card: "#f7f1e5",
        ink: "#26291a",
        muted: "#7a735f",
        line: "#e8dcc0",
        side: "#2e3417",
        sideInk: "#f3ecd8",
        sideMuted: "#b5ad8e",
        accent: "#a87e25",
        accentFill: "#c89c3d",
        accentInk: "#1d1a10",
        plate: "linear-gradient(180deg, #fbf7ee, #efe5cf)",
      },
      dark: {
        bg: "#18150f",
        card: "#211d15",
        ink: "#f3eee2",
        muted: "#a69d86",
        line: "rgb(255 240 200 / 10%)",
        side: "#12100b",
        sideInk: "#f3eee2",
        sideMuted: "#a69d86",
        accent: "#d6ac52",
        accentFill: "#c89c3d",
        accentInk: "#1d1a10",
        plate: "radial-gradient(circle at 50% 35%, #2e291e, #1a1711 70%)",
      },
    },
  },
  {
    id: "modern",
    name: "Modern",
    note: "Quiet greys and system blue",
    radius: "12px",
    pill: "8px",
    palettes: {
      light: {
        bg: "#f5f5f7",
        card: "#ffffff",
        ink: "#1d1d1f",
        muted: "#6e6e73",
        line: "#e5e5ea",
        side: "#ffffff",
        sideInk: "#1d1d1f",
        sideMuted: "#6e6e73",
        accent: "#0071e3",
        accentFill: "#0071e3",
        accentInk: "#ffffff",
        plate: "#f5f5f7",
      },
      dark: {
        bg: "#0d0d0f",
        card: "#1c1c1e",
        ink: "#f5f5f7",
        muted: "#98989d",
        line: "rgb(255 255 255 / 9%)",
        side: "#141416",
        sideInk: "#f5f5f7",
        sideMuted: "#98989d",
        accent: "#0a84ff",
        accentFill: "#0a84ff",
        accentInk: "#ffffff",
        plate: "#2c2c2e",
      },
    },
  },
  {
    id: "alloy",
    name: "Alloy",
    note: "Black and gold",
    radius: "4px",
    pill: "4px",
    palettes: {
      light: {
        bg: "#101010",
        card: "#1d1c19",
        ink: "#ece7da",
        muted: "#8c816b",
        line: "#39352d",
        side: "#080808",
        sideInk: "#ece7da",
        sideMuted: "#8c816b",
        accent: "#d6b76a",
        accentFill: "#d6b76a",
        accentInk: "#141210",
        plate: "linear-gradient(180deg, #e6e3dc, #d3cfc6)",
      },
      dark: {
        bg: "#080808",
        card: "#1d1c19",
        ink: "#ece7da",
        muted: "#8c816b",
        line: "#39352d",
        side: "#050505",
        sideInk: "#ece7da",
        sideMuted: "#8c816b",
        accent: "#d6b76a",
        accentFill: "#d6b76a",
        accentInk: "#141210",
        plate: "linear-gradient(180deg, #e6e3dc, #d3cfc6)",
      },
    },
  },
]

const navItems = [
  { icon: LayoutGrid, label: "Collection", count: "48" },
  { icon: Images, label: "Studio" },
  { icon: ChartColumn, label: "Insights" },
  { icon: Columns2, label: "Compare", count: "3" },
  { icon: History, label: "Logs" },
]

const stats = [
  { label: "Knives", value: "48" },
  { label: "Makers", value: "17" },
  { label: "Steels", value: "12" },
  { label: "Avg blade", value: "3.2″" },
]

const knives = [
  {
    maker: "Benchmade",
    model: "Bugout 535",
    steel: "S30V",
    blade: "3.24″",
    lock: "AXIS",
  },
  {
    maker: "Spyderco",
    model: "Para 3",
    steel: "CPM S45VN",
    blade: "2.95″",
    lock: "Compression",
  },
  {
    maker: "Chris Reeve",
    model: "Sebenza 31",
    steel: "Magnacut",
    blade: "3.61″",
    lock: "Frame",
  },
]

const inspectorTabs = ["Overview", "Specs", "Maintenance", "History"]

const alsoNew = [
  {
    title: "Style name under the logo",
    body: "The active style shows in small caps under the BladeVault wordmark, so you always know which look is on.",
  },
  {
    title: "Tabbed knife inspector",
    body: "Overview, Specifications, Maintenance, and History tabs keep the side panel short. Classic gets a Maintenance tab.",
  },
  {
    title: "One card-size toggle",
    body: "A single button switches between large and compact cards in every theme. Table and List stay one click away.",
  },
  {
    title: "Pin and Compare in reach",
    body: "Pin and Compare sit right in the inspector, and Compare and Logs have new icons across the app.",
  },
]

function KnifeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 36"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Handle with a lanyard hole */}
      <path
        fillRule="evenodd"
        d="M6 18c0-4 3-7 7-7h40c3 0 5 1 6 3v8c-1 2-3 3-6 3H15c-6 0-9-3-9-7zm7 0a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Drop-point blade with pivot */}
      <path
        fillRule="evenodd"
        d="M55 12h39c9 0 17 2 23 5-8 6-24 9-43 9H58c-2 0-3-1-3-3V12zm3 6a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0z"
        fill="currentColor"
      />
      <path
        d="M66 21.5c16 0 32-1 46-4"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
    </svg>
  )
}

function themeVars(theme: ThemeStyle, mode: Mode) {
  const p = theme.palettes[theme.fixedMode ?? mode]

  return {
    "--t-bg": p.bg,
    "--t-card": p.card,
    "--t-ink": p.ink,
    "--t-muted": p.muted,
    "--t-line": p.line,
    "--t-side": p.side,
    "--t-side-ink": p.sideInk,
    "--t-side-muted": p.sideMuted,
    "--t-accent": p.accent,
    "--t-accent-fill": p.accentFill,
    "--t-accent-ink": p.accentInk,
    "--t-mark": theme.mark ?? p.accentFill,
    "--t-plate": p.plate,
    "--t-radius": theme.radius,
    "--t-pill": theme.pill,
  } as CSSProperties
}

export function HomepageThemes() {
  const [activeId, setActiveId] = useState(themes[0].id)
  const [mode, setMode] = useState<Mode>("dark")

  const active = themes.find((theme) => theme.id === activeId) ?? themes[0]
  const shownMode: Mode = active.fixedMode ?? mode
  const newCount = themes.filter((theme) => theme.isNew).length

  return (
    <section id="themes" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          <span className={base.sectionNum} aria-hidden="true">
            04
          </span>
          Appearance
          <span className={styles.newTag}>{newCount} new styles</span>
        </p>
        <h2>Nine ways to see the vault.</h2>
        <p className={base.sectionIntro}>
          Forge, Titanium, Field, Lumen, Espresso, and Phosphor join Classic,
          Modern, and Alloy. Switch in Settings &rarr; Appearance at any time.
          The look changes; your records, columns, and start page stay put.
        </p>
      </div>

      <div className={styles.stage}>
        <div className={styles.picker}>
          <div
            className={styles.themeList}
            role="radiogroup"
            aria-label="Preview a theme style"
          >
            {themes.map((theme) => {
              const selected = theme.id === active.id
              const swatch = theme.palettes[theme.fixedMode ?? mode]

              return (
                <button
                  key={theme.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={cn(
                    styles.themeOption,
                    selected && styles.isActive
                  )}
                  onClick={() => setActiveId(theme.id)}
                >
                  <span
                    className={styles.swatch}
                    style={{ background: swatch.bg }}
                    aria-hidden="true"
                  >
                    <span
                      className={styles.swatchRail}
                      style={{ background: swatch.side }}
                    />
                    <span className={styles.swatchBody}>
                      <span
                        className={styles.swatchTitle}
                        style={{ background: theme.mark ?? swatch.accentFill }}
                      />
                      <span
                        className={styles.swatchCard}
                        style={{
                          background: swatch.card,
                          borderColor: swatch.line,
                        }}
                      />
                    </span>
                  </span>
                  <span className={styles.themeMeta}>
                    <span className={styles.themeName}>
                      {theme.name}
                      {theme.isNew ? (
                        <span className={styles.newBadge}>New</span>
                      ) : null}
                    </span>
                    <span className={styles.themeNote}>{theme.note}</span>
                  </span>
                  {selected ? (
                    <Check className={styles.themeCheck} aria-hidden="true" />
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className={styles.modeRow}>
            <div
              className={styles.modeToggle}
              role="radiogroup"
              aria-label="Preview color mode"
            >
              {(["light", "dark"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={shownMode === value}
                  disabled={
                    Boolean(active.fixedMode) && value !== active.fixedMode
                  }
                  className={cn(
                    styles.modeButton,
                    shownMode === value && styles.isActive
                  )}
                  onClick={() => setMode(value)}
                >
                  {value === "light" ? (
                    <Sun aria-hidden="true" />
                  ) : (
                    <Moon aria-hidden="true" />
                  )}
                  {value === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
            <p className={styles.modeNote} aria-live="polite">
              {active.fixedMode
                ? `${active.name} is ${active.fixedMode} only.`
                : "This style follows light and dark mode."}
            </p>
          </div>
        </div>

        <figure className={styles.preview} style={themeVars(active, mode)}>
          <div
            className={styles.window}
            data-theme={active.id}
            aria-label={`BladeVault Collection in the ${active.name} style, ${shownMode} mode`}
            role="img"
          >
            <div className={styles.windowBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>BladeVault / Collection</span>
              <span>{active.name}</span>
            </div>

            <div className={styles.app}>
              <aside className={styles.sidebar}>
                <span className={styles.brand}>
                  <span className={styles.brandMark} />
                  <span className={styles.brandText}>
                    BladeVault
                    <small>{active.name}</small>
                  </span>
                </span>
                <ul className={styles.nav}>
                  {navItems.map(({ icon: Icon, label, count }, index) => (
                    <li
                      key={label}
                      className={cn(index === 0 && styles.navActive)}
                    >
                      <Icon />
                      <span>{label}</span>
                      {count ? <b>{count}</b> : null}
                    </li>
                  ))}
                </ul>
                <span className={styles.sideLabel}>Pinned</span>
                <ul className={styles.pinned}>
                  {knives.slice(0, 2).map((knife) => (
                    <li key={knife.model}>
                      <span className={styles.pinThumb}>
                        <KnifeGlyph />
                      </span>
                      {knife.model}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className={styles.main}>
                <div className={styles.toolbar}>
                  <strong>Collection</strong>
                  <span className={styles.search}>
                    <Search />
                    Search knives
                  </span>
                  <span className={styles.addButton}>
                    <Plus />
                    Add knife
                  </span>
                </div>

                <dl className={styles.stats}>
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt>{stat.label}</dt>
                      <dd>{stat.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className={styles.cards}>
                  {knives.map((knife, index) => (
                    <div
                      key={knife.model}
                      className={cn(
                        styles.card,
                        index === 0 && styles.cardSelected
                      )}
                    >
                      <span className={styles.plate}>
                        <KnifeGlyph className={styles.knife} />
                      </span>
                      <span className={styles.maker}>{knife.maker}</span>
                      <span className={styles.model}>{knife.model}</span>
                      <span className={styles.specs}>
                        <span>{knife.steel}</span>
                        <span>{knife.blade}</span>
                        <span>{knife.lock}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className={styles.inspector}>
                <span className={styles.maker}>{knives[0].maker}</span>
                <span className={styles.inspectorTitle}>{knives[0].model}</span>
                <span className={styles.inspectorActions}>
                  <span>
                    <Pin />
                    Pin
                  </span>
                  <span>
                    <Columns2 />
                    Compare
                  </span>
                </span>
                <span className={styles.tabs}>
                  {inspectorTabs.map((tab, index) => (
                    <span
                      key={tab}
                      className={cn(index === 2 && styles.tabActive)}
                    >
                      {tab}
                    </span>
                  ))}
                </span>
                <span className={styles.logRow}>
                  <b>Sharpened</b>
                  <span>Nov 2 · 17° · 1000 grit</span>
                </span>
                <span className={styles.logRow}>
                  <b>Cleaned + oiled</b>
                  <span>Oct 18 · pivot, washers</span>
                </span>
                <span className={styles.logRow}>
                  <b>Stropped</b>
                  <span>Oct 4 · 12 passes</span>
                </span>
              </aside>
            </div>
          </div>
          <figcaption className={styles.caption}>
            Preview of the {active.name} style. Colors come from the app&rsquo;s
            own theme tokens.
          </figcaption>
        </figure>
      </div>

      <div className={styles.alsoNew}>
        <p className={styles.alsoNewLabel}>Also new in the app</p>
        <ul>
          {alsoNew.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
