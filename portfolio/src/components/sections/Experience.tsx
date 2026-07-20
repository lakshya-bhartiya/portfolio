import { Briefcase } from "lucide-react";
import { Reveal } from "../Reveal";
import type { Experience } from "@/lib/types";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  const sorted = [...experience].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="section-pad relative">
      <div className="container">
        <Reveal>
          <p className="font-mono text-sm text-brand-cyan mb-2">03 — Where I&apos;ve worked</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">Experience</h2>
        </Reveal>

        {sorted.length === 0 ? (
          <p className="text-ink-dim text-sm">No experience entries yet.</p>
        ) : (
          <div className="relative max-w-3xl">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-blue via-brand-cyan to-brand-violet" />
            <div className="space-y-10">
              {sorted.map((exp, i) => (
                <Reveal key={exp._id} variant="slide-right" delay={i * 0.1} className="relative pl-10">
                  <span className="absolute left-0 top-1 h-8 w-8 rounded-full bg-base border-2 border-brand-cyan flex items-center justify-center">
                    <Briefcase size={14} className="text-brand-cyan" />
                  </span>
                  <div className="rounded-xl glass p-5 hover:border-brand-cyan/40 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-display font-semibold text-lg">{exp.role}</h3>
                      <span className="text-xs font-mono text-ink-dim">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-brand-cyan mb-3">
                      {exp.company} {exp.location && `· ${exp.location}`}
                    </p>
                    <ul className="space-y-1.5">
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="text-sm text-ink-muted flex gap-2">
                          <span className="text-brand-cyan mt-1.5 h-1 w-1 rounded-full bg-brand-cyan shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
