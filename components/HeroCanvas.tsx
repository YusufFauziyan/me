"use client";

import { useEffect, useRef } from "react";

const CELL = 9;
// Value thresholds -> colour band.
const BANDS: [number, string][] = [
  [0.3, "#1c2541"],
  [0.46, "#3b5bd9"],
  [0.62, "#f5c518"],
  [0.78, "#e0492a"],
];
// Cursor palette while the pointer is over copy. The ambient bands bottom out at
// a near-black navy, which swallows the text sitting on top of it.
const LIT: [number, string][] = [
  [0.3, "#f5c518"],
  [0.5, "#d8ff00"],
];
// Anything the blob could sit behind and make unreadable. Matched with closest()
// on containers, not on exact tags — a bare tag test flickers every time the
// pointer crosses the margin between two paragraphs.
const COPY = "p, h1, h2, h3, li, a, button, .wrap, .masthead, .track, .donuts";
// Dark blocks. The ambient bands bottom out at a near-black navy that vanishes
// on them, so over these the cursor always uses the bright LIT palette.
const DARK = ".feat, .quote";
const BRUSH = 3; // blob radius in cells; small enough to read as a cursor, not a cloud

/**
 * The pixel field behind the page: a low-frequency noise field that only
 * survives inside slow-moving "region" blobs, fades out below the hero, and
 * takes a heat deposit from the cursor. Document-aligned, so it scrolls with
 * the page instead of being pinned to the viewport.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    const fx = fxRef.current;
    const fctx = fx?.getContext("2d");
    if (!cv || !ctx || !fx || !fctx) return;

    const DPR = Math.min(devicePixelRatio || 1, 2);
    const SEED = Math.random() * 1000;
    let W = 0, H = 0, cols = 0, rows = 0, t = 0, raf = 0, intro = 0;
    let heat = new Float32Array(0);
    let mx = -1e4, my = -1e4, pmx = -1e4, pmy = -1e4;
    let lit = false, dark = false, shake = 0;
    // Click shockwaves: expanding rings of pixels. Capped so a mash of clicks
    // can't stack into a full-screen repaint every frame.
    const waves: { x: number; y: number; t0: number; pow: number }[] = [];

    function size() {
      W = innerWidth;
      H = innerHeight;
      cv!.width = Math.round(W * DPR);
      cv!.height = Math.round(H * DPR);
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      fx!.width = cv!.width;
      fx!.height = cv!.height;
      fctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      cols = Math.ceil(W / CELL) + 1;
      rows = Math.ceil(H / CELL) + 1;
      heat = new Float32Array(cols * rows);
    }
    let lastW = innerWidth;
    size();
    // iOS toggles the address bar on scroll, changing innerHeight only —
    // reallocating there would reset the field every few frames.
    const onResize = () => {
      if (innerWidth !== lastW) {
        lastW = innerWidth;
        size();
      }
    };

    const hsh = (c: number, r: number) => {
      const n = Math.sin(c * 127.1 + r * 311.7 + SEED * 0.13) * 43758.5453;
      return n - Math.floor(n);
    };
    function base(nx: number, ny: number, tt: number) {
      const s = SEED;
      nx += Math.sin(ny * 5 + tt * 0.5 + s) * 0.05;
      ny += Math.cos(nx * 5 - tt * 0.4) * 0.05;
      const v =
        Math.sin(nx * 5.6 + s * 1.3 + tt * 0.3) * Math.cos(ny * 4.7 - s * 0.7 + tt * 0.22) +
        Math.sin((nx * 1.4 + ny * 1.7) * 4.1 - s + tt * 0.16) +
        Math.sin(ny * 9 + s * 2.1 + nx * 3) * 0.5 +
        Math.sin(nx * 13 - s * 1.7) * 0.28;
      return 0.5 + 0.5 * (v / 2.55);
    }
    // Low-frequency blobs. Without this gate the field is a solid wall of colour
    // instead of clusters with white between them.
    const region = (nx: number, ny: number, tt: number) =>
      0.5 + 0.5 * Math.sin(nx * 2.1 + tt * 0.12 + SEED * 0.7) * Math.cos(ny * 1.8 - tt * 0.09 + SEED * 0.3);

    function dep(x: number, y: number, amt: number, sig: number) {
      const cc = x / CELL, cr = y / CELL;
      const rad = Math.ceil(sig * 1.6), inv = 1 / (2 * sig * sig * 0.18);
      for (let dr = -rad; dr <= rad; dr++) {
        for (let dc = -rad; dc <= rad; dc++) {
          const c = (cc + dc) | 0, r = (cr + dr) | 0;
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
          const dx = c + 0.5 - cc, dy = r + 0.5 - cr;
          const w = Math.exp(-(dx * dx + dy * dy) * inv);
          if (w < 0.02) continue;
          const id = r * cols + c;
          heat[id] = Math.min(1, heat[id] + amt * w);
        }
      }
    }
    // Stamp along the cursor path so a fast flick stays continuous between frames.
    function follow(x: number, y: number, sig: number) {
      if (pmx < -1e3) { pmx = x; pmy = y; }
      const dx = x - pmx, dy = y - pmy;
      const steps = Math.max(1, Math.min(48, Math.round(Math.hypot(dx, dy) / (CELL * 0.8))));
      for (let s = 1; s <= steps; s++) dep(pmx + (dx * s) / steps, pmy + (dy * s) / steps, 0.16, sig);
      pmx = x;
      pmy = y;
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = e.target as HTMLElement | null;
      lit = !!el?.closest?.(COPY);
      dark = !!el?.closest?.(DARK);
    };
    // Double-click only. A single click is left alone so ordinary clicking
    // around the page doesn't set the whole screen off.
    const onDoubleClick = (e: MouseEvent) => {
      if (waves.length > 2) waves.shift();
      waves.push({ x: e.clientX, y: e.clientY, t0: performance.now(), pow: 1 });
      dep(e.clientX, e.clientY, 1, BRUSH * 1.5);
      shake = 0.6;
    };
    const WAVE_LIFE = 1.4; // seconds
    // Paint one expanding ring of heat. Aged in seconds, not frames, so the
    // ring crosses the screen at the same speed on a 30fps laptop and a 120Hz one.
    function ripple(w: { x: number; y: number; t0: number; pow: number }, age: number) {
      const R = age * 900; // ring radius, px/s
      const amp = w.pow * Math.max(0, 1 - age / WAVE_LIFE);
      if (amp <= 0.02) return;
      const sig = 1.7 * CELL; // a few cells thick, so it reads as a ring, not a mass
      const inv = 1 / (2 * sig * sig);
      const lo = Math.max(0, Math.floor((w.y - R - sig * 3) / CELL));
      const hi = Math.min(rows - 1, Math.ceil((w.y + R + sig * 3) / CELL));
      for (let r = lo; r <= hi; r++) {
        for (let c = 0; c < cols; c++) {
          const dx = (c + 0.5) * CELL - w.x, dy = (r + 0.5) * CELL - w.y;
          const d = Math.hypot(dx, dy) - R;
          let g = amp * Math.exp(-(d * d) * inv);
          if (g <= 0.02) continue;
          // Speckle the ring so it breaks up into pixels instead of a solid band.
          g *= 0.55 + hsh(c * 1.3, r * 1.7) * 0.65;
          const id = r * cols + c;
          if (g > heat[id]) heat[id] = g;
        }
      }
    }

    function frame() {
      t++;
      intro = Math.min(1, intro + 0.02);
      const tt = t * 0.006;
      const sy = scrollY;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      if (shake > 0.01) {
        ctx!.translate((Math.random() - 0.5) * shake * 14, (Math.random() - 0.5) * shake * 14);
        shake *= 0.88;
      } else shake = 0;

      // Faint pixel grid, aligned to the document so it scrolls with the page.
      const off = sy - Math.floor(sy / CELL) * CELL;
      ctx!.strokeStyle = "#fafafa";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let gx = 0; gx <= W; gx += CELL) { ctx!.moveTo(gx + 0.5, 0); ctx!.lineTo(gx + 0.5, H); }
      for (let gy = -off; gy <= H; gy += CELL) { ctx!.moveTo(0, gy + 0.5); ctx!.lineTo(W, gy + 0.5); }
      ctx!.stroke();

      if (mx > -1e3) follow(mx, my, BRUSH);
      const now = performance.now();
      for (let i = waves.length - 1; i >= 0; i--) {
        const age = (now - waves[i].t0) / 1000;
        if (age > WAVE_LIFE) { waves.splice(i, 1); continue; }
        ripple(waves[i], age);
      }

      // The ambient field lives in the hero and dies off, raggedly, just below it.
      const heroBottom = (document.querySelector(".hero")?.getBoundingClientRect().bottom ?? H * 0.5) + sy;
      const heroEnd = heroBottom * 0.55;
      const fadeSpan = Math.max(1, heroBottom * 0.18);
      const hAmp = H * 0.14;
      // Keep the masthead copy readable.
      const safes = Array.from(document.querySelectorAll(".masthead .mh-l, .masthead .mh-r, .masthead .mh-c")).map((el) => {
        const r = el.getBoundingClientRect();
        return [r.left - 16, r.top - 12 + sy, r.right + 16, r.bottom + 12 + sy] as const;
      });

      const drStart = Math.floor(sy / CELL) - 1;
      const drEnd = Math.floor((sy + H) / CELL) + 1;
      for (let dr = drStart; dr <= drEnd; dr++) {
        const vy = dr * CELL - sy;
        const vr = Math.floor((vy + CELL * 0.5) / CELL);
        const inRow = vr >= 0 && vr < rows;
        const dd = dr * CELL;
        const ny = dd / H;
        for (let c = 0; c < cols; c++) {
          const ccx = (c + 0.5) * CELL;
          const nx = (c * CELL) / W;
          // Ragged cutoff: column waves plus blocky random patches, so the field
          // frays out instead of ending on a straight line.
          const co = Math.max(
            0,
            (Math.sin(c * 0.5 + SEED) + Math.sin(c * 0.21 - SEED * 1.3)) * 0.16 +
              hsh(Math.floor(c / 2) + 3.3, Math.floor(dr / 4)) * 0.6 +
              0.15,
          );
          const depthN = dd + co * hAmp;
          const regThr = depthN <= heroEnd ? 0 : Math.min(1, (depthN - heroEnd) / fadeSpan);

          let safe = false;
          for (const s of safes) {
            if (ccx >= s[0] && ccx <= s[2] && dd >= s[1] && dd <= s[3]) { safe = true; break; }
          }
          if (safe) continue;

          const hv = inRow ? heat[vr * cols + c] * 0.9 : 0;
          let v = hv;
          if (region(nx, ny, tt) > regThr && hsh(c * 1.7 + 11.3, dr * 1.3 + 5.1) < intro) {
            v += base(nx, ny, tt) + (hsh(c, dr) - 0.5) * 0.12 + Math.sin(c * 0.6 + dr * 0.8 + tt * 1.7) * 0.045;
          }
          if (v < 0.3) continue;
          let col: string;
          if (lit && hv > 0.28) {
            // This cell is cursor/ripple heat and the pointer is on copy.
            col = v >= LIT[1][0] ? LIT[1][1] : LIT[0][1];
          } else {
            col = BANDS[0][1];
            if (v >= BANDS[1][0]) col = BANDS[1][1];
            if (v >= BANDS[2][0]) col = BANDS[2][1];
            if (v >= BANDS[3][0]) col = BANDS[3][1];
          }
          ctx!.fillStyle = col;
          ctx!.fillRect(c * CELL, vy, CELL - 1, CELL - 1);
        }
      }

      // Second pass for the same heat, on an overlay that sits above the page in
      // `screen` blend. Over white it is a no-op (the base layer already shows
      // through); over the dark cards — the pull quote, the featured block — it
      // is the only way the cursor and the ripple stay visible at all.
      fctx!.clearRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = heat[r * cols + c] * 0.9;
          // Higher cut than the base layer: the ring leaves a slowly decaying
          // wash behind it, which on `screen` would flood the card instead of
          // reading as a ring.
          if (v < (dark ? 0.36 : 0.46)) continue;
          let col: string;
          if (lit || dark) {
            col = v >= LIT[1][0] ? LIT[1][1] : LIT[0][1];
          } else {
            col = BANDS[0][1];
            if (v >= BANDS[1][0]) col = BANDS[1][1];
            if (v >= BANDS[2][0]) col = BANDS[2][1];
            if (v >= BANDS[3][0]) col = BANDS[3][1];
          }
          fctx!.fillStyle = col;
          fctx!.fillRect(c * CELL, r * CELL, CELL - 1, CELL - 1);
        }
      }

      // Decay the cursor heat.
      for (let i = 0; i < heat.length; i++) heat[i] = heat[i] > 0.002 ? heat[i] * 0.955 : 0;

      raf = requestAnimationFrame(frame);
    }

    addEventListener("resize", onResize);
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("dblclick", onDoubleClick, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onMove);
      removeEventListener("dblclick", onDoubleClick);
    };
  }, []);

  return (
    <>
      <canvas id="hero-kv" ref={ref} aria-hidden="true" />
      <canvas id="hero-fx" ref={fxRef} aria-hidden="true" />
    </>
  );
}
