'use client';

import { useState } from 'react';
import { Copy, Check, Plus, X } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Framework = 'nextjs' | 'express' | 'cloudflare' | 'core';

interface PlatformConfig {
  id: string;
  name: string;
  svgName: string;
  secretEnv: string;
  isCustom?: boolean;
}

// ─── PLATFORMS ────────────────────────────────────────────────────────────────

const PLATFORMS: PlatformConfig[] = [
  { id: 'stripe', name: 'Stripe', svgName: 'Stripe.svg', secretEnv: 'STRIPE_WEBHOOK_SECRET' },
  { id: 'clerk', name: 'Clerk', svgName: 'clerk.svg', secretEnv: 'CLERK_WEBHOOK_SECRET' },
  { id: 'github', name: 'GitHub', svgName: 'github.svg', secretEnv: 'GITHUB_WEBHOOK_SECRET' },
  { id: 'shopify', name: 'Shopify', svgName: 'shopify.svg', secretEnv: 'SHOPIFY_WEBHOOK_SECRET' },
  { id: 'polar', name: 'Polar', svgName: 'polar.svg', secretEnv: 'POLAR_WEBHOOK_SECRET' },
  { id: 'dodopayments', name: 'Dodo Payments', svgName: 'dodo.svg', secretEnv: 'DODO_WEBHOOK_SECRET' },
  { id: 'gitlab', name: 'GitLab', svgName: 'gitlab.svg', secretEnv: 'GITLAB_WEBHOOK_SECRET' },
  { id: 'vercel', name: 'Vercel', svgName: 'vercel.svg', secretEnv: 'VERCEL_WEBHOOK_SECRET' },
  { id: 'replicate', name: 'Replicate', svgName: 'replicate.svg', secretEnv: 'REPLICATE_WEBHOOK_SECRET' },
  { id: 'razorpay', name: 'Razorpay', svgName: 'razorpay.svg', secretEnv: 'RAZORPAY_WEBHOOK_SECRET' },
  { id: 'workos', name: 'WorkOS', svgName: 'workos.svg', secretEnv: 'WORKOS_WEBHOOK_SECRET' },
  { id: 'falai', name: 'Fal AI', svgName: 'fal.svg', secretEnv: 'FAL_WEBHOOK_SECRET' },
  { id: 'lemonsqueezy', name: 'LemonSqueezy', svgName: 'lemonsqueezy.svg', secretEnv: 'LEMONSQUEEZY_WEBHOOK_SECRET' },
  { id: 'paddle', name: 'Paddle', svgName: 'paddle.svg', secretEnv: 'PADDLE_WEBHOOK_SECRET' },
];

const FRAMEWORKS: { id: Framework; label: string }[] = [
  { id: 'nextjs', label: 'Next.js' },
  { id: 'express', label: 'Express' },
  { id: 'cloudflare', label: 'Cloudflare Workers' },
  { id: 'core', label: 'Core SDK' },
];

// ─── SNIPPET BUILDER ─────────────────────────────────────────────────────────

