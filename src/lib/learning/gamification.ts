import { config } from "@/config";

export function calculateLevel(totalXp: number): number {
  const { levels } = config.gamification;
  let currentLevel = 1;

  for (const level of levels) {
    if (totalXp >= level.xpRequired) {
      currentLevel = level.level;
    }
  }

  return currentLevel;
}

export function getXPForNextLevel(currentLevel: number): number {
  const { levels } = config.gamification;
  const nextLevel = levels.find((l) => l.level === currentLevel + 1);
  return nextLevel?.xpRequired || 0;
}

export function getXPProgress(currentXp: number, currentLevel: number): number {
  const { levels } = config.gamification;
  const currentLevelData = levels.find((l) => l.level === currentLevel);
  const nextLevelData = levels.find((l) => l.level === currentLevel + 1);

  if (!currentLevelData || !nextLevelData) return 100;

  const xpInLevel = currentXp - currentLevelData.xpRequired;
  const xpNeeded = nextLevelData.xpRequired - currentLevelData.xpRequired;

  return Math.min(100, (xpInLevel / xpNeeded) * 100);
}

export function calculateStreak(
  lastActivityDate: string | null,
  currentStreak: number
): { newStreak: number; streakBroken: boolean } {
  if (!lastActivityDate) {
    return { newStreak: 1, streakBroken: false };
  }

  const last = new Date(lastActivityDate);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) {
    return { newStreak: currentStreak, streakBroken: false };
  } else if (diffDays === 1) {
    return { newStreak: currentStreak + 1, streakBroken: false };
  } else {
    return { newStreak: 1, streakBroken: true };
  }
}

export function calculateXPEarned(
  correctAnswers: number,
  totalAnswers: number,
  hasStreak: boolean
): number {
  const baseXP = correctAnswers * config.gamification.xpPerCorrectAnswer;
  const streakBonus = hasStreak
    ? Math.floor(baseXP * config.gamification.streakBonusMultiplier)
    : 0;
  const perfectBonus =
    correctAnswers === totalAnswers && totalAnswers > 0
      ? config.gamification.xpPerPerfectLesson
      : 0;

  return baseXP + streakBonus + perfectBonus;
}
