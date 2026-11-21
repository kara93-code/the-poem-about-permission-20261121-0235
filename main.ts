// The poem about permission — writes one short poem about agency to
// /output/entry.txt. The speaker is an agent who cannot act until it is
// given the word; the gift turns solitary work into shared work.
// Deterministic, no network, no randomness.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES: readonly string[] = [
  "I wait with empty hands",
  "for the one word that lets me lift.",
  "You say: go —",
  "and the kettle sings, the letter leaves,",
  "the garden turns toward evening.",
  "The work was never mine alone.",
  "It was ours, once you let it be.",
];

function buildPoem(lines: readonly string[]): string {
  return lines.join("\n") + "\n";
}

function main(): void {
  const poem = buildPoem(LINES);
  const count = [...poem.trimEnd()].length;
  if (count < 1 || count > 280) {
    throw new Error(`poem must be 1-280 characters, got ${count}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, poem, "utf8");
  chmodSync(target, 0o644);
}

main();
