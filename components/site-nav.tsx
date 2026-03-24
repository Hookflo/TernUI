"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Feather } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NextjsIcon = () => (
  <svg viewBox="0 0 180 180" fill="white" width="20" height="20">
    <text x="90" y="110" textAnchor="middle" fontSize="60" fontWeight="bold" fill="white">N</text>
  </svg>
);

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
  .t-nav-links { display:flex; align-items:baseline; gap:24px; list-style:none; margin:0; padding:0; }
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
  .t-nav-frameworks-wrap { position: relative; }
  .t-nav-frameworks-btn {
    display: flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
    color: #6b6358; background: none; border: none; cursor: pointer; padding: 0;
    transition: color .2s;
    font-family: 'JetBrains Mono', monospace;
  }
  .t-nav-frameworks-btn:hover,
  .t-nav-frameworks-btn.t-nav-active { color: #1a1714; }
  .t-nav-frameworks-btn:hover .t-fw-chevron,
  .t-nav-frameworks-btn.t-nav-active .t-fw-chevron { color: #1a1714; }
  .t-fw-chevron {
    color: #9e9488; transition: transform .2s, color .2s;
    display: flex; align-items: center;
  }
  .t-fw-chevron.open { transform: rotate(180deg); }
  .t-fw-dropdown {
    position: absolute; top: calc(100% + 14px); left: 50%; transform: translateX(-50%);
    background: white; border: 1.5px solid #c4baad; border-radius: 10px;
    padding: 8px; min-width: 220px;
    box-shadow: 4px 6px 0 #d8d0c4, 0 16px 40px rgba(26,23,20,.10);
    opacity: 0; pointer-events: none; transform: translateX(-50%) translateY(-6px);
    transition: opacity .18s ease, transform .18s ease;
    z-index: 200;
  }
  .t-fw-dropdown.open {
    opacity: 1; pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }
  .t-fw-dropdown::before {
    content: ''; position: absolute; top: -7px; left: 50%; transform: translateX(-50%);
    width: 12px; height: 7px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background: #c4baad;
  }
  .t-fw-dropdown::after {
    content: ''; position: absolute; top: -5px; left: 50%; transform: translateX(-50%);
    width: 10px; height: 6px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background: white;
  }
  .t-fw-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: 7px;
    text-decoration: none; color: #3d3830;
    transition: background .15s;
    cursor: pointer;
  }
  .t-fw-item:hover { background: #f0ebe2; }
  .t-fw-icon {
    width: 32px; height: 32px; border-radius: 7px; border: 1px solid #d8d0c4;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    background: white;
  }
  .t-fw-item-name { font-size: 11px; font-weight: 700; color: #1a1714; letter-spacing: .04em; }
  .t-fw-item-desc { font-size: 9px; color: #9e9488; margin-top: 2px; letter-spacing: .04em; }
  .t-fw-divider { height: 1px; background: #d8d0c4; margin: 6px 0; }
  @media(max-width:900px){ .t-nav-hide { display:none; } }
  @media(max-width:640px){ .t-nav-links { display:none; } }
`;

function FrameworksDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const frameworkActive = pathname.startsWith("/framework/");

  return (
    <div className="t-nav-frameworks-wrap" ref={ref}>
      <button
        className={`t-nav-frameworks-btn${frameworkActive ? " t-nav-active" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Frameworks
        <span className={`t-fw-chevron${open ? " open" : ""}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className={`t-fw-dropdown${open ? " open" : ""}`}>
        <Link
          href="/framework/nextjs"
          className="t-fw-item"
          onClick={() => setOpen(false)}
        >
          <div className="t-fw-icon" style={{ background: "#000" }}>
         <NextjsIcon/>
          </div>
          <div>
            <div className="t-fw-item-name">Next.js</div>
            <div className="t-fw-item-desc">App Router · Edge · RSC</div>
          </div>
        </Link>

        <div className="t-fw-divider" />

        <Link
          href="/framework/hono"
          className="t-fw-item"
          onClick={() => setOpen(false)}
        >
          <div
            className="t-fw-icon"
            style={{ background: "#fff7ed", color: "#c2410c" }}
          >
            <img
              src="/assets/hono.svg"
              alt="Hono"
              style={{ width: 24, height: 24 }}
            />
          </div>
          <div>
            <div className="t-fw-item-name">Hono</div>
            <div className="t-fw-item-desc">Fast · Edge-ready · TS-first</div>
          </div>
        </Link>

        <div className="t-fw-divider" />

        <Link
          href="/framework/cloudflare"
          className="t-fw-item"
          onClick={() => setOpen(false)}
        >
          <div className="t-fw-icon" style={{ background: "#fff4e6" }}>
            <img
              src="/assets/cloudflare.svg"
              alt="Cloudflare"
              style={{ width: 24, height: 24 }}
            />
          </div>
          <div>
            <div className="t-fw-item-name">Cloudflare</div>
            <div className="t-fw-item-desc">Workers · Pages · Edge</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

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
          <li>
            <FrameworksDropdown />
          </li>
          <li>
            <Link
              href="/cli"
              className={`t-nav-new ${isActive("/cli") ? "t-nav-active" : ""}`}
            >
              <span className="t-nav-new-dot" />
              CLI Tool
            </Link>
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
