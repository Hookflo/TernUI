"use client";

import SiteNav from "@/components/site-nav";
import {
  Terminal,
  Zap,
  Lock,
  Code2,
  Download,
  Copy,
  Check,
  Shield,
  RefreshCw,
  Settings2,
  Globe,
  Eye,
  Filter,
  Server,
} from "lucide-react";
import { useState } from "react";

/* ──────────────────────────────── STYLES ───────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&family=Geist:wght@300;400;500;600;700&display=swap');

:root {
  --bg:       #f4f2ed;
  --bg2:      #eceae4;
  --bg3:      #e5e2da;
  --surface:  #faf9f6;
  --surface2: #f0ede6;
  --ink:      #1a1916;
  --ink2:     #2c2a26;
  --ink3:     #5a5750;
  --ink4:     #9c9890;
  --border:   #dddad2;
  --border2:  #ccc9c0;
  --accent:   #3b6ef5;
  --accent2:  #5a85ff;
  --green:    #1a7a4a;
  --teal:     #0f7a6e;
  --violet:   #5b3fa8;
  --mono: 'DM Mono', 'Fira Code', monospace;
  --sans: 'Geist', system-ui, sans-serif;
  --display: 'Instrument Serif', Georgia, serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.tr {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── NOISE LAYER (global) ── */
.noise-svg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.028;
  mix-blend-mode: multiply;
}

/* ═══════════════════════════ HERO ═══════════════════════════ */
.hero {
  position: relative;
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 150px clamp(16px,5vw,80px) 90px;
  text-align: center;
  overflow: hidden;
  isolation: isolate;
    background-image: repeating-linear-gradient(
    -45deg,
    var(--paper2)   0px,
    var(--paper2)   4px,
    var(--border)   4px,
    var(--border)   5px
  );

}

/* Clean gradient bg */
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% -5%,  rgba(180,200,255,0.28) 0%, transparent 55%),
    radial-gradient(ellipse 60% 50% at 80% 8%,   rgba(200,220,255,0.22) 0%, transparent 50%),
    radial-gradient(ellipse 70% 70% at 50% 110%, rgba(210,225,255,0.2)  0%, transparent 55%),
    radial-gradient(ellipse 50% 50% at 5%  75%,  rgba(220,230,255,0.15) 0%, transparent 45%),
    radial-gradient(ellipse 40% 60% at 95% 65%,  rgba(200,215,255,0.15) 0%, transparent 45%),
    #f4f2ed;


}

/* Subtle shadow overlays */
.hero-bg::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(0,0,0,0.03) 0%, transparent 40%),
    radial-gradient(circle at 90% 30%, rgba(0,0,0,0.04) 0%, transparent 35%),
    radial-gradient(circle at 15% 85%, rgba(0,0,0,0.025) 0%, transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(0,0,0,0.03) 0%, transparent 40%),
    radial-gradient(ellipse 1000px 300px at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 100%);
  pointer-events: none;
}

/* Diagonal stripe art overlay */
.hero-diagonal {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 28px,
    rgba(59,110,245,0.025) 28px,
    rgba(59,110,245,0.025) 29px
  );
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%);
}

/* Grid dot overlay */
.hero-grid {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background-image: radial-gradient(circle, rgba(0,0,0,0.09) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 75%);
  opacity: 0.35;
}
  .cli-code-body {
    padding: 24px 28px; overflow-x: auto; white-space: pre;
  }
  .cli-code-body .str { color: #a6d155; }
  .cli-code-body .num { color: #d4a574; }
  .cli-code-body .key { color: #6dbfe5; }
  .cli-code-body .bool { color: #d9829b; }
.hero > * { position: relative; z-index: 3; }

/* ── BOXED BORDER (ankar.ai style) ── */
.hero-box {
  position: absolute; inset: clamp(10px,2.8vw,48px); z-index: 2; pointer-events: none;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 4px;
        background: linear-gradient(135deg, 
      #f7f4ef 0%,
      #fde4d0 12%,
      #f9cfc8 22%,
      #f2b5d4 35%,
      #e89fd8 50%,
      #d89fdb 62%,
      #c8addd 72%,
      #b8c5e0 85%,
      #a8d8e8 100%);
    background-attachment: fixed;
}
.hero-box::before, .hero-box::after {
  content: '';
  position: absolute;
  width: 10px; height: 10px;
}
.hero-box::before {
  top: -1px; left: -1px;
  border-top: 2px solid rgba(0,0,0,0.2);
  border-left: 2px solid rgba(0,0,0,0.2);
}
.hero-box::after {
  bottom: -1px; right: -1px;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  border-right: 2px solid rgba(0,0,0,0.2);
}
.hero-box-tr {
  position: absolute;
  top: -1px; right: -1px;
  width: 10px; height: 10px;
  border-top: 2px solid rgba(0,0,0,0.2);
  border-right: 2px solid rgba(0,0,0,0.2);
}
.hero-box-bl {
  position: absolute;
  bottom: -1px; left: -1px;
  width: 10px; height: 10px;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  border-left: 2px solid rgba(0,0,0,0.2);
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.65);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 100px; padding: 5px 14px 5px 10px;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink3);
  margin-bottom: 36px;
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.hero-badge-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--green);
  box-shadow: 0 0 0 3px rgba(26,122,74,0.2);
  animation: pulse-dot 2.4s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,100% { box-shadow: 0 0 0 3px rgba(26,122,74,0.2); }
  50% { box-shadow: 0 0 0 6px rgba(26,122,74,0.08); }
}

.hero-h1 {
  font-family: var(--display);
  font-size: clamp(42px,6.5vw,84px);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.02em;
  color: var(--ink); margin: 0 auto 22px; max-width: 860px;
}
.hero-h1 em { font-style: italic; color: var(--accent); }

.hero-sub {
  font-family: var(--sans); font-size: clamp(14px,1.6vw,17px);
  color: var(--ink3); line-height: 1.7;
  margin: 0 auto 40px; max-width: 520px;
  font-weight: 400;
}

.hero-actions {
  display: flex; align-items: center; justify-content: center;
  gap: 10px; flex-wrap: wrap; margin-bottom: 44px;
}

.btn-primary {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: #fff; background: var(--ink);
  border: none; padding: 13px 28px; border-radius: 6px;
  cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, background .2s;
  box-shadow: 0 4px 14px rgba(26,25,22,0.18), 0 1px 3px rgba(26,25,22,0.1);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26,25,22,0.24);
  background: #2e2c28;
}

.btn-secondary {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink); background: rgba(255,255,255,0.7);
  border: 1px solid var(--border); padding: 12px 24px; border-radius: 6px;
  cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  backdrop-filter: blur(6px);
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), border-color .2s, box-shadow .25s;
  box-shadow: 0 1px 4px rgba(26,25,22,0.05);
}
.btn-secondary:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 6px 18px rgba(59,110,245,0.1);
}

