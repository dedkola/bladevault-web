import Image from "next/image"
import Link from "next/link"

import styles from "./homepage-v3.module.css"

const accessSteps = [
  {
    number: "1",
    title: "Self-host the vault",
    body: (
      <>
        Run the Docker image or Helm chart on a Mac, PC, Linux server, NAS, or
        Unraid box that stays on.
      </>
    ),
  },
  {
    number: "2",
    title: "Open its address",
    body: (
      <>
        On iPad or iPhone, visit <code>http://&lt;server-ip&gt;:5500</code> in
        Safari while you&rsquo;re on the same network.
      </>
    ),
  },
  {
    number: "3",
    title: "Same records everywhere",
    body: (
      <>
        Every screen reads and writes one SQLite vault. Nothing to export or
        sync.
      </>
    ),
  },
]

export function HomepageDevices() {
  return (
    <section id="devices" className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionKicker}>
          <span className={styles.sectionNum} aria-hidden="true">
            02
          </span>
          Any screen
        </p>
        <h2>One vault. Every screen.</h2>
        <p className={styles.sectionIntro}>
          Use the desktop app on Mac, Windows, or Linux. Want it on the couch
          too? Run BladeVault on a home server and open the same vault in the
          browser on your iPad and iPhone &mdash; no second database, no sync
          service.
        </p>
      </div>

      <div className={styles.deviceStage}>
        <figure className={`${styles.device} ${styles.deviceMac}`}>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>BladeVault / Collection</span>
              <span>macOS</span>
            </div>
            <Image
              src="/screenshots/live/collection-desktop.jpg"
              alt="BladeVault Collection on macOS in the Lumen style, with the knife table, dual metric and imperial measurements, and the knife inspector open"
              width={2880}
              height={1800}
              sizes="(min-width: 1180px) 72vw, 100vw"
              quality={90}
              className={styles.deviceMacImage}
            />
          </div>
        </figure>

        <figure className={`${styles.device} ${styles.deviceIpad}`}>
          <div className={styles.deviceFrame}>
            <Image
              src="/screenshots/live/studio-ipad.jpg"
              alt="BladeVault Studio on an iPad in landscape, showing the collection in three columns"
              width={2048}
              height={1536}
              sizes="(min-width: 1180px) 36vw, (min-width: 900px) 40vw, 86vw"
              quality={90}
              className={styles.deviceIpadImage}
            />
          </div>
        </figure>

        <figure className={`${styles.device} ${styles.deviceIphone}`}>
          <div className={styles.deviceFrame}>
            <Image
              src="/screenshots/live/studio-iphone.jpg"
              alt="BladeVault Studio on an iPhone, showing the collection in two columns"
              width={1170}
              height={2532}
              sizes="(min-width: 1180px) 15vw, (min-width: 900px) 20vw, 48vw"
              quality={90}
              className={styles.deviceIphoneImage}
            />
          </div>
        </figure>
      </div>

      <div className={styles.deviceLegend} aria-label="Supported screens">
        <span>macOS app</span>
        <span>Windows app</span>
        <span>Linux app</span>
        <span>iPad browser</span>
        <span>iPhone browser</span>
      </div>

      <div className={styles.accessPanel}>
        <h3 className={styles.accessTitle}>How iPad and iPhone access works</h3>
        <ol className={styles.accessSteps}>
          {accessSteps.map((step) => (
            <li key={step.number} className={styles.accessStep}>
              <span className={styles.stepNum} aria-hidden="true">
                {step.number}
              </span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.accessFoot}>
          The desktop apps keep the vault private to that computer.{" "}
          <Link href="/docs/installation/docker">
            Set up Docker or Podman &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}
