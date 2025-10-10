import type { Metadata } from "next"
import { Section } from "@/components/blog/section"
import { CodeBlock } from "@/components/blog/code-block"
import { Callout } from "@/components/blog/callout"

export const metadata: Metadata = {
  title: "Webhook Payload Normalization — Engineering Notes",
  description:
    "Stop writing webhook handlers for every platform. Normalize once with @hookflo/tern and integrate everywhere.",
}

export default function Page() {
  return (
    <main className="min-h-dvh relative">
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
            <a className=" block mb-4 text-blue-800 underline" href="/"> Home </a>
          <span className="text-sm text-muted-foreground">Engineering Blog</span>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Webhook Payload Normalization
          </h1>
          <p className="mt-3 text-pretty text-base text-muted-foreground">
            Normalize webhook payloads across platforms like Stripe, Razorpay, PayPal and more. one schema, consistent
            handlers, zero rewrites.
          </p>
        </div>
      </header>

      <article className="mx-auto w-full max-w-3xl px-4 py-10">
        {/* Early Access Note */}
        <Callout title="Early Access" className="border-accent/40 bg-accent/10">
          Webhook payload normalization is currently in active development. Payment normalization is available now via
          <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-primary">@hookflo/tern</code>. Additional
          categories (Auth, Database, Infrastructure) are coming soon or planned.
        </Callout>

        {/* The Problem */}
        <Section id="the-problem" title="The Problem">
          <p className="text-pretty">
            Your app integrates with Stripe for payments. Then a customer wants Razorpay. Another wants PayPal. Each
            platform sends webhooks in completely different formats:
          </p>

          {/* CodeGroup → two side-by-side blocks on desktop */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <CodeBlock language="json" className="bg-card">
              {`{
  "id": "ch_3NqBXY2eZvKYlo2C0wB6xJZv",
  "object": "charge",
  "amount": 5000,
  "amount_captured": 5000,
  "currency": "usd",
  "status": "succeeded",
  "payment_method_details": {
    "card": { "brand": "visa", "last4": "4242" }
  }
  // ... 50+ more fields
}`}
            </CodeBlock>

            <CodeBlock language="json" className="bg-card">
              {`{
  "entity": "payment",
  "amount": 500000,
  "currency": "INR",
  "status": "captured",
  "order_id": "order_JZ8kPWNJuGd8q4",
  "method": "card",
  "card": { "network": "Visa", "last4": "4242" },
  "captured": true
  // ... different structure entirely
}`}
            </CodeBlock>
          </div>

          <p className="mt-4 text-pretty">
            Now you're maintaining separate handlers for each platform. Migration? Rewrite everything.
          </p>
        </Section>

        {/* The Solution */}
        <Section id="the-solution" title="The Solution">
          <p className="text-pretty">
            Hookflo’s <code className="rounded bg-secondary px-1.5 py-0.5 text-primary">@hookflo/tern</code> normalizes
            all webhook payloads into consistent schemas:
          </p>

          <CodeBlock language="ts" className="mt-4">
            {`import { normalize } from '@hookflo/tern';

app.post('/webhooks/:platform', async (req, res) => {
  // Works with Stripe, Razorpay, PayPal, Square...
  const payment = normalize(req.body, {
    platform: req.params.platform,
    category: 'payments'
  });

  // Always get the same structure
  await processPayment({
    id: payment.transaction_id,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    method: payment.payment_method
  });
});`}
          </CodeBlock>
        </Section>

        {/* Benefits */}
        <Section id="benefits" title="Benefits">
          {/* 1 */}
          <h3 className="text-xl font-medium">1. Switch Platforms Without Code Changes</h3>
          <Callout title="The Impact" className="border-accent/40 bg-accent/10">
            Migrate from one provider to another in minutes, not months.
          </Callout>
          <p className="mt-4 text-pretty">
            Testing a new payment processor? Want to switch auth providers? With normalized payloads, your webhook
            handlers work with any platform immediately.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">Before Hookflo Tern:</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                <li>2-3 weeks of development per migration</li>
                <li>High risk of bugs in rewritten handlers</li>
                <li>Business disruption during transition</li>
                <li>Vendor lock-in due to switching costs</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">With Hookflo Tern:</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                <li>Change a config value</li>
                <li>Zero code modifications</li>
                <li>Test in staging instantly</li>
                <li>True multi-vendor freedom</li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <h3 className="mt-10 text-xl font-medium">2. Reduce Bandwidth by 40-70%</h3>
          <Callout title="The Impact" className="border-accent/40 bg-accent/10">
            Significant cost savings at scale, faster processing, better performance.
          </Callout>
          <p className="mt-4 text-pretty">
            Raw webhooks include dozens of unnecessary fields. Stripe sends 50+ fields per payment webhook — you need
            maybe 8. That's 80% waste.
          </p>

          <CodeBlock language="json" className="mt-4">
            {`// Raw Stripe payload: ~2.5 KB
{
  "id": "ch_...",
  "object": "charge",
  "amount": 5000,
  // ... 45 more fields you never use
  "metadata": {...},
  "refunds": {...},
  "fraud_details": {...}
}`}
          </CodeBlock>

          <CodeBlock language="json" className="mt-4">
            {`// Normalized payload: ~0.4 KB
{
  "transaction_id": "ch_...",
  "amount": 5000,
  "currency": "usd",
  "status": "succeeded",
  "customer_id": "cus_...",
  "payment_method": "card",
  "timestamp": "2024-10-10T12:00:00Z"
}`}
          </CodeBlock>

          <div className="mt-4 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
            <p>At 1M webhooks/month:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Raw data: ~2.5 TB/month</li>
              <li>Normalized: ~0.4 TB/month</li>
              <li>Savings: 2.1 TB/month</li>
            </ul>
          </div>

          {/* 3 */}
          <h3 className="mt-10 text-xl font-medium">3. Integrate New Platforms in Hours, Not Weeks</h3>
          <Callout title="The Impact" className="border-accent/40 bg-accent/10">
            10x faster time-to-market for new integrations.
          </Callout>
          <p className="mt-4 text-pretty">
            Traditional approach: Study docs → Parse responses → Map fields → Write tests → Deploy → Repeat for next
            platform. With normalized schemas: Install package → Use existing handlers → Done.
          </p>
          <p className="mt-4 text-pretty">One codebase handles them all. Add a new provider by changing one line:</p>

          <CodeBlock language="diff" className="mt-4">
            {`- platform: 'stripe'
+ platform: 'razorpay'`}
          </CodeBlock>

          {/* 4 */}
          <h3 className="mt-10 text-xl font-medium">4. Crystal Clear Data, Zero Ambiguity</h3>
          <Callout title="The Impact" className="border-accent/40 bg-accent/10">
            Write less code, prevent bugs, onboard developers faster.
          </Callout>
          <p className="mt-4 text-pretty">Different platforms use different field names for the same concept:</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
            <li>
              Amount: <code className="rounded bg-secondary px-1 py-0.5">amount</code> vs{" "}
              <code className="rounded bg-secondary px-1 py-0.5">value</code> vs{" "}
              <code className="rounded bg-secondary px-1 py-0.5">total</code>
            </li>
            <li>
              Status: <code className="rounded bg-secondary px-1 py-0.5">status</code> vs{" "}
              <code className="rounded bg-secondary px-1 py-0.5">state</code> vs{" "}
              <code className="rounded bg-secondary px-1 py-0.5">payment_status</code>
            </li>
            <li>
              User ID: <code className="rounded bg-secondary px-1 py-0.5">customer_id</code> vs{" "}
              <code className="rounded bg-secondary px-1 py-0.5">user_id</code> vs{" "}
              <code className="rounded bg-secondary px-1 py-0.5">customer</code>
            </li>
          </ul>

          <p className="mt-4 text-pretty">Hookflo standardizes everything:</p>
          <CodeBlock language="ts" className="mt-4">
            {`interface NormalizedPayment {
  transaction_id: string;
  amount: number; // Always in smallest currency unit
  currency: string; // Always ISO 4217 (USD, EUR, INR)
  status: 'succeeded' | 'failed' | 'pending' | 'refunded';
  customer_id: string;
  payment_method: 'card' | 'bank_transfer' | 'wallet' | 'other';
  timestamp: string; // Always ISO 8601
}`}
          </CodeBlock>

          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <h4 className="text-sm font-semibold">Benefits:</h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>Type-safe across all platforms</li>
              <li>Self-documenting code</li>
              <li>Predictable behavior</li>
              <li>No more “wait, which field has the amount?” moments</li>
            </ul>
          </div>

          {/* 5 */}
          <h3 className="mt-10 text-xl font-medium">5. Keep Raw Payloads When You Need Them</h3>
          <Callout title="The Impact" className="border-accent/40 bg-accent/10">
            Get normalization benefits without losing flexibility.
          </Callout>
          <p className="mt-4 text-pretty">Sometimes you need platform-specific data. Hookflo gives you both:</p>
          <CodeBlock language="ts" className="mt-4">
            {`const result = normalize(req.body, {
  platform: 'stripe',
  category: 'payments',
  mode: 'hybrid'  // Get both normalized and raw
});

// Use normalized for business logic
await processPayment(result.normalized);

// Access raw for platform-specific features
if (result.raw.payment_method_details?.card?.brand === 'amex') {
  await applyAmexPerks(result.normalized.customer_id);
}

// Perfect for debugging
logger.debug('Full webhook payload:', result.raw);`}
          </CodeBlock>
        </Section>

        {/* Supported Categories */}
        <Section id="supported-categories" title="Supported Categories">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">Payments</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Platforms: Stripe, PayPal, Square, Razorpay, Adyen, Braintree, Paddle, Mollie
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">Authentication (Planned)</h4>
              <p className="mt-2 text-sm text-muted-foreground">Auth0, Okta, Clerk, Firebase Auth, Cognito</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">Database (Planned)</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                MongoDB, Supabase, PostgreSQL, PlanetScale, Firebase, Neon
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">Infrastructure (Planned)</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                AWS, Google Cloud, Azure, Vercel, Railway, Render, Fly.io
              </p>
            </div>
          </div>
        </Section>

        {/* Getting Started */}
        <Section id="getting-started" title="Getting Started">
          <ol className="list-decimal pl-5">
            <li className="mb-4">
              <div className="text-sm font-medium">Install the package</div>
              <CodeBlock language="bash" className="mt-2">{`npm install @hookflo/tern`}</CodeBlock>
            </li>
            <li className="mb-4">
              <div className="text-sm font-medium">Normalize your first webhook</div>
              <CodeBlock language="ts" className="mt-2">
                {`import { normalize } from '@hookflo/tern';

const payment = normalize(webhookPayload, {
  platform: 'stripe',
  category: 'payments'
});`}
              </CodeBlock>
            </li>
            <li>
              <div className="text-sm font-medium">Use consistent data everywhere</div>
              <CodeBlock language="ts" className="mt-2">
                {`// Works with Stripe, Razorpay, PayPal, Square...
console.log(payment.transaction_id);
console.log(payment.amount);
console.log(payment.status);`}
              </CodeBlock>
            </li>
          </ol>
        </Section>

        {/* Before vs After */}
        <Section id="before-vs-after" title="Before vs After">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">Without Hookflo</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                <li>Separate handler per platform</li>
                <li>2-3 weeks per integration</li>
                <li>Platform migrations = full rewrites</li>
                <li>100% payload size</li>
                <li>Vendor lock-in</li>
                <li>Complex testing</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-semibold">With Hookflo</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                <li>Single unified handler</li>
                <li>Hours per integration</li>
                <li>Change config to migrate</li>
                <li>30-60% payload size</li>
                <li>Zero vendor lock-in</li>
                <li>Simple, consistent tests</li>
              </ul>
            </div>
          </div>
        </Section>

      <pre>- Prateek Jain</pre>
      </article>
    </main>
  )
}
