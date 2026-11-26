// Copy-ready MCP setup text for the homepage generator. Mirrors
// lib/mcp-client-setup.ts in dedkola/bladevault (Settings → AI / MCP), so the
// site hands out the same command and config the app shows.

export const TOKEN_PLACEHOLDER = "<TOKEN_FROM_BLADEVAULT_SETTINGS>"

const SERVER_NAME = "bladevault"
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"])

/**
 * Turns what a visitor typed ("192.168.1.20:5500", "http://nas.local:5500/")
 * into the server's /mcp endpoint, or null when it isn't an http(s) address.
 */
export function toMcpUrl(input: string): string | null {
  const raw = input.trim()
  if (!raw) return null
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw)
    ? raw
    : `http://${raw}`
  let url: URL
  try {
    url = new URL(withScheme)
  } catch {
    return null
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null
  if (!url.hostname || url.username || url.password) return null
  const path = url.pathname.replace(/\/+$/, "").replace(/\/mcp$/, "")
  return `${url.origin}${path}/mcp`
}

// mcp-remote refuses plain HTTP to anything but localhost without --allow-http.
export function needsAllowHttp(url: string): boolean {
  const parsed = new URL(url)
  return parsed.protocol === "http:" && !LOCAL_HOSTS.has(parsed.hostname)
}

export function claudeCodeCommand(url: string): string {
  return `claude mcp add --transport http --scope user ${SERVER_NAME} ${url} --header "Authorization: Bearer ${TOKEN_PLACEHOLDER}"`
}

export function claudeDesktopConfig(url: string): string {
  const args = [
    "-y",
    "mcp-remote",
    url,
    "--header",
    "Authorization:${AUTH_HEADER}",
  ]
  if (needsAllowHttp(url)) args.push("--allow-http")
  return JSON.stringify(
    {
      mcpServers: {
        [SERVER_NAME]: {
          command: "npx",
          args,
          env: { AUTH_HEADER: `Bearer ${TOKEN_PLACEHOLDER}` },
        },
      },
    },
    null,
    2
  )
}

export function genericClientConfig(url: string): string {
  return JSON.stringify(
    {
      mcpServers: {
        [SERVER_NAME]: {
          url,
          headers: { Authorization: `Bearer ${TOKEN_PLACEHOLDER}` },
        },
      },
    },
    null,
    2
  )
}
