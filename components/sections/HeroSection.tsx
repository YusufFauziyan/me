"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { socialMedia } from "@/lib/data";

const D = 1.8; // base delay to sync with loading screen

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-24"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.4,
        }}
      />
      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: "#47B8FF" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="max-w-4xl mx-auto w-full text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: D + 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-8"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4ADE80" }}
          />
          Available for work
        </motion.div>

        {/* Name */}
        <div>
          <motion.p
            className="text-sm font-mono mb-3"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: D + 0.2 }}
          >
            {"Hi, I'm".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: D + 0.3 + i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="inline-block w-[2px] h-[1em] ml-0.5 align-middle"
              style={{ background: "var(--accent)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                delay: D + 0.3,
                duration: 0.8,
                repeat: 2,
                repeatDelay: 0.1,
                times: [0, 0.1, 0.5, 0.6],
              }}
            />
          </motion.p>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
            {/* First name – letters drop in */}
            <span className="inline-block overflow-hidden">
              {(socialMedia.FIRST_NAME || "").split("").map((char: string, i: number) => (
                <motion.span
                  key={`first-${i}`}
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: D + 0.7 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <br />
            {/* Last name – letters rise up with accent color */}
            <span className="inline-block overflow-hidden relative">
              {(socialMedia.LAST_NAME || "").split("").map((char: string, i: number) => (
                <motion.span
                  key={`last-${i}`}
                  className="inline-block"
                  style={{ color: "var(--accent)" }}
                  initial={{ y: "100%", opacity: 0, filter: "blur(8px)", scale: 0.8 }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: D + 1.1 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-[4px] rounded-full"
                style={{ background: "var(--accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 0.8,
                  delay: D + 1.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </span>
          </h1>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: D + 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-6"
        >
          {(socialMedia.JOB_TITLE || []).map((w: string, i: number) => (
            <motion.span
              key={i}
              className="font-display text-xl md:text-2xl font-semibold"
              style={{ color: i === 2 ? "var(--muted)" : "var(--fg)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: D + 0.6 + i * 0.07 }}
            >
              {w}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: D + 0.8 }}
          className="text-base leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: "var(--muted)" }}
        >
          {socialMedia.JOB_DESCRIPTION}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: D + 1 }}
          className="flex flex-wrap justify-center items-center gap-3"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "var(--accent)", color: "#0D0D0F" }}
          >
            Get in touch
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--fg)",
            }}
          >
            <Download size={14} />
            Download CV
          </a>
          <div className="flex items-center gap-2 ml-2">
            {[
              {
                icon: GithubIcon,
                href: socialMedia.GITHUB_ADDRESS,
                hidden: !socialMedia.GITHUB_ADDRESS,
              },
              {
                icon: LinkedinIcon,
                href: socialMedia.LINKEDIN_ADDRESS,
                hidden: !socialMedia.LINKEDIN_ADDRESS,
              },
            ].map(({ icon: Icon, href, hidden }, i) => {
              if (hidden) return;

              return (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} style={{ color: "var(--muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
