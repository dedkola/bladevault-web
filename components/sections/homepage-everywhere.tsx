import { CloudUpload, LockKeyhole, MonitorSmartphone } from "lucide-react"

import { AppLockPanel } from "./app-lock-panel"
import { BackupPanel } from "./homepage-backup"
import { DevicesPanel } from "./homepage-devices"
import base from "./homepage-v3.module.css"
import { SectionTabs } from "./section-tabs"

// Devices, Google Drive backup and App lock in one section. Tab ids keep the
// old #devices and #backup anchors working.

export function HomepageEverywhere() {
  return (
    <section id="everywhere" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          <span className={base.sectionNum} aria-hidden="true">
            05
          </span>
          Every screen, backed up
        </p>
        <h2>One vault on every screen, safe in your own cloud.</h2>
        <p className={base.sectionIntro}>
          Use the desktop app on Mac, Windows or Linux, or self-host it and open
          the same vault on iPad and iPhone. Back it up to your own Google Drive
          and lock it when you step away.
        </p>
      </div>

      <SectionTabs
        label="Devices, backup and app lock"
        tabs={[
          {
            id: "devices",
            label: "Every screen",
            icon: <MonitorSmartphone aria-hidden="true" />,
            content: <DevicesPanel />,
          },
          {
            id: "backup",
            label: "Google Drive backup",
            icon: <CloudUpload aria-hidden="true" />,
            content: <BackupPanel />,
          },
          {
            id: "lock",
            label: "App lock",
            icon: <LockKeyhole aria-hidden="true" />,
            content: <AppLockPanel />,
          },
        ]}
      />
    </section>
  )
}
