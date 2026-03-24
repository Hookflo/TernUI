"use client";

import SiteNav from "@/components/site-nav";
import { ArrowRight, Terminal, Zap, Lock, BarChart3, Code2, Download, Copy, Check } from "lucide-react";
import { useState } from "react";

const CSS = `
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
    --accent:  #2c5f8a;
    --mono: 'JetBrains Mono', monospace;
    --serif: 'Lora', Georgia, serif;
    --display: 'Instrument Serif', Georgia, serif;
  }

  .tern-root { font-family: var(--serif); background: var(--paper); color: var(--ink); }
  .tern-root * { box-sizing: border-box; }

  /* HERO */
  .cli-hero {
    padding: 60px clamp(20px,5vw,80px) 80px;
    max-width: 1200px; margin: 0 auto;
    text-align: center;
    position: relative;
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
    overflow: hidden;
    min-height: auto;
  }
  
  .cli-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    opacity: 0.35;
    pointer-events: none;
    mix-blend-mode: overlay;
  }
  
  .cli-hero::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(0,0,0,0.04) 0%, transparent 40%),
      radial-gradient(circle at 90% 30%, rgba(0,0,0,0.05) 0%, transparent 35%),
      radial-gradient(circle at 15% 85%, rgba(0,0,0,0.03) 0%, transparent 45%),
      radial-gradient(circle at 85% 80%, rgba(0,0,0,0.04) 0%, transparent 40%),
      radial-gradient(ellipse 1000px 300px at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 100%);
    pointer-events: none;
    mix-blend-mode: multiply;
  }
  
  .cli-hero-lines {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.08;
    pointer-events: none;
  }
  
  .cli-hero-lines svg {
    width: 100%; height: 100%;
  }
  
  .cli-hero > * {
    position: relative;
    z-index: 1;
  }
  .cli-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink3); margin-bottom: 32px;
  }
  .cli-eyebrow::before { content: ''; display: block; width: 24px; height: 1px; background: var(--ink3); }
  
  .cli-h1 {
    font-family: var(--display); font-size: clamp(36px,5.5vw,64px);
    font-weight: 400; line-height: 1.15; letter-spacing: -0.02em;
    color: var(--ink); margin: 0 auto 16px; max-width: 850px;
  }
  .cli-h1 em { font-style: italic; color: var(--accent); }
  
  .cli-subtitle {
    font-size: 16px; color: var(--ink2);
    margin: 0 auto 32px; max-width: 680px; line-height: 1.6;
  }

  .cli-actions {
    display: flex; align-items: center; justify-content: center;
    gap: 20px; flex-wrap: wrap; margin-bottom: 60px;
  }
  .cli-btn-primary {
    font-family: var(--mono); font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--paper); background: var(--ink); border: none;
    padding: 14px 36px; border-radius: 8px; cursor: pointer;
    text-decoration: none; transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: inline-flex; align-items: center; gap: 10px;
    box-shadow: 0 4px 12px rgba(26,23,20,.15);
  }
  .cli-btn-primary:hover { 
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(26,23,20,.25);
    background: #2a2520;
  }
  
  .cli-btn-secondary {
    font-family: var(--mono); font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ink); background: white; border: 1.5px solid var(--border);
    padding: 12px 36px; border-radius: 8px; cursor: pointer;
    text-decoration: none; transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: inline-flex; align-items: center; gap: 10px;
    box-shadow: 0 2px 8px rgba(26,23,20,.06);
  }
  .cli-btn-secondary:hover { 
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(44,95,138,.12);
  }

  .cli-install {
    background: linear-gradient(135deg, #0f0e0c 0%, #1a1714 100%);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 12px; padding: 18px 28px;
    font-family: var(--mono); font-size: 14px; font-weight: 500;
    color: #e8e8e0; display: inline-flex;
    align-items: center; gap: 16px; max-width: 580px;
    margin: 0 auto; 
    box-shadow: 0 12px 32px rgba(0,0,0,.25);
  }
  .cli-install span { 
    color: #6dbfe5;
    font-weight: 600;
  }
  .cli-copy-btn {
    background: rgba(44,95,138,0.2);
    border: 1px solid rgba(44,95,138,0.4);
    cursor: pointer;
    color: #6dbfe5; 
    padding: 8px 14px;
    border-radius: 6px;
    display: flex; 
    align-items: center;
    gap: 6px;
    transition: all .3s;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 600;
    margin-left: auto;
  }
  .cli-copy-btn:hover { 
    background: rgba(44,95,138,0.3);
    border-color: rgba(44,95,138,0.6);
    box-shadow: 0 0 12px rgba(109,191,229,.2);
  }

  /* FEATURE SECTION */
  .cli-features {
    padding: clamp(60px,8vw,100px) clamp(20px,5vw,80px);
    background: white; border-top: 1px solid var(--border);
  }
  .cli-features-inner { max-width: 1400px; margin: 0 auto; }
  
  .cli-section-label {
    font-family: var(--mono); font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink4);
    margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
  }
  .cli-section-label::after { 
    content: ''; flex: 1; height: 1px; background: var(--border);
    max-width: 60px;
  }
  
  .cli-h2 {
    font-family: var(--display); font-size: clamp(32px,5vw,48px);
    font-weight: 400; line-height: 1.15; color: var(--ink);
    margin-bottom: 20px;
  }
  .cli-h2 em { font-style: italic; }
  
  .cli-section-desc {
    font-size: 16px; color: var(--ink3); max-width: 600px;
    line-height: 1.65; margin-bottom: 56px;
  }

  .cli-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px; margin-bottom: 60px;
  }
  .cli-feature-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 16px; padding: 40px 32px;
    transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: visible;
  }
  
  .cli-feature-card::before {
    content: '';
    position: absolute;
    top: -12px; right: -12px;
    width: 80px; height: 80px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 15 Q35 5, 60 20' stroke='%232c5f8a' stroke-width='2' fill='none' opacity='0.15' stroke-linecap='round'/%3E%3Cpath d='M5 50 L65 40' stroke='%232c5f8a' stroke-width='1.5' fill='none' opacity='0.1' stroke-linecap='round'/%3E%3Cpath d='M20 70 Q40 65, 70 75' stroke='%23e89fd8' stroke-width='1.5' fill='none' opacity='0.12' stroke-linecap='round'/%3E%3C/svg%3E");
    background-size: 100%;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 0;
  }
  
  .cli-feature-card::after {
    content: '';
    position: absolute;
    bottom: -8px; left: -16px;
    width: 100px; height: 100px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q25 10, 50 25' stroke='%23d89fdb' stroke-width='1.5' fill='none' opacity='0.12' stroke-linecap='round'/%3E%3Cpath d='M70 0 L85 60' stroke='%232c5f8a' stroke-width='1' fill='none' opacity='0.08' stroke-linecap='round'/%3E%3C/svg%3E");
    background-size: 100%;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 0;
  }
  
  .cli-feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(26,23,20,.14), 0 2px 8px rgba(26,23,20,.06);
    border-color: var(--accent);
  }
  
  .cli-feature-icon {
    width: 56px; height: 56px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(44,95,138,0.1) 0%, rgba(44,95,138,0.05) 100%);
    border: 1.5px solid rgba(44,95,138,0.25);
    border-radius: 12px; margin-bottom: 24px;
    color: var(--accent);
    font-weight: 600;
    position: relative;
    z-index: 10;
    transition: all .3s ease;
  }
  
  .cli-feature-card:hover .cli-feature-icon {
    background: linear-gradient(135deg, rgba(44,95,138,0.15) 0%, rgba(44,95,138,0.08) 100%);
    border-color: var(--accent);
  }
  
  .cli-feature-title {
    font-family: var(--display); font-size: 20px; font-weight: 400;
    color: var(--ink); margin-bottom: 12px;
    position: relative;
    z-index: 10;
  }
  
  .cli-feature-desc {
    font-size: 15px; color: var(--ink3); line-height: 1.65;
    position: relative;
    z-index: 10;
  }

  /* DASHBOARD SECTION */
  .cli-dashboard-section {
    padding: clamp(60px,8vw,100px) clamp(20px,5vw,80px);
    background: var(--paper); border-top: 1px solid var(--border);
  }
  .cli-dashboard-inner { max-width: 1400px; margin: 0 auto; }
  
  .cli-dashboard-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center;
    margin-bottom: 40px;
  }
  @media(max-width:1000px) {
    .cli-dashboard-grid { grid-template-columns: 1fr; gap: 40px; }
  }

  .cli-dashboard-content h3 {
    font-family: var(--display); font-size: clamp(28px,4vw,40px);
    font-weight: 400; line-height: 1.2; color: var(--ink); margin-bottom: 20px;
  }
  .cli-dashboard-content p {
    font-size: 15px; color: var(--ink3); line-height: 1.7; margin-bottom: 24px;
  }
  .cli-dashboard-list {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 14px;
  }
  .cli-dashboard-list li {
    font-size: 14px; color: var(--ink2); display: flex; align-items: flex-start; gap: 12px;
  }
  .cli-dashboard-list li::before {
    content: '✓'; color: var(--accent); font-weight: bold;
    flex-shrink: 0; margin-top: 2px;
  }

  .cli-dashboard-visual {
    background: linear-gradient(135deg, #fdfbf8 0%, white 100%);
    border: 1px solid var(--border);
    border-radius: 16px; 
    padding: 28px;
    font-family: var(--mono); font-size: 13px;
    color: var(--ink2); line-height: 1.8;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(26,23,20,.04);
  }
  
  .cli-dashboard-visual::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dashNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='3' seed='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23dashNoise)' opacity='1'/%3E%3C/svg%3E");
    background-size: 100px 100px;
    opacity: 0.1;
    pointer-events: none;
    mix-blend-mode: overlay;
  }
  
  .cli-dashboard-visual .line {
    margin-bottom: 10px; display: flex; align-items: center; gap: 8px;
    position: relative;
    z-index: 1;
  }
  
  .cli-dashboard-visual .key { color: var(--accent); font-weight: 600; }
  .cli-dashboard-visual .val { color: var(--ink3); }

  /* SPEED SECTION */
  .cli-speed-section {
    padding: clamp(60px,8vw,100px) clamp(20px,5vw,80px);
    background: white; border-top: 1px solid var(--border);
  }
  .cli-speed-inner { max-width: 1400px; margin: 0 auto; }

  .cli-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px; 
  }
  
  .cli-stat-card {
    background: linear-gradient(135deg, #fdfbf8 0%, white 100%);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 36px 28px;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .cli-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='statNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='3' seed='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23statNoise)' opacity='1'/%3E%3C/svg%3E");
    background-size: 100px 100px;
    opacity: 0.12;
    pointer-events: none;
    mix-blend-mode: overlay;
  }
  
  .cli-stat-card:hover {
    transform: translateY(-6px);
    border-color: var(--accent);
    box-shadow: 0 16px 40px rgba(44,95,138,0.1);
  }
  
  .cli-stat-value {
    font-family: var(--display); font-size: 48px; font-style: italic;
    font-weight: 600; color: var(--accent); line-height: 1;
    margin-bottom: 12px;
    position: relative;
    z-index: 2;
  }
  
  .cli-stat-label {
    font-family: var(--mono); font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--ink3);
    position: relative;
    z-index: 2;
  }

  /* CTA SECTION */
  .cli-cta {
    padding: clamp(60px,8vw,100px) clamp(20px,5vw,80px);
    background: var(--ink);
  }
  .cli-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; }
  
  .cli-cta-h {
    font-family: var(--display); font-size: clamp(32px,5vw,48px);
    font-weight: 400; color: var(--paper); margin-bottom: 20px;
  }
  .cli-cta-desc {
    font-size: 16px; color: rgba(247,244,239,.6);
    line-height: 1.7; margin-bottom: 36px;
  }
  .cli-cta-btn {
    font-family: var(--mono); font-size: 13px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ink); background: var(--paper); border: none;
    padding: 14px 32px; border-radius: 6px; cursor: pointer;
    text-decoration: none; transition: all .2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .cli-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,.2);
  }

  /* CODE BLOCK */
  .cli-code-block {
    background: #0f0e0c; border: 1px solid rgba(255,255,255,.08);
    border-radius: 12px; overflow: hidden;
    font-family: var(--mono); color: #e8e8e0;
    font-size: 13px; line-height: 1.8;
    margin: 40px 0;
    box-shadow: 0 20px 60px rgba(0,0,0,.3);
  }
  .cli-code-header {
    background: #1a1714; padding: 14px 20px;
    border-bottom: 1px solid rgba(255,255,255,.05);
    display: flex; align-items: center; gap: 12px;
    font-size: 11px; color: rgba(255,255,255,.35);
    letter-spacing: 0.05em;
    font-weight: 500;
  }
  .cli-code-dots {
    display: flex; gap: 8px;
  }
  .cli-code-dot {
    width: 12px; height: 12px; border-radius: 50%;
    background: #444;
  }
  .cli-code-dot:nth-child(1) { background: #ff6058; }
  .cli-code-dot:nth-child(2) { background: #ffbd2e; }
  .cli-code-dot:nth-child(3) { background: #27c93f; }
  .cli-code-body {
    padding: 24px 28px; overflow-x: auto; white-space: pre;
  }
  .cli-code-body .str { color: #a6d155; }
  .cli-code-body .num { color: #d4a574; }
  .cli-code-body .key { color: #6dbfe5; }
  .cli-code-body .bool { color: #d9829b; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeUp .6s ease both; }
  
  @keyframes typing {
    0% { width: 0; }
    100% { width: 100%; }
  }
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  
  .cli-code-terminal {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    font-weight: 500;
  }
  
  .cli-code-text {
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    animation: typing 2.5s steps(50, end) infinite;
  }
  
  .cli-code-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: #6dbfe5;
    animation: blink 1s infinite;
  }
`;

