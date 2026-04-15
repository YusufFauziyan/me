"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Happy Clients" },
  { value: "3", label: "Open Source Libs" },
];

function Interactive3DTag() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 20,
  });

  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[320px] md:w-[360px] cursor-grab active:cursor-grabbing"
      >
        {/* Card body */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "var(--card)",
            border: "2px solid var(--border)",
          }}
        >
          {/* Hole punch */}
          <div
            className="flex justify-center pt-5 pb-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="w-8 h-8 rounded-full"
              style={{
                background: "var(--bg)",
                border: "2px solid var(--border)",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15)",
                transform: "translateZ(4px)",
              }}
            />
          </div>

          {/* Photo */}
          <div className="px-5 pb-4" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                border: "2px solid var(--border)",
                transform: "translateZ(30px)",
              }}
            >
              <Image
                src="/me.png"
                alt="Profile photo"
                fill
                className="object-cover"
                sizes="360px"
              />
              {/* Glare effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
                  ),
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </motion.div>
          </div>

          {/* Info section */}
          <div
            className="px-5 pb-6 pt-2 text-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div style={{ transform: "translateZ(40px)" }}>
              <h3
                className="font-display text-xl font-bold mb-1"
                style={{ color: "var(--fg)" }}
              >
                Yusuf Fauziyan
              </h3>
              <p
                className="text-xs font-mono mb-3"
                style={{ color: "var(--accent)" }}
              >
                Fullstack Developer
              </p>
              {/* Barcode-style decoration */}
              <div className="flex justify-center items-end gap-[2px] h-8 mb-2">
                {Array.from({ length: 32 }).map((_, i) => {
                  // Deterministic pseudo-random based on index to avoid hydration mismatch
                  const seed = ((i * 9301 + 49297) % 233280) / 233280;

                  const heightValue = 40 + Math.sin(i * 0.8) * 30 + seed * 20;
                  const height = `${heightValue.toFixed(2)}%`;

                  return (
                    <motion.div
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: i % 3 === 0 ? "3px" : "1.5px",
                        height,
                        background: "var(--muted)",
                        opacity: 0.4,
                      }}
                    />
                  );
                })}
              </div>
              <p
                className="text-[10px] font-mono tracking-widest"
                style={{ color: "var(--muted)", opacity: 0.5 }}
              >
                ID-2026-DEV-001
              </p>
            </motion.div>
          </div>

          {/* Subtle edge highlight */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />
        </div>

        {/* Floating shadow */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: "80%",
            height: "20px",
            background:
              "radial-gradient(ellipse, rgba(0,0,0,0.2), transparent 70%)",
            filter: "blur(8px)",
            opacity: isHovered ? 0.6 : 0.3,
            transition: "opacity 0.3s",
          }}
        />

        {/* Rotating badge */}
        {/* <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-center font-mono text-xs leading-tight z-10"
          style={{
            background: "var(--accent)",
            color: "#0D0D0F",
            transform: "translateZ(50px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <div>
            OPEN
            <br />
            TO
            <br />
            WORK
          </div>
        </motion.div> */}
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-16">
            <span
              className="font-mono text-sm"
              style={{ color: "var(--accent)" }}
            >
              01.
            </span>
            <h2 className="font-display text-4xl font-bold">About Me</h2>
            <div
              className="flex-1 h-px ml-4"
              style={{ background: "var(--border)" }}
            />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={0.1}>
            <div
              className="space-y-5 text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              <p>
                I&apos;m a{" "}
                <strong style={{ color: "var(--fg)" }}>
                  Fullstack Developer
                </strong>{" "}
                with 4+ years of experience building high-performance web
                applications. I specialize in the JavaScript ecosystem, from
                crafting elegant React UIs to designing robust Node.js backends.
              </p>
              <p>
                My engineering philosophy centers on writing{" "}
                <strong style={{ color: "var(--fg)" }}>
                  maintainable, well-tested code
                </strong>{" "}
                that solves real business problems. I care deeply about
                developer experience, performance optimization, and building
                systems that scale.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m contributing to open-source
                projects, writing technical articles, or exploring the latest in
                distributed systems and developer tooling.
              </p>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-2xl"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="font-display text-3xl font-black"
                    style={{ color: "var(--accent)" }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs mt-1 font-mono"
                    style={{ color: "var(--muted)" }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Interactive3DTag />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
