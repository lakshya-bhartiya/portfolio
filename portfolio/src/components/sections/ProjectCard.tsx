"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Info } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, onDetails }: { project: Project; onDetails: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    setSpot({ x: px * 100, y: py * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group relative rounded-xl glass glow-border overflow-hidden"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(300px circle at ${spot.x}% ${spot.y}%, rgba(6,182,212,0.15), transparent 70%)`,
        }}
      />

      {project.images?.[0] && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base/80 to-transparent" />
        </div>
      )}

      <div className="p-5">
        <h3 className="font-display font-semibold text-lg mb-1.5">{project.title}</h3>
        <p className="text-sm text-ink-muted line-clamp-2 mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-mono text-brand-cyan">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            data-cursor-hover
            onClick={onDetails}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-medium transition-colors"
          >
            <Info size={13} /> Details
          </button>
          {project.liveLink && (
            <a
              data-cursor-hover
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gradient px-3 py-2 text-xs font-medium text-white"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
          {project.githubLink && (
            <a
              data-cursor-hover
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-medium transition-colors"
            >
              <Github size={13} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
