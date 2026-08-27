"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Image from "next/image";
import type { Project } from "@/lib/data";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function WorkCarousel({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const wrap = self.selector!(".track-wrap")[0] as HTMLElement;
      const track = self.selector!(".track")[0] as HTMLElement;
      const prev = self.selector!(".sl-arrow.prev")[0] as HTMLButtonElement;
      const next = self.selector!(".sl-arrow.next")[0] as HTMLButtonElement;
      const slides = self.selector!(".slide") as HTMLElement[];

      const minX = () => Math.min(0, wrap.clientWidth - track.scrollWidth);
      const syncArrows = () => {
        const x = gsap.getProperty(track, "x") as number;
        prev.disabled = x >= -1;
        next.disabled = x <= minX() + 1;
      };

      // A live getter, so a resize can't strand the track outside its bounds.
      const bounds = { get minX() { return minX(); }, maxX: 0 };

      const [drag] = Draggable.create(track, {
        type: "x",
        inertia: true,
        edgeResistance: 0.9,
        dragResistance: 0.05,
        // Recomputed on every press so a resize mid-session can't strand the track.
        bounds,
        onPress: () => wrap.classList.add("drag"),
        onRelease: () => wrap.classList.remove("drag"),
        onDrag: syncArrows,
        onThrowUpdate: syncArrows,
        onThrowComplete: syncArrows,
      });

      // A drag must not fire the link underneath it.
      const onClick = (e: MouseEvent) => {
        if (Math.abs(drag.endX - drag.startX) > 6) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      wrap.addEventListener("click", onClick, true);

      const step = () => (slides[0]?.offsetWidth ?? 360) + 28;
      const to = (x: number) => {
        gsap.to(track, {
          x: gsap.utils.clamp(minX(), 0, x),
          duration: 0.9,
          ease: "power3.out",
          onUpdate: syncArrows,
          onComplete: syncArrows,
        });
      };
      const goPrev = () => to((gsap.getProperty(track, "x") as number) + step());
      const goNext = () => to((gsap.getProperty(track, "x") as number) - step());
      prev.addEventListener("click", goPrev);
      next.addEventListener("click", goNext);

      // 3D tilt on the artwork, pointer-driven, desktop only.
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        slides.forEach((slide) => {
          const media = slide.querySelector(".csm") as HTMLElement;
          const setRX = gsap.quickTo(media, "rotationX", { duration: 0.5, ease: "power3" });
          const setRY = gsap.quickTo(media, "rotationY", { duration: 0.5, ease: "power3" });
          const setZ = gsap.quickTo(media, "z", { duration: 0.5, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = media.getBoundingClientRect();
            setRY(((e.clientX - r.left) / r.width - 0.5) * 16);
            setRX(-((e.clientY - r.top) / r.height - 0.5) * 16);
            setZ(40);
          };
          const leave = () => { setRX(0); setRY(0); setZ(0); };
          slide.addEventListener("pointermove", move);
          slide.addEventListener("pointerleave", leave);
        });
      });

      const onResize = () => {
        drag.applyBounds(bounds);
        gsap.set(track, { x: gsap.utils.clamp(minX(), 0, gsap.getProperty(track, "x") as number) });
        syncArrows();
      };
      addEventListener("resize", onResize);
      syncArrows();

      return () => {
        wrap.removeEventListener("click", onClick, true);
        prev.removeEventListener("click", goPrev);
        next.removeEventListener("click", goNext);
        removeEventListener("resize", onResize);
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <button className="sl-arrow prev" aria-label="Previous project">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button className="sl-arrow next" aria-label="Next project">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
      </button>
      <div className="track-wrap">
        <div className="track">
          {projects.map((p) => (
            <a className="slide" key={p.title} href={p.href} target="_blank" rel="noopener noreferrer">
              <div className="csm">
                {/* Through next/image on purpose: the raw GitHub screenshots are
                    multi-megabyte PNGs, and one of them is 10 MB. */}
                <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="420px" />
                <div className="reveal-cta" />
                <div className="rc-clip"><span className="rc-i">View project</span></div>
              </div>
              <p className="t">{p.title}</p>
              <p className="d">{p.description}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t.label} className={t.tone}>{t.label}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
