import Link from "next/link";

// ─── ADDITIVE SECTION ─────────────────────────────────────────────────────────
// Drop this component into the existing page.tsx BEFORE the CTA section.

const SECTION_CSS = `
  .bv-section { background:var(--paper); border-top:1px solid var(--border); }
  .bv-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; margin-bottom:48px; }
  .bv-card {
    background:white; border:1px solid var(--border); border-radius:10px;
    padding:24px; display:flex; flex-direction:column;
    transition:box-shadow .2s, transform .15s; text-decoration:none; color:inherit;
  }
  .bv-card:hover { box-shadow:3px 4px 0 var(--border); transform:translateY(-1px); }
  .bv-card-num { font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink4); letter-spacing:.1em; margin-bottom:14px; }
  .bv-card-title { font-family:var(--serif); font-size:16px; font-weight:600; color:var(--ink); margin-bottom:8px; display:flex; align-items:center; gap:10px; }
  .bv-card-desc { font-size:13.5px; color:var(--ink3); line-height:1.55; flex:1; }
  .bv-card-link { margin-top:16px; font-family:var(--mono); font-size:11px; color:var(--green); display:inline-flex; align-items:center; gap:4px; }
  .bv-new-badge { font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:3px 8px; border-radius:20px; background:var(--green-bg); color:var(--green); }

  /* Platform + Framework quick links */
  .bv-sub-label { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--ink4); margin-bottom:14px; margin-top:0; display:flex; align-items:center; gap:8px; }
  .bv-sub-label::after { content:''; flex:1; height:1px; background:var(--border); max-width:40px; }
  .bv-chips { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
  .bv-chip {
    display:inline-flex; align-items:center; gap:8px;
    font-family:var(--mono); font-size:11px; font-weight:500; color:var(--ink2);
    background:white; border:1px solid var(--border); border-radius:6px;
    padding:8px 14px; text-decoration:none;
    transition:border-color .2s, box-shadow .15s, transform .15s;
  }
  .bv-chip:hover { border-color:var(--border2); box-shadow:2px 3px 0 var(--border); transform:translateY(-1px); color:var(--ink); }
  .bv-chip-dot { width:6px; height:6px; border-radius:50%; background:var(--green); flex-shrink:0; }
`;

const PLATFORMS = [
  { name: "Stripe", href: "/#platforms" },
  { name: "Clerk", href: "/#platforms" },
  { name: "GitHub", href: "/#platforms" },
  { name: "Fal AI", href: "/platforms/falai" },
  { name: "Replicate", href: "/platforms/replicate" },
  { name: "Shopify", href: "/#platforms" },
  { name: "+ 11 more", href: "/#platforms" },
];

const FRAMEWORKS = [
  { name: "Next.js App Router", href: "/framework/nextjs", badge: "stable" },
  { name: "Cloudflare Workers", href: "/framework/cloudflare", badge: "stable" },
  { name: "Express", href: "/#middleware", badge: "stable" },
  { name: "Core API", href: "/#middleware", badge: "stable" },
];

export default function BeyondVerificationSection() {
  return (
    <>
      <style>{SECTION_CSS}</style>
      <section className="bv-section t-section">
        <div className="t-section-inner">
          <div className="t-section-label">Beyond verification</div>
          <h2 className="t-h2">
            Verification is
            <br />
            <em>just the start.</em>
          </h2>
          <p className="t-section-desc" style={{ marginBottom: 32 }}>
            Once your signature is verified, Tern can queue delivery, retry
            failures, and recover from a dead-letter queue — automatically.
          </p>

          <div className="bv-grid">
            <div className="bv-card" style={{ cursor: "default" }}>
              <div className="bv-card-num">01</div>
              <div className="bv-card-title">Cross-platform verification</div>
              <div className="bv-card-desc">
                16 platforms. One SDK. HMAC-SHA256, Ed25519, SHA1 — Tern
                handles the algorithm. You write the handler.
              </div>
            </div>

            <Link href="/upstash" className="bv-card">
              <div className="bv-card-num">02</div>
              <div className="bv-card-title">
                Guaranteed delivery
                <span className="bv-new-badge">New</span>
              </div>
              <div className="bv-card-desc">
                Queue every verified event. Retry on failure with backoff. Dead
                letter queue for anything exhausted. Bring Your Own Upstash
                account — your data, your stack.
              </div>
              <div className="bv-card-link">Learn about reliable delivery →</div>
            </Link>

            <div className="bv-card" style={{ cursor: "default" }}>
              <div className="bv-card-num">03</div>
              <div className="bv-card-title">Framework adapters</div>
              <div className="bv-card-desc">
                Next.js App Router, Cloudflare Workers, Express. Same
                verification logic, native integration for each runtime.
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                <Link href="/framework/nextjs" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--border2)", paddingBottom: 1 }}>Next.js →</Link>
                <Link href="/framework/cloudflare" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--border2)", paddingBottom: 1 }}>Cloudflare →</Link>
              </div>
            </div>
          </div>

          {/* Fix 4 — Platform quick links */}
          <div className="bv-sub-label">Platforms</div>
          <div className="bv-chips">
            {PLATFORMS.map((p) => (
              <Link href={p.href} className="bv-chip" key={p.name}>
                <span className="bv-chip-dot" />
                {p.name}
              </Link>
            ))}
          </div>

          {/* Fix 4 — Framework quick links */}
          <div className="bv-sub-label">Frameworks</div>
          <div className="bv-chips">
            {FRAMEWORKS.map((f) => (
              <Link href={f.href} className="bv-chip" key={f.name}>
                <span className="bv-chip-dot" style={{ background: f.badge === "beta" ? "#f59e0b" : "var(--green)" }} />
                {f.name}
                <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink4)", background: "var(--paper2)", border: "1px solid var(--border)", borderRadius: 10, padding: "1px 6px" }}>{f.badge}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}