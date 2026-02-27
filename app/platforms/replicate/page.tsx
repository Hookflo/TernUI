import { SiteNav } from "@/components/site-nav";

export default function ReplicatePage() {
  return (
    <main className="tern-page">
      <SiteNav />
      <section className="section hero">
        <p className="label">Platform — Replicate</p>
        <h1>Replicate webhook verification with Ed25519 signatures.</h1>
      </section>
      <section className="section">
        <article className="card">
          <h3>Get webhook secret with API</h3>
          <pre className="code-block small">{`curl -s \\
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \\
  https://api.replicate.com/v1/webhooks/default/secret`}</pre>
          <p className="muted">Response includes <code>whsec_*</code> key. Store that as REPLICATE_WEBHOOK_SECRET once.</p>
        </article>
      </section>
      <section className="section">
        <pre className="code-block">{`curl -X POST \\
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "version": "YOUR_MODEL_VERSION",
    "input": { "prompt": "a red cat" },
    "webhook": "YOUR_URL",
    "webhook_events_filter": ["completed"]
  }' \\
  https://api.replicate.com/v1/predictions`}</pre>
        <p className="muted">Replicate uses Ed25519 signatures. tern handles verification when secret is configured.</p>
      </section>
      <section className="section grid two">
        <article className="card"><h3>Test locally</h3><ul className="list muted"><li>Replicate: predictions API with ngrok URL</li><li>Stripe: stripe listen + stripe trigger</li><li>Clerk: dashboard send test webhook</li><li>GitHub: redeliver</li><li>Fal AI: queue.fal.run curl with ngrok URL</li><li>Razorpay: send test webhook</li></ul></article>
        <article className="card"><h3>Error reference</h3><ul className="list muted"><li>"Webhook secret is not configured"</li><li>"Missing signature header: stripe-signature"</li><li>"Queue temporarily unavailable"</li><li>"DeduplicationId cannot contain ':'"</li></ul></article>
      </section>
    </main>
  );
}
