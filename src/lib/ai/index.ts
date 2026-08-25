export interface AIProvider {
  generateResponse(input: AIInput): Promise<AIOutput>;
  correctSentence(sentence: string, language: string): Promise<CorrectionResult>;
  explainMistake(mistake: string, correct: string, language: string): Promise<string>;
  generatePractice(vocabulary: string[], level: string, language: string): Promise<ExerciseData[]>;
}

export interface AIInput {
  prompt: string;
  context?: string;
  language?: string;
  level?: string;
}

export interface AIOutput {
  text: string;
  confidence?: number;
  alternatives?: string[];
}

export interface CorrectionResult {
  original: string;
  corrected: string;
  corrections: Array<{
    original: string;
    corrected: string;
    explanation: string;
    type: "grammar" | "spelling" | "vocabulary" | "word_order";
  }>;
  isCorrect: boolean;
}

export interface ExerciseData {
  type: string;
  question: string;
  correctAnswer: string;
  options?: string[];
  explanation?: string;
}

export class GeminiProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(input: AIInput): Promise<AIOutput> {
    if (!this.apiKey) {
      return {
        text: "AI provider not configured. Please add your Gemini API key.",
        confidence: 0,
      };
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input.prompt }] }],
          }),
        }
      );

      const data = await response.json();
      return {
        text: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
        confidence: 0.8,
      };
    } catch {
      return { text: "Failed to generate response", confidence: 0 };
    }
  }

  async correctSentence(
    sentence: string,
    language: string
  ): Promise<CorrectionResult> {
    const prompt = `Correct this ${language} sentence. Return JSON with: original, corrected, isCorrect (boolean), and corrections array (each with original, corrected, explanation, type).\n\nSentence: "${sentence}"`;

    const result = await this.generateResponse({ prompt, language });

    try {
      const parsed = JSON.parse(result.text);
      return {
        original: sentence,
        corrected: parsed.corrected || sentence,
        corrections: parsed.corrections || [],
        isCorrect: parsed.isCorrect ?? false,
      };
    } catch {
      return {
        original: sentence,
        corrected: sentence,
        corrections: [],
        isCorrect: true,
      };
    }
  }

  async explainMistake(
    mistake: string,
    correct: string,
    language: string
  ): Promise<string> {
    const prompt = `Explain why "${mistake}" is wrong in ${language} and why "${correct}" is correct. Be brief and clear.`;
    const result = await this.generateResponse({ prompt, language });
    return result.text;
  }

  async generatePractice(
    vocabulary: string[],
    level: string,
    language: string
  ): Promise<ExerciseData[]> {
    const prompt = `Generate 5 ${language} exercises for a ${level} learner using these words: ${vocabulary.join(", ")}. Return JSON array with objects containing: type (multiple_choice/translation/word_order), question, correctAnswer, options (for multiple_choice), explanation.`;

    const result = await this.generateResponse({ prompt, language });

    try {
      return JSON.parse(result.text);
    } catch {
      return [];
    }
  }
}

export class MockProvider implements AIProvider {
  async generateResponse(input: AIInput): Promise<AIOutput> {
    return {
      text: `[Mock AI] This is a placeholder response. Configure a real AI provider to enable conversation features.`,
      confidence: 0,
    };
  }

  async correctSentence(
    sentence: string,
    _language: string
  ): Promise<CorrectionResult> {
    return {
      original: sentence,
      corrected: sentence,
      corrections: [],
      isCorrect: true,
    };
  }

  async explainMistake(
    _mistake: string,
    _correct: string,
    _language: string
  ): Promise<string> {
    return "AI explanation unavailable. Please configure an AI provider.";
  }

  async generatePractice(
    _vocabulary: string[],
    _level: string,
    _language: string
  ): Promise<ExerciseData[]> {
    return [];
  }
}

export function createAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || "mock";
  const apiKey = process.env.GEMINI_API_KEY || "";

  switch (provider) {
    case "gemini":
      return new GeminiProvider(apiKey);
    default:
      return new MockProvider();
  }
}
