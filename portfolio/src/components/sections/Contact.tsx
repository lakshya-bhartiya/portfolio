"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "../Reveal";
import type { ContactInfo } from "@/lib/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function ContactSection({ contact }: { contact: ContactInfo }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/contact/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const infoItems = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    contact.location && { icon: MapPin, label: "Location", value: contact.location, href: undefined },
  ].filter(Boolean) as { icon: any; label: string; value: string; href?: string }[];

  const socials = [
    contact.github && { icon: Github, href: contact.github },
    contact.linkedin && { icon: Linkedin, href: contact.linkedin },
    contact.twitter && { icon: Twitter, href: contact.twitter },
  ].filter(Boolean) as { icon: any; href: string }[];

  return (
    <section id="contact" className="section-pad relative">
      <div className="container">
        <Reveal>
          <p className="font-mono text-sm text-brand-cyan mb-2">08 — Let&apos;s talk</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Get In Touch</h2>
          <p className="text-ink-muted max-w-lg mb-12">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-10">
          <Reveal variant="slide-right" className="md:col-span-2 space-y-4">
            {infoItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-cursor-hover
                className="flex items-center gap-4 rounded-xl glass p-4 hover:border-brand-cyan/40 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-brand-gradient flex items-center justify-center shrink-0">
                  <item.icon size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-ink-dim">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </a>
            ))}

            {socials.length > 0 && (
              <div className="flex gap-3 pt-2">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="h-11 w-11 rounded-lg glass flex items-center justify-center hover:text-brand-cyan hover:scale-110 transition-all"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal variant="slide-left" delay={0.1} className="md:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl glass p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Your Name"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-ink-dim focus:outline-none focus:border-brand-cyan/60 transition-colors"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-red-400 mt-1"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <input
                    {...register("email")}
                    placeholder="Your Email"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-ink-dim focus:outline-none focus:border-brand-cyan/60 transition-colors"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-red-400 mt-1"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <input
                {...register("subject")}
                placeholder="Subject (optional)"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-ink-dim focus:outline-none focus:border-brand-cyan/60 transition-colors"
              />

              <div>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Your Message"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-ink-dim focus:outline-none focus:border-brand-cyan/60 transition-colors resize-none"
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-400 mt-1"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                data-cursor-hover
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gradient bg-[length:200%_auto] hover:bg-right transition-all duration-500 px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Send size={16} />
                )}
                {status === "success" ? "Message Sent!" : status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "error" && (
                <p className="text-xs text-red-400 text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
