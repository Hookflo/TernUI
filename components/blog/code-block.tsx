import { cn } from "@/lib/utils"

type Props = {
  children: string
  language?: "ts" | "js" | "json" | "diff" | "bash" | string
  className?: string
}

export function CodeBlock({ children, language, className }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-accent/30 bg-secondary/40", className)}>
      <div className="flex items-center justify-between border-b border-accent/30 bg-accent/10 px-3 py-1.5">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {language ? language : "code"}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code>{children}</code>
      </pre>
    </div>
  )
}
