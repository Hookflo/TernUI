"use client";

import { LeafLogo } from "@/components/leaf-logo";
import { Copy } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-[rgba(247,244,239,0.92)] backdrop-blur-md border-b border-[#d8d0c4] px-4 md:px-8 lg:px-16 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline text-[#1a1714]">
          <div className="w-7 h-7 border-[1.5px] border-[#1a1714] rounded-[6px] flex items-center justify-center flex-shrink-0">
            <LeafLogo className="w-4 h-4" />
          </div>
          <span className="font-mono text-[13px] font-bold uppercase tracking-[0.12em]">Tern</span>
        </Link>

        <ul className="flex items-center gap-7 list-none">
          <li>
            <a href="#" className="font-mono text-[11px] font-medium tracking-[0.06em] text-[#6b6358] no-underline transition-colors hover:text-[#1a1714]">
              Docs
            </a>
          </li>
          <li>
            <a href="#" className="font-mono text-[11px] font-medium tracking-[0.06em] text-[#6b6358] no-underline transition-colors hover:text-[#1a1714]">
              Platforms
            </a>
          </li>
          <li>
            <a href="#" className="font-mono text-[11px] font-medium tracking-[0.06em] text-[#6b6358] no-underline transition-colors hover:text-[#1a1714]">
              Blog
            </a>
          </li>
        </ul>

        <a
          href="https://github.com/Hookflo/tern"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#1a1714] border-[1.5px] border-[#1a1714] px-3.5 py-1.5 rounded no-underline transition-all hover:bg-[#1a1714] hover:text-[#f7f4ef]"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v-3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          {/* Hero Left */}
          <div className="pt-2 animate-fadeUp" style={{ animationDelay: "0s", animation: "fadeUp 0.5s ease both" }}>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b6358] mb-6">
              <span className="block w-6 h-px bg-[#6b6358]"></span>
              Open Source Framework
            </div>

            <h1 className="font-display text-[clamp(38px,5vw,60px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#1a1714] mb-5">
              Webhook Verification <em className="italic text-[#3d3830]">Made Simple</em>
            </h1>

            <p className="text-[clamp(15px,1.8vw,17px)] text-[#6b6358] leading-[1.65] max-w-[480px] mb-9">
              Tern is a universal webhook verification framework that adapts to any platform. Zero dependencies, pure security, infinite possibilities.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-7">
              <button className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#f7f4ef] bg-[#1a1714] border-none px-6 py-3 rounded no-underline transition-all hover:opacity-85 hover:-translate-y-0.5 cursor-pointer">
                Get Started
              </button>
              <a href="https://github.com/Hookflo/tern" className="font-mono text-[12px] font-medium tracking-[0.06em] text-[#3d3830] no-underline flex items-center gap-1.5 border-b border-[#c4baad] pb-0.5 transition-all hover:text-[#1a1714] hover:border-[#1a1714]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v-3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>

            <div className="flex items-center gap-3 mt-7">
              <div className="flex items-center gap-2.5 font-mono text-[12px] font-medium text-[#3d3830] bg-[#f0ebe2] border border-[#d8d0c4] px-4 py-2 rounded">
                <span>npm i @hookflo/tern</span>
              </div>
              <button
                onClick={() => copyToClipboard("npm i @hookflo/tern")}
                className="bg-none border-none cursor-pointer text-[#9e9488] p-0.5 transition-colors hover:text-[#1a1714]"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-3 gap-0 border border-[#d8d0c4] rounded-lg bg-white overflow-hidden">
              <div className="p-4 text-center border-r border-[#d8d0c4]">
                <div className="font-display text-2xl font-italic text-[#1a1714]">20+</div>
                <div className="font-mono text-[9px] text-[#9e9488] mt-1 uppercase tracking-[0.08em]">Platforms</div>
              </div>
              <div className="p-4 text-center border-r border-[#d8d0c4]">
                <div className="font-display text-2xl font-italic text-[#1a1714]">0</div>
                <div className="font-mono text-[9px] text-[#9e9488] mt-1 uppercase tracking-[0.08em]">Dependencies</div>
              </div>
              <div className="p-4 text-center">
                <div className="font-display text-2xl font-italic text-[#1a1714]">∞</div>
                <div className="font-mono text-[9px] text-[#9e9488] mt-1 uppercase tracking-[0.08em]">Scalability</div>
              </div>
            </div>
          </div>

          {/* Hero Right - Code Card */}
          <div className="relative" style={{ animation: "fadeUp 0.5s ease 0.2s both" }}>
            <div className="bg-[#1a1714] rounded-[10px] overflow-hidden shadow-lg">
              <div className="bg-[#2a2520] px-4 py-2.5 flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff6058]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#29c440]"></div>
                </div>
                <span className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] ml-2 tracking-[0.04em]">
                  webhook-verification.ts
                </span>
              </div>
              <pre className="p-5 font-mono text-[12px] leading-[1.75] text-[rgba(255,255,255,0.8)] overflow-auto">
                <span className="text-[#c792ea]">import</span>{" "}
                <span className="text-[#c3e88d]">{"{ WebhookVerifier }"}</span>{" "}
                <span className="text-[#c792ea]">from</span>{" "}
                <span className="text-[#c3e88d]">"@hookflo/tern"</span>
                {"\n\n"}
                <span className="text-[#82aaff]">const</span>{" "}
                <span className="text-[#ffcb6b]">result</span> <span className="text-[#82aaff]">=</span>{" "}
                <span className="text-[#82aaff]">await</span>{" "}
                <span className="text-[#ffcb6b]">WebhookVerifier</span>
                {"\n"}<span className="ml-4">.</span>
                <span className="text-[#ffcb6b]">verify</span>
                {"\n"}<span className="ml-8">(request, secret)"}
              </pre>
              <div className="grid grid-cols-3 gap-0 border-t border-[#d8d0c4] bg-white">
                <div className="p-4 text-center border-r border-[#d8d0c4]">
                  <div className="font-display text-xl italic text-[#1a1714]">0.5ms</div>
                  <div className="font-mono text-[9px] text-[#9e9488] mt-1 uppercase tracking-[0.08em]">Verify Time</div>
                </div>
                <div className="p-4 text-center border-r border-[#d8d0c4]">
                  <div className="font-display text-xl italic text-[#1a1714]">1KB</div>
                  <div className="font-mono text-[9px] text-[#9e9488] mt-1 uppercase tracking-[0.08em]">Bundle Size</div>
                </div>
                <div className="p-4 text-center">
                  <div className="font-display text-xl italic text-[#1a1714]">100%</div>
                  <div className="font-mono text-[9px] text-[#9e9488] mt-1 uppercase tracking-[0.08em]">Type Safe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORMS ─── */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#f0ebe2] border-t border-[#d8d0c4]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#9e9488] mb-4 flex items-center gap-2.5">
            Platforms
            <span className="flex-1 max-w-[60px] h-px bg-[#d8d0c4]"></span>
          </div>

          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-normal leading-[1.15] text-[#1a1714] mb-4">
            Webhook verification for the platforms that matter
          </h2>
          <p className="text-[16px] text-[#6b6358] max-w-[560px] leading-[1.6] mb-12">
            Support for Stripe, GitHub, Clerk, Shopify, and 20+ other platforms out of the box.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {[
              "Stripe",
              "GitHub",
              "Clerk",
              "Shopify",
              "Supabase",
              "Vercel",
              "Polar",
              "Dodo Pay",
              "Linear",
              "Discord",
            ].map((platform, idx) => (
              <div
                key={platform}
                className="flex items-center gap-2.5 px-4 py-3 bg-white border border-[#d8d0c4] rounded-lg font-mono text-[11px] font-medium text-[#3d3830] transition-all hover:border-[#c4baad] hover:shadow-sm hover:-translate-y-0.5 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b3c] flex-shrink-0"></span>
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white border-t border-[#d8d0c4]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#9e9488] mb-4 flex items-center gap-2.5">
            Features
            <span className="flex-1 max-w-[60px] h-px bg-[#d8d0c4]"></span>
          </div>

          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-normal leading-[1.15] text-[#1a1714] mb-4">
            Built for modern development
          </h2>
          <p className="text-[16px] text-[#6b6358] max-w-[560px] leading-[1.6] mb-12">
            Every feature designed to make webhook verification effortless and secure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#d8d0c4] border border-[#d8d0c4] rounded-[10px] overflow-hidden">
            {[
              { num: "01", title: "Zero Dependencies", desc: "Lightweight and pure, with no external dependencies to bloat your bundle." },
              { num: "02", title: "Type Safe", desc: "Full TypeScript support with comprehensive types for peace of mind." },
              { num: "03", title: "Algorithm Agnostic", desc: "Support for HMAC-SHA256, SHA512, and custom verification algorithms." },
              { num: "04", title: "Framework Agnostic", desc: "Works with Express, Next.js, Cloudflare Workers, and any modern JS runtime." },
              { num: "05", title: "Battle Tested", desc: "Production-ready implementations for 20+ webhook platforms." },
              { num: "06", title: "Self-Healing", desc: "Automatically adapts when webhook providers update their signature schemes." },
            ].map((feature) => (
              <div key={feature.num} className="bg-white p-7 transition-colors hover:bg-[#fdfcfb]">
                <div className="font-mono text-[10px] font-bold text-[#9e9488] uppercase tracking-[0.1em] mb-4">
                  {feature.num}
                </div>
                <h3 className="font-serif text-[16px] font-semibold text-[#1a1714] mb-2 leading-[1.3]">
                  {feature.title}
                </h3>
                <p className="text-[13.5px] text-[#6b6358] leading-[1.55]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#f7f4ef] border-t border-[#d8d0c4]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#9e9488] mb-4 flex items-center gap-2.5">
            How It Works
            <span className="flex-1 max-w-[60px] h-px bg-[#d8d0c4]"></span>
          </div>

          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-normal leading-[1.15] text-[#1a1714] mb-4">
            Integration in minutes, not days
          </h2>

          <div className="max-w-[780px] border border-[#d8d0c4] rounded-[10px] overflow-hidden bg-white">
            {[
              {
                num: "1",
                title: "Import the library",
                desc: "Add @hookflo/tern to your project. Zero setup required.",
                code: 'import { WebhookVerifier } from "@hookflo/tern"',
              },
              {
                num: "2",
                title: "Verify webhooks",
                desc: "Call the verify method with your webhook payload and secret.",
                code: 'const valid = await WebhookVerifier.verify(payload, secret)',
              },
              {
                num: "3",
                title: "Process safely",
                desc: "Webhooks are verified and ready to process securely.",
                code: 'if (valid) { // Handle webhook }',
              },
            ].map((step, idx) => (
              <div key={step.num} className={`grid grid-cols-[64px_1fr] ${idx !== 2 ? "border-b border-[#d8d0c4]" : ""}`}>
                <div className="flex items-start justify-center pt-6 font-display text-[22px] italic text-[#9e9488] border-r border-[#d8d0c4]">
                  {step.num}
                </div>
                <div className="p-5.5">
                  <h3 className="font-serif text-[15px] font-semibold text-[#1a1714] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] text-[#6b6358] leading-[1.55] mb-3">
                    {step.desc}
                  </p>
                  <code className="font-mono text-[11px] bg-[#f0ebe2] border border-[#d8d0c4] rounded-[5px] px-3.5 py-2.5 text-[#3d3830] block leading-[1.6]">
                    {step.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#1a1714]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-normal text-[#f7f4ef] leading-[1.15]">
              Ready to secure your webhooks? <em className="italic opacity-70">Start now.</em>
            </h2>
            <p className="text-[15px] text-[rgba(247,244,239,0.55)] mt-2.5 leading-[1.55]">
              Tern is open source and ready for production. Join developers building secure webhook systems.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#1a1714] bg-[#f7f4ef] border-none px-7 py-3.25 rounded cursor-pointer transition-opacity hover:opacity-88 text-center whitespace-nowrap">
              Get Started
            </button>
            <a href="https://github.com/Hookflo/tern" className="font-mono text-[11px] text-[rgba(247,244,239,0.5)] no-underline text-center transition-colors hover:text-[rgba(247,244,239,0.85)]">
              Or explore on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1a1714] border-t border-[rgba(255,255,255,0.07)] py-7 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[rgba(247,244,239,0.5)]">
            Tern
          </div>
          <ul className="flex gap-5 list-none">
            <li>
              <a
                href="https://github.com/Hookflo/tern/blob/main/README.md"
                className="font-mono text-[10px] text-[rgba(247,244,239,0.35)] no-underline tracking-[0.06em] transition-colors hover:text-[rgba(247,244,239,0.7)]"
              >
                Docs
              </a>
            </li>
            <li>
              <a href="https://github.com/Hookflo" className="font-mono text-[10px] text-[rgba(247,244,239,0.35)] no-underline tracking-[0.06em] transition-colors hover:text-[rgba(247,244,239,0.7)]">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://hookflo.com" className="font-mono text-[10px] text-[rgba(247,244,239,0.35)] no-underline tracking-[0.06em] transition-colors hover:text-[rgba(247,244,239,0.7)]">
                Hookflo
              </a>
            </li>
          </ul>
          <div className="font-mono text-[10px] text-[rgba(247,244,239,0.25)] tracking-[0.04em]">
            © 2024 Tern by Hookflo. MIT License.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        * {
          font-family: inherit;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
