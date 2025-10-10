import type React from "react"
import { cn } from "@/lib/utils"

type Props = {
  id?: string
  title: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, children, className }: Props) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-8", className)}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-foreground/90">{children}</div>
    </section>
  )
}
