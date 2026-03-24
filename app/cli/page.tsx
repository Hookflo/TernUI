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
    padding: clamp(80px,10vw,140px) clamp(20px,5vw,80px) clamp(60px,8vw,100px);
    max-width: 1400px; margin: 0 auto;
    text-align: center;
    position: relative;
    background: linear-gradient(135deg, 
      #f7f4ef 0%,
      #fde4d0 15%,
      #f9cfc8 25%,
      #f2b5d4 40%,
      #e89fd8 55%,
      #d89fdb 65%,
      #c8addd 75%,
      #b8c5e0 85%,
      #a8d8e8 100%);
    background-attachment: fixed;
    overflow: hidden;
  }
  
  .cli-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3CfeDisplacementMap in='SourceGraphic' scale='30' xChannelSelector='R' yChannelSelector='G' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    opacity: 0.6;
    pointer-events: none;
    mix-blend-mode: overlay;
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
    font-family: var(--display); font-size: clamp(42px,6vw,72px);
    font-weight: 400; line-height: 1.1; letter-spacing: -0.02em;
    color: var(--ink); margin: 0 auto 24px; max-width: 900px;
  }
  .cli-h1 em { font-style: italic; color: var(--accent); }
  
  .cli-subtitle {
    font-size: clamp(16px,2vw,18px); color: var(--ink3);
    line-height: 1.7; max-width: 700px; margin: 0 auto 48px;
  }

  .cli-actions {
    display: flex; align-items: center; justify-content: center;
    gap: 20px; flex-wrap: wrap; margin-bottom: 60px;
  }
  .cli-btn-primary {
    font-family: var(--mono); font-size: 13px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--paper); background: var(--ink); border: none;
    padding: 14px 32px; border-radius: 6px; cursor: pointer;
    text-decoration: none; transition: all .2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .cli-btn-primary:hover { 
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(26,23,20,.2);
  }
  
  .cli-btn-secondary {
    font-family: var(--mono); font-size: 13px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ink); background: transparent; border: 1.5px solid var(--border2);
    padding: 12px 32px; border-radius: 6px; cursor: pointer;
    text-decoration: none; transition: all .2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .cli-btn-secondary:hover { 
    border-color: var(--ink3);
    transform: translateY(-2px);
  }

  .cli-install {
    background: white; border: 1px solid var(--border);
    border-radius: 8px; padding: 16px 20px;
    font-family: var(--mono); font-size: 13px; font-weight: 500;
    color: var(--ink2); display: inline-flex;
    align-items: center; gap: 14px; max-width: 520px;
    margin: 0 auto; box-shadow: 0 2px 8px rgba(26,23,20,.06);
  }
  .cli-install span { color: var(--ink3); }
  .cli-copy-btn {
    background: none; border: none; cursor: pointer;
    color: var(--ink4); padding: 4px 8px;
    display: flex; align-items: center;
    transition: color .2s;
  }
  .cli-copy-btn:hover { color: var(--ink); }

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
    background: var(--paper2); border: 1px solid var(--border);
    border-radius: 12px; padding: 32px 28px;
    transition: all .2s;
  }
  .cli-feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(26,23,20,.08);
    border-color: var(--ink3);
  }
  .cli-feature-icon {
    width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    background: white; border: 1px solid var(--border);
    border-radius: 8px; margin-bottom: 20px;
    color: var(--accent);
  }
  .cli-feature-title {
    font-family: var(--serif); font-size: 18px; font-weight: 600;
    color: var(--ink); margin-bottom: 12px;
  }
  .cli-feature-desc {
    font-size: 14px; color: var(--ink3); line-height: 1.65;
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
    background: white; border: 1px solid var(--border);
    border-radius: 12px; padding: 20px;
    font-family: var(--mono); font-size: 12px;
    color: var(--ink2); line-height: 1.8;
  }
  .cli-dashboard-visual .line {
    margin-bottom: 8px; display: flex; align-items: center; gap: 8px;
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
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1px; border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; background: var(--border);
  }
  .cli-stat-card {
    background: white; padding: 28px;
    text-align: center;
  }
  .cli-stat-value {
    font-family: var(--display); font-size: 36px; font-style: italic;
    font-weight: 600; color: var(--accent); line-height: 1;
    margin-bottom: 8px;
  }
  .cli-stat-label {
    font-family: var(--mono); font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink4);
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
    background: var(--ink); border: 1px solid rgba(255,255,255,.1);
    border-radius: 8px; overflow: hidden;
    font-family: var(--mono); color: #f8f8f2;
    font-size: 12px; line-height: 1.75;
    margin: 32px 0;
  }
  .cli-code-header {
    background: #2a2520; padding: 10px 16px;
    border-bottom: 1px solid rgba(255,255,255,.06);
    display: flex; align-items: center; gap: 8px;
    font-size: 10px; color: rgba(255,255,255,.3);
    letter-spacing: 0.04em;
  }
  .cli-code-dots {
    display: flex; gap: 6px;
  }
  .cli-code-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: #555;
  }
  .cli-code-body {
    padding: 20px 22px; overflow-x: auto; white-space: pre;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeUp .6s ease both; }
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

            <div className="cli-dashboard-visual">
              <div className="line">
                <span style={{color: '#c792ea'}}>{`{`}</span>
              </div>
              <div className="line" style={{paddingLeft: 16}}>
                <span style={{color: '#c3e88d'}}>{`"port"`}</span><span>: </span><span style={{color: '#ffcb6b'}}>3000</span><span>,</span>
              </div>
              <div className="line" style={{paddingLeft: 16}}>
                <span style={{color: '#c3e88d'}}>{`"rateLimit"`}</span><span>: </span><span style={{color: '#ffcb6b'}}>100</span><span>,</span>
              </div>
              <div className="line" style={{paddingLeft: 16}}>
                <span style={{color: '#c3e88d'}}>{`"allowIp"`}</span><span>: [</span>
              </div>
              <div className="line" style={{paddingLeft: 32}}>
                <span style={{color: '#ffcb6b'}}>{`"54.187.174.169"`}</span>
              </div>
              <div className="line" style={{paddingLeft: 16}}>
                <span>]</span>
              </div>
              <div className="line">
                <span style={{color: '#c792ea'}}>{`}`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cli-cta">
        <div className="cli-cta-inner">
          <h2 className="cli-cta-h">Ready to test webhooks locally?</h2>
          <p className="cli-cta-desc">No account. No ngrok. No storage. Just one command and you're live.</p>
          <a href="https://github.com/Hookflo/tern-dev" className="cli-cta-btn" target="_blank" rel="noreferrer">
            <Terminal size={16} />
            Get Started on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
