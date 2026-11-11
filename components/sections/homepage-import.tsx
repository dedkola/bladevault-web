import Image from "next/image"
import Link from "next/link"

import styles from "./homepage-v3.module.css"

const steps = [
  {
    number: "01",
    title: "Paste the product link",
    body: "Add knife is a single link field. Paste a shop or maker page, or switch to batch scrape when you have a list.",
    image: "/screenshots/live/add-empty-crop-3x.jpg",
    alt: "BladeVault Add knife screen with a single product link field, plus Batch scrape, Import saved page, and Enter manually options",
    width: 2390,
    height: 1536,
  },
  {
    number: "02",
    title: "BladeVault reads the page",
    body: "Title, brand, model number, designer, price, specifications, and images are pulled in while you wait. The source page is captured too.",
    image: "/screenshots/live/add-result-crop-3x.jpg",
    alt: "BladeVault after reading a Vosteed Raccoon TiSlim page, with identity fields filled and the scraped page preview open",
    width: 2390,
    height: 1536,
  },
  {
    number: "03",
    title: "Review, choose images, save",
    body: "Every field stays editable. Keep the source-page preview, pick the cover, and save the knife to the vault.",
    checks: [
      "Every field editable",
      "Whole image library selectable",
      "Source preview saved",
    ],
  },
] as const

const resultTags = [
  "37 images",
  "Brand",
  "Model number",
  "Designer",
  "Price",
  "Specs",
  "Source preview",
]

// Stores with dedicated parsing, and maker sites the importer names the brand
// for. Keep in sync with lib/scrape.ts in dedkola/bladevault.
const tunedStores = [
  "Vosteed",
  "SOG",
  "Artisan Cutlery",
  "Straight Line EDC",
  "Poikilo Blade",
]

const makerSites = [
  "Spyderco",
  "Benchmade",
  "Kizer",
  "CIVIVI",
  "WE",
  "Microtech",
  "Chris Reeve",
  "Zero Tolerance",
  "Böker",
  "Buck",
  "Victorinox",
  "Fällkniven",
]

const moreMakerSites = 9

export function HomepageImport() {
  return (
    <section id="import" className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionKicker}>
          <span className={styles.sectionNum} aria-hidden="true">
            01
          </span>
          Auto scrape
        </p>
        <h2>Paste a link. Get a record.</h2>
        <p className={styles.sectionIntro}>
          BladeVault opens the product page, reads the specs and images, and
          drops them into an editable record. You review the details, choose the
          photos, and save. No field-by-field copying.
        </p>
      </div>

      <figure className={styles.scrapeResult}>
        <div className={styles.window}>
          <div className={styles.windowBar}>
            <span className={styles.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>BladeVault / Add knife</span>
            <span>Vosteed &middot; Raccoon TiSlim</span>
          </div>
          <Image
            src="/screenshots/live/add-result-3x.jpg"
            alt="BladeVault after scraping a Vosteed Raccoon TiSlim page: brand, model number, designer, and price filled in next to the scraped page preview"
            width={2880}
            height={1800}
            sizes="(min-width: 1180px) 980px, 94vw"
            quality={90}
            className={styles.scrapeResultImage}
          />
        </div>
        <figcaption className={styles.scrapeTags}>
          {resultTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </figcaption>
      </figure>

      <div className={styles.scrapeSteps}>
        {steps.map((step) => (
          <article key={step.number} className={styles.scrapeStep}>
            <span className={styles.stepNum} aria-hidden="true">
              {step.number}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            {"image" in step ? (
              <div className={styles.scrapeThumb}>
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  sizes="(min-width: 1180px) 33vw, (min-width: 700px) 50vw, 100vw"
                  quality={90}
                  className={styles.scrapeThumbImage}
                />
              </div>
            ) : null}
            {"checks" in step ? (
              <ul className={styles.stepChecks}>
                {step.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <div className={styles.retailerPanel}>
        <div>
          <h3>Where it works</h3>
          <p>
            Most knife shops work out of the box: BladeVault reads standard
            product data and understands Shopify and WooCommerce stores. If a
            popup or security check gets in the way, choose{" "}
            <b>Interact with page</b>, finish it yourself, and continue. For
            bot-protected shops, the desktop app opens the page in its own
            BladeVault browser, or you can import a page you saved with{" "}
            <b>File &rarr; Save Page As</b>.
          </p>
        </div>
        <div className={styles.retailerGroups}>
          <div>
            <span className={styles.retailerLabel}>Extra parsing for</span>
            <ul className={styles.retailerChips}>
              {tunedStores.map((store) => (
                <li key={store} data-tuned="">
                  {store}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className={styles.retailerLabel}>Maker sites recognized</span>
            <ul className={styles.retailerChips}>
              {makerSites.map((maker) => (
                <li key={maker}>{maker}</li>
              ))}
              <li>+{moreMakerSites} more</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.importFoot}>
        <span>
          <b>Have a list?</b> Batch scrape one URL per line. Links you already
          saved are skipped.
        </span>
        <Link href="/docs/guides/add-knife-in-manual-mode">
          No product page? Add it manually &rarr;
        </Link>
      </div>
    </section>
  )
}
