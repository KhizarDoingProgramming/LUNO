/**
 * Data Processing Pipeline for LUNO
 *
 * Raw data → Clean → Normalize → Filter → Curriculum → Database
 *
 * This script processes language data from external sources
 * and prepares it for import into the database.
 *
 * Usage: npx tsx scripts/data-import/process.ts
 */

interface RawWord {
  word: string;
  language: string;
  partOfSpeech?: string;
  gender?: string;
  article?: string;
  translations?: string[];
  forms?: Record<string, string>;
  exampleSentence?: string;
  exampleTranslation?: string;
}

interface ProcessedWord extends RawWord {
  cleaned: boolean;
  difficulty: number;
}

function cleanWord(word: string): string {
  return word
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\s\-']/gu, "");
}

function normalizePartOfSpeech(pos: string): string {
  const mapping: Record<string, string> = {
    noun: "noun",
    verb: "verb",
    adjective: "adjective",
    adverb: "adverb",
    pronoun: "pronoun",
    preposition: "preposition",
    conjunction: "conjunction",
    interjection: "interjection",
    article: "article",
    numeral: "numeral",
  };

  const lower = pos.toLowerCase();
  return mapping[lower] || "other";
}

function assessDifficulty(word: string, forms?: Record<string, string>): number {
  let difficulty = 1;

  if (word.length > 10) difficulty++;
  if (forms && Object.keys(forms).length > 3) difficulty++;
  if (/[а-яА-Я]/.test(word) && /[a-zA-Z]/.test(word)) difficulty++;

  return Math.min(5, difficulty);
}

export function processWord(raw: RawWord): ProcessedWord {
  const cleaned = {
    ...raw,
    word: cleanWord(raw.word),
    partOfSpeech: raw.partOfSpeech
      ? normalizePartOfSpeech(raw.partOfSpeech)
      : undefined,
    cleaned: true,
    difficulty: assessDifficulty(raw.word, raw.forms),
  };

  return cleaned;
}

export function filterUsefulWords(words: ProcessedWord[]): ProcessedWord[] {
  return words.filter((w) => {
    if (!w.word || w.word.length < 2) return false;
    if (w.translations && w.translations.length === 0) return false;
    if (["punctuation", "symbol"].includes(w.partOfSpeech || "")) return false;
    return true;
  });
}

export function formatForDatabase(words: ProcessedWord[]) {
  return words.map((w) => ({
    word: w.word,
    translation: w.translations?.[0] || "",
    part_of_speech: w.partOfSpeech || "other",
    gender: w.gender,
    article: w.article,
    example_sentence: w.exampleSentence,
    example_translation: w.exampleTranslation,
    difficulty: w.difficulty,
  }));
}

if (require.main === module) {
  console.log("LUNO Data Processing Pipeline");
  console.log("============================");
  console.log("This script processes raw language data into curriculum-ready format.");
  console.log("");
  console.log("To use:");
  console.log("1. Place raw data files in data/raw/");
  console.log("2. Run this script");
  console.log("3. Processed data will be output to data/processed/");
  console.log("");
  console.log("Supported raw formats:");
  console.log("- Tatoeba sentences (TSV)");
  console.log("- Kaikki/Wiktionary lexemes (JSONL)");
  console.log("- Custom word lists (JSON)");
}
