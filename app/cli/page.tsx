"use client";

import SiteNav from "@/components/site-nav";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Github,
  Lock,
  Repeat2,
  ShieldCheck,
  Terminal,
  Timer,
  Zap,
} from "lucide-react";
import { useState } from "react";

const installCommand = "npx @hookflo/tern-dev --port 3000";

const features = [
  {
    icon: Zap,
    title: "Instant tunnel URL",
    description: "Start in seconds and receive webhooks at a public HTTPS endpoint mapped to localhost.",
  },
  {
    icon: ShieldCheck,
    title: "Signature verification",
    description: "Validate webhook signatures for Stripe, GitHub, Clerk, and custom integrations.",
  },
  {
    icon: Repeat2,
    title: "Replay and debug",
    description: "Resend failed events and iterate quickly without waiting for providers to retry.",
  },
  {
    icon: Lock,
    title: "Zero persistence",
    description: "Events stay in memory during your session and disappear when you stop the CLI.",
  },
];

const quickSteps = [
  "Run tern and forward to your local app on port 3000.",
  "Copy the generated tunnel URL into your webhook provider.",
  "Open the local dashboard and inspect each request in real time.",
];

export default function CLIPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteNav />

      <main>
        <section className="border-b border-stone-200 bg-[radial-gradient(circle_at_top_left,#fde6d6_0%,#f6deeb_40%,#e4eaf8_100%)]">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">
                <span className="h-px w-6 bg-stone-500" />
                CLI Tool
              </p>
              <h1 className="text-4xl font-medium leading-tight tracking-tight text-stone-950 md:text-5xl">
                Test webhooks locally with a faster, cleaner workflow.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-stone-700">
                Tern gives you an instant public tunnel, a local dashboard, replay controls, and secure signature checks —
                all without relying on long-lived third-party storage.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/Hookflo/tern-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
                >
                  <Github size={16} />
                  View GitHub
                </a>
                <a
                  href="https://www.npmjs.com/package/@hookflo/tern-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:border-stone-500"
                >
                  <Download size={16} />
                  View on npm
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm backdrop-blur">
              <div className="mb-3 flex items-center justify-between text-xs font-medium text-stone-500">
                <span className="inline-flex items-center gap-2">
                  <Terminal size={14} />
                  Quick start
                </span>
                <span>Copy command</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 rounded-lg bg-stone-950 p-4 text-sm text-stone-100">
                <code className="min-w-0 flex-1 break-all font-mono text-xs md:text-sm">{installCommand}</code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded-md border border-cyan-800/60 bg-cyan-900/20 px-2.5 py-1.5 text-xs font-medium text-cyan-200 transition hover:bg-cyan-900/40"
                  title="Copy install command"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="mt-4 space-y-2 rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs text-stone-700">
                <p>
                  <span className="font-semibold text-stone-900">Tunnel:</span> https://abc123.relay.tern.hookflo.com
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Dashboard:</span> http://localhost:2019
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Forwarding:</span> localhost:3000
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Why teams use Tern</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-stone-950">Built for local webhook development, not just tunneling.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-stone-300">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-medium text-stone-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-700">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-start lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">How it works</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-stone-950">From zero to receiving live events in under a minute.</h2>
              <ul className="mt-6 space-y-3">
                {quickSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm leading-6 text-stone-700">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-medium text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-950 text-stone-100 shadow-sm">
              <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-3 text-xs text-stone-400">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2">terminal</span>
              </div>
              <pre className="overflow-x-auto px-4 py-5 text-xs leading-6 text-stone-200 md:text-sm">
{`$ npx @hookflo/tern-dev --port 3000

✓ relay connected
✓ dashboard ready at http://localhost:2019
✓ forwarding POST /webhook to localhost:3000

[12:33:04] POST /stripe/webhook   200   2.4ms
[12:33:07] POST /github/events    500  45.1ms
[12:33:09] POST /custom/handler   202   1.8ms`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
          <div className="rounded-2xl border border-stone-200 bg-stone-900 px-6 py-10 text-stone-100 md:px-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Ready to try it</p>
                <h2 className="mt-3 text-3xl font-medium tracking-tight">Use Tern CLI in your next webhook integration.</h2>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  Works great for payment, auth, and event-driven testing loops where fast iteration matters.
                </p>
              </div>
              <a
                href="https://github.com/Hookflo/tern-dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-200"
              >
                Start now
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-stone-700 bg-stone-800/70 p-3 text-sm">
                <p className="text-stone-400">Median latency</p>
                <p className="mt-1 text-lg font-semibold">&lt;100ms</p>
              </div>
              <div className="rounded-lg border border-stone-700 bg-stone-800/70 p-3 text-sm">
                <p className="text-stone-400">Storage footprint</p>
                <p className="mt-1 text-lg font-semibold">0 persisted events</p>
              </div>
              <div className="rounded-lg border border-stone-700 bg-stone-800/70 p-3 text-sm">
                <p className="text-stone-400">Session control</p>
                <p className="mt-1 inline-flex items-center gap-1 text-lg font-semibold">
                  <Timer size={16} />
                  Ctrl+C to reset
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
