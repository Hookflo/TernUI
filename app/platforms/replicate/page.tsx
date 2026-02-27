"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import CodeBlock from "@/components/code-block";
import { DESIGN_CSS } from "@/lib/design";

const PAGE_CSS = `
  .plat-hero { max-width:1200px; margin:0 auto; padding:clamp(60px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,6vw,70px); }
`;

const CODE_SECRET = `# Run this once to get your webhook secret
curl -s \\
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \\
  https://api.replicate.com/v1/webhooks/default/secret

# Response:
# { "key": "whsec_C2FVsBQIhrscChlQ..." }
#
# That whsec_ value is your REPLICATE_WEBHOOK_SECRET
# Store it in .env — done.`;

const CODE_HANDLER = `import { createWebhookHandler } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'replicate',
  secret:   process.env.REPLICATE_WEBHOOK_SECRET!,
  handler:  async (payload) => {
    if (payload.status === 'succeeded') {
      console.log('Output:', payload.output)
    }
    return { received: true }
  }
})`;

const CODE_TRIGGER = `# Trigger a prediction with a webhook
curl -s -X POST \\
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "version": "YOUR_MODEL_VERSION",
    "input": { "prompt": "a red cat" },
    "webhook": "https://your-app.com/api/webhooks",
    "webhook_events_filter": ["completed"]
  }' \\
  https://api.replicate.com/v1/predictions`;

const TABS = [
  { label: "Get secret", code: CODE_SECRET, filename: "terminal" },
  { label: "Webhook handler", code: CODE_HANDLER, filename: "app/api/webhooks/route.ts" },
  { label: "Trigger", code: CODE_TRIGGER, filename: "terminal" },
];

export default function ReplicatePage() {
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
            background: "white", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "2px 3px 0 var(--border)",
          }}>
       <img src="/assets/replicate.svg" alt="Fal AI" style={{ width: 20, height: 20 }} />
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink3)" }}>
            Replicate — Platform Guide
          </div>
        </div>

        <div className="t-eyebrow">Platform — Replicate</div>
        <h1 className="t-h1">
          Replicate webhooks,
          <br />
          <em>without the confusion.</em>
        </h1>
        <p className="t-hero-desc">
          Replicate uses Ed25519 — not HMAC. The webhook secret requires an API
          call, not a dashboard copy. Tern handles verification. Here's
          everything you need.
        </p>
      </div>

      {/* ── CRITICAL INFO ── */}
      <section className="t-section" style={{ paddingTop: 0 }}>
        <div className="t-section-inner">
          <div
            style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", maxWidth: 720 }}
          >
            <div className="t-crit-box">
              <div className="t-crit-box-title">Ed25519, not HMAC</div>
              Unlike Stripe or Clerk, Replicate signs with Ed25519 public key
              cryptography. Tern handles it — just pass the secret from the API
              call below.
            </div>
            <div className="t-warn-box">
              <div className="t-warn-box-title">
                Secret requires an API call
              </div>
              You can't copy it from the dashboard. Run the{" "}
              <code style={{ fontFamily: "var(--mono)" }}>curl</code> command in
              Tab 1 once. Store the <code style={{ fontFamily: "var(--mono)" }}>whsec_</code>{" "}
              value. Done.
            </div>
          </div>
        </div>
      </section>

      {/* ── CODE TABS ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Setup</div>
          <h2 className="t-h2">
            Three steps,
            <br />
            <em>fully verified.</em>
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

      {/* ── STEPS ── */}
      <section
        className="t-section"
        style={{ background: "var(--paper2)", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Step by step</div>
          <h2 className="t-h2">
            Exactly what
            <br />
            <em>to do.</em>
          </h2>
          <div className="t-steps" style={{ maxWidth: 700 }}>
            {[
              {
                n: "1",
                title: "Get your webhook secret",
                desc: 'Run the curl command from "Get secret" tab above. Save the whsec_ value to REPLICATE_WEBHOOK_SECRET in your .env file.',
              },
              {
                n: "2",
                title: "Create your webhook handler",
                desc: 'Use the code from "Webhook handler" tab. Platform is \'replicate\', secret is your REPLICATE_WEBHOOK_SECRET.',
              },
              {
                n: "3",
                title: "Trigger a prediction",
                desc: 'Pass your webhook URL to the Replicate predictions API. Use webhook_events_filter: ["completed"] to skip intermediate states.',
              },
            ].map((step) => (
              <div className="t-step" key={step.n}>
                <div className="t-step-num">{step.n}</div>
                <div className="t-step-body">
                  <div className="t-step-title">{step.title}</div>
                  <div className="t-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENV VARS ── */}
      <section
        className="t-section"
        style={{ background: "var(--paper)", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Environment variables</div>
          <h2 className="t-h2">What you need.</h2>
          <div className="t-env-block" style={{ maxWidth: 540 }}>
            <div>
              <span className="t-env-comment"># your Replicate API token</span>
            </div>
            <div>
              <span className="t-env-key">REPLICATE_API_TOKEN</span>=
              <span className="t-env-val">r8_xxx</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="t-env-comment">
                # from: curl ...api.replicate.com/v1/webhooks/default/secret
              </span>
            </div>
            <div>
              <span className="t-env-key">REPLICATE_WEBHOOK_SECRET</span>=
              <span className="t-env-val">whsec_xxx</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Also uses Ed25519</div>
          <Link href="/platforms/falai" style={{ textDecoration: "none" }}>
            <div className="t-card" style={{ maxWidth: 280 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                Fal AI
              </div>
              <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.5 }}>
                Also Ed25519. Pass empty string for secret — Tern auto-fetches
                the JWKS.
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
              Replicate webhooks,
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