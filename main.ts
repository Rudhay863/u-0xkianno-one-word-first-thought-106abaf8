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

import { mkdirSync, writeFileSync } from "node:fs";

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
writeFileSync(OUTPUT_PATH, WORD, "utf8");
