"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { FeaturedProject } from "@/lib/data";

export default function FeaturedSection({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const [index, setIndex] = useState(0);
  const current = projects[index] || projects[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const prevProject = () => {
    setIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="feat" id="featured">
      <div className="wrap">
        <div className="media">
          <Image
            key={current.image}
            src={current.image}
            alt={`${current.title} screenshot`}
            fill
            sizes="(min-width: 880px) 600px, 100vw"
            priority
          />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <p className="k mono" style={{ margin: 0 }}>
              Featured project ({index + 1}/{projects.length})
            </p>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                onClick={prevProject}
                aria-label="Previous featured project"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--mono)",
                  clipPath: "var(--px-s)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={nextProject}
                aria-label="Next featured project"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--mono)",
                  clipPath: "var(--px-s)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              >
                Next →
              </button>
            </div>
          </div>
          <h2>{current.title}</h2>
          <p>{current.description}</p>
          <div className="split">
            {current.meta.map((m) => (
              <div key={m.label}>
                <span className="lb">{m.label}</span>
                <span className="vl">{m.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "30px", flexWrap: "wrap", alignItems: "center" }}>
            <a className="btn" href={current.href} target="_blank" rel="noopener noreferrer" style={{ marginTop: 0 }}>
              Open the live site
            </a>
            <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Select ${p.title}`}
                  style={{
                    width: i === index ? "24px" : "8px",
                    height: "8px",
                    background: i === index ? "var(--neon)" : "rgba(255,255,255,0.3)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    clipPath: "var(--px-s)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
