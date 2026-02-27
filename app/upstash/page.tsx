"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import CodeBlock from "@/components/code-block";
import { DESIGN_CSS } from "@/lib/design";
import {
  Feather,
  Mail,
  Lock,
  Send,
  Cog,
  RotateCw,
  Trash2,
  CreditCard,
  User,
  GitBranch,
  Key,
} from "lucide-react";

// ─── PAGE-SPECIFIC STYLES ────────────────────────────────────────────────────
const PAGE_CSS = `
  /* STATS ROW */
  .up-stats { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--border); border-radius:10px; overflow:hidden; background:white; margin-bottom:48px; }
  @media(max-width:640px){ .up-stats { grid-template-columns:repeat(2,1fr); } }
  .up-stat { padding:24px 16px; text-align:center; border-right:1px solid var(--border); }
  .up-stat:last-child { border-right:none; }
  @media(max-width:640px){ .up-stat:nth-child(2){ border-right:none; } .up-stat:nth-child(3){ border-top:1px solid var(--border); } }
  .up-stat-val { font-family:var(--display); font-size:34px; font-style:italic; color:var(--green); line-height:1; }
  .up-stat-lbl { font-family:var(--mono); font-size:9px; color:var(--ink4); margin-top:6px; letter-spacing:.1em; text-transform:uppercase; }
  .up-stat-sub { font-family:var(--mono); font-size:9px; color:var(--ink4); margin-top:3px; letter-spacing:.05em; }

  /* BYOK BANNER */
  .up-byok {
    border:1.5px solid var(--border2); border-radius:12px;
    overflow:hidden; box-shadow:4px 5px 0 var(--border); margin-bottom:48px;
  }
  .up-byok-top { padding:24px 28px; background:var(--paper2); border-bottom:1px solid var(--border); display:flex; align-items:flex-start; gap:16px; }
  .up-byok-icon { font-size:24px; flex-shrink:0; }
  .up-byok-title { font-family:var(--display); font-size:22px; font-weight:400; color:var(--ink); margin-bottom:6px; }
  .up-byok-title em { font-style:italic; }
  .up-byok-desc { font-size:14px; color:var(--ink3); line-height:1.6; }
  .up-byok-bot { padding:14px 28px; background:white; display:flex; align-items:center; gap:12px; }
  .up-byok-code { font-family:var(--mono); font-size:12px; color:var(--ink2); background:var(--paper2); border:1px solid var(--border); border-radius:4px; padding:8px 14px; }
  .up-byok-code span { color:var(--ink4); }

  /* FLOW */
  .up-flow { display:flex; align-items:center; gap:0; overflow-x:auto; padding-bottom:8px; margin-bottom:48px; }
  .up-flow-step { display:flex; flex-direction:column; align-items:center; gap:8px; min-width:90px; flex-shrink:0; }
  .up-flow-icon { width:52px; height:52px; border-radius:12px; border:1.5px solid var(--border); background:white; display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:2px 3px 0 var(--border); }
  .up-flow-icon.green { border-color:#a7f3d0; background:var(--green-bg); }
  .up-flow-icon.yellow { border-color:#fde68a; background:#fffbeb; }
  .up-flow-icon.red   { border-color:#fca5a5; background:var(--red-bg); }
  .up-flow-label { font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink); text-align:center; }
  .up-flow-sub { font-family:var(--mono); font-size:9px; color:var(--ink4); text-align:center; }
  .up-flow-arrow { font-size:14px; color:var(--border2); padding:0 4px; margin-top:-20px; flex-shrink:0; }

  /* FEATURES GRID */
  .up-features { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:10px; overflow:hidden; margin-bottom:48px; }
  .up-feature { background:white; padding:28px 24px; }
  .up-feature:hover { background:#fdfcfb; }
  .up-feature-num { font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink4); letter-spacing:.1em; margin-bottom:14px; }
  .up-feature-title { font-family:var(--serif); font-size:16px; font-weight:600; color:var(--ink); margin-bottom:8px; }
  .up-feature-desc { font-size:13.5px; color:var(--ink3); line-height:1.55; margin-bottom:10px; }
  .up-feature-tag { font-family:var(--mono); font-size:10px; background:var(--paper2); border:1px solid var(--border); color:var(--ink2); border-radius:3px; padding:3px 8px; display:inline-block; }

  /* DLQ TABLE */
  .up-dlq { border:1.5px solid var(--border2); border-radius:10px; overflow:hidden; box-shadow:4px 5px 0 var(--border); }
  .up-dlq-header { padding:14px 20px; background:var(--paper2); border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .up-dlq-title { font-family:var(--mono); font-size:12px; font-weight:700; color:var(--ink); }
  .up-dlq-count { font-family:var(--mono); font-size:10px; color:var(--red); background:var(--red-bg); padding:3px 8px; border-radius:20px; font-weight:700; }
  .up-dlq-row { display:grid; grid-template-columns:1fr auto auto auto; gap:16px; align-items:center; padding:14px 20px; border-bottom:1px solid var(--border); background:white; transition:background .15s; }
  .up-dlq-row:last-child { border-bottom:none; }
  .up-dlq-row:hover { background:var(--paper2); }
  .up-dlq-row.replayed { opacity:.4; }
  .up-dlq-id { font-family:var(--mono); font-size:11px; color:var(--ink2); }
  .up-dlq-event { font-family:var(--mono); font-size:10px; color:var(--ink3); margin-top:3px; }
  .up-dlq-attempts { font-family:var(--mono); font-size:10px; color:var(--red); text-align:right; }
  .up-dlq-time { font-family:var(--mono); font-size:10px; color:var(--ink4); text-align:right; }
  .up-dlq-replay { font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink); border:1px solid var(--border); background:white; border-radius:4px; padding:5px 10px; cursor:pointer; transition:background .15s, border-color .15s; white-space:nowrap; }
  .up-dlq-replay:hover { background:var(--ink); color:var(--paper); border-color:var(--ink); }
  .up-dlq-replay:disabled { opacity:.4; cursor:default; }
  @media(max-width:600px){ .up-dlq-row { grid-template-columns:1fr auto; } .up-dlq-attempts, .up-dlq-time { display:none; } }

  /* DEDUP VISUAL */
  .up-dedup { display:flex; flex-direction:column; gap:8px; }
  .up-dedup-row { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:8px; border:1px solid var(--border); background:white; font-family:var(--mono); font-size:12px; }
  .up-dedup-row.processed { border-color:#a7f3d0; background:var(--green-bg); }
  .up-dedup-row.dropped { border-color:var(--border); background:var(--paper2); opacity:.6; }
  .up-dedup-icon { font-size:14px; flex-shrink:0; }
  .up-dedup-id { color:var(--ink2); flex:1; }
  .up-dedup-event { color:var(--ink4); font-size:10px; }
  .up-dedup-status { font-size:10px; font-weight:700; padding:3px 8px; border-radius:20px; flex-shrink:0; }
  .up-dedup-row.processed .up-dedup-status { background:var(--green-bg); color:var(--green); }
  .up-dedup-row.dropped   .up-dedup-status { background:var(--paper2); color:var(--ink4); }

  /* COST TABLE */
  .up-cost-table { width:100%; border-collapse:collapse; border:1.5px solid var(--border2); border-radius:10px; overflow:hidden; box-shadow:4px 5px 0 var(--border); }
  .up-cost-table th { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--ink4); padding:14px 20px; background:var(--paper2); text-align:left; border-bottom:1px solid var(--border); }
  .up-cost-table td { font-family:var(--mono); font-size:13px; color:var(--ink2); padding:14px 20px; border-bottom:1px solid var(--border); }
  .up-cost-table tr:last-child td { border-bottom:none; }
  .up-cost-table tr:hover td { background:#fdfcfb; }
  .up-cost-tern { color:var(--green); font-weight:700; }
  .up-cost-note { font-family:var(--mono); font-size:11px; color:var(--ink4); margin-top:14px; }

  /* FREE TIER */
  .up-free { border:1.5px solid #a7f3d0; border-radius:10px; padding:20px 24px; background:var(--green-bg); }
  .up-free-title { font-family:var(--serif); font-size:16px; font-weight:600; color:var(--green); margin-bottom:10px; }
  .up-free-items { display:flex; flex-direction:column; gap:6px; }
  .up-free-item { font-family:var(--mono); font-size:12px; color:var(--ink2); display:flex; align-items:center; gap:8px; }
  .up-free-check { color:var(--green); font-weight:700; }
`;

