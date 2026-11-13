import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"

export const dynamic = "force-static"

const pageTitle = "Privacy Policy"
const pageDescription =
  "How BladeVault handles your data: a local-first app that stores your collection on your device, with opt-in Google Drive backups and error reporting."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/privacy",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
}

const supportEmail = "support@bladevault.pro"

const sections = [
  {
    id: "summary",
    title: "Summary",
    body: (
      <>
        <p>
          BladeVault is a local-first knife collection manager. Your collection
          (the database, photos, notes, and settings) is stored on your own
          device or server. You do not need an account to use BladeVault, and we
          do not sell, rent, or share your personal data.
        </p>
        <p>
          Data leaves your device only when you turn on a feature that needs it:
          Google Drive backup, product import from websites you choose, or crash
          and usage reporting.
        </p>
      </>
    ),
  },
  {
    id: "local-data",
    title: "Data stored on your device",
    body: (
      <p>
        Knife records, images, notes, collection settings, and local backups are
        written to a data folder on your computer or server. We have no access
        to this folder. You can export, back up, move, or delete it at any time.
      </p>
    ),
  },
  {
    id: "google-drive",
    title: "Google Drive backup",
    body: (
      <>
        <p>
          Google Drive backup is optional. If you choose{" "}
          <strong>Connect Google Drive</strong>, you sign in with Google and
          grant BladeVault the{" "}
          <code className="font-mono text-sm">drive.file</code> permission. This
          permission only lets BladeVault see and manage files that BladeVault
          itself creates. BladeVault cannot read, list, or change any other file
          in your Google Drive.
        </p>
        <p>With that access, BladeVault:</p>
        <ul>
          <li>
            creates a <strong>BladeVault</strong> folder in your Drive and
            uploads your backup archive (
            <code className="font-mono text-sm">bladevault-data.tar.gz</code>)
            to it;
          </li>
          <li>
            reads that archive’s name, size, and modification time to show
            backup status;
          </li>
          <li>downloads that archive when you ask to restore it.</li>
        </ul>
        <p>
          Backup archives travel directly between your BladeVault installation
          and Google Drive. They are never sent to or stored on BladeVault
          servers.
        </p>
        <p>
          To finish Google sign-in and renew access, BladeVault uses a small
          sign-in service at bladevault.pro that holds the app’s Google client
          secret. It receives the one-time sign-in code and the refresh token
          only to exchange them with Google, and does not store them. The
          refresh token is saved on your device in BladeVault’s private control
          folder, which is never included in backup archives.
        </p>
        <p>
          You can disconnect Google Drive in BladeVault at any time, which
          revokes the token with Google and deletes it from your device. You can
          also remove access from your{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
          >
            Google Account permissions
          </a>
          . Backup files already in your Drive remain yours to keep or delete.
        </p>
      </>
    ),
  },
  {
    id: "limited-use",
    title: "Google API Services User Data Policy",
    body: (
      <p>
        BladeVault’s use and transfer to any other app of information received
        from Google APIs will adhere to the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noreferrer"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements. Google user data is used only
        to provide the backup and restore feature you turned on. It is not used
        for advertising, not sold, not transferred to third parties, not used to
        train AI or machine learning models, and not read by humans except with
        your explicit permission for support, for security purposes, or where
        required by law.
      </p>
    ),
  },
  {
    id: "cloud-backup",
    title: "Discontinued BladeVault cloud backup",
    body: (
      <p>
        BladeVault previously offered an optional cloud backup service with a
        BladeVault account. That service has been discontinued, and the app no
        longer offers BladeVault account sign-in or uploads backups to
        BladeVault servers. Google Drive backup replaces it. If you used the old
        service and have a question about data from it, contact us using the
        details below.
      </p>
    ),
  },
  {
    id: "error-reporting",
    title: "Crash reports and usage statistics",
    body: (
      <>
        <p>
          BladeVault asks before sending anything. If you agree, crash and error
          reports and anonymous import statistics are sent to{" "}
          <a href="https://sentry.io" target="_blank" rel="noreferrer">
            Sentry
          </a>
          . Import statistics contain counts and website domains only, not full
          product addresses, knife details, or information about you.
        </p>
        <p>
          You can change your answer in{" "}
          <strong>Settings → About → Send error reports</strong>. Self-hosted
          servers can turn reporting off with{" "}
          <code className="font-mono text-sm">
            BLADEVAULT_ERROR_REPORTING=off
          </code>
          .
        </p>
      </>
    ),
  },
  {
    id: "product-import",
    title: "Product import and AI features",
    body: (
      <p>
        When you import a knife from a web address, BladeVault fetches that page
        directly from the store you chose. AI features use the provider and API
        key you configure, and send only the content needed for the request you
        make. Those providers’ own privacy policies apply to those requests.
      </p>
    ),
  },
  {
    id: "website",
    title: "This website",
    body: (
      <p>
        bladevault.pro uses Google Analytics to understand visits in aggregate
        (pages viewed, approximate location, device and browser type). It is
        hosted on Cloudflare, which processes standard request data such as IP
        address to serve and protect the site. Links to email support or GitHub
        take you to those services.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention and deletion",
    body: (
      <p>
        Local data stays until you delete it. Google Drive backups stay in your
        Drive until you delete them. Error reports are kept according to
        Sentry’s retention settings, typically 90 days.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Google sign-in uses OAuth with PKCE, connections use HTTPS, and Drive
        access is limited to files BladeVault creates. No system is perfectly
        secure, so keep your device and Google account protected.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        BladeVault is not directed to children under 13, and we do not knowingly
        collect their personal information.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this page when our data practices change and revise the
        date at the top. Significant changes will also be noted in the release
        notes.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions or deletion requests:{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
    ),
  },
] as const

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="BladeVault / Legal"
      title="Privacy Policy"
      updated="November 13, 2026"
      intro={
        <p>
          This policy explains what data the BladeVault apps (desktop, Docker,
          and server) and bladevault.pro collect, how it is used, and the
          choices you have.
        </p>
      }
      sections={sections}
    />
  )
}
