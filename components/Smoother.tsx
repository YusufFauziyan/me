"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * ScrollSmoother needs the #smooth-wrapper > #smooth-content pair in the DOM.
 * Nothing inside #smooth-content may be position:fixed (it lives on a transform),
 * which is why the hero canvas is mounted as a sibling in the layout.
 */
export default function Smoother({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Touch devices scroll natively; smoothing them fights momentum scroll.
      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
          normalizeScroll: true,
        });
        // Anchor links hand off to the smoother so they ease instead of jumping.
        const onClick = (e: MouseEvent) => {
          const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
          const id = a?.getAttribute("href");
          if (!id || id === "#") return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          smoother.scrollTo(target, true, "top top");
        };
        document.addEventListener("click", onClick);

        // A deep link (/#work) lands before the smoother exists, so the native
        // jump gets undone on init — replay it once against the smoother.
        const hash = location.hash;
        if (hash.length > 1) {
          const target = document.querySelector(hash);
          if (target) smoother.scrollTo(target, false, "top top");
        }
        // Remote screenshots settle after first paint and shift the layout under
        // the triggers.
        const onLoad = () => ScrollTrigger.refresh();
        addEventListener("load", onLoad);

        return () => {
          document.removeEventListener("click", onClick);
          removeEventListener("load", onLoad);
        };
      });
    }, wrapper);
    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
