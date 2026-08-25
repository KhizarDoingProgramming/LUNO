import { config } from "@/config";

export interface SpacedReviewItem {
  vocabularyId: string;
  mastery: number;
  correctCount: number;
  incorrectCount: number;
  lastReviewed: Date;
  nextReview: Date;
}

export function calculateNextReview(item: SpacedReviewItem, isCorrect: boolean): SpacedReviewItem {
  const { easyInterval, hardInterval, maxInterval, easeFactor } = config.spacedReview;

  let newMastery = item.mastery;
  let newInterval: number;

  if (isCorrect) {
    newMastery = Math.min(100, item.mastery + 10);
    const streakBonus = Math.floor(item.correctCount / 3);
    newInterval = Math.min(
      maxInterval,
      easyInterval * Math.pow(easeFactor, streakBonus)
    );
  } else {
    newMastery = Math.max(0, item.mastery - 20);
    newInterval = hardInterval;
  }

  const now = new Date();
  const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

  return {
    ...item,
    mastery: newMastery,
    correctCount: isCorrect ? item.correctCount + 1 : item.correctCount,
    incorrectCount: isCorrect ? item.incorrectCount : item.incorrectCount + 1,
    lastReviewed: now,
    nextReview,
  };
}

export function getReviewPriority(item: SpacedReviewItem): number {
  const now = new Date();
  const overdue = now.getTime() - item.nextReview.getTime();
  const masteryPenalty = 100 - item.mastery;

  return overdue / (1000 * 60 * 60 * 24) + masteryPenalty;
}

export function sortByReviewPriority(items: SpacedReviewItem[]): SpacedReviewItem[] {
  return [...items].sort(
    (a, b) => getReviewPriority(b) - getReviewPriority(a)
  );
}
