import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Github,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

const commandExamples = [
  {
    title: "Install once",
    command: "npm i @hookflo/tern",
    note: "Lightweight package, no runtime bloat.",
  },
  {
    title: "Initialize in seconds",
    command: "npx tern-dev init",
    note: "Scaffold verification flow with sensible defaults.",
  },
  {
    title: "Run locally",
    command: "npx tern-dev dev --inspect-signatures",
    note: "Debug signatures and payloads with readable logs.",
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Security-first verification",
    description:
      "Constant-time comparisons, replay protection, and opinionated defaults so teams can ship secure webhook flows confidently.",
  },
  {
    icon: Rocket,
    title: "Fast CLI workflows",
    description:
      "From install to production-grade setup in minutes. Commands are designed for developers under deadline pressure.",
  },
  {
    icon: Code2,
    title: "Framework-friendly architecture",
    description:
      "Use Tern across Next.js, Hono, Cloudflare Workers, Express, and custom runtimes with consistent behavior.",
  },
  {
    icon: Zap,
    title: "DX polished for teams",
    description:
      "Helpful errors, predictable command output, and generated templates make onboarding new engineers dramatically easier.",
  },
];

const outcomes = [
  "Reduce webhook integration time from days to hours.",
  "Present a consistent verification standard across all products.",
  "Avoid fragile copy-paste middleware and one-off scripts.",
  "Scale from a side project to enterprise workload cleanly.",
];

export default function HomePage() {
  return (
    <main className="bg-stone-50 text-stone-900">
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.16),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_45%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.2fr_1fr] lg:px-10 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-medium text-stone-700">
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              Brand launch ready landing experience
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-stone-950 md:text-6xl">
              Build trust in every webhook with
              <span className="block text-teal-700">Tern CLI</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
              Tern helps teams ship robust webhook verification faster. This page is redesigned end-to-end to showcase your CLI as a premium,
              launch-ready developer product.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="https://github.com/Hookflo/tern-dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black"
              >
                <Github className="h-4 w-4" />
                View tern-dev repository
              </Link>

              <Link
                href="/cli"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:-translate-y-0.5 hover:border-stone-400"
              >
                Explore CLI docs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.55)]">
            <div className="mb-4 flex items-center gap-2 border-b border-stone-100 pb-4 text-sm font-semibold text-stone-700">
              <Terminal className="h-4 w-4 text-teal-700" />
              High-signal CLI workflow
            </div>

            <div className="space-y-3">
              {commandExamples.map((item) => (
                <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{item.title}</p>
                  <code className="mt-1 block rounded-md bg-stone-900 px-3 py-2 text-sm text-emerald-300">$ {item.command}</code>
                  <p className="mt-2 text-sm text-stone-600">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Why teams choose Tern</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">From hero to bottom: premium product storytelling</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Impact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">What this redesign communicates</h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              The landing page now presents tern-dev as an enterprise-grade CLI with a clear narrative: reliability, speed, and developer trust.
            </p>
          </div>

          <ul className="space-y-3">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal-700" />
                <span className="text-sm leading-relaxed text-stone-700">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-3xl border border-stone-200 bg-gradient-to-r from-stone-900 to-stone-800 p-8 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">Launch CTA</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">Ship your new CLI brand with a page that looks as strong as your product.</h2>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="https://github.com/Hookflo/tern-dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5"
            >
              <Github className="h-4 w-4" />
              Star tern-dev on GitHub
            </Link>
            <Link
              href="/cli"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50"
            >
              Open CLI integration page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
