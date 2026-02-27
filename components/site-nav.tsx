"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Feather } from "lucide-react";

// Copy the nav CSS from page.tsx — added here so it works standalone
const NAV_CSS = `
  .t-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(247,244,239,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #d8d0c4;
    padding: 0 clamp(20px,5vw,80px);
    display: flex; align-items: center; justify-content: space-between;
    height: 56px; font-family: 'JetBrains Mono', monospace;
  }
  .t-nav-logo { display:flex; align-items:center; gap:8px; text-decoration:none; color:#1a1714; }
  .t-nav-name { font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .t-nav-links { display:flex; align-items:center; gap:24px; list-style:none; margin:0; padding:0; }
  .t-nav-links a { font-size:11px; font-weight:500; letter-spacing:0.06em; color:#6b6358; text-decoration:none; transition:color .2s; }
  .t-nav-links a:hover, .t-nav-links a.t-nav-active { color:#1a1714; }
  .t-nav-new { display:inline-flex; align-items:center; gap:5px; color:#059669 !important; font-weight:700 !important; }
  .t-nav-new-dot { display:inline-block; width:5px; height:5px; background:#059669; border-radius:50%; }
  .t-nav-gh {
    display:flex; align-items:center; gap:6px;
    font-size:11px; font-weight:700; letter-spacing:0.06em;
    color:#1a1714; border:1.5px solid #1a1714; padding:6px 14px; border-radius:4px;
    text-decoration:none; transition:background .2s, color .2s; flex-shrink:0;
  }
  .t-nav-gh:hover { background:#1a1714; color:#f7f4ef; }
  .t-nav-divider { width:1px; height:16px; background:#d8d0c4; }
  @media(max-width:900px){ .t-nav-hide { display:none; } }
  @media(max-width:640px){ .t-nav-links { display:none; } }
`;

export default function SiteNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <style>{NAV_CSS}</style>
      <nav className="t-nav">
        <Link href="/" className="t-nav-logo">
          <Feather className="w-7 h-7 text-orange-500 -mr-1" />
          <span className="t-nav-name">Tern</span>
        </Link>

        <ul className="t-nav-links">
          <li className="t-nav-hide">
            <a href="/#how" className={isActive("/") ? "" : ""}>
              How it works
            </a>
          </li>
          <li className="t-nav-hide">
            <a href="/#platforms">Platforms</a>
          </li>
          <li className="t-nav-hide">
            <a href="/#middleware">Frameworks</a>
          </li>
          <li>
            <Link
              href="/upstash"
              className={`t-nav-new ${isActive("/upstash") ? "t-nav-active" : ""}`}
            >
              <span className="t-nav-new-dot" />
              Reliable Delivery
            </Link>
          </li>
          <li>
            <div className="t-nav-divider" />
          </li>
        </ul>

        <a
          href="https://github.com/Hookflo/tern"
          target="_blank"
          rel="noreferrer"
          className="t-nav-gh"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </nav>
    </>
  );
}