export const config = {
  database: {
    url: process.env.DATABASE_URL || "",
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET || "",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
  ai: {
    provider: process.env.AI_PROVIDER || "gemini",
    geminiApiKey: process.env.GEMINI_API_KEY || "",
  },
  tts: {
    provider: process.env.TTS_PROVIDER || "google",
  },
  app: {
    name: "LUNO",
    description: "Learn languages through short, interactive practice",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  gamification: {
    xpPerCorrectAnswer: 10,
    xpPerLessonComplete: 50,
    xpPerPerfectLesson: 100,
    streakBonusMultiplier: 1.5,
    levels: [
      { level: 1, xpRequired: 0 },
      { level: 2, xpRequired: 100 },
      { level: 3, xpRequired: 300 },
      { level: 4, xpRequired: 600 },
      { level: 5, xpRequired: 1000 },
      { level: 6, xpRequired: 1500 },
      { level: 7, xpRequired: 2100 },
      { level: 8, xpRequired: 2800 },
      { level: 9, xpRequired: 3600 },
      { level: 10, xpRequired: 5000 },
    ],
  },
  spacedReview: {
    easyInterval: 4,
    hardInterval: 1,
    maxInterval: 365,
    easeFactor: 2.5,
  },
} as const;
