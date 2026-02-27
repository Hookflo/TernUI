import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function NextJsFrameworkPage() {
  return (
    <main className="tern-page">
      <SiteNav />
      <section className="section hero">
        <p className="label">Framework — Next.js app router</p>
        <h1>The webhook handler Next.js was missing.</h1>
        <p className="muted maxw">Purpose-built App Router adapter. Reads platform and secret from Vercel feature flags at runtime. Switch platforms without redeploying.</p>
        <span className="pill">stable</span>
      </section>

      <section className="section"><pre className="code-block">$ npm i @hookflo/tern</pre></section>

      <section className="section">
        <p className="label">Modes</p>
        <pre className="code-block">{`// app/api/webhooks/route.ts
import { createWebhookHandler } from '@hookflo/tern/nextjs'

export const POST = createWebhookHandler({
  platform: 'stripe',
  secret: process.env.WEBHOOK_SECRET!,
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
      </section>

      <section className="section">
        <h2>Switch platforms with a flag flip.</h2>
        <pre className="code-block">{`import { createWebhookHandler } from '@hookflo/tern/nextjs'
import { platform } from '../flags'

export const POST = createWebhookHandler({
  platform: await platform(),
  secret: process.env.WEBHOOK_SECRET!,
  handler: async (payload) => {
    return { received: true }
  }
})`}</pre>
      </section>

      <section className="section grid two">
        <article className="card"><h3>Environment variables</h3><pre className="code-block small">{`WEBHOOK_SECRET=whsec_xxx
QSTASH_TOKEN=qstash_xxx
QSTASH_CURRENT_SIGNING_KEY=sig_xxx
QSTASH_NEXT_SIGNING_KEY=sig_xxx`}</pre></article>
        <article className="card"><h3>Two-call pattern</h3><p className="muted">Call 1: Platform → Tern verify + enqueue + 200. Call 2: QStash → Tern verify QStash signature + run handler.</p></article>
      </section>

      <section className="section grid two">
        <article className="card"><h3>Test locally</h3><ul className="list muted"><li>Stripe: stripe listen + stripe trigger</li><li>Clerk: Dashboard → Webhooks → Send test webhook</li><li>GitHub: Recent deliveries → Redeliver</li><li>Fal AI: curl to queue.fal.run with ngrok URL</li><li>Replicate: curl to api.replicate.com with ngrok URL</li><li>Razorpay: Dashboard → Webhooks → Send test webhook</li></ul></article>
        <article className="card"><h3>Error reference</h3><ul className="list muted"><li>"Webhook secret is not configured"</li><li>"Missing signature header: stripe-signature"</li><li>"Queue temporarily unavailable"</li><li>"DeduplicationId cannot contain ':'"</li></ul></article>
      </section>

      <section className="section footer-cta"><a className="btn primary" href="https://github.com/Hookflo/tern">GitHub →</a><Link className="btn ghost" href="/upstash">Reliable Delivery →</Link></section>
    </main>
  );
}