// ─── DLQ INTERACTIVE DATA ────────────────────────────────────────────────────
type DLQItem = {
  id: string;
  icon: React.ReactNode;
  event: string;
  attempts: string;
  time: string;
  replayed: boolean;
};

const INITIAL_DLQ: DLQItem[] = [
  {
    id: "msg_26hZ4k...",
    icon: <CreditCard className="w-4 h-4 " />,
    event: "payment_intent.failed",
    attempts: "3/3 ✗",
    time: "2m ago",
    replayed: false,
  },
  {
    id: "msg_8xKp9r...",
    icon: <User className="w-4 h-4" />,
    event: "user.created",
    attempts: "3/3 ✗",
    time: "14m ago",
    replayed: false,
  },
  {
    id: "msg_3rNz7m...",
    icon: <GitBranch className="w-4 h-4" />,
    event: "push",
    attempts: "3/3 ✗",
    time: "1h ago",
    replayed: false,
  },
];

// ─── CODE EXAMPLES ───────────────────────────────────────────────────────────
const CODE_SIMPLE = `// app/api/webhooks/route.ts
import { createWebhookHandler } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'stripe',
  secret:   process.env.WEBHOOK_SECRET!,
  queue:    true,  // reads QSTASH_* from env automatically
  handler:  async (payload) => {
    // ✓ verified & queued — handle your event
    return { received: true }
  }
})`;

