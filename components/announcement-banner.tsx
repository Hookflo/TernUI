"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function AnnouncementBanner() {
  const [hidden, setHidden] = useState<boolean | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem("tern-upstash-banner-dismissed");
    setHidden(dismissed === "1");
  }, []);

  if (hidden !== false) {
    return null;
  }

  return (
    <div className="announcement">
      <div>
        🎉 Tern × Upstash — Guaranteed delivery now in beta · Queue · Retry · DLQ · Dedup · BYOK
      </div>
      <div className="announcement-actions">
        <Link href="/upstash">Learn more →</Link>
        <button
          onClick={() => {
            localStorage.setItem("tern-upstash-banner-dismissed", "1");
            setHidden(true);
          }}
          aria-label="Dismiss announcement"
        >
          ×
        </button>
      </div>
    </div>
  );
}
