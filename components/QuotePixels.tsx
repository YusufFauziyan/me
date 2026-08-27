"use client";

import { useEffect, useRef } from "react";

// 7px cells: the letters need the extra resolution to stay readable.
const CELL = 7;
// Six characters is the ceiling — longer words shrink the type past legibility.
const WORDS = ["DETAIL", "CRAFT", "POLISH", "TESTED", "PIXELS"];
const HOLD = 1900; // ms a word stays put
const WIPE = 700; // ms to dissolve into the next one

/**
 * The words rendered as pixels, dissolving one into the next. Sits beside the
 * pull quote, whose right half was empty.
 *
 * The glyphs come from drawing real text into a canvas one pixel per cell and
 * reading the alpha back — no bitmap font to hand-maintain.
 */
export default function QuotePixels() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(devicePixelRatio || 1, 2);
    const grid = document.createElement("canvas");
    const gctx = grid.getContext("2d", { willReadFrequently: true });
    if (!gctx) return;

    let W = 0, H = 0, cols = 0, rows = 0, raf = 0;
    let masks: Uint8Array[] = [];
    const t0 = performance.now();

    const font = (px: number) => `700 ${px}px "Helvetica Neue", Helvetica, Arial, sans-serif`;

    function maskFor(word: string) {
      const m = new Uint8Array(cols * rows);
      if (cols < 4 || rows < 4) return m;
      // Fit the word to the grid width, then read the glyphs back as cells.
      let fs = rows * 0.5;
      gctx!.font = font(fs);
      const w = gctx!.measureText(word).width || 1;
      fs = Math.max(4, Math.min(fs, (fs * (cols * 0.92)) / w));
      gctx!.clearRect(0, 0, cols, rows);
      gctx!.font = font(fs);
      gctx!.textAlign = "center";
      gctx!.textBaseline = "middle";
      gctx!.fillStyle = "#fff";
      gctx!.fillText(word, cols / 2, rows / 2);
      const d = gctx!.getImageData(0, 0, cols, rows).data;
      for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 90 ? 1 : 0;
      return m;
    }

    function size() {
      W = cv!.clientWidth;
      H = cv!.clientHeight;
      cv!.width = Math.round(W * DPR);
      cv!.height = Math.round(H * DPR);
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      cols = Math.max(1, Math.floor(W / CELL));
      rows = Math.max(1, Math.floor(H / CELL));
      grid.width = cols;
      grid.height = rows;
      masks = WORDS.map(maskFor);
    }
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);

    // Per-cell dissolve order. Deterministic, so a word always breaks up the
    // same way instead of shimmering differently every cycle.
    const order = (c: number, r: number) => {
      const s = Math.sin(c * 127.1 + r * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    function draw(now: number) {
      // The first rAF timestamp can predate t0 (the frame was already in flight
      // when the effect ran), and a negative t floors to index -1.
      const t = Math.max(0, now - t0);
      ctx!.clearRect(0, 0, W, H);
      if (!masks.length) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const step = HOLD + WIPE;
      const i = still ? 0 : Math.floor(t / step);
      const into = still ? 1 : Math.min(1, Math.max(0, (t % step) - HOLD) / WIPE);
      const from = masks[i % masks.length];
      const to = masks[(i + 1) % masks.length];

      const offX = Math.round((W - cols * CELL) / 2);
      const offY = Math.round((H - rows * CELL) / 2);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const id = r * cols + c;
          const k = order(c, r);
          const on = k < into ? to[id] : from[id];
          if (!on) continue;
          // A slow diagonal wave keeps the letters from sitting flat. Kept to two
          // bright tones — anything darker stops reading as type on black.
          const wave = 0.5 + 0.5 * Math.sin(c * 0.22 + r * 0.3 - t * 0.0022);
          // Cells mid-flip flash, which reads as the word rebuilding itself.
          const flipping = into > 0 && into < 1 && Math.abs(k - into) < 0.07;
          ctx!.fillStyle = flipping ? "#e0492a" : wave > 0.55 ? "#d8ff00" : "#f5c518";
          ctx!.fillRect(offX + c * CELL, offY + r * CELL, CELL - 1, CELL - 1);
        }
      }

      if (!still) raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas className="qviz" ref={ref} aria-hidden="true" />;
}