const CODE_EXPLICIT = `// Cloudflare Workers or non-Vercel deploys
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
})`;

const CODE_DLQ = `import { createTernControls } from '@hookflo/tern/upstash'

const controls = createTernControls({
  token: process.env.QSTASH_TOKEN!
})

// GET — inspect dead-letter queue
export const GET = async () => {
  const failed = await controls.dlq()
  return Response.json({ count: failed.length, events: failed })
}

// PATCH — replay a failed event
export const PATCH = async (req: Request) => {
  const { dlqId } = await req.json()
  const result = await controls.replay(dlqId)
  return Response.json(result)
}`;

// ─── FLOW STEPS ──────────────────────────────────────────────────────────────

const FLOW = [
  {
    icon: <Mail className="w-4 h-4 text-gray-900/70" />,
    label: "Incoming",
    sub: "Stripe / Clerk / GitHub",
    style: "",
  },
  {
    icon: <Lock className="w-4 h-4 text-gray-900/70" />,
    label: "Verify",
    sub: "Signature check",
    style: "green",
  },
  {
    icon: <Send className="w-4 h-4 text-gray-900/70" />,
    label: "Enqueue",
    sub: "QStash BYOK",
    style: "green",
  },
  {
    icon: <Cog className="w-4 h-4 text-gray-900/70" />,
    label: "Handler",
    sub: "Your logic",
    style: "green",
  },
  {
    icon: <RotateCw className="w-4 h-4 text-gray-900/70" />,
    label: "Retry",
    sub: "Backoff",
    style: "yellow",
  },
  {
    icon: <Trash2 className="w-4 h-4 text-gray-900/70" />,
    label: "DLQ",
    sub: "Exhausted",
    style: "red",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function UpstashPage() {
  const [tab, setTab] = useState(0);
  const [dlq, setDlq] = useState(INITIAL_DLQ);
  const [copied, setCopied] = useState(false);

  const replay = (id: string) => {
    setDlq((prev) =>
      prev.map((item) => (item.id === id ? { ...item, replayed: true } : item)),
    );
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCode = [CODE_SIMPLE, CODE_EXPLICIT, CODE_DLQ][tab];

  return (
    <div className="tern-root">
      <style>{DESIGN_CSS + PAGE_CSS}</style>

      <SiteNav />

      {/* ── HERO ── */}
      <div className="t-page-hero fade-up-1">
        {/* Logo lockup — Tern × Upstash */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {/* Tern logo */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "1.5px solid var(--border2)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 3px 0 var(--border)",
            }}
          >
            <Feather className="w-7 h-7 text-orange-500 " />
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
            Tern
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              color: "var(--ink4)",
              letterSpacing: ".08em",
            }}
          >
            ×
          </div>
          {/* Upstash logo mark */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "1.5px solid var(--border2)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 3px 0 var(--border)",
            }}
          >
            <img
              src="/assets/upstash.svg"
              alt="Cloudflare"
              style={{ width: 30, height: 30 }}
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
            Upstash QStash
          </div>
        </div>

        <div className="t-eyebrow">Reliable Delivery</div>
        <h1 className="t-h1">
          From fire-and-forget
          <br />
          <em>to guaranteed delivery.</em>
        </h1>
        <p className="t-hero-desc">
          Every verified webhook is queued, retried on failure, deduplicated,
          and recoverable from a dead-letter queue. Bring Your Own Keys (BYOK) —
          your Upstash account, zero infrastructure. Your data never leaves your
          stack.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#setup" className="t-btn-primary">
            Get started →
          </a>
          <a
            href="https://github.com/Hookflo/tern"
            target="_blank"
            rel="noreferrer"
            className="t-btn-secondary"
          >
            View on GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 10L10 2M10 2H4M10 2v6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ── BYOK BANNER ── */}
      <section className="t-section" style={{ paddingTop: 0 }}>
        <div className="t-section-inner">
          <div className="up-byok">
            <div className="up-byok-top">
              <div>
                <div className="up-byok-title align-middle items-center flex gap-2">
                  <div className="up-byok-icon">
                    <Key />
                  </div>
                  Bring Your Own <em>Keys</em>
                </div>
                <p className="up-byok-desc">
                  Tern never manages your Upstash credentials. Pass your QStash
                  token — your events flow through your account directly. No
                  vendor lock-in. No data routed through Hookflo's servers.
                </p>
              </div>
            </div>
            <div
              className="up-byok-bot"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "QSTASH_TOKEN=qstash_••••••••••",
                  "QSTASH_CURRENT_SIGNING_KEY=sig_••••••••",
                  "QSTASH_NEXT_SIGNING_KEY=sig_••••••••",
                ].map((line) => {
                  const [k, v] = line.split("=");
                  return (
                    <div className="up-byok-code" key={k}>
                      <span>{k}=</span>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--ink4)",
                  }}
                >
                  your keys · your Upstash account · your data
                </div>
                <a
                  href="https://console.upstash.com/qstash"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--green)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    borderBottom: "1px solid #a7f3d0",
                    paddingBottom: 1,
                  }}
                >
                  Get your keys from Upstash Console →
                </a>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="up-stats">
            <div className="up-stat">
              <div className="up-stat-val">∞</div>
              <div className="up-stat-lbl">Retries</div>
              <div className="up-stat-sub">configurable</div>
            </div>
            <div className="up-stat">
              <div className="up-stat-val">0</div>
              <div className="up-stat-lbl">Infra</div>
              <div className="up-stat-sub">to manage</div>
            </div>
            <div className="up-stat">
              <div className="up-stat-val">1</div>
              <div className="up-stat-lbl">Config</div>
              <div className="up-stat-sub">option</div>
            </div>
            <div className="up-stat">
              <div className="up-stat-val">100%</div>
              <div className="up-stat-lbl">Sovereignty</div>
              <div className="up-stat-sub">data stays yours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOW DIAGRAM ── */}
      <section
        className="t-section"
        style={{
          background: "white",
          borderTop: "1px solid var(--border)",
          paddingTop: "clamp(50px,8vw,90px)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Delivery guarantee</div>
          <h2 className="t-h2">
            Every failure mode has
            <br />
            <em>a defined recovery path.</em>
          </h2>
          <p className="t-section-desc">
            No event gets silently lost. Signature invalid → non-retryable.
            QStash down → retryable. Handler fails → backoff. Exhausted → DLQ.
          </p>
          <div className="up-flow">
            {FLOW.map((step, i) => (
              <div key={i}>
                <div className="up-flow-step" key={step.label}>
                  <div className={`up-flow-icon ${step.style}`}>
                    {step.icon}
                  </div>
                  <div className="up-flow-label">{step.label}</div>
                  <div className="up-flow-sub">{step.sub}</div>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="up-flow-arrow" key={`arrow-${i}`}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">What's included</div>
          <h2 className="t-h2">
            Verification was just
            <br />
            <em>the beginning.</em>
          </h2>
          <div className="up-features">
            {[
              {
                num: "01",
                title: "Automatic Retries",
                desc: "QStash retries failed deliveries with exponential backoff. Configure retry count or use your plan default. Handler down? It'll try again.",
                tag: "queue: { retries: 3 }",
              },
              {
                num: "02",
                title: "Dead-Letter Queue",
                desc: "Events exhausting all retries land in your DLQ — never lost forever. Inspect programmatically and replay any event at any time.",
                tag: "controls.dlq()",
              },
              {
                num: "03",
                title: "Deduplication",
                desc: "Same event arriving twice — from Stripe retries or network hiccups — processed exactly once. Per-platform ID resolution with SHA-256 fallback.",
                tag: "built-in · Upstash-Deduplication-Id",
              },
              {
                num: "04",
                title: "Programmatic Replay",
                desc: "Replay any DLQ message with a single API call. No dashboard required. Full control from your code — inspect, filter, and replay on demand.",
                tag: "controls.replay(dlqId)",
              },
            ].map((f) => (
              <div className="up-feature" key={f.num}>
                <div className="up-feature-num">{f.num}</div>
                <div className="up-feature-title">{f.title}</div>
                <div className="up-feature-desc">{f.desc}</div>
                <div className="up-feature-tag">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CODE SECTION ── */}
      <section
        id="setup"
        className="t-section"
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Setup</div>
          <h2 className="t-h2">
            Two options,
            <br />
            <em>one install.</em>
          </h2>
          <p className="t-section-desc" style={{ marginBottom: 20 }}>
            <code className="t-inline-code">queue: true</code> is zero-config
            for Next.js on Vercel. Use explicit config for Cloudflare Workers,
            custom env names, or non-Vercel deploys.
          </p>

          <div style={{ marginBottom: 12 }}>
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

          <div style={{ marginTop: 28 }}>
            <div className="t-tabs">
              {[
                "queue: true (Next.js)",
                "Explicit BYOK config",
                "DLQ Controls",
              ].map((label, i) => (
                <button
                  key={label}
                  className={`t-tab ${tab === i ? "active" : ""}`}
                  onClick={() => setTab(i)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Fix 6 — queue: true env note */}
            {tab === 0 && (
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "#92400e",
                  background: "#fffbeb",
                  border: "1px solid #fde68a",
                  borderRadius: 6,
                  padding: "9px 14px",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>
                  <strong>queue: true</strong> reads{" "}
                  <strong>QSTASH_TOKEN</strong>,{" "}
                  <strong>QSTASH_CURRENT_SIGNING_KEY</strong>, and{" "}
                  <strong>QSTASH_NEXT_SIGNING_KEY</strong> from your environment
                  automatically. All three must be set.
                </span>
              </div>
            )}

            {/* Fix 1 + Fix 3 — syntax highlighted code with copy button */}
            <CodeBlock code={activeCode} filename="app/api/webhooks/route.ts" />
          </div>

          {/* ENV VARS */}
          <div style={{ marginTop: 24 }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--ink4)",
                marginBottom: 10,
              }}
            >
              Environment variables
            </div>
            <div className="t-env-block">
              <div>
                <span className="t-env-comment"># required always</span>
              </div>
              <div>
                <span className="t-env-key">WEBHOOK_SECRET</span>=
                <span className="t-env-val">whsec_xxx</span>
              </div>
              <div>&nbsp;</div>
              <div>
                <span className="t-env-comment">
                  # required with queue: true or explicit config
                </span>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── DLQ VISUAL ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Dead-letter queue</div>
          <h2 className="t-h2">
            Nothing gets lost.
            <br />
            <em>Everything is replayable.</em>
          </h2>
          <p className="t-section-desc" style={{ marginBottom: 28 }}>
            Events exhausting all retries land in your DLQ. Inspect them. Fix
            the root cause. Replay any time.
          </p>
          <div className="up-dlq">
            <div className="up-dlq-header">
              <span className="up-dlq-title">Dead Letter Queue</span>
              <span className="up-dlq-count">
                {dlq.filter((d) => !d.replayed).length} failed
              </span>
            </div>
            {dlq.map((item) => (
              <div
                className={`up-dlq-row ${item.replayed ? "replayed" : ""}`}
                key={item.id}
              >
                <div>
                  <div className="up-dlq-id flex align-middle items-center gap-2">
                    {item.icon} {item.id}
                  </div>
                  <div className="up-dlq-event">{item.event}</div>
                </div>
                <div className="up-dlq-attempts">{item.attempts}</div>
                <div className="up-dlq-time">{item.time}</div>
                <button
                  className="up-dlq-replay"
                  onClick={() => replay(item.id)}
                  disabled={item.replayed}
                >
                  {item.replayed ? "✓ Replayed" : "↺ Replay"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEDUP VISUAL ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Deduplication</div>
          <h2 className="t-h2">
            Same event twice?
            <br />
            <em>Processed once.</em>
          </h2>
          <p className="t-section-desc" style={{ marginBottom: 28 }}>
            Tern resolves a stable deduplication ID per platform — Stripe
            idempotency key, GitHub delivery header, Clerk svix-id — with
            SHA-256 hash fallback. QStash drops duplicates within a 10-minute
            window.
          </p>
          <div className="up-dedup">
            {[
              {
                style: "processed",
                icon: "✓",
                id: "evt_stripe_001",
                event: "payment_intent.succeeded",
                status: "processed",
              },
              {
                style: "dropped",
                icon: "⊘",
                id: "evt_stripe_001",
                event: "payment_intent.succeeded",
                status: "duplicate — dropped",
              },
              {
                style: "dropped",
                icon: "⊘",
                id: "evt_stripe_001",
                event: "payment_intent.succeeded",
                status: "duplicate — dropped",
              },
              {
                style: "processed",
                icon: "✓",
                id: "evt_stripe_002",
                event: "payment_intent.succeeded",
                status: "processed",
              },
            ].map((row, i) => (
              <div className={`up-dedup-row ${row.style}`} key={i}>
                <div className="up-dedup-icon">{row.icon}</div>
                <div className="up-dedup-id">{row.id}</div>
                <div className="up-dedup-event">{row.event}</div>
                <div className="up-dedup-status">{row.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COST COMPARISON ── */}
      <section
        className="t-section"
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Pricing</div>
          <h2 className="t-h2">
            Pay Upstash directly.
            <br />
            <em>Not a middleman.</em>
          </h2>
          <p className="t-section-desc" style={{ marginBottom: 28 }}>
            Tern is free and open source. You pay Upstash directly — no markup,
            no platform fee, no lock-in.
          </p>

          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "1fr 1fr",
              maxWidth: 860,
            }}
          >
            <div>
              <table className="up-cost-table">
                <thead>
                  <tr>
                    <th>Volume</th>
                    <th>Hookdeck</th>
                    <th>Tern + QStash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Base/month</td>
                    <td>$39</td>
                    <td className="up-cost-tern">$0</td>
                  </tr>
                  <tr>
                    <td>500K events</td>
                    <td>$44/mo</td>
                    <td className="up-cost-tern">~$5/mo</td>
                  </tr>
                  <tr>
                    <td>5M events</td>
                    <td>$89/mo</td>
                    <td className="up-cost-tern">~$50/mo</td>
                  </tr>
                  <tr>
                    <td>Data through</td>
                    <td>Their infra</td>
                    <td className="up-cost-tern">Your Upstash</td>
                  </tr>
                </tbody>
              </table>
              <div className="up-cost-note">
                Tern is free. You pay Upstash directly.
              </div>
            </div>

            <div className="up-free">
              <div className="up-free-title">Upstash free tier</div>
              <div className="up-free-items">
                {[
                  "1,000 messages/day free",
                  "No credit card required",
                  "Upgrade only when you need to",
                  "Most indie projects = $0/month total",
                ].map((item) => (
                  <div className="up-free-item" key={item}>
                    <span className="up-free-check">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK LINKS ── */}
      <section
        className="t-section"
        style={{ background: "white", borderTop: "1px solid var(--border)" }}
      >
        <div className="t-section-inner">
          <div className="t-section-label">Framework guides</div>
          <h2 className="t-h2">
            Pick your
            <br />
            <em>runtime.</em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 16,
              maxWidth: 640,
            }}
          >
            {[
              {
                href: "/framework/nextjs",
                label: "Next.js App Router",
                badge: "stable",
                desc: "App Router adapter with Vercel feature flag support.",
              },
              {
                href: "/framework/cloudflare",
                label: "Cloudflare Workers",
                badge: "beta",
                desc: "Web Crypto API native. Runs in V8 isolates at the edge.",
              },
            ].map((fw) => (
              <Link
                href={fw.href}
                key={fw.href}
                style={{ textDecoration: "none" }}
              >
                <div className="t-card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {fw.label}
                    </div>
                    <span className={`t-badge ${fw.badge}`}>{fw.badge}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--ink3)",
                      lineHeight: 1.5,
                    }}
                  >
                    {fw.desc}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--green)",
                    }}
                  >
                    View guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="t-cta-section">
        <div className="t-cta-inner">
          <div>
            <h2 className="t-cta-title">
              No event gets lost.
              <br />
              <em>Every failure has a recovery path.</em>
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
