"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface PlatformCodePopoverProps {
  platformName: string
  snippet: {
    import: string
    usage: string
  }
  isVisible: boolean
}

export default function PlatformCodePopover({
  platformName,
  snippet,
  isVisible,
}: PlatformCodePopoverProps) {
  const [copied, setCopied] = useState(false)

  const fullCode = `${snippet.import}\n\n${snippet.usage}`

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(fullCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (e) {
      console.error("[v0] Copy failed", e)
    }
  }

  if (!isVisible) return null

  return (
    <div className="t-platform-popover">
      <div className="t-popover-header">
        <span className="t-popover-platform-name">{platformName}</span>
      </div>
      <div className="t-popover-code-block">
        <pre className="t-popover-code-pre">{fullCode}</pre>
      </div>
      <div className="t-popover-footer">
        <button
          onClick={onCopy}
          className="t-popover-copy-btn"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="t-popover-icon" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="t-popover-icon" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
