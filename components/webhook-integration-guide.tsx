'use client';

import { useState } from 'react';
import { Copy, Check, Plus, X } from 'lucide-react';
import { PLATFORMS, SNIPPETS, type PlatformConfig } from '@/lib/webhook-snippets';

export default function WebhookIntegrationGuide() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('stripe');
  const [selectedFramework, setSelectedFramework] = useState<'nextjs' | 'express' | 'cloudflare'>('nextjs');
  const [copied, setCopied] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customPlatforms, setCustomPlatforms] = useState<PlatformConfig[]>([]);
  const [customName, setCustomName] = useState('');
  const [customSecret, setCustomSecret] = useState('');

  const allPlatforms = [...PLATFORMS, ...customPlatforms];
  const currentPlatform = allPlatforms.find(p => p.id === selectedPlatform);
  const snippetKey = selectedPlatform === 'stripe' ? 'stripe' : selectedPlatform === 'github' ? 'github' : selectedPlatform === 'clerk' ? 'clerk' : undefined;
  const codeSnippet = snippetKey && SNIPPETS[snippetKey] && SNIPPETS[snippetKey][selectedFramework]?.code || '';

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
        icon: '⚙️',
        status: 'active',
        secret: customSecret,
      };
      setCustomPlatforms([...customPlatforms, newPlatform]);
      setSelectedPlatform(newPlatform.id);
      setCustomName('');
      setCustomSecret('');
      setShowCustomDialog(false);
    }
  };

  const handleRemoveCustom = (id: string) => {
    const updatedCustom = customPlatforms.filter(p => p.id !== id);
    setCustomPlatforms(updatedCustom);
    if (selectedPlatform === id) {
      setSelectedPlatform('stripe');
    }
  };

  return (
    <div className="t-webhook-section">
      <div className="t-webhook-inner">
        {/* Section Header */}
        <div className="t-webhook-header">
          <div className="t-section-label">
            <span>WEBHOOK INTEGRATION</span>
          </div>
          <h2 className="t-h2">Verify webhooks in <em>any framework</em></h2>
          <p className="t-section-desc">
            Select a platform, choose your framework, and copy the integration code. Tern handles signature verification across all providers.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="t-webhook-grid">
          {/* Left Sidebar - Platform Selector */}
          <div className="t-webhook-sidebar">
            <div className="t-webhook-platforms">
              {allPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`t-webhook-platform-card ${selectedPlatform === platform.id ? 'active' : ''}`}
                >
                  <span className="t-webhook-icon">{platform.icon}</span>
                  <div className="t-webhook-platform-info">
                    <div className="t-webhook-platform-name">{platform.name}</div>
                    {customPlatforms.some(p => p.id === platform.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCustom(platform.id);
                        }}
                        className="t-webhook-remove-btn"
                        title="Remove custom platform"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </button>
              ))}

              {/* Add Custom Button */}
              <button
                onClick={() => setShowCustomDialog(true)}
                className="t-webhook-add-custom"
              >
                <Plus size={18} />
                <span>Add Custom</span>
              </button>
            </div>
          </div>

          {/* Right Side - Code Viewer */}
          <div className="t-webhook-viewer">
            {/* Framework Tabs */}
            <div className="t-webhook-tabs">
              {(['nextjs', 'express', 'cloudflare'] as const).map((fw) => (
                <button
                  key={fw}
                  onClick={() => setSelectedFramework(fw)}
                  className={`t-webhook-tab ${selectedFramework === fw ? 'active' : ''}`}
                >
                  {fw === 'nextjs' ? 'Next.js' : fw === 'express' ? 'Express' : 'Cloudflare Workers'}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="t-webhook-code-block">
              <div className="t-webhook-code-header">
                <span className="t-webhook-code-label">
                  {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} - {selectedFramework === 'nextjs' ? 'Next.js' : selectedFramework === 'express' ? 'Express' : 'Cloudflare'}
                </span>
                <button
                  onClick={handleCopy}
                  className="t-webhook-copy-btn"
                  title={copied ? 'Copied!' : 'Copy code'}
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="t-webhook-code-pre">
                <code>{codeSnippet || 'Code snippet not available for this platform'}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Webhook Dialog */}
      {showCustomDialog && (
        <div className="t-webhook-dialog-overlay" onClick={() => setShowCustomDialog(false)}>
          <div className="t-webhook-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="t-webhook-dialog-header">
              <h3>Add Custom Webhook Provider</h3>
              <button onClick={() => setShowCustomDialog(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="t-webhook-dialog-body">
              <div className="t-webhook-form-group">
                <label>Provider Name</label>
                <input
                  type="text"
                  placeholder="e.g., Shopify, SendGrid"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="t-webhook-input"
                />
              </div>
              <div className="t-webhook-form-group">
                <label>Webhook Secret</label>
                <input
                  type="password"
                  placeholder="Enter webhook secret"
                  value={customSecret}
                  onChange={(e) => setCustomSecret(e.target.value)}
                  className="t-webhook-input"
                />
              </div>
              <div className="t-webhook-dialog-actions">
                <button
                  onClick={() => setShowCustomDialog(false)}
                  className="t-webhook-btn-secondary"
                >
                  Cancel
                </button>
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
          padding: clamp(50px, 8vw, 90px) clamp(20px, 5vw, 80px);
        }

        .t-webhook-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .t-webhook-header {
          margin-bottom: 48px;
        }

        .t-webhook-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          background: white;
          border: 1.5px solid var(--border2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 4px 5px 0 var(--border);
        }

        @media (max-width: 900px) {
          .t-webhook-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .t-webhook-sidebar {
          border-right: 1.5px solid var(--border2);
          padding: 24px 16px;
          background: var(--paper2);
          max-height: 600px;
          overflow-y: auto;
        }

        @media (max-width: 900px) {
          .t-webhook-sidebar {
            border-right: none;
            border-bottom: 1.5px solid var(--border2);
            padding: 16px;
            max-height: none;
            overflow-y: visible;
          }
        }

        .t-webhook-platforms {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .t-webhook-platform-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          position: relative;
        }

        .t-webhook-platform-card:hover {
          background: var(--paper2);
          border-color: var(--border2);
          box-shadow: 2px 2px 0 var(--border);
        }

        .t-webhook-platform-card.active {
          background: var(--ink);
          border-color: var(--ink);
          color: var(--paper);
        }

        .t-webhook-icon {
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
        }

        .t-webhook-platform-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .t-webhook-platform-name {
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .t-webhook-platform-card.active .t-webhook-platform-name {
          color: var(--paper);
        }

        .t-webhook-remove-btn {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: var(--ink3);
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .t-webhook-remove-btn:hover {
          color: var(--red);
        }

        .t-webhook-add-custom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 14px;
          background: var(--paper2);
          border: 1.5px dashed var(--border2);
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--ink3);
          transition: all 0.2s;
          margin-top: 8px;
        }

        .t-webhook-add-custom:hover {
          background: white;
          border-color: var(--ink3);
          color: var(--ink);
        }

        .t-webhook-viewer {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .t-webhook-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }

        .t-webhook-tab {
          padding: 8px 16px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--ink3);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }

        .t-webhook-tab:hover {
          color: var(--ink);
        }

        .t-webhook-tab.active {
          color: var(--ink);
          border-bottom-color: var(--ink);
        }

        .t-webhook-code-block {
          background: var(--ink);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--ink2);
        }

        .t-webhook-code-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #2a2520;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .t-webhook-code-label {
          font-family: var(--mono);
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .t-webhook-copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .t-webhook-copy-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .t-webhook-code-pre {
          padding: 20px;
          margin: 0;
          font-family: var(--mono);
          font-size: 11px;
          line-height: 1.75;
          color: #f8f8f2;
          overflow-x: auto;
          max-height: 500px;
          overflow-y: auto;
        }

        .t-webhook-code-pre code {
          color: inherit;
          font-family: inherit;
        }

        /* Dialog Styles */
        .t-webhook-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(26, 23, 20, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .t-webhook-dialog {
          background: white;
          border: 1.5px solid var(--border2);
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(26, 23, 20, 0.2);
          max-width: 420px;
          width: 100%;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .t-webhook-dialog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }

        .t-webhook-dialog-header h3 {
          font-family: var(--serif);
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .t-webhook-dialog-header button {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--ink3);
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .t-webhook-dialog-header button:hover {
          color: var(--ink);
        }

        .t-webhook-dialog-body {
          padding: 24px;
        }

        .t-webhook-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .t-webhook-form-group label {
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .t-webhook-input {
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: var(--serif);
          font-size: 14px;
          color: var(--ink);
          background: var(--paper2);
          transition: all 0.2s;
        }

        .t-webhook-input:focus {
          outline: none;
          border-color: var(--ink);
          background: white;
        }

        .t-webhook-dialog-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .t-webhook-btn-primary,
        .t-webhook-btn-secondary {
          padding: 10px 18px;
          border-radius: 4px;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .t-webhook-btn-primary {
          background: var(--ink);
          color: var(--paper);
        }

        .t-webhook-btn-primary:hover:not(:disabled) {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .t-webhook-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .t-webhook-btn-secondary {
          background: var(--paper2);
          color: var(--ink);
          border: 1px solid var(--border);
        }

        .t-webhook-btn-secondary:hover {
          background: var(--border);
          border-color: var(--border2);
        }
      `}</style>
    </div>
  );
}
