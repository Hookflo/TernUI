"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, Star } from "lucide-react";
import Link from "next/link";

export function TernBottomBanner() {
  return (
    <section
      aria-labelledby="tern-bottom-banner"
      className="mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="rounded-2xl border border-dashed bg-accent/40 shadow-sm">
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Message */}
          <div className="space-y-5">
            <h2
              id="tern-bottom-banner"
              className="font-serif text-3xl leading-tight text-balance"
            >
              Liked Tern?{" "}
              <span className="text-muted-foreground font-normal">
                Show some love on GitHub
              </span>
            </h2>

            <p className="text-muted-foreground text-pretty">
              Your support helps shape Tern’s next updates like{" "}
              <span className="font-medium text-foreground">
                schema normalization
              </span>
              , unifying webhook payloads across platforms for a smoother dev
              experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button className="shadow-sm" asChild>
                <Link
                  href="https://github.com/Hookflo/tern"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Star className="w-4 h-4 fill-yellow-400" />
                  Star on GitHub
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link
                  href="https://hookflo.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Hookflo
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Thoughtful progress — reimagining webhooks for modern teams.
            </p>
          </div>

          {/* Right: Roadmap Card */}
          <div className="relative">
            <div className="rounded-lg border border-dashed bg-card p-5 md:p-6 shadow-sm">
              <h4 className="text-base font-semibold mb-3 text-foreground">
                What’s next
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black/70" />
                  Schema normalization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black/70" />
                  More platform presets
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black/70" />
                  Single Command Setup with CLI
                </li>
              </ul>
            </div>

            <span className="absolute -top-3 left-3 rotate-[-4deg] rounded bg-accent px-2 py-1 text-[11px]">
              built with care
            </span>
            <span className="absolute -bottom-3 right-3 rotate-[3deg] rounded border border-dashed bg-secondary/70 px-2 py-1 text-[11px]">
              open & evolving
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
