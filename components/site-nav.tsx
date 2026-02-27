"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Usage", href: "/#usage" },
  { label: "Platforms", href: "/#platforms" },
  { label: "Features", href: "/#features" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav-wrap">
      <nav className="site-nav">
        <Link href="/" className="site-brand">
          <span className="site-brand-mark">T</span>
          <span>Tern</span>
        </Link>
        <div className="site-links">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <button className="site-dropdown-btn" onClick={() => setOpen((v) => !v)}>
            Frameworks
          </button>
          {open && (
            <div className="site-dropdown" onMouseLeave={() => setOpen(false)}>
              <Link href="/frameworks/nextjs">Next.js</Link>
              <Link href="/frameworks/cloudflare">Cloudflare</Link>
            </div>
          )}
          <Link href="/upstash" className="new-link">
            <span className="dot" /> Reliable Delivery
          </Link>
          <a href="https://github.com/Hookflo/tern" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
