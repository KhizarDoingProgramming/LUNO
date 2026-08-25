"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Star,
  Flame,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ExerciseOption {
  id: string;
  text: string;
  is_correct: boolean;
}

interface Exercise {
  id: string;
  type: string;
  question: string;
  correct_answer: string;
  explanation?: string;
  xp_value: number;
  options?: ExerciseOption[];
  metadata?: { words?: string[] };
}

interface LessonData {
  id: string;
  title: string;
  exercises: Exercise[];
}

const lessonDatabase: Record<string, LessonData> = {
  "l1000000-0000-0000-0000-000000000001": {
    id: "l1000000-0000-0000-0000-000000000001",
    title: "Basic Hello",
    exercises: [
      {
        id: "e1000000-0000-0000-0000-000000000001",
        type: "multiple_choice",
        question: 'What does "Здравствуйте" mean?',
        correct_answer: "Hello (formal)",
        explanation: "Здравствуйте is the formal way to say hello in Russian.",
        xp_value: 10,
        options: [
          { id: "1", text: "Goodbye", is_correct: false },
          { id: "2", text: "Hello (formal)", is_correct: true },
          { id: "3", text: "Thank you", is_correct: false },
          { id: "4", text: "Please", is_correct: false },
        ],
      },
      {
        id: "e1000000-0000-0000-0000-000000000002",
        type: "translation",
        question: 'Translate to Russian: "Hello"',
        correct_answer: "Привет",
        explanation: "Привет is the informal way to say hello.",
        xp_value: 10,
      },
      {
        id: "e1000000-0000-0000-0000-000000000003",
        type: "word_order",
        question: "Arrange the words to form a sentence:",
        correct_answer: "Как дела?",
        explanation: "Как дела? means How are you?",
        xp_value: 10,
        metadata: { words: ["как", "дела", "?"] },
      },
      {
        id: "e1000000-0000-0000-0000-000000000004",
        type: "fill_blank",
        question: '____, как дела? (Hello, how are you?)',
        correct_answer: "Привет",
        explanation: "Привет is the informal greeting.",
        xp_value: 10,
      },
      {
        id: "e1000000-0000-0000-0000-000000000005",
        type: "multiple_choice",
        question: 'What does "Привет" mean?',
        correct_answer: "Hi (informal)",
        explanation: "Привет is the informal way to say hi.",
        xp_value: 10,
        options: [
          { id: "1", text: "Goodbye", is_correct: false },
          { id: "2", text: "Please", is_correct: false },
          { id: "3", text: "Hi (informal)", is_correct: true },
          { id: "4", text: "Thank you", is_correct: false },
        ],
      },
    ],
  },
  "l2000000-0000-0000-0000-000000000001": {
    id: "l2000000-0000-0000-0000-000000000001",
    title: "Basic Hello",
    exercises: [
      {
        id: "e2000000-0000-0000-0000-000000000001",
        type: "multiple_choice",
        question: 'What does "Hallo" mean?',
        correct_answer: "Hello",
        explanation: "Hallo is the most common informal greeting in German.",
        xp_value: 10,
        options: [
          { id: "1", text: "Goodbye", is_correct: false },
          { id: "2", text: "Hello", is_correct: true },
          { id: "3", text: "Thank you", is_correct: false },
          { id: "4", text: "Please", is_correct: false },
        ],
      },
      {
        id: "e2000000-0000-0000-0000-000000000002",
        type: "translation",
        question: 'Translate to German: "Good day"',
        correct_answer: "Guten Tag",
        explanation: "Guten Tag is a formal greeting used during the day.",
        xp_value: 10,
      },
      {
        id: "e2000000-0000-0000-0000-000000000003",
        type: "word_order",
        question: "Arrange the words to form a sentence:",
        correct_answer: "Guten Tag",
        explanation: "Guten Tag means Good day.",
        xp_value: 10,
        metadata: { words: ["Tag", "Guten"] },
      },
      {
        id: "e2000000-0000-0000-0000-000000000004",
        type: "fill_blank",
        question: '____, wie geht es Ihnen? (Hello, how are you?)',
        correct_answer: "Hallo",
        explanation: "Hallo is the informal greeting.",
        xp_value: 10,
      },
      {
        id: "e2000000-0000-0000-0000-000000000005",
        type: "multiple_choice",
        question: 'What does "Guten Tag" mean?',
        correct_answer: "Good day",
        explanation: "Guten Tag is a formal daytime greeting.",
        xp_value: 10,
        options: [
          { id: "1", text: "Good night", is_correct: false },
          { id: "2", text: "Good day", is_correct: true },
          { id: "3", text: "Goodbye", is_correct: false },
          { id: "4", text: "Good morning", is_correct: false },
        ],
      },
    ],
  },
};

