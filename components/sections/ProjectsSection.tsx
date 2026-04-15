"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { useRef, MouseEvent } from "react";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative rounded-3xl overflow-hidden cursor-default"
    >
      <div style={{ background: "var(--card)", border: "1px solid var(--border)" }} className="rounded-3xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
            style={{ background: "linear-gradient(to bottom, transparent 30%, var(--card))" }} />
          {project.featured && (
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold"
              style={{ background: "var(--accent)", color: "#0D0D0F" }}>
              Featured
            </div>
          )}
          {/* Hover overlay actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a href={project.demo} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm"
              style={{ background: "rgba(232,255,71,0.9)", color: "#0D0D0F" }}>
              <ExternalLink size={14} /> Live Demo
            </motion.a>
            <motion.a href={project.github} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
              <GithubIcon size={14} /> Code
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-xl font-bold">{project.title}</h3>
            <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
              <ArrowUpRight size={18} style={{ color: "var(--muted)" }} />
            </motion.div>
          </div>
          <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>03.</span>
            <h2 className="font-display text-4xl font-bold">Projects</h2>
            <div className="flex-1 h-px ml-4" style={{ background: "var(--border)" }} />
          </div>
          <p className="text-sm mb-16 ml-10" style={{ color: "var(--muted)" }}>
            A selection of things I&apos;ve built — hover to explore.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-12 text-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ border: "1px solid var(--border)", background: "var(--card)", color: "var(--fg)" }}
            >
              <GithubIcon size={15} />
              View all on GitHub
              <ArrowUpRight size={14} style={{ color: "var(--muted)" }} />
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
