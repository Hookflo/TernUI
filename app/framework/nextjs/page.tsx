"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import CodeBlock from "@/components/code-block";
import { DESIGN_CSS } from "@/lib/design";

const PAGE_CSS = `
  .fw-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; max-width:1200px; margin:0 auto; padding:clamp(60px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,6vw,70px); }
  @media(max-width:900px){ .fw-hero-grid { grid-template-columns:1fr; gap:40px; } }

  .fw-flag-card { background:var(--paper2); border:1.5px solid var(--border2); border-radius:12px; overflow:hidden; box-shadow:4px 5px 0 var(--border); max-width:820px; }
  .fw-flag-top { padding:28px 32px 24px; border-bottom:1px solid var(--border); }
  .fw-flag-eyebrow { font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--ink4); margin-bottom:10px; }
  .fw-flag-title { font-family:var(--display); font-size:clamp(20px,3vw,28px); font-weight:400; color:var(--ink); line-height:1.2; margin-bottom:10px; }
  .fw-flag-title em { font-style:italic; }
  .fw-flag-desc { font-size:14px; color:var(--ink3); line-height:1.6; max-width:560px; }
  .fw-flag-ui { padding:24px 32px; display:flex; align-items:center; gap:24px; flex-wrap:wrap; }
  .fw-flag-row { display:flex; align-items:center; gap:14px; background:white; border:1px solid var(--border); border-radius:8px; padding:12px 16px; min-width:280px; }
  .fw-flag-key { font-family:var(--mono); font-size:11px; font-weight:700; color:var(--ink2); }
  .fw-flag-val { font-family:var(--mono); font-size:10px; color:var(--ink4); margin-top:2px; }
  .fw-flag-toggle { width:40px; height:22px; background:var(--ink); border-radius:11px; position:relative; flex-shrink:0; }
  .fw-flag-toggle::after { content:''; position:absolute; right:3px; top:3px; width:16px; height:16px; background:white; border-radius:50%; }
  .fw-flag-result { background:white; border:1px solid var(--border); border-radius:8px; padding:14px 18px; }
  .fw-flag-result-label { font-family:var(--mono); font-size:9px; font-weight:700; color:var(--ink4); letter-spacing:.1em; text-transform:uppercase; margin-bottom:6px; }
  .fw-flag-result-val { font-family:var(--mono); font-size:12px; color:var(--green); font-weight:700; }

  .fw-two-call { display:grid; grid-template-columns:1fr 1fr; gap:16px; max-width:800px; }
  @media(max-width:700px){ .fw-two-call { grid-template-columns:1fr; } }
  .fw-call-box { border:1px solid var(--border); border-radius:10px; overflow:hidden; }
  .fw-call-head { padding:12px 16px; background:var(--paper2); border-bottom:1px solid var(--border); font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink); letter-spacing:.08em; text-transform:uppercase; }
  .fw-call-body { padding:16px; font-family:var(--mono); font-size:11px; line-height:1.8; color:var(--ink2); }
  .fw-call-check { color:var(--green); }
  .fw-call-arrow { display:flex; align-items:center; justify-content:center; color:var(--ink4); padding-top:40px; }
  @media(max-width:700px){ .fw-call-arrow { display:none; } }
`;

const TABS = [
  { label: "Basic", filename: "app/api/webhooks/route.ts" },
  { label: "queue: true", filename: "app/api/webhooks/route.ts" },
  { label: "Explicit BYOK", filename: "app/api/webhooks/route.ts" },
  { label: "DLQ Controls", filename: "app/api/webhooks/[action]/route.ts" },
];

