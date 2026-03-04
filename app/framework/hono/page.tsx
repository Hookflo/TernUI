"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import CodeBlock from "@/components/code-block";
import { DESIGN_CSS } from "@/lib/design";

const PAGE_CSS = `
  .ho-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; max-width:1200px; margin:0 auto; padding:clamp(60px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,6vw,70px); }
  @media(max-width:900px){ .ho-hero-grid { grid-template-columns:1fr; gap:40px; } }

  .ho-list { display:grid; gap:10px; max-width:760px; }
  .ho-list-row { background:white; border:1px solid var(--border); border-radius:8px; padding:12px 14px; display:flex; align-items:center; gap:10px; }
  .ho-list-dot { width:7px; height:7px; border-radius:50%; background:var(--green); flex-shrink:0; }
  .ho-list-txt { font-family:var(--mono); font-size:11px; color:var(--ink2); }
`;

const TABS = [
  { label: "Basic", filename: "src/index.ts" },
  { label: "Queue + retries", filename: "src/index.ts" },
  { label: "Reliable controls", filename: "src/admin/reliability.ts" },
];

const CODE = [
  `import { Hono } from 'hono'
import { createWebhookHandler } from '@hookflo/tern/hono'

const app = new Hono()

app.post('/webhooks/stripe', createWebhookHandler({
  platform: 'stripe',
  secret: process.env.WEBHOOK_SECRET!,
  handler: async (payload) => {
    // verified payload
    return { received: true, type: payload.type }
  }
}))

export default app`,
  `import { Hono } from 'hono'
import { createWebhookHandler } from '@hookflo/tern/hono'

const app = new Hono()

app.post('/webhooks/stripe', createWebhookHandler({
  platform: 'stripe',
  secret: process.env.WEBHOOK_SECRET!,
  queue: {
    token: process.env.QSTASH_TOKEN!,
    signingKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    retries: 5,
  },
  handler: async (payload) => {
    return { received: true, id: payload.id }
  }
}))

export default app`,
  `import { createTernControls } from '@hookflo/tern/upstash'

const controls = createTernControls({
  token: process.env.QSTASH_TOKEN!
})

export async function getDlq() {
  const failed = await controls.dlq()
  return { count: failed.length, events: failed }
}

export async function replay(dlqId: string) {
  return controls.replay(dlqId)
}

export async function cancel(msgId: string) {
  return controls.cancel(msgId)
}`,
];

export default function HonoPage() {
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

      <div className="ho-hero-grid fade-up-1">
        <div>
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
                background: "#fff7ed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "2px 3px 0 var(--border)",
                color: "#c2410c",
                fontFamily: "var(--mono)",
                fontWeight: 700,
              }}
            >
              H
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
              Hono Framework
            </div>
          </div>

          <div className="t-eyebrow">Framework — Hono</div>
          <h1 className="t-h1">
            Fast webhook verification,
            <br />
            <em>from edge to node.</em>
          </h1>
          <p className="t-hero-desc">
            Tern's Hono adapter keeps your webhook endpoints tiny and reliable.
            Use one handler across Cloudflare, Bun, Deno, and Node.js with
            consistent verification, queuing, and replay controls.
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
            <span className="t-badge new">edge + node</span>
          </div>
          <div className="t-install">
            <div className="t-install-cmd">
              <span>$</span> npm i @hookflo/tern hono
            </div>
            <button
              className="t-copy-btn"
              onClick={() => copy("npm i @hookflo/tern hono")}
              title="Copy"
            >
              {copied ? "✓" : "⎘"}
            </button>
          </div>
        </div>

        <div>
          <CodeBlock code={CODE[1]} filename="src/index.ts" />
        </div>
      </div>

      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Usage</div>
          <h2 className="t-h2">
            Use Tern with Hono
            <br />
            <em>in production workflows.</em>
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

          <div className="ho-list" style={{ marginTop: 24 }}>
            {[
              "Reuse the same verification logic on edge and server runtimes.",
              "Enable queue retries with QStash to protect against transient failures.",
              "Inspect DLQ and replay failed events with Tern controls.",
            ].map((item) => (
              <div className="ho-list-row" key={item}>
                <div className="ho-list-dot" />
                <div className="ho-list-txt">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="t-section" style={{ background: "var(--paper2)" }}>
        <div className="t-section-inner">
          <div className="t-section-label">Reliability</div>
          <h2 className="t-h2">
            Pair Hono adapter with
            <br />
            <em>reliable delivery controls.</em>
          </h2>
          <p className="t-lead" style={{ maxWidth: 760 }}>
            Tern with Upstash gives your Hono webhook endpoints retry queues,
            dead-letter visibility, and replay APIs so webhook processing stays
            durable under load.
          </p>
          <Link href="/upstash" className="t-btn-primary" style={{ marginTop: 18 }}>
            Explore Reliable Delivery
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
