/**
 * Content Protection Service
 *
 * Scrambles copied text to prevent unauthorised reproduction of medical
 * content.  When a non-admin user copies text, the clipboard receives a
 * version that *looks* plausible at first glance but is unusable:
 *
 *   1.  Homoglyph substitution – common Latin letters are randomly
 *       replaced with visually similar Unicode characters (Cyrillic,
 *       Greek, etc.) so the text cannot be pasted into documents, search
 *       engines, or AI tools and still make sense.
 *
 *   2.  Zero-width character injection – invisible Unicode code-points
 *       are inserted between characters, breaking keyword searches and
 *       automated text extraction.
 *
 *   3.  Selective word reversal – a fraction of multi-character words
 *       have their inner letters shuffled, making the result unreadable
 *       even if the homoglyphs are stripped.
 */

// ---------------------------------------------------------------------------
// 1.  Homoglyph map – Latin → visually similar Unicode alternatives
// ---------------------------------------------------------------------------

const HOMOGLYPHS: Record<string, string[]> = {
  // Lowercase
  a: ['\u0430', '\u0251'],               // Cyrillic а, Latin alpha
  c: ['\u0441', '\u03F2'],               // Cyrillic с, Greek lunate sigma
  d: ['\u0501', '\u217E'],               // Cyrillic ԁ, Roman numeral small d
  e: ['\u0435', '\u0117'],               // Cyrillic е, Latin e with dot above
  g: ['\u0261'],                          // Latin script small g
  h: ['\u04BB'],                          // Cyrillic shha
  i: ['\u0456', '\u00ED'],               // Cyrillic і, Latin i acute
  j: ['\u0458'],                          // Cyrillic je
  k: ['\u03BA'],                          // Greek kappa
  l: ['\u04CF', '\u217C'],               // Cyrillic palochka, Roman numeral l
  n: ['\u0578'],                          // Armenian no
  o: ['\u043E', '\u03BF'],               // Cyrillic о, Greek omicron
  p: ['\u0440', '\u03C1'],               // Cyrillic р, Greek rho
  q: ['\u051B'],                          // Cyrillic qa
  s: ['\u0455'],                          // Cyrillic dze
  u: ['\u057D'],                          // Armenian se (visually similar)
  v: ['\u03BD'],                          // Greek nu
  w: ['\u051D'],                          // Cyrillic we
  x: ['\u0445', '\u04B3'],               // Cyrillic kha, Cyrillic ha with descender
  y: ['\u0443', '\u04AF'],               // Cyrillic у, Cyrillic ue
  z: ['\u0290'],                          // Latin z with retroflex hook

  // Uppercase
  A: ['\u0410', '\u0391'],               // Cyrillic А, Greek Alpha
  B: ['\u0412', '\u0392'],               // Cyrillic В, Greek Beta
  C: ['\u0421', '\u03F9'],               // Cyrillic С, Greek capital lunate sigma
  D: ['\u216E'],                          // Roman numeral D
  E: ['\u0415', '\u0395'],               // Cyrillic Е, Greek Epsilon
  F: ['\u03DC'],                          // Greek digamma
  G: ['\u050C'],                          // Cyrillic komi dje
  H: ['\u041D', '\u0397'],               // Cyrillic Н, Greek Eta
  I: ['\u0406', '\u0399'],               // Cyrillic І, Greek Iota
  J: ['\u0408'],                          // Cyrillic Je
  K: ['\u039A', '\u212A'],               // Greek Kappa, Kelvin sign
  L: ['\u216C'],                          // Roman numeral L
  M: ['\u041C', '\u039C'],               // Cyrillic М, Greek Mu
  N: ['\u039D'],                          // Greek Nu
  O: ['\u041E', '\u039F'],               // Cyrillic О, Greek Omicron
  P: ['\u0420', '\u03A1'],               // Cyrillic Р, Greek Rho
  Q: ['\u051A'],                          // Cyrillic Qa
  R: ['\u042F'],                          // Cyrillic Ya (reversed R appearance)
  S: ['\u0405'],                          // Cyrillic Dze
  T: ['\u0422', '\u03A4'],               // Cyrillic Т, Greek Tau
  U: ['\u054D'],                          // Armenian Seh
  V: ['\u0474'],                          // Cyrillic Izhitsa
  W: ['\u051C'],                          // Cyrillic We
  X: ['\u0425', '\u03A7'],               // Cyrillic Х, Greek Chi
  Y: ['\u04AE', '\u03A5'],               // Cyrillic Ue, Greek Upsilon
  Z: ['\u0396'],                          // Greek Zeta
};

