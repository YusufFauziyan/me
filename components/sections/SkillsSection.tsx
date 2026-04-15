"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const categories = [
  { key: "frontend" as const, label: "Frontend", icon: "⬡" },
  { key: "backend" as const, label: "Backend", icon: "⬢" },
  { key: "database" as const, label: "Database", icon: "◈" },
  { key: "devops" as const, label: "DevOps", icon: "⟁" },
];

const techIcons: Record<string, string> = {
  React: "⚛",
  "Next.js": "▲",
  TypeScript: "TS",
  "Tailwind CSS": "🌊",
  "Framer Motion": "○",
  GraphQL: "◈",
  "Node.js": "⬡",
  Express: "E",
  NestJS: "N",
  Python: "🐍",
  "REST APIs": "↔",
  WebSockets: "⚡",
  PostgreSQL: "🐘",
  MySQL: "🐬",
  MongoDB: "🍃",
  Redis: "⬤",
  Prisma: "◆",
  Supabase: "⚡",
  Docker: "🐳",
  AWS: "☁",
  Vercel: "▲",
  "GitHub Actions": "⚙",
  Kubernetes: "☸",
  Terraform: "⬜",
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-28 px-6"
      style={{ background: "var(--card)" }}
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-16">
            <span
              className="font-mono text-sm"
              style={{ color: "var(--accent)" }}
            >
              02.
            </span>
            <h2 className="font-display text-4xl font-bold">Tech Stack</h2>
            <div
              className="flex-1 h-px ml-4"
              style={{ background: "var(--border)" }}
            />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map(({ key, label, icon }, catIdx) => (
            <AnimatedSection key={key} delay={catIdx * 0.1}>
              <div
                className="p-6 rounded-3xl h-full"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-display text-lg font-semibold">
                    {label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills[key].map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: catIdx * 0.1 + i * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium cursor-default"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--fg)",
                      }}
                    >
                      <span style={{ color: "var(--accent)" }}>
                        {techIcons[skill] || "◆"}
                      </span>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Marquee strip */}
        <AnimatedSection delay={0.4}>
          <div
            className="mt-12 overflow-hidden rounded-2xl py-4"
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap"
            >
              {[
                ...Object.values(skills).flat(),
                ...Object.values(skills).flat(),
              ].map((s, i) => (
                <span
                  key={i}
                  className="text-sm font-mono px-3 py-1"
                  style={{ color: "var(--muted)" }}
                >
                  {techIcons[s] || "◆"} {s}
                </span>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
