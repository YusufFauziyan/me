// Run: node lib/flappy.test.ts
import assert from "node:assert/strict";
import { passed, collides, nextGapY, advancePipes, type Pipe, type Board } from "./flappy.ts";

const pipe = (x: number, gapY: number, scored = false): Pipe => ({ x, gapY, scored });

// --- scoring ---
assert.equal(passed(pipe(100, 0), 200, 32), true, "trailing edge behind bird scores");
assert.equal(passed(pipe(180, 0), 200, 32), false, "still overlapping does not score");
assert.equal(passed(pipe(100, 0, true), 200, 32), false, "already scored does not score twice");

// --- the scoring loop: one pipe crossing the bird scores exactly once ---
{
  const pipes = [pipe(500, 100)];
  let total = 0;
  for (let i = 0; i < 400; i++) total += advancePipes(pipes, 1 / 60, 175, 200, 32);
  assert.equal(total, 1, "a pipe that passes the bird scores exactly once");
  assert.ok(pipes[0].x < 200 - 32, "and it ends up behind the bird");
}
{
  const pipes = [pipe(500, 100), pipe(820, 140), pipe(1140, 90)];
  let total = 0;
  for (let i = 0; i < 600; i++) total += advancePipes(pipes, 1 / 60, 175, 200, 32);
  assert.equal(total, 3, "three pipes score three points");
}
{
  const pipes = [pipe(500, 100)];
  let total = 0;
  for (let i = 0; i < 20; i++) total += advancePipes(pipes, 1 / 60, 175, 200, 32);
  assert.equal(total, 0, "a pipe still ahead of the bird scores nothing");
}

// --- collision ---
const board = (top: number, bottom: number): Board => ({
  birdLeft: 200, birdRight: 240, birdTop: top, birdBottom: bottom, floor: 374, pipeW: 32, gap: 104,
});
assert.equal(collides(board(150, 190), []), false, "clear sky is safe");
assert.equal(collides(board(340, 380), []), true, "ground kills");
assert.equal(collides(board(-4, 36), []), true, "ceiling kills");
assert.equal(collides(board(150, 190), [pipe(210, 120)]), false, "inside the gap is safe");
assert.equal(collides(board(150, 190), [pipe(210, 200)]), true, "above the gap hits the top pipe");
assert.equal(collides(board(300, 340), [pipe(210, 120)]), true, "below the gap hits the bottom pipe");
assert.equal(collides(board(150, 190), [pipe(900, 300)]), false, "a far pipe is not a hit");
// Width and height are independent: a short bird must not be treated as a wide one.
assert.equal(
  collides({ birdLeft: 200, birdRight: 224, birdTop: 150, birdBottom: 250, floor: 374, pipeW: 32, gap: 104 }, [pipe(230, 200)]),
  false,
  "pipe just past the bird's right edge is not a hit",
);

// --- gap placement stays reachable ---
const FLOOR = 374, GAP = 104, CELL = 8;
for (const r of [0, 0.25, 0.5, 0.75, 1]) {
  const first = nextGapY(null, FLOOR, GAP, CELL, r);
  assert.ok(first >= 3 * CELL && first <= FLOOR - GAP - 3 * CELL, `first gap ${first} in bounds`);
  assert.equal(first % CELL, 0, "gap snaps to the pixel grid");
  const next = nextGapY(first, FLOOR, GAP, CELL, r);
  assert.ok(Math.abs(next - first) <= 9 * CELL, `gap drift ${next - first} stays climbable`);
  assert.ok(next >= 3 * CELL && next <= FLOOR - GAP - 3 * CELL, `next gap ${next} in bounds`);
}
// A tiny board must not produce an inverted range.
assert.equal(nextGapY(null, 100, 104, CELL, 0.5), 3 * CELL, "degenerate board falls back to the minimum");

console.log("flappy: all assertions passed");
