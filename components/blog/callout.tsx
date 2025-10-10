import type React from "react"
import { cn } from "@/lib/utils"

export function Callout({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4", className)} role="note" aria-label={title}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}
