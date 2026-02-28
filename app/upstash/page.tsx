import type { Metadata } from "next";
import { UpstashPage } from "./UpstashPage";

export const metadata: Metadata = {
  title: "Tern × Upstash QStash — Guaranteed Webhook Delivery",
  description:
    "Every verified webhook is queued, retried on failure, deduplicated, and recoverable from a dead-letter queue. Bring Your Own Keys — zero infrastructure.",

  openGraph: {
    title: "Tern × Upstash QStash — Guaranteed Webhook Delivery",
    description:
      "Queue, retry, deduplicate, and replay webhooks with your own Upstash account. No vendor lock-in.",
    url: "https://tern.hookflo.com/upstash",
    siteName: "Tern by Hookflo",
    images: [
      {
        url: "https://tern.hookflo.com/tern-upstash-og.png",
        width: 1200,
        height: 630,
        alt: "Tern × Upstash — Guaranteed Webhook Delivery",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tern × Upstash QStash — Guaranteed Webhook Delivery",
    description:
      "Queue, retry, deduplicate, and replay webhooks with your own Upstash account.",
    images: ["https://tern.hookflo.com/tern-upstash-og.png"],
  },
};

export default function Page() {
  return <UpstashPage />;
}