export default function CLIPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx @hookflo/tern-dev --port 3000");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tern-root">
      <style>{CSS}</style>
      <SiteNav />

      {/* HERO */}
      <section className="cli-hero">
        <div className="cli-hero-lines">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(44,95,138,0.3)" />
                <stop offset="100%" stopColor="rgba(232,159,216,0.2)" />
              </linearGradient>
            </defs>
            {/* Left diagonal accent lines */}
            <path d="M 0 200 Q 200 150, 300 180" stroke="url(#lineGrad)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
            <path d="M 0 300 Q 250 250, 400 320" stroke="url(#lineGrad)" strokeWidth="0.8" fill="none" vectorEffect="non-scaling-stroke" opacity="0.6" />
            
            {/* Right diagonal accent lines */}
            <path d="M 1200 150 Q 950 200, 800 180" stroke="url(#lineGrad)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
            <path d="M 1200 400 Q 900 350, 700 380" stroke="url(#lineGrad)" strokeWidth="0.8" fill="none" vectorEffect="non-scaling-stroke" opacity="0.6" />
            
            {/* Subtle grid hints */}
            <line x1="0" y1="600" x2="600" y2="300" stroke="url(#lineGrad)" strokeWidth="0.5" opacity="0.3" vectorEffect="non-scaling-stroke" />
            <line x1="1200" y1="600" x2="600" y2="300" stroke="url(#lineGrad)" strokeWidth="0.5" opacity="0.3" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="cli-eyebrow">Local Webhook Tunnel</div>
        <h1 className="cli-h1">
          Secure webhooks, <em>zero storage</em>
        </h1>
        <p className="cli-subtitle">
          Test webhooks locally without ngrok or third-party services. One command. Public URL. Zero persistence.
        </p>
        
        <div className="cli-actions">
          <a href="https://github.com/Hookflo/tern-dev" className="cli-btn-primary" target="_blank" rel="noreferrer">
            <Terminal size={16} />
            GitHub Repository
          </a>
          <a href="https://www.npmjs.com/package/@hookflo/tern-dev" className="cli-btn-secondary" target="_blank" rel="noreferrer">
            <Download size={16} />
            View on NPM
          </a>
        </div>

        <div className="cli-install">
          <span>$</span>
          <code>npx @hookflo/tern-dev --port 3000</code>
          <button className="cli-copy-btn" onClick={handleCopy} title="Copy command">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="cli-features">
        <div className="cli-features-inner">
          <div className="cli-section-label">Core Capabilities</div>
          <h2 className="cli-h2">Everything you need for webhook development</h2>
          <p className="cli-section-desc">
            A complete toolkit for testing webhooks locally with live event inspection, signature verification, and replay controls.
          </p>

          <div className="cli-features-grid">
            <div className="cli-feature-card fade-in">
              <div className="cli-feature-icon">
                <Zap size={24} />
              </div>
              <h3 className="cli-feature-title">Instant Tunnel</h3>
              <p className="cli-feature-desc">Get a public HTTPS URL in seconds. Route webhooks to your local development server.</p>
            </div>

            <div className="cli-feature-card fade-in" style={{animationDelay: '.1s'}}>
              <div className="cli-feature-icon">
                <BarChart3 size={24} />
              </div>
              <h3 className="cli-feature-title">Live Dashboard</h3>
              <p className="cli-feature-desc">Real-time event log with full payload inspection, headers, responses, and side-by-side diffs.</p>
            </div>

            <div className="cli-feature-card fade-in" style={{animationDelay: '.2s'}}>
              <div className="cli-feature-icon">
                <Lock size={24} />
              </div>
              <h3 className="cli-feature-title">Zero Storage</h3>
              <p className="cli-feature-desc">Everything lives in RAM. No data persists. Exit with Ctrl+C and it's gone instantly.</p>
            </div>

            <div className="cli-feature-card fade-in" style={{animationDelay: '.3s'}}>
              <div className="cli-feature-icon">
                <Code2 size={24} />
              </div>
              <h3 className="cli-feature-title">Signature Verification</h3>
              <p className="cli-feature-desc">Built-in signature verification guidance for Stripe, GitHub, Clerk, and custom webhooks.</p>
            </div>

            <div className="cli-feature-card fade-in" style={{animationDelay: '.4s'}}>
              <div className="cli-feature-icon">
                <ArrowRight size={24} />
              </div>
              <h3 className="cli-feature-title">Replay Events</h3>
              <p className="cli-feature-desc">Resend webhooks with one click. Test error handling and edge cases easily.</p>
            </div>

            <div className="cli-feature-card fade-in" style={{animationDelay: '.5s'}}>
              <div className="cli-feature-icon">
                <Terminal size={24} />
              </div>
              <h3 className="cli-feature-title">Config File Support</h3>
              <p className="cli-feature-desc">Persistent configuration with tern.config.json. Rate limiting, IP blocking, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="cli-dashboard-section">
        <div className="cli-dashboard-inner">
          <div className="cli-section-label">Dashboard Features</div>
          <h2 className="cli-h2">Powerful inspection and debugging</h2>

          <div className="cli-dashboard-grid">
            <div className="cli-dashboard-content">
              <h3>Everything at a glance</h3>
              <p>The local dashboard shows every webhook in real-time with complete visibility into payloads, headers, and responses.</p>
              <ul className="cli-dashboard-list">
                <li>Payload inspection with JSON formatting</li>
                <li>Full HTTP headers with signature validation</li>
                <li>Response status and latency metrics</li>
                <li>Event comparison with side-by-side diffs</li>
                <li>Failed events in Dead Letter Queue</li>
                <li>One-click replay and export as cURL/fetch</li>
              </ul>
            </div>
            
            <div className="cli-dashboard-visual">
              <div className="line">
                <span className="key">tunnel</span>
                <span className="val">→ https://abc123.relay.tern.hookflo.com</span>
              </div>
              <div className="line">
                <span className="key">dashboard</span>
                <span className="val">→ http://localhost:2019</span>
              </div>
              <div className="line">
                <span className="key">forwarding</span>
                <span className="val">→ localhost:3000</span>
              </div>
              <div style={{marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16, color: '#059669'}}>
                ✓ Ctrl+C to end session
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPEED & STATS */}
      <section className="cli-speed-section">
        <div className="cli-speed-inner">
          <div className="cli-section-label">Performance</div>
          <h2 className="cli-h2">Built for speed and reliability</h2>

          <div className="cli-stats-grid">
            <div className="cli-stat-card">
              <div className="cli-stat-value">{`<100ms`}</div>
              <div className="cli-stat-label">Tunnel Latency</div>
            </div>
            <div className="cli-stat-card">
              <div className="cli-stat-value">∞</div>
              <div className="cli-stat-label">Requests Per Session</div>
            </div>
            <div className="cli-stat-card">
              <div className="cli-stat-value">500</div>
              <div className="cli-stat-label">Event Buffer Size</div>
            </div>
            <div className="cli-stat-card">
              <div className="cli-stat-value">0B</div>
              <div className="cli-stat-label">Data Persisted</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICKSTART */}
      <section className="cli-features">
        <div className="cli-features-inner">
          <div className="cli-section-label">Getting Started</div>
          <h2 className="cli-h2">Three steps to webhook testing</h2>

          <div className="cli-code-block">
            <div className="cli-code-header">
              <div className="cli-code-dots">
                <div className="cli-code-dot" style={{background: '#ff5f57'}} />
                <div className="cli-code-dot" style={{background: '#febc2e'}} />
                <div className="cli-code-dot" style={{background: '#28c940'}} />
              </div>
              <span>$ terminal</span>
            </div>
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
# 3. Open dashboard and watch events flow in real-time`}</div>
          </div>
        </div>
      </section>

      {/* LIVE DASHBOARD */}
      <section className="cli-dashboard-section" style={{background: 'linear-gradient(180deg, #f0ebe2 0%, #f7f4ef 100%)'}}>
        <div className="cli-dashboard-inner">
          <div className="cli-section-label">Live Dashboard</div>
          <h2 className="cli-h2">Real-time webhook debugging</h2>
          <p className="cli-section-desc">Watch every webhook in real-time with full payload inspection, headers, responses, and detailed metrics. The local dashboard at http://localhost:2019 gives you instant visibility.</p>

          <div style={{marginTop: 48, borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 12px 40px rgba(26,23,20,.12)'}}>
            <img src="/tern-dashboard.jpg" alt="Tern CLI Live Dashboard showing real-time webhook events with payload inspection" style={{width: '100%', height: 'auto', display: 'block'}} />
          </div>

          <div style={{marginTop: 40, background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(26,23,20,.08)'}}>
            <div style={{fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink4)', marginBottom: 24, letterSpacing: '0.05em', fontWeight: 600}}>LIVE EVENTS LOG SAMPLE • 3 webhooks received</div>
            
            <div style={{marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                <span style={{fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ink)', fontWeight: 600}}>POST /stripe/webhook</span>
                <span style={{background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '4px', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700}}>200 OK</span>
              </div>
              <div style={{display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--ink3)'}}>
                <span>event_id: <code style={{color: 'var(--accent)', fontFamily: 'var(--mono)'}}>evt_123abc</code></span>
                <span>type: <code style={{color: 'var(--accent)', fontFamily: 'var(--mono)'}}>charge.succeeded</code></span>
                <span style={{marginLeft: 'auto'}}>2.4ms</span>
              </div>
            </div>

            <div style={{marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                <span style={{fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ink)', fontWeight: 600}}>POST /github/events</span>
                <span style={{background: '#fecaca', color: '#7f1d1d', padding: '4px 10px', borderRadius: '4px', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700}}>500 Error</span>
              </div>
              <div style={{display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--ink3)'}}>
                <span>event_id: <code style={{color: 'var(--accent)', fontFamily: 'var(--mono)'}}>evt_456def</code></span>
                <span>type: <code style={{color: 'var(--accent)', fontFamily: 'var(--mono)'}}>push</code></span>
                <span style={{marginLeft: 'auto'}}>45ms</span>
              </div>
            </div>

            <div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                <span style={{fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ink)', fontWeight: 600}}>POST /custom/handler</span>
                <span style={{background: '#dbeafe', color: '#0c4a6e', padding: '4px 10px', borderRadius: '4px', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700}}>202 Accepted</span>
              </div>
              <div style={{display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--ink3)'}}>
                <span>event_id: <code style={{color: 'var(--accent)', fontFamily: 'var(--mono)'}}>evt_789ghi</code></span>
                <span>type: <code style={{color: 'var(--accent)', fontFamily: 'var(--mono)'}}>custom.test</code></span>
                <span style={{marginLeft: 'auto'}}>1.8ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIG FILE */}
      <section className="cli-dashboard-section">
        <div className="cli-dashboard-inner">
          <div className="cli-section-label">Configuration</div>
          <h2 className="cli-h2">Persistent setup with config files</h2>

          <div className="cli-dashboard-grid" style={{marginBottom: 40}}>
            <div className="cli-dashboard-content">
              <h3>Manage settings with tern.config.json</h3>
              <p>Store CLI flags in a configuration file and load them automatically.</p>
              <ul className="cli-dashboard-list">
                <li>Rate limiting and IP allowlisting</li>
                <li>Block specific paths and HTTP methods</li>
                <li>Custom relay server support</li>
                <li>Session TTL and auto-kill timers</li>
                <li>Audit logging to file</li>
                <li>Full schema with IDE autocomplete</li>
              </ul>
            </div>

            <div className="cli-code-block">
              <div className="cli-code-header">
                <div className="cli-code-dots">
                  <div className="cli-code-dot" />
                  <div className="cli-code-dot" />
                  <div className="cli-code-dot" />
                </div>
                <span>tern.config.json</span>
              </div>
              <div className="cli-code-body">{`{
  <span className="key">"port"</span>: <span className="num">3000</span>,
  <span className="key">"rateLimit"</span>: <span className="num">100</span>,
  <span className="key">"allowIp"</span>: [
    <span className="str">"54.187.174.169"</span>
  ]
}`}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cli-cta">
        <div className="cli-cta-inner">
          <div style={{marginBottom: 60}}>
            <h2 className="cli-cta-h">Ready to test webhooks locally?</h2>
            <p className="cli-cta-desc">No account. No ngrok. No storage. Just one command and you're live.</p>
          </div>
          <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="https://github.com/Hookflo/tern-dev" className="cli-btn-primary" target="_blank" rel="noreferrer" style={{fontSize: '14px', padding: '16px 40px'}}>
              <Terminal size={18} />
              Start on GitHub
            </a>
            <a href="https://www.npmjs.com/package/@hookflo/tern-dev" className="cli-btn-secondary" target="_blank" rel="noreferrer" style={{fontSize: '14px', padding: '16px 40px'}}>
              <Download size={18} />
              View on NPM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
