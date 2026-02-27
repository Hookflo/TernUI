import { SiteNav } from "@/components/site-nav";

export default function StripePlatformPage() {
  return (
    <main className="tern-page">
      <SiteNav />
      <section className="section hero">
        <p className="label">Platform — Stripe</p>
        <h1>Stripe verification with optional reliable delivery.</h1>
        <p className="muted maxw">Use tern to verify Stripe signatures, then add queue mode for retries and DLQ controls.</p>
      </section>
    </main>
  );
}
