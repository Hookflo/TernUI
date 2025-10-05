'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Github, Zap, Code, Package, Star, Settings, Shield } from "lucide-react";

const features = [
  {
    icon: <Code className="w-6 h-6 text-primary" />,
    title: "Multiple Algorithms",
    description: "Supports HMAC-SHA1, HMAC-SHA256, and custom verification methods."
  },
  {
    icon: <Settings className="w-6 h-6 text-primary" />,
    title: "Easy Integration",
    description: "Simple API that works with any web framework or platform."
  },
  {
    icon: <Package className="w-6 h-6 text-primary" />,
    title: "Zero Dependencies",
    description: "Lightweight with no external dependencies for minimal bundle size."
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-sm font-medium">
          <Link
            href="https://github.com/Hookflo/tern"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline inline-flex items-center gap-1"
          >
            <Star className="w-4 h-4" />
            Star us on GitHub
          </Link>{' '}
          for the latest updates on Tern - Algorithm Agnostic Webhook Verification
        </p>
      </div>

      {/* Navigation */}
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Tern</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#documentation" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full text-xs font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Algorithm Agnostic Webhook Verification</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Secure Webhook Verification, <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Tern provides robust, algorithm-agnostic webhook verification for modern applications.
              Support multiple platforms and signature algorithms out of the box.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Zap className="w-5 h-5" />
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <Link href="https://github.com/Hookflo/tern" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Tern?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with developers in mind, Tern simplifies webhook verification so you can focus on building great products.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tern. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
