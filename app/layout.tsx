import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tern.hookflo.com"),
  title: {
    default: "Tern - Universal Webhook Verification Framework",
    template: "%s | Tern Webhook Verification",
  },
  description:
    "Open-source TypeScript webhook verification framework supporting HMAC-SHA256, HMAC-SHA512 signature validation for Stripe, GitHub, Clerk, Shopify webhooks. Zero-dependency, platform-agnostic webhook security library with complete signature verification for Node.js, Next.js, Express, and Cloudflare Workers.",
  applicationName: "Tern Webhook Verification",
  authors: [{ name: "Hookflo", url: "https://github.com/Hookflo" }],
  generator: "Next.js",
  keywords: [
    // Primary webhook keywords
    "webhook verification",
    "webhook signature verification",
    "webhook authentication",
    "webhook security",
    "HMAC webhook verification",
    "webhook validation library",
    "webhooks",

    // Technical implementation keywords
    "HMAC-SHA256 verification",
    "HMAC-SHA512 signature",
    "webhook HMAC authentication",
    "cryptographic signature verification",
    "secure webhook implementation",
    "webhook payload verification",

    // Platform-specific keywords
    "Stripe webhook verification",
    "GitHub webhook signature",
    "Clerk webhook authentication",
    "Shopify webhook validation",
    "Supabase webhook security",
    "Vercel webhook verification",

    // Framework keywords
    "Node.js webhook library",
    "TypeScript webhook verification",
    "Next.js webhook handler",
    "Express webhook middleware",
    "Cloudflare Workers webhook",
    "serverless webhook verification",

    // Developer-focused keywords
    "webhook verification npm",
    "webhook security library",
    "open source webhook verification",
    "algorithm agnostic webhook",
    "zero dependency webhook library",
    "webhook signature library TypeScript",

    // Problem-solving keywords
    "how to verify webhook signatures",
    "webhook security best practices",
    "prevent webhook replay attacks",
    "validate webhook authenticity",
    "webhook endpoint security",
    "secure webhook integration",

    // Comparison keywords
    "webhook verification framework",
    "best webhook validation library",
    "webhook security npm package",
    "Svix alternative",
    "webhook verification tool",

    // Long-tail keywords
    "verify Stripe webhook signature Node.js",
    "GitHub webhook HMAC validation",
    "implement webhook signature verification",
    "webhook timestamp validation",
    "custom webhook signature configuration",
    "multi-platform webhook verification",
  ],
  creator: "Hookflo Team",
  publisher: "Hookflo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tern.hookflo.com",
    title: "Tern - Universal Webhook Verification Framework",
    description:
      "Open-source TypeScript framework for robust webhook verification. Support HMAC-SHA256/512 signatures across Stripe, GitHub, Clerk, and custom platforms with zero dependencies.",
    siteName: "Tern Webhook Verification",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Tern Webhook Verification Framework - Secure HMAC Signature Validation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tern - Universal Webhook Verification Framework",
    description:
      "Open-source TypeScript webhook verification library with HMAC signature validation for Stripe, GitHub, Clerk & more. Zero dependencies.",
    images: ["/og-image.webp"],
    creator: "@hookflohq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tern.hookflo.com",
  },
  category: "Technology",
  classification: "Developer Tools, Web Security, API Integration",
  other: {
    "github-repo": "https://github.com/Hookflo/tern",
    "npm-package": "@hookflo/tern",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        {/* Additional SEO tags */}
        <link rel="canonical" href="https://tern.hookflo.com" />

        {/* JSON-LD Structured Data for Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Tern Webhook Verification",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Algorithm-agnostic webhook verification framework supporting multiple platforms and HMAC signature algorithms including SHA256 and SHA512.",
              softwareVersion: "1.0.0",
              programmingLanguage: "TypeScript",
              codeRepository: "https://github.com/Hookflo/tern",
              license: "https://opensource.org/licenses/MIT",
              author: {
                "@type": "Organization",
                name: "Hookflo",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "100",
              },
              featureList: [
                "HMAC-SHA256 signature verification",
                "HMAC-SHA512 support",
                "Stripe webhook validation",
                "GitHub webhook authentication",
                "Clerk webhook security",
                "Zero dependencies",
                "TypeScript support",
                "Framework agnostic",
              ],
            }),
          }}
        />

        {/* JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hookflo",
              url: "https://github.com/Hookflo",
              sameAs: ["https://github.com/Hookflo/tern"],
            }),
          }}
        />

        {/* JSON-LD for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I verify webhook signatures?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tern provides easy webhook signature verification using HMAC algorithms. Simply import WebhookVerificationService and call verify() or verifyWithPlatformConfig() with your webhook request and secret key.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What webhook platforms does Tern support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tern supports Stripe, GitHub, Clerk, Shopify, Vercel, Polar, Supabase, Dodo Payments, and any custom webhook platform through configurable signature verification.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Tern open source?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Tern is fully open source under the MIT license and available on GitHub at github.com/Hookflo/tern",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-[#fdfff4]">
          <div className="fixed inset-0 z-0 h-full pointer-events-none">
                <svg id="noice" className="fixed inset-0 w-full h-full">
                  <filter id="noise-filter">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="1.26"
                      numOctaves="5"
                      stitchTiles="stitch"
                    ></feTurbulence>
                    <feColorMatrix type="saturate" values="0"></feColorMatrix>
                    <feComponentTransfer>
                      <feFuncR type="linear" slope="1.51"></feFuncR>
                      <feFuncG type="linear" slope="1.51"></feFuncG>
                      <feFuncB type="linear" slope="1.51"></feFuncB>
                      <feFuncA type="linear" slope="0.61"></feFuncA>
                    </feComponentTransfer>
                    <feComponentTransfer>
                      <feFuncR type="linear" slope="2.55" intercept="-0.77" />
                      <feFuncG type="linear" slope="2.55" intercept="-0.77" />
                      <feFuncB type="linear" slope="2.55" intercept="-0.77" />
                    </feComponentTransfer>
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
                  <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
                </svg>
              </div>
              {children}</body>
    </html>
  );
}
