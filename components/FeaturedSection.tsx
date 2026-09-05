"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { FeaturedProject } from "@/lib/data";

// Typing picks up from the middle of the string rather than an empty line, so a
// swap reads as the tail rewriting itself instead of a full retype.
const START = 0.5;

function useTypewriter(text: string, speed: number) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const instant =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setN(instant ? text.length : Math.floor(text.length * START));
  }, [text]);

  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);

  return { shown: text.slice(0, n), done: n >= text.length };
}

export default function FeaturedSection({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const [index, setIndex] = useState(0);
  const current = projects[index] || projects[0];
  const title = useTypewriter(current.title, 45);
  const description = useTypewriter(current.description, 9);

  // restarts on every index change, so any click resets the 10s window
  useEffect(() => {
    if (projects.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % projects.length), 10000);
    return () => clearTimeout(t);
  }, [index, projects.length]);

  // signed distance from the active card, wrapped so the fan stays balanced
  const offset = (i: number) => {
    const half = projects.length / 2;
    const d = i - index;
    return d > half ? d - projects.length : d < -half ? d + projects.length : d;
  };

  const go = (step: number) =>
    setIndex((i) => (i + step + projects.length) % projects.length);

  return (
    <section className="feat" id="featured">
      <div className="wrap">
        <div className="copy">
          <h2 className="typeWrap">
            <span className="typeGhost">{current.title}</span>
            <span className="typeLine">
              {title.shown}
              {!title.done && <i className="caret" />}
            </span>
          </h2>

          <p className="kick">
            <i className="kdot" />
            Featured project {index + 1}/{projects.length}
          </p>

          <p className="typeWrap desc">
            <span className="typeGhost">{current.description}</span>
            <span className="typeLine">
              {description.shown}
              {title.done && !description.done && <i className="caret" />}
            </span>
          </p>

          <ul key={current.title} className="featFade bullets">
            {current.meta.map((m) => (
              <li key={m.label}>
                <span className="lb">{m.label}</span>
                {m.value}
              </li>
            ))}
          </ul>

          <div className="foot">
            <button
              type="button"
              className="arrow"
              onClick={() => go(-1)}
              aria-label="Previous featured project"
            >
              ←
            </button>
            <button
              type="button"
              className="arrow"
              onClick={() => go(1)}
              aria-label="Next featured project"
            >
              →
            </button>
            <a
              className="btn"
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the live site
            </a>
          </div>
        </div>

        <div className="media">
          {projects.map((p, i) => {
            const o = offset(i);
            return (
              <button
                key={p.image}
                type="button"
                className="card"
                aria-label={`Show ${p.title}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                style={
                  {
                    "--o": o,
                    "--a": Math.abs(o),
                    zIndex: projects.length - Math.abs(o),
                  } as React.CSSProperties
                }
              >
                <Image
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  fill
                  sizes="(min-width: 880px) 600px, 100vw"
                  priority={i === 0}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
