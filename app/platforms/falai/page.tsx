"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import CodeBlock from "@/components/code-block";
import { DESIGN_CSS } from "@/lib/design";

const PAGE_CSS = `
  .plat-hero { max-width:1200px; margin:0 auto; padding:clamp(60px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,6vw,70px); }
  .plat-event-flow { display:flex; flex-direction:column; gap:10px; max-width:640px; }
  .plat-event { display:flex; align-items:center; gap:16px; padding:14px 18px; border:1px solid var(--border); border-radius:8px; background:white; font-family:var(--mono); font-size:12px; color:var(--ink2); }
  .plat-event-num { width:24px; height:24px; border-radius:50%; background:var(--paper2); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:var(--ink4); flex-shrink:0; }
  .plat-event-label { flex:1; }
  .plat-event-timing { font-size:10px; color:var(--ink4); }
  .plat-event.immediate { border-color:#fde68a; background:#fffbeb; }
  .plat-event.completed { border-color:#a7f3d0; background:var(--green-bg); }
`;

const CODE_BASIC = `import { createWebhookHandler } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'falai',
  secret:   '',  // ← intentional empty string — see below
  handler:  async (payload) => {
    console.log('Fal AI event:', payload)
    return { received: true }
  }
})`;

const CODE_TRIGGER = `# Trigger a prediction — pass webhook URL as query param
curl -X POST \\
  'https://queue.fal.run/fal-ai/flux/schnell?fal_webhook=https://your-app.com/api/webhooks' \\
  -H "Authorization: Key $FAL_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "a red cat", "num_images": 1}'`;

const CODE_FILTER = `# Only receive completed events (skip IN_QUEUE)
curl -X POST \\
  'https://queue.fal.run/fal-ai/flux/schnell?fal_webhook=https://your-app.com/api/webhooks&fal_webhook_events=completed' \\
  -H "Authorization: Key $FAL_KEY" \\
  -d '{"prompt": "a red cat"}'`;

const TABS = [
  { label: "Webhook handler", code: CODE_BASIC, filename: "app/api/webhooks/route.ts" },
  { label: "Trigger (curl)", code: CODE_TRIGGER, filename: "terminal" },
  { label: "Filter events", code: CODE_FILTER, filename: "terminal" },
];

