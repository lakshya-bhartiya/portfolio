import { Trophy } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "../Reveal";
import { Counter } from "../Counter";
import type { Achievement } from "@/lib/types";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const sorted = [...achievements].sort((a, b) => a.order - b.order);
  if (sorted.length === 0) return null;

  return (
    <section id="achievements" className="section-pad relative">
      <div className="absolute inset-0 bg-aurora opacity-40" />
      <div className="container relative">
        <Reveal>
          <p className="font-mono text-sm text-brand-cyan mb-2">07 — By the numbers</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">Achievements</h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {sorted.map((a) => (
            <StaggerItem key={a._id}>
              <div className="rounded-xl glass glow-border p-6 text-center h-full">
                <Trophy size={20} className="text-brand-cyan mx-auto mb-3" />
                <p className="font-display font-bold text-3xl md:text-4xl text-gradient">
                  <Counter value={a.value} suffix={a.suffix} />
                </p>
                <p className="text-sm text-ink-muted mt-2">{a.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
