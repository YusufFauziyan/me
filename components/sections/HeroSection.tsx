"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { socialMedia } from "@/lib/data";
import { useIsMobile } from "@/hooks/useIsMobile";

const D = 1.8; // base delay to sync with loading screen
const CV_URL = process.env.NEXT_PUBLIC_CV_URL;

export default function HeroSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Helper: on mobile, skip all entrance animations
  const noMotion = isMobile;

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 pb-20 sm:pb-0"
    >
      {/* Background grid – hidden on mobile to reduce GPU paint cost */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: 0.4,
          }}
        />
      )}
      {/* Gradient orbs – hidden on mobile (blur() is extremely GPU-heavy) */}
      {!isMobile && (
        <>
          <div
            className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px] pointer-events-none"
            style={{ background: "#47B8FF" }}
          />
        </>
      )}

      <motion.div
        style={noMotion ? undefined : { y, opacity }}
        className="max-w-4xl mx-auto w-full text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={noMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={noMotion ? { duration: 0 } : { duration: 0.5, delay: D + 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono mb-4 sm:mb-8"
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
            initial={noMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={noMotion ? { duration: 0 } : { duration: 0.4, delay: D + 0.2 }}
          >
            {noMotion
              ? "Hi, I'm"
              : "Hi, I'm".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.03, delay: D + 0.3 + i * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
            {!noMotion && (
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
            )}
          </motion.p>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4 sm:mb-6">
            {/* First name */}
            <span className="inline-block overflow-hidden">
              {noMotion
                ? socialMedia.FIRST_NAME || ""
                : (socialMedia.FIRST_NAME || "")
                    .split("")
                    .map((char: string, i: number) => (
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
            {/* Last name – with accent color */}
            <span className="inline-block overflow-hidden relative">
              {noMotion
                ? (
                    <span style={{ color: "var(--accent)" }}>
                      {socialMedia.LAST_NAME || ""}
                    </span>
                  )
                : (socialMedia.LAST_NAME || "")
                    .split("")
                    .map((char: string, i: number) => (
                      <motion.span
                        key={`last-${i}`}
                        className="inline-block"
                        style={{ color: "var(--accent)" }}
                        initial={{
                          y: "100%",
                          opacity: 0,
                          filter: "blur(8px)",
                          scale: 0.8,
                        }}
                        animate={{
                          y: "0%",
                          opacity: 1,
                          filter: "blur(0px)",
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: D + 1.1 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
              {/* Animated underline – static on mobile */}
              {noMotion ? (
                <span
                  className="absolute bottom-0 left-0 h-[4px] rounded-full w-full"
                  style={{ background: "var(--accent)" }}
                />
              ) : (
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
              )}
            </span>
          </h1>
        </div>

        {/* Headline */}
        <motion.div
          initial={noMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            noMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: D + 0.5, ease: [0.22, 1, 0.36, 1] }
          }
          className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1 mb-4 sm:mb-6"
        >
          {(socialMedia.JOB_TITLE || []).map((w: string, i: number) => (
            <motion.span
              key={i}
              className="font-display text-base sm:text-xl md:text-2xl font-semibold"
              style={{ color: i === 2 ? "var(--muted)" : "var(--fg)" }}
              initial={noMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={noMotion ? { duration: 0 } : { delay: D + 0.6 + i * 0.07 }}
            >
              {w}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={noMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={noMotion ? { duration: 0 } : { duration: 0.7, delay: D + 0.8 }}
          className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-10 max-w-lg mx-auto"
          style={{ color: "var(--muted)" }}
        >
          {socialMedia.JOB_DESCRIPTION}
        </motion.p>

        <motion.div
          initial={noMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={noMotion ? { duration: 0 } : { duration: 0.7, delay: D + 1 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3"
        >
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
            style={{ background: "var(--accent)", color: "#0D0D0F" }}
          >
            Get in touch
          </a>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center cursor-pointer gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--fg)",
            }}
          >
            <Download size={14} />
            Download CV
          </a>
          <div className="flex items-center gap-2 sm:ml-2">
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
                  whileHover={noMotion ? undefined : { scale: 1.1, y: -2 }}
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

      {/* Scroll indicator – desktop only, no change needed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
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
