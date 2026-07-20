"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "../Reveal";
import type { Skill } from "@/lib/types";

function ProgressRing({ value }: { value: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg ref={ref} width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
      <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="none" className="text-white/10" />
      <motion.circle
        cx="32"
        cy="32"
        r={radius}
        stroke="url(#ring-gradient)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: isInView ? circumference * (1 - value / 100) : circumference }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = ["Frontend", "Backend", "Database", "Mobile", "Tools", "Other"];
  const grouped = categories
    .map((cat) => ({ cat, items: skills.filter((s) => s.category === cat).sort((a, b) => a.order - b.order) }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="section-pad relative">
      <div className="container">
        <Reveal>
          <p className="font-mono text-sm text-brand-cyan mb-2">02 — What I bring</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">Skills</h2>
        </Reveal>

        <div className="space-y-12">
          {grouped.map(({ cat, items }, gIdx) => (
            <Reveal key={cat} delay={gIdx * 0.05}>
              <h3 className="font-display font-semibold text-lg mb-5 text-ink-muted">{cat}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {items.map((skill, i) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="group rounded-xl glass p-4 flex flex-col items-center text-center hover:border-brand-cyan/40 transition-colors"
                  >
                    <div className="relative flex items-center justify-center">
                      <ProgressRing value={skill.proficiency} />
                      <span className="absolute text-xs font-mono font-semibold">{skill.proficiency}%</span>
                    </div>
                    <p className="mt-2 text-sm font-medium group-hover:text-brand-cyan transition-colors">
                      {skill.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          ))}

          {grouped.length === 0 && <p className="text-ink-dim text-sm">No skills added yet.</p>}
        </div>
      </div>
    </section>
  );
}
