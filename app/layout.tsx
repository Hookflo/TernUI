import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

// Load fonts with the new Next.js font system
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: true,
  adjustFontFallback: true,
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Tern - Algorithm Agnostic Webhook Verification',
  description: 'A robust, scalable webhook verification framework supporting multiple platforms and signature algorithms.',
  keywords: ['webhook', 'verification', 'security', 'api', 'authentication', 'signing'],
  authors: [{ name: 'Tern Team' }],
  creator: 'Tern',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tern.dev',
    title: 'Tern - Algorithm Agnostic Webhook Verification',
    description: 'A robust, scalable webhook verification framework supporting multiple platforms and signature algorithms.',
    siteName: 'Tern',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tern - Algorithm Agnostic Webhook Verification',
    description: 'A robust, scalable webhook verification framework supporting multiple platforms and signature algorithms.',
    creator: '@tern',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: ['favicon.ico'],
    apple: [
      { url: 'apple-touch-icon.png' },
    ],
  },
  manifest: 'site.webmanifest',
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