/* Install strip */
.install-strip {
  display: inline-flex; align-items: center;
  background: var(--ink); border-radius: 10px; overflow: hidden;
  box-shadow: 0 12px 40px rgba(26,25,22,0.22), 0 2px 6px rgba(26,25,22,0.12);
  max-width: 580px; width: min(100%, 580px);
  border: 1px solid rgba(255,255,255,0.06);
}
.install-prefix {
  padding: 15px 18px;
  font-family: var(--mono); font-size: 13px; font-weight: 500;
  color: rgba(90,133,255,0.9); border-right: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.install-cmd {
  flex: 1; min-width: 0; padding: 15px 16px;
  font-family: var(--mono); font-size: 12.5px; font-weight: 400;
  color: rgba(240,238,232,0.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  background: transparent; border: none; outline: none;
  cursor: text; letter-spacing: 0.01em;
}
.install-copy {
  padding: 15px 16px; background: rgba(255,255,255,0.04);
  border: none; border-left: 1px solid rgba(255,255,255,0.07);
  cursor: pointer; color: rgba(255,255,255,0.35);
  display: flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.07em; text-transform: uppercase;
  transition: color .2s, background .2s;
  flex-shrink: 0;
}
.install-copy:hover { color: rgba(90,133,255,0.9); background: rgba(255,255,255,0.07); }
.install-copy.copied { color: #4ec98a; }

.hero-hint {
  margin-top: 44px;
  font-family: var(--mono); font-size: 9px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink4);
  display: flex; align-items: center; gap: 12px;
}
.hero-hint::before, .hero-hint::after {
  content: ''; flex: 1; max-width: 48px; height: 1px; background: var(--border);
}

/* ═══════════════════════════ SECTION COMMONS ═══════════════════════════ */
.section-label {
  font-family: var(--mono); font-size: 9px; font-weight: 500;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink4);
  display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
}
.section-label-dot {
  width: 4px; height: 4px; border-radius: 50%; background: var(--accent); flex-shrink: 0;
}

.section-h2 {
  font-family: var(--display);
  font-size: clamp(26px,3.8vw,44px);
  font-weight: 400; line-height: 1.12; color: var(--ink);
}
.section-h2 em { font-style: italic; }

.section-desc {
  font-size: 14.5px; color: var(--ink3); line-height: 1.7;
  max-width: 540px; margin-top: 12px;
}

/* ═══════════════════════════ FEATURES ═══════════════════════════ */
.features-section {
  padding: clamp(72px,8vw,108px) clamp(24px,5vw,80px);
  background: var(--surface);
  border-top: 1px solid var(--border);
  position: relative;
}
.features-section::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 40px,
    rgba(0,0,0,0.012) 40px,
    rgba(0,0,0,0.012) 41px
  );
}
.features-inner { max-width: 1360px; margin: 0 auto; position: relative; }

.features-header {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 40px; align-items: end; margin-bottom: 56px;
}
@media(max-width:700px) { .features-header { grid-template-columns: 1fr; } }

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: var(--border);
  border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
}
@media(max-width:900px) { .features-grid { grid-template-columns: repeat(2,1fr); } }
@media(max-width:560px) { .features-grid { grid-template-columns: 1fr; } }

.feature-card {
  background: var(--surface); padding: 32px 28px;
  transition: background .2s ease;
  position: relative;
}
.feature-card:hover { background: #fefcf9; }

.feature-icon-wrap {
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg2); border-radius: 8px;
  color: var(--accent); margin-bottom: 16px;
  border: 1px solid var(--border);
  transition: background .2s, transform .3s cubic-bezier(.34,1.56,.64,1), border-color .2s;
}
.feature-card:hover .feature-icon-wrap {
  background: rgba(59,110,245,0.08);
  border-color: rgba(59,110,245,0.2);
  transform: scale(1.06);
}