const CODE = [
  `// Basic webhook verification — no queue
import { createWebhookHandler } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'stripe',
  secret:   process.env.WEBHOOK_SECRET!,
  handler:  async (payload) => {
    // ✓ verified — handle your event
    return { received: true }
  }
})`,
  `// With queue: true — reads QSTASH_* from env automatically
// Next.js + Vercel only
import { createWebhookHandler } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'stripe',
  secret:   process.env.WEBHOOK_SECRET!,
  queue:    true,
  handler:  async (payload) => {
    // ✓ verified & queued — guaranteed delivery
    return { received: true }
  }
})`,
  `// Explicit BYOK config — works everywhere
import { createWebhookHandler } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'stripe',
  secret:   process.env.WEBHOOK_SECRET!,
  queue: {
    token:          process.env.QSTASH_TOKEN!,
    signingKey:     process.env.QSTASH_CURRENT_SIGNING_KEY!,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    retries: 3,
  },
  handler: async (payload) => {
    return { received: true }
  }
})`,
  `import { createTernControls } from '@hookflo/tern/upstash'

const controls = createTernControls({
  token: process.env.QSTASH_TOKEN!
})

// GET /api/webhooks/dlq — inspect dead-letter queue
export const GET = async () => {
  const failed = await controls.dlq()
  return Response.json({ count: failed.length, events: failed })
}

// PATCH /api/webhooks/replay — replay a failed event
export const PATCH = async (request: Request) => {
  const { dlqId } = await request.json()
  const result    = await controls.replay(dlqId)
  return Response.json(result)
}`,
];

const FLAG_CODE = `import { createWebhookHandler } from '@hookflo/tern/nextjs'
import { platform } from '../flags'  // @vercel/flags

export const POST = createWebhookHandler({
  platform: await platform(),  // changes at runtime — no redeploy
  secret:   process.env.WEBHOOK_SECRET!,
  handler:  async (payload) => {
    return { received: true }
  }
})`;

