import Image from "next/image"
import Link from "next/link"

import styles from "./homepage-v3.module.css"

const steps = [
  {
    number: "01",
    title: "Paste the product URL",
    body: "A supported retailer page is enough. Batch scrape takes a list of links when you have more than one.",
    image: "/screenshots/live/add-empty-crop-3x.jpg",
    alt: "BladeVault Add knife screen with the Scrape URL tab and an empty product URL field",
    width: 3642,
    height: 2340,
  },
  {
    number: "02",
    title: "BladeVault reads the page",
    body: "Title, brand, price, specifications, and images are pulled in while you wait. The source page is captured too.",
    image: "/screenshots/live/add-result-crop-3x.jpg",
    alt: "BladeVault after reading a Vosteed product page, with the form filled and the scraped page preview open",
    width: 3642,
    height: 2340,
  },
  {
    number: "03",
    title: "Review, choose images, save",
    body: "Every field stays editable. Keep the source-page preview, pick the cover, and save the knife to the vault.",
    checks: [
      "Every field editable",
      "12 images selectable",
      "Source preview saved",
    ],
  },
] as const

const resultTags = [
  "12 images",
  "Brand",
  "Model",
  "Price",
  "Specs",
  "Source preview",
]

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
            alt="BladeVault after scraping a Vosteed Raccoon TiSlim page: filled identity fields, a scraped page preview, and a library of 12 selectable images"
            width={4320}
            height={2700}
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

      <div className={styles.importFoot}>
        <span>
          <b>Have a list?</b> Batch scrape one URL per line.
        </span>
        <Link href="/docs/guides/add-knife-in-manual-mode">
          No product page? Add it manually &rarr;
        </Link>
      </div>
    </section>
  )
}
