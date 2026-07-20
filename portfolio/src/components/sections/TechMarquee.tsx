import type { Skill } from "@/lib/types";

export function TechMarquee({ skills }: { skills: Skill[] }) {
  const names = skills.map((s) => s.name);
  if (names.length === 0) return null;
  const loop = [...names, ...names]; // duplicated for seamless loop

  return (
    <section className="relative py-10 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base to-transparent z-10 hidden dark:block" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent z-10 hidden dark:block" />
      <div className="flex w-max animate-marquee">
        {loop.map((name, i) => (
          <span
            key={i}
            className="mx-6 font-display text-2xl md:text-3xl font-semibold text-ink-dim/40 whitespace-nowrap hover:text-brand-cyan transition-colors"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
