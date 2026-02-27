import { SiteNav } from "@/components/site-nav";

export default function FalAiPage() {
  return (
    <main className="tern-page">
      <SiteNav />
      <section className="section hero">
        <p className="label">Platform — Fal AI</p>
        <h1>Fal AI webhook verification with Ed25519 support.</h1>
      </section>
      <section className="section">
        <article className="card warning">
          <h3>⚠️ Fal AI uses Ed25519 — not HMAC</h3>
          <p className="muted">Unlike Stripe or Clerk, Fal AI signs with Ed25519 public key cryptography. Use <code>secret: ""</code> intentionally and tern fetches public JWKS automatically.</p>
        </article>
      </section>
      <section className="section">
        <pre className="code-block">{`curl -X POST \\
  'https://queue.fal.run/fal-ai/flux/schnell?fal_webhook=YOUR_URL' \\
  -H "Authorization: Key $FAL_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "a red cat", "num_images": 1}'`}</pre>
        <p className="muted">Fal AI sends two webhook events: IN_QUEUE and COMPLETED. Filter with <code>fal_webhook_events=completed</code>.</p>
        <p className="muted">Cheapest model for testing: <strong>fal-ai/flux/schnell</strong> — $0.003 per image.</p>
      </section>
      <section className="section grid two">
        <article className="card"><h3>Test locally</h3><ul className="list muted"><li>Fal AI: curl queue.fal.run with ngrok URL</li><li>Stripe: stripe listen + stripe trigger</li><li>Clerk: dashboard send webhook</li><li>GitHub: redeliver</li><li>Replicate: predictions API with ngrok URL</li><li>Razorpay: send test webhook</li></ul></article>
        <article className="card"><h3>Error reference</h3><ul className="list muted"><li>"Webhook secret is not configured"</li><li>"Missing signature header: stripe-signature"</li><li>"Queue temporarily unavailable"</li><li>"DeduplicationId cannot contain ':'"</li></ul></article>
      </section>
    </main>
  );
}
