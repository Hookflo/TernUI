// ─── SHARED DESIGN TOKENS ────────────────────────────────────────────────────
// These match exactly the CSS variables in the existing page.tsx.
// Import this in every page / component — never hardcode colors.

export const DESIGN_CSS = `
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
    --green:   #059669;
    --green-bg:#edf5f0;
    --red:     #c0392b;
    --red-bg:  #fdf1ef;
    --accent:  #2c5f8a;
    --mono:    'JetBrains Mono', monospace;
    --serif:   'Lora', Georgia, serif;
    --display: 'Instrument Serif', Georgia, serif;
  }

  /* BASE */
  .tern-root { font-family: var(--serif); background: var(--paper); color: var(--ink); position:relative }
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
  .t-nav-name { font-family:var(--mono); font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .t-nav-links { display:flex; align-items:center; gap:28px; list-style:none; margin:0; padding:0; }
  .t-nav-links a { font-family:var(--mono); font-size:11px; font-weight:500; letter-spacing:0.06em; color:var(--ink3); text-decoration:none; transition:color .2s; }
  .t-nav-links a:hover { color:var(--ink); }
  .t-nav-links a.active { color:var(--ink); }
  .t-nav-new-dot { display:inline-block; width:6px; height:6px; background:var(--green); border-radius:50%; margin-right:5px; vertical-align:middle; }
  .t-nav-gh {
    display:flex; align-items:center; gap:6px;
    font-family:var(--mono); font-size:11px; font-weight:700; letter-spacing:0.06em;
    color:var(--ink); border:1.5px solid var(--ink); padding:6px 14px; border-radius:4px;
    text-decoration:none; transition:background .2s, color .2s;
  }
  .t-nav-gh:hover { background:var(--ink); color:var(--paper); }
  @media(max-width:768px){ .t-nav-links { display:none; } }

  /* SECTIONS */
  .t-section { padding: clamp(60px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,6vw,70px);
    max-width:1200px; margin:0 auto; }
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

  /* BUTTONS */
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

  /* CODE */
  .t-code-block {
    font-family:var(--mono); font-size:12px; line-height:1.75;
    background:var(--ink); color:#f8f8f2;
    border-radius:8px; overflow:hidden;
  }
  .t-code-bar {
    background:#2a2520; padding:10px 16px;
    display:flex; align-items:center; gap:8px;
    border-bottom:1px solid rgba(255,255,255,.06);
  }
  .t-dots { display:flex; gap:6px; }
  .t-dot { width:10px; height:10px; border-radius:50%; }
  .t-code-filename { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.3); margin-left:8px; letter-spacing:.04em; }
  .t-code-body { padding:20px 22px; overflow-x:auto; white-space:pre; }
  .ck  { color:#c792ea; }
  .cs  { color:#c3e88d; }
  .cf  { color:#82aaff; }
  .cc  { color:#546e7a; font-style:italic; }
  .co  { color:#ffcb6b; }
  .ct  { color:#f8f8f2; }

  /* TABS */
  .t-tabs { display:flex; gap:0; border:1px solid var(--border); border-radius:6px; overflow:hidden; margin-bottom:20px; background:var(--paper2); }
  .t-tab {
    font-family:var(--mono); font-size:11px; font-weight:500; letter-spacing:.04em;
    padding:9px 16px; border:none; background:none; cursor:pointer;
    color:var(--ink3); border-right:1px solid var(--border); transition:all .15s;
    white-space:nowrap;
  }
  .t-tab:last-child { border-right:none; }
  .t-tab:hover { background:var(--paper); color:var(--ink); }
  .t-tab.active { background:var(--ink); color:var(--paper); }

  /* INSTALL */
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

  /* CARDS */
  .t-card {
    background:white; border:1px solid var(--border); border-radius:10px;
    padding:24px; transition:box-shadow .2s, transform .15s;
  }
  .t-card:hover { box-shadow:3px 4px 0 var(--border); transform:translateY(-1px); }

  /* INFO / WARNING BOX */
  .t-info-box {
    border:1.5px solid var(--border2); border-radius:10px;
    padding:20px 24px; background:var(--paper2);
    font-family:var(--mono); font-size:12px; line-height:1.7; color:var(--ink2);
  }
  .t-warn-box {
    border:1.5px solid #f59e0b; border-radius:10px;
    padding:20px 24px; background:#fffbeb;
    font-family:var(--mono); font-size:12px; line-height:1.7; color:#92400e;
  }
  .t-warn-box-title { font-weight:700; font-size:13px; margin-bottom:8px; display:flex; align-items:center; gap:8px; }
  .t-crit-box {
    border:1.5px solid #dc2626; border-radius:10px;
    padding:20px 24px; background:#fef2f2;
    font-family:var(--mono); font-size:12px; line-height:1.7; color:#991b1b;
  }
  .t-crit-box-title { font-weight:700; font-size:13px; margin-bottom:8px; display:flex; align-items:center; gap:8px; }

  /* TABLE */
  .t-table { width:100%; border-collapse:collapse; border:1px solid var(--border); border-radius:8px; overflow:hidden; }
  .t-table th { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--ink4); padding:12px 16px; background:var(--paper2); text-align:left; border-bottom:1px solid var(--border); }
  .t-table td { font-family:var(--mono); font-size:12px; color:var(--ink2); padding:12px 16px; border-bottom:1px solid var(--border); }
  .t-table tr:last-child td { border-bottom:none; }
  .t-table tr:hover td { background:var(--paper2); }
  .t-check { color:var(--green); font-weight:700; }
  .t-cross { color:var(--red); font-weight:700; }

  /* BADGE */
  .t-badge { font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:3px 8px; border-radius:20px; }
  .t-badge.stable { background:var(--green-bg); color:var(--green); }
  .t-badge.beta   { background:#fef9e7; color:#b7770d; }
  .t-badge.new    { background:var(--green-bg); color:var(--green); }

  /* INLINE CODE */
  .t-inline-code { font-family:var(--mono); font-size:.88em; background:var(--paper2); border:1px solid var(--border); padding:1px 5px; border-radius:3px; color:var(--ink2); }

  /* CTA SECTION */
  .t-cta-section { background:var(--ink); padding:clamp(60px,8vw,100px) clamp(20px,5vw,80px); }
  .t-cta-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center; }
  @media(max-width:700px){ .t-cta-inner { grid-template-columns:1fr; } }
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

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .fade-up-1 { animation:fadeUp .5s ease .05s both; }
  .fade-up-2 { animation:fadeUp .5s ease .12s both; }
  .fade-up-3 { animation:fadeUp .5s ease .18s both; }
  .fade-up-4 { animation:fadeUp .5s ease .24s both; }
  .fade-up-5 { animation:fadeUp .5s ease .30s both; }

  /* HERO — inner pages */
  .t-page-hero {
    padding: clamp(60px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,6vw,70px);
    max-width:1200px; margin:0 auto;
  }
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
  .t-hero-desc { font-size:clamp(15px,1.8vw,17px); color:var(--ink3); line-height:1.65; max-width:540px; margin-bottom:36px; }

  /* ENV VARS BLOCK */
  .t-env-block {
    font-family:var(--mono); font-size:12px; line-height:1.9;
    background:var(--paper2); border:1px solid var(--border);
    border-radius:8px; padding:18px 22px; color:var(--ink2);
  }
  .t-env-key { color:var(--accent); }
  .t-env-val { color:var(--green); }
  .t-env-comment { color:var(--ink4); font-style:italic; }

  /* STEP LIST */
  .t-steps { display:flex; flex-direction:column; border:1px solid var(--border); border-radius:10px; overflow:hidden; background:white; }
  .t-step { display:grid; grid-template-columns:64px 1fr; border-bottom:1px solid var(--border); }
  .t-step:last-child { border-bottom:none; }
  .t-step-num { display:flex; align-items:flex-start; justify-content:center; padding-top:24px; font-family:var(--display); font-size:22px; font-style:italic; color:var(--ink4); border-right:1px solid var(--border); }
  .t-step-body { padding:22px 24px; }
  .t-step-title { font-family:var(--serif); font-size:15px; font-weight:600; color:var(--ink); margin-bottom:6px; }
  .t-step-desc { font-size:13.5px; color:var(--ink3); line-height:1.55; margin-bottom:12px; }
  @media(max-width:640px){ .t-step { grid-template-columns:1fr; } .t-step-num { padding:16px 24px 0; border-right:none; border-bottom:1px solid var(--border); justify-content:flex-start; } }
`;