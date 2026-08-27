"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Page-level choreography. The markup is server-rendered for SEO, so this
 * mounts on top of it and drives the existing nodes rather than owning them.
 * Pre-animation states live in globals.css (.split-hold / .fade-hold) so there
 * is no flash of finished layout before GSAP boots.
 */
export default function Motion() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /**
       * The hero card holds at the top until the hero has scrolled past it.
       * This is a ScrollTrigger pin rather than `position: sticky` because
       * ScrollSmoother's wrapper is fixed with no scrollport, so sticky has
       * nothing to stick to. `.hcue` is absolutely positioned and the hero is
       * min-height:100vh, so taking the card out of flow shifts nothing.
       */
      mm.add("(min-width: 900px)", () => {
        const card = document.querySelector<HTMLElement>(".hhead");
        if (!card) return;
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          // Release exactly where the card would sit in flow, so it slides away
          // instead of vanishing.
          end: () => `bottom top+=${card.offsetHeight}`,
          pin: card,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { motion } = context.conditions as { motion: boolean };

          if (!motion) {
            // Reduced motion: reveal everything, animate nothing.
            gsap.set(".ln-child", { yPercent: 0, y: 0 });
            gsap.set(".fade-hold", { opacity: 1, y: 0 });
            gsap.set(".rule-x", { scaleX: 1 });
            gsap.set(".rule-y", { scaleY: 1 });
            gsap.set("[data-reveal]", { opacity: 1, y: 0 });
            return;
          }

          /* ---------- hero: stepped line reveal, matching the reference cadence ---------- */
          const intro = gsap.timeline({ defaults: { ease: "none" } });
          intro
            .fromTo(
              ".hhead .hl .ln-child",
              { yPercent: 115, y: 0 },
              { yPercent: 0, duration: 0.95, ease: "steps(6)", stagger: 0.11 },
              0.1,
            )
            .fromTo(
              ".hhead .hdesc .ln-child",
              { yPercent: 115, y: 0 },
              { yPercent: 0, duration: 0.95, ease: "steps(6)", stagger: 0.08 },
              0.36,
            )
            .to(".rule-x", { scaleX: 1, duration: 0.9, ease: "expo.out" }, 0.5)
            .to(".rule-y", { scaleY: 1, duration: 0.85, ease: "expo.out" }, 0.42)
            .fromTo(".hhead .htag", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "steps(6)" }, 0.58)
            .fromTo(".hcue", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "steps(6)" }, 0.9)
            .fromTo(
              ".hhead .wlogo",
              { opacity: 0, rotationY: -180, z: -120 },
              { opacity: 1, rotationY: 0, z: 0, duration: 1.1, ease: "power3.out" },
              0.78,
            );

          /* ---------- generic scroll reveal ---------- */
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            gsap.from(el, {
              y: 18,
              duration: 0.8,
              ease: "steps(6)",
              scrollTrigger: { trigger: el, start: "top 88%" },
            });
          });

          /* ---------- intro lead + pull quote: split into lines, wipe up ---------- */
          gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                return gsap.from(self.lines, {
                  yPercent: 115,
                  duration: 0.85,
                  ease: "steps(6)",
                  stagger: 0.07,
                  scrollTrigger: { trigger: el, start: "top 85%" },
                });
              },
            });
          });

          /* ---------- 3D: featured card tilts as it crosses the viewport ---------- */
          gsap.fromTo(
            ".feat .media",
            { rotationY: 14, rotationX: 5, z: -90 },
            {
              rotationY: -10,
              rotationX: -3,
              z: 0,
              ease: "none",
              scrollTrigger: { trigger: ".feat", start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );

          /* ---------- 3D: the two stat chips flip in ---------- */
          gsap.utils.toArray<HTMLElement>(".two .chip").forEach((chip, i) => {
            gsap.from(chip, {
              rotationY: 180,
              scale: 0.7,
              duration: 1,
              delay: i * 0.12,
              ease: "back.out(1.6)",
              scrollTrigger: { trigger: chip, start: "top 85%" },
            });
          });

          /* ---------- quote text drifts against the scroll ---------- */
          gsap.to(".quote .q", {
            yPercent: -14,
            ease: "none",
            scrollTrigger: { trigger: ".quote", start: "top bottom", end: "bottom top", scrub: 1 },
          });

          /* ---------- skill steps deal in ---------- */
          gsap.from(".proc .step", {
            y: 26,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.09,
            scrollTrigger: { trigger: ".proc .donuts", start: "top 82%" },
          });

          /* ---------- experience rows wipe in one by one ---------- */
          gsap.from(".ed .pts li", {
            xPercent: -3,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".ed .pts", start: "top 82%" },
          });

          /* ---------- the mark keeps spinning: on hover, and on a 10s idle beat ---------- */
          const logos = gsap.utils.toArray<HTMLElement>(".wlogo");
          const spin = (el: HTMLElement) =>
            gsap.fromTo(el, { rotationY: 0 }, { rotationY: 360, duration: 0.9, ease: "steps(18)" });
          logos.forEach((el) => el.addEventListener("pointerenter", () => spin(el)));
          const beat = window.setInterval(() => logos.forEach(spin), 10000);

          return () => window.clearInterval(beat);
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return null;
}
