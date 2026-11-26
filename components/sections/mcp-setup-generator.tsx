"use client"

import { useState } from "react"
import { Check, ClipboardCopy } from "lucide-react"

import { copyText } from "@/lib/clipboard"
import {
  claudeCodeCommand,
  claudeDesktopConfig,
  genericClientConfig,
  needsAllowHttp,
  toMcpUrl,
} from "@/lib/mcp-setup"

import styles from "./homepage-chat.module.css"

// Builds the same MCP setup the app shows in Settings → AI / MCP, for the
// address a visitor types. Only the address is asked for: the token stays a
// placeholder so nobody pastes a secret into a web page.

type Client = "code" | "desktop" | "other"

const clients: { id: Client; label: string }[] = [
  { id: "code", label: "Claude Code" },
  { id: "desktop", label: "Claude Desktop" },
  { id: "other", label: "Other clients" },
]

const DEFAULT_ADDRESS = "http://192.168.1.20:5500"

export function McpSetupGenerator() {
  const [client, setClient] = useState<Client>("code")
  const [address, setAddress] = useState(DEFAULT_ADDRESS)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const url = toMcpUrl(address)
  const output = !url
    ? ""
    : client === "code"
      ? claudeCodeCommand(url)
      : client === "desktop"
        ? claudeDesktopConfig(url)
        : genericClientConfig(url)

  const copy = async () => {
    if (!output) return
    try {
      await copyText(output)
      setCopied(true)
      setCopyError(false)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError(true)
    }
  }

  return (
    <div className={styles.generator}>
      <div className={styles.genHead}>
        <h3>Connect a client in one paste.</h3>
        <p>
          Type the address you open BladeVault on. The token comes from Settings
          &rarr; AI / MCP and never goes into this page.
        </p>
      </div>

      <div className={styles.genTabs} role="tablist" aria-label="MCP client">
        {clients.map(({ id, label }) => (
          <button
            key={id}
            id={`mcp-gen-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={client === id}
            aria-controls="mcp-gen-panel"
            onClick={() => {
              setClient(id)
              setCopied(false)
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        id="mcp-gen-panel"
        role="tabpanel"
        aria-labelledby={`mcp-gen-tab-${client}`}
        className={styles.genPanel}
      >
        <label className={styles.genField}>
          <span>Server address</span>
          <input
            value={address}
            onChange={(event) => {
              setAddress(event.target.value)
              setCopied(false)
            }}
            spellCheck={false}
            autoComplete="off"
            inputMode="url"
            aria-invalid={!url || undefined}
            aria-describedby="mcp-gen-error"
          />
        </label>
        {!url ? (
          <p id="mcp-gen-error" className={styles.genError}>
            Enter an http or https address, like {DEFAULT_ADDRESS}
          </p>
        ) : null}

        <pre className={styles.genCode}>
          <code>{output || " "}</code>
        </pre>

        <div className={styles.genFoot}>
          <p>
            {client === "code" &&
              "Paste it into Terminal. --scope user adds BladeVault to every project."}
            {client === "desktop" && (
              <>
                Add it to <code>mcpServers</code> in{" "}
                <code>claude_desktop_config.json</code>, then quit and reopen
                Claude Desktop. Needs Node.js.
                {url && needsAllowHttp(url)
                  ? " Plain HTTP to another machine: use it only on a network you trust."
                  : ""}{" "}
                Using the BladeVault desktop app? Select Connect in Settings
                &rarr; AI / MCP instead.
              </>
            )}
            {client === "other" &&
              "For Cursor and other clients that take an mcpServers JSON config with a URL."}
          </p>
          <button
            type="button"
            onClick={copy}
            disabled={!output}
            className={styles.copy}
          >
            {copied ? (
              <Check aria-hidden="true" />
            ) : (
              <ClipboardCopy aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {copyError ? (
          <p className={styles.genError} role="alert">
            Couldn&apos;t copy. Select the text above and copy it yourself.
          </p>
        ) : null}
      </div>
    </div>
  )
}