.feature-title {
  font-family: var(--sans); font-size: 14px; font-weight: 600;
  color: var(--ink); margin-bottom: 8px; letter-spacing: -0.01em;
}
.feature-desc { font-size: 13px; color: var(--ink3); line-height: 1.65; }

/* ═══════════════════════════ TERMINAL SECTION ═══════════════════════════ */
.terminal-section {
  padding: clamp(72px,8vw,10px) clamp(24px,5vw,80px);
  background: var(--bg);
  border-top: 1px solid var(--border);
}
.terminal-inner { max-width: 1360px; margin: 0 auto; }

.terminal-grid {
  display: grid; grid-template-columns: 5fr 6fr;
  gap: 64px; align-items: center; margin-top: 52px;
}
@media(max-width:1000px) { .terminal-grid { grid-template-columns: 1fr; gap: 40px; } }

.term-window {
  background: #111110;
  border-radius: 12px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.15),
    0 20px 56px rgba(0,0,0,0.22),
    0 4px 12px rgba(0,0,0,0.14);
  font-family: var(--mono);
}

.term-titlebar {
  background: #1c1b19;
  padding: 12px 16px;
  display: flex; align-items: center; gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.term-dots { display: flex; gap: 6px; }
.term-dot { width: 10px; height: 10px; border-radius: 50%; }
.td-r { background: #ff5f57; }
.td-y { background: #febc2e; }
.td-g { background: #28c940; }
.term-title-text {
  font-size: 11px; color: rgba(255,255,255,0.28);
  letter-spacing: 0.04em; margin-left: 4px;
}
.term-status {
  margin-left: auto; display: flex; align-items: center; gap: 5px;
  font-size: 9px; color: rgba(78,201,138,0.7); letter-spacing: 0.07em;
}
.term-status-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #28c940;
  animation: blink-slow 3s ease-in-out infinite;
}
@keyframes blink-slow { 0%,70%{opacity:1} 80%,90%{opacity:0.3} 100%{opacity:1} }

.term-body {
  padding: 0;
  font-size: 12.5px; line-height: 1.9; color: #9a9490;
}
.tc   { color: rgba(255,255,255,0.2); }
.tp   { color: rgba(90,133,255,0.8); font-weight: 500; }
.tcmd { color: #e8e4de; }
.tkw  { color: #6dbfe5; }
.tnum { color: #e5c46d; }
.tok  { color: #4ec98a; }
.turl { color: #a8c8f8; }
.tdim { color: rgba(255,255,255,0.2); }
.tart { color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1.4; }
.tline { display: block; }
.tindent { padding-left: 18px; }
.term-sep { height: 1px; background: rgba(255,255,255,0.05); margin: 10px 0; }

.check-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
.check-list li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13.5px; color: var(--ink2); line-height: 1.5;
}
.check-icon {
  width: 18px; height: 18px; border-radius: 50%;
  background: rgba(26,122,74,0.1); color: var(--green);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 2px;
}

/* ═══════════════════════════ DASHBOARD SECTION ═══════════════════════════ */
.dashboard-section {
  padding: clamp(72px,8vw,108px) clamp(24px,5vw,80px);
  background: var(--surface);
  border-top: 1px solid var(--border);
  position: relative; overflow: hidden;
}
.dashboard-section::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 36px,
    rgba(0,0,0,0.01) 36px,
    rgba(0,0,0,0.01) 37px
  );
}
.dashboard-inner { max-width: 1360px; margin: 0 auto; position: relative; }

.dashboard-grid {
  display: grid; grid-template-columns: 5fr 6fr;
  gap: 64px; align-items: center; margin-top: 52px;
}
@media(max-width:1000px) { .dashboard-grid { grid-template-columns: 1fr; gap: 40px; } }

.dash-mock {
  background: #111110; border-radius: 12px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.12), 0 20px 52px rgba(0,0,0,0.2);
  font-family: var(--mono);
}
.dash-bar {
  background: #1c1b19; padding: 11px 16px;
  display: flex; align-items: center; gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.dash-dots { display: flex; gap: 6px; }
.dash-dot { width: 10px; height: 10px; border-radius: 50%; }
.dd-r { background: #ff5f57; } .dd-y { background: #febc2e; } .dd-g { background: #28c940; }
.dash-tab {
  font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.28);
  letter-spacing: 0.05em; cursor: pointer;
}
.dash-tab-active { color: rgba(255,255,255,0.7); }
.dash-connected {
  margin-left: auto; display: flex; align-items: center; gap: 5px;
  font-size: 9px; color: rgba(78,201,138,0.7); letter-spacing: 0.07em;
}
.dash-cdot { width: 5px; height: 5px; border-radius: 50%; background: #28c940; }
.dash-body { padding: 16px 18px; }
.dash-row {
  display: flex; align-items: center; gap: 8px; padding: 9px 10px;
  border-radius: 6px; margin-bottom: 4px;
  transition: background .15s; cursor: default;
}
.dash-row:hover { background: rgba(255,255,255,0.04); }
.dash-method {
  font-size: 9.5px; font-weight: 600; letter-spacing: 0.05em;
  width: 34px; text-align: center; padding: 2px 0; border-radius: 3px;
  background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.55);
  flex-shrink: 0;
}
.dash-path { font-size: 11.5px; color: #b8b0a8; flex: 1; }
.dash-status {
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em;
  padding: 2px 7px; border-radius: 3px; flex-shrink: 0;
}
.s200 { background: rgba(78,201,138,0.1); color: #4ec98a; }
.s500 { background: rgba(232,80,80,0.1); color: #e85050; }
.s202 { background: rgba(100,160,230,0.1); color: #64a0e6; }
.dash-ms { font-size: 9.5px; color: rgba(255,255,255,0.2); width: 38px; text-align: right; }
.dash-stat-row {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: rgba(255,255,255,0.05);
  border-top: 1px solid rgba(255,255,255,0.05);
  margin: 4px -18px -16px;
}
.dash-stat { padding: 12px 14px; background: #111110; text-align: center; }
.dash-stat-val {
  font-size: 17px; font-weight: 400; color: #e8e4de;
  font-family: var(--display); font-style: italic; display: block;
}
.dash-stat-key {
  font-size: 8.5px; color: rgba(255,255,255,0.25); letter-spacing: 0.1em;
  text-transform: uppercase; margin-top: 2px;
}

/* ═══════════════════════════ CLI FLAGS TABLE ═══════════════════════════ */
.flags-section {
  padding: clamp(72px,8vw,108px) clamp(24px,5vw,80px);
  background: var(--bg);
  border-top: 1px solid var(--border);
}
.flags-inner { max-width: 1360px; margin: 0 auto; }
.flags-table-wrap {
  width: 100%;
  margin-top: 44px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.flags-table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  border: none;
  background: var(--surface);
}
.flags-table th {
  background: var(--bg2); font-family: var(--mono); font-size: 9px;
  font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink3); padding: 12px 18px; text-align: left;
  border-bottom: 1px solid var(--border);
}
.flags-table td {
  padding: 14px 18px; border-bottom: 1px solid var(--border);
  font-size: 13px; vertical-align: top;
}
.flags-table tr:last-child td { border-bottom: none; }
.flags-table tr:hover td { background: #fefcf9; }
.flag-name { font-family: var(--mono); font-size: 12px; font-weight: 500; color: var(--accent); }
.flag-type { font-family: var(--mono); font-size: 11px; color: var(--teal); }
.flag-default { font-family: var(--mono); font-size: 11px; color: var(--ink4); }
.flag-desc { color: var(--ink2); font-size: 13px; line-height: 1.55; }
@media(max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 116px 12px 56px;
  }
  .hero-box {
    inset: 5px;
    background-attachment: scroll;
  }
  .hero-sub {
    margin-bottom: 28px;
  }
  .hero-actions {
    width: auto;
    margin-bottom: 28px;
    gap: 8px;
  }
  .btn-primary,
  .btn-secondary {
    width: auto;
    min-width: 172px;
    justify-content: center;
    font-size: 10px;
    padding: 10px 16px;
  }
  .install-strip {
    display: grid;
    grid-template-columns: auto 1fr auto;
  }
  .install-prefix,
  .install-cmd,
  .install-copy {
    padding: 12px;
  }
}

/* ═══════════════════════════ CONFIG SECTION ═══════════════════════════ */
.config-section {
  padding: clamp(72px,8vw,108px) clamp(24px,5vw,80px);
  background: var(--surface);
  border-top: 1px solid var(--border);
}
.config-inner { max-width: 1360px; margin: 0 auto; }

.config-grid {
  display: grid; grid-template-columns: 5fr 7fr;
  gap: 64px; align-items: start; margin-top: 52px;
}
@media(max-width:1000px) { .config-grid { grid-template-columns: 1fr; } }

.json-block {
  background: #111110;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 20px 52px rgba(0,0,0,0.18);
  font-family: var(--mono); font-size: 12px;
}
.json-bar {
  background: #1c1b19; padding: 12px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; gap: 12px;
}
.json-dots { display: flex; gap: 6px; }
.json-dot { width: 10px; height: 10px; border-radius: 50%; }
.jd1 { background: #ff5f57; } .jd2 { background: #febc2e; } .jd3 { background: #28c940; }
.json-filename { font-family: var(--mono); font-size: 10.5px; color: rgba(255,255,255,0.3); }
.json-lang-badge {
  margin-left: auto; font-size: 8.5px; font-weight: 500; letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.05); padding: 2px 7px; border-radius: 3px;
}
.json-body { padding: 22px 26px; line-height: 2.1; overflow-x: auto; color: #9a9490; }
.jb   { color: rgba(255,255,255,0.3); }
.jk   { color: #6dbfe5; }
.jc   { color: rgba(255,255,255,0.2); }
.js   { color: #a6d155; }
.jn   { color: #e5c46d; }
.jb2  { color: #c8a8f0; }
.jcmt { color: rgba(255,255,255,0.18); font-style: italic; }
.jindent  { padding-left: 18px; display: block; }
.jindent2 { padding-left: 36px; display: block; }

/* ═══════════════════════════ PRIVACY STRIP ═══════════════════════════ */
.privacy-section {
  padding: clamp(60px,7vw,92px) clamp(24px,5vw,80px);
  background: var(--bg);
  border-top: 1px solid var(--border);
}
.privacy-inner { max-width: 1360px; margin: 0 auto; }
.privacy-grid {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 52px;
}
@media(max-width:700px) { .privacy-grid { grid-template-columns: 1fr; } }

.privacy-card {
  background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  padding: 28px 24px;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
  position: relative; overflow: hidden;
}
.privacy-card::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image: repeating-linear-gradient(
    -55deg, transparent, transparent 22px,
    rgba(0,0,0,0.015) 22px, rgba(0,0,0,0.015) 23px
  );
}
.privacy-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(26,25,22,0.08);
}
.privacy-icon {
  width: 36px; height: 36px; border-radius: 8px;
  background: rgba(59,110,245,0.08); color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; border: 1px solid rgba(59,110,245,0.15);
  position: relative; z-index: 1;
}
.privacy-title { font-family: var(--sans); font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 6px; position: relative; z-index: 1; }
.privacy-desc { font-size: 13px; color: var(--ink3); line-height: 1.6; position: relative; z-index: 1; }

/* ═══════════════════════════ CTA / FOOTER ═══════════════════════════ */
.cta-section {
  padding: clamp(72px,8vw,108px) clamp(24px,5vw,80px);
  background: var(--ink); position: relative; overflow: hidden;
}
.cta-noise {
  position: absolute; inset: 0; pointer-events: none;
  width: 100%; height: 100%; opacity: 0.045; mix-blend-mode: screen;
}
.cta-glow {
  position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
  width: 700px; height: 350px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(59,110,245,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.cta-inner {
  max-width: 680px; margin: 0 auto; text-align: center; position: relative; z-index: 1;
}
.cta-h {
  font-family: var(--display);
  font-size: clamp(30px,4.5vw,50px);
  font-weight: 400; line-height: 1.1; color: #f4f2ed; margin-bottom: 18px;
}
.cta-h em { font-style: italic; color: rgba(90,133,255,0.9); }
.cta-desc { font-size: 14.5px; color: rgba(244,242,237,0.45); line-height: 1.7; margin-bottom: 36px; }
.cta-install {
  display: inline-flex; align-items: center;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 8px; overflow: hidden; margin-bottom: 36px; max-width: 500px; width: 100%;
}
.cta-pre { padding: 13px 16px; font-family: var(--mono); font-size: 12px; color: rgba(90,133,255,0.8); font-weight: 500; border-right: 1px solid rgba(255,255,255,0.06); }
.cta-cmd { flex: 1; padding: 13px 14px; font-family: var(--mono); font-size: 12px; color: rgba(255,255,255,0.6); }
.cta-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.cta-btn-primary {
  font-family: var(--mono); font-size: 11px; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase;
  color: var(--ink); background: #f4f2ed;
  border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 7px;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
}
.cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,0.2); }
.cta-btn-outline {
  font-family: var(--mono); font-size: 11px; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase;
  color: rgba(244,242,237,0.55); background: transparent;
  border: 1px solid rgba(255,255,255,0.13); padding: 11px 24px; border-radius: 6px; cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 7px;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), border-color .2s, color .2s;
}
.cta-btn-outline:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.3); color: #f4f2ed; }

/* ─── ANIMATIONS ─── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.au  { animation: fadeUp .5s ease both; }
.au1 { animation-delay: .04s; }
.au2 { animation-delay: .1s; }
.au3 { animation-delay: .18s; }
.au4 { animation-delay: .26s; }
.au5 { animation-delay: .34s; }

@keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
.cursor { display: inline-block; width: 2px; height: 0.85em; background: rgba(90,133,255,0.8); animation: blink 1.1s infinite; vertical-align: baseline; margin-left: 2px; }
`;

/* ────────────────────────────── COMPONENT ──────────────────────────────── */
export default function CLIPage() {
  const [copied, setCopied] = useState(false);
  const CMD = "npx @hookflo/tern-dev --port 3000";

  const handleCopy = () => {
    navigator.clipboard.writeText(CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const features = [
    {
      icon: <Zap size={17} />,
      title: "Instant Public Tunnel",
      desc: "One command gives you a public HTTPS relay URL — no account, no signup, no friction. Your webhooks arrive in milliseconds.",
    },
    {
      icon: <Eye size={17} />,
      title: "Live Event Dashboard",
      desc: "Real-time log at localhost:2019 with full payload inspection, headers, response codes, and latency metrics.",
    },
    {
      icon: <Lock size={17} />,
      title: "Zero Persistence",
      desc: "Everything lives in RAM. Nothing touches disk. Nothing reaches the cloud. Ctrl+C and it's completely gone.",
    },
    {
      icon: <Shield size={17} />,
      title: "Signature Verification",
      desc: "Built-in guidance for Stripe, GitHub, Clerk, and custom HMAC webhooks. Verify integrity without extra libraries.",
    },
    {
      icon: <RefreshCw size={17} />,
      title: "One-Click Replay",
      desc: "Resend any captured webhook to your local server instantly. Test edge cases and error handling without re-triggering the provider.",
    },
    {
      icon: <Filter size={17} />,
      title: "Dead Letter Queue",
      desc: "Failed events are isolated in a DLQ-style view. Inspect, debug, and replay failures without sifting through all traffic.",
    },
    {
      icon: <Code2 size={17} />,
      title: "Export as cURL / fetch",
      desc: "Copy any event as a ready-to-run curl command or fetch snippet. Share exact requests with teammates in one click.",
    },
    {
      icon: <Settings2 size={17} />,
      title: "Config File Support",
      desc: "Persist settings with tern.config.json. Rate limiting, IP allowlisting, path blocking, session TTL, and audit logs.",
    },
    {
      icon: <Server size={17} />,
      title: "Self-Hostable Relay",
      desc: "Run your own relay via hookflo/tern-relay. Point the CLI with --relay to keep everything inside your own infrastructure.",
    },
  ];

  const flags = [
    {
      name: "--port",
      type: "number",
      def: "required",
      desc: "Local app port to forward requests to",
    },
    {
      name: "--path",
      type: "string",
      def: '"/\"',
      desc: "Path prefix for forwarded requests",
    },
    {
      name: "--ui-port",
      type: "number",
      def: "2019",
      desc: "Dashboard HTTP port",
    },
    {
      name: "--no-ui",
      type: "boolean",
      def: "false",
      desc: "Disable dashboard and browser WebSocket server",
    },
    {
      name: "--relay",
      type: "string",
      def: "wss://relay.tern.hookflo.com",
      desc: "Override relay WebSocket URL for self-hosting",
    },
    {
      name: "--max-events",
      type: "number",
      def: "500",
      desc: "Maximum events buffered in session memory",
    },
  ];

  return (
    <div className="tr">
      <style>{CSS}</style>

      <SiteNav />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-diagonal" />

        {/* Boxed border */}
        <div className="hero-box">
                   <svg id="noice" className=" inset-0 w-full h-full">
            <filter id="noise-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.26"
                numOctaves="1"
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
          <span className="hero-box-tr" />
          <span className="hero-box-bl" />
        </div>

        <div className="hero-badge au">
          <span className="hero-badge-dot" />
          Open Source · MIT · NPM
        </div>

        <h1 className="hero-h1 au au1">
          Webhook testing,
          <br />
          <em>zero infrastructure</em>
        </h1>

        <p className="hero-sub au au2">
          Instant local tunnel for webhooks. No ngrok. No account. No data
          leaves your machine. One command and you&apos;re live.
        </p>

        <div className="hero-actions au au3">
          <a
            href="https://github.com/Hookflo/tern-dev"
            className="btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            <Terminal size={14} />
            GitHub Repository
          </a>
          <a
            href="https://www.npmjs.com/package/@hookflo/tern-dev"
            className="btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={14} />
            View on NPM
          </a>
        </div>

        <div className="install-strip au au4">
          <span className="install-prefix">$</span>
          <span className="install-cmd">{CMD}</span>
          <button
            className={`install-copy${copied ? " copied" : ""}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check size={12} /> Copied
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </button>
        </div>

        <div className="hero-hint text-black">
          three steps to live webhook debugging
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="features-inner">
          <div className="features-header">
            <div>
              <div className="section-label">
                <span className="section-label-dot" />
                Core Capabilities
              </div>
              <h2 className="section-h2">
                Everything for <em>local webhook dev</em>
              </h2>
            </div>
            <p className="section-desc" style={{ marginTop: 0 }}>
              A complete toolkit covering tunneling, inspection, replay,
              verification, and configuration — without third-party accounts or
              cloud storage.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMINAL / QUICKSTART ── */}
      <section className="terminal-section">
        <div className="terminal-inner">
       

          <div className="terminal-grid">
            <div>
                 <div className="section-label">
            <span className="section-label-dot" />
            Getting Started
          </div>
          <h2 className="section-h2 ">
            Three steps to <em>live</em>
          </h2>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--ink3)",
                  lineHeight: 1.7,
                  marginBottom: 8,
                  marginTop:30
                }}
              >
                No installs, no configuration, no account. Run{" "}
                <code
                  style={{
                    fontFamily: "var(--mono)",
                    color: "var(--accent)",
                    fontSize: 12.5,
                  }}
                >
                  npx
                </code>{" "}
                and you&apos;re tunneling in seconds.
              </p>
              <ul className="check-list">
                {[
                  "Start tunnel on any local port with a single command",
                  "Get a public HTTPS URL instantly — paste into any webhook provider",
                  "Watch events arrive in real time at localhost:2019",
                  "Inspect full payloads, headers, status codes, and latency",
                  "Replay any event with one click",
                  "Ctrl+C erases all data — zero traces left behind",
                ].map((item, i) => (
                  <li key={i}>
                    <span className="check-icon">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Clean terminal */}
            <div className="term-window">
              <div className="term-titlebar">
                <div className="term-dots">
                  <div className="term-dot td-r" />
                  <div className="term-dot td-y" />
                  <div className="term-dot td-g" />
                </div>
                <span className="term-title-text">$ terminal</span>
                <span className="term-status">
                  <span className="term-status-dot" />
                  LIVE
                </span>
              </div>
              <div className="term-body">
                
                <div className="cli-code-body">{`# 1. Start the tunnel
$ npx @hookflo/tern-dev --port 3000

  ████████╗███████╗██████╗ ███╗  ██╗
     ██║   ██╔════╝██╔══██╗████╗ ██║
     ██║   █████╗  ██████╔╝██╔██╗██║
     ██║   ██╔══╝  ██╔══██╗██║╚████║
     ██║   ███████╗██║  ██║██║ ╚███║
     ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚══╝

  tunnel    →  https://abc123.relay.tern.hookflo.com
  dashboard →  http://localhost:2019
  forwarding →  localhost:3000

# 2. Copy tunnel URL to your webhook provider
# 3. Open dashboard and watch events flow in real-time

✓ Tunnel live · Ctrl+C to end & erase all data`}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD ── */}
      <section className="dashboard-section">
        <div className="dashboard-inner">
          <div className="section-label">
            <span className="section-label-dot" />
            Live Dashboard
          </div>
          <h2 className="section-h2">
            Inspect <em>every byte</em> in real time
          </h2>
          <div className="dashboard-grid">
            <div>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--ink3)",
                  lineHeight: 1.7,
                }}
              >
                The local dashboard at{" "}
                <code
                  style={{
                    fontFamily: "var(--mono)",
                    color: "var(--accent)",
                    fontSize: 12.5,
                  }}
                >
                  localhost:2019
                </code>{" "}
                gives you complete visibility into every webhook — payloads,
                headers, signatures, latency, and more.
              </p>
              <ul className="check-list">
                {[
                  "Payload inspection with JSON formatting and syntax highlighting",
                  "Full HTTP headers with signature validation status",
                  "Response code, body, and latency for every event",
                  "Side-by-side event comparison and diffs",
                  "Dead Letter Queue — isolated view of failed events",
                  "One-click replay to refire any event",
                  "Export any event as curl or fetch snippet",
                  "Real-time WebSocket updates — no polling",
                ].map((item, i) => (
                  <li key={i}>
                    <span className="check-icon">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="dash-mock">
              <div className="dash-bar">
                <div className="dash-dots">
                  <div className="dash-dot dd-r" />
                  <div className="dash-dot dd-y" />
                  <div className="dash-dot dd-g" />
                </div>
                <span className="dash-tab" style={{ marginLeft: 6 }}>
                  Events
                </span>
                <span
                  className="dash-tab dash-tab-active"
                  style={{ marginLeft: 14 }}
                >
                  Live Log
                </span>
                <span className="dash-tab" style={{ marginLeft: 14 }}>
                  DLQ (1)
                </span>
                <span className="dash-connected">
                  <span className="dash-cdot" />
                  Connected
                </span>
              </div>
              <div className="dash-body">
                {[
                  {
                    method: "POST",
                    path: "/stripe/webhook",
                    status: "200",
                    sClass: "s200",
                    ms: "2.4ms",
                  },
                  {
                    method: "POST",
                    path: "/github/events",
                    status: "500",
                    sClass: "s500",
                    ms: "45ms",
                  },
                  {
                    method: "POST",
                    path: "/clerk/hooks",
                    status: "200",
                    sClass: "s200",
                    ms: "1.1ms",
                  },
                  {
                    method: "POST",
                    path: "/custom/handler",
                    status: "202",
                    sClass: "s202",
                    ms: "1.8ms",
                  },
                ].map((r, i) => (
                  <div className="dash-row" key={i}>
                    <span className="dash-method">{r.method}</span>
                    <span className="dash-path">{r.path}</span>
                    <span className={`dash-status ${r.sClass}`}>
                      {r.status}
                    </span>
                    <span className="dash-ms">{r.ms}</span>
                  </div>
                ))}
                <div className="dash-stat-row">
                  <div className="dash-stat">
                    <span className="dash-stat-val">4</span>
                    <div className="dash-stat-key">Events</div>
                  </div>
                  <div className="dash-stat">
                    <span className="dash-stat-val">1</span>
                    <div className="dash-stat-key">Failures</div>
                  </div>
                  <div className="dash-stat">
                    <span className="dash-stat-val">0B</span>
                    <div className="dash-stat-key">Persisted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLI FLAGS TABLE ── */}
      <section className="flags-section">
        <div className="flags-inner">
          <div className="section-label">
            <span className="section-label-dot" />
            CLI Reference
          </div>
          <h2 className="section-h2">
            All flags, <em>at a glance</em>
          </h2>
          <p className="section-desc">
            Every option the CLI accepts — combinable with tern.config.json for
            persistent configuration.
          </p>

          <div className="flags-table-wrap">
            <table className="flags-table">
              <thead>
                <tr>
                  <th>Flag</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {flags.map((f, i) => (
                  <tr key={i}>
                    <td>
                      <span className="flag-name">{f.name}</span>
                    </td>
                    <td>
                      <span className="flag-type">{f.type}</span>
                    </td>
                    <td>
                      <span className="flag-default">{f.def}</span>
                    </td>
                    <td>
                      <span className="flag-desc">{f.desc}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CONFIG ── */}
      <section className="config-section">
        <div className="config-inner">
          <div className="section-label">
            <span className="section-label-dot" />
            Configuration
          </div>
          <h2 className="section-h2">
            Persistent setup with <em>tern.config.json</em>
          </h2>

          <div className="config-grid">
            <div>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--ink3)",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                Drop a{" "}
                <code
                  style={{
                    fontFamily: "var(--mono)",
                    color: "var(--accent)",
                    fontSize: 12.5,
                  }}
                >
                  tern.config.json
                </code>{" "}
                file in your project root. CLI flags are merged and auto-loaded
                — no need to retype them every session.
              </p>
              <ul className="check-list">
                {[
                  "Port, path prefix, and UI port",
                  "Rate limiting — requests per minute per IP",
                  "IP allowlisting and blocklisting",
                  "Block specific paths and HTTP methods",
                  "Custom relay server URL for self-hosting",
                  "Session TTL and auto-kill timers",
                  "Audit logging to file",
                  "JSON Schema with full IDE autocomplete",
                ].map((item, i) => (
                  <li key={i}>
                    <span className="check-icon">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="json-block">
              <div className="json-bar">
                <div className="json-dots">
                  <div className="json-dot jd1" />
                  <div className="json-dot jd2" />
                  <div className="json-dot jd3" />
                </div>
                <span className="json-filename">tern.config.json</span>
                <span className="json-lang-badge">JSON</span>
              </div>
              <div className="json-body">
                <span className="jb">{"{"}</span>
                <span className="jindent">
                  <span className="jcmt">
                    {'// $schema: "schemastore.org/tern-dev"'}
                  </span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;port&quot;</span>
                  <span className="jc">:</span> <span className="jn">3000</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;path&quot;</span>
                  <span className="jc">:</span>{" "}
                  <span className="js">&quot;/webhooks&quot;</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;uiPort&quot;</span>
                  <span className="jc">:</span> <span className="jn">2019</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;rateLimit&quot;</span>
                  <span className="jc">:</span> <span className="jn">100</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;maxEvents&quot;</span>
                  <span className="jc">:</span> <span className="jn">500</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;allowIp&quot;</span>
                  <span className="jc">:</span> <span className="jb">[</span>
                </span>
                <span className="jindent2">
                  <span className="js">&quot;54.187.174.169&quot;</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent2">
                  <span className="js">&quot;52.86.47.0/24&quot;</span>
                </span>
                <span className="jindent">
                  <span className="jb">]</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;blockPaths&quot;</span>
                  <span className="jc">:</span> <span className="jb">[</span>
                  <span className="js">&quot;/health&quot;</span>
                  <span className="jb">]</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;blockMethods&quot;</span>
                  <span className="jc">:</span> <span className="jb">[</span>
                  <span className="js">&quot;GET&quot;</span>
                  <span className="jc">,</span>{" "}
                  <span className="js">&quot;HEAD&quot;</span>
                  <span className="jb">]</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;sessionTtl&quot;</span>
                  <span className="jc">:</span> <span className="jn">3600</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;auditLog&quot;</span>
                  <span className="jc">:</span>{" "}
                  <span className="js">&quot;./tern-audit.log&quot;</span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;relay&quot;</span>
                  <span className="jc">:</span>{" "}
                  <span className="js">
                    &quot;wss://relay.yourinfra.com&quot;
                  </span>
                  <span className="jc">,</span>
                </span>
                <span className="jindent">
                  <span className="jk">&quot;noUi&quot;</span>
                  <span className="jc">:</span>{" "}
                  <span className="jb2">false</span>
                </span>
                <span className="jb">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRIVACY STRIP ── */}
      <section className="privacy-section">
        <div className="privacy-inner">
          <div className="section-label">
            <span className="section-label-dot" />
            Privacy by Design
          </div>
          <h2 className="section-h2">
            Your data never <em>leaves your machine</em>
          </h2>
          <div className="privacy-grid">
            {[
              {
                icon: <Lock size={16} />,
                title: "RAM-only Storage",
                desc: "All captured events live exclusively in process memory. Nothing is written to disk at any point during a session.",
              },
              {
                icon: <Globe size={16} />,
                title: "No Cloud Persistence",
                desc: "The relay infrastructure forwards payloads in real time — it never stores, logs, or indexes your webhook data.",
              },
              {
                icon: <Shield size={16} />,
                title: "Instant Erasure",
                desc: "Press Ctrl+C and the entire session — events, payloads, headers — is gone. No traces, no temp files.",
              },
            ].map((c, i) => (
              <div className="privacy-card" key={i}>
                <div className="privacy-icon">{c.icon}</div>
                <div className="privacy-title">{c.title}</div>
                <p className="privacy-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <svg className="cta-noise" aria-hidden="true">
          <filter id="cta-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.26"
              numOctaves="5"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.51" />
              <feFuncG type="linear" slope="1.51" />
              <feFuncB type="linear" slope="1.51" />
              <feFuncA type="linear" slope="0.61" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#cta-noise)" />
        </svg>
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2 className="cta-h">
            Ready to test webhooks <em>locally?</em>
          </h2>
          <p className="cta-desc">
            No account. No ngrok. No storage. One command and you&apos;re live.
          </p>
          <div className="cta-install">
            <span className="cta-pre">$</span>
            <span className="cta-cmd">npx @hookflo/tern-dev --port 3000</span>
          </div>
          <div className="cta-btns">
            <a
              href="https://github.com/Hookflo/tern-dev"
              className="cta-btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <Terminal size={13} />
              View on GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@hookflo/tern-dev"
              className="cta-btn-outline"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={13} />
              View on NPM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