function buildSnippet(platform: PlatformConfig, framework: Framework): string {
  const { id, secretEnv, isCustom } = platform;

  if (framework === 'nextjs') {
    if (isCustom) return `import { createWebhookHandler } from '@hookflo/tern/nextjs';

// app/api/webhooks/route.ts
export const POST = createWebhookHandler({
  platform: 'custom',
  secret:   process.env.${secretEnv}!,
  signatureConfig: {
    algorithm:       'hmac-sha256',
    signatureHeader: 'x-signature',
    signaturePrefix: 'sha256=',
    timestampHeader: 'x-timestamp',
  },
  handler: async (payload) => {
    // ✓ verified — handle your event
    return { received: true };
  },
});`;

    return `import { createWebhookHandler } from '@hookflo/tern/nextjs';

// app/api/webhooks/${id}/route.ts
export const POST = createWebhookHandler({
  platform: '${id}',
  secret:   process.env.${secretEnv}!,
  handler:  async (payload) => {
    // ✓ verified — handle your event
    return { received: true };
  },
});`;
  }

  if (framework === 'express') {
    if (isCustom) return `import express from 'express';
import { createWebhookMiddleware } from '@hookflo/tern/express';

const app = express();

// Register before app.use(express.json())
app.post('/webhooks/custom',
  createWebhookMiddleware({
    platform: 'custom',
    secret:   process.env.${secretEnv}!,
    signatureConfig: {
      algorithm:       'hmac-sha256',
      signatureHeader: 'x-signature',
      signaturePrefix: 'sha256=',
    },
  }),
  (req, res) => {
    // ✓ req.webhook.payload — verified
    res.json({ received: true });
  }
);`;

    return `import express from 'express';
import { createWebhookMiddleware } from '@hookflo/tern/express';

const app = express();

// Register before app.use(express.json())
app.post('/webhooks/${id}',
  createWebhookMiddleware({
    platform: '${id}',
    secret:   process.env.${secretEnv}!,
  }),
  (req, res) => {
    // ✓ req.webhook.payload — verified
    res.json({ received: true });
  }
);`;
  }

  if (framework === 'cloudflare') {
    if (isCustom) return `import { createWebhookHandler } from '@hookflo/tern/cloudflare';

// wrangler.toml: [vars] ${secretEnv} = "..."
export default {
  fetch: createWebhookHandler({
    platform:  'custom',
    secretEnv: '${secretEnv}',
    signatureConfig: {
      algorithm:       'hmac-sha256',
      signatureHeader: 'x-signature',
      signaturePrefix: 'sha256=',
    },
    handler: async (payload, env) => {
      // ✓ verified — edge-native Web Crypto
      return { received: true };
    },
  }),
};`;

    return `import { createWebhookHandler } from '@hookflo/tern/cloudflare';

// wrangler.toml: [vars] ${secretEnv} = "..."
export default {
  fetch: createWebhookHandler({
    platform:  '${id}',
    secretEnv: '${secretEnv}',
    handler:   async (payload, env) => {
      // ✓ verified — edge-native Web Crypto
      return { received: true };
    },
  }),
};`;
  }

  // core SDK
  if (isCustom) return `import { WebhookVerificationService } from '@hookflo/tern';

// Works in Node.js, Deno, Bun — any runtime
const result = await WebhookVerificationService.verify(request, {
  platform: 'custom',
  secret:   process.env.${secretEnv}!,
  signatureConfig: {
    algorithm:       'hmac-sha256',
    signatureHeader: 'x-signature',
    signaturePrefix: 'sha256=',
    timestampHeader: 'x-timestamp',
  },
  toleranceInSeconds: 300,
});

if (result.isValid) {
  // ✓ result.payload — cryptographically verified
  console.log(result.payload);
}`;

  return `import { WebhookVerificationService } from '@hookflo/tern';

// Works in Node.js, Deno, Bun — any runtime
const result = await WebhookVerificationService
  .verifyWithPlatformConfig(
    request,
    '${id}',
    process.env.${secretEnv}!,
    300, // toleranceInSeconds
  );

if (result.isValid) {
  // ✓ result.payload — cryptographically verified
  console.log(result.payload);
}`;
}

// ─── SYNTAX HIGHLIGHTER ──────────────────────────────────────────────────────

