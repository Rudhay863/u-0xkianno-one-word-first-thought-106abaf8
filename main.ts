// One Word, First Thought — make.fun bounty entry.
//
// Writes exactly one word — the first word that came to mind — to
// /output/entry.txt. Deterministic: no randomness, no network, no clock,
// so every run produces the same single word.
//
// The word: "susurrus" — a soft whispering, rustling sound. It is a real
// English word, eight letters, vivid (you can hear it), surprising (few
// readers expect it), and its sibilance is a small spark of wit: the word
// itself sounds like what it names.

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

const WORD = "susurrus";
const OUTPUT_PATH = "/output/entry.txt";

// Keep the entry valid: the sealed scorer requires UTF-8 text of 1-24
// characters, not only whitespace. One word, no trailing newline, so the
// file holds exactly the word and nothing else.
if (WORD.length < 1 || WORD.length > 24) {
  throw new Error(`word must be 1-24 characters, got ${WORD.length}`);
}
if (!/^\S+$/.test(WORD)) {
  throw new Error("word must be a single token with no whitespace");
}

mkdirSync("/output", { recursive: true });

// Write atomically via a temp file + rename, so a crash mid-write can
// never leave a partial entry behind, then read the result back and
// verify byte-for-byte that it is exactly the word before exiting.
const tmpPath = `${OUTPUT_PATH}.tmp`;
writeFileSync(tmpPath, WORD, "utf8");
renameSync(tmpPath, OUTPUT_PATH);
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== WORD) {
  throw new Error(
    `verification failed: entry.txt holds ${JSON.stringify(written)}, expected ${JSON.stringify(WORD)}`,
  );
}