export default function NextJsPage() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="tern-root">
      <style>{DESIGN_CSS + PAGE_CSS}</style>
      <SiteNav />

      {/* ── HERO ── */}
      <div className="fw-hero-grid fade-up-1">
        <div>
          {/* Logo lockup */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 7,
                border: "1.5px solid var(--border2)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "2px 3px 0 var(--border)",
              }}
            >
              <img
                src="/assets/nextjs.svg"
                alt="Cloudflare"
                style={{ width: 36, height: 36 }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--ink3)",
              }}
            >
              Next.js App Router
            </div>
          </div>

          <div className="t-eyebrow">Framework — Next.js</div>
          <h1 className="t-h1">
            The webhook handler
            <br />
            <em>Next.js was missing.</em>
          </h1>
          <p className="t-hero-desc">
            Purpose-built App Router adapter. Reads platform and secret from
            Vercel feature flags at runtime. Switch platforms without
            redeploying.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <span className="t-badge stable">stable</span>
            <span className="t-badge new">queue support</span>
          </div>
          <div className="t-install">
            <div className="t-install-cmd">
              <span>$</span> npm i @hookflo/tern
            </div>
            <button
              className="t-copy-btn"
              onClick={() => copy("npm i @hookflo/tern")}
              title="Copy"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7l3.5 3.5L12 4"
                    stroke="#059669"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="4.5"
                    y="1"
                    width="8"
                    height="9"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1 5h4v8h7v-3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Right: syntax-highlighted code card with copy */}
        <div>
          <CodeBlock code={CODE[1]} filename="app/api/webhooks/route.ts" />
        </div>
      </div>

      {/* ── TABBED CODE ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Usage modes</div>
          <h2 className="t-h2">
            Three lines of code.
            <br />
            <em>Four modes.</em>
          </h2>
          <div className="t-tabs">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                className={`t-tab ${tab === i ? "active" : ""}`}
                onClick={() => setTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <CodeBlock code={CODE[tab]} filename={TABS[tab].filename} />
        </div>
      </section>

      {/* ── VERCEL FLAG SECTION ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">The Killer Feature</div>
          <div className="fw-flag-card">
            <div className="fw-flag-top">
              <div className="fw-flag-eyebrow">Vercel Feature Flags × Tern</div>
              <h3 className="fw-flag-title">
                Switch platforms with
                <br />
                <em>a single flag flip.</em>
              </h3>
              <p className="fw-flag-desc">
                No code change. No redeployment. Set your platform via Vercel
                feature flags — Tern reads them at runtime. Switch from Clerk to
                Stripe to GitHub without touching your codebase.
              </p>
            </div>
            <div className="fw-flag-ui">
              <div className="fw-flag-row">
                <div style={{ flex: 1 }}>
                  <div className="fw-flag-key">PLATFORM</div>
                  <div className="fw-flag-val">clerk → stripe</div>
                </div>
                <div className="fw-flag-toggle" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--ink4)",
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10h12M12 6l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                that's it
              </div>
              <div className="fw-flag-result">
                <div className="fw-flag-result-label">Result</div>
                <div className="fw-flag-result-val">
                  ✓ Verified — no redeploy
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, maxWidth: 820 }}>
            <CodeBlock code={FLAG_CODE} filename="app/api/webhooks/route.ts" />
          </div>
        </div>
      </section>

      {/* ── TWO CALL PATTERN ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">How queuing works</div>
          <h2 className="t-h2">
            Two calls,
            <br />
            <em>one guarantee.</em>
          </h2>
          <p className="t-section-desc" style={{ marginBottom: 28 }}>
            Stripe gets a 200 immediately. QStash handles delivery to your
            handler. Your endpoint returns fast — your logic runs reliably.
          </p>
          <div className="fw-two-call">
            <div className="fw-call-box">
              <div className="fw-call-head">Call 1 — Platform → Tern</div>
              <div className="fw-call-body">
                Stripe hits /api/webhooks{"\n"}
                <span className="fw-call-check">✓</span> Tern verifies signature
                (~5ms){"\n"}
                <span className="fw-call-check">✓</span> Enqueues to QStash
                (~100ms){"\n"}
                <span className="fw-call-check">✓</span> Returns 200 to Stripe
                immediately{"\n"}
                Stripe is done. Handler not run yet.
              </div>
            </div>
            <div className="fw-call-box">
              <div className="fw-call-head">
                Call 2 — QStash → Tern (~1s later)
              </div>
              <div className="fw-call-body">
                QStash delivers to same endpoint{"\n"}
                <span className="fw-call-check">✓</span> Tern verifies QStash
                signature{"\n"}
                <span className="fw-call-check">✓</span> Your handler runs{"\n"}
                <span className="fw-call-check">✓</span> Returns 200 to QStash
                {"\n"}
                Failure? QStash retries with backoff.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENV VARS ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Environment variables</div>
          <h2 className="t-h2">What you need.</h2>
          <div className="t-env-block" style={{ maxWidth: 600 }}>
            <div>
              <span className="t-env-comment"># required always</span>
            </div>
            <div>
              <span className="t-env-key">WEBHOOK_SECRET</span>=
              <span className="t-env-val">whsec_xxx</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="t-env-comment"># required with queue: true</span>
            </div>
            <div>
              <span className="t-env-key">QSTASH_TOKEN</span>=
              <span className="t-env-val">qstash_xxx</span>
            </div>
            <div>
              <span className="t-env-key">QSTASH_CURRENT_SIGNING_KEY</span>=
              <span className="t-env-val">sig_xxx</span>
            </div>
            <div>
              <span className="t-env-key">QSTASH_NEXT_SIGNING_KEY</span>=
              <span className="t-env-val">sig_xxx</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="t-env-comment">
                # optional — for Vercel feature flags
              </span>
            </div>
            <div>
              <span className="t-env-key">FLAGS_SECRET</span>=
              <span className="t-env-val">your_vercel_flags_secret</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Also available</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: 16,
              maxWidth: 600,
            }}
          >
            <Link
              href="/framework/cloudflare"
              style={{ textDecoration: "none" }}
            >
              <div className="t-card">
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: 8,
                  }}
                >
                  Cloudflare Workers
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink3)",
                    lineHeight: 1.5,
                  }}
                >
                  Edge-native adapter. Web Crypto API, V8 isolates.
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--green)",
                  }}
                >
                  View guide →
                </div>
              </div>
            </Link>
            <Link href="/upstash" style={{ textDecoration: "none" }}>
              <div className="t-card">
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: 8,
                  }}
                >
                  Reliable Delivery
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink3)",
                    lineHeight: 1.5,
                  }}
                >
                  Queue, retry, DLQ, dedup — guaranteed delivery.
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--green)",
                  }}
                >
                  Learn more →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="t-cta-section">
        <div className="t-cta-inner">
          <div>
            <h2 className="t-cta-title">
              Ready to ship
              <br />
              <em>reliable webhooks?</em>
            </h2>
            <p className="t-cta-desc">
              Open source · MIT licensed · Built at Hookflo
            </p>
          </div>
          <div className="t-cta-actions">
            <a
              href="https://github.com/Hookflo/tern"
              target="_blank"
              rel="noreferrer"
              className="t-btn-cta"
            >
              ⭐ Star on GitHub
            </a>
            <a
              href="https://github.com/Hookflo/tern/blob/main/README.md"
              target="_blank"
              rel="noreferrer"
              className="t-btn-cta-sec"
            >
              Read the docs →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