type ExerciseState = "active" | "correct" | "incorrect" | "completed";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const initialLesson = lessonDatabase[lessonId] || null;
  const [lesson] = useState<LessonData | null>(initialLesson);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exerciseState, setExerciseState] = useState<ExerciseState>("active");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [textInput, setTextInput] = useState("");
  const [wordOrder, setWordOrder] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    if (initialLesson?.exercises[0]?.type === "word_order" && initialLesson.exercises[0].metadata?.words) {
      return [...initialLesson.exercises[0].metadata.words].sort(() => Math.random() - 0.5);
    }
    return [];
  });
  const [score, setScore] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ exerciseId: string; correct: boolean; xp: number }>
  >([]);

  if (!lesson || !lesson.exercises[currentIndex]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-muted)] mb-4">Lesson not found</p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentExercise = lesson.exercises[currentIndex];
  const progress =
    lesson.exercises.length > 0
      ? (currentIndex / lesson.exercises.length) * 100
      : 0;

  const checkAnswer = () => {
    let isCorrect = false;

    switch (currentExercise.type) {
      case "multiple_choice":
        isCorrect =
          currentExercise.options?.find((o) => o.text === selectedAnswer)
            ?.is_correct || false;
        break;
      case "translation":
      case "fill_blank":
        isCorrect =
          textInput.trim().toLowerCase() ===
          currentExercise.correct_answer.toLowerCase();
        break;
      case "word_order":
        isCorrect = wordOrder.join(" ") === currentExercise.correct_answer;
        break;
      default:
        break;
    }

    if (isCorrect) {
      setScore(score + 1);
      setTotalXp(totalXp + currentExercise.xp_value);
    }

    setAnswers([
      ...answers,
      {
        exerciseId: currentExercise.id,
        correct: isCorrect,
        xp: isCorrect ? currentExercise.xp_value : 0,
      },
    ]);

    setExerciseState(isCorrect ? "correct" : "incorrect");
  };

  const nextExercise = () => {
    if (currentIndex < lesson.exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setExerciseState("completed");
    }
  };

  const addWordToOrder = (word: string) => {
    setAvailableWords(availableWords.filter((w) => w !== word));
    setWordOrder([...wordOrder, word]);
  };

  const removeWordFromOrder = (index: number) => {
    const word = wordOrder[index];
    setWordOrder(wordOrder.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const accuracy =
    answers.length > 0
      ? Math.round((answers.filter((a) => a.correct).length / answers.length) * 100)
      : 0;

  if (exerciseState === "completed") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-background)]">
        <motion.div
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[var(--color-card)] rounded-3xl border border-[var(--color-border)] p-8 shadow-lg">
            <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-10 w-10 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Lesson Complete!</h1>
            <p className="text-[var(--color-muted)] mb-8">
              Great work on &ldquo;{lesson.title}&rdquo;
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[var(--color-surface)]">
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {score}/{lesson.exercises.length}
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  Correct
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-surface)]">
                <p className="text-2xl font-bold text-[var(--color-xp)]">
                  +{totalXp}
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  XP Earned
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-surface)]">
                <p className="text-2xl font-bold text-emerald-500">
                  {accuracy}%
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  Accuracy
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[var(--color-muted)]">
              <Flame className="h-4 w-4 text-[var(--color-streak)]" />
              Streak maintained!
              <Star className="h-4 w-4 text-[var(--color-xp)] ml-2" />
              +{totalXp} XP
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={() => router.push("/dashboard")}
              >
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCurrentIndex(0);
                  setScore(0);
                  setTotalXp(0);
                  setAnswers([]);
                  setExerciseState("active");
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Practice again
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <Progress value={progress} />
          </div>
          <span className="text-sm text-[var(--color-muted)]">
            {currentIndex + 1}/{lesson.exercises.length}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full px-3 py-1 text-xs font-medium mb-4">
                {currentExercise.type === "multiple_choice" && "Multiple Choice"}
                {currentExercise.type === "translation" && "Translation"}
                {currentExercise.type === "word_order" && "Word Order"}
                {currentExercise.type === "fill_blank" && "Fill in the Blank"}
                {currentExercise.type === "listening" && "Listening"}
                {currentExercise.type === "matching" && "Matching"}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {currentExercise.question}
              </h2>
            </div>

            {currentExercise.type === "multiple_choice" &&
              currentExercise.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {currentExercise.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        exerciseState === "active" && setSelectedAnswer(option.text)
                      }
                      disabled={exerciseState !== "active"}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                        selectedAnswer === option.text
                          ? exerciseState === "correct" &&
                            option.text === currentExercise.correct_answer
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : exerciseState === "incorrect" &&
                              option.text === selectedAnswer
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                          : exerciseState !== "active" &&
                            option.text === currentExercise.correct_answer
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)]/30"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}

            {(currentExercise.type === "translation" ||
              currentExercise.type === "fill_blank") && (
              <div className="mb-8">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && textInput.trim() && exerciseState === "active") {
                      checkAnswer();
                    }
                  }}
                  disabled={exerciseState !== "active"}
                  placeholder="Type your answer..."
                  className={`w-full p-4 rounded-xl border-2 text-lg font-medium bg-[var(--color-card)] transition-colors ${
                    exerciseState === "correct"
                      ? "border-emerald-500 bg-emerald-50"
                      : exerciseState === "incorrect"
                      ? "border-red-500 bg-red-50"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)]"
                  }`}
                  autoFocus
                />
              </div>
            )}

            {currentExercise.type === "word_order" && (
              <div className="mb-8">
                <div className="min-h-[60px] p-4 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-card)] mb-4 flex flex-wrap gap-2">
                  {wordOrder.length === 0 && (
                    <p className="text-[var(--color-muted)] text-sm">
                      Tap words to build the sentence
                    </p>
                  )}
                  {wordOrder.map((word, i) => (
                    <button
                      key={`placed-${i}`}
                      onClick={() => exerciseState === "active" && removeWordFromOrder(i)}
                      className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium"
                    >
                      {word}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableWords.map((word, i) => (
                    <button
                      key={`avail-${i}`}
                      onClick={() => exerciseState === "active" && addWordToOrder(word)}
                      className="px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-primary)]/5 transition-colors"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {exerciseState !== "active" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 ${
                  exerciseState === "correct"
                    ? "bg-emerald-50 border border-emerald-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {exerciseState === "correct" ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                  <span
                    className={`font-semibold ${
                      exerciseState === "correct"
                        ? "text-emerald-700"
                        : "text-red-700"
                    }`}
                  >
                    {exerciseState === "correct" ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                {currentExercise.explanation && (
                  <p
                    className={`text-sm ${
                      exerciseState === "correct"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {currentExercise.explanation}
                  </p>
                )}
                {exerciseState === "incorrect" && (
                  <p className="text-sm text-red-600 mt-1">
                    Answer: <strong>{currentExercise.correct_answer}</strong>
                  </p>
                )}
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <Star className="h-4 w-4 text-[var(--color-xp)]" />
                {currentExercise.xp_value} XP
              </div>

              {exerciseState === "active" ? (
                <Button
                  onClick={checkAnswer}
                  disabled={
                    (currentExercise.type === "multiple_choice" &&
                      !selectedAnswer) ||
                    (currentExercise.type === "word_order" &&
                      wordOrder.length === 0) ||
                    ((currentExercise.type === "translation" ||
                      currentExercise.type === "fill_blank") &&
                      !textInput.trim())
                  }
                  size="lg"
                >
                  Check
                </Button>
              ) : (
                <Button onClick={nextExercise} size="lg">
                  {currentIndex < lesson.exercises.length - 1
                    ? "Continue"
                    : "Finish"}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
