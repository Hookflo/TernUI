import Link from "next/link";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { SiteNav } from "@/components/site-nav";

const badges = ["✓ Verified", "📬 Queued", "🔁 Retried", "📥 DLQ", "🧹 Deduped"];

export default function HomePage() {
  return (
    <main className="tern-page">
      <AnnouncementBanner />
      <SiteNav />

      <section className="section hero">
        <p className="label">Tern webhook security</p>
        <h1>Universal webhook verification with reliable delivery.</h1>
        <p className="muted maxw">
          Verify signatures across platforms, then enqueue verified events for retries, dead-letter queue recovery, and
          deduplication with Bring Your Own Keys (BYOK).
        </p>
        <div className="actions">
          <Link href="https://github.com/Hookflo/tern" className="btn primary">
            Get started
          </Link>
          <Link href="/upstash" className="btn secondary">
            Reliable Delivery →
          </Link>
        </div>
        <div className="badge-row">
          {badges.map((badge) => (
            <Link key={badge} className="pill" href={badge.includes("Verified") ? "#features" : "/upstash"}>
              {badge}
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="features">
        <p className="label">Beyond verification</p>
        <h2>Verification is just the start.</h2>
        <div className="grid three">
          <article className="card">
            <p className="num">01</p>
            <h3>Cross-platform verification</h3>
            <p className="muted">One handler API for Stripe, Clerk, GitHub, Fal AI, Replicate, and more.</p>
          </article>
          <article className="card">
            <p className="num">02 <span className="new">New</span></p>
            <h3>Guaranteed delivery</h3>
            <p className="muted">Queue, retry, DLQ, replay, and deduplication powered by Upstash QStash.</p>
            <Link href="/upstash" className="inline-link">
              Open Reliable Delivery →
            </Link>
          </article>
          <article className="card">
            <p className="num">03</p>
            <h3>Framework adapters</h3>
            <p className="muted">Purpose-built adapters for Next.js App Router and Cloudflare Workers.</p>
            <Link href="/frameworks/nextjs" className="inline-link">
              Read Next.js guide →
            </Link>
          </article>
        </div>
      </section>

      <section className="section" id="platforms">
        <p className="label">Platform guides</p>
        <div className="grid two">
          <Link href="/platforms/falai" className="card link-card">
            <h3>Fal AI</h3>
            <p className="muted">Ed25519 signature flow, webhook event filtering, and low-cost testing setup.</p>
          </Link>
          <Link href="/platforms/replicate" className="card link-card">
            <h3>Replicate</h3>
            <p className="muted">Fetch webhook secret via API, verify Ed25519 signatures, and test predictions.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
