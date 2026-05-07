"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { useIsMobile } from "@/hooks/useIsMobile";

const categories = [
  { key: "frontend" as const, label: "Frontend", icon: "⬡" },
  { key: "backend" as const, label: "Backend", icon: "⬢" },
  { key: "mobile" as const, label: "Mobile", icon: "📱" },
  { key: "database" as const, label: "Database", icon: "◈" },
];

const reactSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="m25 11.6l-.9-.3c0-.2.1-.4.1-.6c.7-3.3.2-6-1.3-6.9c-1.5-.8-3.9 0-6.3 2.1c-.2.2-.5.4-.7.6c-.2-.1-.3-.3-.5-.4C13 3.9 10.5 3 9 3.9c-1.5.8-1.9 3.4-1.3 6.5c.1.3.1.6.2.9c-.4.1-.7.2-1 .3c-3 1-4.9 2.7-4.9 4.3c0 1.7 2 3.5 5.1 4.5c.2.1.5.2.8.2c-.1.3-.2.7-.2 1c-.6 3.1-.1 5.5 1.3 6.4c1.5.9 4 0 6.5-2.2c.2-.2.4-.4.6-.5c.2.2.5.5.8.7c2.4 2.1 4.7 2.9 6.2 2s2-3.5 1.4-6.7c0-.2-.1-.5-.2-.8c.2-.1.4-.1.5-.2c3.2-1.1 5.3-2.8 5.3-4.5c-.1-1.5-2.1-3.1-5.1-4.2m-7.5-4.7c2.1-1.8 4-2.5 4.9-2s1.3 2.7.7 5.6c0 .2-.1.4-.1.6c-1.2-.3-2.5-.5-3.7-.6q-1.05-1.5-2.4-3zm-7.2 10.5c.3.5.5 1 .8 1.5s.6 1 .9 1.4c-.9-.1-1.7-.2-2.6-.4c.2-.8.5-1.6.9-2.5m0-2.8c-.4-.8-.6-1.6-.9-2.4c.8-.2 1.7-.3 2.5-.4c-.3.5-.6.9-.9 1.4c-.2.4-.5.9-.7 1.4m.6 1.4c.4-.8.8-1.5 1.2-2.3c.4-.7.9-1.5 1.4-2.2c.8-.1 1.7-.1 2.6-.1s1.7 0 2.6.1c.5.7.9 1.4 1.3 2.2c.4.7.8 1.5 1.2 2.3c-.4.8-.8 1.5-1.2 2.3c-.4.7-.9 1.5-1.3 2.2c-.8.1-1.7.1-2.6.1s-1.7 0-2.5-.1c-.5-.7-.9-1.4-1.4-2.2s-.9-1.5-1.3-2.3m10 2.9c.3-.5.6-1 .8-1.5c.4.8.7 1.6.9 2.5c-.9.2-1.7.3-2.6.4c.4-.5.7-1 .9-1.4m.8-4.3c-.3-.5-.5-1-.8-1.5s-.6-.9-.8-1.4c.9.1 1.7.3 2.6.4c-.3.9-.6 1.7-1 2.5M16 8.3c.6.6 1.1 1.3 1.6 2q-1.65-.15-3.3 0c.6-.7 1.2-1.4 1.7-2M9.6 4.9c.9-.5 3 .2 5.2 2.2l.4.4q-1.35 1.35-2.4 3c-1.3.1-2.5.3-3.7.6c-.1-.3-.1-.6-.2-.9c-.6-2.7-.2-4.8.7-5.3M8.2 19.6c-.2-.1-.5-.1-.7-.2c-1.4-.5-2.5-1.1-3.3-1.7c-.7-.6-1-1.2-1-1.7c0-1 1.5-2.3 4.1-3.2c.3-.1.6-.2 1-.3c.3 1.2.7 2.4 1.3 3.5c-.6 1.2-1 2.4-1.4 3.6m6.5 5.5c-1.1 1-2.2 1.6-3.1 2c-.9.3-1.5.3-2 .1c-.9-.5-1.3-2.5-.8-5.1c.1-.4.2-.7.2-1.1c1.2.3 2.5.5 3.8.5q1.05 1.5 2.4 3c-.2.2-.3.4-.5.6m1.3-1.4c-.6-.6-1.1-1.3-1.7-2h3.3c-.4.7-1 1.4-1.6 2m7.3 1.7c-.2.9-.5 1.5-.9 1.7c-.9.5-2.8-.2-4.8-1.9c-.2-.2-.5-.4-.7-.6c.8-.9 1.6-1.9 2.3-3c1.3-.1 2.5-.3 3.8-.6c.1.2.1.5.2.7c.3 1.4.3 2.7.1 3.7m1-6c-.2 0-.3.1-.5.1c-.4-1.2-.9-2.4-1.4-3.6c.5-1.1 1-2.3 1.4-3.5c.3.1.6.2.8.3c2.6.9 4.2 2.2 4.2 3.2c0 1.2-1.7 2.6-4.5 3.5"
    />
    <path
      fill="currentColor"
      d="M16 18.5c.5 0 1-.1 1.4-.4s.7-.7.9-1.1c.2-.5.2-1 .1-1.5s-.3-.9-.7-1.3c-.3-.4-.8-.6-1.3-.7s-1 0-1.5.1c-.5.2-.9.5-1.1.9c-.3.4-.4.9-.4 1.4c0 .3.1.7.2 1s.3.6.5.8s.5.4.8.5c.4.2.8.3 1.1.3"
    />
  </svg>
);

const nextJsSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 256 256"
  >
    <g fill="none">
      <rect width="256" height="256" fill="#242938" rx="60" />
      <path
        fill="#fff"
        d="M121.451 28.054c-.43.039-1.799.176-3.031.273c-28.406 2.561-55.014 17.889-71.867 41.447C37.17 82.873 31.167 97.731 28.9 113.47c-.801 5.494-.899 7.117-.899 14.565c0 7.449.098 9.072.9 14.565c5.434 37.556 32.16 69.111 68.406 80.802c6.491 2.092 13.333 3.519 21.114 4.379c3.031.332 16.129.332 19.16 0c13.431-1.486 24.809-4.809 36.031-10.538c1.72-.879 2.053-1.114 1.818-1.309c-.156-.118-7.488-9.952-16.285-21.838l-15.992-21.603l-20.04-29.658c-11.026-16.305-20.097-29.639-20.176-29.639c-.078-.019-.156 13.158-.195 29.248c-.059 28.172-.078 29.306-.43 29.97c-.508.958-.899 1.349-1.721 1.78c-.625.312-1.173.371-4.125.371h-3.382l-.9-.567a3.65 3.65 0 0 1-1.31-1.427l-.41-.88l.04-39.198l.058-39.218l.606-.763c.313-.41.978-.938 1.447-1.192c.801-.391 1.114-.43 4.496-.43c3.989 0 4.653.156 5.69 1.29c.293.313 11.143 16.657 24.125 36.344a89122 89122 0 0 0 39.452 59.765l15.836 23.989l.802-.528c7.096-4.614 14.604-11.183 20.547-18.026c12.649-14.526 20.802-32.238 23.539-51.124c.801-5.493.899-7.116.899-14.565s-.098-9.071-.899-14.565c-5.435-37.556-32.161-69.11-68.407-80.801c-6.393-2.073-13.196-3.5-20.821-4.36c-1.877-.196-14.8-.41-16.422-.254m40.938 60.489c.938.469 1.701 1.368 1.975 2.306c.156.509.195 11.379.156 35.875l-.059 35.152l-6.197-9.502l-6.217-9.501v-25.552c0-16.52.078-25.807.195-26.257c.313-1.094.997-1.954 1.936-2.463c.801-.41 1.095-.45 4.164-.45c2.894 0 3.402.04 4.047.392"
      />
    </g>
  </svg>
);

const tsSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 256 256"
  >
    <g fill="none">
      <rect width="256" height="256" fill="#007acc" rx="60" />
      <path
        fill="#fff"
        d="m56.611 128.849l-.081 10.484h33.32v94.679h23.569v-94.679h33.32v-10.281c0-5.689-.121-10.443-.284-10.565c-.122-.162-20.399-.244-44.983-.203l-44.739.122zm149.956-10.741c6.501 1.626 11.459 4.511 16.01 9.224c2.357 2.52 5.851 7.112 6.136 8.209c.081.325-11.053 7.802-17.798 11.987c-.244.163-1.22-.894-2.317-2.519c-3.291-4.795-6.745-6.868-12.028-7.233c-7.761-.529-12.759 3.535-12.718 10.321c0 1.991.284 3.169 1.097 4.795c1.706 3.535 4.876 5.648 14.832 9.955c18.326 7.884 26.168 13.085 31.045 20.48c5.445 8.249 6.664 21.415 2.966 31.208c-4.063 10.646-14.141 17.879-28.323 20.277c-4.388.772-14.791.65-19.504-.203c-10.281-1.829-20.033-6.908-26.047-13.572c-2.357-2.601-6.949-9.387-6.664-9.875c.121-.162 1.178-.812 2.356-1.503c1.138-.65 5.446-3.129 9.509-5.486l7.355-4.267l1.544 2.276c2.154 3.291 6.867 7.802 9.712 9.305c8.167 4.308 19.383 3.698 24.909-1.259c2.357-2.154 3.332-4.389 3.332-7.68c0-2.967-.366-4.267-1.91-6.502c-1.991-2.844-6.054-5.242-17.595-10.24c-13.206-5.689-18.895-9.224-24.096-14.832c-3.007-3.25-5.852-8.452-7.03-12.8c-.975-3.616-1.219-12.678-.447-16.335c2.722-12.759 12.353-21.658 26.25-24.3c4.511-.853 14.994-.528 19.424.569"
      />
    </g>
  </svg>
);

const flutterIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 128 128"
  >
    <path
      fill="#3fb6d3"
      d="M12.3 64.2L76.3 0h39.4L32.1 83.6zm64 63.8h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z"
    />
    <path fill="#27aacd" d="m81.6 93.9l-20-20l-19.4 19.6l19.4 19.6z" />
    <path fill="#19599a" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z" />
    <linearGradient
      id="SVGzU71EysQ"
      x1="59.365"
      x2="86.825"
      y1="116.36"
      y2="99.399"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#1b4e94" />
      <stop offset=".63" stopColor="#1a5497" />
      <stop offset="1" stopColor="#195a9b" />
    </linearGradient>
    <path fill="url(#SVGzU71EysQ)" d="m61.6 113.1l30.8-8.4l-10.8-10.8z" />
  </svg>
);

const tailwindSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 32 32"
  >
    <path
      fill="#44a8b3"
      d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1q-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1m-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1q-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1"
    />
  </svg>
);

const techIcons: Record<string, React.ReactNode> = {
  React: reactSvg,
  "Next.js": nextJsSvg,
  TypeScript: tsSvg,
  "Tailwind CSS": tailwindSvg,
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
  Flutter: flutterIcon,
};

export default function SkillsSection() {
  const isMobile = useIsMobile();

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
                  {skills[key].map((skill, i) =>
                    isMobile ? (
                      <span
                        key={skill}
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
                      </span>
                    ) : (
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
                    ),
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Marquee strip – use CSS animation on mobile instead of framer-motion */}
        <AnimatedSection delay={0.4}>
          <div
            className="mt-12 overflow-hidden rounded-2xl py-4"
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            {isMobile ? (
              <div
                className="flex gap-6 whitespace-nowrap animate-marquee"
                style={{ animation: "marquee 30s linear infinite" }}
              >
                {[
                  ...Object.values(skills).flat(),
                  ...Object.values(skills).flat(),
                ].map((s, i) => (
                  <span
                    key={i}
                    className="text-sm font-mono px-3 py-1 flex items-center gap-2"
                    style={{ color: "var(--muted)" }}
                  >
                    {techIcons[s] || "◆"} {s}
                  </span>
                ))}
              </div>
            ) : (
              <motion.div
                animate={{ x: [0, -1200] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-6 whitespace-nowrap"
              >
                {[
                  ...Object.values(skills).flat(),
                  ...Object.values(skills).flat(),
                  ...Object.values(skills).flat(),
                ].map((s, i) => (
                  <span
                    key={i}
                    className="text-sm font-mono px-3 py-1 flex items-center gap-2"
                    style={{ color: "var(--muted)" }}
                  >
                    {techIcons[s] || "◆"} {s}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
