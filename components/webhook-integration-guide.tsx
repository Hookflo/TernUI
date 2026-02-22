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

function buildSnippet(platform: PlatformConfig, framework: Framework): string {
  const { id, secretEnv, isCustom } = platform;

  if (framework === 'nextjs') {
    if (isCustom) return `import { createWebhookHandler } from '@hookflo/tern/nextjs';\n\n// app/api/webhooks/route.ts\nexport const POST = createWebhookHandler({\n  platform: 'custom',\n  secret:   process.env.${secretEnv}!,\n  signatureConfig: {\n    algorithm:       'hmac-sha256',\n    signatureHeader: 'x-signature',\n    signaturePrefix: 'sha256=',\n    timestampHeader: 'x-timestamp',\n  },\n  handler: async (payload) => {\n    // ✓ verified — handle your event\n    return { received: true };\n  },\n});`;

    return `import { createWebhookHandler } from '@hookflo/tern/nextjs';\n\n// app/api/webhooks/${id}/route.ts\nexport const POST = createWebhookHandler({\n  platform: '${id}',\n  secret:   process.env.${secretEnv}!,\n  handler:  async (payload) => {\n    // ✓ verified — handle your event\n    return { received: true };\n  },\n});`;
  }

  if (framework === 'express') {
    if (isCustom) return `import { handleWebhook } from '@hookflo/tern/express';\n\napp.post('/webhooks', handleWebhook({\n  platform: 'custom',\n  secret: process.env.${secretEnv},\n  signatureConfig: {\n    algorithm: 'hmac-sha256',\n    signatureHeader: 'x-signature',\n    signaturePrefix: 'sha256=',\n    timestampHeader: 'x-timestamp',\n  },\n  handler: async (req, res, payload) => {\n    // ✓ verified — handle your event\n    return res.json({ received: true });\n  },\n}));`;

    return `import { handleWebhook } from '@hookflo/tern/express';\n\napp.post('/webhooks/${id}', handleWebhook({\n  platform: '${id}',\n  secret: process.env.${secretEnv},\n  handler: async (req, res, payload) => {\n    // ✓ verified — handle your event\n    return res.json({ received: true });\n  },\n}));`;
  }

  if (framework === 'cloudflare') {
    if (isCustom) return `import { handleWebhook } from '@hookflo/tern/cloudflare';\n\nexport default {\n  fetch: handleWebhook({\n    platform: 'custom',\n    secret: env.${secretEnv},\n    signatureConfig: {\n      algorithm: 'hmac-sha256',\n      signatureHeader: 'x-signature',\n      signaturePrefix: 'sha256=',\n      timestampHeader: 'x-timestamp',\n    },\n    handler: async (payload) => {\n      // ✓ verified — handle your event\n      return new Response(JSON.stringify({ received: true }), { status: 200 });\n    },\n  }),\n};`;

    return `import { handleWebhook } from '@hookflo/tern/cloudflare';\n\nexport default {\n  fetch: handleWebhook({\n    platform: '${id}',\n    secret: env.${secretEnv},\n    handler: async (payload) => {\n      // ✓ verified — handle your event\n      return new Response(JSON.stringify({ received: true }), { status: 200 });\n    },\n  }),\n};`;
  }

  // Core SDK
  return `import { WebhookVerificationService } from '@hookflo/tern';\n\nconst ${id.charAt(0).toUpperCase() + id.slice(1)}Config = {\n  platform: '${id}',\n  secret: process.env.${secretEnv}!,\n  toleranceInSeconds: 300,\n};\n\nconst result = await WebhookVerificationService.verify(\n  request,\n  ${id.charAt(0).toUpperCase() + id.slice(1)}Config\n);`;
}

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

    // Strings with single, double, or backticks
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
    const keywordMatch = code.slice(i).match(/^(import|from|const|export|async|await|function|return|interface|type|let|var|new|as|default)\b/);
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

    // Identifiers and properties
    if (/[a-zA-Z_$]/.test(code[i])) {
      let end = i;
      while (end < code.length && /[a-zA-Z0-9_$]/.test(code[end])) end++;
      const word = code.slice(i, end);
      
      // Check if it's a class/function (capitalized or followed by parenthesis/dot)
      if (/^[A-Z]/.test(word) || (end < code.length && (code[end] === '(' || code[end] === '.'))) {
        tokens.push({ type: 'function', value: word });
      } else {
        tokens.push({ type: 'identifier', value: word });
      }
      i = end;
      continue;
    }

    // Everything else
    tokens.push({ type: 'other', value: code[i] });
    i += 1;
  }

  return (
    <>
      {tokens.map((token, idx) => {
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
          <span key={idx} style={{ color: colorMap[token.type] }}>
            {token.value}
          </span>
        );
      })}
    </>
  );
}

