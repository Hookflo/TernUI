import { SiteNav } from "@/components/site-nav";

export default function CloudflareFrameworkPage() {
  return (
    <main className="tern-page">
      <SiteNav />
      <section className="section hero">
        <p className="label">Framework — Cloudflare Workers</p>
        <h1>Webhook verification at the edge.</h1>
        <p className="muted maxw">Web Crypto API native. Zero Node.js dependencies. Runs in V8 isolates across Cloudflare&apos;s global network.</p>
        <span className="pill">beta</span>
      </section>

      <section className="section">
        <article className="card warning"><h3>⚠️ Important difference from Next.js</h3><p className="muted">queue: true does NOT work on Cloudflare Workers. Always use explicit queue config with the env parameter.</p></article>
      </section>

      <section className="section"><pre className="code-block">{`import { createWebhookHandler } from '@hookflo/tern/cloudflare'

export interface Env {
  WEBHOOK_SECRET: string
  QSTASH_TOKEN: string
  QSTASH_CURRENT_SIGNING_KEY: string
  QSTASH_NEXT_SIGNING_KEY: string
  [key: string]: unknown
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const handler = createWebhookHandler({
      platform: 'stripe',
      secret: env.WEBHOOK_SECRET,
      queue: {
        token: env.QSTASH_TOKEN,
        signingKey: env.QSTASH_CURRENT_SIGNING_KEY,
        nextSigningKey: env.QSTASH_NEXT_SIGNING_KEY,
      },
      handler: async (payload) => {
        return { received: true }
      }
    })

    return handler(request, env)
  }
}`}</pre></section>

      <section className="section grid two">
        <article className="card"><h3>Secrets setup</h3><pre className="code-block small">{`WEBHOOK_SECRET=whsec_xxx
QSTASH_TOKEN=qstash_xxx

npx wrangler secret put WEBHOOK_SECRET
npx wrangler secret put QSTASH_TOKEN
npx wrangler secret put QSTASH_CURRENT_SIGNING_KEY
npx wrangler secret put QSTASH_NEXT_SIGNING_KEY`}</pre></article>
        <article className="card"><h3>Deploy</h3><pre className="code-block small">{`npx wrangler dev
npx wrangler deploy`}</pre></article>
      </section>

      <section className="section grid two">
        <article className="card"><h3>Test locally</h3><ul className="list muted"><li>Stripe: stripe listen + stripe trigger</li><li>Clerk: Dashboard → Send test webhook</li><li>GitHub: Redeliver from recent deliveries</li><li>Fal AI: curl queue.fal.run with ngrok URL</li><li>Replicate: curl predictions API with ngrok URL</li><li>Razorpay: dashboard test webhook</li></ul></article>
        <article className="card"><h3>Error reference</h3><ul className="list muted"><li>"Webhook secret is not configured"</li><li>"Missing signature header: stripe-signature"</li><li>"Queue temporarily unavailable"</li><li>"DeduplicationId cannot contain ':'"</li></ul></article>
      </section>
    </main>
  );
}