export default function FalAiPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="tern-root">
      <style>{DESIGN_CSS + PAGE_CSS}</style>
      <SiteNav />

      {/* ── HERO ── */}
      <div className="plat-hero fade-up-1">
        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 7, border: "1.5px solid var(--border2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "2px 3px 0 var(--border)",
          }}>
        <img src="/assets/fal.svg" alt="Fal AI" style={{ width: 20, height: 20 }} />
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink3)" }}>
            Fal AI — Platform Guide
          </div>
        </div>

        <div className="t-eyebrow">Platform — Fal AI</div>
        <h1 className="t-h1">
          Fal AI webhooks,
          <br />
          <em>the right way.</em>
        </h1>
        <p className="t-hero-desc">
          Fal AI uses Ed25519 public key cryptography — not HMAC. Tern handles
          it automatically. Pass an empty string for{" "}
          <code className="t-inline-code">secret</code> — it's intentional.
        </p>
      </div>

      {/* ── CRITICAL INFO ── */}
      <section className="t-section" style={{ paddingTop: 0 }}>
        <div className="t-section-inner">
          <div className="t-crit-box" style={{ maxWidth: 680 }}>
            <div className="t-crit-box-title">
              Fal AI uses Ed25519 — not HMAC
            </div>
            <div>
              Unlike Stripe or Clerk which use HMAC-SHA256, Fal AI signs webhooks
              with <strong>Ed25519 public key cryptography</strong>. Tern
              automatically fetches Fal's public JWKS to verify signatures — you
              don't supply a secret.
              <br />
              <br />
              Pass <code style={{ fontFamily: "var(--mono)" }}>secret: ""</code>{" "}
              (empty string). This is intentional, not a mistake.
            </div>
          </div>
        </div>
      </section>

      {/* ── CODE ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Setup</div>
          <h2 className="t-h2">
            Three lines.
            <br />
            <em>Fully verified.</em>
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
          <CodeBlock code={TABS[tab].code} filename={TABS[tab].filename} />
        </div>
      </section>

      {/* ── EVENT FLOW ── */}
      <section
        className="t-section"
        style={{ background: "var(--paper2)", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Event flow</div>
          <h2 className="t-h2">
            Two webhooks
            <br />
            <em>per request.</em>
          </h2>
          <p className="t-section-desc" style={{ marginBottom: 28 }}>
            Fal sends two webhooks per prediction. You can filter to{" "}
            <code className="t-inline-code">completed</code> only using the{" "}
            <code className="t-inline-code">fal_webhook_events</code> query
            parameter.
          </p>
          <div className="plat-event-flow">
            <div className="plat-event immediate">
              <div className="plat-event-num">1</div>
              <div className="plat-event-label">
                <div style={{ fontWeight: 700 }}>IN_QUEUE</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink4)",
                    marginTop: 3,
                  }}
                >
                  {"{ status: 'IN_QUEUE', request_id: '...' }"}
                </div>
              </div>
              <div className="plat-event-timing">immediate</div>
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink4)",
                paddingLeft: 20,
              }}
            >
              ↓ model runs...
            </div>
            <div className="plat-event completed">
              <div className="plat-event-num">2</div>
              <div className="plat-event-label">
                <div style={{ fontWeight: 700 }}>COMPLETED</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink4)",
                    marginTop: 3,
                  }}
                >
                  {"{ status: 'COMPLETED', output: { images: [...] } }"}
                </div>
              </div>
              <div className="plat-event-timing">when done</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTING ── */}
      <section
        className="t-section"
        style={{ background: "var(--paper)", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Testing</div>
          <h2 className="t-h2">
            Cheapest model
            <br />
            <em>for testing.</em>
          </h2>
          <div className="t-info-box" style={{ maxWidth: 560, marginBottom: 20 }}>
            <strong>fal-ai/flux/schnell</strong> — $0.003 per image
            <br />
            <span style={{ color: "var(--ink3)", fontSize: 11 }}>
              Use for testing. Not production quality — Schnell is 4-step,
              optimized for speed over quality.
            </span>
          </div>
          <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6, maxWidth: 560 }}>
            Use <a href="https://ngrok.com" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>ngrok</a> or{" "}
            <a href="https://tunnel.prd.run" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>tunnel</a>{" "}
            to expose your local server. Then trigger a prediction with your
            webhook URL as the <code className="t-inline-code">fal_webhook</code>{" "}
            query parameter.
          </p>
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
          <div className="t-env-block" style={{ maxWidth: 520 }}>
            <div>
              <span className="t-env-comment"># your Fal AI API key</span>
            </div>
            <div>
              <span className="t-env-key">FAL_KEY</span>=
              <span className="t-env-val">fal_xxx</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="t-env-comment">
                # no WEBHOOK_SECRET needed — Fal uses Ed25519
              </span>
            </div>
            <div>
              <span className="t-env-comment">
                # Tern fetches Fal's public JWKS automatically
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section
        className="t-section"
        style={{ background: "var(--paper2)", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Also uses Ed25519</div>
          <Link href="/platforms/replicate" style={{ textDecoration: "none" }}>
            <div className="t-card" style={{ maxWidth: 280 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                Replicate
              </div>
              <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.5 }}>
                Also Ed25519. Secret requires an API call — not a dashboard copy.
              </div>
              <div style={{ marginTop: 10, fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)" }}>
                View guide →
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="t-cta-section">
        <div className="t-cta-inner">
          <div>
            <h2 className="t-cta-title">
              Fal AI webhooks,
              <br />
              <em>verified and reliable.</em>
            </h2>
            <p className="t-cta-desc">Open source · MIT licensed · Built at Hookflo</p>
          </div>
          <div className="t-cta-actions">
            <a href="https://github.com/Hookflo/tern" target="_blank" rel="noreferrer" className="t-btn-cta">
              ⭐ Star on GitHub
            </a>
            <a href="https://github.com/Hookflo/tern/blob/main/README.md" target="_blank" rel="noreferrer" className="t-btn-cta-sec">
              Read the docs →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}