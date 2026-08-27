/** Pure rules for the pixel flappy game, kept out of the render loop so they can be tested. */

export type Pipe = { x: number; gapY: number; scored: boolean };

export type Board = {
  birdLeft: number;
  birdRight: number;
  birdTop: number;
  birdBottom: number;
  floor: number;
  pipeW: number;
  gap: number;
};

/** A pipe scores once its trailing edge is fully behind the bird. */
export function passed(pipe: Pipe, birdX: number, pipeW: number) {
  return !pipe.scored && pipe.x + pipeW < birdX;
}

/** Ground, ceiling, or any pipe the bird's box overlaps outside the gap. */
export function collides(b: Board, pipes: Pipe[]) {
  if (b.birdBottom >= b.floor || b.birdTop <= 0) return true;
  return pipes.some(
    (p) =>
      b.birdRight > p.x &&
      b.birdLeft < p.x + b.pipeW &&
      (b.birdTop < p.gapY || b.birdBottom > p.gapY + b.gap),
  );
}

/**
 * Move every pipe left by one frame and return how many newly cleared the bird.
 * Mutates in place: this runs inside the render loop.
 */
export function advancePipes(pipes: Pipe[], dt: number, speed: number, birdX: number, pipeW: number) {
  let scored = 0;
  for (const p of pipes) {
    p.x -= speed * dt;
    if (passed(p, birdX, pipeW)) {
      p.scored = true;
      scored++;
    }
  }
  return scored;
}

/**
 * Where the next gap sits. Clamped near the previous pipe so consecutive gaps
 * can't jump the full height of the board — that produced pipes no player
 * could physically climb to in the time between them.
 */
export function nextGapY(prev: number | null, floor: number, gap: number, cell: number, rand: number) {
  const min = 3 * cell;
  const max = floor - gap - 3 * cell;
  if (max <= min) return min;
  const drift = 9 * cell;
  const lo = prev == null ? min : Math.max(min, prev - drift);
  const hi = prev == null ? max : Math.min(max, prev + drift);
  // Snap the bounds to the grid first. Snapping the result instead rounds it
  // past `max` at the top of the range.
  const loSnap = Math.ceil(lo / cell) * cell;
  const hiSnap = Math.floor(hi / cell) * cell;
  if (hiSnap <= loSnap) return loSnap;
  return loSnap + Math.round(rand * ((hiSnap - loSnap) / cell)) * cell;
}
