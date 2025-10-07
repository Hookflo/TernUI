"use client"

import type React from "react"
import {
  GitBranch,
  Layers,
  KeyRound,
  ShieldCheck,
  Globe,
  Scale,
  Zap,
  FileCode,
  Repeat,
} from "lucide-react"

type Item = { icon: React.ReactNode; title: string; text: string }

function UseCaseItem({ icon, title, text }: Item) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent ">
        {icon}
      </span>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </li>
  )
}

export function UseCaseSection() {
  const useCases: Item[] = [
    {
      icon: <GitBranch className="h-4 w-4" />,
      title: "Seamless Platform Migration",
      text: "Switch from Stripe to Paddle or Supabase to Firebase without rewriting webhook logic. Tern normalizes payloads and keeps your integrations stable.",
    },
    {
      icon: <Layers className="h-4 w-4" />,
      title: "Payload Normalization",
      text: "Extract what matters, skip the metadata noise. Define once, reuse across environments — consistent structure for every event.",
    },
    {
      icon: <KeyRound className="h-4 w-4" />,
      title: "Signature Verification, Simplified",
      text: "No more signature-handling boilerplate. Built-in verifiers for GitHub, Stripe, Supabase, Clerk, and more.",
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Audit-Friendly by Design",
      text: "Zero dependencies mean full visibility. Every line of code is inspectable, every event is traceable.",
    },
    {
      icon: <Repeat className="h-4 w-4" />,
      title: "Self-Healing Event Handling",
      text: "Detect and recover from silent webhook failures automatically. Replay or repair events without losing data integrity.",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Plug & Play with Hookflo (Optional)",
      text: "Instantly connect to Hookflo’s no-code dashboard for webhook event alerting, logging, and replay — no backend setup required.",
    },
  ]

  return (
    <section id="use-cases" className="py-20 border-b">
      <div className="max-w-6xl mx-auto px-8">
        <header className="max-w-3xl">
          <h2 className="text-4xl tracking-tight text-balance">Use Cases at a Glance</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tern simplifies webhook infrastructure for everyone — from indie SaaS to Enterprises.
            Handle, verify, and migrate events with total confidence.
          </p>
        </header>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 max-w-5xl">
          {useCases.map((uc, i) => (
            <UseCaseItem key={i} {...uc} />
          ))}
        </ul>

        <div className="mt-12 border rounded-xl overflow-hidden max-w-5xl">
          <div className="grid md:grid-cols-3">
            <div className="p-4 bg-accent text-accent-foreground flex items-center gap-3">
              <Globe className="h-5 w-5" />
              <p className="text-xs">Cross-runtime ready — Node, Workers, Deno — one consistent API.</p>
            </div>
            <div className="p-4 bg-secondary text-secondary-foreground flex items-center gap-3">
              <Scale className="h-5 w-5" />
              <p className="text-xs">From prototypes to global clusters — same event reliability.</p>
            </div>
            <div className="p-4 bg-card text-card-foreground flex items-center gap-3 border-t md:border-t-0 md:border-l">
              <FileCode className="h-5 w-5" />
              <p className="text-xs">Fully auditable source, no transitive dependencies or version drift.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
