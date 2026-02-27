"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BANNER_CSS = `
  @keyframes an-shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes an-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: .5; }
  }
  @keyframes an-slide {
    from { opacity: 0; transform: translateY(-100%); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── WRAPPER ── */
  .t-ann {
    position: relative; overflow: hidden;
    background: #1a1714;
    border-bottom: 1px solid rgba(216,208,196,.12);
    padding: 0 clamp(20px,5vw,80px);
    animation: an-slide .35s cubic-bezier(.16,1,.3,1) both;
  }

  /* diagonal grain overlay — matches site paper texture feel */
  .t-ann::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image: repeating-linear-gradient(
      -55deg,
      transparent           0px,
      transparent          14px,
      rgba(247,244,239,.03) 14px,
      rgba(247,244,239,.03) 15px
    );
  }

  /* moving shimmer line */
  .t-ann::after {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(247,244,239,.04) 40%,
      rgba(247,244,239,.09) 50%,
      rgba(247,244,239,.04) 60%,
      transparent 100%
    );
    background-size: 600px 100%;
    animation: an-shimmer 4s ease-in-out infinite;
  }

  /* ── INNER ── */
  .t-ann-inner {
    position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; min-height: 44px;
  }

  .t-ann-left {
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  }

  /* ── EDITION MARK — typographic, like a newspaper stamp ── */
  .t-ann-edition {
    display: flex; align-items: center; gap: 8px; flex-shrink: 0;
  }
  .t-ann-rule {
    width: 1px; height: 28px;
    background: linear-gradient(to bottom, transparent, rgba(216,208,196,.3), transparent);
  }
  .t-ann-stamp {
    display: flex; flex-direction: column; align-items: flex-start; gap: 1px;
  }
  .t-ann-stamp-top {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: rgba(247,244,239,.35);
    line-height: 1;
  }
  .t-ann-stamp-main {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 15px; font-style: italic;
    color: rgba(247,244,239,.9); line-height: 1;
    letter-spacing: -.01em;
  }

  /* ── LIVE DOT ── */
  .t-ann-live {
    display: flex; align-items: center; gap: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: rgba(247,244,239,.35);
    flex-shrink: 0;
  }
  .t-ann-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #10b981;
    animation: an-pulse 2s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(16,185,129,.6);
  }

  /* ── BODY TEXT ── */
  .t-ann-body {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }
  .t-ann-headline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; color: rgba(247,244,239,.75);
    line-height: 1.4;
  }
  .t-ann-headline strong {
    color: rgba(247,244,239,.95); font-weight: 700;
  }

  /* ── TAGS — look like editorial category labels ── */
  .t-ann-tags {
    display: flex; gap: 5px; flex-wrap: wrap;
  }
  .t-ann-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(247,244,239,.4);
    border: 1px solid rgba(247,244,239,.1);
    padding: 2px 7px; border-radius: 2px;
  }

  /* ── CTA ── */
  .t-ann-cta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 700; letter-spacing: .06em;
    color: #1a1714;
    background: rgba(247,244,239,.9);
    border: none; border-radius: 3px;
    padding: 5px 14px;
    text-decoration: none; white-space: nowrap; flex-shrink: 0;
    transition: background .2s, transform .15s;
    display: inline-block;
  }
  .t-ann-cta:hover { background: #f7f4ef; transform: translateY(-1px); }

  /* ── RIGHT SIDE ── */
  .t-ann-right {
    display: flex; align-items: center; gap: 12px; flex-shrink: 0;
  }
  .t-ann-dismiss {
    background: none; border: none; cursor: pointer;
    color: rgba(247,244,239,.2); font-size: 18px; line-height: 1;
    padding: 4px 2px; transition: color .2s; flex-shrink: 0;
    font-family: serif;
  }
  .t-ann-dismiss:hover { color: rgba(247,244,239,.5); }

  @media(max-width:640px){
    .t-ann-edition { display: none; }
    .t-ann-tags    { display: none; }
  }
`;

const STORAGE_KEY = "tern-banner-dismissed-v2";

const TAGS = ["Queue", "Retry", "DLQ", "Dedup", "BYOK"];

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{BANNER_CSS}</style>
      <div className="t-ann" role="banner">
        <div className="t-ann-inner">

          {/* Left */}
          <div className="t-ann-left">

            {/* Typographic edition stamp */}
            <div className="t-ann-edition">
              <div className="t-ann-stamp">
                <div className="t-ann-stamp-top">New release</div>
                <div className="t-ann-stamp-main">Tern × Upstash</div>
              </div>
              <div className="t-ann-rule" />
            </div>

            {/* Live dot */}
            <div className="t-ann-live">
              <div className="t-ann-dot" />
              Beta
            </div>

            {/* Headline + tags */}
            <div className="t-ann-body">
              <div className="t-ann-headline">
                <strong>Guaranteed delivery</strong> — queue, retry, DLQ, and dedup in one SDK.
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="t-ann-right">
            <Link href="/upstash" className="t-ann-cta">
              Learn more →
            </Link>
            <button
              className="t-ann-dismiss"
              onClick={dismiss}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>

        </div>
      </div>
    </>
  );
}