// ---------------------------------------------------------------------------
// 2.  Zero-width characters used as invisible separators
// ---------------------------------------------------------------------------

const ZERO_WIDTH_CHARS = [
  '\u200B',  // zero-width space
  '\u200C',  // zero-width non-joiner
  '\u200D',  // zero-width joiner
  '\uFEFF',  // zero-width no-break space (BOM)
  '\u2060',  // word joiner
];

// ---------------------------------------------------------------------------
// 3.  Helpers
// ---------------------------------------------------------------------------

/** Seeded-ish fast random for deterministic-looking but varied output. */
function pseudoRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 0xFFFFFFFF;
  };
}

/** Simple string hash to seed the PRNG per-invocation. */
function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

/** Shuffle the *inner* characters of a word (keep first & last). */
function shuffleInner(word: string, rng: () => number): string {
  if (word.length <= 3) return word;
  const inner = word.slice(1, -1).split('');
  // Fisher-Yates shuffle on inner chars
  for (let i = inner.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [inner[i], inner[j]] = [inner[j], inner[i]];
  }
  return word[0] + inner.join('') + word[word.length - 1];
}

// ---------------------------------------------------------------------------
// 4.  Main export
// ---------------------------------------------------------------------------

/**
 * Takes a text selection and returns a scrambled version that is placed in the
 * clipboard instead of the original.  The scrambled text is designed to look
 * superficially similar but be completely unusable for reproduction, searching
 * or AI ingestion.
 *
 * @param text - The original selected text
 * @returns A scrambled version of the text
 */
export function addExtraScrambling(text: string): string {
  if (!text) return text;

  const rng = pseudoRandom(hashCode(text) ^ Date.now());

  // Probability thresholds — tuned so the text is clearly corrupted when
  // pasted but the scrambling is not trivially reversible.
  const HOMOGLYPH_CHANCE = 0.45;   // 45 % of eligible chars get swapped
  const ZWC_INSERT_CHANCE = 0.30;  // 30 % chance of zero-width insert after a char
  const WORD_SHUFFLE_CHANCE = 0.35; // 35 % of words get inner-shuffled

  // Split into tokens preserving whitespace / punctuation boundaries
  const tokens = text.match(/[\S]+|\s+/g) || [text];

  const scrambled = tokens.map(token => {
    // Don't touch whitespace-only tokens
    if (/^\s+$/.test(token)) return token;

    // Potentially shuffle inner letters of the word
    let word = token;
    if (rng() < WORD_SHUFFLE_CHANCE) {
      word = shuffleInner(word, rng);
    }

    // Walk each character — apply homoglyph and zero-width injection
    let result = '';
    for (let i = 0; i < word.length; i++) {
      let ch = word[i];

      // Homoglyph substitution
      const alternatives = HOMOGLYPHS[ch];
      if (alternatives && rng() < HOMOGLYPH_CHANCE) {
        ch = alternatives[Math.floor(rng() * alternatives.length)];
      }

      result += ch;

      // Zero-width character injection (not after the last char)
      if (i < word.length - 1 && rng() < ZWC_INSERT_CHANCE) {
        result += ZERO_WIDTH_CHARS[Math.floor(rng() * ZERO_WIDTH_CHARS.length)];
      }
    }

    return result;
  });

  return scrambled.join('');
}
