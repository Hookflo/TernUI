"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import CodeBlock from "@/components/code-block";
import { DESIGN_CSS } from "@/lib/design";

const PAGE_CSS = `
  .cf-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; max-width:1200px; margin:0 auto; padding:clamp(60px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,6vw,70px); }
  @media(max-width:900px){ .cf-hero-grid { grid-template-columns:1fr; gap:40px; } }

  .cf-diff { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1.5px solid var(--border2); border-radius:10px; overflow:hidden; box-shadow:4px 5px 0 var(--border); max-width:700px; }
  @media(max-width:600px){ .cf-diff { grid-template-columns:1fr; } }
  .cf-diff-col { padding:20px; }
  .cf-diff-col.left { border-right:1px solid var(--border); background:var(--paper2); }
  @media(max-width:600px){ .cf-diff-col.left { border-right:none; border-bottom:1px solid var(--border); } }
  .cf-diff-label { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin-bottom:14px; display:flex; align-items:center; gap:6px; }
  .cf-diff-label.ok  { color:var(--green); }
  .cf-diff-label.bad { color:var(--red); }
  .cf-diff-row { font-family:var(--mono); font-size:12px; padding:6px 10px; border-radius:4px; margin-bottom:6px; display:flex; align-items:center; gap:8px; }
  .cf-diff-row.ok  { background:var(--green-bg); color:var(--green); }
  .cf-diff-row.bad { background:var(--red-bg); color:var(--red); }
  .cf-diff-row.neu { background:var(--paper); color:var(--ink3); }

  .cf-steps-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }
  .cf-step-box { background:white; border:1px solid var(--border); border-radius:8px; padding:18px 20px; }
  .cf-step-num { font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink4); letter-spacing:.1em; margin-bottom:10px; }
  .cf-step-title { font-family:var(--serif); font-size:14px; font-weight:600; color:var(--ink); margin-bottom:8px; }
`;

const TABS = [
  { label: "Basic", filename: "src/index.ts" },
  { label: "With queue", filename: "src/index.ts" },
  { label: "Secrets setup", filename: ".dev.vars" },
];

const CODE = [
  `import { createWebhookHandler } from '@hookflo/tern/cloudflare'

export interface Env {
  WEBHOOK_SECRET:             string
  QSTASH_TOKEN:               string
  QSTASH_CURRENT_SIGNING_KEY: string
  QSTASH_NEXT_SIGNING_KEY:    string
  [key: string]: unknown
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const handler = createWebhookHandler({
      platform: 'stripe',
      secret:   env.WEBHOOK_SECRET,  // ← env, not process.env
      handler:  async (payload) => {
        return { received: true }
      }
    })
    return handler(request, env)  // ← pass env as second arg
  }
}`,
  `import { createWebhookHandler } from '@hookflo/tern/cloudflare'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const handler = createWebhookHandler({
      platform: 'stripe',
      secret:   env.WEBHOOK_SECRET,
      // ⚠️  queue: true does NOT work here — process.env unavailable
      // Always use explicit config with env:
      queue: {
        token:          env.QSTASH_TOKEN,
        signingKey:     env.QSTASH_CURRENT_SIGNING_KEY,
        nextSigningKey: env.QSTASH_NEXT_SIGNING_KEY,
      },
      handler: async (payload) => {
        return { received: true }
      }
    })
    return handler(request, env)
  }
}`,
  `# Local development — .dev.vars (gitignored)
WEBHOOK_SECRET=whsec_xxx
QSTASH_TOKEN=qstash_xxx
QSTASH_CURRENT_SIGNING_KEY=sig_xxx
QSTASH_NEXT_SIGNING_KEY=sig_xxx

# Production — use wrangler secrets (run these commands):
# npx wrangler secret put WEBHOOK_SECRET
# npx wrangler secret put QSTASH_TOKEN
# npx wrangler secret put QSTASH_CURRENT_SIGNING_KEY
# npx wrangler secret put QSTASH_NEXT_SIGNING_KEY`,
];

const COMPARISON_ROWS = [
  { label: "Runtime", nextjs: "Node.js", cf: "V8 isolates" },
  { label: "Env vars", nextjs: "process.env", cf: "env parameter" },
  { label: "queue: true", nextjs: "✓", cf: "✗" },
  { label: "Import", nextjs: "/nextjs", cf: "/cloudflare" },
  { label: "handler args", nextjs: "(request)", cf: "(request, env)" },
  { label: "Crypto", nextjs: "Node crypto", cf: "Web Crypto API" },
  { label: "Deploy", nextjs: "Vercel", cf: "wrangler deploy" },
];

export default function CloudflarePage() {
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
      <div className="cf-hero-grid fade-up-1">
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
                src="/assets/cloudflare.svg"
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
              Cloudflare Workers
            </div>
          </div>

          <div className="t-eyebrow">Framework — Cloudflare Workers</div>
          <h1 className="t-h1">
            Webhook verification
            <br />
            <em>at the edge.</em>
          </h1>
          <p className="t-hero-desc">
            Web Crypto API native. No Node.js dependencies. Runs in V8 isolates
            across Cloudflare's global network.
          </p>
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
        <div>
          <CodeBlock code={CODE[0]} filename="src/index.ts" />
        </div>
      </div>

      {/* ── TABBED CODE ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Setup</div>
          <h2 className="t-h2">
            Up and running
            <br />
            <em>in three steps.</em>
          </h2>

          <div className="t-steps" style={{ maxWidth: 700, marginBottom: 40 }}>
            {[
              {
                n: "1",
                title: "Create a worker",
                code: "npm create cloudflare@latest my-webhook-worker\ncd my-webhook-worker\nnpm i @hookflo/tern",
              },
              {
                n: "2",
                title: "Write your handler",
                code: "# See the code examples below",
              },
              {
                n: "3",
                title: "Deploy",
                code: "npx wrangler dev    # local testing\nnpx wrangler deploy # production",
              },
            ].map((step) => (
              <div className="t-step" key={step.n}>
                <div className="t-step-num">{step.n}</div>
                <div className="t-step-body">
                  <div className="t-step-title">{step.title}</div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      background: "var(--paper2)",
                      border: "1px solid var(--border)",
                      borderRadius: 5,
                      padding: "10px 14px",
                      color: "var(--ink2)",
                      lineHeight: 1.8,
                      whiteSpace: "pre",
                    }}
                  >
                    {step.code}
                  </div>
                </div>
              </div>
            ))}
          </div>

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

      {/* ── COMPARISON TABLE ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Key differences</div>
          <h2 className="t-h2">
            Next.js vs
            <br />
            <em>Cloudflare Workers.</em>
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="t-table" style={{ maxWidth: 700 }}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Next.js</th>
                  <th>Cloudflare Workers</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        color: "var(--ink3)",
                      }}
                    >
                      {row.label}
                    </td>
                    <td>
                      {row.nextjs === "✓" ? (
                        <span className="t-check">✓</span>
                      ) : row.nextjs === "✗" ? (
                        <span className="t-cross">✗</span>
                      ) : (
                        row.nextjs
                      )}
                    </td>
                    <td>
                      {row.cf === "✓" ? (
                        <span className="t-check">✓</span>
                      ) : row.cf === "✗" ? (
                        <span className="t-cross">✗</span>
                      ) : (
                        row.cf
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper)",
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
            <Link href="/framework/nextjs" style={{ textDecoration: "none" }}>
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
                  Next.js App Router
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink3)",
                    lineHeight: 1.5,
                  }}
                >
                  Vercel feature flag support. queue: true shorthand.
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
              Verify webhooks
              <br />
              <em>at the edge.</em>
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
