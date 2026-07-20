"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Download, Mail, FolderOpen, ChevronDown } from "lucide-react";
import { ParticlesBackground } from "../ParticlesBackground";
import type { Hero as HeroType } from "@/lib/types";

const Scene3D = dynamic(() => import("../Scene3D"), { ssr: false });

const socialIcons: Record<string, any> = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram };

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-brand-cyan ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

export function HeroSection({ hero }: { hero: HeroType }) {
  const nameLetters = hero.name.split("");

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Aurora gradient backdrop */}
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-brand-violet/20 blur-3xl animate-blob [animation-delay:4s]" />
      <ParticlesBackground density={50} className="opacity-60" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-brand-cyan mb-4"
          >
            Hi, I&apos;m
          </motion.p>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 flex flex-wrap">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5, ease: "easeOut" }}
                className={letter === " " ? "w-3" : "text-gradient"}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <div className="h-8 mb-6">
            <p className="font-mono text-lg md:text-xl text-ink-muted">
              <TypingText text={hero.role} />
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-ink-muted max-w-lg mb-8 leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <a
              data-cursor-hover
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-lg bg-brand-gradient bg-[length:200%_auto] hover:bg-right transition-all duration-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25"
            >
              <FolderOpen size={16} />
              {hero.ctaButtons?.viewProjectsLabel || "View Projects"}
            </a>
            {hero.resumeUrl && (
              <a
                data-cursor-hover
                href={hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg glass px-5 py-3 text-sm font-semibold hover:border-brand-cyan/50 transition-colors"
              >
                <Download size={16} />
                {hero.ctaButtons?.resumeLabel || "Download Resume"}
              </a>
            )}
            <a
              data-cursor-hover
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-lg glass px-5 py-3 text-sm font-semibold hover:border-brand-cyan/50 transition-colors"
            >
              <Mail size={16} />
              {hero.ctaButtons?.contactLabel || "Contact Me"}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex gap-3"
          >
            {Object.entries(hero.socialLinks || {}).map(([key, url]) => {
              if (!url) return null;
              const Icon = socialIcons[key];
              if (!Icon) return null;
              return (
                <a
                  key={key}
                  data-cursor-hover
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg glass flex items-center justify-center hover:text-brand-cyan hover:scale-110 transition-all"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative h-[380px] md:h-[480px] hidden md:block"
        >
          <Scene3D />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-dim"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
