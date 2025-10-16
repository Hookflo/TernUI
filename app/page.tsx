"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Zap,
  Github,
  Code,
  Settings,
  Package,
  Star,
  GitBranch,
  Feather,
} from "lucide-react";
import Link from "next/link";
import { Geist_Mono, Doto } from "next/font/google";
import CopyCommand from "@/components/copy-command";
import { UseCaseSection } from "@/components/use-case";
import { TernBottomBanner } from "@/components/bottom-banner";

const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["300"] });
const doto = Doto({ subsets: ["latin"], weight: ["500"] });
const features = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Self-healing architecture",
    body: "Automatically detects and adapts to platform signature changes. No more broken webhooks when providers update their systems.",
    bgColor: "var(--accent)",
    fgColor: "var(--accent-foreground)",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Algorithm agnostic",
    body: "Supports HMAC-SHA256, HMAC-SHA1, HMAC-SHA512, and custom algorithms. One framework for all signature types.",
    bgColor: "var(--accent-2)",
    fgColor: "var(--accent-2-foreground)",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Platform specific",
    body: "Battle-tested implementations for Stripe, GitHub, Supabase, Clerk, and more — out of the box.",
    bgColor: "var(--accent-3)",
    fgColor: "var(--accent-3-foreground)",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Type safe",
    body: "Full TypeScript support with comprehensive types. Catch errors at compile time, not runtime.",
    bgColor: "var(--accent-4)",
    fgColor: "var(--accent-4-foreground)",
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Framework agnostic",
    body: "Works with Express.js, Next.js, Cloudflare Workers, Deno, and any modern JS runtime.",
    bgColor: "var(--accent-5)",
    fgColor: "var(--accent-5-foreground)",
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Zero dependencies",
    body: "Lightweight core with no external deps. Keep your bundle minimal and secure.",
    bgColor: "var(--accent-6)",
    fgColor: "var(--accent-6-foreground)",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen  text-foreground relative">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-8 py-3 text-center">
          <p className="text-sm font-medium">
            <a
              href="https://github.com/Hookflo/tern"
              target="_blank"
              rel="noreferrer"
              className=" inline-flex items-center gap-1"
            >
              Tern takes flight with your{" "}
              <Star className="w-4 h-4 fill-yellow-400 stroke-0" /> -{" "}
              <span className="underline underline-offset-2 hover:no-underline">
                Support us on GitHub!
              </span>
            </a>
          </p>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur  ">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Feather className="w-7 h-7 text-primary " />
            <span className="text-xl font-semibold tracking-tight">Tern</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="#demo">
              <Button className="px-5 rounded-none">Try It Live</Button>
            </Link>
            <a
              href="https://github.com/Hookflo/tern"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="px-5 bg-transparent rounded-none"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section id="home" className="border-b">
          <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                    <Cpu className="w-4 h-4" />
                    Self-healing
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent-2 text-accent-2-foreground">
                    Autonomous
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent-3 text-accent-3-foreground">
                    Algorithm-agnostic
                  </span>
                </div>

                <h1
                  className={` ${geistMono.className} font-mono  text-5xl md:text-6xl font-light tracking-tight`}
                >
                  Verify less,
                  <br />
                  <span className="text-primary">build more.</span>
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
                  Tern is the next-generation webhook verification framework
                  that adapts, heals, and scales automatically. Zero
                  maintenance, infinite possibilities.
                </p>

                <div className="mt-4 flex gap-3">
                  <Link href="#demo">
                    <Button className="rounded-none">Try it live</Button>
                  </Link>
                  <a
                    href="https://github.com/Hookflo/tern"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="outline" className="rounded-none">
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </Button>
                  </a>
                </div>

                <div
                  className={`${geistMono.className} mt-6 rounded-xl border bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md px-5 py-3 flex items-center gap-3 text-sm tracking-tight hover:shadow-lg hover:border-primary/30 transition-all max-w-sm`}
                >
                  <div className="flex items-center gap-2">
                    <span className={` text-lg  select-none ${doto.className}`}>
                      &gt;
                    </span>
                    <span className="text-muted-foreground select-none">
                      npm i
                    </span>
                    <span className=" text-primary font-semibold">
                      @hookflo/tern
                    </span>
                  </div>
                  <div className="ml-auto opacity-80 group-hover:opacity-100 transition-opacity">
                    <CopyCommand command="npm install @hookflo/tern" />
                  </div>
                </div>
                {/* Stats Section */}
                <div className="mt-8 flex flex-wrap  gap-6 sm:gap-10 text-center">
                  <div className="flex flex-col text-left">
                    <span className="text-2xl sm:text-3xl font-semibold leading-none text-foreground">
                      20+
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Platforms supported
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-2xl sm:text-3xl font-semibold leading-none text-foreground">
                      0
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Deps required
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-2xl sm:text-3xl font-semibold leading-none text-foreground">
                      ∞
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Scale & resilience
                    </span>
                  </div>
                </div>
              </div>

              {/* Code preview card */}
              <div className="rounded-2xl border bg-card shadow-sm">
                <div className="flex items-center justify-between px-5 py-3 border-b">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-destructive/80" />
                    <span className="w-3 h-3 rounded-full bg-chart-4/80" />
                    <span className="w-3 h-3 rounded-full bg-chart-5/80" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    webhook-verification.ts
                  </span>
                </div>
                <pre className="p-6 text-sm leading-relaxed font-mono overflow-auto whitespace-pre-wrap break-words max-h-80 text-muted-foreground">
                  {`import { WebhookVerificationService } from '@hookflo/tern'

const result = await WebhookVerificationService
  .verifyWithPlatformConfig(request, 'stripe', 'whsec_your_secret')

if (result.isValid) {
  console.log('Webhook verified autonomously!', result.payload)
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <UseCaseSection />

        {/* Features */}
        <section id="features" className="py-24 border-b">
          <div className="max-w-6xl mx-auto px-8">
            <header className="max-w-3xl">
              <h2 className="text-4xl tracking-tight text-balance">
                {" "}
                Why Tern leads the future
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Most verifiers break when platforms change. Tern evolves with
                them, automatically healing and adapting to keep your systems
                running.
              </p>
            </header>
            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  body={feature.body}
                  bgColor={feature.bgColor}
                  fgColor={feature.fgColor}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo */}
        {/* <section id="demo" className="py-24 border-b">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tight">Try the live demo</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Simulate a webhook request and verify it using Tern. Use our sample payload or bring your own.
              </p>
            </div>

            <div className="mt-10">
              <LiveDemo />
            </div>
          </div>
        </section> */}

        <TernBottomBanner />
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Feather className="w-7 h-7 text-primary " />
              <span className="font-semibold">Tern</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://github.com/Hookflo/tern/blob/main/README.md"
                className="hover:text-foreground"
              >
                README.md
              </a>
              <a href="https://hookflo.com" className="hover:text-foreground">
                Hookflo
              </a>
              <a
                href="https://github.com/Hookflo/tern"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href="https://github.com/Hookflo/tern/blob/main/LICENSE"
                className="hover:text-foreground"
              >
                MIT License
              </a>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tern by Hookflo. The self-healing
            webhook verification framework.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  bgColor,
  fgColor,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  bgColor: string;
  fgColor: string;
}) {
  return (
    <div className="bg-card border rounded-2xl p-6 hover:shadow-sm transition-shadow">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: bgColor, color: fgColor }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
