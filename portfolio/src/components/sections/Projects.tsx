"use client";

import { useState } from "react";
import { Reveal, StaggerReveal, StaggerItem } from "../Reveal";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const visible = filter === "featured" ? sorted.filter((p) => p.featured) : sorted;

  return (
    <section id="projects" className="section-pad relative">
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-sm text-brand-cyan mb-2">04 — Selected work</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">Featured Projects</h2>
          </div>
          <div className="flex gap-2">
            {(["all", "featured"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  filter === f ? "bg-brand-gradient text-white" : "glass text-ink-muted hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <p className="text-ink-dim text-sm">No projects to show yet.</p>
        ) : (
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project) => (
              <StaggerItem key={project._id}>
                <ProjectCard project={project} onDetails={() => setSelected(project)} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
