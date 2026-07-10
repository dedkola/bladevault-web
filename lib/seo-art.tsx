import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { CSSProperties, ReactElement } from "react"

const brand = {
  olive: "#2e3417",
  gold: "#c89c3d",
  parchment: "#f8f4eb",
  parchmentSoft: "#efe7d4",
  line: "#d3c097",
  ink: "#18140f",
  muted: "#69583a",
  card: "#f5efdf",
} as const

const screenshotCache = new Map<string, Promise<string>>()

function BladeVaultMark({ size }: { size: number }): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.8 6.6 4.6 2.9c-.1-.2.1-.6.4-.6h6.6c.1 0 .3-.1.4-.2l.9-1.5c.1-.3-.1-.6-.5-.6H.7C.4 0 .2.3.4.6l4.4 7.6c.1.2.5.3.6.1l1.2-1.2c.2-.1.2-.3.2-.5ZM8.1 13.9l1.1 1.9c.2.3.6.3.7 0l1-1.7c.1-.1.1-.3 0-.4l-.8-1.4c-.1-.3-.4-.3-.6-.1l-1.2 1.2c-.2.2-.2.4-.1.5Z"
        fill={brand.olive}
      />
      <path
        d="M14.4 5.5c-.9.9-1.8 1.8-2.7 2.7-.2.2-.4.2-.7 0-.2-.2-.4-.2-.6 0-.2.2-.5.2-.7 0C9.4 8 9.2 7.7 8.9 7.5 8.8 7.3 8.8 7.2 8.9 7c.6-.6 1.3-1.3 1.9-1.9C12.2 3.7 13.6 2.3 15 1c.2-.2.4-.2.5.1.1.4.2.9.2 1.4 0 1.1-.5 2.1-1.3 3ZM14.5 2.9c-.1 0-.2 0-.2.2-.2.8-.7 1.4-1.3 2-.2.2-.3.3-.5.5-.1.1-.1.3 0 .3.1.1.2.1.3 0 .3-.3.7-.7 1-1 .4-.4.7-1 .9-1.6v-.1c0-.2-.1-.3-.2-.3ZM5.4 13.6h-.1c-.6-.1-1-.4-1.1-.9-.2-.5 0-.9.4-1.3C5.8 10.2 7 9 8.2 7.8c.2-.2.3-.2.4 0 .3.3.7.7 1 1 .4.4.4.8-.2.9-.2.1-.4.3-.6.5-.7 1.1-1.5 2.1-2.4 3-.3.2-.6.4-1 .4Zm0-1.5c-.2 0-.3.2-.3.3 0 .2.1.3.3.3.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3Z"
        fill={brand.gold}
      />
    </svg>
  )
}

async function readPublicImageAsDataUrl(relativePath: string) {
  const cached = screenshotCache.get(relativePath)

  if (cached) {
    return cached
  }

  const promise = readFile(
    join(process.cwd(), "public", relativePath.replace(/^\//, ""))
  ).then((buffer) => `data:image/png;base64,${buffer.toString("base64")}`)

  screenshotCache.set(relativePath, promise)

  return promise
}

function chipStyle(): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 16px",
    borderRadius: 999,
    border: `1px solid ${brand.line}`,
    backgroundColor: "rgba(255,255,255,0.7)",
    color: brand.olive,
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  }
}

export function createIconResponse(size: number) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: brand.parchment,
        backgroundImage:
          "radial-gradient(circle at top, rgba(200,156,61,0.16), transparent 55%)",
      }}
    >
      <div
        style={{
          width: Math.round(size * 0.78),
          height: Math.round(size * 0.78),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: Math.round(size * 0.22),
          border: `${Math.max(2, Math.round(size * 0.02))}px solid ${brand.line}`,
          backgroundColor: brand.parchmentSoft,
          boxShadow: "0 18px 42px rgba(46,52,23,0.14)",
        }}
      >
        <BladeVaultMark size={Math.round(size * 0.42)} />
      </div>
    </div>,
    {
      width: size,
      height: size,
    }
  )
}

type SocialImageOptions = {
  eyebrow: string
  title: string
  description: string
  screenshotPath: string
}

export async function createSocialImageResponse({
  eyebrow,
  title,
  description,
  screenshotPath,
}: SocialImageOptions) {
  const screenshotSrc = await readPublicImageAsDataUrl(screenshotPath)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: brand.parchment,
        color: brand.ink,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(200,156,61,0.18), rgba(255,255,255,0) 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -90,
          width: 360,
          height: 360,
          borderRadius: 999,
          backgroundColor: "rgba(46,52,23,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: 999,
          backgroundColor: "rgba(200,156,61,0.12)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "52px",
          gap: "36px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: 74,
                height: 74,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 22,
                border: `1px solid ${brand.line}`,
                backgroundColor: "rgba(255,255,255,0.72)",
              }}
            >
              <BladeVaultMark size={38} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: brand.gold,
                }}
              >
                {eyebrow}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                BladeVault
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              maxWidth: 520,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.35,
                color: brand.muted,
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div style={chipStyle()}>Local-first</div>
            <div style={chipStyle()}>Desktop app</div>
            <div style={chipStyle()}>Knife collection</div>
          </div>
        </div>

        <div
          style={{
            width: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 460,
              display: "flex",
              overflow: "hidden",
              borderRadius: 34,
              border: `1px solid ${brand.line}`,
              backgroundColor: brand.card,
              boxShadow: "0 26px 60px rgba(46,52,23,0.16)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotSrc}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
