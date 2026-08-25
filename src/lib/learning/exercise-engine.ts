import type { ExerciseType } from "@/types";

export interface ExerciseRenderer {
  type: ExerciseType;
  component: string;
}

export const exerciseRenderers: Record<ExerciseType, ExerciseRenderer> = {
  multiple_choice: {
    type: "multiple_choice",
    component: "MultipleChoiceExercise",
  },
  translation: {
    type: "translation",
    component: "TranslationExercise",
  },
  word_order: {
    type: "word_order",
    component: "WordOrderExercise",
  },
  listening: {
    type: "listening",
    component: "ListeningExercise",
  },
  matching: {
    type: "matching",
    component: "MatchingExercise",
  },
  fill_blank: {
    type: "fill_blank",
    component: "FillBlankExercise",
  },
};

export function getExerciseRenderer(type: ExerciseType): ExerciseRenderer {
  return (
    exerciseRenderers[type] || {
      type: "multiple_choice",
      component: "MultipleChoiceExercise",
    }
  );
}

export function validateAnswer(
  type: ExerciseType,
  userAnswer: string,
  correctAnswer: string
): boolean {
  switch (type) {
    case "multiple_choice":
    case "translation":
    case "fill_blank":
      return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    case "word_order":
      return userAnswer === correctAnswer;
    default:
      return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  }
}