export default function WebhookIntegrationGuide() {
  const [selectedPlatform, setSelectedPlatform] = useState('stripe');
  const [selectedFramework, setSelectedFramework] = useState<Framework>('nextjs');
  const [customPlatforms, setCustomPlatforms] = useState<PlatformConfig[]>([]);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customSecret, setCustomSecret] = useState('');
  const [copied, setCopied] = useState(false);

  const allPlatforms = [...PLATFORMS, ...customPlatforms];
  const currentPlatform = allPlatforms.find((p) => p.id === selectedPlatform) || PLATFORMS[0];
  const codeSnippet = buildSnippet(currentPlatform, selectedFramework);

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
    setCustomPlatforms([...customPlatforms, newPlatform]);
    setSelectedPlatform(id);
    setCustomName('');
    setShowCustomDialog(false);
  };

  const handleRemoveCustom = (id: string) => {
    setCustomPlatforms(customPlatforms.filter((p) => p.id !== id));
    if (selectedPlatform === id) {
      setSelectedPlatform('stripe');
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="t-usage-section">
      <style>{`
        .t-usage-section {
          padding: 60px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .t-usage-title {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--ink);
        }

        .t-usage-subtitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 48px;
          line-height: 1.6;
        }

        .t-usage-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 32px;
          align-items: flex-start;
        }

        .t-platform-selector {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .t-platform-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          border: 1px solid #e5e5e5;
          background: white;
          transition: all 0.2s ease;
          font-size: 14px;
          color: var(--ink);
        }

        .t-platform-card:hover {
          border-color: var(--ink);
          background: #f9f9f9;
        }

        .t-platform-card.active {
          background: var(--ink);
          color: white;
          border-color: var(--ink);
        }

        .t-platform-card img {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .t-add-custom-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border: 2px dashed #d0d0d0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          transition: all 0.2s ease;
          margin-top: 12px;
        }

        .t-add-custom-btn:hover {
          border-color: var(--ink);
          color: var(--ink);
        }

        .t-code-viewer {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          border: 1px solid #e5e5e5;
          background: white;
          overflow: hidden;
        }

        .t-framework-tabs {
          display: flex;
          border-bottom: 1px solid #e5e5e5;
          background: #f9f9f9;
          gap: 0;
        }

        .t-framework-tab {
          flex: 1;
          padding: 14px 16px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 13px;
          color: #666;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
          font-weight: 500;
        }

        .t-framework-tab:hover {
          color: var(--ink);
          background: white;
        }

        .t-framework-tab.active {
          color: var(--ink);
          border-bottom-color: var(--ink);
          background: white;
        }

        .t-code-block {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .t-code-content {
          flex: 1;
          padding: 20px;
          background: var(--ink);
          color: #f8f8f2;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.7;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .t-code-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: #1a1a1a;
          font-size: 12px;
          color: #999;
        }

        .t-copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: transparent;
          color: #f8f8f2;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .t-copy-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .t-custom-dialog {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .t-custom-dialog-content {
          background: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .t-custom-dialog-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--ink);
        }

        .t-custom-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .t-custom-input:focus {
          outline: none;
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .t-custom-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .t-custom-actions button {
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .t-custom-actions .cancel {
          background: #f5f5f5;
          color: #666;
        }

        .t-custom-actions .cancel:hover {
          background: #e5e5e5;
        }

        .t-custom-actions .confirm {
          background: var(--ink);
          color: white;
        }

        .t-custom-actions .confirm:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .t-usage-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .t-usage-title {
            font-size: 24px;
          }

          .t-framework-tabs {
            flex-wrap: wrap;
          }

          .t-framework-tab {
            flex: auto;
            padding: 12px 14px;
            font-size: 12px;
          }
        }
      `}</style>

      <h2 className="t-usage-title">Webhook Integration Guide</h2>
      <p className="t-usage-subtitle">Copy & paste ready code snippets for your framework</p>

      <div className="t-usage-container">
        {/* Left Sidebar */}
        <div>
          <div className="t-platform-selector">
            {allPlatforms.map((platform) => (
              <div key={platform.id}>
                <button
                  className={`t-platform-card ${selectedPlatform === platform.id ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  {platform.svgName && (
                    <img src={`/assets/${platform.svgName}`} alt="" />
                  )}
                  <span>{platform.name}</span>
                  {platform.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCustom(platform.id);
                      }}
                      style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </button>
              </div>
            ))}
          </div>
          <button className="t-add-custom-btn" onClick={() => setShowCustomDialog(true)}>
            <Plus size={16} />
            <span>Add Custom</span>
          </button>
        </div>

        {/* Right Code Viewer */}
        <div className="t-code-viewer">
          <div className="t-framework-tabs">
            {FRAMEWORKS.map((fw) => (
              <button
                key={fw.id}
                className={`t-framework-tab ${selectedFramework === fw.id ? 'active' : ''}`}
                onClick={() => setSelectedFramework(fw.id)}
              >
                {fw.label}
              </button>
            ))}
          </div>
          <div className="t-code-block">
            <div className="t-code-content">
              <SyntaxHighlight code={codeSnippet} />
            </div>
            <div className="t-code-status">
              <span>{currentPlatform.name} • {selectedFramework === 'nextjs' ? 'Next.js' : selectedFramework === 'express' ? 'Express' : selectedFramework === 'cloudflare' ? 'Cloudflare Workers' : 'Core SDK'}</span>
              <button className="t-copy-btn" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Dialog */}
      {showCustomDialog && (
        <div className="t-custom-dialog" onClick={() => setShowCustomDialog(false)}>
          <div className="t-custom-dialog-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="t-custom-dialog-title">Add Custom Webhook</h3>
            <input
              type="text"
              placeholder="Webhook provider name"
              className="t-custom-input"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
            />
            <div className="t-custom-actions">
              <button className="cancel" onClick={() => setShowCustomDialog(false)}>
                Cancel
              </button>
              <button className="confirm" onClick={handleAddCustom}>
                Add Platform
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
