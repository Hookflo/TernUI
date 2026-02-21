"use client";

import { useState } from "react";
import Link from "next/link";
import { Feather } from "lucide-react";

// ─── INLINE STYLES (same design system as HTML) ───────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --paper:   #f7f4ef;
    --paper2:  #f0ebe2;
    --ink:     #1a1714;
    --ink2:    #3d3830;
    --ink3:    #6b6358;
    --ink4:    #9e9488;
    --border:  #d8d0c4;
    --border2: #c4baad;
    --green:   #1a6b3c;
    --green-bg:#edf5f0;
    --red:     #c0392b;
    --red-bg:  #fdf1ef;
    --accent:  #2c5f8a;
    --mono: 'JetBrains Mono', monospace;
    --serif: 'Lora', Georgia, serif;
    --display: 'Instrument Serif', Georgia, serif;
  }

  .tern-root { font-family: var(--serif); background: var(--paper); color: var(--ink); }
  .tern-root * { box-sizing: border-box; }

  /* NAV */
  .t-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(247,244,239,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 clamp(20px,5vw,80px);
    display: flex; align-items: center; justify-content: space-between;
    height: 56px;
  }
  .t-nav-logo { display:flex; align-items:center; gap:8px; text-decoration:none; color:var(--ink); }
  .t-nav-icon {
    width:28px; height:28px; border:1.5px solid var(--ink); border-radius:6px;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .t-nav-name { font-family:var(--mono); font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .t-nav-links { display:flex; align-items:center; gap:28px; list-style:none; margin:0; padding:0; }
  .t-nav-links a { font-family:var(--mono); font-size:11px; font-weight:500; letter-spacing:0.06em; color:var(--ink3); text-decoration:none; transition:color .2s; }
  .t-nav-links a:hover { color:var(--ink); }
  .t-nav-gh {
    display:flex; align-items:center; gap:6px;
    font-family:var(--mono); font-size:11px; font-weight:700; letter-spacing:0.06em;
    color:var(--ink); border:1.5px solid var(--ink); padding:6px 14px; border-radius:4px;
    text-decoration:none; transition:background .2s, color .2s;
  }
  .t-nav-gh:hover { background:var(--ink); color:var(--paper); }
  @media(max-width:640px){ .t-nav-links { display:none; } }

  /* HERO */
  .t-hero {
    padding: clamp(60px,10vw,120px) clamp(20px,5vw,80px) clamp(60px,8vw,100px);
    max-width:1200px; margin:0 auto;
    display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start;
    
  }
  @media(max-width:900px){ .t-hero { grid-template-columns:1fr; gap:40px; } }


  .t-eyebrow {
    display:inline-flex; align-items:center; gap:8px;
    font-family:var(--mono); font-size:10px; font-weight:700;
    letter-spacing:0.14em; text-transform:uppercase; color:var(--ink3); margin-bottom:24px;
  }
  .t-eyebrow::before { content:''; display:block; width:24px; height:1px; background:var(--ink3); }

  .t-h1 {
    font-family:var(--display); font-size:clamp(38px,5vw,60px);
    font-weight:400; line-height:1.1; letter-spacing:-0.02em; color:var(--ink); margin-bottom:20px;
  }
  .t-h1 em { font-style:italic; color:var(--ink2); }

  .t-hero-desc { font-size:clamp(15px,1.8vw,17px); color:var(--ink3); line-height:1.65; max-width:480px; margin-bottom:36px; }

  .t-actions { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }

  .t-btn-primary {
    font-family:var(--mono); font-size:12px; font-weight:700;
    letter-spacing:0.08em; text-transform:uppercase;
    color:var(--paper); background:var(--ink); border:none;
    padding:12px 24px; border-radius:4px; cursor:pointer; text-decoration:none;
    transition:opacity .2s, transform .15s; display:inline-block;
  }
  .t-btn-primary:hover { opacity:.85; transform:translateY(-1px); }

  .t-btn-secondary {
    font-family:var(--mono); font-size:12px; font-weight:500; letter-spacing:0.06em;
    color:var(--ink2); text-decoration:none;
    display:inline-flex; align-items:center; gap:6px;
    border-bottom:1px solid var(--border2); padding-bottom:2px;
    transition:border-color .2s, color .2s;
  }
  .t-btn-secondary:hover { color:var(--ink); border-color:var(--ink); }

  .t-install { display:flex; align-items:center; gap:12px; margin-top:28px; }
  .t-install-cmd {
    display:inline-flex; align-items:center; gap:10px;
    font-family:var(--mono); font-size:12px; font-weight:500;
    color:var(--ink2); background:var(--paper2); border:1px solid var(--border);
    padding:8px 16px; border-radius:4px;
  }
  .t-install-cmd span { color:var(--ink4); }
  .t-copy-btn { background:none; border:none; cursor:pointer; color:var(--ink4); padding:2px; transition:color .2s; display:flex; align-items:center; }
  .t-copy-btn:hover { color:var(--ink); }

  /* CODE CARD */
  .t-code-card { background:var(--ink); border-radius:10px; overflow:hidden; box-shadow:6px 8px 0 var(--border2), 0 20px 60px rgba(26,23,20,.12); }
  .t-code-bar { background:#2a2520; padding:10px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(255,255,255,.06); }
  .t-dots { display:flex; gap:6px; }
  .t-dot { width:10px; height:10px; border-radius:50%; }
  .t-code-filename { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.3); margin-left:8px; letter-spacing:.04em; }
  .t-code-body { padding:20px 22px; font-family:var(--mono); font-size:12px; line-height:1.75; }
  /* syntax */
  .ck  { color:#c792ea; }
  .cs  { color:#c3e88d; }
  .cf  { color:#82aaff; }
  .cc  { color:#546e7a; font-style:italic; }
  .co  { color:#ffcb6b; }
  .ct  { color:#f8f8f2; }

  .t-hero-stats { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid var(--border); border-radius:8px; margin-top:20px; overflow:hidden; background:white; }
  .t-hero-stat { padding:16px; text-align:center; border-right:1px solid var(--border); }
  .t-hero-stat:last-child { border-right:none; }
  .t-hero-stat-val { font-family:var(--display); font-size:26px; font-style:italic; color:var(--ink); line-height:1; }
  .t-hero-stat-lbl { font-family:var(--mono); font-size:9px; color:var(--ink4); margin-top:4px; letter-spacing:.08em; text-transform:uppercase; }

  /* SECTIONS */
  .t-section { padding:clamp(50px,8vw,90px) clamp(20px,5vw,80px); }
  .t-section-inner { max-width:1200px; margin:0 auto; }
  .t-section-label {
    font-family:var(--mono); font-size:10px; font-weight:700;
    letter-spacing:.16em; text-transform:uppercase; color:var(--ink4);
    margin-bottom:16px; display:flex; align-items:center; gap:10px;
  }
  .t-section-label::after { content:''; flex:1; height:1px; background:var(--border); max-width:60px; }
  .t-h2 { font-family:var(--display); font-size:clamp(28px,4vw,42px); font-weight:400; line-height:1.15; color:var(--ink); margin-bottom:16px; }
  .t-h2 em { font-style:italic; }
  .t-section-desc { font-size:16px; color:var(--ink3); max-width:560px; line-height:1.6; margin-bottom:48px; }

  /* DIFF */
  .t-diff-section { background:white; border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
  .t-diff-grid { display:grid; grid-template-columns:1fr 1fr; border:1.5px solid var(--border2); border-radius:10px; overflow:hidden; box-shadow:4px 5px 0 var(--border); }
  @media(max-width:700px){ .t-diff-grid { grid-template-columns:1fr; } }
  .t-diff-label { display:flex; align-items:center; gap:8px; padding:10px 16px; font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; border-bottom:1px solid var(--border); }
  .t-diff-label.before { background:var(--red-bg); color:var(--red); border-right:1px solid var(--border); }
  .t-diff-label.after  { background:var(--green-bg); color:var(--green); }
  @media(max-width:700px){ .t-diff-label.before { border-right:none; } }
  .t-diff-dot { width:6px; height:6px; border-radius:50%; }
  .t-diff-lc { margin-left:auto; opacity:.55; font-size:9px; font-weight:400; }
  .t-diff-code { padding:16px; font-family:var(--mono); font-size:11.5px; line-height:1.7; background:#fdfcfb; border-right:1px solid var(--border); min-height:300px; }
  .t-diff-code.after { background:#fafdfb; border-right:none; }
  @media(max-width:700px){ .t-diff-code { border-right:none; border-bottom:1px solid var(--border); } }
  .dl { display:flex; gap:10px; padding:1.5px 4px; border-radius:3px; }
  .dl.rem { background:rgba(192,57,43,.06); }
  .dl.add { background:rgba(26,107,60,.07); }
  .dl.neu { opacity:.35; }
  .dl.emp { min-height:19.5px; }
  .dp { width:10px; flex-shrink:0; font-weight:700; }
  .dl.rem .dp { color:var(--red); }
  .dl.add .dp { color:var(--green); }
  .dl.neu .dp { color:var(--ink4); }
  .dc { flex:1; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; overflow:hidden; }
  .dl.rem .dc { color:#a93226; }
  .dl.add .dc { color:#1a6b3c; }
  .dl.neu .dc { color:var(--ink3); }
  .dkw { color:#7c3aed; }
  .dstr { color:#166534; }
  .dfn { color:#1d4ed8; }
  .dcm { color:#9ca3af; font-style:italic; }
  .dobj { color:#92400e; }

  .t-diff-stats { display:grid; grid-template-columns:repeat(4,1fr); border:1.5px solid var(--border2); border-top:none; border-radius:0 0 10px 10px; overflow:hidden; background:white; }
  @media(max-width:600px){ .t-diff-stats { grid-template-columns:repeat(2,1fr); } }
  .t-diff-stat { padding:16px; text-align:center; border-right:1px solid var(--border); }
  .t-diff-stat:last-child { border-right:none; }
  @media(max-width:600px){ .t-diff-stat:nth-child(2){ border-right:none; } .t-diff-stat:nth-child(3){ border-top:1px solid var(--border); } }
  .t-diff-stat-val { font-family:var(--display); font-size:28px; font-style:italic; line-height:1; }
  .t-diff-stat-val.r { color:var(--red); }
  .t-diff-stat-val.g { color:var(--green); }
  .t-diff-stat-lbl { font-family:var(--mono); font-size:9px; color:var(--ink4); margin-top:4px; letter-spacing:.08em; text-transform:uppercase; }

  /* FLAG SECTION */
  .t-flag-section { background:white; border-top:1px solid var(--border); }
  .t-flag-card { background:var(--paper2); border:1.5px solid var(--border2); border-radius:12px; overflow:hidden; box-shadow:4px 5px 0 var(--border); max-width:820px; }
  .t-flag-top { padding:28px 32px 24px; border-bottom:1px solid var(--border); }
  .t-flag-eyebrow { font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--ink4); margin-bottom:10px; }
  .t-flag-title { font-family:var(--display); font-size:clamp(20px,3vw,28px); font-weight:400; color:var(--ink); line-height:1.2; margin-bottom:10px; }
  .t-flag-title em { font-style:italic; }
  .t-flag-desc { font-size:14px; color:var(--ink3); line-height:1.6; max-width:560px; }
  .t-flag-ui { padding:24px 32px; display:flex; align-items:center; gap:24px; flex-wrap:wrap; }
  .t-flag-toggles { display:flex; flex-direction:column; gap:10px; }
  .t-flag-row { display:flex; align-items:center; gap:14px; background:white; border:1px solid var(--border); border-radius:8px; padding:12px 16px; min-width:300px; }
  @media(max-width:600px){ .t-flag-row { min-width:unset; width:100%; } .t-flag-ui { flex-direction:column; gap:16px; } }
  .t-flag-key { font-family:var(--mono); font-size:11px; font-weight:700; color:var(--ink2); }
  .t-flag-val { font-family:var(--mono); font-size:10px; color:var(--ink4); margin-top:2px; }
  .t-flag-toggle { width:40px; height:22px; background:var(--ink); border-radius:11px; position:relative; flex-shrink:0; }
  .t-flag-toggle::after { content:''; position:absolute; right:3px; top:3px; width:16px; height:16px; background:white; border-radius:50%; }
  .t-flag-arrow { display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--ink4); font-family:var(--mono); font-size:9px; text-transform:uppercase; letter-spacing:.08em; }
  .t-flag-result { background:white; border:1px solid var(--border); border-radius:8px; padding:14px 18px; }
  .t-flag-result-label { font-family:var(--mono); font-size:9px; font-weight:700; color:var(--ink4); letter-spacing:.1em; text-transform:uppercase; margin-bottom:6px; }
  .t-flag-result-val { font-family:var(--mono); font-size:12px; color:var(--green); font-weight:700; }

  /* MIDDLEWARE SECTION */
  .t-mw-section { background:var(--paper2); border-top:1px solid var(--border); }
  .t-mw-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:12px; }
  @media(max-width:640px){ .t-mw-grid { grid-template-columns:1fr; } }
  .t-mw-card { background:white; border:1px solid var(--border); border-radius:10px; overflow:hidden; transition:box-shadow .2s, transform .15s; }
  .t-mw-card:hover { box-shadow:3px 4px 0 var(--border); transform:translateY(-1px); }
  .t-mw-card-head { padding:16px 18px 12px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .t-mw-card-name { font-family:var(--mono); font-size:12px; font-weight:700; color:var(--ink); letter-spacing:.04em; }
  .t-mw-card-badge { font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:3px 8px; border-radius:20px; }
  .t-mw-card-badge.stable { background:var(--green-bg); color:var(--green); }
  .t-mw-card-badge.beta { background:#fef9e7; color:#b7770d; }
  .t-mw-card-body { padding:14px 18px; }
  .t-mw-card-import { font-family:var(--mono); font-size:10.5px; background:var(--paper2); border:1px solid var(--border); border-radius:4px; padding:8px 12px; margin-bottom:10px; color:var(--ink2); white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; overflow-x:auto; }
  .t-mw-card-desc { font-size:12.5px; color:var(--ink3); line-height:1.5; }

  /* PLATFORMS */
  .t-platforms-section { background:var(--paper); border-top:1px solid var(--border); }
  .t-platforms-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:10px; }
  .t-platform-chip { display:flex; align-items:center; gap:10px; padding:12px 16px; background:white; border:1px solid var(--border); border-radius:8px; font-family:var(--mono); font-size:11px; font-weight:500; color:var(--ink2); transition:border-color .2s, box-shadow .2s, transform .15s; cursor:default; }
  .t-platform-chip:hover { border-color:var(--border2); box-shadow:2px 3px 0 var(--border); transform:translateY(-1px); }
  .t-platform-icon { width:20px; height:20px; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:11px; flex-shrink:0; }
  .t-platform-dot { margin-left:auto; width:6px; height:6px; border-radius:50%; background:var(--green); flex-shrink:0; }
  .t-platform-soon { margin-left:auto; font-size:8px; color:var(--ink4); letter-spacing:.06em; }

  /* FEATURES */
  .t-features-section { background:white; border-top:1px solid var(--border); }
  .t-features-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:10px; overflow:hidden; }
  .t-feature-card { background:white; padding:28px 28px 24px; transition:background .2s; }
  .t-feature-card:hover { background:#fdfcfb; }
  .t-feature-num { font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink4); letter-spacing:.1em; margin-bottom:16px; }
  .t-feature-icon { width:36px; height:36px; border:1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; background:var(--paper2); }
  .t-feature-title { font-family:var(--serif); font-size:16px; font-weight:600; color:var(--ink); margin-bottom:8px; line-height:1.3; }
  .t-feature-desc { font-size:13.5px; color:var(--ink3); line-height:1.55; }

  /* HOW IT WORKS */
  .t-how-section { background:var(--paper); border-top:1px solid var(--border); }
  .t-steps { display:flex; flex-direction:column; border:1px solid var(--border); border-radius:10px; overflow:hidden; max-width:780px; background:white; }
  .t-step { display:grid; grid-template-columns:64px 1fr; border-bottom:1px solid var(--border); }
  .t-step:last-child { border-bottom:none; }
  .t-step-num { display:flex; align-items:flex-start; justify-content:center; padding-top:24px; font-family:var(--display); font-size:22px; font-style:italic; color:var(--ink4); border-right:1px solid var(--border); }
  .t-step-body { padding:22px 24px; }
  .t-step-title { font-family:var(--serif); font-size:15px; font-weight:600; color:var(--ink); margin-bottom:6px; }
  .t-step-desc { font-size:13.5px; color:var(--ink3); line-height:1.55; margin-bottom:12px; word-wrap:break-word; overflow-wrap:break-word; }
  .t-step-code { font-family:var(--mono); font-size:11px; background:var(--paper2); border:1px solid var(--border); border-radius:5px; padding:10px 14px; color:var(--ink2); line-height:1.6; overflow-x:auto; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; }
  @media(max-width:640px){ .t-step { grid-template-columns:1fr; } .t-step-num { padding-top:16px; padding-bottom:12px; border-right:none; border-bottom:1px solid var(--border); justify-content:flex-start; padding-left:24px; } }
  .t-step-code .skw { color:#7c3aed; }
  .t-step-code .sstr { color:#166534; }
  .t-step-code .sfn { color:#1d4ed8; }
  .t-step-code .sobj { color:#92400e; }
  .t-step-code .scm { color:#9ca3af; font-style:italic; }

  /* CTA */
  .t-cta-section { background:var(--ink); padding:clamp(60px,8vw,100px) clamp(20px,5vw,80px); }
  .t-cta-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center; }
  @media(max-width:700px){ .t-cta-inner { grid-template-columns:1fr; } .t-cta-actions { flex-direction:row; } }
  .t-cta-title { font-family:var(--display); font-size:clamp(28px,4vw,44px); font-weight:400; color:var(--paper); line-height:1.15; }
  .t-cta-title em { font-style:italic; color:rgba(247,244,239,.7); }
  .t-cta-desc { font-size:15px; color:rgba(247,244,239,.55); margin-top:10px; line-height:1.55; }
  .t-cta-actions { display:flex; flex-direction:column; gap:12px; }
  .t-btn-cta { font-family:var(--mono); font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--ink); background:var(--paper); border:none; padding:13px 28px; border-radius:4px; cursor:pointer; text-decoration:none; transition:opacity .2s; text-align:center; white-space:nowrap; }
  .t-btn-cta:hover { opacity:.88; }
  .t-btn-cta-sec { font-family:var(--mono); font-size:11px; color:rgba(247,244,239,.5); text-decoration:none; text-align:center; transition:color .2s; }
  .t-btn-cta-sec:hover { color:rgba(247,244,239,.85); }

  /* FOOTER */
  .t-footer { background:var(--ink); border-top:1px solid rgba(255,255,255,.07); padding:28px clamp(20px,5vw,80px); }
  .t-footer-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
  .t-footer-logo { font-family:var(--mono); font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:rgba(247,244,239,.5); }
  .t-footer-links { display:flex; gap:20px; list-style:none; margin:0; padding:0; }
  .t-footer-links a { font-family:var(--mono); font-size:10px; color:rgba(247,244,239,.35); text-decoration:none; letter-spacing:.06em; transition:color .2s; }
  .t-footer-links a:hover { color:rgba(247,244,239,.7); }
  .t-footer-copy { font-family:var(--mono); font-size:10px; color:rgba(247,244,239,.25); letter-spacing:.04em; }
  @media(max-width:600px){ .t-footer-inner { flex-direction:column; text-align:center; } .t-footer-links { flex-wrap:wrap; justify-content:center; } }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .fade-up-1 { animation:fadeUp .5s ease .05s both; }
  .fade-up-2 { animation:fadeUp .5s ease .12s both; }
  .fade-up-3 { animation:fadeUp .5s ease .18s both; }
  .fade-up-4 { animation:fadeUp .5s ease .24s both; }
  .fade-up-5 { animation:fadeUp .5s ease .30s both; }
  .fade-up-r { animation:fadeUp .5s ease .20s both; }

  /* inline code */
  .t-inline-code { font-family:var(--mono); font-size:.88em; background:var(--paper2); border:1px solid var(--border); padding:1px 5px; border-radius:3px; color:var(--ink2); }
`;

// ─── DATA ──────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { name: "Stripe", icon: "/Stripe.svg", bg: "#f0f9f4", verified: true },
  { name: "Clerk", icon: "/clerk.svg", bg: "#f5f0fa", verified: true },
  { name: "GitHub", icon: "/github.svg", bg: "#f0f5ff", verified: true },
  { name: "Shopify", icon: "/shopify.svg", bg: "#fff5f0", verified: true },
  { name: "Polar", icon: "/polar.svg", bg: "#f5f5f0", verified: true },
  { name: "Dodo Payments", icon: "/dodo.svg", bg: "#f0f5fa", verified: true },
  { name: "GitLab", icon: "/gitlab.svg", bg: "#fafafa", verified: true },
  { name: "Vercel", icon: "/vercel.svg", bg: "#f0f9ff", verified: true },
  { name: "Replicate", icon: "/replicate.svg", bg: "#f0f8ff", verified: true },
  { name: "Razorpay", icon: "/razorpay.svg", bg: "#f0f8ff", verified: true },
  { name: "WorkOS", icon: "/workos.svg", bg: "#f5f5f5", verified: true },
  { name: "Fal AI", icon: "/fal.svg", bg: "#f0f8ff", verified: true },
  { name: "LemonSqueezy", icon: "/lemonsqueezy.svg", bg: "#f5f5f0", verified: true },
  { name: "Paddle", icon: "/paddle.svg", bg: "#fafafa", verified: true },
];

const MIDDLEWARES = [
  {
    name: "@hookflo/tern/nextjs",
    badge: "stable",
    import: `import { createWebhookHandler } from '@hookflo/tern/nextjs'`,
    desc: "App Router adapter. Reads platform & secret from Vercel feature flags at runtime — no redeploy needed.",
  },
  {
    name: "@hookflo/tern/express",
    badge: "stable",
    import: `import { ternMiddleware } from '@hookflo/tern/express'`,
    desc: "Express.js middleware. Drop-in request verification before your route handler runs.",
  },
  {
    name: "@hookflo/tern/cloudflare",
    badge: "beta",
    import: `import { createWorkerHandler } from '@hookflo/tern/cloudflare'`,
    desc: "Cloudflare Workers adapter using the Web Crypto API. Edge-native, zero Node.js dependencies.",
  },
  {
    name: "Core API",
    badge: "stable",
    import: `import { WebhookVerificationService } from '@hookflo/tern'`,
    desc: "Framework-agnostic core. Works in any runtime that supports the Web Crypto API — Deno, Bun, Node.js 18+.",
  },
];

const FEATURES = [
  {
    num: "01",
    title: "Algorithm agnostic",
    desc: "HMAC-SHA256, SHA1, SHA512, or custom. Tern decouples platform logic from signing logic — add any platform without touching core code.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L2 6v6l7 4 7-4V6L9 2z" stroke="#1a1714" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Zero dependencies",
    desc: "No svix, no axios, no lodash. Pure TypeScript using the platform's Web Crypto API. Smaller bundle, full auditability.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#1a1714" strokeWidth="1.3" />
        <path d="M6 9l2 2 4-4" stroke="#1a1714" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Fully type-safe",
    desc: "Comprehensive TypeScript types throughout. Catch wrong platform names and missing secrets at compile time, not in production.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="#1a1714" strokeWidth="1.3" />
        <path d="M5 9h8M9 5v8" stroke="#1a1714" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Framework agnostic",
    desc: "Express, Next.js App Router, Cloudflare Workers, Deno — Tern normalizes the request interface so your code works everywhere.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6" stroke="#1a1714" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M9 6v3l2 2" stroke="#1a1714" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Custom platform configs",
    desc: "Using a provider we don't support yet? Supply a signatureConfig object and verify any HMAC webhook — no library update needed.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M5 4h8v2L9 10l4 4H5v-2l4-4-4-4V4z" stroke="#1a1714" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Timing-safe by default",
    desc: "All comparisons use constant-time equality to prevent timing attacks. Replay protection via configurable timestamp tolerance is on by default.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="#1a1714" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="9" cy="9" r="3" stroke="#1a1714" strokeWidth="1.3" />
      </svg>
    ),
  },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm i @hookflo/tern");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tern-root relative">
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className="t-nav">
        <Link href="/" className="t-nav-logo">
          <div >
            <Feather className="w-7 h-7 text-orange-500 -mr-1 " />
          </div>
          <span className="t-nav-name">Tern</span>
        </Link>

        <ul className="t-nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#platforms">Platforms</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#middleware">Frameworks</a></li>
        </ul>

        <a href="https://github.com/Hookflo/tern" target="_blank" rel="noreferrer" className="t-nav-gh">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </nav>

      {/* ── HERO ── */}
      <div>
        <div className="t-hero">
          {/* Left */}
          <div>
            <div className="t-eyebrow fade-up-1">Webhook Verification Framework</div>
            <h1 className="t-h1 fade-up-2">
              Verify webhooks<br /> <em>Across every platform.</em><br />
            </h1>

            <p className="t-hero-desc fade-up-3">
              Tern is a zero-dependency TypeScript framework for webhook signature verification. One API, every platform. No boilerplate, no fragile hand-rolled crypto.
            </p>
            <div className="t-actions fade-up-4">
              <a href="#how" className="t-btn-primary">Get started</a>
              <a href="https://github.com/Hookflo/tern" target="_blank" rel="noreferrer" className="t-btn-secondary">
                View on GitHub
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </a>
            </div>
            <div className="t-install fade-up-5">
              <div className="t-install-cmd">
                <span>$</span> npm i @hookflo/tern
              </div>
              <button className="t-copy-btn" onClick={copyInstall} title="Copy">
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 4" stroke="#1a6b3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="4.5" y="1" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 5h4v8h7v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Right: Code Card */}
          <div className="t-hero-right fade-up-r">
            <div className="t-code-card">
              <div className="t-code-bar">
                <div className="t-dots">
                  <div className="t-dot" style={{ background: "#ff6058" }} />
                  <div className="t-dot" style={{ background: "#ffbd2e" }} />
                  <div className="t-dot" style={{ background: "#29c440" }} />
                </div>
                <span className="t-code-filename">app/api/webhooks/route.ts</span>
              </div>
              <div className="t-code-body">
                <div><span className="ck">import</span> <span className="ct">{"{ createWebhookHandler }"}</span> <span className="ck">from</span> <span className="cs">'@hookflo/tern/nextjs'</span></div>
                <div><span className="ck">import</span> <span className="ct">{"{ platform, webhooksecret }"}</span> <span className="ck">from</span> <span className="cs">'../flags'</span></div>
                <div>&nbsp;</div>
                <div><span className="ck">export const</span> <span className="ct">POST</span> <span className="ck">=</span> <span className="cf">createWebhookHandler</span><span className="ct">{"({"}</span></div>
                <div><span className="ct">&nbsp;&nbsp;platform:</span> <span className="ck">await</span> <span className="cf">platform</span><span className="ct">(),</span></div>
                <div><span className="ct">&nbsp;&nbsp;secret: &nbsp;</span><span className="ck">await</span> <span className="cf">webhooksecret</span><span className="ct">(),</span></div>
                <div><span className="ct">&nbsp;&nbsp;handler: </span><span className="ck">async</span> <span className="ct">(payload) =&gt; {"{"}</span></div>
                <div><span className="cc">&nbsp;&nbsp;&nbsp;&nbsp;// verified ✓ — handle your event</span></div>
                <div><span className="ct">&nbsp;&nbsp;{"}"}</span></div>
                <div><span className="ct">{"})"}</span></div>
              </div>
            </div>
            <div className="t-hero-stats">
              <div className="t-hero-stat">
                <div className="t-hero-stat-val">10+</div>
                <div className="t-hero-stat-lbl">Platforms</div>
              </div>
              <div className="t-hero-stat">
                <div className="t-hero-stat-val">0</div>
                <div className="t-hero-stat-lbl">Dependencies</div>
              </div>
              <div className="t-hero-stat">
                <div className="t-hero-stat-val">∞</div>
                <div className="t-hero-stat-lbl">Custom configs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── BEFORE / AFTER DIFF ── */}
      <section className="t-diff-section t-section">
        <div className="t-section-inner">
          <div className="t-section-label">Before &amp; After</div>
          <h2 className="t-h2">Your webhook handler,<br /><em>minus the boilerplate.</em></h2>
          <p className="t-section-desc">Clerk webhook verification today vs with Tern. Same security, a fraction of the code.</p>

          <div className="t-diff-grid">
            {/* BEFORE */}
            <div>
              <div className="t-diff-label before">
                <div className="t-diff-dot" style={{ background: "var(--red)" }} />
                Before — Clerk (manual)
                <span className="t-diff-lc">~22 lines</span>
              </div>
              <div className="t-diff-code">
                {[
                  { t: "rem", p: "−", c: <><span className="dkw">import</span>{" { Webhook } "}<span className="dkw">from</span>{" "}<span className="dstr">'svix'</span></> },
                  { t: "rem", p: "−", c: <><span className="dkw">import</span>{" { headers } "}<span className="dkw">from</span>{" "}<span className="dstr">'next/headers'</span></> },
                  { t: "emp" },
                  { t: "rem", p: "−", c: <><span className="dkw">export async function</span>{" "}<span className="dfn">POST</span>{"(req: Request) {"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">const</span>{" SECRET = process.env."}<span className="dobj">CLERK_WEBHOOK_SECRET</span></> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">if</span>{"(!SECRET) "}<span className="dkw">throw new</span>{" "}<span className="dfn">Error</span>{"("}<span className="dstr">'Missing secret'</span>{")"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">const</span>{" h = "}<span className="dkw">await</span>{" "}<span className="dfn">headers</span>{"()"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">const</span>{" svix_id = h."}<span className="dfn">get</span>{"("}<span className="dstr">"svix-id"</span>{")"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">const</span>{" svix_ts = h."}<span className="dfn">get</span>{"("}<span className="dstr">"svix-timestamp"</span>{")"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">const</span>{" svix_sig = h."}<span className="dfn">get</span>{"("}<span className="dstr">"svix-signature"</span>{")"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">if</span>{"(!svix_id || !svix_ts || !svix_sig)"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">return new</span>{" "}<span className="dfn">Response</span>{"("}<span className="dstr">'Bad headers'</span>{", { status: 400 })"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">const</span>{" body = JSON."}<span className="dfn">stringify</span>{"("}<span className="dkw">await</span>{" req."}<span className="dfn">json</span>{"())"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">const</span>{" wh = "}<span className="dkw">new</span>{" "}<span className="dfn">Webhook</span>{"(SECRET)"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">let</span>{" evt"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dkw">try</span>{" { evt = wh."}<span className="dfn">verify</span>{"(body, {"}</> },
                  { t: "rem", p: "−", c: <>{" "}<span className="dstr">"svix-id"</span>{": svix_id, "}<span className="dstr">"svix-signature"</span>{": svix_sig })"}</> },
                  { t: "rem", p: "−", c: <>{" } "}<span className="dkw">catch</span>{" (err) { "}<span className="dkw">return new</span>{" "}<span className="dfn">Response</span>{"("}<span className="dstr">'Invalid'</span>{", {status:400}) }"}</> },
                  { t: "neu", p: " ", c: <><span className="dcm">{"  // finally... handle event"}</span></> },
                  { t: "neu", p: " ", c: <>{"}"}</> },
                ].map((line, i) =>
                  line.t === "emp" ? (
                    <div key={i} className="dl emp" />
                  ) : (
                    <div key={i} className={`dl ${line.t}`}>
                      <span className="dp">{line.p}</span>
                      <span className="dc">{line.c}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* AFTER */}
            <div>
              <div className="t-diff-label after">
                <div className="t-diff-dot" style={{ background: "var(--green)" }} />
                After — With Tern
                <span className="t-diff-lc">8 lines. done.</span>
              </div>
              <div className="t-diff-code after">
                {[
                  { t: "add", p: "+", c: <><span className="dkw">import</span>{" { createWebhookHandler } "}<span className="dkw">from</span>{" "}<span className="dstr">'@hookflo/tern/nextjs'</span></> },
                  { t: "add", p: "+", c: <><span className="dkw">import</span>{" { platform, webhooksecret } "}<span className="dkw">from</span>{" "}<span className="dstr">'../flags'</span></> },
                  { t: "emp" },
                  { t: "add", p: "+", c: <><span className="dkw">export const</span>{" POST = "}<span className="dfn">createWebhookHandler</span>{"({"}</> },
                  { t: "add", p: "+", c: <>{" platform: "}<span className="dkw">await</span>{" "}<span className="dfn">platform</span>{"(),"}</> },
                  { t: "add", p: "+", c: <>{" secret:   "}<span className="dkw">await</span>{" "}<span className="dfn">webhooksecret</span>{"(),"}</> },
                  { t: "add", p: "+", c: <>{" handler: "}<span className="dkw">async</span>{" (payload) => {"}</> },
                  { t: "neu", p: " ", c: <><span className="dcm">{"    // verified ✓ — handle your event"}</span></> },
                  { t: "add", p: "+", c: <>{"  }"}</> },
                  { t: "add", p: "+", c: <>{"})"}</> },
                  ...Array(10).fill({ t: "emp" }),
                ].map((line, i) =>
                  line.t === "emp" ? (
                    <div key={i} className="dl emp" />
                  ) : (
                    <div key={i} className={`dl ${line.t}`}>
                      <span className="dp">{line.p}</span>
                      <span className="dc">{line.c}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Diff stats */}
          <div className="t-diff-stats">
            <div className="t-diff-stat">
              <div className="t-diff-stat-val r">−22</div>
              <div className="t-diff-stat-lbl">Lines deleted</div>
            </div>
            <div className="t-diff-stat">
              <div className="t-diff-stat-val g">+8</div>
              <div className="t-diff-stat-lbl">Lines added</div>
            </div>
            <div className="t-diff-stat">
              <div className="t-diff-stat-val g">0</div>
              <div className="t-diff-stat-lbl">Redeploys</div>
            </div>
            <div className="t-diff-stat">
              <div className="t-diff-stat-val g">∞</div>
              <div className="t-diff-stat-lbl">Platforms</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERCEL FLAG ── */}
      <section className="t-flag-section t-section">
        <div className="t-section-inner">
          <div className="t-section-label">The Killer Feature</div>
          <div className="t-flag-card">
            <div className="t-flag-top">
              <div className="t-flag-eyebrow">Vercel Feature Flags × Tern</div>
              <h3 className="t-flag-title">Switch platforms with<br /><em>a single flag flip.</em></h3>
              <p className="t-flag-desc">
                No code change. No redeployment. Set your platform and webhook secret via Vercel feature flags — Tern reads them at runtime. Switch from Clerk to Stripe to GitHub without touching your codebase.
              </p>
            </div>
            <div className="t-flag-ui">
              <div className="t-flag-toggles">
                <div className="t-flag-row">
                  <div style={{ flex: 1 }}>
                    <div className="t-flag-key">PLATFORM</div>
                    <div className="t-flag-val">clerk → stripe</div>
                  </div>
                  <div className="t-flag-toggle" />
                </div>
                <div className="t-flag-row">
                  <div style={{ flex: 1 }}>
                    <div className="t-flag-key">WEBHOOK_SECRET</div>
                    <div className="t-flag-val">whsec_••••••••</div>
                  </div>
                  <div className="t-flag-toggle" />
                </div>
              </div>
              <div className="t-flag-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                that's it
              </div>
              <div className="t-flag-result">
                <div className="t-flag-result-label">Result</div>
                <div className="t-flag-result-val">✓ Verified — no redeploy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MIDDLEWARE / FRAMEWORK ADAPTERS ── */}
      <section className="t-mw-section t-section" id="middleware">
        <div className="t-section-inner">
          <div className="t-section-label">Framework Adapters</div>
          <h2 className="t-h2">Works wherever<br /><em>your code runs.</em></h2>
          <p className="t-section-desc" style={{ marginBottom: 32 }}>
            Purpose-built adapters for every major runtime. Same verification logic, native integration.
          </p>
          <div className="t-mw-grid">
            {MIDDLEWARES.map((mw) => (
              <div className="t-mw-card" key={mw.name}>
                <div className="t-mw-card-head">
                  <span className="t-mw-card-name">{mw.name}</span>
                  <span className={`t-mw-card-badge ${mw.badge}`}>{mw.badge}</span>
                </div>
                <div className="t-mw-card-body">
                  <div className="t-mw-card-import">{mw.import}</div>
                  <p className="t-mw-card-desc">{mw.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="t-platforms-section t-section" id="platforms">
        <div className="t-section-inner">
          <div className="t-section-label">Supported Platforms</div>
          <h2 className="t-h2">Works with the tools<br /><em>you already use.</em></h2>
          <p className="t-section-desc" style={{ marginBottom: 32 }}>
            Verified implementations — not guesswork. Each platform is tested against real webhook payloads.
          </p>
          <div className="t-platforms-grid">
            {PLATFORMS.map((p) => (
              <div className="t-platform-chip" key={p.name}>
                <div className="t-platform-icon" style={{ background: p.bg }}>
                  <img src={`/assets${p.icon}`} alt={`${p.name} logo`} style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </div>
                {p.name}
                {p.verified
                  ? <div className="t-platform-dot" />
                  : <span className="t-platform-soon">soon</span>}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink4)" }}>
            ● verified &nbsp;&nbsp; Custom config lets you verify <em>any</em> HMAC-based webhook without waiting for built-in support.
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="t-features-section t-section" id="features">
        <div className="t-section-inner">
          <div className="t-section-label">Features</div>
          <h2 className="t-h2">Built for the long run.</h2>
          <p className="t-section-desc" style={{ marginBottom: 36 }}>No magic, no bloat. Just the right abstractions in the right places.</p>
          <div className="t-features-grid">
            {FEATURES.map((f) => (
              <div className="t-feature-card" key={f.num}>
                <div className="t-feature-num">{f.num}</div>
                <div className="t-feature-icon">{f.icon}</div>
                <div className="t-feature-title">{f.title}</div>
                <div className="t-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="t-how-section t-section" id="how">
        <div className="t-section-inner">
          <div className="t-section-label">How it works</div>
          <h2 className="t-h2">Up and running<br /><em>in three steps.</em></h2>
          <div className="t-steps">
            <div className="t-step">
              <div className="t-step-num">1</div>
              <div className="t-step-body">
                <div className="t-step-title">Install</div>
                <div className="t-step-desc">One package, zero transitive dependencies. Works in Node.js, Next.js, Cloudflare Workers, Deno.</div>
                <div className="t-step-code">npm install @hookflo/tern</div>
              </div>
            </div>
            <div className="t-step">
              <div className="t-step-num">2</div>
              <div className="t-step-body">
                <div className="t-step-title">Verify with your platform</div>
                <div className="t-step-desc">Pass the request, platform name, and secret. Tern handles header parsing, timing validation, and HMAC comparison.</div>
                <div className="t-step-code">
                  <span className="skw">import</span>{" { WebhookVerificationService } "}<span className="skw">from</span>{" "}<span className="sstr">'@hookflo/tern'</span>{"\n\n"}
                  <span className="skw">const</span>{" result = "}<span className="skw">await</span>{" WebhookVerificationService\n"}
                  {"  ."}<span className="sfn">verifyWithPlatformConfig</span>{"(request, "}<span className="sstr">'clerk'</span>{", process.env."}<span className="sobj">WEBHOOK_SECRET</span>{")\n\n"}
                  <span className="skw">if</span>{" (result.isValid) { "}<span className="scm">// handle your event</span>{" }"}
                </div>
              </div>
            </div>
            <div className="t-step">
              <div className="t-step-num">3</div>
              <div className="t-step-body">
                <div className="t-step-title">Use feature flags to switch platforms</div>
                <div className="t-step-desc">
                  With the Next.js adapter, pass <code className="t-inline-code">platform</code> and <code className="t-inline-code">secret</code> from Vercel feature flags. Change platforms at runtime — zero code changes, zero redeployments.
                </div>
                <div className="t-step-code">
                  <span className="skw">export const</span>{" POST = "}<span className="sfn">createWebhookHandler</span>{"({\n"}
                  {"  platform: "}<span className="skw">await</span>{" "}<span className="sfn">platform</span>{"(),  "}<span className="scm">// from @vercel/flags</span>{"\n"}
                  {"  secret:   "}<span className="skw">await</span>{" "}<span className="sfn">webhooksecret</span>{"(),\n"}
                  {"  handler:  "}<span className="skw">async</span>{" (payload) => { "}<span className="scm">/* ... */</span>{" }\n"}
                  {"})"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="t-cta-section">
        <div className="t-cta-inner">
          <div>
            <h2 className="t-cta-title">
              Ready to delete<br /><em>your webhook boilerplate?</em>
            </h2>
            <p className="t-cta-desc">Open source. MIT licensed. Built and maintained at Hookflo.</p>
          </div>
          <div className="t-cta-actions">
            <a href="https://github.com/Hookflo/tern" target="_blank" rel="noreferrer" className="t-btn-cta">
              ⭐ Star on GitHub
            </a>
            <a href="https://github.com/Hookflo/tern/blob/main/README.md" target="_blank" rel="noreferrer" className="t-btn-cta-sec">
              Read the docs →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="t-footer">
        <div className="t-footer-inner">
          <div className="t-footer-logo">Tern by Hookflo</div>
          <ul className="t-footer-links">
            <li><a href="https://github.com/Hookflo/tern/blob/main/README.md" target="_blank" rel="noreferrer">Docs</a></li>
            <li><a href="https://github.com/Hookflo/tern" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://hookflo.com" target="_blank" rel="noreferrer">Hookflo</a></li>
            <li><a href="https://github.com/Hookflo/tern/blob/main/LICENSE" target="_blank" rel="noreferrer">MIT License</a></li>
          </ul>
          <div className="t-footer-copy">© 2025 Hookflo. Open source.</div>
        </div>
      </footer>
    </div>
  );
}
