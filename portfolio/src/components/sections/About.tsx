import { GraduationCap, Target, Code2 } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "../Reveal";
import type { About as AboutType } from "@/lib/types";

export function AboutSection({ about }: { about: AboutType }) {
  return (
    <section id="about" className="section-pad relative">
      <div className="container">
        <Reveal>
          <p className="font-mono text-sm text-brand-cyan mb-2">01 — Get to know me</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">About Me</h2>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-10">
          <Reveal variant="slide-right" className="md:col-span-3">
            <p className="text-ink-muted leading-relaxed whitespace-pre-line">{about.bio}</p>

            {about.experienceSummary && (
              <p className="text-ink-muted leading-relaxed mt-4 whitespace-pre-line">{about.experienceSummary}</p>
            )}

            {about.careerGoals && (
              <div className="mt-6 rounded-xl glass glow-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={16} className="text-brand-cyan" />
                  <h3 className="font-semibold text-sm">Career Goals</h3>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{about.careerGoals}</p>
              </div>
            )}

            {about.technologies?.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={16} className="text-brand-cyan" />
                  <h3 className="font-semibold text-sm">Technologies I work with</h3>
                </div>
                <StaggerReveal className="flex flex-wrap gap-2">
                  {about.technologies.map((tech) => (
                    <StaggerItem key={tech}>
                      <span className="inline-block rounded-full glass px-3 py-1.5 text-xs font-medium hover:border-brand-cyan/50 hover:text-brand-cyan transition-colors">
                        {tech}
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            )}
          </Reveal>

          <Reveal variant="slide-left" delay={0.15} className="md:col-span-2">
            <div className="rounded-xl glass p-6">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={18} className="text-brand-cyan" />
                <h3 className="font-semibold">Education</h3>
              </div>
              <div className="space-y-5">
                {about.education?.map((edu, i) => (
                  <div key={i} className="relative pl-5 border-l border-white/10">
                    <span className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-brand-gradient" />
                    <p className="font-medium text-sm">{edu.degree}</p>
                    <p className="text-sm text-ink-muted">{edu.institution}</p>
                    <p className="text-xs text-ink-dim mt-0.5">
                      {edu.year} {edu.grade && `· ${edu.grade}`}
                    </p>
                  </div>
                ))}
                {(!about.education || about.education.length === 0) && (
                  <p className="text-sm text-ink-dim">No education entries yet.</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
