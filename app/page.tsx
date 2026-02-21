'use client';

import { LeafLogo } from '../components/leaf-logo';
import { Copy } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[rgba(247,244,239,0.92)] backdrop-blur-md border-b border-[#d8d0c4] px-4 md:px-8 lg:px-16 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline text-[#1a1714]">
          <div className="w-7 h-7 border-[1.5px] border-[#1a1714] rounded-sm flex items-center justify-center flex-shrink-0">
            <LeafLogo className="w-4 h-4" />
          </div>
          <span className="font-mono text-sm font-bold uppercase tracking-wide">Tern</span>
        </Link>

        <ul className="flex items-center gap-8 list-none">
          <li>
            <a href="#" className="font-mono text-xs font-medium text-[#6b6358] no-underline transition-colors hover:text-[#1a1714]">
              Docs
            </a>
          </li>
          <li>
            <a href="#" className="font-mono text-xs font-medium text-[#6b6358] no-underline transition-colors hover:text-[#1a1714]">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="font-mono text-xs font-medium text-[#6b6358] no-underline transition-colors hover:text-[#1a1714]">
              GitHub
            </a>
          </li>
        </ul>

        <button className="font-mono text-xs font-medium uppercase text-[#1a1714] bg-white border border-[#d8d0c4] px-4 py-2 rounded-sm hover:bg-[#f0ebe2] transition-colors">
          Sign In
        </button>
      </nav>

      {/* HERO */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1714] mb-6 leading-tight">
            Craft beautiful, accessible UI with zero bloat
          </h1>
          <p className="text-lg md:text-xl text-[#6b6358] font-serif mb-8 leading-relaxed max-w-2xl">
            TernUI gives you the perfect balance between control and simplicity. Build faster, maintain easier.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="font-mono text-sm font-bold uppercase bg-[#1a1714] text-white px-6 py-3 rounded-sm hover:bg-[#3d3830] transition-colors">
              Get Started
            </button>
            <button className="font-mono text-sm font-bold uppercase bg-white border border-[#d8d0c4] text-[#1a1714] px-6 py-3 rounded-sm hover:bg-[#f0ebe2] transition-colors">
              View Docs
            </button>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#f0ebe2] border-t border-[#d8d0c4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-mono font-bold uppercase text-[#6b6358] tracking-wide mb-12">
            Works with your stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['React', 'Next.js', 'Vue', 'Svelte', 'Tailwind', 'Radix'].map((platform) => (
              <div key={platform} className="flex items-center justify-center p-4 bg-white rounded-sm border border-[#d8d0c4] hover:border-[#1a1714] transition-colors">
                <span className="font-serif text-[#3d3830] font-medium">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white border-t border-[#d8d0c4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1714] mb-16">
            Everything you need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Lightweight', desc: 'Minimal CSS, maximum control' },
              { title: 'Accessible', desc: 'Built with WCAG standards' },
              { title: 'Customizable', desc: 'Adapt to your brand' },
              { title: 'Well Documented', desc: 'Clear, practical guides' },
              { title: 'Type Safe', desc: 'Full TypeScript support' },
              { title: 'Open Source', desc: 'Community-driven development' }
            ].map((feature) => (
              <div key={feature.title} className="p-6 border border-[#d8d0c4] rounded-sm hover:border-[#1a1714] transition-colors">
                <h3 className="font-serif text-lg font-bold text-[#1a1714] mb-2">
                  {feature.title}
                </h3>
                <p className="font-serif text-[#6b6358]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#f7f4ef] border-t border-[#d8d0c4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1714] mb-16">
            Get started in minutes
          </h2>
          <div className="space-y-8">
            {[
              { step: '01', title: 'Install', code: 'npm install ternui' },
              { step: '02', title: 'Import', code: 'import { Button } from "ternui"' },
              { step: '03', title: 'Use', code: '<Button>Click me</Button>' }
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <div className="font-serif text-3xl font-bold text-[#d8d0c4] min-w-16">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-[#1a1714] mb-3">
                    {item.title}
                  </h3>
                  <div className="bg-[#1a1714] text-white px-4 py-3 rounded-sm font-mono text-sm flex items-center justify-between">
                    <code>{item.code}</code>
                    <button
                      onClick={() => copyToClipboard(item.code)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#1a1714] border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to build something great?
          </h2>
          <p className="text-lg font-serif text-[rgba(255,255,255,0.7)] mb-8 max-w-2xl mx-auto">
            Join thousands of developers building with TernUI. Get started for free.
          </p>
          <button className="font-mono text-sm font-bold uppercase bg-white text-[#1a1714] px-8 py-3 rounded-sm hover:bg-[#f7f4ef] transition-colors">
            Start Building
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1714] border-t border-[rgba(255,255,255,0.1)] py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-white rounded-sm flex items-center justify-center">
              <LeafLogo className="w-3 h-3 text-white" />
            </div>
            <span className="font-mono text-white text-sm font-bold">TernUI</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-mono text-xs text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
              Documentation
            </a>
            <a href="#" className="font-mono text-xs text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="font-mono text-xs text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="font-mono text-xs text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <p className="font-mono text-xs text-[rgba(255,255,255,0.6)]">
            © 2024 TernUI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
