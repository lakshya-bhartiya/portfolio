"use client";

import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";
import type { Hero } from "@/lib/types";

const socialIcons: Record<string, any> = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram };

export function Footer({ hero }: { hero: Hero }) {
  return (
    <footer className="relative border-t border-white/5 mt-10">
      <div className="absolute inset-x-0 -top-px h-px bg-brand-gradient bg-[length:200%_auto] animate-gradient-shift" />
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-lg">
            <span className="text-gradient">{hero.name}</span>
          </p>
          <p className="text-xs text-ink-dim mt-1">
            © {new Date().getFullYear()} {hero.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {Object.entries(hero.socialLinks || {}).map(([key, url]) => {
            if (!url) return null;
            const Icon = socialIcons[key];
            if (!Icon) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg glass flex items-center justify-center hover:text-brand-cyan hover:scale-110 transition-all"
              >
                <Icon size={15} />
              </a>
            );
          })}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-9 w-9 rounded-lg glass flex items-center justify-center hover:text-brand-cyan hover:scale-110 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
