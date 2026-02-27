import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="t-footer">
      <div className="t-footer-inner">
        <div className="t-footer-logo">Tern by Hookflo</div>
        <ul className="t-footer-links">
          <li>
            <a
              href="https://github.com/Hookflo/tern/blob/main/README.md"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </li>
          <li>
            <Link href="/upstash">Reliable Delivery</Link>
          </li>
          <li>
            <Link href="/framework/nextjs">Next.js</Link>
          </li>
          <li>
            <Link href="/framework/cloudflare">Cloudflare</Link>
          </li>
          <li>
            <a
              href="https://github.com/Hookflo/tern"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="https://hookflo.com" target="_blank" rel="noreferrer">
              Hookflo
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Hookflo/tern/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
            >
              MIT License
            </a>
          </li>
        </ul>
        <div className="t-footer-copy">© 2025 Hookflo. Open source.</div>
      </div>
    </footer>
  );
}