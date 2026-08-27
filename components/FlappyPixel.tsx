"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { advancePipes, collides, nextGapY, type Pipe } from "@/lib/flappy";

const CELL = 8;
const INK = "#0A0A0A";
const NEON = "#d8ff00";
const BLUE = "#3b5bd9";
const RED = "#e0492a";
const LINE = "#ececec";

// Physics in px and seconds, so the game plays the same at any refresh rate.
const GRAVITY = 1500;
const FLAP = -420;
const SPEED = 175;
const PIPE_W = 4 * CELL;
const GAP = 14 * CELL;
const SPACING = 40 * CELL; // ~1.7s between pipes at SPEED
const GROUND = 2 * CELL;

// '#' body, 'o' eye, '=' wing.
const BIRD = [
  " ##  ",
  "###o ",
  "#=###",
  " ### ",
];
const BIRD_W = BIRD[0].length * CELL;
const BIRD_H = BIRD.length * CELL;

const BEST_KEY = "pixel-flappy-best";

// Square-wave blips, to match the rest of it. Built lazily off the Play click so
// the context is created inside a user gesture.
let audio: AudioContext | null = null;
function beep(from: number, to: number, dur: number, gain = 0.05) {
  try {
    audio ??= new AudioContext();
    if (audio.state === "suspended") void audio.resume();
    const now = audio.currentTime;
    const osc = audio.createOscillator();
    const amp = audio.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), now + dur);
    amp.gain.setValueAtTime(gain, now);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(amp).connect(audio.destination);
    osc.start(now);
    osc.stop(now + dur);
  } catch {
    // No audio device, autoplay blocked, or a browser without WebAudio.
  }
}
const sfxScore = () => { beep(760, 1180, 0.09); setTimeout(() => beep(1180, 1560, 0.07), 70); };
const sfxCrash = () => { beep(320, 60, 0.32, 0.07); };

type Phase = "idle" | "playing" | "over";

