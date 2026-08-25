export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  native_language_id: string;
  target_language_id: string;
  level: LearningLevel;
  daily_goal_minutes: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  created_at: string;
}

export type LearningLevel = "beginner" | "elementary" | "intermediate";

export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  flag_emoji: string;
  is_active: boolean;
}

export interface Course {
  id: string;
  language_id: string;
  level: LearningLevel;
  title: string;
  description: string;
  order_index: number;
}

export interface Unit {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  is_locked: boolean;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  description: string;
  order_index: number;
  xp_reward: number;
  is_locked: boolean;
}

export interface Vocabulary {
  id: string;
  language_id: string;
  word: string;
  translation: string;
  part_of_speech: string;
  gender?: string;
  article?: string;
  audio_url?: string;
  example_sentence?: string;
  example_translation?: string;
}

export interface VocabularyForm {
  id: string;
  vocabulary_id: string;
  form_type: string;
  form_value: string;
  gender?: string;
  number?: string;
  case?: string;
}

export interface Translation {
  id: string;
  source_language_id: string;
  target_language_id: string;
  source_text: string;
  target_text: string;
  context?: string;
}

export interface Sentence {
  id: string;
  language_id: string;
  text: string;
  translation: string;
  audio_url?: string;
  difficulty: number;
}

export interface GrammarRule {
  id: string;
  language_id: string;
  title: string;
  explanation: string;
  examples: string[];
  unit_id?: string;
}

export type ExerciseType =
  | "multiple_choice"
  | "translation"
  | "word_order"
  | "listening"
  | "matching"
  | "fill_blank";

export interface Exercise {
  id: string;
  lesson_id: string;
  type: ExerciseType;
  question: string;
  correct_answer: string;
  explanation?: string;
  order_index: number;
  xp_value: number;
}

export interface ExerciseOption {
  id: string;
  exercise_id: string;
  text: string;
  is_correct: boolean;
  order_index: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  attempts: number;
  completed_at?: string;
}

export interface UserVocabulary {
  id: string;
  user_id: string;
  vocabulary_id: string;
  mastery: number;
  correct_count: number;
  incorrect_count: number;
  last_reviewed: string;
  next_review: string;
}

export interface UserAnswer {
  id: string;
  user_id: string;
  exercise_id: string;
  answer: string;
  is_correct: boolean;
  answered_at: string;
}

export interface Streak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}

export interface DailyGoal {
  id: string;
  user_id: string;
  date: string;
  target_minutes: number;
  actual_minutes: number;
  completed: boolean;
}

export interface LessonExercise {
  exercise: Exercise;
  options?: ExerciseOption[];
  vocabulary?: Vocabulary[];
  sentences?: Sentence[];
}
