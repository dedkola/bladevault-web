import Image from "next/image"

import styles from "./homepage-v3.module.css"

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
          The same collection, on the machines you already use. Open the vault
          in a browser on your Mac, iPad, or phone &mdash; no second database,
          no export, no sync service.
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
              alt="BladeVault Collection on macOS with the knife table and inspector open"
              width={1440}
              height={900}
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
              width={1024}
              height={768}
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
              width={390}
              height={844}
              sizes="(min-width: 1180px) 15vw, (min-width: 900px) 20vw, 48vw"
              quality={90}
              className={styles.deviceIphoneImage}
            />
          </div>
        </figure>
      </div>

      <div className={styles.deviceLegend} aria-label="Supported screens">
        <span>macOS</span>
        <span>iPad</span>
        <span>iPhone</span>
      </div>
      <p className={styles.deviceNote}>
        Browser-ready on iPad and iPhone. The vault runs where you host it, so
        the same records open on every screen.
      </p>
    </section>
  )
}
