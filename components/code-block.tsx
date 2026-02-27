"use client";

import { useState } from "react";

// ─── SYNTAX HIGHLIGHTER ───────────────────────────────────────────────────────
// Matches the exact color scheme from page.tsx hero code card.
// Handles TypeScript/shell without a heavy library dependency.

type Token = { text: string; cls: string };

function tokenize(code: string): Token[][] {
  const lines = code.split("\n");
  return lines.map((line) => tokenizeLine(line));
}

function tokenizeLine(line: string): Token[] {
  // Shell lines (start with # or $)
  if (/^\s*#/.test(line)) return [{ text: line, cls: "cc" }]; // comment
  if (/^\s*\$/.test(line)) {
    const dollarIdx = line.indexOf("$");
    return [
      { text: line.slice(0, dollarIdx + 1), cls: "ct" },
      { text: line.slice(dollarIdx + 1), cls: "cs" },
    ];
  }

  const tokens: Token[] = [];
  let rest = line;

  // Simple token rules — order matters
  const rules: Array<{ re: RegExp; cls: string }> = [
    // inline comments
    { re: /^(\/\/[^\n]*)/, cls: "cc" },
    // strings
    { re: /^('[^']*'|"[^"]*"|`[^`]*`)/, cls: "cs" },
    // keywords
    {
      re: /^(import|export|from|const|let|var|async|await|return|if|else|new|typeof|void|true|false|null|undefined)\b/,
      cls: "ck",
    },
    // function calls / identifiers before (
    { re: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/, cls: "cf" },
    // object keys (word followed by :)
    { re: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*:)/, cls: "co" },
    // env vars ALL_CAPS
    { re: /^([A-Z_]{3,})/, cls: "co" },
    // default text
    { re: /^([a-zA-Z_$][a-zA-Z0-9_$.]*)/, cls: "ct" },
    // numbers
    { re: /^(\d+)/, cls: "ct" },
    // punctuation / operators
    { re: /^([{}()[\],;=><|&!+\-*/%^~?.:@\\]+)/, cls: "ct" },
    // whitespace
    { re: /^(\s+)/, cls: "" },
    // fallback single char
    { re: /^(.)/, cls: "ct" },
  ];

  while (rest.length > 0) {
    let matched = false;
    for (const { re, cls } of rules) {
      const m = rest.match(re);
      if (m) {
        tokens.push({ text: m[0], cls });
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ text: rest[0], cls: "ct" });
      rest = rest.slice(1);
    }
  }
  return tokens;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
interface CodeBlockProps {
  code: string;
  filename?: string;
}

const COPY_ICON = (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <rect x="4.5" y="1" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1 5h4v8h7v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const CHECK_ICON = (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l3.5 3.5L12 4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CodeBlock({ code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenized = tokenize(code);

  return (
    <div className="t-code-block" style={{ position: "relative" }}>
      {/* macOS bar */}
      <div className="t-code-bar">
        <div className="t-dots">
          <div className="t-dot" style={{ background: "#ff6058" }} />
          <div className="t-dot" style={{ background: "#ffbd2e" }} />
          <div className="t-dot" style={{ background: "#29c440" }} />
        </div>
        {filename && (
          <span className="t-code-filename">{filename}</span>
        )}
        {/* Copy button */}
        <button
          onClick={copy}
          title="Copy code"
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: copied ? "#10b981" : "rgba(255,255,255,.3)",
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
            fontSize: 10,
            letterSpacing: ".06em",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => {
            if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.7)";
          }}
          onMouseLeave={(e) => {
            if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.3)";
          }}
        >
          {copied ? CHECK_ICON : COPY_ICON}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body with syntax highlighting */}
      <div
        className="t-code-body"
        style={{
          fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
          fontSize: 12,
          lineHeight: 1.75,
          padding: "20px 22px",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        {tokenized.map((lineTokens, li) => (
          <div key={li}>
            {lineTokens.map((tok, ti) =>
              tok.cls ? (
                <span key={ti} className={tok.cls}>
                  {tok.text}
                </span>
              ) : (
                tok.text
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}