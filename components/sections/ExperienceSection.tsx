"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { Briefcase, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ExperienceSection() {
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="py-28 px-6" style={{ background: "var(--card)" }}>
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>04.</span>
            <h2 className="font-display text-4xl font-bold">Experience</h2>
            <div className="flex-1 h-px ml-4" style={{ background: "var(--border)" }} />
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "var(--border)" }}
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const card = (
                <div
                  className="p-6 rounded-3xl"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg font-bold">{exp.role}</h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold"
                            style={{ background: "var(--accent)", color: "#0D0D0F" }}>
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                        <Briefcase size={13} />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg"
                      style={{ background: "var(--card)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                      <Calendar size={11} />
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {exp.description}
                  </p>
                </div>
              );

              if (isMobile) {
                return (
                  <div key={exp.id} className="relative md:pl-20">
                    {card}
                  </div>
                );
              }

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-6 w-12 items-center justify-center">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
                      className="w-3 h-3 rounded-full border-2"
                      style={{
                        background: exp.current ? "var(--accent)" : "var(--bg)",
                        borderColor: exp.current ? "var(--accent)" : "var(--border)",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {card}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
