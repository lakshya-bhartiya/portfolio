import { Award, ExternalLink } from "lucide-react";
import { Reveal, StaggerReveal, StaggerItem } from "../Reveal";
import type { Certification } from "@/lib/types";

export function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const sorted = [...certifications].sort((a, b) => a.order - b.order);

  return (
    <section id="certifications" className="section-pad relative">
      <div className="container">
        <Reveal>
          <p className="font-mono text-sm text-brand-cyan mb-2">05 — Verified learning</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">Certifications</h2>
        </Reveal>

        {sorted.length === 0 ? (
          <p className="text-ink-dim text-sm">No certifications added yet.</p>
        ) : (
          <StaggerReveal className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {sorted.map((cert) => (
              <StaggerItem key={cert._id}>
                <div className="group rounded-xl glass overflow-hidden hover:border-brand-cyan/40 transition-colors h-full flex flex-col">
                  <div className="h-36 bg-white/5 flex items-center justify-center overflow-hidden">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <Award size={32} className="text-brand-cyan" />
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm mb-1">{cert.title}</h3>
                    <p className="text-xs text-brand-cyan">{cert.issuer}</p>
                    <p className="text-xs text-ink-dim mt-1">{cert.date}</p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-cyan hover:underline"
                      >
                        Verify <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        )}
      </div>
    </section>
  );
}
