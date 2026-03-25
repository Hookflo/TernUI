import type { Metadata } from "next";
import CliPage from "./CliPage";

export const metadata: Metadata = {
  title: "Tern CLI — Local Webhook Tunnel. No ngrok. No Account.",
  description:
    "npx @hookflo/tern-dev and you're live. Instant HTTPS tunnel, real-time dashboard, one-click replay, and dead letter queue — all in RAM. Zero data leaves your machine.",

  keywords: [
    "webhook tunnel",
    "local webhook testing",
    "ngrok alternative",
    "webhook debugger",
    "npx webhook tunnel",
    "webhook inspector",
    "stripe webhook local",
    "github webhook local",
  ],

  alternates: {
    canonical: "https://tern.hookflo.com/cli",
  },

  openGraph: {
    title: "Tern CLI — Local Webhook Tunnel. No ngrok. No Account.",
    description:
      "Instant public HTTPS tunnel for local webhook testing. Live event dashboard, signature verification, DLQ, and one-click replay. One command, zero infrastructure.",
    url: "https://tern.hookflo.com/cli",
    siteName: "Tern by Hookflo",
    images: [
      {
        url: "https://tern.hookflo.com/tern-cli-og.svg",
        width: 1200,
        height: 630,
        alt: "Tern CLI — Instant Local Webhook Tunnel",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tern CLI — Local Webhook Tunnel. No ngrok. No Account.",
    description:
      "One command. Instant HTTPS tunnel, live dashboard, replay, and DLQ — all in RAM. Zero data leaves your machine.",
    images: ["https://tern.hookflo.com/tern-cli-og.svg"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Tern CLI",
            applicationCategory: "DeveloperTool",
            operatingSystem: "Windows, macOS, Linux",
            description:
              "Instant local HTTPS tunnel for webhook testing. No account, no ngrok, no data leaves your machine.",
            url: "https://tern.hookflo.com/cli",
            downloadUrl: "https://www.npmjs.com/package/@hookflo/tern-dev",
            softwareVersion: "latest",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "Hookflo",
              url: "https://hookflo.com",
            },
          }),
        }}
      />
      <CliPage />
    </>
  );
}