export default function FlappyPixel() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [ready, setReady] = useState(false);
  const [best, setBest] = useState(0);

  // The loop reads these through a ref so it never restarts mid-game.
  const game = useRef({
    phase: "idle" as Phase,
    // Classic flappy: the world holds still until the first flap, so pressing
    // Play doesn't drop you straight into a fall you had no time to react to.
    waiting: true,
    startY: 0,
    y: 0,
    vy: 0,
    pipes: [] as Pipe[],
    score: 0,
    t: 0,
  });

  useEffect(() => {
    // localStorage throws outright in some embedded contexts, not just when empty.
    try {
      setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
    } catch {}
  }, []);

  const start = useCallback(() => {
    const g = game.current;
    const h = canvas.current?.clientHeight ?? 320;
    g.phase = "playing";
    g.waiting = true;
    g.startY = h * 0.4;
    g.y = g.startY;
    g.vy = 0;
    g.pipes = [];
    g.score = 0;
    setScore(0);
    setReady(true);
    setPhase("playing");
  }, []);

  const quit = useCallback(() => {
    game.current.phase = "idle";
    setPhase("idle");
  }, []);

  const flap = useCallback(() => {
    const g = game.current;
    if (g.phase === "playing") {
      if (g.waiting) setReady(false);
      g.waiting = false;
      g.vy = FLAP;
    }
    else if (g.phase === "idle" || g.phase === "over") start();
  }, [start]);

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const DPR = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0, last = performance.now();

    function size() {
      W = cv!.clientWidth;
      H = cv!.clientHeight;
      cv!.width = Math.round(W * DPR);
      cv!.height = Math.round(H * DPR);
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);

    // Everything lands on the 8px grid, so the whole thing stays pixel-crisp.
    const px = (v: number) => Math.round(v / CELL) * CELL;
    const box = (x: number, y: number, w: number, h: number, c: string) => {
      ctx!.fillStyle = c;
      ctx!.fillRect(px(x), px(y), px(w), px(h));
    };

    function grid() {
      ctx!.strokeStyle = LINE;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let x = 0; x <= W; x += CELL) { ctx!.moveTo(x + 0.5, 0); ctx!.lineTo(x + 0.5, H); }
      for (let y = 0; y <= H; y += CELL) { ctx!.moveTo(0, y + 0.5); ctx!.lineTo(W, y + 0.5); }
      ctx!.stroke();
    }

    function skyline(t: number) {
      // Idle state: a slow pixel skyline, deterministic so it doesn't shimmer.
      const cols = Math.ceil(W / CELL);
      const off = Math.floor((t * 0.02) / CELL) * CELL;
      for (let c = 0; c < cols; c++) {
        const k = c + off / CELL;
        const h = 2 + Math.floor((Math.sin(k * 0.4) + Math.sin(k * 0.13) + 2) * 2.4);
        for (let i = 0; i < h; i++) {
          const lit = (k * 7 + i * 13) % 11 === 0;
          box(c * CELL, H - GROUND - (i + 1) * CELL, CELL, CELL, lit ? NEON : "#dcdcdc");
        }
      }
      box(0, H - GROUND, W, GROUND, INK);
    }

    function drawBird(y: number, vy: number) {
      const bx = px(W * 0.26);
      // Tilt is faked by nudging rows, which keeps every pixel on the grid.
      const tilt = Math.max(-1, Math.min(1, vy / 500));
      const cells: [number, number, string][] = [];
      const filled = new Set<string>();
      for (let r = 0; r < BIRD.length; r++) {
        const shift = Math.round(tilt * (r - BIRD.length / 2) * 0.5);
        for (let c = 0; c < BIRD[r].length; c++) {
          const ch = BIRD[r][c];
          if (ch === " ") continue;
          const rr = r + shift;
          filled.add(`${c},${rr}`);
          cells.push([c, rr, ch === "o" ? INK : ch === "=" ? BLUE : NEON]);
        }
      }
      // One-cell ink outline: neon on white is otherwise almost invisible at this size.
      for (const [c, r] of cells) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (filled.has(`${c + dc},${r + dr}`)) continue;
            box(bx + (c + dc) * CELL, y + (r + dr) * CELL, CELL, CELL, INK);
          }
        }
      }
      for (const [c, r, col] of cells) box(bx + c * CELL, y + r * CELL, CELL, CELL, col);
    }

    function drawPipe(p: Pipe) {
      const floor = H - GROUND;
      box(p.x, 0, PIPE_W, p.gapY, INK);
      box(p.x - CELL, p.gapY - CELL, PIPE_W + 2 * CELL, CELL, NEON);
      box(p.x, p.gapY + GAP, PIPE_W, floor - (p.gapY + GAP), INK);
      box(p.x - CELL, p.gapY + GAP, PIPE_W + 2 * CELL, CELL, NEON);
    }

    // One cell of slack on every side, so near-misses feel fair.
    const hits = (y: number, pipes: Pipe[]) =>
      collides(
        {
          birdLeft: px(W * 0.26) + CELL,
          birdRight: px(W * 0.26) + BIRD_W - CELL,
          birdTop: y + CELL,
          birdBottom: y + BIRD_H - CELL,
          floor: H - GROUND,
          pipeW: PIPE_W,
          gap: GAP,
        },
        pipes,
      );

    function frame(now: number) {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      const g = game.current;
      g.t += dt * 1000;

      ctx!.clearRect(0, 0, W, H);
      grid();

      if (g.phase !== "playing") {
        if (g.phase === "over") {
          // Freeze the crash scene; the skyline would read as scenery behind pipes.
          for (const p of g.pipes) drawPipe(p);
          box(0, H - GROUND, W, GROUND, INK);
          drawBird(g.y, 0);
        } else {
          skyline(g.t);
        }
        raf = requestAnimationFrame(frame);
        return;
      }

      if (g.waiting) {
        g.y = g.startY + Math.sin(g.t / 220) * CELL;
        for (const p of g.pipes) drawPipe(p);
        box(0, H - GROUND, W, GROUND, INK);
        drawBird(g.y, 0);
        raf = requestAnimationFrame(frame);
        return;
      }

      g.vy += GRAVITY * dt;
      g.y += g.vy * dt;

      const lastPipe = g.pipes[g.pipes.length - 1];
      if (!lastPipe || lastPipe.x < W - SPACING) {
        g.pipes.push({
          x: W,
          gapY: nextGapY(lastPipe?.gapY ?? null, H - GROUND, GAP, CELL, Math.random()),
          scored: false,
        });
      }
      const bx = px(W * 0.26);
      const gained = advancePipes(g.pipes, dt, SPEED, bx, PIPE_W);
      if (gained) {
        g.score += gained;
        setScore(g.score);
        sfxScore();
      }
      g.pipes = g.pipes.filter((p) => p.x > -PIPE_W - CELL);

      for (const p of g.pipes) drawPipe(p);
      box(0, H - GROUND, W, GROUND, INK);
      drawBird(g.y, g.vy);

      if (hits(g.y, g.pipes)) {
        sfxCrash();
        g.phase = "over";
        setPhase("over");
        setBest((b) => {
          const next = Math.max(b, g.score);
          try {
            localStorage.setItem(BEST_KEY, String(next));
          } catch {}
          return next;
        });
        // One-frame hit flash.
        ctx!.globalAlpha = 0.35;
        box(0, 0, W, H, RED);
        ctx!.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // Space/ArrowUp fly, Escape backs out. Only while the game is up, so the page
  // keeps its normal keyboard scrolling the rest of the time.
  useEffect(() => {
    if (phase === "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        flap();
      } else if (e.code === "Escape") {
        quit();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [phase, flap, quit]);

  return (
    <section className={`game ${phase !== "idle" ? "playing" : ""}`} id="play" aria-label="Pixel flappy game">
      <canvas
        ref={canvas}
        onPointerDown={(e) => { e.preventDefault(); flap(); }}
        aria-hidden="true"
      />

      {phase === "idle" && (
        <button className="btn g-teaser" type="button" onClick={start}>
          Play — pixel flappy
        </button>
      )}

      {phase !== "idle" && (
        <>
          <div className="g-score mono">
            {score} <span>best {best}</span>
          </div>
          <button className="g-close" type="button" onClick={quit} aria-label="Close game">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <p className="g-hint mono">
            {ready ? "Click, tap or press space to start" : "Click, tap or space to fly · esc to close"}
          </p>
        </>
      )}

      {phase === "over" && (
        <div className="g-over">
          <p className="ttl">{score === best && score > 0 ? "New best" : "Game over"} — {score}</p>
          <button className="btn g-again" type="button" onClick={start}>▶ Play again</button>
        </div>
      )}
    </section>
  );
}