function highlightCode(code: string): JSX.Element {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  // Keywords (purple)
  const keywords = /\b(import|from|const|export|async|await|function|return|if|else|new|as|interface|type|let|var)\b/g;
  // Strings (green)
  const strings = /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g;
  // Numbers (orange)
  const numbers = /\b(\d+)\b/g;
  // Comments (gray)
  const comments = /(\/\/.*|\/\*[\s\S]*?\*\/)/g;
  // Functions/Classes (blue)
  const functions = /\b([A-Z][a-zA-Z0-9]*(?=\(|\.)|[a-z][a-zA-Z0-9]*(?=\())\b/g;
  // Properties (yellow)
  const properties = /\.\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;

  // Create regex that matches all patterns
  const allPatterns = /\b(import|from|const|export|async|await|function|return|if|else|new|as|interface|type|let|var)\b|('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)|\/\/.*|\/\*[\s\S]*?\*\/|\b\d+\b|\b[A-Z][a-zA-Z0-9]*|\.\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;

  let match;
  const regex = new RegExp(allPatterns.source, 'g');

  while ((match = regex.exec(code)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(code.slice(lastIndex, match.index));
    }

    const text = match[0];
    let className = '';

    if (/^(import|from|const|export|async|await|function|return|if|else|new|as|interface|type|let|var)$/.test(text)) {
      className = 'skw'; // keyword (purple)
    } else if (/^['"`]/.test(text)) {
      className = 'sstr'; // string (green)
    } else if (/^\/\/|^\/\*/.test(text)) {
      className = 'scm'; // comment (gray)
    } else if (/^\d+$/.test(text)) {
      className = 'snum'; // number (orange)
    } else if (/^[A-Z]/.test(text)) {
      className = 'sfn'; // Class/function (blue)
    } else if (/^\./.test(text)) {
      className = 'sprop'; // property (yellow)
    }

    parts.push(
      <span key={`${lastIndex}-${match.index}`} className={className}>
        {text}
      </span>
    );

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < code.length) {
    parts.push(code.slice(lastIndex));
  }

  return <>{parts}</>;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function WebhookIntegrationGuide() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('stripe');
  const [selectedFramework, setSelectedFramework] = useState<Framework>('nextjs');
  const [copied, setCopied] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customPlatforms, setCustomPlatforms] = useState<PlatformConfig[]>([]);
  const [customName, setCustomName] = useState('');
  const [customSecret, setCustomSecret] = useState('');

  // custom HMAC template — always at bottom of list
  const customTemplate: PlatformConfig = {
    id: '__custom__', name: 'Custom HMAC', svgName: '', secretEnv: 'HMAC_SECRET', isCustom: true,
  };
  const allPlatforms = [...PLATFORMS, ...customPlatforms, customTemplate];
  const currentPlatform = allPlatforms.find(p => p.id === selectedPlatform) ?? PLATFORMS[0];
  const codeSnippet = buildSnippet(currentPlatform, selectedFramework);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddCustom = () => {
    if (customName.trim() && customSecret.trim()) {
      const newPlatform: PlatformConfig = {
        id: customName.toLowerCase().replace(/\s+/g, '-'),
        name: customName,
        svgName: '',
        secretEnv: customName.toUpperCase().replace(/\s+/g, '_') + '_WEBHOOK_SECRET',
        isCustom: true,
      };
      setCustomPlatforms(prev => [...prev, newPlatform]);
      setSelectedPlatform(newPlatform.id);
      setCustomName('');
      setCustomSecret('');
      setShowCustomDialog(false);
    }
  };

  const handleRemoveCustom = (id: string) => {
    setCustomPlatforms(prev => prev.filter(p => p.id !== id));
    if (selectedPlatform === id) setSelectedPlatform('stripe');
  };

  return (
    <div className="t-webhook-section" id="usage">
      <div className="t-webhook-inner">

        {/* Section Header */}
        <div className="t-webhook-header">
          <div className="t-section-label">Usage</div>
          <h2 className="t-h2">Pick a platform,<br /><em>get your snippet.</em></h2>
          <p className="t-section-desc">
            Real, working code for every supported platform and framework. Copy and paste — no adapting needed.
          </p>
        </div>

        {/* Main Grid */}
        <div className="t-webhook-grid">

          {/* ── LEFT: platform list ── */}
          <div className="t-webhook-sidebar">
            <div className="t-sidebar-head">Platforms</div>
            <div className="t-webhook-platforms">
              {allPlatforms.map((platform) => {
                const isActive = selectedPlatform === platform.id;
                const isUserCustom = !!platform.isCustom && platform.id !== '__custom__';
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`t-webhook-platform-card${isActive ? ' active' : ''}`}
                  >
                    <div className="t-webhook-icon">
                      {platform.id === '__custom__' ? (
                        <span style={{ fontSize: 13 }}>⚙</span>
                      ) : platform.svgName ? (
                        <img
                          src={`/assets/${platform.svgName}`}
                          alt={platform.name}
                          width={15} height={15}
                          style={{ objectFit: 'contain', display: 'block' }}
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                            img.insertAdjacentHTML('afterend',
                              `<span style="font-family:var(--mono);font-size:8px;font-weight:700">${platform.name.slice(0, 2).toUpperCase()}</span>`
                            );
                          }}
                        />
                      ) : (
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 700 }}>
                          {platform.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="t-webhook-platform-info">
                      <span className="t-webhook-platform-name">{platform.name}</span>
                      {isUserCustom ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveCustom(platform.id); }}
                          className="t-webhook-remove-btn"
                          title="Remove"
                        >
                          <X size={11} />
                        </button>
                      ) : platform.id !== '__custom__' ? (
                        <span className="t-pl-dot" />
                      ) : null}
                    </div>
                  </button>
                );
              })}

              <button onClick={() => setShowCustomDialog(true)} className="t-webhook-add-custom">
                <Plus size={12} />
                Add Custom Provider
              </button>
            </div>
          </div>

          {/* ── RIGHT: code viewer ── */}
          <div className="t-webhook-viewer">

            {/* titlebar: window chrome + tabs + copy button */}
            <div className="t-webhook-titlebar">
              <div className="t-wh-dots">
                <span className="t-wh-dot" style={{ background: '#ff6058' }} />
                <span className="t-wh-dot" style={{ background: '#ffbd2e' }} />
                <span className="t-wh-dot" style={{ background: '#29c440' }} />
              </div>

              <div className="t-fw-tabs">
                {FRAMEWORKS.map(fw => (
                  <button
                    key={fw.id}
                    onClick={() => setSelectedFramework(fw.id)}
                    className={`t-fw-tab${selectedFramework === fw.id ? ' active' : ''}`}
                  >
                    {fw.label}
                  </button>
                ))}
              </div>

              {/* Copy — lives in titlebar, always visible against dark bg */}
              <button onClick={handleCopy} className="t-webhook-copy-btn">
                {copied
                  ? <><Check size={11} />Copied</>
                  : <><Copy size={11} />Copy</>}
              </button>
            </div>

            {/* code — hugs content, no artificial min-height */}
            <pre className="t-webhook-code-pre">
              <code>{highlightCode(codeSnippet)}</code>
            </pre>

            {/* status bar */}
            <div className="t-webhook-statusbar">
              <span className="t-status-platform">
                {currentPlatform.svgName && (
                  <img
                    src={`/assets/${currentPlatform.svgName}`}
                    alt=""
                    width={10} height={10}
                    style={{ objectFit: 'contain', opacity: 0.55 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                {currentPlatform.name}
              </span>
              <span className="t-status-fw">{FRAMEWORKS.find(f => f.id === selectedFramework)?.label}</span>
              <span className="t-status-verified"><span style={{ color: '#86efac' }}>✓</span> signature verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Custom provider dialog ── */}
      {showCustomDialog && (
        <div className="t-webhook-dialog-overlay" onClick={() => setShowCustomDialog(false)}>
          <div className="t-webhook-dialog" onClick={e => e.stopPropagation()}>
            <div className="t-webhook-dialog-header">
              <h3>Add Custom Webhook Provider</h3>
              <button onClick={() => setShowCustomDialog(false)}><X size={18} /></button>
            </div>
            <div className="t-webhook-dialog-body">
              <div className="t-webhook-form-group">
                <label>Provider Name</label>
                <input
                  type="text"
                  placeholder="e.g. SendGrid"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="t-webhook-input"
                />
              </div>
              <div className="t-webhook-form-group">
                <label>Webhook Secret</label>
                <input
                  type="password"
                  placeholder="Enter webhook secret"
                  value={customSecret}
                  onChange={e => setCustomSecret(e.target.value)}
                  className="t-webhook-input"
                />
              </div>
              <div className="t-webhook-dialog-actions">
                <button onClick={() => setShowCustomDialog(false)} className="t-webhook-btn-secondary">Cancel</button>
                <button
                  onClick={handleAddCustom}
                  className="t-webhook-btn-primary"
                  disabled={!customName.trim() || !customSecret.trim()}
                >
                  Add Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .t-webhook-section {
          background: var(--paper);
          border-top: 1px solid var(--border);
          padding: clamp(50px,8vw,90px) clamp(20px,5vw,80px);
        }
        .t-webhook-inner { max-width: 1200px; margin: 0 auto; }
        .t-webhook-header { margin-bottom: 40px; }

        /* grid */
        .t-webhook-grid {
          display: grid;
          grid-template-columns: 205px 1fr;
          border: 1.5px solid var(--border2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 5px 6px 0 var(--border);
        }
        @media(max-width:860px){ .t-webhook-grid { grid-template-columns: 1fr; } }

        /* sidebar */
        .t-webhook-sidebar {
          background: var(--paper2);
          border-right: 1.5px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        @media(max-width:860px){ .t-webhook-sidebar { border-right: none; border-bottom: 1.5px solid var(--border); } }

        .t-sidebar-head {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          font-family: var(--mono);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink4);
          display: flex; align-items: center; gap: 8px;
        }
        .t-sidebar-head::before { content:''; display:block; width:14px; height:1px; background:var(--ink4); }

        .t-webhook-platforms {
          padding: 8px;
          display: flex; flex-direction: column; gap: 2px;
          overflow-y: auto; max-height: 490px;
        }
        @media(max-width:860px){ .t-webhook-platforms { flex-direction:row; flex-wrap:wrap; max-height:none; gap:4px; } }

        .t-webhook-platform-card {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 9px; border-radius: 7px;
          border: none; background: transparent;
          cursor: pointer; text-align: left;
          transition: background 0.12s; width: 100%;
        }
        .t-webhook-platform-card:hover { background: rgba(26,23,20,.05); }
        .t-webhook-platform-card.active { background: var(--ink); }
        .t-webhook-platform-card.active .t-webhook-platform-name { color: var(--paper); }
        .t-webhook-platform-card.active .t-pl-dot { background: #86efac; }
        @media(max-width:860px){ .t-webhook-platform-card { width: auto; } }

        .t-webhook-icon {
          width: 22px; height: 22px;
          border-radius: 5px; background: white;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; overflow: hidden;
        }
        .t-webhook-platform-card.active .t-webhook-icon {
          background: rgba(255,255,255,.1);
          border-color: rgba(255,255,255,.12);
        }

        .t-webhook-platform-info {
          display: flex; align-items: center;
          justify-content: space-between;
          flex: 1; gap: 4px; min-width: 0;
        }
        .t-webhook-platform-name {
          font-family: var(--mono); font-size: 11px; font-weight: 500;
          color: var(--ink2); white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .t-pl-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #059669; flex-shrink: 0;
        }
        .t-webhook-remove-btn {
          background: none; border: none; padding: 2px;
          cursor: pointer; color: var(--ink4);
          display: flex; align-items: center; transition: color 0.12s;
        }
        .t-webhook-remove-btn:hover { color: var(--red); }

        .t-webhook-add-custom {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 9px; margin-top: 4px;
          background: transparent;
          border: 1.5px dashed var(--border2);
          border-radius: 7px; cursor: pointer;
          font-family: var(--mono); font-size: 10px; font-weight: 600;
          color: var(--ink4); transition: all 0.15s; width: 100%;
        }
        .t-webhook-add-custom:hover { border-color:var(--ink3); color:var(--ink2); background:rgba(26,23,20,.04); }

        /* viewer */
        .t-webhook-viewer { display: flex; flex-direction: column; background: var(--ink); }

        /* titlebar — all controls live here against dark bg */
        .t-webhook-titlebar {
          display: flex; align-items: center;
          background: #2a2520;
          border-bottom: 1px solid rgba(255,255,255,.07);
          padding: 0 14px;
          height: 42px;
          flex-shrink: 0;
          gap: 0;
        }
        .t-wh-dots { display:flex; gap:6px; margin-right:14px; flex-shrink:0; }
        .t-wh-dot { width:10px; height:10px; border-radius:50%; display:block; }

        .t-fw-tabs { display:flex; flex:1; overflow-x:auto; }
        .t-fw-tab {
          font-family: var(--mono); font-size: 10px; font-weight: 600;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,.3);
          background: transparent; border: none;
          border-bottom: 2px solid transparent;
          padding: 0 13px; height: 42px;
          cursor: pointer; transition: color 0.12s;
          white-space: nowrap;
          position: relative; top: 1px;
        }
        .t-fw-tab:hover { color: rgba(255,255,255,.6); }
        .t-fw-tab.active { color: #86efac; border-bottom-color: #86efac; }

        /* copy — always visible, right of tabs */
        .t-webhook-copy-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 5px 10px; margin-left: 12px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 4px;
          color: rgba(255,255,255,.65);
          cursor: pointer;
          font-family: var(--mono); font-size: 10px; font-weight: 600;
          letter-spacing: 0.04em;
          transition: all 0.15s; flex-shrink: 0; white-space: nowrap;
        }
        .t-webhook-copy-btn:hover { background:rgba(255,255,255,.13); border-color:rgba(255,255,255,.24); color:white; }

        /* code pre — no artificial extra space */
        .t-webhook-code-pre {
          flex: 1; margin: 0;
          padding: 18px 20px;
          font-family: var(--mono); font-size: 12px;
          line-height: 1.75; color: #f8f8f2;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow-wrap: break-word;
          background: var(--ink);
          max-height: none;
          min-height: auto;
        }
        .t-webhook-code-pre code { font-family:inherit; font-size:inherit; color:inherit; }
        
        /* syntax highlighting colors */
        .t-webhook-code-pre .skw { color: #c792ea; }
        .t-webhook-code-pre .sstr { color: #c3e88d; }
        .t-webhook-code-pre .scm { color: #546e7a; font-style: italic; }
        .t-webhook-code-pre .snum { color: #ffcb6b; }
        .t-webhook-code-pre .sfn { color: #82aaff; }
        .t-webhook-code-pre .sprop { color: #ffcb6b; }

        /* status bar */
        .t-webhook-statusbar {
          display:flex; align-items:center; gap:12px;
          padding: 9px 18px;
          background: #1e1c18;
          border-top: 1px solid rgba(255,255,255,.06);
          flex-shrink: 0;
        }
        .t-status-platform {
          font-family:var(--mono); font-size:10px; font-weight:700;
          letter-spacing:.08em; text-transform:uppercase;
          color:#86efac;
          background:rgba(134,239,172,.1);
          border:1px solid rgba(134,239,172,.2);
          border-radius:100px; padding:3px 9px;
          display:flex; align-items:center; gap:5px;
        }
        .t-status-fw { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.22); }
        .t-status-verified { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.2); margin-left:auto; }

        /* dialog */
        .t-webhook-dialog-overlay {
          position:fixed; inset:0;
          background:rgba(26,23,20,.52);
          display:flex; align-items:center; justify-content:center;
          z-index:1000; padding:20px;
        }
        .t-webhook-dialog {
          background:white;
          border:1.5px solid var(--border2);
          border-radius:12px;
          box-shadow:0 20px 60px rgba(26,23,20,.2);
          max-width:400px; width:100%;
          animation:slideUp 0.22s ease;
        }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .t-webhook-dialog-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 22px; border-bottom:1px solid var(--border);
        }
        .t-webhook-dialog-header h3 { font-family:var(--serif); font-size:15px; font-weight:600; margin:0; }
        .t-webhook-dialog-header button { background:none; border:none; cursor:pointer; color:var(--ink3); display:flex; align-items:center; transition:color 0.15s; }
        .t-webhook-dialog-header button:hover { color:var(--ink); }
        .t-webhook-dialog-body { padding:22px; }
        .t-webhook-form-group { display:flex; flex-direction:column; gap:7px; margin-bottom:18px; }
        .t-webhook-form-group label { font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink); letter-spacing:.08em; text-transform:uppercase; }
        .t-webhook-input {
          padding:9px 13px;
          border:1px solid var(--border); border-radius:6px;
          font-family:var(--mono); font-size:12px; color:var(--ink);
          background:var(--paper2); transition:all 0.15s;
        }
        .t-webhook-input:focus { outline:none; border-color:var(--ink); background:white; }
        .t-webhook-dialog-actions { display:flex; gap:10px; justify-content:flex-end; }
        .t-webhook-btn-primary, .t-webhook-btn-secondary {
          padding:9px 18px; border-radius:4px;
          font-family:var(--mono); font-size:11px; font-weight:700;
          letter-spacing:.06em; cursor:pointer; transition:all 0.15s; border:none;
        }
        .t-webhook-btn-primary { background:var(--ink); color:var(--paper); }
        .t-webhook-btn-primary:hover:not(:disabled) { opacity:.85; transform:translateY(-1px); }
        .t-webhook-btn-primary:disabled { opacity:.4; cursor:not-allowed; }
        .t-webhook-btn-secondary { background:var(--paper2); color:var(--ink); border:1px solid var(--border); }
        .t-webhook-btn-secondary:hover { background:var(--border); }
      `}</style>
    </div>
  );
}
