"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);

  if (!project) return null;
  const images = project.images?.length ? project.images : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl glass border border-white/10 bg-base"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
          >
            <X size={18} />
          </button>

          {images.length > 0 && (
            <div className="relative h-64 md:h-80">
              <img src={images[imgIdx]} alt={project.title} className="h-full w-full object-cover" />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === imgIdx ? "w-5 bg-brand-cyan" : "w-1.5 bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-6">
            <h2 className="font-display font-bold text-2xl mb-2">{project.title}</h2>
            <p className="text-ink-muted leading-relaxed mb-5">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs font-mono text-brand-cyan">
                  {tech}
                </span>
              ))}
            </div>

            {project.features?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {project.features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-ink-muted"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient shrink-0" />
                      {f}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2.5 text-sm font-medium text-white"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-medium"
                >
                  <Github size={15} /> Source Code
                </a>
              )}
              {project.videoLink && (
                <a
                  href={project.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-medium"
                >
                  <PlayCircle size={15} /> Video Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
