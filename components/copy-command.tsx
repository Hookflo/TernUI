"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

export default function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (e) {
      // Optional: could show a toast in a future pass
      console.error("[v0] Copy failed", e)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy install command"}
      className="text-muted-foreground hover:text-foreground hover:bg-muted/60"
    >
        
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}
