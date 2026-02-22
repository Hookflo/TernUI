'use client';

import { useState } from 'react';
import { Copy, Check, Plus, X } from 'lucide-react';

type Framework = 'nextjs' | 'express' | 'cloudflare' | 'core';

interface PlatformConfig {
  id: string;
  name: string;
  svgName: string;
  secretEnv: string;
  isCustom?: boolean;
}

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

  // Core SDK
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

// ─── SYNTAX HIGHLIGHTER (from reference — exact token colours) ────────────────

function SyntaxHighlight({ code }: { code: string }) {
  const tokens: { type: string; value: string }[] = [];
  let i = 0;

  while (i < code.length) {
    // Comments
    if (code.slice(i, i + 2) === '//') {
      const end = code.indexOf('\n', i);
      const commentEnd = end === -1 ? code.length : end;
      tokens.push({ type: 'comment', value: code.slice(i, commentEnd) });
      i = commentEnd;
      continue;
    }

    // Strings — single, double, backtick
    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const quote = code[i];
      let end = i + 1;
      while (end < code.length && code[end] !== quote) {
        if (code[end] === '\\') end += 2;
        else end += 1;
      }
      tokens.push({ type: 'string', value: code.slice(i, end + 1) });
      i = end + 1;
      continue;
    }

    // Keywords
    const keywordMatch = code.slice(i).match(
      /^(import|from|const|export|async|await|function|return|interface|type|let|var|new|as|default)\b/
    );
    if (keywordMatch) {
      tokens.push({ type: 'keyword', value: keywordMatch[0] });
      i += keywordMatch[0].length;
      continue;
    }

    // Numbers
    if (/\d/.test(code[i])) {
      let end = i;
      while (end < code.length && /\d/.test(code[end])) end++;
      tokens.push({ type: 'number', value: code.slice(i, end) });
      i = end;
      continue;
    }

    // Identifiers & functions
    if (/[a-zA-Z_$]/.test(code[i])) {
      let end = i;
      while (end < code.length && /[a-zA-Z0-9_$]/.test(code[end])) end++;
      const word = code.slice(i, end);
      if (/^[A-Z]/.test(word) || (end < code.length && (code[end] === '(' || code[end] === '.'))) {
        tokens.push({ type: 'function', value: word });
      } else {
        tokens.push({ type: 'identifier', value: word });
      }
      i = end;
      continue;
    }

    tokens.push({ type: 'other', value: code[i] });
    i += 1;
  }

  const colorMap: Record<string, string> = {
    keyword: '#c792ea',
    string: '#c3e88d',
    comment: '#546e7a',
    number: '#ffcb6b',
    function: '#82aaff',
    identifier: '#f8f8f2',
    other: '#f8f8f2',
  };

  return (
    <>
      {tokens.map((token, idx) => (
        <span key={idx} style={{ color: colorMap[token.type] }}>
          {token.value}
        </span>
      ))}
    </>
  );
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

  const customTemplate: PlatformConfig = {
    id: '__custom__', name: 'Custom HMAC', svgName: '', secretEnv: 'HMAC_SECRET', isCustom: true,
  };
  const allPlatforms = [...PLATFORMS, ...customPlatforms, customTemplate];
  const currentPlatform = allPlatforms.find(p => p.id === selectedPlatform) ?? PLATFORMS[0];
  const codeSnippet = buildSnippet(currentPlatform, selectedFramework);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddCustom = () => {
    if (!customName.trim()) return;
    const id = customName.toLowerCase().replace(/\s+/g, '_');
    const newPlatform: PlatformConfig = {
      id,
      name: customName,
      svgName: '',
      secretEnv: `${id.toUpperCase()}_WEBHOOK_SECRET`,
      isCustom: true,
    };
    setCustomPlatforms(prev => [...prev, newPlatform]);
    setSelectedPlatform(id);
    setCustomName('');
    setCustomSecret('');
    setShowCustomDialog(false);
  };

  const handleRemoveCustom = (id: string) => {
    setCustomPlatforms(prev => prev.filter(p => p.id !== id));
    if (selectedPlatform === id) setSelectedPlatform('stripe');
  };

  return (
    <section className="t-webhook-section" id="usage">
      <div className="t-webhook-inner">

        {/* Header */}
        <div className="t-webhook-header">
          <div className="t-section-label">Usage</div>
          <h2 className="t-h2">Pick a platform,<br /><em>get your snippet.</em></h2>
          <p className="t-section-desc">
            Real, working code for every supported platform and framework. Copy and paste — no adapting needed.
          </p>
        </div>

        {/* Grid */}
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

          {/* ── RIGHT: terminal ── */}
          <div className="t-code-viewer">

            {/* titlebar: window dots + framework tabs + copy */}
            <div className="t-code-titlebar">
              <div className="t-wh-dots">
                <span className="t-wh-dot" style={{ background: '#ff6058' }} />
                <span className="t-wh-dot" style={{ background: '#ffbd2e' }} />
                <span className="t-wh-dot" style={{ background: '#29c440' }} />
              </div>
              <div className="t-framework-tabs">
                {FRAMEWORKS.map(fw => (
                  <button
                    key={fw.id}
                    className={`t-framework-tab${selectedFramework === fw.id ? ' active' : ''}`}
                    onClick={() => setSelectedFramework(fw.id)}
                  >
                    {fw.label}
                  </button>
                ))}
              </div>
              {/* copy always in titlebar so it's always visible against dark bg */}
              <button className="t-copy-btn" onClick={handleCopy}>
                {copied ? <><Check size={13} />Copied!</> : <><Copy size={13} />Copy</>}
              </button>
            </div>

            {/* code with syntax highlighting */}
            <div className="t-code-content">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                <SyntaxHighlight code={codeSnippet} />
              </pre>
            </div>

            {/* status bar */}
            <div className="t-code-status">
              <span className="t-status-platform">
                {currentPlatform.name}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--mono)', fontSize: 10 }}>
                {FRAMEWORKS.find(f => f.id === selectedFramework)?.label}
              </span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: '#86efac' }}>✓</span> signature verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom provider dialog */}
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
                  onKeyDown={e => e.key === 'Enter' && handleAddCustom()}
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
                <button onClick={handleAddCustom} className="t-webhook-btn-primary" disabled={!customName.trim()}>
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

        /* sidebar — untouched from previous */
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

        /* ── TERMINAL / CODE VIEWER ── */
        .t-code-viewer {
          display: flex;
          flex-direction: column;
          background: var(--ink);
        }

        /* titlebar — window chrome + tabs + copy */
        .t-code-titlebar {
          display: flex;
          align-items: center;
          background: #2a2520;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 14px;
          height: 44px;
          flex-shrink: 0;
          gap: 0;
        }

        .t-wh-dots { display:flex; gap:6px; margin-right:14px; flex-shrink:0; }
        .t-wh-dot  { width:10px; height:10px; border-radius:50%; display:block; }

        /* framework tabs live in titlebar */
        .t-framework-tabs {
          display: flex;
          flex: 1;
          overflow-x: auto;
          gap: 0;
          height: 100%;
          align-items: flex-end;
        }
        .t-framework-tab {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.3);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 0 13px;
          height: 44px;
          cursor: pointer;
          transition: color 0.12s;
          white-space: nowrap;
          position: relative;
          top: 1px;
        }
        .t-framework-tab:hover { color: rgba(255,255,255,0.6); }
        .t-framework-tab.active {
          color: #82aaff;
          border-bottom-color: #82aaff;
        }

        /* copy button — always against dark titlebar, always visible */
        .t-copy-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          margin-left: 12px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 4px;
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: all 0.15s;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .t-copy-btn:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.24);
          color: white;
        }

        /* code body */
        .t-code-content {
          flex: 1;
          padding: 18px 22px;
          background: var(--ink);
          font-family: 'JetBrains Mono', 'Monaco', 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.75;
          overflow-x: auto;
          overflow-y: auto;
        }

        /* status bar */
        .t-code-status {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 18px;
          background: #1e1c18;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          font-family: var(--mono);
          font-size: 10px;
        }
        .t-status-platform {
          color: #c3e88d;
          background: rgba(195,232,141,0.1);
          border: 1px solid rgba(195,232,141,0.2);
          border-radius: 100px;
          padding: 3px 9px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* dialog */
        .t-webhook-dialog-overlay {
          position:fixed; inset:0;
          background:rgba(26,23,20,0.52);
          display:flex; align-items:center; justify-content:center;
          z-index:1000; padding:20px;
        }
        .t-webhook-dialog {
          background:white;
          border:1.5px solid var(--border2);
          border-radius:12px;
          box-shadow:0 20px 60px rgba(26,23,20,0.2);
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
    </section>
  );
}