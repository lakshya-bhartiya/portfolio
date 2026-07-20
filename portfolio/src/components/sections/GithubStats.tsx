import { Github } from "lucide-react";
import { Reveal } from "../Reveal";

export function GithubStatsSection({ username }: { username?: string }) {
  if (!username) return null;

  return (
    <section id="github" className="section-pad relative">
      <div className="container">
        <Reveal className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="font-mono text-sm text-brand-cyan mb-2">06 — Always shipping</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">GitHub Activity</h2>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg glass px-4 py-2.5 text-sm font-medium hover:border-brand-cyan/50 transition-colors"
          >
            <Github size={16} /> @{username}
          </a>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Reveal variant="slide-right" className="rounded-xl glass p-3 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=06B6D4&icon_color=8B5CF6&text_color=CBD5E1`}
              alt="GitHub stats"
              className="w-full"
              loading="lazy"
            />
          </Reveal>
          <Reveal variant="slide-left" className="rounded-xl glass p-3 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://streak-stats.demolab.com?user=${username}&theme=transparent&hide_border=true&ring=06B6D4&fire=8B5CF6&currStreakLabel=06B6D4`}
              alt="GitHub streak stats"
              className="w-full"
              loading="lazy"
            />
          </Reveal>
        </div>

        <Reveal className="rounded-xl glass p-4 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=06B6D4&text_color=CBD5E1`}
            alt="Top languages"
            className="mx-auto"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
