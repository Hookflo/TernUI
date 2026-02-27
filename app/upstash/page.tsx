"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";

const dlqSeed = [
  { id: "msg_26hZ...", event: "payment_intent.failed", age: "2m ago", icon: "💳" },
  { id: "msg_8xKp...", event: "user.created", age: "14m ago", icon: "👤" },
  { id: "msg_3rNz...", event: "push", age: "1h ago", icon: "🐙" },
];

export default function UpstashPage() {
  const [dlqRows, setDlqRows] = useState(dlqSeed);

  return (
    <main className="tern-page">
      <SiteNav />
      <section className="section hero">
        <p className="label">01 — Powered by Upstash QStash</p>
        <h1>From fire-and-forget to guaranteed delivery.</h1>
        <p className="muted maxw">
          Every verified webhook is queued, retried on failure, deduplicated, and recoverable from a dead-letter queue.
          Bring Your Own Keys (BYOK). Zero infrastructure. Your data never leaves your stack.
        </p>
        <div className="actions">
          <a href="https://github.com/Hookflo/tern" className="btn primary">Get started →</a>
          <a href="https://github.com/Hookflo/tern" className="btn ghost">View on GitHub</a>
        </div>
      </section>

      <section className="section">
        <article className="card banner">
          <h3>🔑 Bring Your Own Keys</h3>
          <p className="muted">Tern never touches your Upstash credentials. Pass your QStash token and events flow through your account directly. No vendor lock-in. No data through our servers.</p>
          <code>QSTASH_TOKEN=qstash_••••••••••</code>
        </article>
        <div className="stats-grid">
          <div><strong>∞</strong><span>Retries</span></div>
          <div><strong>0</strong><span>Infra to manage</span></div>
          <div><strong>1</strong><span>Config option</span></div>
          <div><strong>100%</strong><span>Data sovereignty</span></div>
        </div>
      </section>

      <section className="section">
        <p className="label">Flow</p>
        <div className="flow">
          {["📨 Incoming", "🔐 Verify", "📬 Enqueue", "⚙️ Handler", "🔁 Retry", "📥 DLQ"].map((s, i) => (
            <div key={s} className={`flow-step ${i > 3 ? "warn" : "ok"}`}>{s}</div>
          ))}
        </div>
      </section>

      <section className="section" id="features">
        <p className="label">Queue features</p>
        <div className="grid two">
          <article className="card"><p className="num">01</p><h3>Automatic Retries</h3><p className="muted">QStash retries failed deliveries with exponential backoff.</p><code>queue: {'{ retries: 3 }'}</code></article>
          <article className="card"><p className="num">02</p><h3>Dead-Letter Queue</h3><p className="muted">Events exhausting retries land in your DLQ for replay.</p><code>controls.dlq()</code></article>
          <article className="card"><p className="num">03</p><h3>Deduplication</h3><p className="muted">Repeated webhook event IDs are processed once.</p><code>Upstash-Deduplication-Id</code></article>
          <article className="card"><p className="num">04</p><h3>Programmatic Replay</h3><p className="muted">Replay any failed message with one API call.</p><code>controls.replay(dlqId)</code></article>
        </div>
      </section>

      <section className="section">
        <p className="label">Code</p>
        <pre className="code-block">{`import { createWebhookHandler, controls } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'stripe',
  secret: process.env.WEBHOOK_SECRET!,
  queue: true,
  handler: async (payload) => {
    return { received: true }
  }
})

export const GET = async () => {
  const failed = await controls.dlq()
  return Response.json({ count: failed.length, events: failed })
}

export const PATCH = async (request: Request) => {
  const { dlqId } = await request.json()
  const result = await controls.replay(dlqId)
  return Response.json(result)
}`}</pre>
        <div className="compare card">
          <p><strong>queue: true</strong> → Next.js only, reads env automatically.</p>
          <p><strong>queue: {'{ ... }'}</strong> → all frameworks, explicit config.</p>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h3>Dead Letter Queue <span className="muted">[{dlqRows.length} failed]</span></h3>
          {dlqRows.map((row) => (
            <div className="table-row" key={row.id}>
              <span>{row.icon} {row.id}</span><span>{row.event}</span><span>3/3 ✗</span><span>{row.age}</span>
              <button onClick={() => setDlqRows((v) => v.filter((item) => item.id !== row.id))}>↺ Replay</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h3>Deduplication</h3>
          <ul className="muted list">
            <li>✓ evt_stripe_001 payment_intent.succeeded [processed]</li>
            <li>⊘ evt_stripe_001 payment_intent.succeeded [duplicate — dropped]</li>
            <li>⊘ evt_stripe_001 payment_intent.succeeded [duplicate — dropped]</li>
            <li>✓ evt_stripe_002 payment_intent.succeeded [processed]</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>Pay Upstash directly. Not a middleman.</h2>
          <table className="cost-table"><tbody>
            <tr><td>Base fee/month</td><td>$39</td><td>$0</td></tr>
            <tr><td>500K events</td><td>$44/mo</td><td>$5/mo</td></tr>
            <tr><td>5M events</td><td>$89/mo</td><td>$50/mo</td></tr>
            <tr><td>Annual saving</td><td>—</td><td>$468–$528/yr</td></tr>
          </tbody></table>
          <p className="muted">Tern is free. You pay Upstash directly.</p>
        </div>
        <div className="card banner">
          <h3>Free tier covers most projects</h3>
          <p className="muted">✓ 1,000 messages/day free · ✓ No credit card required · ✓ Upgrade only when you need to.</p>
        </div>
      </section>

      <section className="section footer-cta">
        <code>$ npm i @hookflo/tern</code>
        <div className="actions">
          <a href="https://github.com/Hookflo/tern" className="btn primary">⭐ Star on GitHub</a>
          <Link href="/frameworks/nextjs" className="btn ghost">Read the docs →</Link>
        </div>
        <p className="muted">Open source · MIT · Zero dependencies</p>
      </section>
    </main>
  );
}
